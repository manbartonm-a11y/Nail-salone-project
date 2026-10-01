<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/functions.php';
require_admin();

$db = get_db();
$employees = $db->query("SELECT * FROM employees WHERE active=1 ORDER BY name")->fetchAll();

$employeeId = (int)($_GET['employee_id'] ?? ($employees[0]['id'] ?? 0));
$weekStart = $_GET['week'] ?? date('Y-m-d', strtotime('monday this week'));

$days = [];
for ($i = 0; $i < 7; $i++) {
    $days[] = date('Y-m-d', strtotime("$weekStart +$i day"));
}

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
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
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
    <a href="logout.php">Log out</a>
  </div>
</div>

<div class="admin-main">
  <div class="card">
    <form method="get" style="display:flex; gap:14px; align-items:center; margin-bottom:16px;">
      <label>Employee:
        <select name="employee_id" onchange="this.form.submit()">
          <?php foreach ($employees as $e): ?>
            <option value="<?= $e['id'] ?>" <?= $e['id']==$employeeId?'selected':'' ?>><?= htmlspecialchars($e['name']) ?></option>
          <?php endforeach; ?>
        </select>
      </label>
      <a class="btn-sm btn-link" href="?employee_id=<?= $employeeId ?>&week=<?= date('Y-m-d', strtotime("$weekStart -7 day")) ?>">&larr; Prev week</a>
      <a class="btn-sm btn-link" href="?employee_id=<?= $employeeId ?>&week=<?= date('Y-m-d', strtotime("$weekStart +7 day")) ?>">Next week &rarr;</a>
      <span style="color:#999;"><?= $days[0] ?> – <?= $days[6] ?></span>
    </form>

    <div class="calendar-grid">
      <div class="cell head">Time</div>
      <?php foreach ($days as $d): ?>
        <div class="cell head"><?= date('D j M', strtotime($d)) ?></div>
      <?php endforeach; ?>

      <div class="cell" style="color:#999;">All day</div>
      <?php foreach ($days as $d): ?>
        <div class="cell">
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

</body>
</html>
                  