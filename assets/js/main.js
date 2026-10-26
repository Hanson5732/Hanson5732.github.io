/**
 * Hanqi Huang (黄瀚祺) - Personal Website JavaScript
 * Supports: Theme Toggle (Dark/Light), Language Switcher (EN default, ZH optional),
 * Mobile Navigation, BibTeX Copy, and Project Category Filtering.
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. Language Management (Default: English 'en', Optional: Chinese 'zh')
  // ==========================================================================
  const langToggleBtn = document.getElementById('lang-toggle');

  function getSavedLanguage() {
    // Strictly default to 'en' unless user explicitly selected 'zh'
    return localStorage.getItem('site_lang') || 'en';
  }

  function applyLanguage(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    localStorage.setItem('site_lang', lang);
    updateLangButton(lang);
  }

  function updateLangButton(lang) {
    if (!langToggleBtn) return;
    const langSpan = langToggleBtn.querySelector('.lang-text');
    if (langSpan) {
      // In English mode, show "中文" so user knows clicking will switch to Chinese
      // In Chinese mode, show "English" (or "EN")
      langSpan.innerText = (lang === 'zh') ? 'EN' : '中文';
    }
  }

  // Initialize Language immediately
  const initialLang = getSavedLanguage();
  applyLanguage(initialLang);

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-lang') || 'en';
      applyLanguage(current === 'zh' ? 'en' : 'zh');
    });
  }

  // ==========================================================================
  // 2. Theme Management (Light / Dark)
  // ==========================================================================
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

  // ==========================================================================
  // 3. Mobile Menu Toggle
  // ==========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('show');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
      }
    });

    // Close when clicking any nav link
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });
  }

  // ==========================================================================
  // 4. Highlight Active Navigation
  // ==========================================================================
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-link a');
  navItems.forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.parentElement.classList.add('active');
    }
  });

  // ==========================================================================
  // 5. BibTeX Copy to Clipboard
  // ==========================================================================
  window.copyBibtex = function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    const text = el.innerText.trim();
    navigator.clipboard.writeText(text).then(() => {
      const btn = event.target;
      const original = btn.innerText;
      btn.innerText = (document.documentElement.getAttribute('data-lang') === 'zh') ? '已复制！' : 'Copied!';
      btn.style.color = 'var(--primary)';
      setTimeout(() => {
        btn.innerText = original;
        btn.style.color = '';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy BibTeX: ', err);
    });
  };

  // ==========================================================================
  // 6. Project Filter Tabs (on projects.html)
  // ==========================================================================
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
