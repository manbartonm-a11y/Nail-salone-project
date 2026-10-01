<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/functions.php';
require_admin();

$db = get_db();
$filter = $_GET['status'] ?? 'pending,alternate_offered';
$unreadCount = (int)$db->query("SELECT COUNT(*) AS c FROM notifications WHERE is_read = 0 AND type = 'new_booking'")->fetch()['c'];
$statuses = array_map('trim', explode(',', $filter));
$placeholders = implode(',', array_fill(0, count($statuses), '?'));

$stmt = $db->prepare(
    "SELECT b.*,
            b.appointment_date AS requested_date,
            b.appointment_time AS requested_time,
            b.concern AS concern_notes,
            b.channel AS contact_channel,
            b.handle AS contact_handle,
            b.orig_booking_id AS touchup_of_booking_id,
            c.background_notes,
            s.name AS service_name, s.duration_minutes, e.name AS employee_name
       FROM bookings b
       LEFT JOIN clients c ON c.id = b.client_id
       JOIN services s  ON s.id = b.service_id
       JOIN employees e ON e.id = b.employee_id
      WHERE b.status IN ($placeholders)
      ORDER BY b.appointment_date, b.appointment_time"
);

$stmt->execute($statuses);
$bookings = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Dashboard | Admin</title>
<link rel="stylesheet" href="admin.css">
</head>
<body>

<div class="admin-topbar">
  <strong>Nataly Laser House — Admin</strong>
  <div class="nav">
    <a href="dashboard.php" class="active">Bookings</a>
    <a href="calendar.php">Calendar</a>
    <a href="clients.php">Clients</a>
    <a href="employees.php">Staff</a>
    <a href="notifications.php">🔔 Notifications<?= $unreadCount ? " ($unreadCount)" : '' ?></a>
    <a href="logout.php">Log out</a>
  </div>
</div>

