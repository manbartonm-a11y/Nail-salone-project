<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/functions.php';
require_staff();

$db = get_db();
$employeeId = (int)$_SESSION['staff_employee_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'save_note') {
    $bookingId = (int)$_POST['booking_id'];
    $notes = clean($_POST['concern'] ?? '');
    $upd = $db->prepare("UPDATE bookings SET concern = ? WHERE id = ? AND employee_id = ?");
    $upd->execute([$notes, $bookingId, $employeeId]);
    header('Location: dashboard.php');
    exit;
}

$stmt = $db->prepare(
    "SELECT b.*, c.background_notes, s.name AS service_name
       FROM bookings b
       LEFT JOIN clients c ON c.id = b.client_id
       JOIN services s ON s.id = b.service_id
      WHERE b.employee_id = ?
        AND b.status IN ('pending','alternate_offered','confirmed')
      ORDER BY b.appointment_date, b.appointment_time"
);
$stmt->execute([$employeeId]);
$bookings = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>My Appointments | Staff</title>
<link rel="stylesheet" href="../admin/admin.css">
</head>
<body>

<div class="admin-topbar">
  <strong>Nataly Laser House — Staff</strong>
  <div class="nav">
    <a href="dashboard.php" class="active">Bookings</a>
    <a href="calendar.php">Calendar</a>
    <a href="clients.php">Clients</a>
    <a href="book.php">New Booking</a>
    <a href="logout.php">Log out</a>
  </div>
</div>

<div class="admin-main">
  <div class="card">
    <h3>My upcoming appointments</h3>
    <div class="table-scroll">
    <table class="stack-table">
      <tr>
        <th>#</th><th>Client</th><th>Treatment</th><th>Date</th><th>Status</th><th>Notes</th>
      </tr>
      <?php foreach ($bookings as $b): ?>
      <tr>
        <td data-label="#"># <?= $b['id'] ?></td>
        <td data-label="Client">
          <?= htmlspecialchars($b['full_name']) ?><br>
          <span style="color:#999;"><?= htmlspecialchars($b['phone']) ?></span>
          <?php if ($b['background_notes']): ?>
            <div class="notes-box"><?= nl2br(htmlspecialchars($b['background_notes'])) ?></div>
          <?php endif; ?>
        </td>
        <td data-label="Treatment"><?= htmlspecialchars($b['service_name']) ?></td>
        <td data-label="Date"><?= htmlspecialchars($b['appointment_date']) ?><br><?= htmlspecialchars(substr($b['appointment_time'],0,5)) ?></td>
        <td data-label="Status"><span class="pill st-<?= $b['status'] ?>"><?= strtoupper($b['status']) ?></span></td>
        <td data-label="Notes">
          <form method="post">
            <input type="hidden" name="action" value="save_note">
            <input type="hidden" name="booking_id" value="<?= $b['id'] ?>">
            <textarea name="concern" rows="2" style="width:180px;"><?= htmlspecialchars($b['concern'] ?? '') ?></textarea><br>
            <button type="submit" class="btn-sm btn-link">Save note</button>
          </form>
        </td>
      </tr>
      <?php endforeach; ?>
      <?php if (!$bookings): ?>
        <tr><td colspan="6" style="color:#999;">No appointments yet.</td></tr>
      <?php endif; ?>
    </table>
    </div>
  </div>
</div>

</body>
</html>