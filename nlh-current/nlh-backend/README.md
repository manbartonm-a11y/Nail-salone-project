# Nataly Laser House — Booking Backend (PHP + MySQL)

## What this is
A booking system that plugs into your existing HTML/CSS site:
- `book.html` — the client-facing booking form (add a "Book" link to it in your nav)
- `book_submit.php`, `api_*.php` — process the request, check availability, save it as **pending**
- `status.php` — clients can check whether Natalie confirmed their appointment
- `admin/` — Natalie's private dashboard: review requests, confirm/reject/offer another time, see each employee's calendar with client notes

## 1. Set up the database
1. Create a MySQL database and import `sql/schema.sql` (this also seeds the services and two placeholder employees).
2. Rename the placeholder nail employee `"Maria"` in the `employees` table to your actual nail technician's name.
3. Edit `includes/config.php` with your real DB host/name/user/password.

## 2. Create Natalie's admin login
Upload everything to your server, then visit once in your browser:
```
https://yoursite.com/admin/setup.php?u=natalie&p=YourStrongPassword123&name=Natalie
```
Then **delete `admin/setup.php` immediately** — it's a one-time-use file. Natalie logs in from then on at `admin/login.php`.

## 3. Link the booking form from your site
Add a nav link / "Book Now" button to `book.html` wherever you'd like — it works alongside your existing Fresha booking link, or can replace it.

## How the pieces fit together

**Employees & the "one girl for nails" rule** — `employees` has a `category` column (laser/massage/nails). The booking form only shows employees whose category matches the chosen treatment, so for any nail service only your one nail tech appears. Everyone is shown by first name, per your request.

**5 contact channels** — Instagram, Messenger, SMS, WhatsApp, TikTok are radio options on the form. **One important technical limitation to know about:** WhatsApp and SMS support pre-filled, automated reply links because they're phone-number based — this system generates those for you. Instagram, Messenger, and TikTok do **not** allow a business to message a client first with a pre-filled note through any public link — their platforms only allow it after the client has messaged the business, and even then only inside their own apps. So for those three, the client's chosen platform/handle is stored and shown to Natalie, and she replies manually inside that app (a "Message client" button still opens the right chat/profile to save her a step).

**Natalie as the sole confirmer** — every request lands as `pending`. It only becomes real once Natalie clicks **Confirm** (or the client accepts an offered alternate time and she confirms that) in `admin/dashboard.php`. `status.php` is the client-facing page that reflects this — it always shows "awaiting confirmation" until she's acted on it, so nothing is presented to the client as booked until she says so.

**Laser touch-ups, 10-day rule** — laser services have `allows_touchup = 1` and a `touchup_window_days` (10, editable per service in the `services` table). On the booking form, a laser client can tick "this is a touch-up," reference their last session's booking number, and `validate_touchup()` rejects the request server-side unless: the referenced session was confirmed/completed, and the new date is within 10 days of it. This keeps it to "only if hair is still growing back, only shortly after," as you described — it's opt-in per booking rather than automatic.

**Employee calendars with client notes** — `admin/calendar.php` gives Natalie a week view per employee. Each booking tile shows the client's name, treatment, and that visit's concern note; hovering shows the client's persistent background notes (allergies, skin type, etc., editable any time in `admin/clients.php`, separate from one-off visit notes).

**No free hour → offered another one** — when a client submits a time that's taken, `book_submit.php` immediately checks the employee's schedule and, if it's full, replies with the nearest open slots rather than silently failing. Natalie can also proactively do this from the dashboard with **Offer another time**, which puts the booking into `alternate_offered` status until she (or the client, via reply) confirms it.

## Still to decide / wire up on your end
- **Notifications to Natalie**: right now new requests only show up when she opens the dashboard. If you want a ping the moment someone books, the cleanest options are a WhatsApp Business API webhook, or a simple `mail()`/SMTP call added to the bottom of `book_submit.php` — happy to add either once you tell me which you'd rather use.
- **Real employee names/photos** and final service list/pricing — the seed data in `schema.sql` is a starting point.
- **Hosting**: this assumes a standard PHP 8 + MySQL host (most shared hosting, e.g. cPanel, works fine).
