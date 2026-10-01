<?php

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/db.php';

require_admin();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'ok' => false,
        'message' => 'Method not allowed'
    ]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$endpoint = trim($input['endpoint'] ?? '');
$p256dh   = trim($input['keys']['p256dh'] ?? '');
$auth     = trim($input['keys']['auth'] ?? '');

if ($endpoint === '' || $p256dh === '' || $auth === '') {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'message' => 'Invalid push subscription'
    ]);
    exit;
}

$userAgent = substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 255);

$db = get_db();

$stmt = $db->prepare("
    INSERT INTO push_subscriptions
        (user_type, employee_id, endpoint, p256dh, auth, user_agent)
    VALUES
        ('admin', NULL, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        p256dh = VALUES(p256dh),
        auth = VALUES(auth),
        user_agent = VALUES(user_agent)
");

$stmt->execute([
    $endpoint,
    $p256dh,
    $auth,
    $userAgent
]);

echo json_encode([
    'ok' => true
]);