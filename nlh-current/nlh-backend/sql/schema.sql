-- ============================================================
-- Nataly Laser House — booking system schema
-- Import this once into your MySQL database (phpMyAdmin, or:
--   mysql -u youruser -p yourdatabase < schema.sql
-- ============================================================

CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  category VARCHAR(40) NOT NULL,        -- 'laser', 'massage', 'nails', 'madero'
  duration_minutes INT NOT NULL DEFAULT 60,
  price DECIMAL(6,2) NOT NULL DEFAULT 0,
  allows_touchup TINYINT(1) NOT NULL DEFAULT 0,
  active TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  active TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Which categories each employee is able to perform (many-to-many)
CREATE TABLE IF NOT EXISTS employee_categories (
  employee_id INT NOT NULL,
  category VARCHAR(40) NOT NULL,
  PRIMARY KEY (employee_id, category),
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_id INT NOT NULL,
  employee_id INT NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  channel VARCHAR(20) NOT NULL,          -- whatsapp / sms / instagram / messenger / tiktok
  handle VARCHAR(80) DEFAULT NULL,
  appointment_date DATE NOT NULL,
  appointment_time VARCHAR(10) NOT NULL, -- '14:30'
  concern TEXT DEFAULT NULL,
  is_touchup TINYINT(1) NOT NULL DEFAULT 0,
  orig_booking_id INT DEFAULT NULL,
  status ENUM('pending','confirmed','cancelled','no_show','completed') NOT NULL DEFAULT 'pending',
  requires_deposit TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (service_id) REFERENCES services(id),
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  INDEX idx_employee_date (employee_id, appointment_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- EDIT ME: sample starter data — replace with your real
-- services, prices, and staff before going live.
-- ============================================================

INSERT INTO employees (name) VALUES
  ('Natalie'),
  ('Team Member 2');

-- EDIT: adjust which employee IDs can do which categories
INSERT INTO employee_categories (employee_id, category) VALUES
  (1, 'laser'),
  (1, 'massage'),
  (1, 'nails'),
  (1, 'madero'),
  (2, 'laser'),
  (2, 'massage');

INSERT INTO services (name, category, duration_minutes, price, allows_touchup) VALUES
  -- LASER
  ('Full Body Laser (Women)', 'laser', 90, 150.00, 1),
  ('Full Body Laser (Men)', 'laser', 90, 150.00, 1),
  ('Full Face Laser', 'laser', 20, 35.00, 1),
  ('Full Legs Laser', 'laser', 60, 80.00, 1),
  ('Half Legs Laser', 'laser', 45, 55.00, 1),
  ('Full Arms Laser', 'laser', 45, 60.00, 1),
  ('Underarms Laser', 'laser', 20, 25.00, 1),
  ('Bikini Laser', 'laser', 20, 30.00, 1),
  ('Brazilian Laser', 'laser', 30, 40.00, 1),
  ('Upper Lip Laser', 'laser', 15, 15.00, 1),
  ('Chin Laser', 'laser', 15, 15.00, 1),
  ('Back Laser', 'laser', 45, 70.00, 1),
  ('Chest Laser', 'laser', 45, 70.00, 1),

  -- MASSAGE
  ('Relaxing Massage (1hr)', 'massage', 60, 50.00, 0),
  ('Hot Stone Massage', 'massage', 75, 65.00, 0),
  ('Deep Tissue Massage', 'massage', 60, 60.00, 0),

  -- NAILS
  ('Soft Gel Manicure', 'nails', 45, 25.00, 0),
  ('Spa Pedicure', 'nails', 60, 45.00, 0),
  ('Gel Manicure', 'nails', 60, 35.00, 0),
  ('Gel Pedicure', 'nails', 60, 40.00, 0),

  -- MADERO
  ('Full Body Madero', 'madero', 60, 60.00, 0),
  ('Madero Legs', 'madero', 45, 45.00, 0),
  ('Madero Abdomen', 'madero', 45, 45.00, 0),

  -- V SHAPE
  ('V Shape Therapy', 'vshape', 60, 70.00, 0),

  -- FACIAL
  ('Facial Therapy', 'facial', 60, 60.00, 0);