document.addEventListener('DOMContentLoaded', () => {
  const btnContrast       = document.getElementById('btn-contrast');
  const btnFontIncrease   = document.getElementById('btn-font-increase');
  const btnFontDecrease   = document.getElementById('btn-font-decrease');
  const btnReset          = document.getElementById('btn-reset');
  const navToggle         = document.querySelector('.nav-toggle');
  const menu              = document.querySelector('.menu');
  const menuLinks         = document.querySelectorAll('.menu a');

  // Aplica preferências do localStorage
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }
  const fontPref = localStorage.getItem('fontSize');
  if (fontPref === 'large') {
    document.documentElement.classList.add('large-font');
  } else if (fontPref === 'small') {
    document.documentElement.classList.add('small-font');
  }

  // Alterna modo claro/escuro
  btnContrast?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const enabled = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
  });

  // Aumenta fonte
  btnFontIncrease?.addEventListener('click', () => {
    document.documentElement.classList.remove('small-font');
    document.documentElement.classList.toggle('large-font');
    const size = document.documentElement.classList.contains('large-font') ? 'large' : 'normal';
    localStorage.setItem('fontSize', size);
  });

  // Diminui fonte
  btnFontDecrease?.addEventListener('click', () => {
    document.documentElement.classList.remove('large-font');
    document.documentElement.classList.toggle('small-font');
    const size = document.documentElement.classList.contains('small-font') ? 'small' : 'normal';
    localStorage.setItem('fontSize', size);
  });

  // Redefine tudo
  btnReset?.addEventListener('click', () => {
    document.body.classList.remove('dark-mode');
    document.documentElement.classList.remove('small-font', 'large-font');
    localStorage.removeItem('darkMode');
    localStorage.removeItem('fontSize');
  });

  // Menu mobile
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('menu--open');
    navToggle.classList.toggle('nav-toggle--open');
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('menu--open');
      navToggle.classList.remove('nav-toggle--open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
});
