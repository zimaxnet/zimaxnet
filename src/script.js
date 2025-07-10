// Zimax Networks Limited - Azure-Native AI Solutions for Enterprise Customers
// Enterprise Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhanced hero functionality
    initializeHeroSection();
    
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

    // Flyout navigation logic
  const flyoutBtn = document.querySelector('.flyout-menu-btn');
  const flyoutNav = document.getElementById('flyoutNav');
  const flyoutClose = document.querySelector('.flyout-close-btn');
  const flyoutOverlay = document.getElementById('flyoutOverlay');

  function openFlyout() {
    flyoutNav.classList.add('open');
    flyoutOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeFlyout() {
    flyoutNav.classList.remove('open');
    flyoutOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (flyoutBtn && flyoutNav && flyoutOverlay) {
    flyoutBtn.addEventListener('click', openFlyout);
    flyoutClose.addEventListener('click', closeFlyout);
    flyoutOverlay.addEventListener('click', closeFlyout);
    // Optional: close on ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeFlyout();
    });
  }

    // Multi-Step Contact Form Logic
    initializeMultiStepContactForm();
    
        // Mobile Experience Enhancements
    initializeMobileOptimizations();
    
    // Insights & Resources: Newsletter Signup
    initializeNewsletterSignup();
    
    // Advanced Analytics & Tracking
    initializeAnalyticsTracking();

    // Cookie Consent Management
    initializeCookieConsent();
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

// Enhanced Analytics Tracking for Zimax Networks
function trackEvent(eventName, properties = {}) {
    // Only track if analytics is enabled
    if (!window.analyticsEnabled) {
        return;
    }
    
    // Send to Google Analytics 4
    if (window.gtag) {
        window.gtag('event', eventName, {
            event_category: 'engagement',
            event_label: properties.label || '',
            value: properties.value || 0,
            custom_parameter_1: properties.userType || 'enterprise',
            custom_parameter_2: properties.serviceInterest || 'general',
            ...properties
        });
    }
    
    // Console log for development (remove in production)
    console.log('Event tracked:', eventName, properties);
}

