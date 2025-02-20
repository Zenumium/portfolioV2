// Gallery functionality for both artwork and projects
function setupGallery(selector) {
    document.querySelectorAll(selector).forEach(item => {
        item.addEventListener('click', function() {
            // Collapse any previously expanded item
            const expanded = document.querySelector(`${selector}.expanded`);
            if (expanded && expanded !== this) {
                expanded.classList.remove('expanded');
            }
            // Toggle expanded state for clicked item
            this.classList.toggle('expanded');
            // Prevent scrolling when item is expanded
            document.body.style.overflow = this.classList.contains('expanded') ? 'hidden' : 'auto';
        });
    });

    // Close expanded items when clicking outside
    document.addEventListener('click', function(event) {
        const expanded = document.querySelector(`${selector}.expanded`);
        if (expanded && !expanded.contains(event.target)) {
            expanded.classList.remove('expanded');
            document.body.style.overflow = 'auto';
        }
    });
}

// Initialize galleries
setupGallery('.artwork-item');
setupGallery('.project-item');

// Parallax effect for sections
window.addEventListener('scroll', function() {
    const parallaxSections = document.querySelectorAll('.parallax');
    parallaxSections.forEach(section => {
        const scrollPosition = window.pageYOffset;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const parallaxSpeed = 0.5;

        if (scrollPosition > sectionTop - window.innerHeight && scrollPosition < sectionTop + sectionHeight) {
            const offset = (scrollPosition - sectionTop) * parallaxSpeed;
            section.style.backgroundPositionY = `${offset}px`;
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
