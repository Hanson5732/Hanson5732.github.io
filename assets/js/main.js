/**
 * Hanqi Huang (黄瀚祺) - Personal Website JavaScript
 */

(function () {
  'use strict';

  // 1. Theme Management (Light / Dark)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function getSavedTheme() {
    return localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    const iconSpan = document.getElementById('theme-icon');
    if (!iconSpan) return;
    if (theme === 'dark') {
      // Show sun icon when in dark mode to switch back to light
      iconSpan.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    } else {
      // Show moon icon when in light mode
      iconSpan.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
  }

  // Initialize Theme immediately
  const initialTheme = getSavedTheme();
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
      }
    });
  }

  // 3. Highlight Active Navigation
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-link a');
  navItems.forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.parentElement.classList.add('active');
    }
  });

  // 4. BibTeX Copy to Clipboard
  window.copyBibtex = function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    const text = el.innerText.trim();
    navigator.clipboard.writeText(text).then(() => {
      const btn = event.target;
      const original = btn.innerText;
      btn.innerText = 'Copied!';
      btn.style.color = 'var(--primary)';
      setTimeout(() => {
        btn.innerText = original;
        btn.style.color = '';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy BibTeX: ', err);
    });
  };

  // 5. Project Filter Tabs (on projects.html)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('btn-primary'));
        filterBtns.forEach(b => b.classList.add('btn-outline'));
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-primary');

        const cat = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
          if (cat === 'all' || card.getAttribute('data-category').includes(cat)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
})();
