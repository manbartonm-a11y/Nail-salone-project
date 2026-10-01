<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/functions.php';
require_staff();

$db = get_db();
$employeeId = (int)$_SESSION['staff_employee_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = (int)$_POST['client_id'];
    $notes = clean($_POST['background_notes'] ?? '');
    // Only allow if this client has actually been booked with this staff member.
    $check = $db->prepare("SELECT COUNT(*) AS c FROM bookings WHERE client_id = ? AND employee_id = ?");
    $check->execute([$id, $employeeId]);
    if ($check->fetch()['c'] > 0) {
        $db->prepare("UPDATE clients SET background_notes=? WHERE id=?")->execute([$notes, $id]);
    }
    header('Location: clients.php');
    exit;
}

$clients = $db->prepare(
    "SELECT DISTINCT c.*
       FROM clients c
       JOIN bookings b ON b.client_id = c.id
      WHERE b.employee_id = ?
      ORDER BY c.name"
);
$clients->execute([$employeeId]);
$clients = $clients->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Clients | Staff</title>
<link rel="stylesheet" href="../admin/admin.css">
</head>
<body>

<div class="admin-topbar">
  <strong>Nataly Laser House — Staff</strong>
  <div class="nav">
    <a href="dashboard.php">Bookings</a>
    <a href="calendar.php">Calendar</a>
    <a href="clients.php" class="active">Clients</a>
    <a href="book.php">New Booking</a>
    <a href="logout.php">Log out</a>
  </div>
</div>

<div class="admin-main">
  <div class="card">
    <h3>My clients — background notes</h3>
    <p style="color:#999;font-size:.85rem;margin-bottom:16px;">
      Persistent notes about a client — skin type, allergies, ongoing concerns. Shared across staff.
    </p>

    <!-- SEARCH BAR -->
    <input type="text" id="clientSearch" 
           placeholder="Search client by name or phone..." 
           style="width:100%;padding:12px 16px;margin-bottom:20px;border-radius:8px;border:1px solid #333;background:#111;color:#fff;font-size:1rem;">

    <div id="clientList">
      <?php foreach ($clients as $c): ?>
        <div class="card client-card" style="background:#111;"
             data-name="<?= strtolower(htmlspecialchars($c['name'])) ?>"
             data-phone="<?= htmlspecialchars($c['phone']) ?>">
          <strong><?= htmlspecialchars($c['name']) ?></strong>
          <span style="color:#999;"> · <?= htmlspecialchars($c['phone']) ?></span>
          <form method="post" style="margin-top:8px;">
            <input type="hidden" name="client_id" value="<?= $c['id'] ?>">
            <textarea name="background_notes" rows="2" placeholder="e.g. sensitive skin on inner arms..."><?= htmlspecialchars($c['background_notes'] ?? '') ?></textarea>
            <button type="submit" class="btn-sm btn-link">Save</button>
          </form>
        </div>
      <?php endforeach; ?>

      <?php if (!$clients): ?>
        <p style="color:#999;">No clients yet.</p>
      <?php endif; ?>
    </div>
  </div>
</div>

<script>
  const search = document.getElementById('clientSearch');
  const cards = document.querySelectorAll('.client-card');

  if (search) {
    search.addEventListener('input', function () {
      const term = this.value.toLowerCase().trim();
      cards.forEach(card => {
        const name = card.dataset.name || '';
        const phone = card.dataset.phone || '';
        if (name.includes(term) || phone.includes(term)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
</script>
</body>
</html>