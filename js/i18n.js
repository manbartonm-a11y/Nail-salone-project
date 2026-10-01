/*!
 * Nataly Laser House — EN / EL language switcher
 * Load AFTER js/script.js on every page:  <script src="js/i18n.js"></script>
 *
 * - Button shows "ΕΛ" while the page is English and "EN" while it is Greek.
 * - Translates every visible string, placeholders, alt/title/aria-label and the tab title.
 * - Works on text that other scripts insert later (booking form, gallery detail…).
 * - Elements with data-en / data-el are honoured too.
 * - To add or fix a translation, edit the DICT object below (English text -> Greek).
 */
(function () {
  'use strict';

  var DICT = {
 "Home": "Αρχική",
 "About": "Σχετικά",
 "Services": "Υπηρεσίες",
 "Prices": "Τιμές",
 "Nails": "Νύχια",
 "Gallery": "Γκαλερί",
 "Contact": "Επικοινωνία",
 "Change language": "Αλλαγή γλώσσας",
 "Book Now": "Κλείστε Τώρα",
 "About Us": "Σχετικά με εμάς",
 "Professional Beauty Treatments With a Personal Touch": "Επαγγελματικές Θεραπείες Ομορφιάς<br>με Προσωπική Πινελιά",
 "Who We Are": "Ποιοι Είμαστε",
 "Your Trusted Beauty Studio": "Το Έμπιστο Στούντιο Ομορφιάς σας",
 "Book Your Appointment": "Κλείστε το Ραντεβού σας",
 "Why Choose Us": "Γιατί να μας Επιλέξετε",
 "Why Clients Love Nataly Laser House": "Γιατί οι Πελάτες Αγαπούν το Nataly Laser House",
 "Professional Equipment": "Επαγγελματικός Εξοπλισμός",
 "Personal Care": "Προσωπική Φροντίδα",
 "Comfortable Studio": "Άνετος Χώρος",
 "Affordable Prices": "Προσιτές Τιμές",
 "Ready to Visit?": "Έτοιμοι για Επίσκεψη;",
 "We'd Love to Welcome You": "Θα Χαρούμε να σας Καλωσορίσουμε",
 "Book your appointment today and experience professional beauty treatments in a relaxing environment.": "Κλείστε το ραντεβού σας σήμερα και ζήστε επαγγελματικές θεραπείες ομορφιάς σε ένα χαλαρωτικό περιβάλλον.",
 "Contact Us": "Επικοινωνήστε μαζί μας",
 "Booking & Cancellation Policy": "Πολιτική Κρατήσεων & Ακυρώσεων",
 "Please give us at least 24 hours' notice if you need to cancel or reschedule.": "Παρακαλούμε ενημερώστε μας τουλάχιστον 24 ώρες νωρίτερα αν χρειαστεί να ακυρώσετε ή να αλλάξετε το ραντεβού σας.",
 "After 3 late cancellations or no-shows, a €10 deposit will be required to confirm future bookings.": "Μετά από 3 καθυστερημένες ακυρώσεις ή απουσίες χωρίς ειδοποίηση, θα απαιτείται προκαταβολή €10 για την επιβεβαίωση μελλοντικών κρατήσεων.",
 "Logo": "Λογότυπο",
 "© 2026 Nataly Laser House. All Rights Reserved.": "© 2026 Nataly Laser House. Με επιφύλαξη παντός δικαιώματος.",
 "Chat on WhatsApp": "Συνομιλία στο WhatsApp",
 "Book Online": "Κράτηση Online",
 "Prefer to message us instead? Book through any of these:": "Προτιμάτε να μας στείλετε μήνυμα; Κλείστε ραντεβού μέσω οποιουδήποτε από τα παρακάτω:",
 "No phone number for WhatsApp or SMS? Use Instagram, Messenger, or TikTok instead — all of them work without one.": "Δεν έχετε αριθμό τηλεφώνου για WhatsApp ή SMS; Χρησιμοποιήστε Instagram, Messenger ή TikTok — όλα λειτουργούν χωρίς αριθμό.",
 "Request an Appointment": "Αίτηση Ραντεβού",
 "Fill in your details and we'll confirm your appointment as soon as possible.": "Συμπληρώστε τα στοιχεία σας και θα επιβεβαιώσουμε το ραντεβού σας το συντομότερο δυνατό.",
 "Your name": "Το όνομά σας",
 "Phone number (optional if you fill in another contact below)": "Αριθμός τηλεφώνου (προαιρετικός αν συμπληρώσετε άλλο στοιχείο επικοινωνίας παρακάτω)",
 "No phone number? Tell us where to reach you": "Δεν έχετε τηλέφωνο; Πείτε μας πώς να επικοινωνήσουμε μαζί σας",
 "e.g. Instagram @yourhandle, Facebook name, TikTok @yourhandle...": "π.χ. Instagram @το_όνομά_σας, όνομα στο Facebook, TikTok @το_όνομά_σας...",
 "Service": "Υπηρεσία",
 "Preferred staff (optional)": "Προτιμώμενο μέλος προσωπικού (προαιρετικό)",
 "No preference": "Καμία προτίμηση",
 "Date": "Ημερομηνία",
 "Time": "Ώρα",
 "Health & Safety Screening": "Έλεγχος Υγείας & Ασφάλειας",
 "This treatment requires a quick health check before booking. Please tick anything that applies to you — this helps us keep your session safe.": "Αυτή η θεραπεία απαιτεί έναν σύντομο έλεγχο υγείας πριν την κράτηση. Παρακαλούμε επιλέξτε ό,τι ισχύει για εσάς — αυτό μας βοηθά να διατηρούμε τη συνεδρία σας ασφαλή.",
 "Pregnant or trying to conceive": "Εγκυμοσύνη ή προσπάθεια σύλληψης",
 "Heart condition or pacemaker": "Καρδιακή πάθηση ή βηματοδότης",
 "Blood clotting disorder or on blood thinners": "Διαταραχή πήξης του αίματος ή λήψη αντιπηκτικών",
 "Recent surgery (last 6 months)": "Πρόσφατη χειρουργική επέμβαση (τους τελευταίους 6 μήνες)",
 "Skin condition or open wounds in the treatment area": "Δερματική πάθηση ή ανοιχτά τραύματα στην περιοχή θεραπείας",
 "Cancer (current or recent treatment)": "Καρκίνος (τρέχουσα ή πρόσφατη θεραπεία)",
 "Epilepsy": "Επιληψία",
 "Diabetes": "Διαβήτης",
 "Allergies (please detail below)": "Αλλεργίες (παρακαλούμε δώστε λεπτομέρειες παρακάτω)",
 "Other / anything else we should know (optional)": "Άλλο / οτιδήποτε άλλο πρέπει να γνωρίζουμε (προαιρετικό)",
 "Add any details about the above, or anything else relevant...": "Προσθέστε λεπτομέρειες για τα παραπάνω ή οτιδήποτε άλλο σχετικό...",
 "I confirm the information above is accurate and complete to the best of my knowledge.": "Επιβεβαιώνω ότι οι παραπάνω πληροφορίες είναι ακριβείς και πλήρεις εξ όσων γνωρίζω.",
 "Notes (optional)": "Σημειώσεις (προαιρετικό)",
 "Anything we should know?": "Κάτι που πρέπει να γνωρίζουμε;",
 "Request Appointment": "Αίτημα Ραντεβού",
 "Get in touch": "Επικοινωνήστε",
 "Book an appointment ↗": "Κλείστε ραντεβού ↗",
 "Phone": "Τηλέφωνο",
 "Chat with us": "Συνομιλήστε μαζί μας",
 "Message us on Facebook": "Στείλτε μας μήνυμα στο Facebook",
 "Text us": "Στείλτε μας SMS",
 "Address": "Διεύθυνση",
 "Kykkou 5, Strovolos 20262, Nicossia ↗": "Κύκκου 5, Στρόβολος 20262, Λευκωσία ↗",
 "Your phone number": "Το τηλέφωνό σας",
 "What treatment are you interested in?": "Ποια θεραπεία σας ενδιαφέρει;",
 "Send message": "Αποστολή μηνύματος",
 "This opens WhatsApp with your details pre-filled so we can reply quickly.": "Αυτό ανοίγει το WhatsApp με τα στοιχεία σας συμπληρωμένα ώστε να απαντήσουμε γρήγορα.",
 "Studio": "Στούντιο",
 "Back to Gallery": "Επιστροφή στη Γκαλερί",
 "Treatment room": "Θάλαμος θεραπείας",
 "Laser session": "Συνεδρία laser",
 "Product shelf": "Ράφι προϊόντων",
 "Reception": "Ρεσεψιόν",
 "Massage room": "Χώρος μασάζ",
 "Benefits": "Οφέλη",
 "Why Clients Choose Each Treatment": "Γιατί οι Πελάτες Επιλέγουν Κάθε Θεραπεία",
 "Tap a treatment to see what it actually does for you.": "Πατήστε σε μια θεραπεία για να δείτε τι μπορεί να κάνει για εσάς.",
 "Laser Hair Removal benefits": "Οφέλη Αποτρίχωσης με Laser",
 "Relaxing Massage benefits": "Οφέλη Χαλαρωτικού Μασάζ",
 "Hot Stone Massage benefits": "Οφέλη Μασάζ με Θερμές Πέτρες",
 "Aromatherapy benefits": "Οφέλη Αρωματοθεραπείας",
 "Bookings, Deposits & Cancellation Policy": "Κρατήσεις, Προκαταβολές & Πολιτική Ακύρωσης",
 "A €10 deposit is required to secure your appointment.": "Απαιτείται προκαταβολή €10 για την εξασφάλιση του ραντεβού σας.",
 "Your appointment is considered confirmed once the required deposit has been received.": "Το ραντεβού σας θεωρείται επιβεβαιωμένο μόλις ληφθεί η απαιτούμενη προκαταβολή.",
 "The €10 deposit is applied toward the total cost of your treatment.": "Η προκαταβολή των €10 συμψηφίζεται με το συνολικό κόστος της θεραπείας σας.",
 "If you need to cancel or reschedule your appointment, please contact us as early as possible.": "Αν χρειαστεί να ακυρώσετε ή να αλλάξετε το ραντεβού σας, παρακαλούμε επικοινωνήστε μαζί μας το συντομότερο δυνατό.",
 "Late cancellations and missed appointments may result in the €10 deposit being non-refundable and a new deposit being required to make another booking.": "Οι καθυστερημένες ακυρώσεις και οι απουσίες ενδέχεται να έχουν ως αποτέλεσμα η προκαταβολή των €10 να μην επιστρέφεται και να απαιτείται νέα προκαταβολή για οποιαδήποτε επόμενη κράτηση.",
 "This policy helps us protect appointment times reserved exclusively for each client and allows us to offer cancelled appointments to other clients.": "Η πολιτική αυτή μας βοηθά να προστατεύουμε τις ώρες που κρατούνται αποκλειστικά για κάθε πελάτη και μας επιτρέπει να προσφέρουμε ακυρωμένα ραντεβού σε άλλους πελάτες.",
 "By paying your deposit and confirming your appointment, you acknowledge and accept our booking and cancellation policy.": "Πληρώνοντας την προκαταβολή και επιβεβαιώνοντας το ραντεβού σας, αναγνωρίζετε και αποδέχεστε την πολιτική κρατήσεων και ακυρώσεών μας.",
 "Gift Cards": "Δωροκάρτες",
 "Give the gift of beauty, confidence and relaxation.": "Χαρίστε ομορφιά, αυτοπεποίθηση και χαλάρωση.",
 "Gift Voucher": "Δωροεπιταγή",
 "TO": "ΠΡΟΣ",
 "FROM": "ΑΠΟ",
 "AMOUNT": "ΠΟΣΟ",
 "Valid for Laser Hair Removal, Massage & Spa Treatments": "Ισχύει για Αποτρίχωση με Laser, Μασάζ & Θεραπείες Spa",
 "Purchase Gift Card": "Αγορά Δωροκάρτας",
 "Recipient Name": "Όνομα Παραλήπτη",
 "Recipient name": "Όνομα παραλήπτη",
 "Your Name": "Το Όνομά σας",
 "Select Amount": "Επιλέξτε Ποσό",
 "Custom": "Άλλο ποσό",
 "Custom amount (optional)": "Άλλο ποσό (προαιρετικό)",
 "Email Address": "Διεύθυνση Email",
 "Personal Message": "Προσωπικό Μήνυμα",
 "Write a message...": "Γράψτε ένα μήνυμα...",
 "Continue to Payment →": "Συνέχεια στην Πληρωμή →",
 "Online payment coming soon.": "Η πληρωμή online έρχεται σύντομα.",
 "← Back to site": "← Επιστροφή στον ιστότοπο",
 "Nataly Laser House logo": "Λογότυπο Nataly Laser House",
 "Menu": "Μενού",
 "Welcome to Nataly Laser House": "Καλώς ήρθατε στο Nataly Laser House",
 "Learn more": "Μάθετε περισσότερα",
 "Watch our story": "Δείτε<br>την ιστορία μας",
 "Laser Hair Removal & Spa": "Αποτρίχωση με Laser & Spa",
 "Smooth skin, done right.": "Απαλό δέρμα,<br><em>με τη σωστή φροντίδα.</em>",
 "SKIN | BODY | CONFIDENCE": "ΔΕΡΜΑ | ΣΩΜΑ | ΑΥΤΟΠΕΠΟΙΘΗΣΗ",
 "Your beauty and wellness destination in Strovolos, Nicosia — where beauty, self-care and relaxation come together.": "Ο προορισμός ομορφιάς και ευεξίας σας στον Στρόβολο, Λευκωσία — εκεί όπου η ομορφιά, η φροντίδα του εαυτού και η χαλάρωση συναντιούνται.",
 "Book an appointment": "Κλείστε ραντεβού",
 "View price list": "Δείτε τον τιμοκατάλογο",
 "Massage": "Μασάζ",
 "Results": "Αποτελέσματα",
 "Before & After": "Πριν & Μετά",
 "Before": "Πριν",
 "After": "Μετά",
 "Drag to compare before and after": "Σύρετε για σύγκριση πριν και μετά",
 "Luxury Experience": "Πολυτελής<br>Εμπειρία",
 "Expert Technicians": "Εξειδικευμένοι<br>Τεχνικοί",
 "Advanced Technology": "Προηγμένη<br>Τεχνολογία",
 "Safe & Trusted": "Ασφάλεια &<br>Εμπιστοσύνη",
 "Where care meets results": "Εκεί όπου η φροντίδα<br>συναντά τα αποτελέσματα",
 "Our Services": "Οι Υπηρεσίες μας",
 "Tailored to you": "Φτιαγμένες για εσάς",
 "View all services →": "Δείτε όλες τις υπηρεσίες →",
 "Laser Hair Removal": "Αποτρίχωση με Laser",
 "Smooth, hair-free skin with long-lasting results.": "Λείο δέρμα χωρίς τρίχες με μακροχρόνια αποτελέσματα.",
 "Facial Treatments": "Θεραπείες Προσώπου",
 "Cleansing, hydrating and anti-ageing care, tailored to your skin.": "Καθαρισμός, ενυδάτωση και αντιγήρανση, προσαρμοσμένα στο δέρμα σας.",
 "V-Shape Body Treatment": "Θεραπεία Σώματος V-Shape",
 "Non-invasive vacuum & RF body treatment.": "Μη επεμβατική θεραπεία σώματος με κενό (vacuum) και RF.",
 "Relaxing & Therapeutic Massage": "Χαλαρωτικό & Θεραπευτικό Μασάζ",
 "Take time away from your routine and allow your body to relax.": "Αφιερώστε χρόνο μακριά από τη ρουτίνα σας και αφήστε το σώμα σας να χαλαρώσει.",
 "Give the Gift of Beauty": "Χαρίστε Ομορφιά",
 "Laser Hair Removal • Facials • Massage • Nails": "Αποτρίχωση με Laser • Θεραπείες Προσώπου • Μασάζ • Νύχια",
 "Purchase Gift Card →": "Αγορά Δωροκάρτας →",
 "Stay Connected": "Μείνετε σε Επαφή",
 "Exclusive offers & beauty tips & after the treatments": "Αποκλειστικές προσφορές, συμβουλές ομορφιάς & οδηγίες μετά τις θεραπείες",
 "Enter your phone number": "Εισάγετε τον αριθμό τηλεφώνου σας",
 "Subscribe": "Εγγραφή",
 "Please note that in case of more than three last minute cancellations, a €10 deposit will be required.": "Σημειώστε ότι σε περίπτωση περισσότερων από τριών ακυρώσεων της τελευταίας στιγμής, θα απαιτείται προκαταβολή €10.",
 "Manicures & Pedicures, Done With Care": "Μανικιούρ & <em style='color:var(--turquoise);'>Πεντικιούρ,</em><br>Φτιαγμένα με Φροντίδα",
 "Soft gel, tips, and spa-finish hand & foot care — precise, gentle, and built to last.": "Soft gel, tips και περιποίηση χεριών & ποδιών με φινίρισμα spa — με ακρίβεια, απαλότητα και διάρκεια.",
 "View prices": "Δείτε τιμές",
 "Soft gel manicure, close up of finished nails": "Μανικιούρ soft gel, κοντινή λήψη έτοιμων νυχιών",
 "Nail Care": "Περιποίηση Νυχιών",
 "Hands": "Χέρια",
 "Soft Gel": "Soft Gel",
 "Short nails": "Κοντά νύχια",
 "Medium – long": "Μεσαία – μακριά",
 "Tips": "Tips",
 "Short": "Κοντά",
 "Medium": "Μεσαία",
 "Long": "Μακριά",
 "Legs / Pedicure": "Πόδια / Πεντικιούρ",
 "Soft Gel Pedicure": "Πεντικιούρ Soft Gel",
 "Deluxe Spa Pedicure": "Πεντικιούρ Deluxe Spa",
 "Cuticles, scrub, exfoliation, hydration, short massage · ~1 hr 15 min": "Επιδερμίδες, scrub, απολέπιση, ενυδάτωση, σύντομο μασάζ · ~1 ώρα 15 λεπτά",
 "Ready to book your nails?": "Έτοιμοι να κλείσετε ραντεβού για τα νύχια σας;",
 "Book Appointment": "Κλείστε Ραντεβού",
 "Advanced Facial Technology": "Προηγμένη Τεχνολογία Προσώπου",
 "Plasmatique™ + LED Mask": "Plasmatique™ + Μάσκα LED",
 "Powerful non-invasive rejuvenation with cold plasma and LED light therapy.": "Ισχυρή μη επεμβατική αναζωογόνηση με ψυχρό πλάσμα και θεραπεία φωτός LED.",
 "Plasmatique™ + LED Packages": "Πακέτα Plasmatique™ + LED",
 "LED mask included · Individual session €140": "Μάσκα LED συμπεριλαμβάνεται · Μεμονωμένη συνεδρία €140",
 "LED mask included · Individual session": "Μάσκα LED συμπεριλαμβάνεται · Μεμονωμένη συνεδρία",
 "Package": "Πακέτο",
 "Total": "Σύνολο",
 "Per Session": "Ανά Συνεδρία",
 "You Save": "Εξοικονομείτε",
 "4 sessions": "4 συνεδρίες",
 "6 sessions": "6 συνεδρίες",
 "8 sessions": "8 συνεδρίες",
 "Package information:": "Πληροφορίες πακέτου:",
 "Packages are paid in full before the first treatment. Validity: 4 sessions – 3 months; 6 sessions – 4 months; 8 sessions – 6 months. Products and settings are selected according to the client's skin assessment. 24 hours' notice is required for cancellation or rescheduling.": "Τα πακέτα πληρώνονται εξ ολοκλήρου πριν την πρώτη θεραπεία. Ισχύς: 4 συνεδρίες – 3 μήνες· 6 συνεδρίες – 4 μήνες· 8 συνεδρίες – 6 μήνες. Τα προϊόντα και οι ρυθμίσεις επιλέγονται σύμφωνα με την αξιολόγηση του δέρματος του πελάτη. Απαιτείται ειδοποίηση 24 ωρών για ακύρωση ή αλλαγή ραντεβού.",
 "Recommended: 6 Sessions": "Συνιστάται: 6 Συνεδρίες",
 "A balanced programme for clients beginning a consistent anti-age treatment plan.": "Ένα ισορροπημένο πρόγραμμα για πελάτες που ξεκινούν ένα σταθερό πρόγραμμα αντιγήρανσης.",
 "Every session includes the LED mask.": "Κάθε συνεδρία περιλαμβάνει τη μάσκα LED.",
 "Also Available": "Επίσης Διαθέσιμο",
 "Advanced Facial Therapies": "Προηγμένες Θεραπείες Προσώπου",
 "Personalised technology and targeted care designed around your skin's needs.": "Εξατομικευμένη τεχνολογία και στοχευμένη φροντίδα, σχεδιασμένες γύρω από τις ανάγκες του δέρματός σας.",
 "Hydration & Multivitamin Event-Glow Therapy · 60–70 min": "Θεραπεία Ενυδάτωσης & Πολυβιταμινών για Λάμψη · 60–70 λεπτά",
 "Best for:": "Ιδανικό για:",
 "Dehydrated, dull or tired-looking skin and ideal preparation before an event.": "Αφυδατωμένο, θαμπό ή κουρασμένο δέρμα και ιδανική προετοιμασία πριν από εκδήλωση.",
 "Technologies:": "Τεχνολογίες:",
 "HydraFacial + Ultrasound + RF + LED": "HydraFacial + Υπέρηχοι + RF + LED",
 "What the treatment offers": "Τι προσφέρει η θεραπεία",
 "✦ Deep hydration: helps the skin look plumper, softer and more comfortable": "✦ Βαθιά ενυδάτωση: βοηθά το δέρμα να δείχνει πιο γεμάτο, απαλό και άνετο",
 "✦ Multivitamin nourishment: targeted care for dull and tired-looking skin": "✦ Θρέψη με πολυβιταμίνες: στοχευμένη φροντίδα για θαμπό και κουρασμένο δέρμα",
 "✦ Instant-looking radiance: a brighter, fresher and more rested appearance": "✦ Άμεση λάμψη: πιο φωτεινή, φρέσκια και ξεκούραστη όψη",
 "✦ Smoother appearance: visibly refines texture so make-up applies more evenly": "✦ Πιο λεία όψη: βελτιώνει ορατά την υφή ώστε το μακιγιάζ να εφαρμόζει πιο ομοιόμορφα",
 "Advanced Acne & Congestion Therapy · 75–90 min": "Προηγμένη Θεραπεία Ακμής & Φραγμένων Πόρων · 75–90 λεπτά",
 "Oily or acne-prone skin, clogged pores, blackheads and blemishes.": "Λιπαρό ή επιρρεπές στην ακμή δέρμα, φραγμένοι πόροι, μαύρα στίγματα και ατέλειες.",
 "HydraFacial + Plasmatique + LED": "HydraFacial + Plasmatique + LED",
 "✦ Deep cleansing: helps remove sebum, debris and build-up from the pores": "✦ Βαθύς καθαρισμός: βοηθά στην αφαίρεση σμήγματος, ακαθαρσιών και συσσωρεύσεων από τους πόρους",
 "✦ Clearer-looking pores: pores appear less congested and texture more even": "✦ Πιο καθαρή όψη πόρων: οι πόροι δείχνουν λιγότερο φραγμένοι και η υφή πιο ομοιόμορφη",
 "✦ Oil-control support: targeted care helps create a more balanced-looking complexion": "✦ Έλεγχος λιπαρότητας: η στοχευμένη φροντίδα βοηθά σε μια πιο ισορροπημένη όψη",
 "✦ Blemish support: tailored to support blackheads and breakouts without overtreating the skin": "✦ Υποστήριξη ατελειών: προσαρμόζεται για μαύρα στίγματα και εξανθήματα χωρίς υπερβολική επεξεργασία του δέρματος",
 "Advanced Firming & Facial Contour Therapy · 75–90 min": "Προηγμένη Θεραπεία Σύσφιγξης & Περιγράμματος Προσώπου · 75–90 λεπτά",
 "Loss of firmness and a desire for a more defined-looking jawline and cheek contour.": "Απώλεια σφριγηλότητας και επιθυμία για πιο καθαρά σμιλευμένη γραμμή σαγονιού και ζυγωματικών.",
 "RF + Plasmatique + Red LED": "RF + Plasmatique + Κόκκινο LED",
 "✦ Firmer-looking skin: combined technologies support a more toned and refreshed appearance": "✦ Πιο σφριγηλό δέρμα: οι συνδυασμένες τεχνολογίες υποστηρίζουν πιο τονωμένη και φρέσκια όψη",
 "✦ Enhanced-looking contour: focuses on the jawline and cheeks for a more sculpted look": "✦ Βελτιωμένο περίγραμμα: εστιάζει στη γραμμή του σαγονιού και στα ζυγωματικά για πιο σμιλευμένη όψη",
 "✦ Elasticity support: targets the appearance of skin that looks less firm": "✦ Υποστήριξη ελαστικότητας: στοχεύει στην όψη δέρματος που δείχνει λιγότερο σφριγηλό",
 "✦ Rejuvenated appearance: red LED and finishing care leave the complexion looking fresher and brighter": "✦ Αναζωογονημένη όψη: το κόκκινο LED και η φροντίδα φινιρίσματος αφήνουν την επιδερμίδα πιο φρέσκια και φωτεινή",
 "Advanced Anti-Age & Wrinkle Rejuvenation · 75–90 min": "Προηγμένη Αντιγήρανση & Αναζωογόνηση Ρυτίδων · 75–90 λεπτά",
 "Mature-looking skin, fine lines, wrinkles, reduced elasticity and intensive rejuvenation needs.": "Ώριμο δέρμα, λεπτές γραμμές, ρυτίδες, μειωμένη ελαστικότητα και ανάγκες εντατικής αναζωογόνησης.",
 "Anti-Age Products + RF + Red LED": "Προϊόντα Αντιγήρανσης + RF + Κόκκινο LED",
 "✦ Softer-looking fine lines: hydration and anti-age products help lines appear smoother": "✦ Πιο απαλές λεπτές γραμμές: η ενυδάτωση και τα προϊόντα αντιγήρανσης βοηθούν τις γραμμές να δείχνουν πιο λείες",
 "✦ Enhanced firmness: RF supports a more toned and elastic-looking complexion": "✦ Βελτιωμένη σφριγηλότητα: το RF υποστηρίζει πιο τονωμένη και ελαστική όψη",
 "✦ Mature-skin nourishment: targeted serum and mask provide rich age-supporting care": "✦ Θρέψη ώριμου δέρματος: ο στοχευμένος ορός και η μάσκα προσφέρουν πλούσια φροντίδα αντιγήρανσης",
 "✦ Radiance and rejuvenation: leaves the face looking brighter, rested and renewed": "✦ Λάμψη και αναζωογόνηση: αφήνει το πρόσωπο πιο φωτεινό, ξεκούραστο και ανανεωμένο",
 "Not sure which treatment suits you?": "Δεν ξέρετε ποια θεραπεία σας ταιριάζει;",
 "Our aesthetician will assess your skin before the session and recommend the most suitable option.": "Ο αισθητικός μας θα αξιολογήσει το δέρμα σας πριν από τη συνεδρία και θα προτείνει την καταλληλότερη επιλογή.",
 "Technologies are tailored to the skin condition and may be omitted when unsuitable. Results vary by individual.": "Οι τεχνολογίες προσαρμόζονται στην κατάσταση του δέρματος και ενδέχεται να παραλειφθούν όταν δεν ενδείκνυνται. Τα αποτελέσματα διαφέρουν από άτομο σε άτομο.",
 "Price List": "Τιμοκατάλογος",
 "Simple & Transparent Pricing": "Απλές & Διαφανείς Τιμές",
 "Professional laser hair removal and beauty treatment prices in Strovolos, Nicosia, with no hidden fees.": "Επαγγελματικές τιμές αποτρίχωσης με laser και θεραπειών ομορφιάς στον Στρόβολο, Λευκωσία, χωρίς κρυφές χρεώσεις.",
 "Candela Alexandrite Pro-U Laser Hair Removal": "Αποτρίχωση με Laser Candela Alexandrite Pro-U",
 "Women": "Γυναίκες",
 "Full Body": "Ολόκληρο Σώμα",
 "Full Body + Face": "Ολόκληρο Σώμα + Πρόσωπο",
 "Full Face": "Ολόκληρο Πρόσωπο",
 "Legs": "Πόδια",
 "Bikini": "Μπικίνι",
 "Armpits": "Μασχάλες",
 "Men": "Άνδρες",
 "Back": "Πλάτη",
 "Chest": "Στήθος",
 "Arms": "Χέρια",
 "Shoulders": "Ώμοι",
 "For Women": "Για Γυναίκες",
 "For Men": "Για Άνδρες",
 "Laser Repeat – 10-Day Policy": "Επανάληψη Laser – Πολιτική 10 Ημερών",
 "A laser repeat (touch-up) is available within 10 days of your original laser session and is intended only to check and treat any small areas where hairs may have been missed or have not responded as expected during the initial session.": "Η επανάληψη laser (διόρθωση) είναι διαθέσιμη εντός 10 ημερών από την αρχική συνεδρία laser και προορίζεται μόνο για τον έλεγχο και τη θεραπεία μικρών περιοχών όπου μπορεί να παραλείφθηκαν τρίχες ή να μην ανταποκρίθηκαν όπως αναμενόταν κατά την αρχική συνεδρία.",
 "The 10-day period is important because laser hair removal works according to the hair-growth cycle. After this window, we begin moving toward the next growth cycle and therefore toward your next regular laser appointment, rather than repeating the previous session.": "Το διάστημα των 10 ημερών είναι σημαντικό επειδή η αποτρίχωση με laser λειτουργεί σύμφωνα με τον κύκλο ανάπτυξης της τρίχας. Μετά το διάστημα αυτό, προχωράμε προς τον επόμενο κύκλο ανάπτυξης και άρα προς το επόμενο τακτικό ραντεβού laser, αντί να επαναλαμβάνουμε την προηγούμενη συνεδρία.",
 "The repeat is not a second full laser session. It is simply a touch-up of areas where necessary.": "Η επανάληψη δεν αποτελεί δεύτερη πλήρη συνεδρία laser. Είναι απλώς διόρθωση των περιοχών όπου χρειάζεται.",
 "A repeat is completely optional and is not required. If the treated area is clear and you do not notice any remaining hairs that require a touch-up, there is no need to book one.": "Η επανάληψη είναι εντελώς προαιρετική και δεν είναι υποχρεωτική. Αν η περιοχή που θεραπεύτηκε είναι καθαρή και δεν παρατηρείτε τρίχες που χρειάζονται διόρθωση, δεν χρειάζεται να κλείσετε ραντεβού.",
 "If you feel a repeat is necessary, please contact us within 10 days of your original appointment. After the 20-day period, the repeat is no longer valid and treatment will continue at your next scheduled laser session.": "Αν θεωρείτε ότι χρειάζεται επανάληψη, παρακαλούμε επικοινωνήστε μαζί μας εντός 10 ημερών από το αρχικό σας ραντεβού. Μετά την πάροδο 20 ημερών, η επανάληψη δεν ισχύει πλέον και η θεραπεία θα συνεχιστεί στην επόμενη προγραμματισμένη συνεδρία laser.",
 "Save More": "Εξοικονομήστε Περισσότερα",
 "Bundle Deals": "Προσφορές Πακέτων",
 "Combine treatments and save compared to booking them separately.": "Συνδυάστε θεραπείες και εξοικονομήστε σε σύγκριση με την ξεχωριστή κράτησή τους.",
 "Combo": "Συνδυασμός",
 "Back + Chest": "Πλάτη + Στήθος",
 "Back + Arms + Chest": "Πλάτη + Χέρια + Στήθος",
 "Back + Chest + Neck": "Πλάτη + Στήθος + Λαιμός",
 "Bikini + Buttocks": "Μπικίνι + Γλουτοί",
 "Body Treatment": "Θεραπεία Σώματος",
 "A non-invasive body treatment combining vacuum technology and radiofrequency (RF).": "Μια μη επεμβατική θεραπεία σώματος που συνδυάζει τεχνολογία κενού (vacuum) και ραδιοσυχνότητες (RF).",
 "Single Session": "Μεμονωμένη Συνεδρία",
 "Course of 6 Sessions": "Πακέτο 6 Συνεδριών",
 "The V-Shape Cellulite Destroyer": "Το V-Shape Cellulite Destroyer",
 "Advanced non-invasive body contouring": "Προηγμένη μη επεμβατική διαμόρφωση σώματος",
 "A professional treatment designed to improve the appearance of cellulite, refine skin texture and enhance firmness — leaving the body looking smoother and more sculpted.": "Μια επαγγελματική θεραπεία σχεδιασμένη να βελτιώνει την όψη της κυτταρίτιδας, να βελτιώνει την υφή του δέρματος και να ενισχύει τη σφριγηλότητα — αφήνοντας το σώμα πιο λείο και σμιλευμένο.",
 "The protocol combines vacuum therapy, mechanical massage / endermology, cavitation and radiofrequency (RF). Each technology works in harmony: vacuum and massage stimulate the tissues, cavitation supports body contouring, while RF delivers controlled heat to tighten and firm the skin.": "Το πρωτόκολλο συνδυάζει <strong>θεραπεία κενού (vacuum)</strong>, <strong>μηχανικό μασάζ / ενδερμολογία</strong>, <strong>σπηλαίωση</strong> και <strong>ραδιοσυχνότητες (RF)</strong>. Κάθε τεχνολογία λειτουργεί αρμονικά: το κενό και το μασάζ διεγείρουν τους ιστούς, η σπηλαίωση υποστηρίζει τη διαμόρφωση του σώματος, ενώ οι RF παρέχουν ελεγχόμενη θερμότητα για σύσφιγξη και σφριγηλότητα του δέρματος.",
 "Massage Prices": "Τιμές Μασάζ",
 "Relaxing Massage": "Χαλαρωτικό Μασάζ",
 "Sports Massage": "Αθλητικό Μασάζ",
 "Hot Stone Massage": "Μασάζ με Θερμές Πέτρες",
 "Indian Head Massage": "Ινδικό Μασάζ Κεφαλής",
 "Aromatherapy": "Αρωματοθεραπεία",
 "Lymphatic Massage": "Λεμφικό Μασάζ",
 "Cellulite Massage": "Μασάζ Κυτταρίτιδας",
 "Maderotherapy": "Μαδεροθεραπεία",
 "A body massage technique using specially designed wooden tools — distinct from our relaxing massage treatments.": "Μια τεχνική μασάζ σώματος με ειδικά σχεδιασμένα ξύλινα εργαλεία — διαφορετική από τα χαλαρωτικά μασάζ μας.",
 "Full Body Madero": "Μαδεροθεραπεία Ολόκληρου Σώματος",
 "Abdomen & Flanks": "Κοιλιά & Λαγόνες",
 "Legs & Buttocks": "Πόδια & Γλουτοί",
 "Professional facial care selected according to your skin's individual needs.": "Επαγγελματική φροντίδα προσώπου επιλεγμένη σύμφωνα με τις ατομικές ανάγκες του δέρματός σας.",
 "✔ Basic & Deluxe Deep Cleansing": "✔ Βασικός & Deluxe Βαθύς Καθαρισμός",
 "✔ Advanced Facial Therapies": "✔ Προηγμένες Θεραπείες Προσώπου",
 "✔ Plasmatique™ + LED Mask": "✔ Plasmatique™ + Μάσκα LED",
 "✔ Personalised protocols": "✔ Εξατομικευμένα πρωτόκολλα",
 "View All Prices": "Δείτε Όλες τις Τιμές",
 "Deep Facial Cleansing": "Βαθύς Καθαρισμός Προσώπου",
 "Two treatments, designed around your skin's needs.": "Δύο θεραπείες, σχεδιασμένες γύρω από τις ανάγκες του δέρματός σας.",
 "Basic Deep Cleansing": "Βασικός Βαθύς Καθαρισμός",
 "Includes": "Περιλαμβάνει",
 "✓ Make-up removal and cleanse": "✓ Αφαίρεση μακιγιάζ και καθαρισμός",
 "✓ Gentle exfoliation and steam, when suitable": "✓ Απαλή απολέπιση και ατμός, όταν ενδείκνυται",
 "✓ Optional ultrasonic skin scrubber": "✓ Προαιρετικό υπερηχητικό scrubber δέρματος",
 "✓ Basic Hydra hydrodermabrasion, suction and hydration": "✓ Βασική υδροδερμοαπόξεση Hydra, αναρρόφηση και ενυδάτωση",
 "✓ Targeted manual extractions": "✓ Στοχευμένος χειροκίνητος καθαρισμός πόρων (extractions)",
 "✓ Skin-specific mask": "✓ Μάσκα προσαρμοσμένη στο δέρμα",
 "✓ Serum, moisturiser and SPF": "✓ Ορός, ενυδατική κρέμα και SPF",
 "✦ Cleaner, less congested-looking pores": "✦ Πιο καθαροί, λιγότερο φραγμένοι πόροι",
 "✦ Smoother, softer skin texture": "✦ Πιο λεία, απαλή υφή δέρματος",
 "✦ Removal of dead skin cells and surface build-up": "✦ Αφαίρεση νεκρών κυττάρων και επιφανειακών συσσωρεύσεων",
 "✦ A fresh feel with balanced hydration": "✦ Αίσθηση φρεσκάδας με ισορροπημένη ενυδάτωση",
 "Best for": "Ιδανικό για",
 "A first appointment, regular maintenance, or anyone wanting a complete yet simpler deep cleanse.": "Για πρώτο ραντεβού, τακτική συντήρηση ή για όσους θέλουν έναν πλήρη αλλά πιο απλό βαθύ καθαρισμό.",
 "Deluxe Advanced Deep Cleansing": "Deluxe Προηγμένος Βαθύς Καθαρισμός",
 "✓ Everything included in Basic": "✓ Όλα όσα περιλαμβάνονται στο Βασικό",
 "✓ Enhanced Hydra protocol and more detailed extractions": "✓ Ενισχυμένο πρωτόκολλο Hydra και πιο λεπτομερής καθαρισμός πόρων",
 "✓ Targeted serum infusion": "✓ Στοχευμένη έγχυση ορού",
 "✓ Facial RF for a firmer-looking complexion, when suitable": "✓ RF προσώπου για πιο σφριγηλή όψη, όταν ενδείκνυται",
 "✓ Cold hammer for a cooling, calming finish": "✓ Cold hammer για δροσιστικό, καταπραϋντικό φινίρισμα",
 "✓ Specialised mask": "✓ Εξειδικευμένη μάσκα",
 "✓ 10–15 minutes of LED light therapy": "✓ 10–15 λεπτά θεραπείας φωτός LED",
 "✦ A deeper, more comprehensive cleanse": "✦ Βαθύτερος, πιο ολοκληρωμένος καθαρισμός",
 "✦ Enhanced hydration and an immediate-looking glow": "✦ Ενισχυμένη ενυδάτωση και άμεση λάμψη",
 "✦ A smoother, refreshed and rested appearance": "✦ Πιο λεία, φρέσκια και ξεκούραστη όψη",
 "✦ Targeted care for dullness, oiliness or fine lines": "✦ Στοχευμένη φροντίδα για θαμπάδα, λιπαρότητα ή λεπτές γραμμές",
 "✦ An advanced experience with personalised technologies": "✦ Μια προηγμένη εμπειρία με εξατομικευμένες τεχνολογίες",
 "When you want more than cleansing: enhanced glow, hydration and advanced care tailored to your skin.": "Όταν θέλετε κάτι περισσότερο από καθαρισμό: ενισχυμένη λάμψη, ενυδάτωση και προηγμένη φροντίδα προσαρμοσμένη στο δέρμα σας.",
 "Not sure which one to choose?": "Δεν ξέρετε ποιο να επιλέξετε;",
 "Before treatment, our aesthetician will assess your skin and recommend the most suitable option.": "Πριν τη θεραπεία, ο αισθητικός μας θα αξιολογήσει το δέρμα σας και θα προτείνει την καταλληλότερη επιλογή.",
 "Treatment steps are tailored to your skin condition, and certain technologies may be omitted when unsuitable. Results vary by individual.": "Τα βήματα της θεραπείας προσαρμόζονται στην κατάσταση του δέρματός σας και ορισμένες τεχνολογίες ενδέχεται να παραλειφθούν όταν δεν ενδείκνυνται. Τα αποτελέσματα διαφέρουν από άτομο σε άτομο.",
 "Facial Treatment Packages": "Πακέτα Θεραπειών Προσώπου",
 "The more sessions you choose, the greater your total saving.": "Όσο περισσότερες συνεδρίες επιλέγετε, τόσο μεγαλύτερη η συνολική εξοικονόμηση.",
 "Treatment": "Θεραπεία",
 "Single": "Μεμονωμένη",
 "4 Sessions": "4 Συνεδρίες",
 "6 Sessions": "6 Συνεδρίες",
 "8 Sessions": "8 Συνεδρίες",
 "Recommended choice: 6-session packages": "Συνιστώμενη επιλογή: Πακέτα 6 συνεδριών",
 "Lock in a better price per session. Six sessions offer the ideal balance of consistency and savings, and consistency helps you follow the personalised plan recommended by your aesthetician.": "Εξασφαλίστε καλύτερη τιμή ανά συνεδρία. Οι έξι συνεδρίες προσφέρουν την ιδανική ισορροπία συνέπειας και εξοικονόμησης, και η συνέπεια σας βοηθά να ακολουθήσετε το εξατομικευμένο πρόγραμμα που προτείνει ο αισθητικός σας.",
 "Your aesthetician will recommend the suitable number and frequency of sessions after assessing your skin. Packages apply to the same treatment and cannot be mixed across different treatments unless otherwise approved by Nataly Laser House.": "Ο αισθητικός σας θα προτείνει τον κατάλληλο αριθμό και συχνότητα συνεδριών μετά την αξιολόγηση του δέρματός σας. Τα πακέτα ισχύουν για την ίδια θεραπεία και δεν μπορούν να συνδυαστούν μεταξύ διαφορετικών θεραπειών, εκτός αν εγκριθεί διαφορετικά από το Nataly Laser House.",
 "See what each treatment includes →": "Δείτε τι περιλαμβάνει κάθε θεραπεία →",
 "Recommended: 6 sessions": "Συνιστάται: 6 συνεδρίες",
 "A balanced programme for clients beginning a consistent anti-age treatment plan. Every session includes the LED mask.": "Ένα ισορροπημένο πρόγραμμα για πελάτες που ξεκινούν ένα σταθερό πρόγραμμα αντιγήρανσης. Κάθε συνεδρία περιλαμβάνει τη μάσκα LED.",
 "Learn more about Plasmatique™ →": "Μάθετε περισσότερα για το Plasmatique™ →",
 "Advanced cold plasma technology combined with LED light therapy for powerful rejuvenation.": "Προηγμένη τεχνολογία ψυχρού πλάσματος σε συνδυασμό με θεραπεία φωτός LED για ισχυρή αναζωογόνηση.",
 "✔ Individual session from €140": "✔ Μεμονωμένη συνεδρία από €140",
 "✔ Packages from 4 to 8 sessions": "✔ Πακέτα από 4 έως 8 συνεδρίες",
 "✔ LED mask included in every session": "✔ Μάσκα LED σε κάθε συνεδρία",
 "Learn more & Prices →": "Μάθετε περισσότερα & Τιμές →",
 "View Nail Prices →": "Δείτε Τιμές Νυχιών →",
 "Lash & Brow": "Βλεφαρίδες & Φρύδια",
 "Lash Lift": "Lash Lift (Ανόρθωση Βλεφαρίδων)",
 "Enhance your natural lashes without extensions.": "Αναδείξτε τις φυσικές σας βλεφαρίδες χωρίς επεκτάσεις.",
 "Brow Lamination": "Λαμινάρισμα Φρυδιών",
 "Fuller-looking, more defined and beautifully styled brows.": "Φρύδια που δείχνουν πιο πλούσια, πιο καθορισμένα και όμορφα σχηματισμένα.",
 "Lash Lift + Brow Lamination": "Lash Lift + Λαμινάρισμα Φρυδιών",
 "Book both together and save.": "Κλείστε και τα δύο μαζί και εξοικονομήστε.",
 "Special Offer — Both Together": "Ειδική Προσφορά — Και τα Δύο Μαζί",
 "Lymphatic Massage Packages": "Πακέτα Λεμφικού Μασάζ",
 "Relief from fluid retention and detoxification, reduced puffiness and a lighter feeling.": "Ανακούφιση από κατακράτηση υγρών και αποτοξίνωση, μείωση του πρηξίματος και αίσθηση ελαφρότητας.",
 "Lymphatic Massage — 50 Minutes": "Λεμφικό Μασάζ — 50 Λεπτά",
 "Sessions": "Συνεδρίες",
 "Price": "Τιμή",
 "€20 off each session": "€20 έκπτωση σε κάθε συνεδρία",
 "Lymphatic Massage — 60 Minutes": "Λεμφικό Μασάζ — 60 Λεπτά",
 "Thank you for choosing us": "Ευχαριστούμε που μας επιλέξατε",
 "We can't wait to welcome you back": "Ανυπομονούμε να σας καλωσορίσουμε ξανά",
 "Ready To Book?": "Έτοιμοι να Κλείσετε;",
 "Contact us today to arrange your appointment or ask us any questions about our treatments.": "Επικοινωνήστε μαζί μας σήμερα για να κανονίσετε το ραντεβού σας ή να μας κάνετε οποιαδήποτε ερώτηση για τις θεραπείες μας.",
 "Online Payments": "Πληρωμές Online",
 "For selected services and appointments, online payment is available.": "Για επιλεγμένες υπηρεσίες και ραντεβού, διατίθεται πληρωμή online.",
 "Depending on the booking, you may:": "Ανάλογα με την κράτηση, μπορείτε να:",
 "Pay the required deposit online": "Πληρώσετε online την απαιτούμενη προκαταβολή",
 "Pay the full treatment amount online": "Πληρώσετε online ολόκληρο το ποσό της θεραπείας",
 "Pay part of the amount online and the remaining balance at Nataly Laser House": "Πληρώσετε μέρος του ποσού online και το υπόλοιπο στο Nataly Laser House",
 "If you would prefer to split your payment, please contact us before completing your booking so our team can guide you through the available payment options.": "Αν προτιμάτε να μοιράσετε την πληρωμή σας, παρακαλούμε επικοινωνήστε μαζί μας πριν ολοκληρώσετε την κράτησή σας ώστε η ομάδα μας να σας καθοδηγήσει στις διαθέσιμες επιλογές πληρωμής.",
 "Treatments We Offer": "Θεραπείες που Προσφέρουμε",
 "Discover our professional laser hair removal and beauty treatments in Strovolos, Nicosia, designed to help you feel confident and relaxed. Nataly Laser House welcomes both new and returning clients for laser hair removal, facial treatments, V-Shape body treatments, Maderotherapy, massage, nails, lash lift and brow lamination.": "Ανακαλύψτε τις επαγγελματικές μας θεραπείες αποτρίχωσης με laser και ομορφιάς στον Στρόβολο, Λευκωσία, σχεδιασμένες για να νιώθετε αυτοπεποίθηση και χαλάρωση. Το Nataly Laser House καλωσορίζει νέους και επιστρέφοντες πελάτες για αποτρίχωση με laser, θεραπείες προσώπου, θεραπείες σώματος V-Shape, μαδεροθεραπεία, μασάζ, νύχια, lash lift και λαμινάρισμα φρυδιών.",
 "Advanced laser hair removal designed to provide effective and long-lasting hair reduction.": "Προηγμένη αποτρίχωση με laser σχεδιασμένη να προσφέρει αποτελεσματική και μακροχρόνια μείωση των τριχών.",
 "✔ Progressive reduction of unwanted hair": "✔ Προοδευτική μείωση των ανεπιθύμητων τριχών",
 "✔ Helps reduce ingrown hairs": "✔ Βοηθά στη μείωση των εγκλωβισμένων τριχών",
 "✔ Leaves the skin feeling smoother": "✔ Αφήνει το δέρμα πιο απαλό",
 "✔ Fast treatment for both small and large areas": "✔ Γρήγορη θεραπεία τόσο για μικρές όσο και για μεγάλες περιοχές",
 "✔ Dynamic Cooling technology for greater comfort during treatment": "✔ Τεχνολογία Dynamic Cooling για μεγαλύτερη άνεση κατά τη θεραπεία",
 "✔ Suitable treatment plans for both women and men": "✔ Κατάλληλα προγράμματα θεραπείας για γυναίκες και άνδρες",
 "View Prices": "Δείτε Τιμές",
 "Our facial treatments are selected according to your skin's individual needs.": "Οι θεραπείες προσώπου μας επιλέγονται σύμφωνα με τις ατομικές ανάγκες του δέρματός σας.",
 "✔ Acne-prone and congested skin": "✔ Δέρμα επιρρεπές στην ακμή και με φραγμένους πόρους",
 "✔ Hydration": "✔ Ενυδάτωση",
 "✔ Deep cleansing": "✔ Βαθύς καθαρισμός",
 "✔ Anti-ageing care": "✔ Αντιγήρανση",
 "✔ Lifting and firmness": "✔ Σύσφιγξη και σφριγηλότητα",
 "✔ Skin glow and revitalisation": "✔ Λάμψη και αναζωογόνηση του δέρματος",
 "✔ Uneven-looking pigmentation": "✔ Ανομοιόμορφη όψη μελάγχρωσης",
 "✔ Sensitive-looking skin and redness": "✔ Ευαίσθητο δέρμα και ερυθρότητα",
 "Treatments may incorporate technologies such as HydraFacial, radiofrequency, ultrasound, LED Mask Therapy and Plasmatique™ Cold Plasma, depending on the selected protocol.": "Οι θεραπείες ενδέχεται να ενσωματώνουν τεχνολογίες όπως HydraFacial, ραδιοσυχνότητες, υπερήχους, θεραπεία με Μάσκα LED και Ψυχρό Πλάσμα Plasmatique™, ανάλογα με το επιλεγμένο πρωτόκολλο.",
 "Facial Cleansing": "Καθαρισμός Προσώπου",
 "Professional cleansing treatments designed to deeply cleanse and refresh the skin.": "Επαγγελματικές θεραπείες καθαρισμού σχεδιασμένες να καθαρίζουν βαθιά και να ανανεώνουν το δέρμα.",
 "✔ Removes impurities and excess oil": "✔ Αφαιρεί ακαθαρσίες και την περίσσεια λιπαρότητας",
 "✔ Helps unclog congested pores": "✔ Βοηθά στην αποφρακτικοποίηση των φραγμένων πόρων",
 "✔ Removes dead skin cells": "✔ Αφαιρεί τα νεκρά κύτταρα του δέρματος",
 "✔ Helps improve skin texture": "✔ Βοηθά στη βελτίωση της υφής του δέρματος",
 "✔ Leaves the complexion looking cleaner and fresher": "✔ Αφήνει την επιδερμίδα πιο καθαρή και φρέσκια",
 "✔ Basic & Deep Cleansing": "✔ Βασικός & Βαθύς Καθαρισμός",
 "✔ Hydration & Glow": "✔ Ενυδάτωση & Λάμψη",
 "✔ Anti-ageing & Firmness": "✔ Αντιγήρανση & Σφριγηλότητα",
 "✔ Acne-prone & Congested skin": "✔ Δέρμα επιρρεπές στην ακμή & με φραγμένους πόρους",
 "✔ Skin rejuvenation & texture": "✔ Αναζωογόνηση & υφή δέρματος",
 "✔ Supports anti-ageing protocols": "✔ Υποστηρίζει πρωτόκολλα αντιγήρανσης",
 "✔ Helps with acne-prone skin": "✔ Βοηθά το δέρμα που είναι επιρρεπές στην ακμή",
 "✔ Non-invasive & comfortable": "✔ Μη επεμβατικό & άνετο",
 "Learn more →": "Μάθετε περισσότερα →",
 "Basic & Deep Cleansing": "Βασικός & Βαθύς Καθαρισμός",
 "Professional cleansing treatments that deeply cleanse and refresh the skin.": "Επαγγελματικές θεραπείες καθαρισμού που καθαρίζουν βαθιά και ανανεώνουν το δέρμα.",
 "✔ Removes impurities & excess oil": "✔ Αφαιρεί ακαθαρσίες & την περίσσεια λιπαρότητας",
 "✔ Unclogs congested pores": "✔ Αποφράσσει τους φραγμένους πόρους",
 "✔ Improves skin texture": "✔ Βελτιώνει την υφή του δέρματος",
 "✔ Leaves skin cleaner & fresher": "✔ Αφήνει το δέρμα πιο καθαρό & φρέσκο",
 "✔ Helps improve the appearance of cellulite": "✔ Βοηθά στη βελτίωση της όψης της κυτταρίτιδας",
 "✔ Supports smoother-looking skin": "✔ Υποστηρίζει πιο λεία όψη δέρματος",
 "✔ Helps with skin firmness and toning": "✔ Βοηθά στη σφριγηλότητα και τόνωση του δέρματος",
 "✔ Improves the appearance of targeted body areas": "✔ Βελτιώνει την όψη των περιοχών-στόχων του σώματος",
 "✔ Non-surgical and non-invasive": "✔ Μη χειρουργική και μη επεμβατική",
 "Massage, Maderotherapy and Lymphatic Massage": "Μασάζ, Μαδεροθεραπεία και Λεμφικό Μασάζ",
 "Massage, Maderotherapy & Lymphatic Massage": "Μασάζ, Μαδεροθεραπεία & Λεμφικό Μασάζ",
 "Depending on the massage selected, benefits may include:": "Ανάλογα με το επιλεγμένο μασάζ, τα οφέλη μπορεί να περιλαμβάνουν:",
 "✔ Relaxation and stress relief": "✔ Χαλάρωση και ανακούφιση από το άγχος",
 "✔ Relief from muscular tension": "✔ Ανακούφιση από μυϊκή ένταση",
 "✔ Improved feeling of wellbeing": "✔ Βελτιωμένη αίσθηση ευεξίας",
 "✔ Support for tired and overworked muscles": "✔ Υποστήριξη για κουρασμένους και υπερκουρασμένους μύες",
 "✔ Lymphatic drainage and reduction of fluid retention": "✔ Λεμφική παροχέτευση και μείωση της κατακράτησης υγρών",
 "Ask our team which massage is most suitable for you.": "Ρωτήστε την ομάδα μας ποιο μασάζ σας ταιριάζει περισσότερο.",
 "— a body massage technique using specially designed wooden tools.": "— μια τεχνική μασάζ σώματος με ειδικά σχεδιασμένα ξύλινα εργαλεία.",
 "✔ Supports lymphatic drainage": "✔ Υποστηρίζει τη λεμφική παροχέτευση",
 "✔ Stimulates circulation": "✔ Διεγείρει την κυκλοφορία",
 "✔ Helps reduce the feeling of fluid retention": "✔ Βοηθά στη μείωση της αίσθησης κατακράτησης υγρών",
 "✔ Provides massage and body-contouring benefits": "✔ Προσφέρει οφέλη μασάζ και διαμόρφωσης σώματος",
 "Nail Services": "Υπηρεσίες Νυχιών",
 "From elegant, minimal nails to statement designs, our nail services are tailored to your preferred style.": "Από κομψά, μινιμαλιστικά νύχια έως εντυπωσιακά σχέδια, οι υπηρεσίες νυχιών μας προσαρμόζονται στο προσωπικό σας στιλ.",
 "✔ Professional nail care": "✔ Επαγγελματική περιποίηση νυχιών",
 "✔ Clean and polished appearance": "✔ Καθαρή και προσεγμένη εμφάνιση",
 "✔ Wide choice of colours and designs": "✔ Μεγάλη ποικιλία χρωμάτων και σχεδίων",
 "✔ Personalised shape and style": "✔ Εξατομικευμένο σχήμα και στιλ",
 "✔ Lifts and curls your natural lashes": "✔ Ανορθώνει και κουλουριάζει τις φυσικές βλεφαρίδες",
 "✔ Makes lashes appear longer and more defined": "✔ Κάνει τις βλεφαρίδες να δείχνουν μακρύτερες και πιο καθορισμένες",
 "✔ Low-maintenance result": "✔ Αποτέλεσμα χαμηλής συντήρησης",
 "✔ No lash extensions required": "✔ Δεν απαιτούνται επεκτάσεις βλεφαρίδων",
 "Designed to create fuller-looking, more defined and beautifully styled brows.": "Σχεδιασμένο να δημιουργεί φρύδια που δείχνουν πιο πλούσια, πιο καθορισμένα και όμορφα σχηματισμένα.",
 "✔ Helps create a fuller brow appearance": "✔ Βοηθά να δημιουργηθεί όψη πιο πλούσιων φρυδιών",
 "✔ Keeps brow hairs looking more uniform": "✔ Κρατά τις τρίχες των φρυδιών πιο ομοιόμορφες",
 "✔ Defines the natural brow shape": "✔ Καθορίζει το φυσικό σχήμα του φρυδιού",
 "✔ Makes daily brow styling easier": "✔ Διευκολύνει το καθημερινό styling των φρυδιών",
 "Lash Lift & Brow Lamination": "Lash Lift & Λαμινάρισμα Φρυδιών",
 "Questions": "Ερωτήσεις",
 "Frequently Asked Questions": "Συχνές Ερωτήσεις",
 "How many laser hair removal sessions will I need?": "Πόσες συνεδρίες αποτρίχωσης με laser θα χρειαστώ;",
 "Most clients see a permanent reduction in hair growth after 6 to 8 sessions, spaced 4 to 6 weeks apart. The exact number depends on your hair type, skin tone, and the treatment area, so we'll give you a personalised estimate at your first visit.": "Οι περισσότεροι πελάτες παρατηρούν μόνιμη μείωση της τριχοφυΐας μετά από 6 έως 8 συνεδρίες, με απόσταση 4 έως 6 εβδομάδων. Ο ακριβής αριθμός εξαρτάται από τον τύπο των τριχών σας, τον τόνο του δέρματος και την περιοχή θεραπείας, γι' αυτό θα σας δώσουμε μια εξατομικευμένη εκτίμηση στην πρώτη σας επίσκεψη.",
 "Is laser hair removal painful?": "Πονάει η αποτρίχωση με laser;",
 "Most people describe it as a warm snapping sensation rather than pain. Our equipment includes cooling technology to keep you comfortable, and sensitivity varies by treatment area.": "Οι περισσότεροι άνθρωποι την περιγράφουν ως μια αίσθηση ζεστού τσιμπήματος και όχι ως πόνο. Ο εξοπλισμός μας περιλαμβάνει τεχνολογία ψύξης για να νιώθετε άνετα, ενώ η ευαισθησία διαφέρει ανάλογα με την περιοχή θεραπείας.",
 "How do I prepare for a laser hair removal session?": "Πώς προετοιμάζομαι για μια συνεδρία αποτρίχωσης με laser;",
 "Shave the treatment area 24 hours before your appointment, avoid sun exposure and tanning for at least 2 weeks prior, and skip waxing or plucking in the weeks leading up to treatment, since the laser targets the hair root.": "Ξυρίστε την περιοχή θεραπείας 24 ώρες πριν το ραντεβού σας, αποφύγετε την έκθεση στον ήλιο και το μαύρισμα για τουλάχιστον 2 εβδομάδες πριν, και μην κάνετε κερί ή μαδήματα τις εβδομάδες πριν τη θεραπεία, καθώς το laser στοχεύει τη ρίζα της τρίχας.",
 "Do you offer laser hair removal for men?": "Προσφέρετε αποτρίχωση με laser για άνδρες;",
 "Yes. We treat men and women for all areas, including back, chest, shoulders, and face, using the same professional-grade equipment.": "Ναι. Θεραπεύουμε άνδρες και γυναίκες σε όλες τις περιοχές, συμπεριλαμβανομένων της πλάτης, του στήθους, των ώμων και του προσώπου, χρησιμοποιώντας τον ίδιο επαγγελματικό εξοπλισμό.",
 "What's the difference between a relaxing massage and a hot stone massage?": "Ποια είναι η διαφορά ανάμεσα σε ένα χαλαρωτικό μασάζ και ένα μασάζ με θερμές πέτρες;",
 "A relaxing massage uses classic techniques to ease everyday tension and improve circulation. A hot stone massage adds heated stones to relax muscles more deeply, which is ideal if you're carrying a lot of tension or prefer a warmer, slower treatment.": "Το χαλαρωτικό μασάζ χρησιμοποιεί κλασικές τεχνικές για να απαλύνει την καθημερινή ένταση και να βελτιώσει την κυκλοφορία. Το μασάζ με θερμές πέτρες προσθέτει θερμαινόμενες πέτρες για βαθύτερη χαλάρωση των μυών, ιδανικό αν κουβαλάτε πολλή ένταση ή προτιμάτε μια πιο ζεστή, πιο αργή θεραπεία.",
 "Where is Nataly Laser House located?": "Πού βρίσκεται το Nataly Laser House;",
 "We are located at Kykkou 5, Strovolos, Nicosia, Cyprus. Our beauty space is located in the Strovolos area of Nicosia, making it convenient for clients coming from Strovolos and surrounding areas. For assistance finding us, please contact our team before your appointment and we will be happy to guide you.": "Βρισκόμαστε στην οδό Κύκκου 5, Στρόβολος, Λευκωσία, Κύπρος. Ο χώρος ομορφιάς μας βρίσκεται στην περιοχή του Στροβόλου στη Λευκωσία, εύκολα προσβάσιμος για πελάτες από τον Στρόβολο και τις γύρω περιοχές. Για βοήθεια στην εύρεσή μας, παρακαλούμε επικοινωνήστε με την ομάδα μας πριν το ραντεβού σας και θα χαρούμε να σας καθοδηγήσουμε.",
 "Do I need an appointment?": "Χρειάζομαι ραντεβού;",
 "Yes. We recommend booking your appointment in advance to ensure availability for your preferred treatment, date and time.": "Ναι. Συνιστούμε να κλείνετε το ραντεβού σας εκ των προτέρων ώστε να διασφαλίσετε διαθεσιμότητα για την προτιμώμενη θεραπεία, ημερομηνία και ώρα σας.",
 "How do I know which treatment is right for me?": "Πώς θα ξέρω ποια θεραπεία μου ταιριάζει;",
 "You don't need to decide alone. Tell our team what you would like to improve or achieve and we can guide you toward the most appropriate treatment.": "Δεν χρειάζεται να αποφασίσετε μόνοι σας. Πείτε στην ομάδα μας τι θα θέλατε να βελτιώσετε ή να πετύχετε και θα σας καθοδηγήσουμε προς την καταλληλότερη θεραπεία.",
 "How many sessions will I need?": "Πόσες συνεδρίες θα χρειαστώ;",
 "This depends on the treatment, treatment area and individual response. Some treatments are suitable as individual sessions, while others provide better results when completed as a course.": "Αυτό εξαρτάται από τη θεραπεία, την περιοχή θεραπείας και την ατομική ανταπόκριση. Ορισμένες θεραπείες ενδείκνυνται ως μεμονωμένες συνεδρίες, ενώ άλλες προσφέρουν καλύτερα αποτελέσματα όταν ολοκληρώνονται ως πρόγραμμα.",
 "Can I combine treatments?": "Μπορώ να συνδυάσω θεραπείες;",
 "Depending on the treatments and any contraindications, certain services can be combined. Ask our team when booking and we can recommend suitable combinations.": "Ανάλογα με τις θεραπείες και τυχόν αντενδείξεις, ορισμένες υπηρεσίες μπορούν να συνδυαστούν. Ρωτήστε την ομάδα μας κατά την κράτηση και θα σας προτείνουμε κατάλληλους συνδυασμούς.",
 "Can men book treatments?": "Μπορούν και οι άνδρες να κλείσουν θεραπείες;",
 "Of course. Many of our treatments, including laser hair removal, facial treatments and massage, are available for both women and men.": "Φυσικά. Πολλές από τις θεραπείες μας, συμπεριλαμβανομένων της αποτρίχωσης με laser, των θεραπειών προσώπου και του μασάζ, είναι διαθέσιμες τόσο για γυναίκες όσο και για άνδρες.",
 "Do you offer gift vouchers?": "Προσφέρετε δωροεπιταγές;",
 "Yes. Nataly Laser House gift vouchers are a lovely option for birthdays, celebrations or simply giving someone a little time for themselves.": "Ναι. Οι δωροεπιταγές του Nataly Laser House είναι μια υπέροχη επιλογή για γενέθλια, γιορτές ή απλώς για να χαρίσετε σε κάποιον λίγο χρόνο για τον εαυτό του.",
 "What should I do if I have a medical condition?": "Τι πρέπει να κάνω αν έχω κάποιο ιατρικό πρόβλημα;",
 "Please inform us about relevant medical conditions, medications, pregnancy or other health considerations before your treatment. Certain treatments may not be suitable, may need to be modified, or may require medical clearance.": "Παρακαλούμε ενημερώστε μας για σχετικά ιατρικά προβλήματα, φάρμακα, εγκυμοσύνη ή άλλες παραμέτρους υγείας πριν τη θεραπεία σας. Ορισμένες θεραπείες μπορεί να μην ενδείκνυνται, να χρειάζονται τροποποίηση ή να απαιτούν ιατρική έγκριση.",
 "Advanced Cold Plasma Skin Rejuvenation": "Προηγμένη Αναζωογόνηση Δέρματος με Ψυχρό Πλάσμα",
 "Plasmatique™ + LED Light Therapy": "Plasmatique™ + Θεραπεία Φωτός LED",
 "The Treatment": "Η Θεραπεία",
 "Plasmatique™ + LED Light Therapy is an advanced facial treatment combining cold atmospheric plasma technology with professional LED light therapy to target multiple skin concerns in one personalised treatment.": "Η θεραπεία Plasmatique™ + LED είναι μια προηγμένη θεραπεία προσώπου που συνδυάζει την τεχνολογία ψυχρού ατμοσφαιρικού πλάσματος με επαγγελματική θεραπεία φωτός LED, για να αντιμετωπίσει πολλαπλές ανησυχίες του δέρματος σε μία εξατομικευμένη θεραπεία.",
 "Rather than focusing only on anti-ageing, it is designed for clients who want to improve the overall clarity, texture, firmness and appearance of their skin.": "Αντί να εστιάζει μόνο στην αντιγήρανση, έχει σχεδιαστεί για πελάτες που θέλουν να βελτιώσουν τη συνολική καθαρότητα, υφή, σφριγηλότητα και όψη του δέρματός τους.",
 "Cold atmospheric plasma is being studied in dermatology for its effects on the skin and has shown potential, particularly as an adjunct treatment for inflammatory acne. LED therapy, especially red and blue wavelengths, has clinical evidence supporting its use for acne and skin rejuvenation.": "Το ψυχρό ατμοσφαιρικό πλάσμα μελετάται στη δερματολογία για τις επιδράσεις του στο δέρμα και έχει δείξει δυναμική, ιδίως ως συμπληρωματική θεραπεία για τη φλεγμονώδη ακμή. Η θεραπεία LED, ειδικά με κόκκινα και μπλε μήκη κύματος, διαθέτει κλινικά στοιχεία που υποστηρίζουν τη χρήση της για την ακμή και την αναζωογόνηση του δέρματος.",
 "Who Is It For?": "Για Ποιους Είναι;",
 "Plasmatique + LED can be an excellent option for clients concerned with:": "Το Plasmatique + LED μπορεί να είναι εξαιρετική επιλογή για πελάτες που ανησυχούν για:",
 "✔ Acne and breakouts": "✔ Ακμή και εξανθήματα",
 "✔ Post-acne marks": "✔ Σημάδια μετά την ακμή",
 "✔ Uneven-looking skin": "✔ Ανομοιόμορφη όψη δέρματος",
 "✔ Dull or tired-looking skin": "✔ Θαμπό ή κουρασμένο δέρμα",
 "✔ Rough texture": "✔ Τραχιά υφή",
 "✔ Loss of firmness": "✔ Απώλεια σφριγηλότητας",
 "✔ Fine lines and early signs of ageing": "✔ Λεπτές γραμμές και πρώιμα σημάδια γήρανσης",
 "Personalised LED Colour Therapy": "Εξατομικευμένη Θεραπεία Χρωμάτων LED",
 "The LED mask is not the same treatment for every client. Different LED light colours are used for different skin goals and concerns.": "Η μάσκα LED δεν είναι η ίδια θεραπεία για κάθε πελάτη. Διαφορετικά χρώματα φωτός LED χρησιμοποιούνται για διαφορετικούς στόχους και ανησυχίες του δέρματος.",
 "Before the treatment, our aesthetician assesses your skin and selects the most appropriate LED colour for your individual needs. For example, certain wavelengths may be chosen for acne-prone and blemish-prone skin, while others support rejuvenation, calming, or a brighter, healthier-looking complexion.": "Πριν από τη θεραπεία, ο αισθητικός μας αξιολογεί το δέρμα σας και επιλέγει το καταλληλότερο χρώμα LED για τις ατομικές σας ανάγκες. Για παράδειγμα, ορισμένα μήκη κύματος επιλέγονται για δέρμα επιρρεπές στην ακμή και τις ατέλειες, ενώ άλλα υποστηρίζουν την αναζωογόνηση, την ηρεμία ή μια πιο φωτεινή, υγιέστερη όψη.",
 "This means every Plasmatique + LED session is personalised to your skin, focusing on what your complexion needs most at that particular time.": "Αυτό σημαίνει ότι κάθε συνεδρία Plasmatique + LED εξατομικεύεται στο δέρμα σας, εστιάζοντας σε ό,τι χρειάζεται περισσότερο η επιδερμίδα σας εκείνη τη στιγμή.",
 "How Does the Treatment Work?": "Πώς Λειτουργεί η Θεραπεία;",
 "1. Skin assessment": "1. Αξιολόγηση δέρματος",
 "So the treatment can be adapted to your skin and concerns.": "Ώστε η θεραπεία να προσαρμοστεί στο δέρμα και στις ανησυχίες σας.",
 "2. Cold plasma": "2. Ψυχρό πλάσμα",
 "Performed across the selected areas of the face, neck and/or décolleté, with professional skincare products chosen for your skin.": "Εφαρμόζεται στις επιλεγμένες περιοχές του προσώπου, του λαιμού ή/και του ντεκολτέ, με επαγγελματικά προϊόντα περιποίησης επιλεγμένα για το δέρμα σας.",
 "3. LED light therapy": "3. Θεραπεία φωτός LED",
 "Approximately 15 minutes. The colour/wavelength is selected for your goal, so an acne-focused protocol may differ from a rejuvenation-focused one.": "Περίπου 15 λεπτά. Το χρώμα/μήκος κύματος επιλέγεται ανάλογα με τον στόχο σας, ώστε ένα πρωτόκολλο για ακμή να διαφέρει από ένα πρωτόκολλο αναζωογόνησης.",
 "Advanced Body Contouring": "Προηγμένη Διαμόρφωση Σώματος",
 "A professional, non-invasive body-contouring treatment designed to improve the appearance of cellulite, skin texture and firmness, while helping the body look smoother and more sculpted.": "Μια επαγγελματική, μη επεμβατική θεραπεία διαμόρφωσης σώματος που βελτιώνει την όψη της κυτταρίτιδας, την υφή και τη σφριγηλότητα του δέρματος, βοηθώντας το σώμα να δείχνει πιο λείο και σμιλευμένο.",
 "The treatment combines vacuum therapy, mechanical massage / endermology, cavitation and radiofrequency (RF). Vacuum and mechanical massage stimulate the tissues, cavitation is used as part of the body-contouring protocol, and RF delivers controlled heat to support skin tightening and a firmer, smoother appearance.": "Η θεραπεία συνδυάζει <strong>θεραπεία κενού (vacuum)</strong>, <strong>μηχανικό μασάζ / ενδερμολογία</strong>, <strong>σπηλαίωση</strong> και <strong>ραδιοσυχνότητες (RF)</strong>. Το κενό και το μηχανικό μασάζ διεγείρουν τους ιστούς, η σπηλαίωση χρησιμοποιείται ως μέρος του πρωτοκόλλου διαμόρφωσης σώματος, ενώ οι RF παρέχουν ελεγχόμενη θερμότητα για σύσφιγξη και πιο σφριγηλή, λεία όψη του δέρματος.",
 "What happens during your treatment?": "Τι γίνεται κατά τη διάρκεια της θεραπείας σας;",
 "Every V-Shape journey begins with an individual body assessment. For body areas, we take measurements before the treatment so we can objectively compare your progress. Measurements may also be repeated after the session and throughout your treatment plan.": "Κάθε πρόγραμμα V-Shape ξεκινά με μια ατομική αξιολόγηση του σώματος. Για τις περιοχές του σώματος, παίρνουμε μετρήσεις πριν από τη θεραπεία ώστε να συγκρίνουμε αντικειμενικά την πρόοδό σας. Οι μετρήσεις μπορεί να επαναληφθούν μετά τη συνεδρία και καθ' όλη τη διάρκεια του προγράμματός σας.",
 "15–20 minutes of pre-heating in our thermal tunnel to warm and prepare the treatment area": "15–20 λεπτά προθέρμανσης στο θερμικό μας τούνελ για να ζεσταθεί και να προετοιμαστεί η περιοχή θεραπείας",
 "Professional body products and specialised ampoules, selected according to the area and your needs, to complement the machine treatment": "Επαγγελματικά προϊόντα σώματος και εξειδικευμένες αμπούλες, επιλεγμένες ανάλογα με την περιοχή και τις ανάγκες σας, ως συμπλήρωμα της θεραπείας με το μηχάνημα",
 "The V-Shape treatment itself, using the appropriate combination of vacuum, mechanical massage, cavitation and/or radiofrequency, with settings adjusted individually": "Η ίδια η θεραπεία V-Shape, με τον κατάλληλο συνδυασμό κενού, μηχανικού μασάζ, σπηλαίωσης ή/και ραδιοσυχνοτήτων, με ρυθμίσεις προσαρμοσμένες ατομικά",
 "Measurements taken again after the treatment to monitor changes and progress": "Νέες μετρήσεις μετά τη θεραπεία για την παρακολούθηση των αλλαγών και της προόδου",
 "Some clients may notice a measurable change in circumference from the first session, as well as a smoother or firmer appearance. Immediate changes can be influenced by temporary changes in fluid and tissue condition, and results vary from person to person. For more noticeable and lasting body-contouring results, we recommend completing the personalised course of sessions.": "Ορισμένοι πελάτες μπορεί να παρατηρήσουν μετρήσιμη αλλαγή στην περιφέρεια από την πρώτη συνεδρία, καθώς και πιο λεία ή σφριγηλή όψη. Οι άμεσες αλλαγές μπορεί να επηρεάζονται από προσωρινές μεταβολές στα υγρά και στην κατάσταση των ιστών, και τα αποτελέσματα διαφέρουν από άτομο σε άτομο. Για πιο εμφανή και μόνιμα αποτελέσματα διαμόρφωσης σώματος, συνιστούμε να ολοκληρώσετε το εξατομικευμένο πρόγραμμα συνεδριών.",
 "Why is Full Body V-Shape divided over different days?": "Γιατί το V-Shape Ολόκληρου Σώματος χωρίζεται σε διαφορετικές ημέρες;",
 "Our Full Body V-Shape covers several areas, including the abdomen, flanks, back, thighs and glutes. We intentionally do not treat all of these in one extremely long appointment.": "Το V-Shape Ολόκληρου Σώματος καλύπτει πολλές περιοχές, όπως κοιλιά, λαγόνες, πλάτη, μηρούς και γλουτούς. Σκόπιμα δεν τις θεραπεύουμε όλες σε ένα εξαιρετικά μεγάλο ραντεβού.",
 "Instead, the areas are divided into separate appointments during the week. This allows our therapist to give each area the appropriate time and attention, use the correct technique and settings, and keep the treatment comfortable and properly structured. Depending on your programme and assessment, Full Body areas may be treated across up to two appointments per week.": "Αντίθετα, οι περιοχές χωρίζονται σε ξεχωριστά ραντεβού μέσα στην εβδομάδα. Έτσι ο θεραπευτής μας αφιερώνει τον κατάλληλο χρόνο και προσοχή σε κάθε περιοχή, χρησιμοποιεί τη σωστή τεχνική και ρυθμίσεις, και διατηρεί τη θεραπεία άνετη και σωστά δομημένη. Ανάλογα με το πρόγραμμα και την αξιολόγησή σας, οι περιοχές του Ολόκληρου Σώματος μπορεί να θεραπεύονται σε έως δύο ραντεβού την εβδομάδα.",
 "Benefits of V-Shape": "Οφέλη του V-Shape",
 "With a consistent treatment programme, V-Shape is designed to help with the appearance of cellulite, smoother-looking skin, improved firmness and skin texture, body contouring and a more sculpted appearance. Because every body is different, the number of sessions and the response to treatment can vary.": "Με ένα σταθερό πρόγραμμα θεραπείας, το V-Shape έχει σχεδιαστεί να βοηθά στην όψη της κυτταρίτιδας, σε πιο λείο δέρμα, βελτιωμένη σφριγηλότητα και υφή, διαμόρφωση σώματος και πιο σμιλευμένη εμφάνιση. Επειδή κάθε σώμα είναι διαφορετικό, ο αριθμός των συνεδριών και η ανταπόκριση στη θεραπεία μπορεί να διαφέρουν.",
 "At Nataly Laser House, each treatment is personalised to your body, the areas you want to target and your goals. We combine professional technology with specialised body products and carefully selected protocols rather than a one-size-fits-all approach.": "Στο Nataly Laser House, κάθε θεραπεία εξατομικεύεται στο σώμα σας, στις περιοχές που θέλετε να στοχεύσετε και στους στόχους σας. Συνδυάζουμε επαγγελματική τεχνολογία με εξειδικευμένα προϊόντα σώματος και προσεκτικά επιλεγμένα πρωτόκολλα, αντί για μια προσέγγιση που ταιριάζει σε όλους.",
 "Please add a phone number or another way to reach you (Instagram, Facebook, TikTok, etc.) so we can confirm your booking.": "Παρακαλούμε προσθέστε αριθμό τηλεφώνου ή άλλον τρόπο επικοινωνίας (Instagram, Facebook, TikTok κ.λπ.) ώστε να επιβεβαιώσουμε την κράτησή σας.",
 "Please complete and confirm the health screening above before booking this treatment.": "Παρακαλούμε συμπληρώστε και επιβεβαιώστε τον παραπάνω έλεγχο υγείας πριν κλείσετε αυτή τη θεραπεία.",
 "No staff member is currently set up for this treatment — please contact us directly.": "Δεν υπάρχει προς το παρόν διαθέσιμο μέλος προσωπικού για αυτή τη θεραπεία — παρακαλούμε επικοινωνήστε απευθείας μαζί μας.",
 "Something went wrong sending your request — please WhatsApp us instead.": "Κάτι πήγε στραβά κατά την αποστολή του αιτήματός σας — παρακαλούμε στείλτε μας μήνυμα στο WhatsApp.",
 "Our Treatment Room": "Ο Θάλαμος Θεραπειών μας",
 "A calm, private space designed for your comfort during every laser session. Clean lines, soft lighting and medical-grade equipment come together to help you relax from the moment you walk in.": "Ένας ήρεμος, ιδιωτικός χώρος σχεδιασμένος για την άνεσή σας σε κάθε συνεδρία laser. Καθαρές γραμμές, απαλός φωτισμός και εξοπλισμός ιατρικής ποιότητας συνδυάζονται ώστε να χαλαρώνετε από τη στιγμή που θα μπείτε.",
 "Our laser hair removal treatments use advanced technology to deliver fast, effective and comfortable sessions. Whether it's your first visit or a maintenance session, our team tailors each treatment to your skin and hair type.": "Οι θεραπείες αποτρίχωσης με laser χρησιμοποιούν προηγμένη τεχνολογία για γρήγορες, αποτελεσματικές και άνετες συνεδρίες. Είτε πρόκειται για την πρώτη σας επίσκεψη είτε για συνεδρία συντήρησης, η ομάδα μας προσαρμόζει κάθε θεραπεία στον τύπο δέρματος και τριχών σας.",
 "Skincare & Aftercare Products": "Προϊόντα Περιποίησης & Μετά τη Θεραπεία",
 "We stock a curated selection of professional skincare and aftercare products to help protect and soothe your skin between sessions, keeping results looking their best.": "Διαθέτουμε μια επιλεγμένη γκάμα επαγγελματικών προϊόντων περιποίησης και φροντίδας μετά τη θεραπεία, που βοηθούν στην προστασία και την καταπράυνση του δέρματός σας ανάμεσα στις συνεδρίες, διατηρώντας τα αποτελέσματα στο καλύτερο δυνατό επίπεδο.",
 "From the moment you arrive, our reception area is designed to make you feel welcome. Our friendly team is on hand to greet you, answer any questions and get you settled before your appointment.": "Από τη στιγμή που θα φτάσετε, η ρεσεψιόν μας έχει σχεδιαστεί ώστε να νιώθετε ευπρόσδεκτοι. Η φιλική μας ομάδα είναι εδώ για να σας καλωσορίσει, να απαντήσει σε κάθε ερώτηση και να σας εγκαταστήσει πριν το ραντεβού σας.",
 "Massage Room": "Χώρος Μασάζ",
 "Unwind in our dedicated massage room, where a range of relaxing and therapeutic massage treatments are available to help ease tension and restore balance to both body and mind.": "Χαλαρώστε στον ειδικό χώρο μασάζ μας, όπου διατίθενται χαλαρωτικές και θεραπευτικές θεραπείες μασάζ που βοηθούν να απαλύνει η ένταση και να αποκατασταθεί η ισορροπία σώματος και μυαλού.",
 "Benefits of Laser Hair Removal": "Οφέλη της Αποτρίχωσης με Laser",
 "Smooth, hair-free skin that lasts far longer than shaving or waxing. Sessions get faster and more comfortable over time as hair growth slows, and there's no more ingrown hairs, razor bumps, or daily upkeep.": "Λείο δέρμα χωρίς τρίχες που διαρκεί πολύ περισσότερο από το ξύρισμα ή το κερί. Οι συνεδρίες γίνονται πιο γρήγορες και άνετες με τον καιρό καθώς η τριχοφυΐα επιβραδύνεται, και δεν υπάρχουν πια εγκλωβισμένες τρίχες, ερεθισμοί από ξυράφι ή καθημερινή συντήρηση.",
 "Benefits of a Relaxing Massage": "Οφέλη του Χαλαρωτικού Μασάζ",
 "Eases everyday tension, improves circulation, and helps you switch off from a stressful week. A great reset for both body and mind, and a perfect complement to any other treatment.": "Απαλύνει την καθημερινή ένταση, βελτιώνει την κυκλοφορία και σας βοηθά να αποσυνδεθείτε από μια αγχωτική εβδομάδα. Μια εξαιρετική επανεκκίνηση για σώμα και μυαλό και ιδανικό συμπλήρωμα σε κάθε άλλη θεραπεία.",
 "Benefits of Hot Stone Massage": "Οφέλη του Μασάζ με Θερμές Πέτρες",
 "Heated stones relax muscles more deeply than a standard massage, easing stiffness and knots faster. Ideal if you're carrying a lot of physical tension or prefer a warmer, slower treatment.": "Οι θερμαινόμενες πέτρες χαλαρώνουν τους μυς βαθύτερα από ένα κλασικό μασάζ, απαλύνοντας πιο γρήγορα τη δυσκαμψία και τους κόμπους. Ιδανικό αν κουβαλάτε πολλή σωματική ένταση ή προτιμάτε μια πιο ζεστή, πιο αργή θεραπεία.",
 "Benefits of Aromatherapy": "Οφέλη της Αρωματοθεραπείας",
 "Essential oils combined with massage help calm the nervous system, lift your mood, and support better sleep. A gentle, fragrant full-body treatment that feels as good as it smells.": "Τα αιθέρια έλαια σε συνδυασμό με μασάζ βοηθούν να ηρεμήσει το νευρικό σύστημα, να ανέβει η διάθεσή σας και να βελτιωθεί ο ύπνος. Μια απαλή, αρωματική θεραπεία ολόκληρου του σώματος που είναι τόσο όμορφη όσο και η μυρωδιά της.",
 "Nataly Laser House | Laser Hair Removal & Beauty Treatments in Nicosia": "Nataly Laser House | Αποτρίχωση με Laser & Θεραπείες Ομορφιάς στη Λευκωσία"
};

  var LS_KEYS = ['nlh_lang', 'lang', 'language', 'siteLang'];
  var ATTRS = ['placeholder', 'alt', 'title', 'aria-label'];
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, SVG: 1, svg: 1, TEXTAREA: 0, CODE: 1 };
  var INLINE = { STRONG: 1, B: 1, EM: 1, I: 1, SMALL: 1, BR: 1, SPAN: 1, A: 1, U: 1 };

  var lang = 'en';
  var obs = null;
  var enTitle = null, grTitle = null;

  /* ---------- helpers ---------- */
  function norm(s) {
    return String(s)
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/\s+/g, ' ')
      .trim();
  }
  var NDICT = {};
  Object.keys(DICT).forEach(function (k) { NDICT[norm(k)] = DICT[k]; });

  function stripTags(s) { return s.replace(/<[^>]+>/g, ''); }

  var RULES = [
    [/^Save €(\d+)$/, 'Εξοικονόμηση €$1'],
    [/^From €(\d+)$/, 'Από €$1'],
    [/^That staff member isn't free at (.+?) on (.+?)\. Available times that day: (.*)$/,
      'Το συγκεκριμένο μέλος του προσωπικού δεν είναι διαθέσιμο στις $1 στις $2. Διαθέσιμες ώρες εκείνη την ημέρα: $3']
  ];
  var DUR = /^~?\s*\d+(\s*[–-]\s*\d+)?\s*(hrs?|min|mins|minutes)(\s+\d+\s*(min|mins|minutes))?$/;

  function lookup(n) {
    if (Object.prototype.hasOwnProperty.call(NDICT, n)) return NDICT[n];
    for (var i = 0; i < RULES.length; i++) {
      if (RULES[i][0].test(n)) return n.replace(RULES[i][0], RULES[i][1]);
    }
    if (DUR.test(n)) {
      return n.replace(/\bhrs\b/, 'ώρες').replace(/\bhr\b/, 'ώρα').replace(/\b(min|mins|minutes)\b/g, 'λεπτά');
    }
    return null;
  }

  function keyOf(el) {
    var c = el.cloneNode(true);
    var brs = c.querySelectorAll('br');
    for (var i = 0; i < brs.length; i++) brs[i].parentNode.replaceChild(document.createTextNode(' '), brs[i]);
    return norm(c.textContent);
  }

  /* ---------- text nodes ---------- */
  function trText(node) {
    var cur = node.nodeValue;
    if (node.__gr !== undefined && cur === node.__gr) return;          // already Greek
    var n = norm(cur);
    if (!/[A-Za-z]/.test(n)) return;
    var g = lookup(n);
    if (g === null) return;
    g = stripTags(g);
    var lead = cur.match(/^\s*/)[0], trail = cur.match(/\s*$/)[0];
    node.__en = cur;
    node.__gr = lead + g + trail;
    node.nodeValue = node.__gr;
  }
  function untrText(node) {
    if (node.__gr !== undefined && node.nodeValue === node.__gr) node.nodeValue = node.__en;
    node.__gr = undefined;
  }

  /* ---------- attributes ---------- */
  function trAttrs(el, toGr) {
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i];
      if (!el.hasAttribute(a)) continue;
      var v = el.getAttribute(a), st = el.__attr || (el.__attr = {});
      if (toGr) {
        if (st[a] && st[a].gr === v) continue;
        var g = lookup(norm(v));
        if (g !== null) { g = stripTags(g); st[a] = { en: v, gr: g }; el.setAttribute(a, g); }
      } else if (st[a] && st[a].gr === v) {
        el.setAttribute(a, st[a].en); delete st[a];
      }
    }
  }

  /* ---------- elements with inline markup (whole-sentence match) ---------- */
  function tryElement(el) {
    if (el.__grHTML !== undefined) {
      if (el.innerHTML === el.__grHTML) return true;
      el.__grHTML = undefined;                                            // page changed it meanwhile
    }
    var kids = el.children, i;
    if (!kids.length) return false;
    for (i = 0; i < kids.length; i++) if (!INLINE[kids[i].tagName]) return false;
    var hasText = false;
    for (i = 0; i < el.childNodes.length; i++) {
      var c = el.childNodes[i];
      if (c.nodeType === 3 && norm(c.nodeValue)) { hasText = true; break; }
    }
    if (!hasText) return false;
    var g = lookup(keyOf(el));
    if (g === null) return false;
    el.__enHTML = el.innerHTML;
    el.innerHTML = g;
    el.__grHTML = el.innerHTML;
    return true;
  }

  /* ---------- walker ---------- */
  function visit(el, toGr) {
    if (el.nodeType !== 1 || SKIP[el.tagName]) return;
    trAttrs(el, toGr);
    if (el.hasAttribute('data-en') && el.hasAttribute('data-el')) {
      el.textContent = el.getAttribute(toGr ? 'data-el' : 'data-en');
      return;
    }
    if (toGr) {
      if (tryElement(el)) return;
    } else if (el.__grHTML !== undefined) {
      el.innerHTML = el.__enHTML; el.__grHTML = undefined; return;
    }
    var nodes = Array.prototype.slice.call(el.childNodes);
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.nodeType === 3) { if (toGr) trText(n); else untrText(n); }
      else if (n.nodeType === 1) visit(n, toGr);
    }
  }

  /* ---------- <title> ---------- */
  function trTitle(toGr) {
    if (toGr) {
      if (grTitle !== null && document.title === grTitle) return;
      enTitle = document.title;
      var g = lookup(norm(enTitle));
      if (g === null) {
        g = enTitle.split(' | ').map(function (p) { var t = lookup(norm(p)); return t === null ? p : stripTags(t); }).join(' | ');
      }
      grTitle = g; document.title = g;
    } else if (grTitle !== null && document.title === grTitle) {
      document.title = enTitle; grTitle = null;
    }
  }

  /* ---------- switch ---------- */
  function buttons() { return document.querySelectorAll('#langToggle, .lang-btn'); }
  function label() {
    var b = buttons();
    for (var i = 0; i < b.length; i++) {
      b[i].textContent = lang === 'el' ? 'EN' : 'ΕΛ';
      b[i].setAttribute('aria-label', lang === 'el' ? 'Switch to English' : 'Αλλαγή σε Ελληνικά');
    }
  }
  function observe() {
    if (obs) obs.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  }
  function apply(toGr) {
    if (obs) obs.disconnect();
    if (document.body) visit(document.body, toGr);
    trTitle(toGr);
    document.documentElement.setAttribute('lang', toGr ? 'el' : 'en');
    label();
    observe();
  }

  function getLang() {
    try {
      for (var i = 0; i < LS_KEYS.length; i++) {
        var v = localStorage.getItem(LS_KEYS[i]);
        if (v === 'el' || v === 'en') return v;
      }
    } catch (e) {}
    return 'en';
  }
  function saveLang(l) {
    try {
      LS_KEYS.forEach(function (k) {
        if (k === 'nlh_lang' || localStorage.getItem(k) !== null) localStorage.setItem(k, l);
      });
    } catch (e) {}
  }
  function setLang(l) { lang = l; saveLang(l); apply(l === 'el'); }

  /* ---------- dynamic content (booking form, gallery detail, …) ---------- */
  obs = new MutationObserver(function (recs) {
    if (lang !== 'el') return;
    obs.disconnect();
    recs.forEach(function (r) {
      if (r.type === 'childList') {
        if (r.target.nodeName === 'TITLE') { trTitle(true); return; }
        for (var i = 0; i < r.addedNodes.length; i++) {
          var n = r.addedNodes[i];
          if (n.nodeType === 1) visit(n, true); else if (n.nodeType === 3) trText(n);
        }
      } else if (r.type === 'characterData') {
        var p = r.target.parentNode;
        if (p && p.nodeName === 'TITLE') trTitle(true); else trText(r.target);
      }
    });
    observe();
  });

  /* ---------- button ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest ? e.target.closest('#langToggle, .lang-btn') : null;
    if (!b) return;
    e.preventDefault(); e.stopImmediatePropagation();                   // overrides any older toggle code
    setLang(lang === 'el' ? 'en' : 'el');
  }, true);

  function ensureButton() {
    if (document.querySelector('#langToggle, .lang-btn') || !document.body) return;
    var b = document.createElement('button');
    b.id = 'langToggle'; b.className = 'lang-btn'; b.type = 'button';
    b.style.cssText = 'position:fixed;top:20px;right:24px;z-index:1000;background:rgba(0,0,0,.4);' +
      'border:1px solid #d4af37;color:#d4af37;padding:8px 14px;border-radius:6px;cursor:pointer;' +
      'font-weight:600;font-family:inherit;letter-spacing:.06em';
    document.body.appendChild(b);
  }

  function init() {
    ensureButton();
    lang = getLang();
    apply(lang === 'el');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.addEventListener('load', function () {                          // re-apply after any older script has run
    lang = getLang(); apply(lang === 'el');
    setTimeout(function () { label(); }, 250);
  });

  window.NLHi18n = { set: setLang, get: function () { return lang; }, dict: DICT };
})();
