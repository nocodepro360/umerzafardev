document.addEventListener('DOMContentLoaded', function() {
    // Navbar Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu after clicking
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Animation on scroll
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }

    function handleAnimations() {
        const elements = document.querySelectorAll('.animate-from-left, .animate-from-right, .animate-from-bottom');
        elements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('animate-active');
            }
        });
    }

    // Initial animation check
    handleAnimations();
    
    // Scroll event listener
    window.addEventListener('scroll', handleAnimations);

    // Optional: Add loading state
    document.querySelector('.download-btn').addEventListener('click', function(e) {
        this.classList.add('loading');
        setTimeout(() => {
            this.classList.remove('loading');
        }, 3000); // Remove loading state after 3 seconds
    });

    // Stats counter animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps

            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    stat.textContent = Math.floor(count);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };

            updateCount();
        });
    }

    // Run animation when the about section is in view
    const aboutSection = document.querySelector('#about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(aboutSection);

    // Animation setup
    function setupAnimations() {
        const observerOptions = {
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-active');
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        const elements = document.querySelectorAll('.animate-from-left, .animate-from-right, .animate-from-bottom');
        elements.forEach(element => {
            observer.observe(element);
        });
    }

    // Call setup function when DOM is loaded
    setupAnimations();
});