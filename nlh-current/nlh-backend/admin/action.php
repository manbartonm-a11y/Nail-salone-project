<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/functions.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: dashboard.php');
    exit;
}

$db = get_db();
$bookingId = (int)($_POST['booking_id'] ?? 0);
$action = $_POST['action'] ?? '';

$stmt = $db->prepare("SELECT * FROM bookings WHERE id = ?");
$stmt->execute([$bookingId]);
$booking = $stmt->fetch();
if (!$booking) {
    header('Location: dashboard.php');
    exit;
}

switch ($action) {
  case 'confirm':
        // Confirms at the already-offered alternate time if one exists, otherwise the original request.
        $date = $booking['confirmed_date'] ?? $booking['appointment_date'];
        $time = $booking['confirmed_time'] ?? $booking['appointment_time'];
        $upd = $db->prepare(
            "UPDATE bookings SET status='confirmed', confirmed_date=?, confirmed_time=? WHERE id=?"
        );
        $upd->execute([$date, $time, $bookingId]);
        break;
    case 'offer_alternate':
        $altDate = $_POST['alt_date'] ?? '';
        $altTime = $_POST['alt_time'] ?? '';
        $notes   = clean($_POST['admin_notes'] ?? '');
        $upd = $db->prepare(
            "UPDATE bookings SET status='alternate_offered', confirmed_date=?, confirmed_time=?, admin_notes=? WHERE id=?"
        );
        $upd->execute([$altDate, $altTime, $notes, $bookingId]);
        break;
    case 'reject':
        $notes = clean($_POST['admin_notes'] ?? '');
        $upd = $db->prepare("UPDATE bookings SET status='rejected', admin_notes=? WHERE id=?");
        $upd->execute([$notes, $bookingId]);
        break;
    case 'cancel':
        $notes = clean($_POST['admin_notes'] ?? '');
        $upd = $db->prepare("UPDATE bookings SET status='cancelled', admin_notes=? WHERE id=?");
        $upd->execute([$notes, $bookingId]);
        break;
    case 'complete':
        $db->prepare("UPDATE bookings SET status='completed' WHERE id=?")->execute([$bookingId]);
        break;

    case 'save_notes':
        $notes = clean($_POST['admin_notes'] ?? '');
        $db->prepare("UPDATE bookings SET admin_notes=? WHERE id=?")->execute([$notes, $bookingId]);
        break;
}

header('Location: dashboard.php');
exit;
