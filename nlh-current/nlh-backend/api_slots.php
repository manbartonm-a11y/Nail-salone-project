<?php
header('Content-Type: application/json');
require 'db.php';

// ============================================================
// EDIT ME: your studio's opening hours and slot length.
// ============================================================
$OPEN_TIME  = "10:00";
$CLOSE_TIME = "18:30";
$SLOT_MINUTES = 30;

$employeeId = $_GET['employee_id'] ?? null;
$date       = $_GET['date'] ?? null;

// Build the full list of possible slots for the day
$slots = [];
$start = strtotime($OPEN_TIME);
$end   = strtotime($CLOSE_TIME);
for ($t = $start; $t <= $end; $t += $SLOT_MINUTES * 60) {
    $slots[] = date("H:i", $t);
}

// If we know which employee + date, remove times that are already booked.
// NOTE: this is a simple version — it removes exact-match times only and
// doesn't account for a long service overlapping into the next slot.
// Good enough to prevent obvious double-bookings; for full accuracy you'd
// want to also block out slots covered by a service's duration_minutes.
if ($employeeId && $date) {
    $stmt = $pdo->prepare("
      SELECT appointment_time
      FROM bookings
      WHERE employee_id = :employee_id
        AND appointment_date = :date
        AND status IN ('pending', 'confirmed')
    ");
    $stmt->execute(['employee_id' => $employeeId, 'date' => $date]);
    $taken = array_column($stmt->fetchAll(), 'appointment_time');

    // Normalize "14:30:00" from MySQL down to "14:30" to match our format
    $taken = array_map(fn($t) => substr($t, 0, 5), $taken);

    $slots = array_values(array_diff($slots, $taken));
}

echo json_encode($slots);