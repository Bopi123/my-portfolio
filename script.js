/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("show");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";

});


// Close navigation after selecting a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-label", "Open navigation");

        menuToggle.textContent = "☰";

    });

});


/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {

        observer.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("active");

    });

}


/* =========================
   CUSTOM ANIMATED CURSOR
========================= */

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

const hasFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
).matches;

if (cursorDot && cursorOutline && hasFinePointer) {

    let mouseX = 0;
    let mouseY = 0;

    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener("mousemove", event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";

        cursorDot.style.opacity = "1";
        cursorOutline.style.opacity = "1";

    });


    // Smooth following animation

    function animateCursor() {

        outlineX += (mouseX - outlineX) * 0.15;

        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = outlineX + "px";

        cursorOutline.style.top = outlineY + "px";

        requestAnimationFrame(animateCursor);

    }

    animateCursor();


    // Expand cursor over interactive elements

    document.addEventListener("mouseover", event => {

        if (event.target.closest(
            "a, button, .project-card, .skill-row"
        )) {

            cursorOutline.classList.add("cursor-hover");

        } else {

            cursorOutline.classList.remove("cursor-hover");

        }

    });


    // Hide cursor when leaving page

    document.addEventListener("mouseout", event => {

        if (!event.relatedTarget) {

            cursorDot.style.opacity = "0";

            cursorOutline.style.opacity = "0";

        }

    });

    document.addEventListener("mouseenter", () => {

        cursorDot.style.opacity = "1";

        cursorOutline.style.opacity = "1";

    });

}


/* =========================
   PROJECT CARD GLOW
========================= */

document.querySelectorAll(".project-card").forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;

        const y = event.clientY - rect.top;

        card.style.setProperty("--mouse-x", x + "px");

        card.style.setProperty("--mouse-y", y + "px");

    });

});


/* =========================
   MAGNETIC BUTTON EFFECT
========================= */

const magneticButtons = document.querySelectorAll(".magnetic");

if (hasFinePointer) {

    magneticButtons.forEach(button => {

        button.addEventListener("mousemove", event => {

            const rect = button.getBoundingClientRect();

            const x = event.clientX - rect.left - rect.width / 2;

            const y = event.clientY - rect.top - rect.height / 2;

            button.style.translate =
                `${x * 0.12}px ${y * 0.12 - 5}px`;

        });

        button.addEventListener("mouseleave", () => {

            button.style.translate = "";

        });

    });

}


/* =========================
   AUTOMATIC COPYRIGHT YEAR
========================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================
   CONSOLE MESSAGE
========================= */

console.log("Ivann Mulles Portfolio Loaded Successfully!");
