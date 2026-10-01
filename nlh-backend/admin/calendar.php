<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/functions.php';
require_admin();

$db = get_db();
$unreadCount = (int)$db->query("SELECT COUNT(*) AS c FROM notifications WHERE is_read = 0 AND type = 'new_booking'")->fetch()['c'];
$employees = $db->query("SELECT * FROM employees WHERE active=1 ORDER BY name")->fetchAll();

$employeeId = (int)($_GET['employee_id'] ?? ($employees[0]['id'] ?? 0));
$weekStart = $_GET['week'] ?? date('Y-m-d', strtotime('monday this week'));

$days = [];
for ($i = 0; $i < 7; $i++) {
    $days[] = date('Y-m-d', strtotime("$weekStart +$i day"));
}

// Which day is "active" for the phone single-day view — same
// server-rendered approach as the staff calendar, no JS required.
$todayIndex = array_search(date('Y-m-d'), $days, true);
$activeDay = isset($_GET['day']) ? max(0, min(6, (int)$_GET['day'])) : ($todayIndex !== false ? $todayIndex : 0);

$stmt = $db->prepare(
    "SELECT b.*,
            b.appointment_date AS requested_date,
            b.appointment_time AS requested_time,
            b.concern AS concern_notes,
            c.background_notes, s.name AS service_name
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

$byDay = array_fill_keys($days, []);
foreach ($rows as $r) {
    $byDay[$r['requested_date']][] = $r;
}

$baseQS = '&employee_id=' . $employeeId . '&week=' . urlencode($weekStart);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Calendar | Admin</title>
<link rel="stylesheet" href="admin.css">
</head>
<body>

<div class="admin-topbar">
  <strong>Nataly Laser House — Admin</strong>
  <div class="nav">
     <a href="dashboard.php">Bookings</a>
    <a href="calendar.php" class="active">Calendar</a>
    <a href="clients.php">Clients</a>
    <a href="employees.php">Staff</a>
    <a href="notifications.php" data-unread-count="<?= $unreadCount ?>">🔔 Notifications<?= $unreadCount ? " ($unreadCount)" : '' ?></a>
    <a href="logout.php">Log out</a>
  </div>
</div>

<div class="admin-main">
  <div class="card">
    <form method="get" style="display:flex; gap:14px; align-items:center; margin-bottom:16px; flex-wrap:wrap;">
      <label>Employee:
        <select name="employee_id" onchange="this.form.submit()">
          <?php foreach ($employees as $e): ?>
            <option value="<?= $e['id'] ?>" <?= $e['id']==$employeeId?'selected':'' ?>><?= htmlspecialchars($e['name']) ?></option>
          <?php endforeach; ?>
        </select>
      </label>
      <input type="hidden" name="week" value="<?= $weekStart ?>">
      <input type="hidden" name="day" value="<?= $activeDay ?>">
      <a class="btn-sm btn-link" href="?employee_id=<?= $employeeId ?>&day=<?= $activeDay ?>&week=<?= date('Y-m-d', strtotime("$weekStart -7 day")) ?>">&larr; Prev week</a>
      <a class="btn-sm btn-link" href="?employee_id=<?= $employeeId ?>&day=<?= $activeDay ?>&week=<?= date('Y-m-d', strtotime("$weekStart +7 day")) ?>">Next week &rarr;</a>
      <span style="color:#999;"><?= $days[0] ?> – <?= $days[6] ?></span>
    </form>

    <!-- Phone-only day switcher — hidden on tablet/desktop via CSS -->
    <div class="mobile-day-nav">
      <a href="?day=<?= max(0, $activeDay - 1) ?><?= $baseQS ?>">&larr; Day</a>
      <span><?= date('D j M', strtotime($days[$activeDay])) ?></span>
      <a href="?day=<?= min(6, $activeDay + 1) ?><?= $baseQS ?>">Day &rarr;</a>
    </div>

    <div class="calendar-grid day-<?= $activeDay ?>">
      <div class="cell head">Time</div>
      <?php foreach ($days as $i => $d): ?>
        <div class="cell head" data-day="<?= $i ?>"><?= date('D j M', strtotime($d)) ?></div>
      <?php endforeach; ?>

      <div class="cell" style="color:#999;">All day</div>
      <?php foreach ($days as $i => $d): ?>
        <div class="cell" data-day="<?= $i ?>">
          <?php foreach ($byDay[$d] as $b): ?>
            <div class="calendar-booking st-<?= $b['status'] ?>" title="<?= htmlspecialchars($b['background_notes'] ?? '') ?>">
              <strong><?= substr($b['requested_time'],0,5) ?></strong> <?= htmlspecialchars($b['full_name']) ?><br>
              <span style="color:#999;"><?= htmlspecialchars($b['service_name']) ?></span>
              <?php if ($b['concern_notes']): ?>
                <div style="margin-top:2px;color:#d4af37;">⚑ <?= htmlspecialchars($b['concern_notes']) ?></div>
              <?php endif; ?>
            </div>
          <?php endforeach; ?>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</div>

<script src="notify.js"></script>

</body>
</html>