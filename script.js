const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("main section[id]")];
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navItems.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => sectionObserver.observe(section));

document.getElementById("year").textContent = new Date().getFullYear();

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formNote.textContent = "Please complete all fields before continuing.";
    return;
  }

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`Hi Akshat,\n\n${message}\n\nRegards,\n${name}\n${email}`);
  formNote.textContent = "Opening your email app…";
  window.location.href = `mailto:akshat@example.com?subject=${subject}&body=${body}`;
});
