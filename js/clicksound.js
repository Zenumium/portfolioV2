// Function to play the click sound
function playClickSound() {
  // Create a new audio element
  const audio = new Audio("./menuSound/ClickSound.wav");
  audio.volume = 0.2;
  // Play the sound
  audio.play();
}

// Add an event listener to the document
let clickTimeout = null;
let lastClickTime = 0;
document.addEventListener("click", function () {
  // Get the current time
  const currentTime = new Date().getTime();

  // Check if the time since the last click is greater than the delay
  if (currentTime - lastClickTime > 300) {
    // Play the click sound effect
    playClickSound();

    // Update the last click time
    lastClickTime = currentTime;
  }
});
