// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('header nav');
    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        // Close on link click (mobile)
        nav.addEventListener('click', (e) => {
            if (e.target.closest('a')) {
                nav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .cta-button, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only process links that point to an ID on the page
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Header reference
    const header = document.querySelector('header');
    
    // Remove scroll adjustments since header is not sticky anymore
    
    // Form submission
    const registerForm = document.querySelector('.register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const team = this.querySelector('select').value;
            const skills = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !team) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.textContent = 'Assembling...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert(`Thank you, ${name}! You have successfully registered for the Avengers: Endgame Tech Summit as part of ${team.replace('-', ' ')}. We'll send more details to ${email}.`);
                
                // Reset form
                this.reset();
                submitBtn.textContent = 'Assemble';
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Animation for elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-content, .team-card, .timeline-item, .prize-card, .category-prizes, .register-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation with a slight delay to ensure DOM is ready
    setTimeout(() => {
        const elementsToAnimate = document.querySelectorAll('.about-content, .team-card, .timeline-item, .prize-card, .category-prizes, .register-form');
        
        elementsToAnimate.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s ease';
        });
        
        // Run animation on scroll
        window.addEventListener('scroll', animateOnScroll);
        
        // Run once on page load
        animateOnScroll();
    }, 100); // Small delay to ensure DOM is fully processed

    // Touch support: tap to flip cards
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
        document.querySelectorAll('.team-card').forEach(card => {
            const inner = card.querySelector('.card-inner');
            if (!inner) return;
            card.addEventListener('click', () => {
                inner.classList.toggle('is-flipped');
            });
        });
    }

    // Hero inline countdown (13 Sept 2025, 09:00 PM local time)
    (function initHeroCountdown() {
        const countdownEl = document.getElementById('hero-deadline-countdown');
        if (!countdownEl) return;

        const deadline = new Date(2025, 8, 13, 21, 0, 0);

        function formatTime(ms) {
            const totalSeconds = Math.max(0, Math.floor(ms / 1000));
            const days = Math.floor(totalSeconds / 86400);
            const hours = Math.floor((totalSeconds % 86400) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            const parts = [];
            if (days > 0) parts.push(days + 'd');
            parts.push(String(hours).padStart(2, '0') + 'h');
            parts.push(String(minutes).padStart(2, '0') + 'm');
            parts.push(String(seconds).padStart(2, '0') + 's');
            return parts.join(' ');
        }

        function update() {
            const now = new Date();
            const diff = deadline - now;
            if (diff <= 0) {
                countdownEl.textContent = 'Registration closed';
                return true;
            }
            countdownEl.textContent = 'Time left: ' + formatTime(diff);
            return false;
        }

        if (!update()) {
            const timer = setInterval(() => { if (update()) clearInterval(timer); }, 1000);
        }
    })();
});