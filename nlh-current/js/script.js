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