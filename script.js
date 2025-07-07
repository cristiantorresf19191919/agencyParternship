// script.js
// ——— Importar sólo desde la CDN de Firebase (v9 modular) ———
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// ——— Tu configuración de Firebase (cópiala de la consola, Apps web) ———
const firebaseConfig = {
  apiKey: "AIzaSyAY8bJ3fj_Z3XiFCYhB9-0Np6d6Hsihq88",
  authDomain: "agencyparnertdhip.firebaseapp.com",
  projectId: "agencyparnertdhip",
  storageBucket: "agencyparnertdhip.firebasestorage.app",
  messagingSenderId: "544806440830",
  appId: "1:544806440830:web:f5b2877ce2162dd3dfad2f"
};

// ——— Inicializa Firebase y Firestore ———
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ——— Helper para animaciones y scroll (tu código existente) ———
document.addEventListener('DOMContentLoaded', () => {

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href'))
        .scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Efecto en header
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 50
      ? '0 2px 10px rgba(0,0,0,0.07)'
      : 'none';
  });

  // Scroll animations
  const scrollObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    scrollObserver.observe(el);
  });

  // ——— Envío de formulario ———
  document.getElementById('contact-form').addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.timestamp = new Date();

    // Guarda en Firestore
    try {
      const docRef = await addDoc(collection(db, 'contacts'), data);
      console.log('Documento creado con ID:', docRef.id);
      alert('Gracias por tu mensaje. Te contactaremos pronto.');
      e.target.reset();
    } catch (err) {
      console.error('Error guardando en Firestore:', err);
      alert('Hubo un error al enviar tu mensaje. Intenta de nuevo.');
    }
  });

  // Animate hero title on load
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.classList.add('hero-title-animate');
  }

  // Dark/Light mode toggle (unified logic)
  const btn = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.body.classList.add('dark-mode');
  }
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  });

  // === MouseFollower sticky logic for hero section (with debug) ===
  let mf;
  let stuck = false;

  // Initialize MouseFollower only once!
  if (window.MouseFollower) {
    mf = new MouseFollower({
      container: document.querySelector('.hero'),
      visible: true,
      speed: 0.35,
      ease: 'expo.out',
      skewing: 0.1,
      className: 'mf-cursor',
      innerClassName: 'mf-cursor-inner',
    });
    window.mf = mf;
  }

  const heroSection = document.querySelector('.hero');

  function stickCursorToCorner() {
    if (mf && !stuck) {
      if (typeof mf.setPosition === 'function') {
        mf.setPosition({ x: 40, y: window.innerHeight - 40 });
      }
      if (typeof mf.lock === 'function') {
        mf.lock();
      }
      stuck = true;
    }
  }

  function releaseCursor() {
    if (mf && stuck) {
      if (typeof mf.unlock === 'function') {
        mf.unlock();
      }
      stuck = false;
    }
  }

  if (heroSection && window.MouseFollower) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          stickCursorToCorner();
        } else {
          releaseCursor();
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(heroSection);
  }

  window.addEventListener('resize', () => {
    if (stuck && mf && typeof mf.setPosition === 'function') {
      mf.setPosition({ x: 40, y: window.innerHeight - 40 });
    }
  });
});

// Enhanced JavaScript for improved UI/UX
document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced Scroll Animations with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Add staggered animation for cards
                if (entry.target.classList.contains('pricing-cards-container') || 
                    entry.target.classList.contains('services-cards-container')) {
                    const cards = entry.target.querySelectorAll('.pricing-card, .service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Enhanced Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Add loading states
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"], .cta-button.full-width');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Enviando...';
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                submitBtn.textContent = '¡Enviado!';
                submitBtn.classList.remove('loading');
                submitBtn.style.background = 'var(--teal-gradient)';
                
                // Reset form
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });

        // Enhanced form validation and feedback
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            // Add floating label effect
            if (input.type !== 'submit') {
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.parentElement.classList.remove('focused');
                    }
                });
                
                // Real-time validation
                input.addEventListener('input', function() {
                    validateField(this);
                });
            }
        });
    }

    // Enhanced Accordion with smooth animations
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const trigger = item.querySelector('.accordion-trigger');
        const content = item.querySelector('.accordion-content');
        
        if (trigger && content) {
            trigger.addEventListener('click', function() {
                const isOpen = item.classList.contains('open');
                
                // Close all other items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('open');
                        const otherContent = otherItem.querySelector('.accordion-content');
                        if (otherContent) {
                            otherContent.style.maxHeight = '0';
                        }
                    }
                });
                
                // Toggle current item
                if (isOpen) {
                    item.classList.remove('open');
                    content.style.maxHeight = '0';
                } else {
                    item.classList.add('open');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }
    });

    // Enhanced Navigation with smooth scrolling
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced WhatsApp Button with better interaction
    const whatsappBtn = document.querySelector('.whatsapp-button-container');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Open WhatsApp with pre-filled message
            const message = encodeURIComponent('Hola! Me interesa conocer más sobre sus servicios.');
            const whatsappUrl = `https://wa.me/573001234567?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // Enhanced Card Hover Effects
    const cards = document.querySelectorAll('.pricing-card, .service-card, .contact-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced Button Interactions
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Enhanced Accessibility Features
    // Add keyboard navigation for cards
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        });
    });

    // Enhanced Scroll Progress Indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--cta-gradient);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Enhanced Performance: Lazy loading for images
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

    // Enhanced Error Handling
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // You could send this to an error tracking service
    });

    // Enhanced Mobile Experience
    if ('ontouchstart' in window) {
        // Add touch-specific enhancements
        document.body.classList.add('touch-device');
        
        // Improve touch targets
        const touchTargets = document.querySelectorAll('button, a, .cta-button');
        touchTargets.forEach(target => {
            target.style.minHeight = '44px';
            target.style.minWidth = '44px';
        });
    }
});

// Enhanced Form Validation
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Remove existing error states
    field.classList.remove('error', 'success');
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    let isValid = true;
    let errorMessage = '';
    
    // Validation rules
    if (fieldType === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Por favor ingresa un email válido';
        }
    } else if (fieldType === 'tel') {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (value && !phoneRegex.test(value.replace(/\s/g, ''))) {
            isValid = false;
            errorMessage = 'Por favor ingresa un número de teléfono válido';
        }
    } else if (field.required && !value) {
        isValid = false;
        errorMessage = 'Este campo es requerido';
    }
    
    // Apply validation state
    if (value) {
        if (isValid) {
            field.classList.add('success');
        } else {
            field.classList.add('error');
            showErrorMessage(field, errorMessage);
        }
    }
}

function showErrorMessage(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        animation: fadeIn 0.3s ease;
    `;
    field.parentElement.appendChild(errorDiv);
}

// Enhanced Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Enhanced Analytics (if needed)
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Custom event tracking
    console.log('Event tracked:', eventName, eventData);
}

// Enhanced Performance Monitoring
const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
            console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart);
        }
    }
});

performanceObserver.observe({ entryTypes: ['navigation'] });
