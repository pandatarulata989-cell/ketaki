// ==========================================================================
// KETAKI INTERIORS - INTERACTIVE SCRIPT
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Sticky Effect on Scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuToggle.classList.toggle('open');
    });

    // Close menu on clicking link or consultation button
    document.querySelectorAll('.nav-link, .btn-mobile-consult').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('open');
      });
    });
  }

  // 3. Number Counter Animation for Statistics
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      let count = 0;
      const stepTime = Math.max(20, Math.floor(1200 / target));
      
      const timer = setInterval(() => {
        count += 1;
        stat.textContent = count;
        if (count >= target) {
          stat.textContent = target;
          clearInterval(timer);
        }
      }, stepTime);
    });
  };

  const statsSection = document.querySelector('.about-stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          animateCounters();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  // 4. Modal Dialog Functionality (Get Quote & Get Design)
  const quoteModal = document.getElementById('quoteModal');
  const modalClose = document.getElementById('modalClose');
  const openQuoteBtns = document.querySelectorAll('.open-quote-btn');
  const quoteForm = document.getElementById('quoteForm');
  const formSuccess = document.getElementById('formSuccess');

  const openModal = (e) => {
    if (e) e.preventDefault();
    if (quoteModal) quoteModal.classList.add('active');
  };

  const closeModal = () => {
    if (quoteModal) quoteModal.classList.remove('active');
  };

  openQuoteBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) closeModal();
    });
  }

  // ESC key closes modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeLightbox();
    }
  });

  // Handle Form Submission
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = quoteForm.querySelector('.btn-submit');
      submitBtn.textContent = 'SUBMITTING...';
      submitBtn.disabled = true;

      setTimeout(() => {
        quoteForm.reset();
        submitBtn.textContent = 'SUBMIT DESIGN REQUEST';
        submitBtn.disabled = false;
        if (formSuccess) formSuccess.style.display = 'block';

        setTimeout(() => {
          closeModal();
          if (formSuccess) formSuccess.style.display = 'none';
        }, 3000);
      }, 700);
    });
  }

  // 5. Portfolio Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 6. Lightbox for Gallery
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  const closeLightbox = () => {
    if (lightbox) lightbox.classList.remove('active');
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h4') ? item.querySelector('h4').textContent : '';
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        if (lightboxCaption) lightboxCaption.textContent = title;
        lightbox.classList.add('active');
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // 7. Newsletter Subscription Handler
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const email = input ? input.value : '';
      if (email) {
        alert('Thank you for connecting with Ketaki Interiors! We will keep you updated.');
        if (input) input.value = '';
      }
    });
  }

  // 8. Process Strip Row Interactive Hover
  const processRows = document.querySelectorAll('.process-strip-row');
  processRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      processRows.forEach(r => r.classList.remove('active-dark-row'));
      row.classList.add('active-dark-row');
    });
  });

  // 9. Card Lightbox Expansion
  const interactiveCards = document.querySelectorAll('.triplet-card, .solution-card, .bento-img-card');
  interactiveCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const titleElem = card.querySelector('h3, h4');
      const title = titleElem ? titleElem.textContent : 'Ketaki Interiors';
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        if (lightboxCaption) lightboxCaption.textContent = title;
        lightbox.classList.add('active');
      }
    });
  });

  // 10. Scroll Reveal Observer for page animations
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }
});
