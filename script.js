// ============================================
// Mobile Navigation Toggle
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// Smooth Scrolling
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Navbar Scroll Effect
// ============================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide cursor follower when scrolling
    if (cursorFollower) {
        cursorFollower.style.opacity = '0';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Active Navigation Link on Scroll
// ============================================

const sections = document.querySelectorAll('.section, .hero');
const navLinksArray = Array.from(navLinks);

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Scroll Animations
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation with stagger
const animateElements = document.querySelectorAll(
    '.service-card, .gallery-item, .testimonial-card, .publication-item, .qual-item'
);

animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
});

// ============================================
// Contact Form Handling
// ============================================

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    console.log('Form submitted:', formData);
    
    // Show success message
    showNotification('Thank you! Your message has been sent successfully.', 'success');
    
    // Reset form
    contactForm.reset();
});

// ============================================
// Notification System
// ============================================

function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#e74c3c'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        border: 1px solid rgba(16, 185, 129, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Gallery Image Click Handler (for future lightbox)
// ============================================

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Future: Implement lightbox functionality
        console.log('Gallery item clicked');
    });
});

// ============================================
// Lazy Loading for Images (when real images are added)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Mouse Position Tracking & 3D Effects
// ============================================

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update CSS variables for mouse position
    document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);
    
    // Apply 3D tilt effect to cards on hover
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .gallery-item, .publication-item');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;
        
        const deltaX = mouseX - cardX;
        const deltaY = mouseY - cardY;
        
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = 300;
        
        if (distance < maxDistance) {
            const rotateX = (deltaY / maxDistance) * 10;
            const rotateY = (deltaX / maxDistance) * -10;
            const scale = 1 + (1 - distance / maxDistance) * 0.05;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        } else {
            card.style.transform = '';
        }
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroRect = hero.getBoundingClientRect();
        if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
            const heroCenterY = heroRect.top + heroRect.height / 2;
            const parallaxY = (mouseY - heroCenterY) / 20;
            const heroImage = hero.querySelector('.hero-image');
            if (heroImage) {
                heroImage.style.transform = `translateY(${parallaxY}px)`;
            }
        }
    }
    
    // Cursor follower effect
    updateCursorFollower();
});

// Cursor follower element
let cursorFollower = null;
let cursorFollowerTimeout = null;

function createCursorFollower() {
    cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    cursorFollower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 201, 201, 0.3), rgba(255, 107, 107, 0.2));
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease, opacity 0.3s ease;
        mix-blend-mode: difference;
        opacity: 0;
    `;
    document.body.appendChild(cursorFollower);
}

function updateCursorFollower() {
    if (!cursorFollower) {
        createCursorFollower();
    }
    
    // Show cursor follower
    cursorFollower.style.opacity = '1';
    cursorFollower.style.left = `${mouseX - 10}px`;
    cursorFollower.style.top = `${mouseY - 10}px`;
    
    // Clear existing timeout
    if (cursorFollowerTimeout) {
        clearTimeout(cursorFollowerTimeout);
    }
    
    // Hide cursor follower after mouse stops moving
    cursorFollowerTimeout = setTimeout(() => {
        if (cursorFollower) {
            cursorFollower.style.opacity = '0';
        }
    }, 1000);
}

// Enhanced hover effects for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .service-card, .gallery-item, .testimonial-card');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Magnetic effect for buttons
const buttons = document.querySelectorAll('.btn-primary');

buttons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', function() {
        button.style.transform = '';
    });
});

// Floating animation for service images
const serviceImages = document.querySelectorAll('.service-image');

serviceImages.forEach((img, index) => {
    img.style.animation = `float 3s ease-in-out infinite`;
    img.style.animationDelay = `${index * 0.2}s`;
});

// Add floating animation keyframes
const floatStyle = document.createElement('style');
floatStyle.textContent += `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(floatStyle);

// Stagger animation for cards
function animateCards() {
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .gallery-item');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
}

// Text reveal animation
function revealText() {
    const texts = document.querySelectorAll('.section-title, .hero-title, .hero-subtitle');
    texts.forEach((text, index) => {
        text.style.opacity = '0';
        text.style.transform = 'translateY(20px)';
        text.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// ============================================
// Load More Publications
// ============================================

const loadMoreBtn = document.getElementById('load-more-btn');
const hiddenPublications = document.querySelectorAll('.publication-item.publication-hidden');
let visibleCount = 0;
const itemsPerLoad = 6;

function showMorePublications() {
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', () => {
        loadMoreBtn.classList.add('loading');
        
        // Show next batch of publications
        const publicationsToShow = Array.from(hiddenPublications).slice(
            visibleCount,
            visibleCount + itemsPerLoad
        );
        
        if (publicationsToShow.length === 0) {
            loadMoreBtn.style.display = 'none';
            return;
        }
        
        publicationsToShow.forEach((pub, index) => {
            setTimeout(() => {
                pub.classList.add('show');
            }, index * 100);
        });
        
        visibleCount += publicationsToShow.length;
        
        // Hide button if all publications are shown
        setTimeout(() => {
            loadMoreBtn.classList.remove('loading');
            if (visibleCount >= hiddenPublications.length) {
                loadMoreBtn.style.display = 'none';
            }
        }, publicationsToShow.length * 100 + 300);
    });
}

// ============================================
// Initialize on DOM Load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Set initial active nav link
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
    
    // Add fade-in to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }
    
    // Initialize animations
    animateCards();
    revealText();
    
    // Create cursor follower
    createCursorFollower();
    
    // Initialize load more publications
    showMorePublications();
    
    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.qual-item, .publication-item').forEach(el => {
        animationObserver.observe(el);
    });
});

