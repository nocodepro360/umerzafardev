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
    document.querySelector('.download-btn')?.addEventListener('click', function(e) {
        this.classList.add('loading');
        setTimeout(() => {
            this.classList.remove('loading');
        }, 3000); // Remove loading state after 3 seconds
    });

    /* ==========================
       ✅ Fixed Counter Animation
       ========================== */
    function animateStatsOnce(containerSelector = '.about-stats', duration = 2000) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const stats = container.querySelectorAll('.stat-number');
        if (!stats.length) return;

        const animateSingle = (stat) => {
            const rawTarget = stat.getAttribute('data-target') ?? '0';
            const target = parseFloat(rawTarget);
            if (isNaN(target)) return;

            const decimals = (String(rawTarget).includes('.')) ? String(rawTarget).split('.')[1].length : 0;
            const start = performance.now();

            const step = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                const current = target * ease;

                stat.textContent = (decimals > 0)
                    ? current.toFixed(decimals)
                    : Math.floor(current);

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    stat.textContent = (decimals > 0)
                        ? target.toFixed(decimals)
                        : String(Math.floor(target));
                }
            };

            requestAnimationFrame(step);
        };

        stats.forEach(stat => animateSingle(stat));
    }

    // Trigger counter when stats section is visible
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStatsOnce('.about-stats', 2000);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    } else {
        // Fallback if section not found
        animateStatsOnce('.about-stats', 2000);
    }

});
