<?php
header('Content-Type: application/json');
require 'includes/db.php';

$stmt = $pdo->query("
  SELECT id, name, category, allows_touchup, duration_minutes, price
  FROM services
  WHERE active = 1
  ORDER BY category, name
");

echo json_encode($stmt->fetchAll());