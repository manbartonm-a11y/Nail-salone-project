<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/functions.php';
require_staff();

$db = get_db();
$employeeId = (int)$_SESSION['staff_employee_id'];
$error = '';
$success = '';

// ---------------------------------------------------------------
// AJAX: return available slots as JSON for the chosen service+date
// ---------------------------------------------------------------
if (($_GET['action'] ?? '') === 'get_slots') {
    header('Content-Type: application/json');
    $serviceId = (int)($_GET['service_id'] ?? 0);
    $date = $_GET['date'] ?? '';
    if (!$serviceId || !$date) {
        echo json_encode(['error' => 'missing params']);
        exit;
    }
    echo json_encode(get_time_slots($employeeId, $serviceId, $date));
    exit;
}

// ---------------------------------------------------------------
// Submit booking
// ---------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $serviceId = (int)$_POST['service_id'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $fullName = clean($_POST['full_name'] ?? '');
    $phone = clean($_POST['phone'] ?? '');
    $concern = clean($_POST['concern'] ?? '');

    if (!$serviceId || !$date || !$time || !$fullName || !$phone) {
        $error = 'Please fill in all fields.';
    } elseif (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date) || (int)substr($date, 0, 4) < (int)date('Y')) {
        // Catches the "0026" instead of "2026" issue — some browsers save
        // whatever was typed into the date picker's year segment without
        // padding it, if the year isn't clicked from the calendar itself.
        $error = 'That date looks wrong (check the year) — please reselect it.';
    } else {
        $svcStmt = $db->prepare("SELECT * FROM services WHERE id = ? AND active = 1");
        $svcStmt->execute([$serviceId]);
        $service = $svcStmt->fetch();

        if (!$service) {
            $error = "That treatment isn't available.";
        } elseif (!is_employee_free($employeeId, $date, $time, (int)$service['duration_minutes'])) {
            // Re-checked here on purpose: the grayed-out UI is just a hint,
            // this check is what actually prevents a double-booking if two
            // people submit around the same time.
            $error = 'That time was just taken (or no longer fits). Please pick another slot.';
        } else {
            $clientId = find_or_create_client($fullName, $phone, 'staff', null);

            // Wrap the final re-check + insert in a transaction so two
            // near-simultaneous submits can't both slip through.
            $db->beginTransaction();
            try {
                if (!is_employee_free($employeeId, $date, $time, (int)$service['duration_minutes'])) {
                    $db->rollBack();
                    $error = 'That time was just taken. Please pick another slot.';
                } else {
                    $ins = $db->prepare(
                        "INSERT INTO bookings (service_id, employee_id, client_id, full_name, phone, channel, appointment_date, appointment_time, concern, status)
                         VALUES (?, ?, ?, ?, ?, 'staff', ?, ?, ?, 'pending')"
                    );
                    $ins->execute([$serviceId, $employeeId, $clientId, $fullName, $phone, $date, $time, $concern ?: null]);
                    $bookingId = $db->lastInsertId();

                    $notifMsg = "{$_SESSION['staff_name']} requested a booking: {$fullName} — {$service['name']} on {$date} at {$time}.";
                    $db->prepare("INSERT INTO notifications (type, message, related_booking_id, is_read) VALUES ('new_booking', ?, ?, 0)")
                        ->execute([$notifMsg, $bookingId]);

                    $db->commit();
                    $success = "Booking request sent — waiting for Natalie's confirmation.";
                }
            } catch (Exception $e) {
                $db->rollBack();
                $error = 'Something went wrong saving the booking. Please try again.';
            }
        }
    }
}