// Enhanced Analytics Tracking Implementation
function initializeAnalyticsTracking() {
    // Track page views with enhanced data
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href,
        user_agent: navigator.userAgent
    });
    
    // Track CTA button clicks
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            const href = this.getAttribute('href');
            const section = getSectionFromElement(this);
            
            trackEvent('cta_click', {
                action: action,
                destination: href,
                section: section,
                button_type: this.classList.contains('btn-primary') ? 'primary' : 'secondary'
            });
        });
    });
    
    // Track form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const formType = this.id || 'contact_form';
            const formData = new FormData(this);
            
            trackEvent('form_submit', {
                form_type: formType,
                has_email: formData.has('email') || formData.has('newsletter-email'),
                has_service: formData.has('service'),
                form_fields: Array.from(formData.keys()).join(',')
            });
        });
    });
    
    // Track product card interactions
    document.querySelectorAll('.product-card').forEach(card => {
        const productName = card.querySelector('h3, h4')?.textContent || 'Unknown Product';
        
        // Track card views (when card comes into view)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    trackEvent('product_view', {
                        product: productName,
                        section: getSectionFromElement(card)
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(card);
        
        // Track card clicks
        card.addEventListener('click', function() {
            trackEvent('product_click', {
                product: productName,
                section: getSectionFromElement(card)
            });
        });
    });
    
    // Track testimonial interactions
    document.querySelectorAll('.testimonial-card').forEach((testimonial, index) => {
        testimonial.addEventListener('click', function() {
            const author = this.querySelector('.author-info h4')?.textContent || 'Unknown';
            trackEvent('testimonial_click', {
                testimonial_index: index,
                author: author,
                company: this.querySelector('.company-logo span')?.textContent || 'Unknown'
            });
        });
    });
    
    // Track newsletter signup
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            const email = this.querySelector('input[type="email"]').value;
            trackEvent('newsletter_signup', {
                email_domain: email.split('@')[1] || 'unknown',
                has_consent: true
            });
        });
    }
    
    // Track resource downloads
    document.querySelectorAll('.resource-link').forEach(link => {
        link.addEventListener('click', function() {
            const resource = this.textContent.trim();
            trackEvent('resource_download', {
                resource_type: resource,
                resource_name: resource
            });
        });
    });
    
    // Track video interactions
    document.querySelectorAll('.video-thumbnail a').forEach(video => {
        video.addEventListener('click', function() {
            const videoTitle = this.getAttribute('aria-label') || 'Unknown Video';
            trackEvent('video_play', {
                video_title: videoTitle,
                video_source: 'youtube'
            });
        });
    });
    
    // Track webinar registration
    document.querySelectorAll('a[href*="webinar"], .webinar-cta .btn').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('webinar_registration', {
                webinar_title: 'Enterprise AI on Azure: Best Practices & Case Studies',
                registration_source: getSectionFromElement(this)
            });
        });
    });
    
    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScrollDepth) {
            maxScrollDepth = scrollPercent;
            
            // Track at 25%, 50%, 75%, 100%
            if (maxScrollDepth >= 25 && maxScrollDepth < 50) {
                trackEvent('scroll_depth', { depth: '25%' });
            } else if (maxScrollDepth >= 50 && maxScrollDepth < 75) {
                trackEvent('scroll_depth', { depth: '50%' });
            } else if (maxScrollDepth >= 75 && maxScrollDepth < 100) {
                trackEvent('scroll_depth', { depth: '75%' });
            } else if (maxScrollDepth >= 100) {
                trackEvent('scroll_depth', { depth: '100%' });
            }
        }
    });
    
    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        trackEvent('time_on_page', {
            seconds: timeOnPage,
            minutes: Math.round(timeOnPage / 60)
        });
    });
    
    // Track user engagement (clicks, form interactions, etc.)
    let engagementScore = 0;
    document.addEventListener('click', function() {
        engagementScore += 1;
        if (engagementScore % 5 === 0) { // Track every 5 interactions
            trackEvent('user_engagement', {
                engagement_score: engagementScore,
                interaction_type: 'click'
            });
        }
    });
}

// Enhanced section detection
function getSectionFromElement(element) {
    const section = element.closest('section');
    if (section) {
        return section.id || section.className.split(' ')[0] || 'unknown';
    }
    return 'unknown';
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

// Enhanced Hero Section Functionality
function initializeHeroSection() {
    // Animated metrics counter
    const metricNumbers = document.querySelectorAll('.metric-number');
    
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    };
    
    // Start counter animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    metricNumbers.forEach(metric => {
                        const target = parseInt(metric.getAttribute('data-target'));
                        animateCounter(metric, target);
                    });
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroSection);
    }
    
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Demo message typing animation
    const demoMessages = document.querySelectorAll('.demo-message');
    demoMessages.forEach((message, index) => {
        const text = message.querySelector('.message-text');
        const originalText = text.textContent;
        text.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typeWriter = () => {
                if (i < originalText.length) {
                    text.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            typeWriter();
        }, 1000 + (index * 2000));
    });
    
    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('#portfolio');
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Hide scroll indicator when scrolled down
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const particles = document.querySelector('.particles');
        if (particles) {
            particles.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add loading animation for hero content
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 + (index * 200));
    });
    
    // Initialize testimonials carousel
    initializeTestimonialsCarousel();
    
    // Initialize interactive product cards
    initializeProductCards();
}

