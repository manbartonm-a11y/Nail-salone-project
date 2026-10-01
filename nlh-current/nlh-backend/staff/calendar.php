<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/functions.php';
require_staff();

$db = get_db();
$employeeId = (int)$_SESSION['staff_employee_id'];
$weekStart = $_GET['week'] ?? date('Y-m-d', strtotime('monday this week'));

// Quick actions from the grid: cancel / mark completed
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'set_status') {
    $bookingId = (int)$_POST['booking_id'];
    $newStatus = $_POST['new_status'];
    if (in_array($newStatus, ['cancelled', 'completed', 'confirmed'], true)) {
        $db->prepare("UPDATE bookings SET status = ? WHERE id = ? AND employee_id = ?")
           ->execute([$newStatus, $bookingId, $employeeId]);
    }
    header('Location: calendar.php?week=' . urlencode($weekStart));
    exit;
}

$days = [];
for ($i = 0; $i < 7; $i++) {
    $days[] = date('Y-m-d', strtotime("$weekStart +$i day"));
}

$stmt = $db->prepare(
    "SELECT b.*, c.background_notes, s.name AS service_name, s.duration_minutes
       FROM bookings b
       LEFT JOIN clients c ON c.id = b.client_id
       JOIN services s ON s.id = b.service_id
      WHERE b.employee_id = ?
        AND b.requested_date BETWEEN ? AND ?
        AND b.status IN ('pending','alternate_offered','confirmed','completed')
      ORDER BY b.requested_time"
);
$stmt->execute([$employeeId, $days[0], $days[6]]);
$rows = $stmt->fetchAll();

// Index bookings by day, and by the slot they START in
$byDay = array_fill_keys($days, []);
foreach ($rows as $r) {
    $byDay[$r['requested_date']][substr($r['requested_time'], 0, 5)] = $r;
}

// Master slot list for the grid rows — reuses the same generate_time_slots()
// that drives the booking form, so the grid always matches real business hours.
$slotTimes = generate_time_slots();

/**
 * A booking that started earlier can still span into a later slot
 * (e.g. a 90-min booking at 14:00 covers 14:00, 14:30, 15:00).
 * This finds, for a given day+slot, the booking (if any) that is
 * currently occupying it, along with whether this slot is where it
 * actually starts (so we only print the details once).
 */
function occupying_booking(array $dayBookings, string $slotTime): ?array {
    $slotMin = (int)date('H', strtotime($slotTime)) * 60 + (int)date('i', strtotime($slotTime));
    foreach ($dayBookings as $startTime => $b) {
        $start = (int)date('H', strtotime($startTime)) * 60 + (int)date('i', strtotime($startTime));
        $end = $start + (int)$b['duration_minutes'];
        if ($slotMin >= $start && $slotMin < $end) {
            $b['_is_start'] = ($slotMin === $start);
            return $b;
        }
    }
    return null;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Calendar | Staff</title>
<link rel="stylesheet" href="../admin/admin.css">
<style>
  .cal-grid {
    display: grid;
    grid-template-columns: 70px repeat(7, 1fr);
    border: 1px solid #333;
  }
  .cal-cell {
    border: 1px solid #2a2a2a;
    padding: 4px;
    min-height: 34px;
    font-size: .78rem;
  }
  .cal-head { background:#1a1a1a; font-weight:bold; text-align:center; padding:6px; }
  .cal-time { background:#151515; color:#999; text-align:right; padding-right:8px; }
  .cal-booked.st-pending { background:#3a2f00; }
  .cal-booked.st-confirmed { background:#12331f; }
  .cal-booked.st-alternate_offered { background:#2f2530; }
  .cal-booked.st-completed { background:#1a1a1a; color:#777; }
  .cal-free { background:#0d0d0d; }
  .cal-booking-actions { display:none; margin-top:3px; }
  .cal-booked:hover .cal-booking-actions { display:block; }
  .cal-booking-actions button { font-size:.7rem; padding:2px 5px; }
</style>
</head>
<body>

<div class="admin-topbar">
  <strong>Nataly Laser House — Staff</strong>
  <div class="nav">
    <a href="dashboard.php">Bookings</a>
    <a href="calendar.php" class="active">Calendar</a>
    <a href="clients.php">Clients</a>
    <a href="book.php">New Booking</a>
    <a href="logout.php">Log out</a>
  </div>
</div>

<div class="admin-main">
  <div class="card">
    <div style="display:flex; gap:14px; align-items:center; margin-bottom:16px;">
      <a class="btn-sm btn-link" href="?week=<?= date('Y-m-d', strtotime("$weekStart -7 day")) ?>">&larr; Prev week</a>
      <a class="btn-sm btn-link" href="?week=<?= date('Y-m-d', strtotime("$weekStart +7 day")) ?>">Next week &rarr;</a>
      <span style="color:#999;"><?= $days[0] ?> – <?= $days[6] ?></span>
    </div>

    <div class="cal-grid">
      <div class="cal-cell cal-head">Time</div>
      <?php foreach ($days as $d): ?>
        <div class="cal-cell cal-head"><?= date('D j M', strtotime($d)) ?></div>
      <?php endforeach; ?>

      <?php foreach ($slotTimes as $slotTime): ?>
        <div class="cal-cell cal-time"><?= date('g:i A', strtotime($slotTime)) ?></div>
        <?php foreach ($days as $d): ?>
          <?php $b = occupying_booking($byDay[$d], $slotTime); ?>
          <?php if ($b): ?>
            <div class="cal-cell cal-booked st-<?= $b['status'] ?>" title="<?= htmlspecialchars($b['background_notes'] ?? '') ?>">
              <?php if ($b['_is_start']): ?>
                <strong><?= htmlspecialchars($b['full_name']) ?></strong><br>
                <span style="color:#999;"><?= htmlspecialchars($b['service_name']) ?> (<?= (int)$b['duration_minutes'] ?>m)</span>
                <?php if ($b['concern']): ?>
                  <div style="color:#d4af37;">⚑ <?= htmlspecialchars($b['concern']) ?></div>
                <?php endif; ?>
                <div class="cal-booking-actions">
                  <?php if ($b['status'] !== 'completed'): ?>
                    <form method="post" style="display:inline;">
                      <input type="hidden" name="action" value="set_status">
                      <input type="hidden" name="booking_id" value="<?= $b['id'] ?>">
                      <input type="hidden" name="new_status" value="completed">
                      <button type="submit">Mark done</button>
                    </form>
                  <?php endif; ?>
                  <?php if ($b['status'] !== 'cancelled'): ?>
                    <form method="post" style="display:inline;" onsubmit="return confirm('Cancel this booking?');">
                      <input type="hidden" name="action" value="set_status">
                      <input type="hidden" name="booking_id" value="<?= $b['id'] ?>">
                      <input type="hidden" name="new_status" value="cancelled">
                      <button type="submit">Cancel</button>
                    </form>
                  <?php endif; ?>
                </div>
              <?php else: ?>
                <span style="color:#777;">↳ continued</span>
              <?php endif; ?>
            </div>
          <?php else: ?>
            <a class="cal-cell cal-free" href="book.php" style="display:block; text-decoration:none;" title="Book this slot">&nbsp;</a>
          <?php endif; ?>
        <?php endforeach; ?>
      <?php endforeach; ?>
    </div>
  </div>
</div>

</body>
</html>