<div class="admin-main">
  <div class="card">
    <h3>Booking requests</h3>
    <p style="color:#999;font-size:.85rem;">
      Showing: <?= htmlspecialchars($filter) ?> —
      <a href="?status=pending,alternate_offered">Needs attention</a> ·
      <a href="?status=confirmed">Confirmed</a> ·
      <a href="?status=rejected,cancelled">Rejected/Cancelled</a> ·
      <a href="?status=completed">Completed</a>
    </p>

    <table>
      <tr>
        <th>#</th><th>Client</th><th>Treatment</th><th>With</th>
        <th>Requested</th><th>Channel</th><th>Concern</th><th>Status</th><th>Actions</th>
      </tr>
      <?php foreach ($bookings as $b): ?>
      <tr>
        <td>#<?= $b['id'] ?></td>
        <td>
          <?= htmlspecialchars($b['full_name']) ?><br>
          <span style="color:#999;"><?= htmlspecialchars($b['phone']) ?></span>
          <?php if ($b['background_notes']): ?>
            <div class="notes-box"><?= nl2br(htmlspecialchars($b['background_notes'])) ?></div>
          <?php endif; ?>
        </td>
        <td>
          <?= htmlspecialchars($b['service_name']) ?>
          <?php if ($b['is_touchup']): ?><br><span class="pill st-alternate_offered">touch-up of #<?= $b['touchup_of_booking_id'] ?></span><?php endif; ?>
        </td>
        <td><?= htmlspecialchars($b['employee_name']) ?></td>
        <td><?= htmlspecialchars($b['requested_date']) ?><br><?= htmlspecialchars(substr($b['requested_time'],0,5)) ?></td>
        <td><?= htmlspecialchars(ucfirst($b['contact_channel'])) ?><?php if($b['contact_handle']): ?><br><span style="color:#999;"><?= htmlspecialchars($b['contact_handle']) ?></span><?php endif; ?></td>
        <td><?= $b['concern_notes'] ? nl2br(htmlspecialchars($b['concern_notes'])) : '—' ?></td>
        <td><span class="pill st-<?= $b['status'] ?>"><?= strtoupper($b['status']) ?></span>
          <?php if ($b['status'] === 'alternate_offered'): ?>
            <div style="font-size:.75rem;color:#3498db;margin-top:4px;">offered: <?= $b['confirmed_date'] ?> <?= substr($b['confirmed_time'],0,5) ?></div>
          <?php endif; ?>
        </td>
        <td>
          <?php if (in_array($b['status'], ['pending','alternate_offered'], true)): ?>
            <form method="post" action="action.php" style="display:inline;">
              <input type="hidden" name="booking_id" value="<?= $b['id'] ?>">
              <input type="hidden" name="action" value="confirm">
              <button class="btn-sm btn-confirm" onclick="return confirm('Confirm this appointment as-is?');">Confirm</button>
            </form>
            <button class="btn-sm btn-alt" onclick="openAlt(<?= $b['id'] ?>)">Offer another time</button>
            <button class="btn-sm btn-reject" onclick="openReject(<?= $b['id'] ?>)">Reject</button>
          <?php endif; ?>
          <?php if ($b['status'] === 'confirmed'): ?>
            <form method="post" action="action.php" style="display:inline;">
              <input type="hidden" name="booking_id" value="<?= $b['id'] ?>">
              <input type="hidden" name="action" value="cancel">
              <button class="btn-sm btn-reject" onclick="return confirm('Cancel this confirmed appointment?');">Cancel</button>
            </form>
          <?php endif; ?>
          <a class="btn-sm btn-link" target="_blank"
             href="<?= htmlspecialchars(build_contact_link($b['contact_channel'], $b['phone'], $b['contact_handle'],
                "Hi {$b['full_name']}, this is Nataly Laser House regarding your {$b['service_name']} request for {$b['requested_date']} {$b['requested_time']}.")) ?>">
            Message client
          </a>
        </td>
      </tr>
      <?php endforeach; ?>
      <?php if (!$bookings): ?>
        <tr><td colspan="9" style="color:#999;">Nothing here right now.</td></tr>
      <?php endif; ?>
    </table>
  </div>
</div>

<!-- Offer alternate time modal -->
<div class="modal-bg" id="altModal">
  <div class="modal">
    <h3>Offer a different time</h3>
    <form method="post" action="action.php">
      <input type="hidden" name="action" value="offer_alternate">
      <input type="hidden" name="booking_id" id="altBookingId">
      <label>New date</label>
      <input type="date" name="alt_date" required>
      <label>New time</label>
      <input type="time" name="alt_time" required>
      <label>Note to client (optional)</label>
      <textarea name="admin_notes" placeholder="e.g. Sorry, that slot's taken — does this work instead?"></textarea>
      <button type="submit" class="btn-sm btn-alt">Send offer</button>
      <button type="button" class="btn-sm" onclick="closeModals()">Cancel</button>
    </form>
  </div>
</div>

<!-- Reject modal -->
<div class="modal-bg" id="rejectModal">
  <div class="modal">
    <h3>Reject this request</h3>
    <form method="post" action="action.php">
      <input type="hidden" name="action" value="reject">
      <input type="hidden" name="booking_id" id="rejectBookingId">
      <label>Reason (kept internally / optionally shared with client)</label>
      <textarea name="admin_notes"></textarea>
      <button type="submit" class="btn-sm btn-reject">Confirm reject</button>
      <button type="button" class="btn-sm" onclick="closeModals()">Cancel</button>
    </form>
  </div>
</div>

<script>
function openAlt(id){ document.getElementById('altBookingId').value = id; document.getElementById('altModal').classList.add('open'); }
function openReject(id){ document.getElementById('rejectBookingId').value = id; document.getElementById('rejectModal').classList.add('open'); }
function closeModals(){ document.querySelectorAll('.modal-bg').forEach(m => m.classList.remove('open')); }
</script>

</body>
</html>