// Testimonials Carousel Functionality
function initializeTestimonialsCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;
    
    const cards = carousel.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-nav.prev');
    const nextBtn = document.querySelector('.testimonial-nav.next');
    
    let currentSlide = 0;
    const totalSlides = cards.length;
    
    function showSlide(index) {
        // Hide all cards
        cards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current card and activate corresponding dot
        if (cards[index]) {
            cards[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        // Update navigation buttons
        if (prevBtn) prevBtn.disabled = index === 0;
        if (nextBtn) nextBtn.disabled = index === totalSlides - 1;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-advance carousel
    setInterval(nextSlide, 5000);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
}

// Interactive Product Cards Functionality
function initializeProductCards() {
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter cards
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.classList.add('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                }
            });
        });
    });
    
    // Card expansion functionality
    window.toggleCardDetails = function(button) {
        const card = button.closest('.product-card');
        const details = card.querySelector('.card-details');
        const isExpanded = details.classList.contains('expanded');
        
        if (isExpanded) {
            details.classList.remove('expanded');
            button.textContent = 'Learn More';
        } else {
            details.classList.add('expanded');
            button.textContent = 'Show Less';
        }
    };
    
    // Add hover effects for cards
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click tracking for analytics
    productCards.forEach(card => {
        const links = card.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                const productName = card.querySelector('h3').textContent;
                trackEvent('Product Click', {
                    product: productName,
                    action: this.textContent.trim(),
                    destination: this.href
                });
            });
        });
    });
} 

// Multi-Step Contact Form Logic
function initializeMultiStepContactForm(formSelector = '#enterprise-contact-form') {
    const form = document.querySelector(formSelector);
    if (!form) return;

    const steps = form.querySelectorAll('.form-step');
    let currentStep = 0;

    function showStep(index) {
        steps.forEach((step, i) => {
            step.classList.toggle('active', i === index);
        });
        currentStep = index;
    }

    function validateStep(index) {
        const step = steps[index];
        let valid = true;
        const requiredFields = step.querySelectorAll('input[required], select[required], textarea[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showError(field, 'This field is required');
                valid = false;
            } else {
                clearError(field);
            }
        });
        return valid;
    }

    function showError(element, message) {
        let error = element.parentNode.querySelector('.error-message');
        if (!error) {
            error = document.createElement('div');
            error.className = 'error-message';
            element.parentNode.appendChild(error);
        }
        error.textContent = message;
        element.classList.add('error');
    }
    function clearError(element) {
        const error = element.parentNode.querySelector('.error-message');
        if (error) error.remove();
        element.classList.remove('error');
    }

    // Next Step
    form.querySelectorAll('.next-step').forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                showStep(currentStep + 1);
            }
        });
    });
    // Previous Step
    form.querySelectorAll('.prev-step').forEach(btn => {
        btn.addEventListener('click', () => {
            showStep(currentStep - 1);
        });
    });
    // Form Submit
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validateStep(currentStep)) return;
        // Simulate async submission
        setTimeout(() => {
            steps.forEach(step => step.classList.remove('active'));
            const successStep = form.querySelector('.form-success');
            if (successStep) {
                successStep.style.display = 'block';
                successStep.classList.add('active');
            }
            form.reset();
        }, 600);
    });
    // Remove error on input
    form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', () => clearError(field));
    });
    // Show first step
    showStep(0);
}

// Mobile Experience Optimization Function
function initializeMobileOptimizations() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    if (!isMobile) return;

    // Mobile-specific touch optimizations
    initializeMobileTouchOptimizations();
    
    // Mobile performance optimizations
    initializeMobilePerformanceOptimizations();
    
    // Mobile accessibility enhancements
    initializeMobileAccessibility();
    
    // Mobile gesture support
    initializeMobileGestures();
}

function initializeMobileTouchOptimizations() {
    // Enhanced touch feedback for buttons
    const touchButtons = document.querySelectorAll('.btn, .filter-btn, .testimonial-nav, .card-actions .btn');
    
    touchButtons.forEach(button => {
        // Add touch feedback
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Prevent double-tap zoom on buttons
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
        }, { passive: false });
    });
    
    // Optimize scroll performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                // Update scroll-based animations
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

function initializeMobilePerformanceOptimizations() {
    // Lazy load images on mobile
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
    }, { rootMargin: '50px' });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Reduce animation complexity on mobile
    if (window.innerWidth <= 768) {
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }
    
    // Optimize carousel performance
    const carousels = document.querySelectorAll('.testimonials-carousel');
    carousels.forEach(carousel => {
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    const nextBtn = carousel.querySelector('.testimonial-nav[data-direction="next"]');
                    if (nextBtn) nextBtn.click();
                } else {
                    // Swipe right - previous slide
                    const prevBtn = carousel.querySelector('.testimonial-nav[data-direction="prev"]');
                    if (prevBtn) prevBtn.click();
                }
            }
        }
    });
}

