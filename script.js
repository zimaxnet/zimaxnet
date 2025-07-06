// Zimax Networks Limited - Azure-Native AI Solutions for Enterprise Customers
// Enterprise Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all feature cards and service cards
    document.querySelectorAll('.feature-card, .service-card').forEach(card => {
        observer.observe(card);
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Mobile navigation toggle (for future mobile menu)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Form validation for contact forms (future implementation)
    const contactForms = document.querySelectorAll('form[data-contact]');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const email = form.querySelector('input[type="email"]');
            const message = form.querySelector('textarea');
            
            if (email && !isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                return;
            }
            
            if (message && message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters long');
                return;
            }
            
            // Submit form (placeholder for actual implementation)
            showSuccess(form, 'Thank you! We\'ll get back to you soon.');
        });
    });

    // Analytics tracking for CTA buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            const href = this.getAttribute('href');
            
            // Track button clicks (placeholder for analytics)
            trackEvent('CTA Click', {
                action: action,
                destination: href,
                section: getSectionFromElement(this)
            });
        });
    });

    // Lazy loading for images (future implementation)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Performance monitoring
    window.addEventListener('load', () => {
        // Track page load performance
        const loadTime = performance.now();
        trackEvent('Page Load', {
            loadTime: Math.round(loadTime),
            userAgent: navigator.userAgent
        });
    });
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(element, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.5rem';
    
    // Remove existing error
    const existingError = element.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    element.parentNode.appendChild(errorDiv);
    element.style.borderColor = '#e74c3c';
}

function showSuccess(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.color = '#27ae60';
    successDiv.style.fontSize = '1rem';
    successDiv.style.marginTop = '1rem';
    successDiv.style.textAlign = 'center';
    
    form.appendChild(successDiv);
    
    // Clear form
    form.reset();
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

function getSectionFromElement(element) {
    // Determine which section the element is in
    const sections = ['hero', 'features', 'aimcs', 'services', 'contact'];
    for (const section of sections) {
        if (element.closest(`#${section}`) || element.closest(`.${section}`)) {
            return section;
        }
    }
    return 'unknown';
}

function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    // In production, this would integrate with Google Analytics, Mixpanel, etc.
    console.log('Analytics Event:', eventName, properties);
    
    // Example Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
}

// SEO and performance optimizations
function preloadCriticalResources() {
    // Preload critical CSS and fonts
    const criticalResources = [
        'styles.css',
        'https://fonts.googleapis.com/css2?family=Segoe+UI:wght@400;500;600;700&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'font';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadCriticalResources();

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Accessibility improvements
function improveAccessibility() {
    // Add skip links for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #667eea;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const mainContent = document.querySelector('.hero');
    if (mainContent) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('role', 'main');
    }
}

// Initialize accessibility improvements
improveAccessibility(); 