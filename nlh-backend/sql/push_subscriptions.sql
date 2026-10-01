-- ============================================================
-- Push notification subscriptions — run this once in phpMyAdmin
-- ============================================================
-- One row per device that has installed the admin app and granted
-- notification permission. A single admin could have this be empty
-- (desktop only), one row (one phone), or several (phone + tablet).

CREATE TABLE IF NOT EXISTS push_subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_type ENUM('admin','staff') NOT NULL DEFAULT 'admin',
  employee_id INT DEFAULT NULL,          -- NULL for admin; set this if/when staff push is added later
  endpoint TEXT NOT NULL,                -- unique push URL for this device, given by the browser
  p256dh VARCHAR(255) NOT NULL,          -- encryption key, given by the browser
  auth VARCHAR(255) NOT NULL,            -- encryption auth secret, given by the browser
  user_agent VARCHAR(255) DEFAULT NULL,  -- e.g. "Android / Chrome" — just for your own reference
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_endpoint (endpoint(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
