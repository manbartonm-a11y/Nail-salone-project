<?php
// ============================================================
// EDIT ME: replace these four values with your real database
// credentials from your hosting control panel (cPanel, Plesk,
// or wherever your host manages MySQL databases).
// ============================================================
$DB_HOST = "localhost";
$DB_NAME = "natalylaserhouse";
$DB_USER = "root";
$DB_PASS = "";
try {
    $pdo = new PDO(
        "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    header('Content-Type: application/json');
    http_response_code(500);
    // Don't leak real DB credentials/errors to visitors in production —
    // log $e->getMessage() somewhere private instead, once this is live.
    echo json_encode(["ok" => false, "message" => "Server error — please contact us on WhatsApp instead."]);
    exit;
}

function get_db(): PDO {
    global $pdo;
    return $pdo;
}