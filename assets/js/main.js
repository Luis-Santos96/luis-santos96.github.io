/* ========================================
   Luis Ricardo — Data Engineer Portfolio
   main.js — v4: typing + back to top
   ======================================== */

// --- Theme ---
function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

setTheme(getPreferredTheme());

window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'light' : 'dark');
  }
});

document.addEventListener('DOMContentLoaded', () => {

  // --- Theme toggle ---
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // --- Typing animation ---
  const typingEl = document.getElementById('typing-text');
  const cursorEl = document.getElementById('cursor');
  if (typingEl) {
    const words = ['Data Engineer', 'Pipeline Builder', 'Lakehouse Architect', 'Delta Lake Specialist', 'Data Platform Engineer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseAfterWord = false;

    function type() {
      const currentWord = words[wordIndex];

      if (pauseAfterWord) {
        pauseAfterWord = false;
        isDeleting = true;
        setTimeout(type, 1500);
        return;
      }

      if (!isDeleting) {
        typingEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
          pauseAfterWord = true;
          setTimeout(type, 0);
          return;
        }
        setTimeout(type, 80);
      } else {
        typingEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, 400);
          return;
        }
        setTimeout(type, 40);
      }
    }

    // Start typing after hero fade-in
    setTimeout(type, 800);
  }

  // --- Back to top ---
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Scroll animations ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.exp-card, .skill-card, .project-card, .roadmap-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, background 0.3s, border-color 0.3s';
    observer.observe(el);
  });
});
