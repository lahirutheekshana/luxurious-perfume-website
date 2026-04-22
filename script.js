/**
 * Aura Aromatics - Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navigation Background on Scroll
    const header = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // trigger once on load in case we start halfway down
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    // 2. Intersection Observer for Fade-In Animations
    const faders = document.querySelectorAll('.fade-in, .fade-in-up');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 3. Smooth Scrolling for anchor links (fallback for CSS scroll-behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Cart interaction mock
    const addButtons = document.querySelectorAll('.add-to-cart');
    const cartCountEl = document.querySelector('.cart-count');
    let cartCount = 0;

    addButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            cartCount++;
            cartCountEl.textContent = cartCount;
            
            // Visual feedback on button
            const originalText = button.textContent;
            button.textContent = "Added!";
            button.style.backgroundColor = "#5cb85c";
            button.style.color = "white";
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = ""; // Reset to CSS rules
                button.style.color = "";
            }, 1500);
        });
    });
});
