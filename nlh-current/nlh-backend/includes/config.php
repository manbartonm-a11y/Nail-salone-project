<?php
// ============================================================
// Fill these in with your real hosting details.
// Keep this file OUTSIDE the public web root if your host allows it,
// or at minimum make sure your server is configured to never serve
// raw .php source (a normal Apache/Nginx+PHP setup already does this).
// ============================================================
define('DB_HOST', 'localhost');
define('DB_NAME', 'nlh_booking');
define('DB_USER', 'your_db_user');
define('DB_PASS', 'your_db_password');

// The salon's own WhatsApp/SMS number, used to build reply links in admin.
define('SALON_PHONE', '+35797900601');

// Business hours used to generate the "pick a time" dropdown on the booking form.
define('BUSINESS_HOURS_START', '09:00');
define('BUSINESS_HOURS_END',   '19:00');
define('SLOT_STEP_MINUTES', 30);

// Timezone
date_default_timezone_set('Asia/Nicosia');