function initializeMobileAccessibility() {
    // Enhance focus management for mobile
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            // Ensure element is visible when focused
            this.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
    
    // Improve screen reader support
    const interactiveElements = document.querySelectorAll('.btn, .filter-btn, .product-card');
    
    interactiveElements.forEach(element => {
        if (!element.getAttribute('aria-label')) {
            const text = element.textContent.trim();
            if (text) {
                element.setAttribute('aria-label', text);
            }
        }
    });
    
    // Add skip links for mobile
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
        z-index: 1000;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

function initializeMobileGestures() {
    // Add pull-to-refresh prevention for better UX
    let startY = 0;
    let currentY = 0;
    let isScrolling = false;
    
    document.addEventListener('touchstart', function(e) {
        startY = e.touches[0].pageY;
        isScrolling = false;
    }, { passive: true });
    
    document.addEventListener('touchmove', function(e) {
        currentY = e.touches[0].pageY;
        const diff = currentY - startY;
        
        // Prevent pull-to-refresh on mobile
        if (diff > 0 && window.scrollY === 0) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Add long press detection for context menus
    let pressTimer;
    const longPressThreshold = 500;
    
    document.addEventListener('touchstart', function(e) {
        pressTimer = setTimeout(() => {
            // Long press detected - could trigger context menu
            console.log('Long press detected');
        }, longPressThreshold);
    }, { passive: true });
    
    document.addEventListener('touchend', function() {
        clearTimeout(pressTimer);
    }, { passive: true });
    
    // Add double tap to zoom prevention
    let lastTap = 0;
    document.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 500 && tapLength > 0) {
            // Double tap detected
            e.preventDefault();
        }
        lastTap = currentTime;
    }, { passive: false });
} 

// Newsletter Signup Handler
function initializeNewsletterSignup() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        // Remove previous messages
        form.querySelectorAll('.error-message, .success-message').forEach(el => el.remove());
        if (!isValidEmail(email)) {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = 'Please enter a valid email address.';
            error.style.color = '#e74c3c';
            error.style.fontSize = '0.95rem';
            error.style.marginTop = '0.5rem';
            form.appendChild(error);
            emailInput.focus();
            return;
        }
        // Simulate async subscribe
        setTimeout(() => {
            const success = document.createElement('div');
            success.className = 'success-message';
            success.textContent = 'Thank you for subscribing!';
            success.style.color = '#27ae60';
            success.style.fontSize = '1rem';
            success.style.marginTop = '0.5rem';
            form.appendChild(success);
            form.reset();
            setTimeout(() => success.remove(), 5000);
        }, 600);
    });
} 

// Cookie Consent Management
function initializeCookieConsent() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');
    
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    
    if (!consent && cookieBanner) {
        // Show banner after a short delay
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }
    
    // Handle accept
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookie-consent', 'accepted');
            localStorage.setItem('analytics-enabled', 'true');
            cookieBanner.classList.remove('show');
            
            // Enable analytics tracking
            window.analyticsEnabled = true;
            
            // Track consent event
            trackEvent('cookie_consent', {
                action: 'accepted',
                consent_type: 'analytics'
            });
        });
    }
    
    // Handle reject
    if (rejectBtn) {
        rejectBtn.addEventListener('click', function() {
            localStorage.setItem('cookie-consent', 'rejected');
            localStorage.setItem('analytics-enabled', 'false');
            cookieBanner.classList.remove('show');
            
            // Disable analytics tracking
            window.analyticsEnabled = false;
            
            // Track consent event
            trackEvent('cookie_consent', {
                action: 'rejected',
                consent_type: 'analytics'
            });
        });
    }
    
    // Set analytics enabled based on stored preference
    window.analyticsEnabled = localStorage.getItem('analytics-enabled') !== 'false';
} 