<?php
require_once __DIR__ . '/../includes/auth.php';
admin_session_start();

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (admin_login($_POST['username'] ?? '', $_POST['password'] ?? '')) {
        header('Location: dashboard.php');
        exit;
    }
    $error = 'Incorrect username or password.';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Admin Login | Nataly Laser House</title>
<link rel="stylesheet" href="admin.css">
</head>
<body class="admin-login-body">
  <form method="post" class="admin-login-box">
    <h1>Natalie — Admin Login</h1>
    <?php if ($error): ?><p class="admin-error"><?= htmlspecialchars($error) ?></p><?php endif; ?>
    <input type="text" name="username" placeholder="Username" required>
    <input type="password" name="password" placeholder="Password" required>
    <button type="submit">Log In</button>
  </form>
</body>
</html>
