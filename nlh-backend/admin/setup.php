<?php
// ============================================================
// RUN THIS ONCE to create Natalie's admin account, then DELETE
// this file from the server. Visit it in the browser, e.g.
// https://yoursite.com/admin/setup.php?u=natalie&p=ChooseAStrongPassword123
// ============================================================
require_once __DIR__ . '/../includes/db.php';

$username = $_GET['u'] ?? null;
$password = $_GET['p'] ?? null;
$fullName = $_GET['name'] ?? 'Natalie';

if (!$username || !$password) {
    die('Usage: setup.php?u=USERNAME&p=PASSWORD&name=Natalie');
}
if (strlen($password) < 8) {
    die('Please choose a password with at least 8 characters.');
}

$db = get_db();
$exists = $db->prepare("SELECT id FROM admin_users WHERE username = ?");
$exists->execute([$username]);
if ($exists->fetch()) {
    die('That username already exists. Delete this file — setup is done.');
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $db->prepare("INSERT INTO admin_users (username, password_hash, full_name) VALUES (?,?,?)");
$stmt->execute([$username, $hash, $fullName]);

echo "Admin account created for '$username'. Now DELETE this file (admin/setup.php) immediately.";
