<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/functions.php';
require_admin();

$db = get_db();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'mark_read') {
    $db->prepare("UPDATE notifications SET is_read = 1 WHERE id = ?")->execute([(int)$_POST['id']]);
    header('Location: notifications.php');
    exit;
}
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'mark_all_read') {
    $db->exec("UPDATE notifications SET is_read = 1 WHERE type = 'new_booking'");
    header('Location: notifications.php');
    exit;
}

$notifications = $db->query("SELECT * FROM notifications WHERE type = 'new_booking' ORDER BY created_at DESC LIMIT 50")->fetchAll();
$unreadCount = (int)$db->query("SELECT COUNT(*) AS c FROM notifications WHERE is_read = 0 AND type = 'new_booking'")->fetch()['c'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Notifications | Admin</title>
<link rel="stylesheet" href="admin.css">
</head>
<body>

<div class="admin-topbar">
  <strong>Nataly Laser House — Admin</strong>
  <div class="nav">
    <a href="dashboard.php">Bookings</a>
    <a href="calendar.php">Calendar</a>
    <a href="clients.php">Clients</a>
    <a href="employees.php">Staff</a>
    <a href="notifications.php" class="active" data-unread-count="<?= $unreadCount ?>">🔔 Notifications<?= $unreadCount ? " ($unreadCount)" : '' ?></a>
    <a href="logout.php">Log out</a>
  </div>
</div>

<div class="admin-main">
  <div class="card">
    <h3>Notifications</h3>
    <form method="post" style="margin-bottom:14px;">
      <input type="hidden" name="action" value="mark_all_read">
      <button type="submit" class="btn-sm btn-link">Mark all as read</button>
    </form>
    <p style="color:#999;font-size:.85rem;margin-bottom:14px;">
      A sound plays automatically when a new booking comes in, as long as this page
      (or any admin page) is open in a tab.
      <button type="button" class="btn-sm btn-alt" onclick="window.nlhTestSound &amp;&amp; window.nlhTestSound()">🔊 Test sound</button>
    </p>
    <?php foreach ($notifications as $n): ?>
      <div class="card" style="background:<?= $n['is_read'] ? '#111' : '#1a1300' ?>;">
        <?= htmlspecialchars($n['message']) ?>
        <span style="color:#999;font-size:.8rem;margin-left:10px;"><?= htmlspecialchars($n['created_at']) ?></span>
        <?php if ($n['related_booking_id']): ?>
          <a class="btn-sm btn-link" href="dashboard.php?status=pending,alternate_offered">View booking</a>
        <?php endif; ?>
        <?php if (!$n['is_read']): ?>
          <form method="post" style="display:inline;">
            <input type="hidden" name="action" value="mark_read">
            <input type="hidden" name="id" value="<?= $n['id'] ?>">
            <button type="submit" class="btn-sm btn-link">Mark read</button>
          </form>
        <?php endif; ?>
      </div>
    <?php endforeach; ?>
    <?php if (!$notifications): ?>
      <p style="color:#999;">No notifications yet.</p>
    <?php endif; ?>
  </div>
</div>

<script src="notify.js"></script>
<script src="push.js"></script>

</body>
</html>