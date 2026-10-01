<?php
require_once __DIR__ . '/includes/functions.php';

$booking = null;
$error = null;

if (!empty($_GET['ref']) && !empty($_GET['phone'])) {
    $stmt = get_db()->prepare(
        "SELECT b.*, s.name AS service_name, e.name AS employee_name
           FROM bookings b
           JOIN services s ON s.id = b.service_id
           JOIN employees e ON e.id = b.employee_id
           JOIN clients c ON c.id = b.client_id
          WHERE b.id = ? AND c.phone = ?"
    );
    $stmt->execute([(int)$_GET['ref'], $_GET['phone']]);
    $booking = $stmt->fetch();
    if (!$booking) {
        $error = "We couldn't find a booking with that reference number and phone.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Check Your Appointment | Nataly Laser House</title>
<link rel="stylesheet" href="css/styles.css">
<style>
  .status-wrap{max-width:520px;margin:0 auto;padding:80px 20px;}
  .status-wrap input{width:100%;padding:12px;margin-bottom:14px;border-radius:10px;border:1px solid #444;background:#181818;color:#fff;}
  .status-card{margin-top:24px;padding:20px;border-radius:12px;border:1px solid #444;}
  .status-pill{display:inline-block;padding:4px 12px;border-radius:20px;font-size:.8rem;margin-bottom:12px;}
  .st-pending{background:rgba(241,196,15,.2);color:#f1c40f;}
  .st-confirmed{background:rgba(46,204,113,.2);color:#2ecc71;}
  .st-alternate_offered{background:rgba(52,152,219,.2);color:#3498db;}
  .st-rejected, .st-cancelled{background:rgba(231,76,60,.2);color:#e74c3c;}
</style>
</head>
<body>
<div class="status-wrap">
  <h1>Check Your Appointment</h1>
  <form method="get">
    <input type="text" name="ref" placeholder="Reference number" value="<?= isset($_GET['ref']) ? clean($_GET['ref']) : '' ?>" required>
    <input type="tel" name="phone" placeholder="Phone number used to book" value="<?= isset($_GET['phone']) ? clean($_GET['phone']) : '' ?>" required>
    <button type="submit" class="btn btn-gold">Check status</button>
  </form>

  <?php if ($error): ?>
    <p style="color:#e74c3c;margin-top:20px;"><?= clean($error) ?></p>
  <?php elseif ($booking): ?>
    <div class="status-card">
      <span class="status-pill st-<?= $booking['status'] ?>"><?= strtoupper($booking['status']) ?></span>
      <p><strong>Treatment:</strong> <?= clean($booking['service_name']) ?></p>
      <p><strong>With:</strong> <?= clean($booking['employee_name']) ?></p>
      <?php if ($booking['status'] === 'confirmed'): ?>
        <p><strong>Confirmed for:</strong> <?= clean($booking['confirmed_date'] ?? $booking['requested_date']) ?> at <?= clean($booking['confirmed_time'] ?? $booking['requested_time']) ?></p>
      <?php elseif ($booking['status'] === 'alternate_offered'): ?>
        <p>We couldn't fit your original time. Suggested alternative:</p>
        <p><strong><?= clean($booking['confirmed_date']) ?> at <?= clean($booking['confirmed_time']) ?></strong></p>
        <p>Please reply on your chosen contact channel to accept, or submit a new request for a different time.</p>
      <?php elseif ($booking['status'] === 'pending'): ?>
        <p>Requested for <?= clean($booking['requested_date']) ?> at <?= clean($booking['requested_time']) ?> — awaiting Natalie's confirmation.</p>
      <?php else: ?>
        <p>This booking is <?= clean($booking['status']) ?>. Please get in touch if you'd like to rebook.</p>
      <?php endif; ?>
    </div>
  <?php endif; ?>
</div>
</body>
</html>
