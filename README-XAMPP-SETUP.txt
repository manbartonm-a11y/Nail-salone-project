HOW TO RUN THIS SITE ON XAMPP
==============================

This is a static site (HTML/CSS/JS only — no PHP, no database), so
XAMPP's Apache server can run it as-is. No code changes are needed;
the design and functionality stay exactly the same.

1. FOLDER PLACEMENT
   - Find your XAMPP installation's "htdocs" folder, e.g.:
       Windows: C:\xampp\htdocs\
       macOS:   /Applications/XAMPP/xamppfiles/htdocs/
       Linux:   /opt/lampp/htdocs/
   - Copy this whole "nataly-laser-house" folder into htdocs, so you get:
       htdocs/nataly-laser-house/index.html
       htdocs/nataly-laser-house/css/styles.css
       htdocs/nataly-laser-house/js/script.js
       htdocs/nataly-laser-house/images/...

2. IMAGES — ACTION NEEDED
   The uploaded files did not include the "images" folder (logo, hero
   photos, gallery photos, product photos, favicon, etc.) — only the
   HTML, the stylesheet, and the script were provided. I've created an
   empty /images folder as a placeholder. Copy your actual image files
   into it, using the exact filenames referenced in the HTML, e.g.:
       images/logo.png
       images/favicon.png
       images/woman.png
       images/about.jpg
       images/before1.jpg / after1.jpg
       images/laser.jpg, images/massage.jpg, images/hot_stone_massage.png,
       images/aromatherapy.png
       images/room.webp, images/laser_session.png, images/Products.png,
       images/Reception.png, images/Massage_Room.png
       images/Naiils.jpg
       images/product-aftercare-cream.jpg, images/product-cooling-gel.jpg,
       images/product-face-mask.jpg, images/product-body-scrub.jpg,
       images/product-bath-salts.jpg, images/product-towel-set.jpg,
       images/product-massage-oil.jpg, images/product-candle.jpg
       images/gift-card.jpg
   Without these files in place, the pages will load and look/behave
   identically otherwise, but image spots will show as broken.

3. START XAMPP
   - Open the XAMPP Control Panel.
   - Click "Start" next to Apache (you do not need MySQL for this site).

4. VIEW THE SITE
   - Open a browser and go to:
       http://localhost/nataly-laser-house/
   - This loads index.html. Every internal link (about.html,
     services.html, prices.html, nails.html, gallery.html, contact.html,
     book.html, shop.html, gift-card.html, gallery-detail.html) will
     work the same way it did before, since all paths in the HTML are
     relative (css/styles.css, js/script.js, images/...) — no
     absolute URLs to change.

5. NOTES
   - robots.txt currently points to https://www.natalylaserhouse.com/sitemap.xml.
     That's fine for local testing; update it if/when this is deployed
     to a live domain.
   - The WhatsApp float button, contact form, and newsletter form use
     client-side JavaScript (wa.me links / mailto), so they'll work
     locally in the browser without any server-side setup.
   - If you later add PHP or a database, XAMPP is ready for that too —
     this static setup doesn't need to change.
