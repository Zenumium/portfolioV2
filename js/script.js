document.addEventListener("DOMContentLoaded", function () {
  // Gallery functionality for both artwork and projects
  function setupGallery(selector) {
    const items = document.querySelectorAll(selector);

    // Check if elements exist before proceeding
    if (items.length === 0) {
      console.warn(`No elements found with selector: ${selector}`);
      return;
    }

    items.forEach((item) => {
      const imageContainer = item.querySelector(".image-container");

      // Validate required elements exist
      if (!imageContainer) {
        console.warn(`No .image-container found in ${selector}`);
        return;
      }

      const images = imageContainer.querySelectorAll("img");
      const prevButton = imageContainer.querySelector(".prev");
      const nextButton = imageContainer.querySelector(".next");

      // Validate required elements exist
      if (!images.length) {
        console.warn(`No images found in ${selector}`);
        return;
      }
      if (!prevButton || !nextButton) {
        console.warn(`Navigation buttons missing in ${selector}`);
        return;
      }

      let currentIndex = 0;

      // Show initial image
      images.forEach((img, index) => {
        img.style.display = index === 0 ? "block" : "none";
      });

      // Navigation handlers
      prevButton.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImageDisplay();
      });

      nextButton.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        updateImageDisplay();
      });

      function updateImageDisplay() {
        images.forEach((img, index) => {
          img.style.display = index === currentIndex ? "block" : "none";
        });
      }

      item.addEventListener("click", function () {
        // Collapse any previously expanded item
        const expanded = document.querySelector(`${selector}.expanded`);
        if (expanded && expanded !== this) {
          expanded.classList.remove("expanded");
        }
        // Toggle expanded state for clicked item
        this.classList.toggle("expanded");
        // Reset to first image when expanding
        if (this.classList.contains("expanded")) {
          currentIndex = 0;
          updateImageDisplay();
        }
        // Prevent scrolling when item is expanded
        document.body.style.overflow = this.classList.contains("expanded")
          ? "hidden"
          : "auto";
      });
    });

    // Close expanded items when clicking outside
    document.addEventListener("click", function (event) {
      const expanded = document.querySelector(`${selector}.expanded`);
      if (expanded && !expanded.contains(event.target)) {
        expanded.classList.remove("expanded");
        document.body.style.overflow = "auto";
      }
    });
  }

  // Initialize galleries
  setupGallery(".artwork-item");
  setupGallery(".project-item");

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll("nav ul li a");
  if (navLinks.length) {
    navLinks.forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });
  }
});
