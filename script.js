 // ============================================
// 1. WELCOME MESSAGE (Runs when the page finishes loading)
// ============================================

// Listen for the event that fires when the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // alert('Welcome to my portfolio website! I\'m Lindokuhle Mchilwa.');  ← removed
    console.log('Website loaded successfully!');
});


// ============================================
// 2. LIGHT / DARK MODE TOGGLE
// ============================================

// Get the button that has the id "theme-toggle"
const themeToggleBtn = document.getElementById('theme-toggle');

// Only continue if the button actually exists on the page
if (themeToggleBtn) {
    // When the user clicks the theme button...
    themeToggleBtn.addEventListener('click', function() {
        // Add the class "dark-mode" if it is not there, or remove it if it is already there
        document.body.classList.toggle('dark-mode');
        
        // Check if the body now has the "dark-mode" class
        if (document.body.classList.contains('dark-mode')) {
            // Change the button icon to a sun (meaning "click to switch to light mode")
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            // Change the tooltip text that appears when hovering
            themeToggleBtn.title = 'Switch to Light Mode';
        } else {
            // Change the button icon back to a moon
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            // Change the tooltip text
            themeToggleBtn.title = 'Switch to Dark Mode';
        }
    });
}


// ============================================
// 3. ACTIVE NAVIGATION LINK HIGHLIGHTING
// ============================================

// Wait until the page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the current page file name from the browser URL
    // Example: if the URL ends with "about.html", currentPage becomes "about.html"
    // If the path is empty (home page), use "index.html" as default
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Select all the <a> links inside the navigation menu
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Loop through every navigation link
    navLinks.forEach(function(link) {
        // Get the value of the href attribute of the current link
        const linkPage = link.getAttribute('href');
        
        // If this link points to the page we are currently on...
        if (linkPage === currentPage) {
            // Add the "active" class so CSS can highlight it
            link.classList.add('active');
        }
    });
});


// ============================================
// 4. MOBILE MENU TOGGLE (Hamburger Menu)
// ============================================

// Get the hamburger button
const menuToggle = document.getElementById('menu-toggle');
// Get the navigation menu list
const navMenu = document.querySelector('.nav-menu');

// Only run this code if both elements exist
if (menuToggle && navMenu) {
    // When the hamburger button is clicked...
    menuToggle.addEventListener('click', function() {
        // Add or remove the class "show" on the menu
        // (CSS uses .nav-menu.show { display: flex; })
        navMenu.classList.toggle('show');
    });
}

// Close the mobile menu automatically when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(function(link) {
    link.addEventListener('click', function() {
        // Only close the menu if the screen width is 768px or smaller (mobile)
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('show');
        }
    });
});


// ============================================
// 5. FORM VALIDATION (Complete Version)
// ============================================

function validateForm() {
    // Get the input fields by their id
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Get the values and remove any extra spaces at the start or end
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message ? message.value.trim() : '';

    // ----- Check Name -----
    if (nameValue === '') {
        alert('Please enter your full name.');
        name.focus();          // Move the cursor to the name field
        return false;          // Stop the form from submitting
    }

    if (nameValue.length < 2) {
        alert('Name must be at least 2 characters long.');
        name.focus();
        return false;
    }

    // ----- Check Email -----
    if (emailValue === '') {
        alert('Please enter your email address.');
        email.focus();
        return false;
    }

    // Regular expression that checks for a basic email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
        alert('Please enter a valid email address (example: name@example.com).');
        email.focus();
        return false;
    }

    // ----- Check Message -----
    if (message && messageValue === '') {
        alert('Please write a message.');
        message.focus();
        return false;
    }

    if (message && messageValue.length < 10) {
        alert('Message should be at least 10 characters long.');
        message.focus();
        return false;
    }

    // If all checks pass
    alert('Thank you! Your message has been sent successfully.');
    return true;   // Allow the form to submit
}


// ============================================
// 6. DIGITAL CLOCK
// ============================================

function updateClock() {
    // Get the current date and time
    const now = new Date();

    // Get hours, minutes and seconds
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Add a leading zero if the number is less than 10
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Create the time string
    const timeString = hours + ':' + minutes + ':' + seconds;

    // Find the element with id "digital-clock"
    const clockElement = document.getElementById('digital-clock');

    // Only update if the element exists on the page
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

// Call the function once immediately so the clock appears right away
updateClock();

// Call the function every 1000 milliseconds (1 second)
setInterval(updateClock, 1000);


// ============================================
// 7. TYPING EFFECT
// ============================================

const texts = [
    "Full-Stack Developer",
    "Tech Entrepreneur",
    "Problem Solver",
    "Lifelong Learner"
];

let textIndex = 0;      // Which sentence we are currently typing
let charIndex = 0;      // Which character of the sentence we are on
let isDeleting = false; // Are we currently deleting characters?
const typingSpeed = 100; // Milliseconds between each character

function typeEffect() {
    const typingElement = document.getElementById('typing-text');

    // Stop if the element does not exist on this page
    if (!typingElement) return;

    const currentText = texts[textIndex];

    if (isDeleting) {
        // Remove one character
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Add one character
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    // Decide what to do next
    if (!isDeleting && charIndex === currentText.length) {
        // Finished typing → wait a bit, then start deleting
        isDeleting = true;
        setTimeout(typeEffect, 1500);
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting → move to the next sentence
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeEffect, 500);
    } else {
        // Continue typing or deleting
        setTimeout(typeEffect, isDeleting ? 50 : typingSpeed);
    }
}

// Start the typing effect when the page loads
document.addEventListener('DOMContentLoaded', typeEffect);


// ============================================
// 8. SHOW / HIDE TOGGLE BUTTONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Select all buttons that have the class "toggle-info-btn"
    const toggleButtons = document.querySelectorAll('.toggle-info-btn');

    toggleButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // The content to show/hide is the next sibling element
            const content = button.nextElementSibling;

            // Toggle the "hidden-content" visibility
            if (content.style.display === 'block') {
                content.style.display = 'none';
                button.textContent = button.textContent.replace('▲', '▼');
                button.classList.remove('active');
            } else {
                content.style.display = 'block';
                button.textContent = button.textContent.replace('▼', '▲');
                button.classList.add('active');
            }
        });
    });
});


// ============================================
// 9. SLIDESHOW
// ============================================

let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll('.slide');

    // Stop if there are no slides on this page
    if (slides.length === 0) return;

    // Hide all slides
    slides.forEach(function(slide) {
        slide.style.display = 'none';
    });

    // Move to the next slide
    slideIndex++;

    // If we go past the last slide, start again from the first
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // Show the current slide
    slides[slideIndex - 1].style.display = 'block';

    // Change slide every 4 seconds
    setTimeout(showSlides, 4000);
}

// Manual controls
document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            slideIndex -= 2; // Go back one slide
            if (slideIndex < 0) slideIndex = 0;
            showSlides();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            showSlides();
        });
    }

    // Start the automatic slideshow
    showSlides();
});


// ============================================
// 10. SCROLL TO TOP BUTTON
// ============================================

// Create the button dynamically
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.title = 'Go to top';
document.body.appendChild(scrollTopBtn);

// Show or hide the button depending on scroll position
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// When the button is clicked, scroll smoothly to the top
scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});