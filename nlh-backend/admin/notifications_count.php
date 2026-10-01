<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/functions.php';
require_admin();

header('Content-Type: application/json');

$db = get_db();
$count = (int)$db->query("SELECT COUNT(*) AS c FROM notifications WHERE is_read = 0 AND type = 'new_booking'")->fetch()['c'];

echo json_encode(['count' => $count]);