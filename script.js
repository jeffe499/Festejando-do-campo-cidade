const btnContrast = document.getElementById('btn-contrast');
const btnFontIncrease = document.getElementById('btn-font-increase');
const btnFontDecrease = document.getElementById('btn-font-decrease');
const btnReset = document.getElementById('btn-reset');


if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
}
if (localStorage.getItem('fontSize') === 'large') {
  document.documentElement.classList.add('large-font');
} else if (localStorage.getItem('fontSize') === 'small') {
  document.documentElement.classList.add('small-font');
}

btnContrast.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const enabled = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
});

btnFontIncrease.addEventListener('click', () => {
  document.documentElement.classList.remove('small-font');
  document.documentElement.classList.toggle('large-font');
  const size = document.documentElement.classList.contains('large-font') ? 'large' : 'normal';
  localStorage.setItem('fontSize', size);
});

btnFontDecrease.addEventListener('click', () => {
  document.documentElement.classList.remove('large-font');
  document.documentElement.classList.toggle('small-font');
  const size = document.documentElement.classList.contains('small-font') ? 'small' : 'normal';
  localStorage.setItem('fontSize', size);
});

btnReset.addEventListener('click', () => {
  document.body.classList.remove('dark-mode');
  document.documentElement.classList.remove('small-font', 'large-font');
  localStorage.removeItem('darkMode');
  localStorage.removeItem('fontSize');
});


const navToggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.menu');
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