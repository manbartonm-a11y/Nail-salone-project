<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/push_config.php';

use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;

function send_new_booking_push(string $message, string $url = 'dashboard.php'): void
{
    // Load database the same way book_submit.php does
    if (!isset($GLOBALS['pdo'])) {
        require_once __DIR__ . '/db.php';
    }

    $pdo = $GLOBALS['pdo'] ?? null;

    if (!$pdo && function_exists('get_db')) {
        $pdo = get_db();
    }

    if (!$pdo) {
        error_log('send_push: No database connection');
        return;
    }

    try {
        $rows = $pdo->query("
            SELECT endpoint, p256dh, auth
            FROM push_subscriptions
            WHERE user_type IN ('admin', 'staff')
        ")->fetchAll(PDO::FETCH_ASSOC);
    } catch (Throwable $e) {
        error_log('send_push query error: ' . $e->getMessage());
        return;
    }

    if (empty($rows)) {
        error_log('send_push: No subscriptions found');
        return;
    }

    $auth = [
        'VAPID' => [
            'subject'    => defined('VAPID_SUBJECT') ? VAPID_SUBJECT : 'mailto:admin@example.com',
            'publicKey'  => VAPID_PUBLIC_KEY,
            'privateKey' => VAPID_PRIVATE_KEY,
        ],
    ];

    $webPush = new WebPush($auth);

    $payload = json_encode([
        'title' => 'Nataly Laser House',
        'body'  => $message,
        'tag'   => 'nlh-new-booking',
        'url'   => $url,
    ]);

    foreach ($rows as $row) {
        try {
            $subscription = Subscription::create([
                'endpoint' => $row['endpoint'],
                'keys'     => [
                    'p256dh' => $row['p256dh'],
                    'auth'   => $row['auth'],
                ],
            ]);
            $webPush->queueNotification($subscription, $payload);
        } catch (Throwable $e) {
            error_log('send_push subscription error: ' . $e->getMessage());
        }
    }

    foreach ($webPush->flush() as $report) {
        if (!$report->isSuccess()) {
            error_log('Push failed: ' . $report->getReason());
        }
    }
}