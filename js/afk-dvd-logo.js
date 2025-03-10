document.addEventListener("DOMContentLoaded", () => {
  const dvdLogo = document.createElement("img");
  dvdLogo.src = "/images/icons8-logo-dvd-100.png"; // Replace with the actual path to the DVD logo image
  dvdLogo.style.position = "absolute";
  dvdLogo.style.width = "100px"; // Adjust size as needed
  dvdLogo.style.display = "none"; // Initially hidden
  document.body.appendChild(dvdLogo);

  let timer;
  let directionX = 1;
  let directionY = 1;
  let posX = 0;
  let posY = 0;

  function startAFKTimer() {
    console.log(`User became AFK at: ${new Date().toLocaleTimeString()}`);

    timer = setTimeout(() => {
      let elapsedTime = 0; // Initialize elapsed time
      const interval = setInterval(() => {
        elapsedTime += 1; // Increment elapsed time every second
      }, 1000); // Log every second

      console.log(
        `AFK timer reached 30 seconds at: ${new Date().toLocaleTimeString()}`
      );
      console.log(
        `AFK timer reached 30 seconds at: ${new Date().toLocaleTimeString()}`
      );
      dvdLogo.style.display = "block";
      moveLogo();
    }, 30000); // 30 seconds
  }

  function resetAFKTimer() {
    console.log(`User is active again at: ${new Date().toLocaleTimeString()}`);
    clearTimeout(timer);

    dvdLogo.style.display = "none"; // Hide logo when user is active
    posX = 0; // Reset position
    posY = 0; // Reset position
    startAFKTimer();
  }

  function moveLogo() {
    const moveInterval = setInterval(() => {
      posX += 5 * directionX; // Move 5 pixels
      posY += 5 * directionY; // Move 5 pixels
      dvdLogo.style.left = posX + "px";
      dvdLogo.style.top = posY + "px";

      // Check for collision with window edges
      if (posX + dvdLogo.offsetWidth >= window.innerWidth || posX <= 0) {
        directionX *= -1; // Reverse direction
      }
      if (posY + dvdLogo.offsetHeight >= window.innerHeight || posY <= 0) {
        directionY *= -1; // Reverse direction
      }
    }, 30); // Move every 30 milliseconds

    // Stop moving when user interacts
    document.addEventListener(
      "mousemove",
      () => {
        clearInterval(moveInterval);
        resetAFKTimer();
      },
      { once: true }
    );
  }

  // Start the AFK timer on user activity
  document.addEventListener("mousemove", resetAFKTimer);
  document.addEventListener("keypress", resetAFKTimer);
  startAFKTimer();
});
