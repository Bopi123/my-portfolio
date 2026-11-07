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
            "a, button, .project-card, .skill-row, .focus-card, .timeline-item, .stat"
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
   REDUCED MOTION CHECK
========================= */

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


/* =========================
   TIME-BASED GREETING
========================= */

const greeting = document.getElementById("greeting");

if (greeting) {

    const hour = new Date().getHours();

    const word = hour < 12
        ? "GOOD MORNING"
        : hour < 18
            ? "GOOD AFTERNOON"
            : "GOOD EVENING";

    greeting.textContent = word + ", I'M";

}


/* =========================
   TYPING ROLES (HERO)
========================= */

const typedElement = document.getElementById("typed");

const roles = [
    "IT STUDENT",
    "CYBERSECURITY ENTHUSIAST",
    "PROGRAMMER IN THE MAKING",
    "CONTINUOUS LEARNER"
];

if (typedElement) {

    if (reduceMotion) {

        typedElement.textContent = roles[0];

    } else {

        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeRoles() {

            const word = roles[roleIndex];

            typedElement.textContent = word.slice(0, charIndex);

            let delay = deleting ? 40 : 85;

            if (!deleting && charIndex === word.length) {

                delay = 1600;
                deleting = true;

            } else if (deleting && charIndex === 0) {

                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                delay = 350;

            } else {

                charIndex += deleting ? -1 : 1;

            }

            setTimeout(typeRoles, delay);

        }

        typeRoles();

    }

}


/* =========================
   SCROLL PROGRESS + BACK TO TOP
========================= */

const progressBar = document.getElementById("scroll-progress");
const toTopButton = document.getElementById("to-top");

function updateScrollUI() {

    const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

    if (progressBar) {
        progressBar.style.transform = `scaleX(${progress})`;
    }

    if (toTopButton) {
        toTopButton.classList.toggle("show", window.scrollY > 600);
    }

}

window.addEventListener("scroll", updateScrollUI, { passive: true });

updateScrollUI();

if (toTopButton) {

    toTopButton.addEventListener("click", () => {

        window.scrollTo({ top: 0, behavior: "smooth" });

    });

}


/* =========================
   ACTIVE NAV LINK (SCROLL SPY)
========================= */

const spyLinks = Array.from(
    document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-contact)')
);

const spyMap = new Map(
    spyLinks.map(link => [link.getAttribute("href").slice(1), link])
);

if ("IntersectionObserver" in window) {

    const spyObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            spyLinks.forEach(link => link.classList.remove("current"));

            const activeLink = spyMap.get(entry.target.id);

            if (activeLink) activeLink.classList.add("current");

        });

    }, {
        rootMargin: "-45% 0px -50% 0px"
    });

    [...spyMap.keys(), "stats", "contact"].forEach(id => {

        const section = document.getElementById(id);

        if (section) spyObserver.observe(section);

    });

}


/* =========================
   COUNT-UP NUMBERS
========================= */

const counters = document.querySelectorAll(".count");

function formatCount(value) {
    return String(value).padStart(2, "0");
}

if ("IntersectionObserver" in window) {

    const countObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const element = entry.target;

            countObserver.unobserve(element);

            const target = Number(element.dataset.target);

            if (reduceMotion) {
                element.textContent = formatCount(target);
                return;
            }

            const startTime = performance.now();
            const duration = 1400;

            function step(now) {

                const t = Math.min((now - startTime) / duration, 1);

                const eased = 1 - Math.pow(1 - t, 3);

                element.textContent = formatCount(Math.round(target * eased));

                if (t < 1) requestAnimationFrame(step);

            }

            requestAnimationFrame(step);

        });

    }, {
        threshold: 0.6
    });

    counters.forEach(counter => countObserver.observe(counter));

} else {

    counters.forEach(counter => {
        counter.textContent = formatCount(counter.dataset.target);
    });

}


/* =========================
   TERMINAL TYPING EFFECT
========================= */

const terminalBody = document.getElementById("terminal-body");

const terminalLines = [
    { cmd: "whoami", out: "ivann_mulles" },
    { cmd: "cat school.txt", out: "TUP–Manila · 2nd year · IT" },
    { cmd: "cat interests.txt", out: "cybersecurity, programming, web dev" },
    { cmd: "./status.sh", out: "learning... building... repeat." }
];

async function runTerminal() {

    for (const line of terminalLines) {

        const row = document.createElement("div");
        const prompt = document.createElement("span");
        const command = document.createElement("span");

        prompt.className = "t-prompt";
        prompt.textContent = "$ ";
        command.className = "t-cmd";

        row.append(prompt, command);
        terminalBody.appendChild(row);

        for (const character of line.cmd) {

            command.textContent += character;

            await sleep(reduceMotion ? 0 : 55);

        }

        await sleep(reduceMotion ? 0 : 250);

        const output = document.createElement("div");

        output.className = "t-out";
        output.textContent = line.out;

        terminalBody.appendChild(output);

        await sleep(reduceMotion ? 0 : 350);

    }

    const endRow = document.createElement("div");
    const endPrompt = document.createElement("span");
    const caret = document.createElement("span");

    endPrompt.className = "t-prompt";
    endPrompt.textContent = "$ ";
    caret.className = "caret";

    endRow.append(endPrompt, caret);
    terminalBody.appendChild(endRow);

}

if (terminalBody) {

    if ("IntersectionObserver" in window) {

        const terminalObserver = new IntersectionObserver(entries => {

            if (entries[0].isIntersecting) {

                terminalObserver.disconnect();

                runTerminal();

            }

        }, {
            threshold: 0.4
        });

        terminalObserver.observe(terminalBody);

    } else {

        runTerminal();

    }

}


/* =========================
   PROJECT CARD 3D TILT
========================= */

if (hasFinePointer && !reduceMotion) {

    document.querySelectorAll(".project-card").forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            card.style.setProperty("--ry", (x * 8) + "deg");
            card.style.setProperty("--rx", (-y * 8) + "deg");

        });

        card.addEventListener("mouseleave", () => {

            card.style.setProperty("--rx", "0deg");
            card.style.setProperty("--ry", "0deg");

        });

    });

}


/* =========================
   COPY EMAIL BUTTON
========================= */

const copyButton = document.getElementById("copy-email");

if (copyButton) {

    copyButton.addEventListener("click", async () => {

        const email = "icmulles@gmail.com";

        try {

            await navigator.clipboard.writeText(email);

        } catch (error) {

            const helper = document.createElement("textarea");

            helper.value = email;
            document.body.appendChild(helper);
            helper.select();
            document.execCommand("copy");
            helper.remove();

        }

        copyButton.textContent = "COPIED ✓";
        copyButton.classList.add("copied");

        setTimeout(() => {

            copyButton.textContent = "COPY";
            copyButton.classList.remove("copied");

        }, 1800);

    });

}


/* =========================
   CONSOLE MESSAGE
========================= */

console.log("Ivann Mulles Portfolio Loaded Successfully!");
