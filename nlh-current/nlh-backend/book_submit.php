<?php
header('Content-Type: application/json');
require 'includes/db.php';

$input = json_decode(file_get_contents('php://input'), true);

function fail($message) {
    echo json_encode(["ok" => false, "message" => $message]);
    exit;
}

// ---------- Basic validation ----------
$required = ['service_id', 'employee_id', 'date', 'time', 'full_name', 'phone', 'channel'];
foreach ($required as $field) {
    if (empty($input[$field])) {
        fail("Please fill in all required fields.");
    }
}

$serviceId  = (int)$input['service_id'];
$employeeId = (int)$input['employee_id'];
$date       = $input['date'];
$time       = $input['time'];
$fullName   = trim($input['full_name']);
$phone      = trim($input['phone']);
$channel    = trim($input['channel']);
$handle     = trim($input['handle'] ?? '');
$concern    = trim($input['concern'] ?? '');
$isTouchup  = !empty($input['is_touchup']) ? 1 : 0;
$origBookingId = !empty($input['orig_booking_id']) ? (int)$input['orig_booking_id'] : null;

// Don't allow booking in the past
if (strtotime($date) < strtotime(date('Y-m-d'))) {
    fail("That date has already passed — please pick an upcoming date.");
}

// ---------- Look up the service ----------
$stmt = $pdo->prepare("SELECT * FROM services WHERE id = :id AND active = 1");
$stmt->execute(['id' => $serviceId]);
$service = $stmt->fetch();

if (!$service) {
    fail("That treatment isn't available — please pick another.");
}

// ---------- Touch-up validation ----------
if ($isTouchup) {
    if (!$service['allows_touchup']) {
        fail("Touch-ups aren't available for this treatment.");
    }
    if (!$origBookingId) {
        fail("Please provide the reference number from your last session for a touch-up.");
    }

    $stmt = $pdo->prepare("
      SELECT b.*, s.category
      FROM bookings b
      JOIN services s ON s.id = b.service_id
      WHERE b.id = :id
        AND b.phone = :phone
        AND b.status IN ('confirmed', 'completed')
    ");
    $stmt->execute(['id' => $origBookingId, 'phone' => $phone]);
    $origBooking = $stmt->fetch();

    if (!$origBooking) {
        fail("We couldn't find a confirmed session matching that reference number and phone number.");
    }
    if ($origBooking['category'] !== $service['category']) {
        fail("That reference number is for a different type of treatment.");
    }

    $daysSince = (strtotime(date('Y-m-d')) - strtotime($origBooking['appointment_date'])) / 86400;
    if ($daysSince > 10) {
        fail("Touch-ups are only available within 10 days of your last session — it's been " . floor($daysSince) . " days.");
    }
}

// ---------- Prevent double-booking the same slot ----------
$stmt = $pdo->prepare("
  SELECT COUNT(*) AS c FROM bookings
  WHERE employee_id = :employee_id
    AND appointment_date = :date
    AND appointment_time = :time
    AND status IN ('pending', 'confirmed')
");
$stmt->execute(['employee_id' => $employeeId, 'date' => $date, 'time' => $time]);
if ($stmt->fetch()['c'] > 0) {
    fail("That time was just booked by someone else — please pick a different slot.");
}

// ---------- Deposit policy: 3+ cancellations/no-shows requires a deposit ----------
$stmt = $pdo->prepare("
  SELECT COUNT(*) AS c FROM bookings
  WHERE phone = :phone AND status IN ('cancelled', 'no_show')
");
$stmt->execute(['phone' => $phone]);
$requiresDeposit = $stmt->fetch()['c'] >= 3 ? 1 : 0;

// ---------- Link to (or create) the client record ----------
require_once __DIR__ . '/includes/functions.php';
$clientId = find_or_create_client($fullName, $phone, $channel, $handle ?: null);

// ---------- Insert the booking ----------
$stmt = $pdo->prepare("
  INSERT INTO bookings
    (service_id, employee_id, client_id, full_name, phone, channel, handle, appointment_date,
     appointment_time, concern, is_touchup, orig_booking_id, status, requires_deposit)
  VALUES
    (:service_id, :employee_id, :client_id, :full_name, :phone, :channel, :handle, :date,
     :time, :concern, :is_touchup, :orig_booking_id, 'pending', :requires_deposit)
");
$stmt->execute([
    'service_id'      => $serviceId,
    'employee_id'     => $employeeId,
    'client_id'       => $clientId,
    'full_name'       => $fullName,
    'phone'           => $phone,
    'channel'         => $channel,
    'handle'          => $handle ?: null,
    'date'            => $date,
    'time'            => $time,
    'concern'         => $concern ?: null,
    'is_touchup'      => $isTouchup,
    'orig_booking_id' => $origBookingId,
    'requires_deposit'=> $requiresDeposit,
]);

// ---------- Notify admin ----------
$bookingId = $pdo->lastInsertId();
$notifMsg = "New booking request: {$fullName} — {$service['name']} on {$date} at {$time}.";
$pdo->prepare("INSERT INTO notifications (type, message, related_booking_id, is_read) VALUES ('new_booking', ?, ?, 0)")
    ->execute([$notifMsg, $bookingId]);

// ---------- Notify admin ----------
$bookingId = $pdo->lastInsertId();
$notifMsg = "New booking request: {$fullName} — {$service['name']} on {$date} at {$time}.";
$pdo->prepare("INSERT INTO notifications (type, message, related_booking_id, is_read) VALUES ('new_booking', ?, ?, 0)")
    ->execute([$notifMsg, $bookingId]);

// ---------- Response ----------
$message = "Thanks, {$fullName}! Your request for {$date} at {$time} has been sent — we'll confirm it shortly.";
if ($requiresDeposit) {
    $message .= " Since this is after 3 previous cancellations/no-shows, a €10 deposit will be required to confirm this booking — we'll reach out with payment details.";
}

echo json_encode(["ok" => true, "message" => $message]);