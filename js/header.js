document.addEventListener('DOMContentLoaded', function() {
  // Get page filename to highlight correct nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Define customized header HTML for current page
  const headerHTML = `
    <header class="header sticky-header-wrapper">
      <nav class="nav">
        <a href="index.html" class="logo">
          <i class="fas fa-code"></i> Optimus<strong>Agency</strong>
        </a>
        <ul class="nav-links">
          <li><a href="index.html" ${currentPage === 'index.html' ? 'class="active"' : ''}>Inicio</a></li>
          <li><a href="${currentPage === 'index.html' ? '#servicios' : 'index.html#servicios'}">Servicios</a></li>
          <li><a href="${currentPage === 'cotizacion.html' ? '#detalles' : 'cotizacion.html#detalles'}">Cotización</a></li>
          <li><a href="${currentPage.includes('cotizacion.html') ? '#faq' : 'cotizacion.html#faq'}">FAQ</a></li>
          <li><a href="${currentPage.includes('cotizacion.html') ? '#contacto' : 'cotizacion.html#contacto'}">Contacto</a></li>
          <li><a href="asesorias.html" class="gradient-link" ${currentPage === 'asesorias.html' ? 'style="opacity:0.7;"' : ''}>Asesorías</a></li>
          <li><a href="agentes.html" class="gradient-link" ${currentPage === 'agentes.html' ? 'style="opacity:0.7;"' : ''}>Agentes</a></li>
        </ul>

        <!-- Mobile hamburger menu button -->
        <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Abrir menú móvil">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </nav>
      <div class="header-wave-container">
        <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 150" xmlns="http://www.w3.org/2000/svg">
          <style>
            .path-anim-index {
              animation: path-anim-index 10s linear infinite;
            }

            @keyframes path-anim-index {
              0% {
                d: path("M0,150 C172.4,113.1,344.8,76.1,500,75 C655.2,73.9,793.2,108.5,947,127 C1100.8,145.5,1270.4,147.7,1440,150L1440,151L0,151Z");
              }

              25% {
                d: path("M0,150 C123.3,119.5,246.7,88.9,431,77 C615.3,65.1,860.7,71.7,1039,87 C1217.3,102.3,1328.7,126.1,1440,150L1440,151L0,151Z");
              }

              50% {
                d: path("M0,150 C131.7,168.4,263.5,186.8,432,188 C600.5,189.2,805.9,173.2,980,164 C1154.1,154.8,1297.1,152.4,1440,150L1440,151L0,151Z");
              }

              75% {
                d: path("M0,150 C171.6,149.5,343.2,148.9,500,141 C656.8,133.1,798.8,117.7,953,118 C1107.2,118.3,1273.6,134.1,1440,150L1440,151L0,151Z");
              }

              100% {
                d: path("M0,150 C172.4,113.1,344.8,76.1,500,75 C655.2,73.9,793.2,108.5,947,127 C1100.8,145.5,1270.4,147.7,1440,150L1440,151L0,151Z");
              }
            }
          </style>
          <defs>
            <linearGradient id="wave-gradient-index" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="5%" stop-color="#8e44ad"></stop>
              <stop offset="95%" stop-color="#e91e63"></stop>
            </linearGradient>
          </defs>
          <path
            d="M0,150 C172.4,113.1,344.8,76.1,500,75 C655.2,73.9,793.2,108.5,947,127 C1100.8,145.5,1270.4,147.7,1440,150L1440,151L0,151Z"
            stroke="none" stroke-width="0" fill="url(#wave-gradient-index)" class="path-anim-index"></path>
        </svg>
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu-overlay" id="mobile-menu-overlay">
      <div class="mobile-menu-content">
        <!-- Close button -->
        <button class="mobile-menu-close" id="mobile-menu-close" aria-label="Cerrar menú">
          <i class="fas fa-times"></i>
        </button>

        <!-- Logo section -->
        <div class="mobile-menu-logo">
          <div class="logo-container">
            <i class="fas fa-code" style="font-size: 3.5rem; position: relative; z-index: 1;"></i>
          </div>
        </div>

        <!-- Menu title -->
        <div class="mobile-menu-title">
          <h2>OptimusAgency</h2>
        </div>

        <!-- Navigation items -->
        <nav class="mobile-menu-nav">
          <!-- Inicio -->
          <div class="mobile-menu-nav-item">
            <a href="index.html" class="mobile-menu-nav-link">
              <div class="mobile-menu-nav-content">
                <div class="mobile-menu-nav-icon">
                  <i class="fas fa-home"></i>
                </div>
                <div class="mobile-menu-nav-text">
                  <span class="title">Inicio</span>
                  <span class="description">Página principal</span>
                </div>
              </div>
              <i class="fas fa-chevron-right mobile-menu-nav-arrow"></i>
            </a>
          </div>
          
          <!-- Servicios -->
          <div class="mobile-menu-nav-item">
            <a href="${currentPage === 'index.html' ? '#servicios' : 'index.html#servicios'}" class="mobile-menu-nav-link">
              <div class="mobile-menu-nav-content">
                <div class="mobile-menu-nav-icon">
                  <i class="fas fa-cogs"></i>
                </div>
                <div class="mobile-menu-nav-text">
                  <span class="title">Servicios</span>
                  <span class="description">Nuestras soluciones</span>
                </div>
              </div>
              <i class="fas fa-chevron-right mobile-menu-nav-arrow"></i>
            </a>
          </div>

          <!-- Detalles -->
          <div class="mobile-menu-nav-item">
            <a href="${currentPage === 'cotizacion.html' ? '#detalles' : 'cotizacion.html#detalles'}" class="mobile-menu-nav-link">
              <div class="mobile-menu-nav-content">
                <div class="mobile-menu-nav-icon">
                  <i class="fas fa-list-alt"></i>
                </div>
                <div class="mobile-menu-nav-text">
                  <span class="title">Cotización</span>
                  <span class="description">Detalles del proyecto</span>
                </div>
              </div>
              <i class="fas fa-chevron-right mobile-menu-nav-arrow"></i>
            </a>
          </div>

          <!-- FAQ -->
          <div class="mobile-menu-nav-item">
            <a href="${currentPage === 'cotizacion.html' ? '#faq' : 'cotizacion.html#faq'}" class="mobile-menu-nav-link">
              <div class="mobile-menu-nav-content">
                <div class="mobile-menu-nav-icon">
                  <i class="fas fa-question-circle"></i>
                </div>
                <div class="mobile-menu-nav-text">
                  <span class="title">FAQ</span>
                  <span class="description">Preguntas frecuentes</span>
                </div>
              </div>
              <i class="fas fa-chevron-right mobile-menu-nav-arrow"></i>
            </a>
          </div>

          <!-- Contacto -->
          <div class="mobile-menu-nav-item">
            <a href="${currentPage === 'cotizacion.html' ? '#contacto' : 'cotizacion.html#contacto'}" class="mobile-menu-nav-link">
              <div class="mobile-menu-nav-content">
                <div class="mobile-menu-nav-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="mobile-menu-nav-text">
                  <span class="title">Contacto</span>
                  <span class="description">Ponte en contacto</span>
                </div>
              </div>
              <i class="fas fa-chevron-right mobile-menu-nav-arrow"></i>
            </a>
          </div>

          <!-- Asesorías -->
          <div class="mobile-menu-nav-item">
            <a href="asesorias.html" class="mobile-menu-nav-link">
              <div class="mobile-menu-nav-content">
                <div class="mobile-menu-nav-icon">
                  <i class="fas fa-chalkboard-teacher"></i>
                </div>
                <div class="mobile-menu-nav-text">
                  <span class="title">Asesorías</span>
                  <span class="description">Consultoría especializada</span>
                </div>
              </div>
              <i class="fas fa-chevron-right mobile-menu-nav-arrow"></i>
            </a>
          </div>

          <!-- Agentes -->
          <div class="mobile-menu-nav-item">
            <a href="agentes.html" class="mobile-menu-nav-link">
              <div class="mobile-menu-nav-content">
                <div class="mobile-menu-nav-icon">
                  <i class="fas fa-user-tie"></i>
                </div>
                <div class="mobile-menu-nav-text">
                  <span class="title">Agentes</span>
                  <span class="description">Profesionales cualificados</span>
                </div>
              </div>
              <i class="fas fa-chevron-right mobile-menu-nav-arrow"></i>
            </a>
          </div>

          <!-- Theme switcher if it exists -->
          <div class="mobile-menu-theme-switcher" id="mobile-menu-theme-container">
          </div>
        </nav>
      </div>
    </div>
  `;

  // Find the element where to inject the header (usually at the beginning of body)
  const headerContainer = document.getElementById('header-container');
  if (headerContainer) {
    headerContainer.innerHTML = headerHTML;
  } else {
    // If no container exists, insert at the beginning of the body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }

  // Add event listeners for mobile menu
  setTimeout(() => {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuNavLinks = document.querySelectorAll('.mobile-menu-nav-link');
    
    // Ensure mobile menu overlay is hidden by default
    if (mobileMenuOverlay) {
      mobileMenuOverlay.style.display = 'none';
      mobileMenuOverlay.classList.remove('active');
    }

    // Function to open mobile menu with animation
    function openMobileMenu(e) {
      e.stopPropagation();
      
      // Get toggle button position for animation origin
      const rect = mobileMenuToggle.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;
      
      // Set display and animation origin
      mobileMenuOverlay.style.display = 'flex';
      mobileMenuOverlay.style.clipPath = `circle(0px at ${originX}px ${originY}px)`;
      
      // Trigger animation after a small delay
      setTimeout(() => {
        mobileMenuOverlay.style.clipPath = `circle(150% at ${originX}px ${originY}px)`;
        mobileMenuOverlay.classList.add('active');
        mobileMenuToggle.classList.add('active');
      }, 10);
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    // Function to close mobile menu
    function closeMobileMenu() {
      const rect = mobileMenuToggle.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;

      // Reverse the animation
      mobileMenuOverlay.style.clipPath = `circle(0px at ${originX}px ${originY}px)`;
      mobileMenuOverlay.classList.remove('active');
      mobileMenuToggle.classList.remove('active');

      // Hide overlay after animation
      setTimeout(() => {
        mobileMenuOverlay.style.display = 'none';
        document.body.style.overflow = '';
      }, 600);
    }

    // Event listeners
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking on nav links
    mobileMenuNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close menu when clicking outside
    mobileMenuOverlay.addEventListener('click', (e) => {
      if (e.target === mobileMenuOverlay) {
        closeMobileMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }, 100);
});
