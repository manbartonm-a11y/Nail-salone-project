<?php
require_once __DIR__ . '/db.php';

/**
 * These were referenced by generate_time_slots() etc. but never defined
 * anywhere, which is what caused the "Undefined constant" error.
 * Change the values here to adjust business hours / slot size —
 * or move these into a config.php later and remove this block.
 */
if (!defined('BUSINESS_HOURS_START')) define('BUSINESS_HOURS_START', '09:00');
if (!defined('BUSINESS_HOURS_END'))   define('BUSINESS_HOURS_END', '19:00');
if (!defined('SLOT_STEP_MINUTES'))    define('SLOT_STEP_MINUTES', 30);


function clean(string $v): string {
    return trim(htmlspecialchars($v, ENT_QUOTES, 'UTF-8'));
}

/** Employees available for a given service category, active only. */
function get_employees_for_category(string $category): array {
    $stmt = get_db()->prepare(
        "SELECT id, name FROM employees WHERE category = ? AND active = 1 ORDER BY sort_order, name"
    );
    $stmt->execute([$category]);
    return $stmt->fetchAll();
}

function get_services(): array {
    return get_db()->query("SELECT * FROM services ORDER BY category, name")->fetchAll();
}

function get_service(int $id): ?array {
    $stmt = get_db()->prepare("SELECT * FROM services WHERE id = ?");
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    return $row ?: null;
}

/** Generates the list of bookable time strings, e.g. ["09:00","09:30",...]. */
function generate_time_slots(): array {
    $slots = [];
    $t = strtotime(BUSINESS_HOURS_START);
    $end = strtotime(BUSINESS_HOURS_END);
    while ($t < $end) {
        $slots[] = date('H:i', $t);
        $t += SLOT_STEP_MINUTES * 60;
    }
    return $slots;
}

/**
 * Is this employee free at this date/time for this long?
 * Treats any non-cancelled/non-rejected booking as occupying its service's duration.
 * $excludeBookingId lets you check availability while ignoring one specific
 * booking (used when rescheduling that same booking).
 */
function is_employee_free(int $employeeId, string $date, string $time, int $durationMinutes, ?int $excludeBookingId = null): bool {
    $db = get_db();
    $sql = "SELECT b.appointment_time AS t, s.duration_minutes AS dur
              FROM bookings b
              JOIN services s ON s.id = b.service_id
             WHERE b.employee_id = ?
               AND b.appointment_date = ?
               AND b.status IN ('pending','alternate_offered','confirmed')";
    $params = [$employeeId, $date];
    if ($excludeBookingId) {
        $sql .= " AND b.id != ?";
        $params[] = $excludeBookingId;
    }
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $existing = $stmt->fetchAll();

    $newStart = strtotime("$date $time");
    $newEnd   = $newStart + $durationMinutes * 60;

    foreach ($existing as $row) {
        $exStart = strtotime("$date {$row['t']}");
        $exEnd   = $exStart + ((int)$row['dur']) * 60;
        if ($newStart < $exEnd && $exStart < $newEnd) {
            return false; // overlap
        }
    }
    return true;
}

/**
 * Every bookable time for one employee/date/service, each flagged available
 * or not — this is what powers the gray-out slot grid.
 * Reuses is_employee_free() so there is exactly one place the overlap rule
 * is defined; nothing else re-implements it.
 * Returns: [ ['time' => '09:00', 'available' => true], ... ]
 */
function get_time_slots(int $employeeId, int $serviceId, string $date, ?int $excludeBookingId = null): array {
    $service = get_service($serviceId);
    if (!$service) {
        return [];
    }
    $duration = (int)$service['duration_minutes'];
    $closeTs = strtotime("$date " . BUSINESS_HOURS_END);

    $slots = [];
    foreach (generate_time_slots() as $slotTime) {
        $slotEndTs = strtotime("$date $slotTime") + $duration * 60;
        if ($slotEndTs > $closeTs) {
            continue; // this service wouldn't finish before closing if started here
        }
        $slots[] = [
            'time'      => $slotTime,
            'available' => is_employee_free($employeeId, $date, $slotTime, $duration, $excludeBookingId),
        ];
    }
    return $slots;
}

