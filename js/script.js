document.addEventListener("DOMContentLoaded", function () {
  function setupGallery(selector) {
    const items = document.querySelectorAll(selector);

    if (items.length === 0) {
      console.warn(`No elements found with selector: ${selector}`);
      return;
    }

    items.forEach((item) => {
      const imageContainer = item.querySelector(".image-container");

      if (!imageContainer) {
        console.warn(`No .image-container found in ${selector}`);
        return;
      }

      const images = imageContainer.querySelectorAll("img");
      if (!images.length) {
        console.warn(`No images found in ${selector}`);
        return;
      }

      let currentIndex = 0;
      item.addEventListener("keydown", function (e) {
        if (this.classList.contains("expanded")) {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImageDisplay();
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            currentIndex = (currentIndex + 1) % images.length;
            updateImageDisplay();
          }
        }
      });
      const counter = document.createElement("div");
      counter.className = "image-counter";
      let dotsHtml = "";
      for (let i = 0; i < images.length; i++) {
        dotsHtml += `<span class="dot ${
          i === 0 ? "active" : ""
        }" data-index="${i}">${i + 1}</span>`;
        if (i < images.length - 1) {
          dotsHtml += ".";
        }
      }
      counter.innerHTML = dotsHtml;
      counter.style.position = "absolute";
      counter.style.bottom = "10px";
      counter.style.left = "50%";
      counter.style.transform = "translateX(-50%)";
      counter.style.background = "rgba(0, 0, 0, 0.7)";
      counter.style.color = "white";
      counter.style.padding = "5px 15px";
      counter.style.borderRadius = "15px";
      counter.style.fontSize = "20px";
      counter.style.fontWeight = "bold";
      counter.style.zIndex = "5";
      counter.style.display = "none";
      counter.style.textAlign = "center";

      const style = document.createElement("style");
      style.textContent = `
        .image-counter .dot {
          display: inline-block;
          cursor: pointer;
          transition: transform 0.2s, color 0.2s;
        }
        .image-counter .dot.active {
          color: #FFF;
          transform: scale(1.2);
        }
        .image-counter .dot:not(.active) {
          color: #CCC;
        }
      `;
      document.head.appendChild(style);

      imageContainer.style.position = "relative";
      imageContainer.appendChild(counter);

      // **Ensure images are centered and ready for smooth transitions**
      images.forEach((img, index) => {
        img.style.position = "absolute";
        img.style.top = "50%";
        img.style.left = "50%";
        img.style.transform = "translate(-50%, -50%)"; // Keep centered
        img.style.width = "auto"; // Adjust to image size
        img.style.height = "100%"; // Ensures it covers the container
        img.style.transition = "opacity 0.5s ease";
        img.style.opacity = index === 0 ? "1" : "0"; // Show first image, hide others
        img.style.zIndex = index === 0 ? "1" : "0"; // Ensure correct layering
      });

      function updateImageDisplay() {
        images.forEach((img, index) => {
          img.style.position = "absolute";
          img.style.top = "50%";
          img.style.left = "50%";
          img.style.transform = "translate(-50%, -50%)";
          img.style.width = "auto";
          img.style.height = "100%";
          img.style.transition = "opacity 0.5s ease";
          img.style.opacity = index === currentIndex ? "1" : "0";
          img.style.zIndex = index === currentIndex ? "5" : "0"; // 🔹 Lower than text
          img.style.display = "block";
        });

        counter.querySelectorAll(".dot").forEach((dot, index) => {
          dot.classList.toggle("active", index === currentIndex);
        });
      }
      // Automatic image switching
      let intervalId;
      const startAutoSwitch = () => {
        intervalId = setInterval(() => {
          currentIndex = (currentIndex + 1) % images.length;
          updateImageDisplay();
        }, 5000);
      };

      // Start auto-switch when item is expanded
      item.addEventListener("click", function () {
        const expanded = document.querySelector(`${selector}.expanded`);
        if (expanded && expanded !== this) {
          expanded.classList.remove("expanded");
          expanded.querySelector(".image-counter").style.display = "none";
          clearInterval(intervalId);
        }

        this.classList.toggle("expanded");

        const itemCounter = this.querySelector(".image-counter");
        itemCounter.style.display = this.classList.contains("expanded")
          ? "block"
          : "none";

        if (this.classList.contains("expanded")) {
          currentIndex = 0;
          updateImageDisplay();
          startAutoSwitch();
        }

        document.body.style.overflow = this.classList.contains("expanded")
          ? "hidden"
          : "auto";
      });

      // Stop auto-switch when clicking outside
      document.addEventListener("click", function (event) {
        const expanded = document.querySelector(`${selector}.expanded`);
        if (expanded && !expanded.contains(event.target)) {
          expanded.classList.remove("expanded");
          expanded.querySelector(".image-counter").style.display = "none";
          clearInterval(intervalId);
          document.body.style.overflow = "auto";
        }
      });

      counter.querySelectorAll(".dot").forEach((dot) => {
        dot.addEventListener("click", (e) => {
          e.stopPropagation();
          currentIndex = parseInt(dot.getAttribute("data-index"));
          updateImageDisplay();
        });
      });
    });
  }

  setupGallery(".artwork-item");
  setupGallery(".project-item");

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
