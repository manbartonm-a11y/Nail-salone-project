// ================================
// Footer Year
// ================================
const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

// ================================
// Before / After Slider
// ================================
document.querySelectorAll(".ba-slider").forEach((slider) => {

    const range = slider.querySelector(".ba-range");
    const afterImg = slider.querySelector(".ba-after");
    const line = slider.querySelector(".ba-handle-line");
    const grip = slider.querySelector(".ba-handle-grip");

    if (!range || !afterImg || !line || !grip) return;

    const update = (value) => {
        afterImg.style.clipPath = `inset(0 0 0 ${value}%)`;
        line.style.left = value + "%";
        grip.style.left = value + "%";
    };

    range.addEventListener("input", (e) => {
        update(e.target.value);
    });

    update(range.value);

});

// ================================
// Mobile Menu
// ================================
const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (toggle && navLinks) {

    toggle.addEventListener("click", () => {

        navLinks.classList.toggle("open");

    });

}

// ================================
// Scroll Reveal
// ================================
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    revealEls.forEach((el) => observer.observe(el));

} else {

    revealEls.forEach((el) => el.classList.add("is-visible"));

}

// Auto active nav link
const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// ================================
// Newsletter form (no-backend fallback: opens a pre-filled email)
// Swap this out for a real email service (Mailchimp/Brevo/etc.) when ready.
// ================================
const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("newsletterEmail").value.trim();
        if (!email) return;
        const subject = encodeURIComponent("Newsletter sign-up");
        const body = encodeURIComponent(`Please add this email to the mailing list: ${email}`);
        window.location.href = `mailto:NatalyLaserHouse@hotmail.com?subject=${subject}&body=${body}`;
    });
}

// ================================
// Contact form (no-backend fallback: opens WhatsApp with the message pre-filled)
// Swap this out for a real form backend (Formspree/EmailJS/etc.) when ready.
// ================================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("contactName").value.trim();
        const phone = document.getElementById("contactPhone").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        const text = encodeURIComponent(
            `Hi Nataly Laser House, my name is ${name} (${phone}).\n${message || "I'd like to book an appointment."}`
        );

        window.open(`https://wa.me/35797900601?text=${text}`, "_blank", "noopener");
    });
}



/* ============================================================
   Full Language Switcher – English ↔ Greek
   Nataly Laser House
   ============================================================ */
