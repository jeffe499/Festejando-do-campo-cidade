const btnContrast     = document.getElementById('btn-contrast');
const btnFontIncrease = document.getElementById('btn-font-increase');
const btnFontDecrease = document.getElementById('btn-font-decrease');
const btnReset        = document.getElementById('btn-reset');

function applyFontPref(pref) {
  document.documentElement.classList.remove('large-font', 'small-font');
  if (pref === 'large') {
    document.documentElement.classList.add('large-font');
  } else if (pref === 'small') {
    document.documentElement.classList.add('small-font');
  }
}

if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
}
const fontPref = localStorage.getItem('fontSize') || 'normal';
applyFontPref(fontPref);

btnContrast.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
});

btnFontIncrease.addEventListener('click', () => {
  const newPref = document.documentElement.classList.contains('large-font') ? 'normal' : 'large';
  localStorage.setItem('fontSize', newPref);
  applyFontPref(newPref);
});

btnFontDecrease.addEventListener('click', () => {
  const newPref = document.documentElement.classList.contains('small-font') ? 'normal' : 'small';
  localStorage.setItem('fontSize', newPref);
  applyFontPref(newPref);
});

btnReset.addEventListener('click', () => {
  document.body.classList.remove('dark-mode');
  localStorage.setItem('darkMode', 'disabled');
  localStorage.setItem('fontSize', 'normal');
  applyFontPref('normal');
});

const navToggle = document.querySelector('.nav-toggle');
const menu      = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu a');

navToggle.addEventListener('click', () => {
  menu.classList.toggle('menu--open');
  navToggle.classList.toggle('nav-toggle--open');
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('menu--open');
    navToggle.classList.remove('nav-toggle--open');
  });
});