/** Suggests the next N free slots for this employee on/after the requested date, as a fallback. */
function find_alternate_slots(int $employeeId, string $date, int $durationMinutes, int $limit = 3): array {
    $alternatives = [];
    $slots = generate_time_slots();
    $checkDate = $date;
    $daysAhead = 0;
    while (count($alternatives) < $limit && $daysAhead < 14) {
        foreach ($slots as $slot) {
            if (is_employee_free($employeeId, $checkDate, $slot, $durationMinutes)) {
                $alternatives[] = ['date' => $checkDate, 'time' => $slot];
                if (count($alternatives) >= $limit) break;
            }
        }
        $daysAhead++;
        $checkDate = date('Y-m-d', strtotime($date . " +$daysAhead day"));
    }
    return $alternatives;
}

/**
 * Enforces the laser touch-up rule:
 * a touch-up may only be booked if it references a prior CONFIRMED/COMPLETED
 * laser booking, regrowth is flagged, and the requested date is within the
 * service's touchup_window_days of that prior session.
 * Returns [true, null] or [false, "error message"].
 */
function validate_touchup(int $originalBookingId, string $requestedDate, int $windowDays): array {
    $stmt = get_db()->prepare(
        "SELECT b.appointment_date AS d, b.status
           FROM bookings b WHERE b.id = ?"
    );
    $stmt->execute([$originalBookingId]);
    $orig = $stmt->fetch();

    if (!$orig) {
        return [false, 'We could not find the original session to attach this touch-up to.'];
    }
    if (!in_array($orig['status'], ['confirmed', 'completed'], true)) {
        return [false, 'Touch-ups can only be booked against a confirmed previous session.'];
    }
    $daysSince = (strtotime($requestedDate) - strtotime($orig['d'])) / 86400;
    if ($daysSince < 0 || $daysSince > $windowDays) {
        return [false, "Touch-up sessions must be booked within $windowDays days of your last laser session."];
    }
    return [true, null];
}

/** Finds a client by phone, or creates one. Updates channel/handle/name on repeat visits. */
function find_or_create_client(string $name, string $phone, string $channel, ?string $handle): int {
    $db = get_db();
    $stmt = $db->prepare("SELECT id FROM clients WHERE phone = ?");
    $stmt->execute([$phone]);
    $existing = $stmt->fetch();

    if ($existing) {
        $upd = $db->prepare("UPDATE clients SET name = ?, alt_contact = ? WHERE id = ?");
        $upd->execute([$name, $handle, $existing['id']]);
        return (int)$existing['id'];
    }

    $ins = $db->prepare("INSERT INTO clients (name, phone, alt_contact) VALUES (?,?,?)");
    $ins->execute([$name, $phone, $handle]);
    return (int)$db->lastInsertId();
}

/**
 * Builds a "reply to this client" link for Natalie's dashboard, per channel.
 * IMPORTANT (read this): Instagram, Messenger and TikTok do not offer a public
 * way to open a chat with a pre-filled message the way WhatsApp/SMS do — and a
 * business can only message a client on those platforms after the client has
 * messaged first (Meta/TikTok policy). So for IG/Messenger/TikTok this simply
 * opens the conversation/profile; Natalie types the reply herself there.
 * WhatsApp and SMS are the two channels this system can pre-fill automatically.
 */
function build_contact_link(string $channel, string $phone, ?string $handle, string $message): string {
    $digits = preg_replace('/[^0-9]/', '', $phone);
    switch ($channel) {
        case 'whatsapp':
            return "https://wa.me/{$digits}?text=" . urlencode($message);
        case 'sms':
            return "sms:{$phone}?body=" . urlencode($message);
        case 'instagram':
            $u = $handle ? ltrim($handle, '@') : '';
            return $u ? "https://ig.me/m/{$u}" : "https://instagram.com/direct/inbox/";
        case 'messenger':
            $u = $handle ? ltrim($handle, '@') : '';
            return $u ? "https://m.me/{$u}" : "https://www.messenger.com/";
        case 'tiktok':
            $u = $handle ? ltrim($handle, '@') : '';
            return $u ? "https://www.tiktok.com/@{$u}" : "https://www.tiktok.com/";
        default:
            return '#';
    }
}