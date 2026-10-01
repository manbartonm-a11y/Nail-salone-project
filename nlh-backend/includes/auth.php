<?php
require_once __DIR__ . '/db.php';

function admin_session_start(): void {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
}

function admin_login(string $username, string $password): bool {
    admin_session_start();
    $stmt = get_db()->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        session_regenerate_id(true);
        $_SESSION['admin_id']   = $user['id'];
        $_SESSION['admin_name'] = $user['name'];
        return true;
    }
    return false;
}

function admin_logout(): void {
    admin_session_start();
    $_SESSION = [];
    session_destroy();
}

function require_admin(): void {
    admin_session_start();
    if (empty($_SESSION['admin_id'])) {
        header('Location: login.php');
        exit;
    }
}

function staff_login(string $username, string $password): bool {
    admin_session_start();
    $stmt = get_db()->prepare("SELECT * FROM users WHERE username = ? AND role = 'staff'");
    $stmt->execute([$username]);
    $user = $stmt->fetch();
    if ($user && $user['active'] && password_verify($password, $user['password_hash'])) {
        session_regenerate_id(true);
        $_SESSION['staff_id'] = $user['id'];
        $_SESSION['staff_name'] = $user['name'];
        $_SESSION['staff_employee_id'] = $user['employee_id'];
        return true;
    }
    return false;
}

function require_staff(): void {
    admin_session_start();
    if (empty($_SESSION['staff_id'])) {
        header('Location: login.php');
        exit;
    }
}

function staff_logout(): void {
    admin_session_start();
    unset($_SESSION['staff_id'], $_SESSION['staff_name'], $_SESSION['staff_employee_id']);
}