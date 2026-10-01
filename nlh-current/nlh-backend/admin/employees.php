<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/functions.php';
require_admin();

$db = get_db();
$allCategories = ['laser', 'madero', 'massage', 'nails'];

// Add a new employee
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'add') {
    $name = clean($_POST['name'] ?? '');
    $cats = $_POST['categories'] ?? [];
    if ($name !== '') {
        $db->prepare("INSERT INTO employees (name, active) VALUES (?, 1)")->execute([$name]);
        $newId = $db->lastInsertId();
        $ins = $db->prepare("INSERT INTO employee_categories (employee_id, category) VALUES (?, ?)");
        foreach ($cats as $c) {
            if (in_array($c, $allCategories, true)) $ins->execute([$newId, $c]);
        }
    }
    header('Location: employees.php');
    exit;
}

// Update an existing employee's categories / active state
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'update') {
    $id = (int)$_POST['employee_id'];
    $active = isset($_POST['active']) ? 1 : 0;
    $cats = $_POST['categories'] ?? [];
    $db->prepare("UPDATE employees SET active = ? WHERE id = ?")->execute([$active, $id]);
    $db->prepare("DELETE FROM employee_categories WHERE employee_id = ?")->execute([$id]);
    $ins = $db->prepare("INSERT INTO employee_categories (employee_id, category) VALUES (?, ?)");
    foreach ($cats as $c) {
        if (in_array($c, $allCategories, true)) $ins->execute([$id, $c]);
    }
    header('Location: employees.php');
    exit;
}

// Remove an employee entirely
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'delete') {
    $id = (int)$_POST['employee_id'];
    $db->prepare("DELETE FROM employee_categories WHERE employee_id = ?")->execute([$id]);
    $db->prepare("DELETE FROM employees WHERE id = ?")->execute([$id]);
    header('Location: employees.php');
    exit;
}

$employees = $db->query("SELECT * FROM employees ORDER BY name")->fetchAll();
$catStmt = $db->query("SELECT * FROM employee_categories");
$empCats = [];
foreach ($catStmt->fetchAll() as $row) {
    $empCats[$row['employee_id']][] = $row['category'];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Staff | Admin</title>
<link rel="stylesheet" href="admin.css">
</head>
<body>

<div class="admin-topbar">
  <strong>Nataly Laser House — Admin</strong>
  <div class="nav">
    <a href="dashboard.php">Bookings</a>
    <a href="calendar.php">Calendar</a>
    <a href="clients.php">Clients</a>
    <a href="employees.php" class="active">Staff</a>
    <a href="logout.php">Log out</a>
  </div>
</div>

<div class="admin-main">
  <div class="card">
    <h3>Add staff member</h3>
    <form method="post">
      <input type="hidden" name="action" value="add">
      <input type="text" name="name" placeholder="Full name" required style="margin-bottom:10px;">
      <div>
        <?php foreach ($allCategories as $c): ?>
          <label style="margin-right:14px;"><input type="checkbox" name="categories[]" value="<?= $c ?>"> <?= ucfirst($c) ?></label>
        <?php endforeach; ?>
      </div>
      <button type="submit" class="btn-sm btn-confirm" style="margin-top:12px;">Add staff member</button>
    </form>
  </div>

  <div class="card">
    <h3>Current staff</h3>
    <?php foreach ($employees as $e): ?>
      <div class="card" style="background:#111;">
        <form method="post">
          <input type="hidden" name="action" value="update">
          <input type="hidden" name="employee_id" value="<?= $e['id'] ?>">
          <strong><?= htmlspecialchars($e['name']) ?></strong>
          <label style="margin-left:14px;"><input type="checkbox" name="active" <?= $e['active'] ? 'checked' : '' ?>> Active</label>
          <div style="margin-top:8px;">
            <?php foreach ($allCategories as $c): ?>
              <label style="margin-right:14px;">
                <input type="checkbox" name="categories[]" value="<?= $c ?>"
                  <?= in_array($c, $empCats[$e['id']] ?? []) ? 'checked' : '' ?>> <?= ucfirst($c) ?>
              </label>
            <?php endforeach; ?>
          </div>
          <button type="submit" class="btn-sm btn-alt" style="margin-top:10px;">Save changes</button>
        </form>
        <form method="post" onsubmit="return confirm('Remove this staff member? This cannot be undone.');" style="display:inline;">
          <input type="hidden" name="action" value="delete">
          <input type="hidden" name="employee_id" value="<?= $e['id'] ?>">
          <button type="submit" class="btn-sm btn-reject" style="margin-top:6px;">Remove</button>
        </form>
      </div>
    <?php endforeach; ?>
  </div>
</div>

</body>
</html>