$services = $db->query("SELECT * FROM services WHERE active = 1 ORDER BY category, name")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Booking | Staff</title>
<link rel="stylesheet" href="../admin/admin.css">
<style>
  .slot-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin: 10px 0 16px;
  }
  @media (max-width: 480px) {
    .slot-grid { grid-template-columns: repeat(3, 1fr); }
  }
  .slot-btn {
    padding: 10px 4px;
    min-height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 6px;
    border: 1px solid #444;
    background: #1a1a1a;
    color: #eee;
    cursor: pointer;
    font-size: .85rem;
  }
  .slot-btn:hover { border-color: #d4af37; }
  .slot-btn.selected { background: #3f9d6e; border-color: #3f9d6e; color: #fff; }
  .slot-btn.taken {
    background: #2a2a2a;
    color: #666;
    border-color: #333;
    cursor: not-allowed;
    text-decoration: line-through;
  }
  .slot-hint { color: #999; font-size: .8rem; }
  #bookingForm input[type="text"],
  #bookingForm input[type="date"],
  #bookingForm select,
  #bookingForm textarea {
    font-size: 16px; /* keeps iOS Safari from auto-zooming in on focus */
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #444;
    background: #111;
    color: #fff;
  }
</style>
</head>
<body>

<div class="admin-topbar">
  <strong>Nataly Laser House — Staff</strong>
  <div class="nav">
    <a href="dashboard.php">Bookings</a>
    <a href="calendar.php">Calendar</a>
    <a href="clients.php">Clients</a>
    <a href="book.php" class="active">New Booking</a>
    <a href="logout.php">Log out</a>
  </div>
</div>

<div class="admin-main">
  <div class="card">
    <h3>Request a new booking</h3>
    <p style="color:#999;font-size:.85rem;">This will be added to the calendar as <strong>pending</strong> until Natalie confirms it.</p>
    <?php if ($error): ?><p class="admin-error"><?= htmlspecialchars($error) ?></p><?php endif; ?>
    <?php if ($success): ?><p style="color:#3f9d6e;"><?= htmlspecialchars($success) ?></p><?php endif; ?>

    <form method="post" id="bookingForm">
      <label>Client name</label>
      <input type="text" name="full_name" required style="width:100%;margin-bottom:10px;">

      <label>Client phone</label>
      <input type="text" name="phone" required style="width:100%;margin-bottom:10px;">

      <label>Service</label>
      <select name="service_id" id="serviceSelect" required style="width:100%;margin-bottom:10px;">
        <option value="">— choose a treatment —</option>
        <?php foreach ($services as $s): ?>
          <option value="<?= $s['id'] ?>" data-duration="<?= (int)$s['duration_minutes'] ?>">
            <?= htmlspecialchars($s['name']) ?> (<?= htmlspecialchars($s['category']) ?>) — <?= (int)$s['duration_minutes'] ?> min
          </option>
        <?php endforeach; ?>
      </select>

      <label>Date</label>
      <input type="date" name="date" id="dateInput" min="<?= date('Y-m-d') ?>" required style="width:100%;margin-bottom:10px;">

      <label>Time slot</label>
      <div id="slotHint" class="slot-hint">Choose a service and date to see available times.</div>
      <div id="slotGrid" class="slot-grid"></div>
      <input type="hidden" name="time" id="timeInput" required>

      <label>Notes (optional)</label>
      <textarea name="concern" rows="2" style="width:100%;margin-bottom:10px;"></textarea>

      <button type="submit" class="btn-sm btn-confirm" id="submitBtn" disabled>Submit request</button>
    </form>
  </div>
</div>

<script>
const serviceSelect = document.getElementById('serviceSelect');
const dateInput = document.getElementById('dateInput');
const slotGrid = document.getElementById('slotGrid');
const slotHint = document.getElementById('slotHint');
const timeInput = document.getElementById('timeInput');
const submitBtn = document.getElementById('submitBtn');

function fmt12(t) {
  const [h, m] = t.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2,'0')} ${period}`;
}

async function loadSlots() {
  timeInput.value = '';
  submitBtn.disabled = true;
  slotGrid.innerHTML = '';

  const serviceId = serviceSelect.value;
  const date = dateInput.value;
  if (!serviceId || !date) {
    slotHint.textContent = 'Choose a service and date to see available times.';
    return;
  }

  slotHint.textContent = 'Loading availability...';
  try {
    const res = await fetch(`book.php?action=get_slots&service_id=${serviceId}&date=${date}`);
    const slots = await res.json();
    if (!Array.isArray(slots) || slots.length === 0) {
      slotHint.textContent = 'No slots available that day for this treatment length.';
      return;
    }
    slotHint.textContent = 'Grayed-out times are already booked.';
    slots.forEach(s => {
      const btn = document.createElement('div');
      btn.className = 'slot-btn' + (s.available ? '' : ' taken');
      btn.textContent = fmt12(s.time);
      if (s.available) {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.slot-btn.selected').forEach(el => el.classList.remove('selected'));
          btn.classList.add('selected');
          timeInput.value = s.time;
          submitBtn.disabled = false;
        });
      }
      slotGrid.appendChild(btn);
    });
  } catch (e) {
    slotHint.textContent = 'Could not load availability. Try again.';
  }
}

serviceSelect.addEventListener('change', loadSlots);
dateInput.addEventListener('change', loadSlots);
</script>

</body>
</html>