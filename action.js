// =======================
// INIT SYSTEM (KIOSK PRO)
// =======================
(() => {

"use strict";

const $ = (id) => document.getElementById(id);
const $$ = (q) => document.querySelectorAll(q);


// =======================
// PARALLAX ELEMENTS
// =======================
const text = $("text");
const cloud = $("cloud");
const bird1 = $("bird1");
const bird2 = $("bird2");
const forest = $("forest");
const mountains = $("mountains");
const sky = $("sky");
const sun = $("sun");


// =======================
// PARALLAX SCROLL (SMOOTH)
// =======================
let ticking = false;

window.addEventListener("scroll", () => {

    if (!ticking) {
        requestAnimationFrame(() => {

            const value = window.scrollY;

            if (text) text.style.top = 50 + value * -0.2 + "%";
            if (cloud) cloud.style.left = value * 1.5 + "px";

            if (bird1) {
                bird1.style.top = value * 0.1 + "px";
                bird1.style.left = value * 0.8 + "px";
            }

            if (bird2) {
                bird2.style.top = value * -0.1 + "px";
                bird2.style.left = value * -1.5 + "px";
            }

            if (forest) forest.style.top = value * 0.3 + "px";
            if (sky) sky.style.top = value * 0.2 + "px";
            if (mountains) mountains.style.top = value * 0.25 + "px";
            if (sun) sun.style.top = value * 0.8 + "px";

            ticking = false;

        });

        ticking = true;
    }

});


// =======================
// DATE & TIME SYSTEM
// =======================
function updateDateTime() {
    const el = $("datetime");
    if (!el) return;

    const now = new Date();

    el.innerHTML =
        now.toLocaleDateString("ms-MY", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        })
        + " | " +
        now.toLocaleTimeString("ms-MY");
}

setInterval(updateDateTime, 1000);
updateDateTime();


// =======================
// SIDEBAR MENU
// =======================
const sidebar = $("mobile-sidebar");
const toggle = $("menu-toggle");
const overlay = $("overlay");
const sidebarLinks = $$("#mobile-sidebar a");

function openMenu() {
    sidebar?.classList.add("active");
    overlay?.classList.add("active");
}

function closeMenu() {
    sidebar?.classList.remove("active");
    overlay?.classList.remove("active");
}

toggle?.addEventListener("click", () => {
    sidebar.classList.contains("active") ? closeMenu() : openMenu();
});

overlay?.addEventListener("click", closeMenu);

sidebarLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});


// =======================
// AUTO SCROLL SYSTEM
// =======================
const sections = ["utama","perkhidmatan","pengumuman","peta","faq","borang","footer"];

let index = 0;
let autoScroll = true;

setInterval(() => {

    if (!autoScroll) return;

    index = (index + 1) % sections.length;

    const el = $(sections[index]);

    if (el) {
        el.scrollIntoView({ behavior: "smooth" });
    }

}, 20000);


// =======================
// IDLE SYSTEM (KIOSK RESET)
// =======================
let idleTime = 0;
const idleLimit = 30; // seconds

function resetToHome() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    autoScroll = true;
    index = 0;
}

// detect user activity
["click","touchstart","mousemove","keydown"].forEach(evt => {
    window.addEventListener(evt, () => {
        idleTime = 0;
        autoScroll = false;
    });
});

// idle timer
setInterval(() => {

    idleTime++;

    if (idleTime >= idleLimit) {
        resetToHome();
        idleTime = 0;
    }

}, 1000);


// =======================
// PERKHIDMATAN + RIPPLE + SOUND
// =======================
const clickSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");

document.addEventListener("DOMContentLoaded", () => {

    const cards = $$(".perkhidmatan-card");

    cards.forEach(card => {

        card.addEventListener("click", (e) => {

            const isActive = card.classList.contains("active");

            cards.forEach(c => c.classList.remove("active"));

            if (!isActive) card.classList.add("active");

            // sound
            clickSound.currentTime = 0;
            clickSound.play();

            // ripple
            const ripple = document.createElement("span");
            ripple.className = "ripple";

            const rect = card.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + "px";
            ripple.style.top = (e.clientY - rect.top) + "px";

            card.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);

        });

    });

});


// =======================
// FAQ SYSTEM
// =======================
document.addEventListener("DOMContentLoaded", () => {

    const faqItems = $$(".faq-item");

    faqItems.forEach(item => {

        const q = item.querySelector(".faq-question");

        q.addEventListener("click", () => {

            faqItems.forEach(el => {
                if (el !== item) el.classList.remove("active");
            });

            item.classList.toggle("active");

        });

    });

});


// =======================
// MAP + SEARCH
// =======================
window.searchLocation = function () {

    const input = $("mapSearch");
    const map = $("map");

    if (!input || !map) return;

    const val = input.value.trim();
    if (!val) return;

    map.src = `https://www.google.com/maps?q=${encodeURIComponent(val)}&output=embed`;
};


// =======================
// QR SYSTEM
// =======================
window.generateQR = function () {

    const box = $("qrBox");
    if (!box || !window.QRCode) return;

    box.innerHTML = "";

    new QRCode(box, {
        text: location.href,
        width: 180,
        height: 180
    });

};

window.generateBorangQR = function () {

    const box = $("qrBoxBorang");
    if (!box || !window.QRCode) return;

    box.innerHTML = "";

    new QRCode(box, {
        text: "./pdf/form.pdf",
        width: 180,
        height: 180
    });

};

})();
