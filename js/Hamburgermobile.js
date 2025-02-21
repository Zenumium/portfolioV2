document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.body;

  // Create backdrop element
  const backdrop = document.createElement("div");
  backdrop.className = "menu-backdrop";
  document.body.appendChild(backdrop);

  // Toggle menu function
  function toggleMenu() {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
    backdrop.classList.toggle("active");
    body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
  }

  // Event listeners
  menuToggle.addEventListener("click", toggleMenu);
  backdrop.addEventListener("click", toggleMenu);

  // Close menu when clicking a link
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleMenu();
    });
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      toggleMenu();
    }
  });

  // Handle resize
  let timeout;
  window.addEventListener("resize", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
        toggleMenu();
      }
    }, 250);
  });

  // Prevent body scroll when menu is open on touch devices
  document.addEventListener(
    "touchmove",
    (e) => {
      if (navMenu.classList.contains("active")) {
        if (!navMenu.contains(e.target)) {
          e.preventDefault();
        }
      }
    },
    { passive: false }
  );
});