(function () {
  const btn = document.getElementById('langToggle');
  if (!btn) return;

  let currentLang = localStorage.getItem('nlh_lang') || 'en';

  // ================== TRANSLATIONS ==================
  const t = {
    // ----- Navigation -----
    'Home': 'Αρχική',
    'About': 'Σχετικά',
    'Services': 'Υπηρεσίες',
    'Prices': 'Τιμές',
    'Nails': 'Νύχια',
    'Gallery': 'Γκαλερί',
    'Contact': 'Επικοινωνία',
    'Book Now': 'Κλείστε Ραντεβού',

    // ----- Common buttons -----
    'View Prices': 'Δείτε Τιμές',
    'Learn more': 'Μάθετε περισσότερα',
    'Book Appointment': 'Κλείστε Ραντεβού',
    'View all services →': 'Δείτε όλες τις υπηρεσίες →',
    'Purchase Gift Card →': 'Αγοράστε Δωροκάρτα →',

    // ----- Homepage -----
    'About Us': 'Σχετικά με εμάς',
    'Welcome to Nataly Laser House': 'Καλώς ήρθατε στο Nataly Laser House',
    'Your beauty and wellness destination in Strovolos, Nicosia. Our goal is to create a space where beauty, self-care and relaxation come together.': 'Ο προορισμός ομορφιάς και ευεξίας σας στο Στρόβολο, Λευκωσία. Στόχος μας είναι να δημιουργήσουμε έναν χώρο όπου η ομορφιά, η φροντίδα του εαυτού και η χαλάρωση ενώνονται.',
    'Smooth skin,': 'Λεία επιδερμίδα,',
    'done right.': 'σωστά.',
    'SKIN  |  BODY  |  CONFIDENCE': 'ΔΕΡΜΑ  |  ΣΩΜΑ  |  ΑΥΤΟΠΕΠΟΙΘΗΣΗ',
    'Your beauty and wellness destination in Strovolos, Nicosia — where beauty, self-care and relaxation come together.': 'Ο προορισμός ομορφιάς και ευεξίας σας στο Στρόβολο, Λευκωσία — όπου η ομορφιά, η φροντίδα του εαυτού και η χαλάρωση ενώνονται.',
    'Book an appointment': 'Κλείστε ραντεβού',
    'View price list': 'Δείτε τιμοκατάλογο',
    'Results': 'Αποτελέσματα',
    'Before & After': 'Πριν & Μετά',
    'Luxury Experience': 'Πολυτελής Εμπειρία',
    'Expert Technicians': 'Εξειδικευμένοι Τεχνίτες',
    'Advanced Technology': 'Προηγμένη Τεχνολογία',
    'Safe & Trusted': 'Ασφαλές & Αξιόπιστο',
    'Where care meets results': 'Όπου η φροντίδα συναντά τα αποτελέσματα',
    'Our Services': 'Οι Υπηρεσίες μας',
    'Tailored to you': 'Προσαρμοσμένες σε εσάς',
    'Laser Hair Removal': 'Αποτρίχωση με Laser',
    'Smooth, hair-free skin with long-lasting results.': 'Λεία επιδερμίδα χωρίς τρίχες με μακροχρόνια αποτελέσματα.',
    'Facial Treatments': 'Θεραπείες Προσώπου',
    'Cleansing, hydrating and anti-ageing care, tailored to your skin.': 'Καθαρισμός, ενυδάτωση και αντιγηραντική φροντίδα, προσαρμοσμένη στην επιδερμίδα σας.',
    'V-Shape Body Treatment': 'Θεραπεία Σώματος V-Shape',
    'Non-invasive vacuum & RF body treatment.': 'Μη επεμβατική θεραπεία σώματος με vacuum & RF.',
    'Relaxing & Therapeutic Massage': 'Χαλαρωτικό & Θεραπευτικό Μασάζ',
    'Take time away from your routine and allow your body to relax.': 'Αφιερώστε χρόνο μακριά από την καθημερινότητά σας και αφήστε το σώμα σας να χαλαρώσει.',
    'Gift Voucher': 'Δωροεπιταγή',
    'Give the Gift of Beauty': 'Δώστε το Δώρο της Ομορφιάς',
    'Stay Connected': 'Μείνετε Συνδεδεμένοι',
    'Exclusive offers & beauty tips': 'Αποκλειστικές προσφορές & συμβουλές ομορφιάς',
    'Enter your email address': 'Εισάγετε το email σας',
    'Subscribe': 'Εγγραφή',

    // ----- Services page -----
    'Treatments We Offer': 'Θεραπείες που Προσφέρουμε',
    'Discover our professional laser hair removal and beauty treatments in Strovolos, Nicosia, designed to help you feel confident and relaxed.': 'Ανακαλύψτε τις επαγγελματικές μας θεραπείες αποτρίχωσης με laser και ομορφιάς στο Στρόβολο, Λευκωσία, σχεδιασμένες να σας κάνουν να νιώθετε αυτοπεποίθηση και χαλάρωση.',
    'Candela Alexandrite Pro-U Laser Hair Removal': 'Αποτρίχωση με Laser Candela Alexandrite Pro-U',
    'Advanced laser hair removal designed to provide effective and long-lasting hair reduction.': 'Προηγμένη αποτρίχωση με laser σχεδιασμένη για αποτελεσματική και μακροχρόνια μείωση των τριχών.',
    'Progressive reduction of unwanted hair': 'Προοδευτική μείωση ανεπιθύμητων τριχών',
    'Helps reduce ingrown hairs': 'Βοηθά στη μείωση των εισερχόμενων τριχών',
    'Leaves the skin feeling smoother': 'Αφήνει την επιδερμίδα πιο λεία',
    'Fast treatment for both small and large areas': 'Γρήγορη θεραπεία για μικρές και μεγάλες περιοχές',
    'Dynamic Cooling technology for greater comfort during treatment': 'Τεχνολογία Dynamic Cooling για μεγαλύτερη άνεση',
    'Suitable treatment plans for both women and men': 'Κατάλληλα πρωτόκολλα για γυναίκες και άνδρες',

    'Our facial treatments are selected according to your skin\'s individual needs.': 'Οι θεραπείες προσώπου επιλέγονται σύμφωνα με τις ατομικές ανάγκες της επιδερμίδας σας.',
    'Acne-prone and congested skin': 'Δέρμα με τάση ακμής και συμφόρηση',
    'Hydration': 'Ενυδάτωση',
    'Deep cleansing': 'Βαθύς καθαρισμός',
    'Anti-ageing care': 'Αντιγηραντική φροντίδα',
    'Lifting and firmness': 'Lifting και συσφίξη',
    'Skin glow and revitalisation': 'Λάμψη και αναζωογόνηση',
    'Uneven-looking pigmentation': 'Ανομοιόμορφη μελάγχρωση',
    'Sensitive-looking skin and redness': 'Ευαίσθητο δέρμα και ερυθρότητα',

    'Facial Cleansing': 'Καθαρισμός Προσώπου',
    'Professional cleansing treatments designed to deeply cleanse and refresh the skin.': 'Επαγγελματικές θεραπείες καθαρισμού που καθαρίζουν βαθιά και ανανεώνουν την επιδερμίδα.',
    'Removes impurities and excess oil': 'Αφαιρεί ακαθαρσίες και περίσσεια λιπαρότητας',
    'Helps unclog congested pores': 'Βοηθά στο ξεβούλωμα των πόρων',
    'Removes dead skin cells': 'Αφαιρεί νεκρά κύτταρα',
    'Helps improve skin texture': 'Βελτιώνει την υφή της επιδερμίδας',
    'Leaves the complexion looking cleaner and fresher': 'Αφήνει την επιδερμίδα πιο καθαρή και φρέσκια',

    'Plasmatique™ Cold Plasma': 'Plasmatique™ Cold Plasma',
    'An advanced facial technology incorporated into selected skin treatments.': 'Προηγμένη τεχνολογία προσώπου που ενσωματώνεται σε επιλεγμένες θεραπείες.',
    'Supports skin rejuvenation': 'Υποστηρίζει την αναζωογόνηση της επιδερμίδας',
    'Helps improve overall skin appearance and texture': 'Βελτιώνει τη συνολική εμφάνιση και υφή',
    'Can be incorporated into anti-ageing protocols': 'Μπορεί να ενσωματωθεί σε αντιγηραντικά πρωτόκολλα',
    'Complements treatments targeting acne-prone skin': 'Συμπληρώνει θεραπείες για δέρμα με ακμή',
    'Non-invasive treatment': 'Μη επεμβατική θεραπεία',

    'LED Mask Therapy': 'Θεραπεία LED Mask',
    'Different wavelengths of LED light can be incorporated into our facial protocols depending on the skin\'s needs.': 'Διαφορετικά μήκη κύματος LED φωτός ενσωματώνονται στα πρωτόκολλα ανάλογα με τις ανάγκες της επιδερμίδας.',
    'Supporting skin rejuvenation': 'Υποστήριξη αναζωογόνησης',
    'Calming the appearance of redness': 'Καταπράυνση της ερυθρότητας',
    'Supporting acne-focused treatments': 'Υποστήριξη θεραπειών ακμής',
    'Improving overall skin radiance': 'Βελτίωση της συνολικής λάμψης',
    'Complementing anti-ageing treatments': 'Συμπλήρωση αντιγηραντικών θεραπειών',

    'A non-invasive body treatment combining vacuum technology and radiofrequency (RF).': 'Μη επεμβατική θεραπεία σώματος που συνδυάζει τεχνολογία vacuum και ραδιοσυχνότητες (RF).',
    'Helps improve the appearance of cellulite': 'Βοηθά στη βελτίωση της εμφάνισης της κυτταρίτιδας',
    'Supports smoother-looking skin': 'Υποστηρίζει πιο λεία εμφάνιση δέρματος',
    'Helps with skin firmness and toning': 'Βοηθά στη συσφίξη και τονισμό',
    'Improves the appearance of targeted body areas': 'Βελτιώνει την εμφάνιση στοχευμένων περιοχών',
    'Non-surgical and non-invasive': 'Μη χειρουργική και μη επεμβατική',

    'Massage, Maderotherapy & Lymphatic Massage': 'Μασάζ, Μαδεροθεραπεία & Λεμφικό Μασάζ',
    'Relaxation and stress relief': 'Χαλάρωση και ανακούφιση από το στρες',
    'Relief from muscular tension': 'Ανακούφιση από μυϊκή ένταση',
    'Improved feeling of wellbeing': 'Βελτιωμένο αίσθημα ευεξίας',
    'Support for tired and overworked muscles': 'Υποστήριξη κουρασμένων μυών',
    'Lymphatic drainage and reduction of fluid retention': 'Λεμφική αποστράγγιση και μείωση κατακράτησης',

    'Nail Services': 'Υπηρεσίες Νυχιών',
    'From elegant, minimal nails to statement designs, our nail services are tailored to your preferred style.': 'Από κομψά, μινιμαλιστικά νύχια μέχρι έντονα σχέδια, οι υπηρεσίες μας προσαρμόζονται στο στυλ σας.',
    'Professional nail care': 'Επαγγελματική φροντίδα νυχιών',
    'Clean and polished appearance': 'Καθαρή και περιποιημένη εμφάνιση',
    'Wide choice of colours and designs': 'Μεγάλη ποικιλία χρωμάτων και σχεδίων',
    'Personalised shape and style': 'Εξατομικευμένο σχήμα και στυλ',

    'Lash Lift': 'Lash Lift',
    'Enhance your natural lashes without extensions.': 'Αναδείξτε τις φυσικές σας βλεφαρίδες χωρίς extensions.',
    'Lifts and curls your natural lashes': 'Ανασηκώνει και καμπυλώνει τις φυσικές βλεφαρίδες',
    'Makes lashes appear longer and more defined': 'Κάνει τις βλεφαρίδες να φαίνονται πιο μακριές και καθορισμένες',
    'Low-maintenance result': 'Αποτέλεσμα χαμηλής συντήρησης',
    'No lash extensions required': 'Δεν απαιτούνται extensions',

    'Brow Lamination': 'Brow Lamination',
    'Designed to create fuller-looking, more defined and beautifully styled brows.': 'Σχεδιασμένο για πιο γεμάτα, καθορισμένα και όμορφα φρύδια.',
    'Helps create a fuller brow appearance': 'Βοηθά στη δημιουργία πιο γεμάτων φρυδιών',
    'Keeps brow hairs looking more uniform': 'Κρατά τις τρίχες των φρυδιών πιο ομοιόμορφες',
    'Defines the natural brow shape': 'Καθορίζει το φυσικό σχήμα των φρυδιών',
    'Makes daily brow styling easier': 'Κάνει το καθημερινό styling πιο εύκολο',

    // ----- Prices page -----
    'Price List': 'Τιμοκατάλογος',
    'Simple & Transparent Pricing': 'Απλές & Διαφανείς Τιμές',
    'Professional laser hair removal and beauty treatment prices in Strovolos, Nicosia, with no hidden fees.': 'Επαγγελματικές τιμές αποτρίχωσης με laser και θεραπειών ομορφιάς στο Στρόβολο, Λευκωσία, χωρίς κρυφές χρεώσεις.',
    'Women': 'Γυναίκες',
    'Men': 'Άνδρες',
    'Save More': 'Εξοικονομήστε Περισσότερα',
    'Bundle Deals': 'Πακέτα Προσφορών',
    'Combine treatments and save compared to booking them separately.': 'Συνδυάστε θεραπείες και εξοικονομήστε σε σχέση με ξεχωριστές κρατήσεις.',
    'The V-Shape Cellulite Destroyer': 'The V-Shape Cellulite Destroyer',
    'Advanced non-invasive body contouring': 'Προηγμένο μη επεμβατικό body contouring',
    'Laser Repeat – 10-Day Policy': 'Επανάληψη λέιζερ – Πολιτική 10 Ημερών',
    'A laser repeat (touch-up) is available within 10 days of your original laser session and is intended only to check and treat any small areas where hairs may have been missed or have not responded as expected during the initial session.': 'Η επανάληψη laser (touch-up) είναι διαθέσιμη εντός 10 ημερών από την αρχική σας συνεδρία και προορίζεται μόνο για τον έλεγχο και τη θεραπεία μικρών περιοχών όπου μπορεί να έχουν παραλειφθεί τρίχες ή να μην έχουν ανταποκριθεί όπως αναμενόταν.',

'The 10-day period is important because laser hair removal works according to the hair-growth cycle. After this window, we begin moving toward the next growth cycle and therefore toward your next regular laser appointment, rather than repeating the previous session.': 'Η περίοδος των 10 ημερών είναι σημαντική επειδή η αποτρίχωση με laser λειτουργεί σύμφωνα με τον κύκλο ανάπτυξης της τρίχας. Μετά από αυτό το διάστημα, αρχίζουμε να κινούμαστε προς τον επόμενο κύκλο ανάπτυξης και συνεπώς προς το επόμενο κανονικό σας ραντεβού, αντί να επαναλαμβάνουμε την προηγούμενη συνεδρία.',

'The repeat is not a second full laser session. It is simply a touch-up of areas where necessary.': 'Η επανάληψη δεν είναι δεύτερη πλήρης συνεδρία laser. Είναι απλώς ένα touch-up στις περιοχές όπου χρειάζεται.',

'A repeat is completely optional and is not required. If the treated area is clear and you do not notice any remaining hairs that require a touch-up, there is no need to book one.': 'Η επανάληψη είναι εντελώς προαιρετική και δεν είναι υποχρεωτική. Αν η περιοχή είναι καθαρή και δεν παρατηρείτε τρίχες που χρειάζονται touch-up, δεν υπάρχει λόγος να κλείσετε ραντεβού.',

'If you feel a repeat is necessary, please contact us within 10 days of your original appointment. After the 20-day period, the repeat is no longer valid and treatment will continue at your next scheduled laser session.': 'Αν θεωρείτε ότι χρειάζεται επανάληψη, παρακαλούμε επικοινωνήστε μαζί μας εντός 10 ημερών από το αρχικό σας ραντεβού. Μετά τις 20 ημέρες, η επανάληψη δεν ισχύει πλέον και η θεραπεία συνεχίζεται στο επόμενο προγραμματισμένο σας ραντεβού.',
'Full Body': 'Ολόκληρο Σώμα',
'Full Body + Face': 'Ολόκληρο Σώμα + Πρόσωπο',
'Full Face': 'Ολόκληρο Πρόσωπο',
'Legs': 'Πόδια',
'Bikini': 'Μπικίνι',
'Armpits': 'Μασχάλες',
'Back': 'Πλάτη',
'Chest': 'Στήθος',
'Arms': 'Χέρια',
'Shoulders': 'Ώμοι',

'For Women': 'Για Γυναίκες',
'For Men': 'Για Άνδρες',

'Laser Repeat – 10-Day Policy': 'Επανάληψη Laser – Πολιτική 10 Ημερών',

'Single Session': 'Μεμονωμένη Συνεδρία',
'Course of 6 Sessions': 'Πακέτο 6 Συνεδριών',

'A professional treatment designed to improve the appearance of cellulite, refine skin texture and enhance firmness — leaving the body looking smoother and more sculpted.': 'Μια επαγγελματική θεραπεία σχεδιασμένη να βελτιώσει την εμφάνιση της κυτταρίτιδας, να βελτιώσει την υφή του δέρματος και να ενισχύσει τη συσφίξη — αφήνοντας το σώμα πιο λείο και σμιλευμένο.',

'The protocol combines vacuum therapy, mechanical massage / endermology, cavitation and radiofrequency (RF). Each technology works in harmony: vacuum and massage stimulate the tissues, cavitation supports body contouring, while RF delivers controlled heat to tighten and firm the skin.': 'Το πρωτόκολλο συνδυάζει θεραπεία vacuum, μηχανικό μασάζ / ενδερμολογία, σπηλαίωση και ραδιοσυχνότητες (RF). Κάθε τεχνολογία λειτουργεί αρμονικά: το vacuum και το μασάζ διεγείρουν τους ιστούς, η σπηλαίωση υποστηρίζει το body contouring, ενώ το RF παρέχει ελεγχόμενη θερμότητα για σύσφιξη και τόνωση του δέρματος.',

'Massage Prices': 'Τιμές Μασάζ',
'Relaxing Massage': 'Χαλαρωτικό Μασάζ',
'Sports Massage': 'Αθλητικό Μασάζ',
'Hot Stone Massage': 'Μασάζ με Θερμές Πέτρες',
'Indian Head Massage': 'Ινδικό Μασάζ Κεφαλής',
'Aromatherapy': 'Αρωματοθεραπεία',
'Lymphatic Massage': 'Λεμφικό Μασάζ',
'Cellulite Massage': 'Μασάζ Κυτταρίτιδας',

'A body massage technique using specially designed wooden tools — distinct from our relaxing massage treatments.': 'Τεχνική μασάζ σώματος με ειδικά σχεδιασμένα ξύλινα εργαλεία — διαφορετική από τα χαλαρωτικά μας μασάζ.',

'Full Body Madero': 'Ολόκληρο Σώμα Madero',
'Abdomen & Flanks': 'Κοιλιά & Πλάγια',
'Legs & Buttocks': 'Πόδια & Γλουτοί',

'Selected according to your skin’s needs — Basic Cleansing, Deep Cleansing and advanced Plasmatique™ + LED Mask protocols.': 'Επιλέγεται σύμφωνα με τις ανάγκες της επιδερμίδας σας — Βασικός Καθαρισμός, Βαθύς Καθαρισμός και προηγμένα πρωτόκολλα Plasmatique™ + LED Mask.',

'Basic & Deep Cleansing': 'Βασικός & Βαθύς Καθαρισμός',
'Basic Facial Cleansing': 'Βασικός Καθαρισμός Προσώπου',
'Deep Facial Cleansing': 'Βαθύς Καθαρισμός Προσώπου',

'Advanced Facial Treatments': 'Προηγμένες Θεραπείες Προσώπου',
'Hydrating Facial': 'Ενυδατική Θεραπεία Προσώπου',
'Anti-Ageing Facial': 'Αντιγηραντική Θεραπεία Προσώπου',

'Plasmatique™ + LED Mask': 'Plasmatique™ + LED Mask',
'Plasmatique™ Cold Plasma': 'Plasmatique™ Cold Plasma',
'LED Mask Therapy': 'Θεραπεία LED Mask',
'Plasmatique™ + LED Mask Combined': 'Plasmatique™ + LED Mask Συνδυασμός',

'View Nail Prices →': 'Δείτε Τιμές Νυχιών →',

'Lash & Brow': 'Βλεφαρίδες & Φρύδια',
'Enhance your natural lashes without extensions.': 'Αναδείξτε τις φυσικές σας βλεφαρίδες χωρίς extensions.',
'Fuller-looking, more defined and beautifully styled brows.': 'Πιο γεμάτα, πιο καθορισμένα και όμορφα διαμορφωμένα φρύδια.',
'Book both together and save.': 'Κλείστε και τα δύο μαζί και εξοικονομήστε.',
'Special Offer — Both Together': 'Ειδική Προσφορά — Και τα Δύο Μαζί',

'Lymphatic Massage Packages': 'Πακέτα Λεμφικού Μασάζ',
'Relief from fluid retention and detoxification, reduced puffiness and a lighter feeling.': 'Ανακούφιση από κατακράτηση υγρών και αποτοξίνωση, μειωμένο πρήξιμο και πιο ελαφρύ αίσθημα.',

'Sessions': 'Συνεδρίες',
'Price': 'Τιμή',
'You Save': 'Εξοικονομείτε',
'4 Sessions': '4 Συνεδρίες',
'6 Sessions': '6 Συνεδρίες',
'8 Sessions': '8 Συνεδρίες',
'€20 off each session': '€20 έκπτωση ανά συνεδρία',

'Thank you for choosing us': 'Σας ευχαριστούμε που μας επιλέξατε',
'We can\'t wait to welcome you back': 'Ανυπομονούμε να σας καλωσορίσουμε ξανά',
'Ready To Book?': 'Έτοιμοι να Κλείσετε Ραντεβού;',
'Contact us today to arrange your appointment or ask us any questions about our treatments.': 'Επικοινωνήστε μαζί μας σήμερα για να κανονίσετε το ραντεβού σας ή να μας κάνετε οποιαδήποτε ερώτηση για τις θεραπείες μας.',

'Online Payments': 'Online Πληρωμές',
'For selected services and appointments, online payment is available.': 'Για επιλεγμένες υπηρεσίες και ραντεβού, είναι διαθέσιμη η online πληρωμή.',
'Depending on the booking, you may:': 'Ανάλογα με την κράτηση, μπορείτε να:',
'Pay the required deposit online': 'Πληρώσετε την απαιτούμενη προκαταβολή online',
'Pay the full treatment amount online': 'Πληρώσετε ολόκληρο το ποσό της θεραπείας online',
'Pay part of the amount online and the remaining balance at Nataly Laser House': 'Πληρώσετε μέρος του ποσού online και το υπόλοιπο στο Nataly Laser House',
'If you would prefer to split your payment, please contact us before completing your booking so our team can guide you through the available payment options.': 'Αν προτιμάτε να χωρίσετε την πληρωμή, παρακαλούμε επικοινωνήστε μαζί μας πριν ολοκληρώσετε την κράτηση ώστε η ομάδα μας να σας καθοδηγήσει στις διαθέσιμες επιλογές.',

'All Rights Reserved.': 'Με επιφύλαξη παντός δικαιώματος.',
'Combo': 'Συνδυασμός',
'Back + Chest': 'Πλάτη + Στήθος',
'Back + Arms + Chest': 'Πλάτη + Χέρια + Στήθος',
'Back + Chest + Neck': 'Πλάτη + Στήθος + Λαιμός',
'Bikini + Buttocks': 'Μπικίνι + Γλουτοί',
    

    // ----- Policy -----
    'Bookings, Deposits & Cancellation Policy': 'Πολιτική Κρατήσεων, Προκαταβολών & Ακυρώσεων',
    'A €10 deposit is required to secure your appointment.': 'Απαιτείται προκαταβολή €10 για την εξασφάλιση του ραντεβού σας.',
    'Your appointment is considered confirmed once the required deposit has been received.': 'Το ραντεβού θεωρείται επιβεβαιωμένο μόλις ληφθεί η απαιτούμενη προκαταβολή.',
    'The €10 deposit is applied toward the total cost of your treatment.': 'Η προκαταβολή €10 αφαιρείται από το συνολικό κόστος της θεραπείας.',
    'If you need to cancel or reschedule your appointment, please contact us as early as possible.': 'Αν χρειαστεί να ακυρώσετε ή να αλλάξετε το ραντεβού, επικοινωνήστε μαζί μας όσο το δυνατόν νωρίτερα.',
    'Late cancellations and missed appointments may result in the €10 deposit being non-refundable and a new deposit being required to make another booking.': 'Καθυστερημένες ακυρώσεις και μη προσέλευση μπορεί να έχουν ως αποτέλεσμα η προκαταβολή να μην επιστρέφεται και να απαιτείται νέα προκαταβολή.',
    'This policy helps us protect appointment times reserved exclusively for each client and allows us to offer cancelled appointments to other clients.': 'Αυτή η πολιτική μας βοηθά να προστατεύουμε τους χρόνους που έχουν κρατηθεί αποκλειστικά για κάθε πελάτη.',
    'By paying your deposit and confirming your appointment, you acknowledge and accept our booking and cancellation policy.': 'Με την πληρωμή της προκαταβολής και την επιβεβαίωση του ραντεβού, αποδέχεστε την πολιτική κρατήσεων και ακυρώσεων.',

    // ----- FAQ -----
    'Frequently Asked Questions': 'Συχνές Ερωτήσεις',
    'How many laser hair removal sessions will I need?': 'Πόσες συνεδρίες αποτρίχωσης με laser θα χρειαστώ;',
    'Is laser hair removal painful?': 'Είναι επώδυνη η αποτρίχωση με laser;',
    'How do I prepare for a laser hair removal session?': 'Πώς να προετοιμαστώ για μια συνεδρία;',
    'Do you offer laser hair removal for men?': 'Προσφέρετε αποτρίχωση με laser για άνδρες;',
    'Do I need an appointment?': 'Χρειάζομαι ραντεβού;',
    'Can men book treatments?': 'Μπορούν οι άνδρες να κλείσουν θεραπείες;',
    'Do you offer gift vouchers?': 'Προσφέρετε δωροεπιταγές;',

    // ===== About page (exact matches) =====
'Professional Beauty Treatments': 'Επαγγελματικές Θεραπείες Ομορφιάς',
'With a Personal Touch': 'Με Προσωπική Φροντίδα',
'At Nataly Laser House, we believe every client deserves professional treatments, honest advice, and a relaxing experience from the moment they walk through our doors.': 'Στο Nataly Laser House πιστεύουμε ότι κάθε πελάτης αξίζει επαγγελματικές θεραπείες, ειλικρινείς συμβουλές και μια χαλαρωτική εμπειρία από τη στιγμή που περνά την πόρτα μας.',

'Who We Are': 'Ποιοι Είμαστε',
'Your Trusted Beauty Studio': 'Το Αξιόπιστο Στούντιο Ομορφιάς σας',
'Nataly Laser House specialises in laser hair removal and massage treatments using professional equipment in a clean, comfortable, and welcoming environment.': 'Το Nataly Laser House ειδικεύεται στην αποτρίχωση με laser και στις θεραπείες μασάζ, χρησιμοποιώντας επαγγελματικό εξοπλισμό σε καθαρό, άνετο και φιλόξενο περιβάλλον.',
'Every treatment is tailored to your individual needs. Whether you\'re visiting for laser hair removal, a relaxing massage, or body care treatments, our goal is to help you feel confident, comfortable, and cared for.': 'Κάθε θεραπεία προσαρμόζεται στις ατομικές σας ανάγκες. Είτε επισκέπτεστε για αποτρίχωση με laser, χαλαρωτικό μασάζ ή θεραπείες σώματος, στόχος μας είναι να νιώθετε αυτοπεποίθηση, άνεση και φροντίδα.',

'Book Your Appointment': 'Κλείστε το Ραντεβού σας',

'Why Choose Us': 'Γιατί να μας Επιλέξετε',
'Why Clients Love Nataly Laser House': 'Γιατί οι Πελάτες Αγαπούν το Nataly Laser House',

'Professional Equipment': 'Επαγγελματικός Εξοπλισμός',
'We use high-quality laser technology and trusted treatment techniques to provide safe and effective results.': 'Χρησιμοποιούμε υψηλής ποιότητας τεχνολογία laser και αξιόπιστες τεχνικές θεραπείας για ασφαλή και αποτελεσματικά αποτελέσματα.',

'Personal Care': 'Προσωπική Φροντίδα',
'Every client receives personalised advice and treatments tailored to their skin type and individual goals.': 'Κάθε πελάτης λαμβάνει εξατομικευμένες συμβουλές και θεραπείες προσαρμοσμένες στον τύπο δέρματός του και στους προσωπικούς του στόχους.',

'Comfortable Studio': 'Άνετο Στούντιο',
'Relax in a calm, private environment designed to make every visit enjoyable and stress-free.': 'Χαλαρώστε σε ένα ήρεμο, ιδιωτικό περιβάλλον σχεδιασμένο για να κάνει κάθε επίσκεψη ευχάριστη και χωρίς άγχος.',

'Affordable Prices': 'Προσιτές Τιμές',
'Premium beauty treatments at competitive prices with no compromise on quality or customer care.': 'Ποιοτικές θεραπείες ομορφιάς σε ανταγωνιστικές τιμές, χωρίς συμβιβασμούς στην ποιότητα ή στην εξυπηρέτηση.',

'Ready to Visit?': 'Έτοιμοι να μας Επισκεφτείτε;',
'We\'d Love to Welcome You': 'Θα Χαρούμε να σας Καλωσορίσουμε',
'Book your appointment today and experience professional beauty treatments in a relaxing environment.': 'Κλείστε το ραντεβού σας σήμερα και απολαύστε επαγγελματικές θεραπείες ομορφιάς σε ένα χαλαρωτικό περιβάλλον.',

'Contact Us': 'Επικοινωνήστε μαζί μας',

'Booking & Cancellation Policy': 'Πολιτική Κρατήσεων & Ακυρώσεων',
'Please give us at least 24 hours\' notice if you need to cancel or reschedule.': 'Παρακαλούμε να μας ειδοποιήσετε τουλάχιστον 24 ώρες νωρίτερα αν χρειαστεί να ακυρώσετε ή να αλλάξετε το ραντεβού.',
'After 3 late cancellations or no-shows, a €10 deposit will be required to confirm future bookings.': 'Μετά από 3 καθυστερημένες ακυρώσεις ή μη προσέλευση, θα απαιτείται προκαταβολή €10 για την επιβεβαίωση μελλοντικών κρατήσεων.',

'At Nataly Laser House, we believe every client deserves professional treatments, honest advice, and a relaxing experience from the moment they walk through our doors.': 'Στο Nataly Laser House πιστεύουμε ότι κάθε πελάτης αξίζει επαγγελματικές θεραπείες, ειλικρινείς συμβουλές και μια χαλαρωτική εμπειρία από τη στιγμή που περνά την πόρτα μας.',

'Nataly Laser House specialises in laser hair removal and massage treatments using professional equipment in a clean, comfortable, and welcoming environment.': 'Το Nataly Laser House ειδικεύεται στην αποτρίχωση με laser και στις θεραπείες μασάζ, χρησιμοποιώντας επαγγελματικό εξοπλισμό σε καθαρό, άνετο και φιλόξενο περιβάλλον.',

'Every treatment is tailored to your individual needs. Whether you\'re visiting for laser hair removal, a relaxing massage, or body care treatments, our goal is to help you feel confident, comfortable, and cared for.': 'Κάθε θεραπεία προσαρμόζεται στις ατομικές σας ανάγκες. Είτε επισκέπτεστε για αποτρίχωση με laser, χαλαρωτικό μασάζ ή θεραπείες σώματος, στόχος μας είναι να νιώθετε αυτοπεποίθηση, άνεση και φροντίδα.',

'We use high-quality laser technology and trusted treatment techniques to provide safe and effective results.': 'Χρησιμοποιούμε υψηλής ποιότητας τεχνολογία laser και αξιόπιστες τεχνικές θεραπείας για ασφαλή και αποτελεσματικά αποτελέσματα.',

'Every client receives personalised advice and treatments tailored to their skin type and individual goals.': 'Κάθε πελάτης λαμβάνει εξατομικευμένες συμβουλές και θεραπείες προσαρμοσμένες στον τύπο δέρματός του και στους προσωπικούς του στόχους.',

'Relax in a calm, private environment designed to make every visit enjoyable and stress-free.': 'Χαλαρώστε σε ένα ήρεμο, ιδιωτικό περιβάλλον σχεδιασμένο για να κάνει κάθε επίσκεψη ευχάριστη και χωρίς άγχος.',

'Premium beauty treatments at competitive prices with no compromise on quality or customer care.': 'Ποιοτικές θεραπείες ομορφιάς σε ανταγωνιστικές τιμές, χωρίς συμβιβασμούς στην ποιότητα ή στην εξυπηρέτηση.',

'Book your appointment today and experience professional beauty treatments in a relaxing environment.': 'Κλείστε το ραντεβού σας σήμερα και απολαύστε επαγγελματικές θεραπείες ομορφιάς σε ένα χαλαρωτικό περιβάλλον.',

'All Rights Reserved.': 'Με επιφύλαξη παντός δικαιώματος.',

// ===== Services page – remaining translations =====
'Discover our professional laser hair removal and beauty treatments in Strovolos, Nicosia, designed to help you feel confident and relaxed. Nataly Laser House welcomes both new and returning clients for laser hair removal, facial treatments, V-Shape body treatments, Maderotherapy, massage, nails, lash lift and brow lamination.': 'Ανακαλύψτε τις επαγγελματικές μας θεραπείες αποτρίχωσης με laser και ομορφιάς στο Στρόβολο, Λευκωσία, σχεδιασμένες να σας κάνουν να νιώθετε αυτοπεποίθηση και χαλάρωση. Το Nataly Laser House καλωσορίζει τόσο νέους όσο και υπάρχοντες πελάτες για αποτρίχωση με laser, θεραπείες προσώπου, θεραπείες σώματος V-Shape, Μαδεροθεραπεία, μασάζ, νύχια, Lash Lift και Brow Lamination.',

'Progressive reduction of unwanted hair': 'Προοδευτική μείωση ανεπιθύμητων τριχών',
'Helps reduce ingrown hairs': 'Βοηθά στη μείωση των εισερχόμενων τριχών',
'Leaves the skin feeling smoother': 'Αφήνει την επιδερμίδα πιο λεία',
'Fast treatment for both small and large areas': 'Γρήγορη θεραπεία για μικρές και μεγάλες περιοχές',
'Dynamic Cooling technology for greater comfort during treatment': 'Τεχνολογία Dynamic Cooling για μεγαλύτερη άνεση κατά τη θεραπεία',
'Suitable treatment plans for both women and men': 'Κατάλληλα πρωτόκολλα για γυναίκες και άνδρες',

'Acne-prone and congested skin': 'Δέρμα με τάση ακμής και συμφόρηση',
'Hydration': 'Ενυδάτωση',
'Deep cleansing': 'Βαθύς καθαρισμός',
'Anti-ageing care': 'Αντιγηραντική φροντίδα',
'Lifting and firmness': 'Lifting και συσφίξη',
'Skin glow and revitalisation': 'Λάμψη και αναζωογόνηση',
'Uneven-looking pigmentation': 'Ανομοιόμορφη μελάγχρωση',
'Sensitive-looking skin and redness': 'Ευαίσθητο δέρμα και ερυθρότητα',
'Treatments may incorporate technologies such as HydraFacial, radiofrequency, ultrasound, LED Mask Therapy and Plasmatique™ Cold Plasma, depending on the selected protocol.': 'Οι θεραπείες μπορεί να ενσωματώνουν τεχνολογίες όπως HydraFacial, ραδιοσυχνότητες, υπέρηχο, LED Mask Therapy και Plasmatique™ Cold Plasma, ανάλογα με το επιλεγμένο πρωτόκολλο.',

'Removes impurities and excess oil': 'Αφαιρεί ακαθαρσίες και περίσσεια λιπαρότητας',
'Helps unclog congested pores': 'Βοηθά στο ξεβούλωμα των πόρων',
'Removes dead skin cells': 'Αφαιρεί νεκρά κύτταρα',
'Helps improve skin texture': 'Βελτιώνει την υφή της επιδερμίδας',
'Leaves the complexion looking cleaner and fresher': 'Αφήνει την επιδερμίδα πιο καθαρή και φρέσκια',

'Professional facial care selected according to your skin’s individual needs.': 'Επαγγελματική φροντίδα προσώπου επιλεγμένη σύμφωνα με τις ατομικές ανάγκες της επιδερμίδας σας.',
'Basic & Deep Cleansing': 'Βασικός & Βαθύς Καθαρισμός',
'Hydration & Glow': 'Ενυδάτωση & Λάμψη',
'Anti-ageing & Firmness': 'Αντιγήρανση & Συσφίξη',
'Acne-prone & Congested skin': 'Δέρμα με ακμή & Συμφόρηση',

'Advanced cold plasma technology combined with LED light therapy for powerful rejuvenation.': 'Προηγμένη τεχνολογία cold plasma σε συνδυασμό με LED φωτοθεραπεία για ισχυρή αναζωογόνηση.',
'Skin rejuvenation & texture': 'Αναζωογόνηση & υφή επιδερμίδας',
'Supports anti-ageing protocols': 'Υποστηρίζει αντιγηραντικά πρωτόκολλα',
'Helps with acne-prone skin': 'Βοηθά στο δέρμα με τάση ακμής',
'Non-invasive & comfortable': 'Μη επεμβατική & άνετη',
'Learn more →': 'Μάθετε περισσότερα →',

'Professional cleansing treatments that deeply cleanse and refresh the skin.': 'Επαγγελματικές θεραπείες καθαρισμού που καθαρίζουν βαθιά και ανανεώνουν την επιδερμίδα.',
'Removes impurities & excess oil': 'Αφαιρεί ακαθαρσίες & περίσσεια λιπαρότητας',
'Unclogs congested pores': 'Ξεβουλώνει τους πόρους',
'Improves skin texture': 'Βελτιώνει την υφή της επιδερμίδας',
'Leaves skin cleaner & fresher': 'Αφήνει την επιδερμίδα πιο καθαρή & φρέσκια',

'Helps improve the appearance of cellulite': 'Βοηθά στη βελτίωση της εμφάνισης της κυτταρίτιδας',
'Supports smoother-looking skin': 'Υποστηρίζει πιο λεία εμφάνιση δέρματος',
'Helps with skin firmness and toning': 'Βοηθά στη συσφίξη και τονισμό του δέρματος',
'Improves the appearance of targeted body areas': 'Βελτιώνει την εμφάνιση στοχευμένων περιοχών σώματος',
'Non-surgical and non-invasive': 'Μη χειρουργική και μη επεμβατική',

'Depending on the massage selected, benefits may include:': 'Ανάλογα με το μασάζ που επιλέγεται, τα οφέλη μπορεί να περιλαμβάνουν:',
'Relaxation and stress relief': 'Χαλάρωση και ανακούφιση από το στρες',
'Relief from muscular tension': 'Ανακούφιση από μυϊκή ένταση',
'Improved feeling of wellbeing': 'Βελτιωμένο αίσθημα ευεξίας',
'Support for tired and overworked muscles': 'Υποστήριξη κουρασμένων και υπερφορτωμένων μυών',
'Lymphatic drainage and reduction of fluid retention': 'Λεμφική αποστράγγιση και μείωση κατακράτησης υγρών',
'Ask our team which massage is most suitable for you.': 'Ρωτήστε την ομάδα μας ποιο μασάζ είναι το πιο κατάλληλο για εσάς.',
'Maderotherapy — a body massage technique using specially designed wooden tools.': 'Μαδεροθεραπεία — τεχνική μασάζ σώματος με ειδικά σχεδιασμένα ξύλινα εργαλεία.',
'Supports lymphatic drainage': 'Υποστηρίζει τη λεμφική αποστράγγιση',
'Stimulates circulation': 'Διεγείρει την κυκλοφορία',
'Helps reduce the feeling of fluid retention': 'Βοηθά στη μείωση του αισθήματος κατακράτησης υγρών',
'Provides massage and body-contouring benefits': 'Προσφέρει οφέλη μασάζ και body-contouring',
'From €40': 'Από €40',

'Professional nail care': 'Επαγγελματική φροντίδα νυχιών',
'Clean and polished appearance': 'Καθαρή και περιποιημένη εμφάνιση',
'Wide choice of colours and designs': 'Μεγάλη ποικιλία χρωμάτων και σχεδίων',
'Personalised shape and style': 'Εξατομικευμένο σχήμα και στυλ',

'Lifts and curls your natural lashes': 'Ανασηκώνει και καμπυλώνει τις φυσικές σας βλεφαρίδες',
'Makes lashes appear longer and more defined': 'Κάνει τις βλεφαρίδες να φαίνονται πιο μακριές και καθορισμένες',
'Low-maintenance result': 'Αποτέλεσμα χαμηλής συντήρησης',
'No lash extensions required': 'Δεν απαιτούνται extensions',

'Helps create a fuller brow appearance': 'Βοηθά στη δημιουργία πιο γεμάτων φρυδιών',
'Keeps brow hairs looking more uniform': 'Κρατά τις τρίχες των φρυδιών πιο ομοιόμορφες',
'Defines the natural brow shape': 'Καθορίζει το φυσικό σχήμα των φρυδιών',
'Makes daily brow styling easier': 'Κάνει το καθημερινό styling των φρυδιών πιο εύκολο',

// ===== Exact remaining Services bullets =====
'✔ Progressive reduction of unwanted hair': '✔ Προοδευτική μείωση ανεπιθύμητων τριχών',
'✔ Helps reduce ingrown hairs': '✔ Βοηθά στη μείωση των εισερχόμενων τριχών',
'✔ Leaves the skin feeling smoother': '✔ Αφήνει την επιδερμίδα πιο λεία',
'✔ Fast treatment for both small and large areas': '✔ Γρήγορη θεραπεία για μικρές και μεγάλες περιοχές',
'✔ Dynamic Cooling technology for greater comfort during treatment': '✔ Τεχνολογία Dynamic Cooling για μεγαλύτερη άνεση κατά τη θεραπεία',
'✔ Suitable treatment plans for both women and men': '✔ Κατάλληλα πρωτόκολλα για γυναίκες και άνδρες',

'✔ Acne-prone and congested skin': '✔ Δέρμα με τάση ακμής και συμφόρηση',
'✔ Hydration': '✔ Ενυδάτωση',
'✔ Deep cleansing': '✔ Βαθύς καθαρισμός',
'✔ Anti-ageing care': '✔ Αντιγηραντική φροντίδα',
'✔ Lifting and firmness': '✔ Lifting και συσφίξη',
'✔ Skin glow and revitalisation': '✔ Λάμψη και αναζωογόνηση',
'✔ Uneven-looking pigmentation': '✔ Ανομοιόμορφη μελάγχρωση',
'✔ Sensitive-looking skin and redness': '✔ Ευαίσθητο δέρμα και ερυθρότητα',

'Treatments may incorporate technologies such as HydraFacial, radiofrequency, ultrasound, LED Mask Therapy and Plasmatique™ Cold Plasma, depending on the selected protocol.': 'Οι θεραπείες μπορεί να ενσωματώνουν τεχνολογίες όπως HydraFacial, ραδιοσυχνότητες, υπέρηχο, LED Mask Therapy και Plasmatique™ Cold Plasma, ανάλογα με το επιλεγμένο πρωτόκολλο.',

'✔ Removes impurities and excess oil': '✔ Αφαιρεί ακαθαρσίες και περίσσεια λιπαρότητας',
'✔ Helps unclog congested pores': '✔ Βοηθά στο ξεβούλωμα των πόρων',
'✔ Removes dead skin cells': '✔ Αφαιρεί νεκρά κύτταρα',
'✔ Helps improve skin texture': '✔ Βελτιώνει την υφή της επιδερμίδας',
'✔ Leaves the complexion looking cleaner and fresher': '✔ Αφήνει την επιδερμίδα πιο καθαρή και φρέσκια',

'✔ Basic & Deep Cleansing': '✔ Βασικός & Βαθύς Καθαρισμός',
'✔ Hydration & Glow': '✔ Ενυδάτωση & Λάμψη',
'✔ Anti-ageing & Firmness': '✔ Αντιγήρανση & Συσφίξη',
'✔ Acne-prone & Congested skin': '✔ Δέρμα με ακμή & Συμφόρηση',

'✔ Skin rejuvenation & texture': '✔ Αναζωογόνηση & υφή επιδερμίδας',
'✔ Supports anti-ageing protocols': '✔ Υποστηρίζει αντιγηραντικά πρωτόκολλα',
'✔ Helps with acne-prone skin': '✔ Βοηθά στο δέρμα με τάση ακμής',
'✔ Non-invasive & comfortable': '✔ Μη επεμβατική & άνετη',

'✔ Removes impurities & excess oil': '✔ Αφαιρεί ακαθαρσίες & περίσσεια λιπαρότητας',
'✔ Unclogs congested pores': '✔ Ξεβουλώνει τους πόρους',
'✔ Improves skin texture': '✔ Βελτιώνει την υφή της επιδερμίδας',
'✔ Leaves skin cleaner & fresher': '✔ Αφήνει την επιδερμίδα πιο καθαρή & φρέσκια',

'✔ Helps improve the appearance of cellulite': '✔ Βοηθά στη βελτίωση της εμφάνισης της κυτταρίτιδας',
'✔ Supports smoother-looking skin': '✔ Υποστηρίζει πιο λεία εμφάνιση δέρματος',
'✔ Helps with skin firmness and toning': '✔ Βοηθά στη συσφίξη και τονισμό του δέρματος',
'✔ Improves the appearance of targeted body areas': '✔ Βελτιώνει την εμφάνιση στοχευμένων περιοχών σώματος',
'✔ Non-surgical and non-invasive': '✔ Μη χειρουργική και μη επεμβατική',

'✔ Relaxation and stress relief': '✔ Χαλάρωση και ανακούφιση από το στρες',
'✔ Relief from muscular tension': '✔ Ανακούφιση από μυϊκή ένταση',
'✔ Improved feeling of wellbeing': '✔ Βελτιωμένο αίσθημα ευεξίας',
'✔ Support for tired and overworked muscles': '✔ Υποστήριξη κουρασμένων και υπερφορτωμένων μυών',
'✔ Lymphatic drainage and reduction of fluid retention': '✔ Λεμφική αποστράγγιση και μείωση κατακράτησης υγρών',

'Maderotherapy — a body massage technique using specially designed wooden tools.': 'Μαδεροθεραπεία — τεχνική μασάζ σώματος με ειδικά σχεδιασμένα ξύλινα εργαλεία.',
'✔ Supports lymphatic drainage': '✔ Υποστηρίζει τη λεμφική αποστράγγιση',
'✔ Stimulates circulation': '✔ Διεγείρει την κυκλοφορία',
'✔ Helps reduce the feeling of fluid retention': '✔ Βοηθά στη μείωση του αισθήματος κατακράτησης υγρών',
'✔ Provides massage and body-contouring benefits': '✔ Προσφέρει οφέλη μασάζ και body-contouring',

'✔ Professional nail care': '✔ Επαγγελματική φροντίδα νυχιών',
'✔ Clean and polished appearance': '✔ Καθαρή και περιποιημένη εμφάνιση',
'✔ Wide choice of colours and designs': '✔ Μεγάλη ποικιλία χρωμάτων και σχεδίων',
'✔ Personalised shape and style': '✔ Εξατομικευμένο σχήμα και στυλ',

'✔ Lifts and curls your natural lashes': '✔ Ανασηκώνει και καμπυλώνει τις φυσικές σας βλεφαρίδες',
'✔ Makes lashes appear longer and more defined': '✔ Κάνει τις βλεφαρίδες να φαίνονται πιο μακριές και καθορισμένες',
'✔ Low-maintenance result': '✔ Αποτέλεσμα χαμηλής συντήρησης',
'✔ No lash extensions required': '✔ Δεν απαιτούνται extensions',

'✔ Helps create a fuller brow appearance': '✔ Βοηθά στη δημιουργία πιο γεμάτων φρυδιών',
'✔ Keeps brow hairs looking more uniform': '✔ Κρατά τις τρίχες των φρυδιών πιο ομοιόμορφες',
'✔ Defines the natural brow shape': '✔ Καθορίζει το φυσικό σχήμα των φρυδιών',
'✔ Makes daily brow styling easier': '✔ Κάνει το καθημερινό styling των φρυδιών πιο εύκολο',
'Discover our professional laser hair removal and beauty treatments in Strovolos, Nicosia, designed to help you feel confident and relaxed. Nataly Laser House welcomes both new and returning clients for laser hair removal, facial treatments, V-Shape body treatments, Maderotherapy, massage, nails, lash lift and brow lamination.': 'Ανακαλύψτε τις επαγγελματικές μας θεραπείες αποτρίχωσης με laser και ομορφιάς στο Στρόβολο, Λευκωσία, σχεδιασμένες να σας κάνουν να νιώθετε αυτοπεποίθηση και χαλάρωση. Το Nataly Laser House καλωσορίζει τόσο νέους όσο και υπάρχοντες πελάτες για αποτρίχωση με laser, θεραπείες προσώπου, θεραπείες σώματος V-Shape, Μαδεροθεραπεία, μασάζ, νύχια, Lash Lift και Brow Lamination.',
  };

  // Create reverse dictionary
  const reverse = {};
  Object.keys(t).forEach(en => {
    reverse[t[en]] = en;
  });

  function translatePage(lang) {
    btn.textContent = lang === 'en' ? 'ΕΛ' : 'EN';
    document.documentElement.lang = lang;

    // Translate all text nodes
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach(node => {
      const original = node.nodeValue;
      const trimmed = original.trim();
      if (!trimmed) return;

      if (lang === 'el' && t[trimmed]) {
        node.nodeValue = original.replace(trimmed, t[trimmed]);
      } else if (lang === 'en' && reverse[trimmed]) {
        node.nodeValue = original.replace(trimmed, reverse[trimmed]);
      }
    });
  }

  // Apply on load
  translatePage(currentLang);

  // Toggle
  btn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'el' : 'en';
    localStorage.setItem('nlh_lang', currentLang);
    // Reload is the most reliable way for full translation
    location.reload();
  });

  // Translate elements that have data-en / data-el
document.querySelectorAll('[data-en]').forEach(el => {
  if (lang === 'el' && el.dataset.el) {
    el.textContent = el.dataset.el;
  } else if (lang === 'en' && el.dataset.en) {
    el.textContent = el.dataset.en;
  }
});

document.querySelectorAll('[data-en]').forEach(el => {
  if (lang === 'el' && el.dataset.el) {
    el.textContent = el.dataset.el;
  } else if (lang === 'en' && el.dataset.en) {
    el.textContent = el.dataset.en;
  }
});


})();