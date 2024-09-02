
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });


  /**
   * Menu isotope and filter
   */
  window.addEventListener('load', () => {
    let menuContainer = select('.menu-container');
    if (menuContainer) {
      let menuIsotope = new Isotope(menuContainer, {
        itemSelector: '.menu-item',
        layoutMode: 'fitRows'
      });

      let menuFilters = select('#menu-flters li', true);

      on('click', '#menu-flters li', function(e) {
        e.preventDefault();
        menuFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        menuIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

})()


/**
   * Images Slider
   */
new Swiper('.gallery-slider', {
  speed: 400,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    992: {
      slidesPerView: 5,
      spaceBetween: 20
    }
  }
});


//Language

document.addEventListener('DOMContentLoaded', function () {
  let currentLanguage = 'en';

  function updateContent() {
      const navbarEn = document.getElementById('navbar-en');
      const navbarAr = document.getElementById('navbar-ar');
      const homeContentEn = document.getElementById('home-content-en');
      const homeContentAr = document.getElementById('home-content-ar');
      const heroContentEn = document.getElementById('hero-content-en');
      const heroContentAr = document.getElementById('hero-content-ar');
      const aboutContentEn = document.getElementById('about-content-en');
      const aboutContentAr = document.getElementById('about-content-ar');
      const historyContentEn = document.getElementById('history-content-en');
      const historyContentAr = document.getElementById('history-content-ar');
      const galleryContentEn = document.getElementById('gallery-content-en');
      const galleryContentAr = document.getElementById('gallery-content-ar');
      const faqContentEn = document.getElementById('faq-content-en');
      const faqContentAr = document.getElementById('faq-content-ar');
      const contactContentEn = document.getElementById('contact-content-en');
      const contactContentAr = document.getElementById('contact-content-ar');
      const noteContentEn = document.getElementById('note-content-en');
      const noteContentAr = document.getElementById('note-content-ar');
      const footerContentEn = document.getElementById('footer-content-en');
      const footerContentAr = document.getElementById('footer-content-ar');
      const comingSoonContentEn = document.getElementById('comingSoon-content-en');
      const comingSoonContentAr = document.getElementById('comingSoon-content-ar');

      // Toggle visibility based on current language
      const elements = {
          navbarEn,
          navbarAr,
          homeContentEn,
          homeContentAr,
          heroContentEn,
          heroContentAr,
          aboutContentEn,
          aboutContentAr,
          historyContentEn,
          historyContentAr,
          galleryContentEn,
          galleryContentAr,
          faqContentEn,
          faqContentAr,
          contactContentEn,
          contactContentAr,
          footerContentEn,
          footerContentAr,
          noteContentEn,
          noteContentAr,
          comingSoonContentEn,
          comingSoonContentAr
      };

      for (const [key, value] of Object.entries(elements)) {
          if (value) {
              if (key.includes('En')) {
                  value.style.display = currentLanguage === 'en' ? 'block' : 'none';
              } else if (key.includes('Ar')) {
                  value.style.display = currentLanguage === 'ar' ? 'block' : 'none';
              }
          }
      }

      // Update the checkbox state
      const languageToggle = document.getElementById('languageToggle');
      if (languageToggle) {
          languageToggle.checked = currentLanguage === 'ar';
      }
  }

  function toggleLanguage() {
      currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
      localStorage.setItem('lang', currentLanguage);
      updateContent();
  }

  // Get saved language from localStorage
  const savedLanguage = localStorage.getItem('lang');
  if (savedLanguage) {
      currentLanguage = savedLanguage;
  }

  // Set the initial state of the toggle switch
  const languageToggle = document.getElementById('languageToggle');
  if (languageToggle) {
      languageToggle.checked = currentLanguage === 'ar';
      languageToggle.addEventListener('change', toggleLanguage);
  }

  updateContent();

  // Handle mobile nav toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', function () {
          const navbarEn = document.getElementById('navbar-en');
          const navbarAr = document.getElementById('navbar-ar');
          if (currentLanguage === 'en' && navbarEn) {
              navbarEn.classList.toggle('navbar-mobile');
          } else if (currentLanguage === 'ar' && navbarAr) {
              navbarAr.classList.toggle('navbar-mobile');
          }
          this.classList.toggle('bi-x');
      });
  }
});