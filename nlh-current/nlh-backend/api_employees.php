<?php
header('Content-Type: application/json');
require 'includes/db.php';

$category = $_GET['category'] ?? '';

if ($category === '') {
    $stmt = $pdo->query("SELECT id, name FROM employees WHERE active = 1 ORDER BY name");
} else {
    $stmt = $pdo->prepare(
        "SELECT e.id, e.name
           FROM employees e
           JOIN employee_categories ec ON ec.employee_id = e.id
          WHERE e.active = 1 AND ec.category = ?
          ORDER BY e.name"
    );
    $stmt->execute([$category]);
}

echo json_encode($stmt->fetchAll());