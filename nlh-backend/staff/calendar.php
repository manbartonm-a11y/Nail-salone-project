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

// Which day is "active" for the phone single-day view. Server-rendered
// (via a ?day= link) rather than JS, so it works with no JavaScript at
// all and the same markup just gets shown/hidden differently by CSS
// depending on screen width — desktop ignores this entirely.
$todayIndex = array_search(date('Y-m-d'), $days, true);
$activeDay = isset($_GET['day']) ? max(0, min(6, (int)$_GET['day'])) : ($todayIndex !== false ? $todayIndex : 0);

$stmt = $db->prepare(
    "SELECT b.*, c.background_notes, s.name AS service_name, s.duration_minutes
       FROM bookings b
       LEFT JOIN clients c ON c.id = b.client_id
       JOIN services s ON s.id = b.service_id
      WHERE b.employee_id = ?
        AND b.appointment_date BETWEEN ? AND ?
        AND b.status IN ('pending','alternate_offered','confirmed','completed')
      ORDER BY b.appointment_time"
);
$stmt->execute([$employeeId, $days[0], $days[6]]);
$rows = $stmt->fetchAll();

// Index bookings by day, and by the slot they START in
$byDay = array_fill_keys($days, []);
foreach ($rows as $r) {
    $byDay[$r['appointment_date']][substr($r['appointment_time'], 0, 5)] = $r;
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
function occupying_booking(array $dayBookings, string $slotTime, array &$shownIds): ?array {
    $slotMin = (int)date('H', strtotime($slotTime)) * 60 + (int)date('i', strtotime($slotTime));
    foreach ($dayBookings as $startTime => $b) {
        $start = (int)date('H', strtotime($startTime)) * 60 + (int)date('i', strtotime($startTime));
        $end = $start + (int)$b['duration_minutes'];
        if ($slotMin >= $start && $slotMin < $end) {
            // Bookings don't always land exactly on a grid line (e.g. a
            // client-facing booking for 6:07 when rows are 6:00/6:30) —
            // so "is this the start cell" means "first row we've shown
            // this booking in today", not "does the time match exactly".
            $isFirstShown = !in_array($b['id'], $shownIds, true);
            if ($isFirstShown) {
                $shownIds[] = $b['id'];
            }
            $b['_is_start'] = $isFirstShown;
            return $b;
        }
    }
    return null;
}

$weekQS = '&week=' . urlencode($weekStart);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Calendar | Staff</title>
<link rel="stylesheet" href="../admin/admin.css">
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
    <div style="display:flex; gap:14px; align-items:center; margin-bottom:16px; flex-wrap:wrap;">
      <a class="btn-sm btn-link" href="?week=<?= date('Y-m-d', strtotime("$weekStart -7 day")) ?>&day=<?= $activeDay ?>">&larr; Prev week</a>
      <a class="btn-sm btn-link" href="?week=<?= date('Y-m-d', strtotime("$weekStart +7 day")) ?>&day=<?= $activeDay ?>">Next week &rarr;</a>
      <span style="color:#999;"><?= $days[0] ?> – <?= $days[6] ?></span>
    </div>

    <!-- Phone-only: flip between individual days. Hidden on tablet/desktop
         via CSS, where the full week grid is already comfortable to read. -->
    <div class="mobile-day-nav">
      <a href="?day=<?= max(0, $activeDay - 1) ?><?= $weekQS ?>">&larr; Day</a>
      <span><?= date('D j M', strtotime($days[$activeDay])) ?></span>
      <a href="?day=<?= min(6, $activeDay + 1) ?><?= $weekQS ?>">Day &rarr;</a>
    </div>

    <div class="cal-grid day-<?= $activeDay ?>">
      <div class="cal-cell cal-head">Time</div>
      <?php foreach ($days as $i => $d): ?>
        <div class="cal-cell cal-head" data-day="<?= $i ?>"><?= date('D j M', strtotime($d)) ?></div>
      <?php endforeach; ?>

      <?php $shownIds = array_fill_keys($days, []); ?>
      <?php foreach ($slotTimes as $slotTime): ?>
        <div class="cal-cell cal-time"><?= date('g:i A', strtotime($slotTime)) ?></div>
        <?php foreach ($days as $i => $d): ?>
          <?php $b = occupying_booking($byDay[$d], $slotTime, $shownIds[$d]); ?>
          <?php if ($b): ?>
            <div class="cal-cell cal-booked st-<?= $b['status'] ?>" data-day="<?= $i ?>" title="<?= htmlspecialchars($b['background_notes'] ?? '') ?>">
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
            <a class="cal-cell cal-free" data-day="<?= $i ?>" href="book.php" style="display:block; text-decoration:none;" title="Book this slot">&nbsp;</a>
          <?php endif; ?>
        <?php endforeach; ?>
      <?php endforeach; ?>
    </div>
  </div>
</div>

</body>
</html>