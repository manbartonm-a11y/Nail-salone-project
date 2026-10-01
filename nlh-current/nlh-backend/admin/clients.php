<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/functions.php';
require_admin();

$db = get_db();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = (int)$_POST['client_id'];
    $notes = clean($_POST['background_notes'] ?? '');
    $db->prepare("UPDATE clients SET background_notes=? WHERE id=?")->execute([$notes, $id]);
    header('Location: clients.php');
    exit;
}
$clients = $db->query(
    "SELECT c.*, COUNT(b.id) AS visit_count, MAX(b.appointment_date) AS last_visit
       FROM clients c
       LEFT JOIN bookings b ON b.client_id = c.id AND b.status IN ('confirmed','completed')
      GROUP BY c.id
      ORDER BY c.name"
)->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Clients | Admin</title>
<link rel="stylesheet" href="admin.css">
</head>
<body>

<div class="admin-topbar">
  <strong>Nataly Laser House — Admin</strong>
  <div class="nav">
<a href="dashboard.php">Bookings</a>
    <a href="calendar.php">Calendar</a>
    <a href="clients.php" class="active">Clients</a>
    <a href="employees.php">Staff</a>
    <a href="logout.php">Log out</a>
  </div>
</div>

<div class="admin-main">
  <div class="card">
    <h3>Client background notes</h3>
    <p style="color:#999;font-size:.85rem;">Persistent notes about a client — skin type, allergies, ongoing concerns. These stay on file across all their visits, separate from per-visit notes shown on each booking.</p>

    <?php foreach ($clients as $c): ?>
      <div class="card" style="background:#111;">
        <strong><?= htmlspecialchars($c['name']) ?></strong>
        <span style="color:#999;"> · <?= htmlspecialchars($c['phone']) ?> · <?= (int)$c['visit_count'] ?> visits<?= $c['last_visit'] ? ' · last: '.htmlspecialchars($c['last_visit']) : '' ?></span>
        <form method="post" style="margin-top:8px;">
          <input type="hidden" name="client_id" value="<?= $c['id'] ?>">
          <textarea name="background_notes" rows="2" placeholder="e.g. sensitive skin on inner arms, prefers quieter room..."><?= htmlspecialchars($c['background_notes'] ?? '') ?></textarea>
          <button type="submit" class="btn-sm btn-link">Save</button>
        </form>
      </div>
    <?php endforeach; ?>
  </div>
</div>

</body>
</html>
