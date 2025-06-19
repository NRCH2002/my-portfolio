document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            nav.classList.remove('active');
        });
    });
    
    // Initialize Carousel
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function showItem(index) {
        // Hide all items
        carouselItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Show current item
        carouselItems[index].classList.add('active');
        
        // Update button states
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === carouselItems.length - 1;
    }

    function nextItem() {
        if (currentIndex < carouselItems.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop to first item
        }
        showItem(currentIndex);
    }

    function prevItem() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = carouselItems.length - 1; // Loop to last item
        }
        showItem(currentIndex);
    }

    // Initialize
    showItem(currentIndex);

    // Event listeners
    nextBtn.addEventListener('click', nextItem);
    prevBtn.addEventListener('click', prevItem);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') nextItem();
        if (e.key === 'ArrowLeft') prevItem();
    });

    // Auto-rotate (optional)
    let autoRotate = setInterval(nextItem, 5000);

    // Pause on hover
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        carouselTrack.addEventListener('mouseenter', function() {
            clearInterval(autoRotate);
        });

        carouselTrack.addEventListener('mouseleave', function() {
            autoRotate = setInterval(nextItem, 5000);
        });
    }

    // Add this to the existing carousel code in new.js
// Right after the autoRotate interval code

// Touch events for mobile swiping
let touchStartX = 0;
let touchEndX = 0;

if (carouselTrack) {
    carouselTrack.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoRotate);
    }, {passive: true});

    carouselTrack.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        autoRotate = setInterval(nextItem, 5000);
    }, {passive: true});
}

function handleSwipe() {
    const swipeThreshold = 50; // Minimum swipe distance in pixels
    
    if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left - go to next item
        nextItem();
    } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right - go to previous item
        prevItem();
    }
}

// Update the showItem function to work with mobile scrolling
function showItem(index) {
    // Only update for non-mobile or if JS navigation is used
    if (window.innerWidth > 768) {
        carouselItems.forEach(item => {
            item.classList.remove('active');
        });
        carouselItems[index].classList.add('active');
    }
    
    // Always update button states
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === carouselItems.length - 1;
    
    // Scroll to the item on mobile
    if (window.innerWidth <= 768) {
        const carouselTrack = document.querySelector('.carousel-track');
        const item = carouselItems[index];
        const scrollPosition = item.offsetLeft - (carouselTrack.offsetWidth - item.offsetWidth) / 2;
        carouselTrack.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
}
    
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'white';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Initialize EmailJS
    emailjs.init("0KIiKrfrHgnhgVhFu"); // Replace with your EmailJS Public Key

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const sendButton = contactForm.querySelector('button[type="submit"]');
            const formMessage = document.getElementById('form-message');

            sendButton.textContent = 'Sending...';
            sendButton.disabled = true;

            emailjs.sendForm("service_3rkg748", "template_xoexojf", this)
                .then(() => {
                    formMessage.textContent = '✅ Message sent successfully!';
                    formMessage.style.color = 'green';
                    contactForm.reset();
                    sendButton.textContent = 'Send Message';
                    sendButton.disabled = false;

                    // Optional: Clear message after few seconds
                    setTimeout(() => {
                        formMessage.textContent = '';
                    }, 5000);
                }, (error) => {
                    console.error("FAILED...", error);
                    formMessage.textContent = '❌ Failed to send message. Please try again.';
                    formMessage.style.color = 'red';
                    sendButton.textContent = 'Send Message';
                    sendButton.disabled = false;

                    // Optional: Clear message after few seconds
                    setTimeout(() => {
                        formMessage.textContent = '';
                    }, 5000);
                });
        });
    }
});