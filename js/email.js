// Initialize EmailJS
document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("bpjYTPT9IvV8WBci6"); // Replace with your EmailJS Public Key
  
    const contactForm = document.getElementById("contact-form");
  
    if (contactForm) {
      contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form refresh
  
        // Collect form data
        let formData = {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          message: document.getElementById("message").value,
        };
  
        // Send email via EmailJS
        emailjs
          .send("service_4b6ovui", "template_fqkx57g", formData)
          .then((response) => {
            document.getElementById("status-message").innerText =
              "Message Sent Successfully!";
            document.getElementById("contact-form").reset();
          })
          .catch((error) => {
            document.getElementById("status-message").innerText =
              "Error sending message. Try again.";
            console.error("EmailJS Error:", error);
          });
      });
    }
  });