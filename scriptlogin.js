// login.js
const PROFILE_BIN_ID   = '68265b398960c979a59a4454';
const API_KEY          = '$2a$10$kplpgtHvPKcUTXITnT2lV.ToAJpCEYzGQYSWD7qKfYL65ZrJH3Sni';
const PROFILE_API_URL  = `https://api.jsonbin.io/v3/b/${PROFILE_BIN_ID}/latest`;

const formLogin = document.getElementById('loginForm');
const inpEmail  = document.getElementById('email');
const inpPass   = document.getElementById('password');
const hash      = s => btoa(s);

formLogin.addEventListener('submit', async e => {
  e.preventDefault();
  const email = inpEmail.value.trim();
  const pass  = inpPass.value;
  try {
    const res = await fetch(PROFILE_API_URL, { headers: { 'X-Master-Key': API_KEY } });
    if (!res.ok) throw new Error();
    const { record: users = [] } = await res.json();
    const user = users.find(u => u.email === email && u.password === hash(pass));
    if (!user) return alert('E-mail ou senha incorretos.');
    sessionStorage.setItem('loggedEmail', user.email);
    window.location.href = 'indexcomentarios.html';
  } catch {
    alert('Falha na autenticação. Tente novamente mais tarde.');
  }
});
// galeria.js

// === Controles de acessibilidade ===
const btnContrast     = document.getElementById('btn-contrast');
const btnFontIncrease = document.getElementById('btn-font-increase');
const btnFontDecrease = document.getElementById('btn-font-decrease');
const btnReset        = document.getElementById('btn-reset');

// Função para aplicar preferências de fonte
function applyFontPref(pref) {
  document.documentElement.classList.remove('large-font', 'small-font');
  if (pref === 'large') {
    document.documentElement.classList.add('large-font');
  } else if (pref === 'small') {
    document.documentElement.classList.add('small-font');
  }
}

// Carrega preferências
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
}
const fontPref = localStorage.getItem('fontSize') || 'normal';
applyFontPref(fontPref);

// Dark mode toggle
btnContrast.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
});

// Font size adjust
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

// Reset preferences
btnReset.addEventListener('click', () => {
  document.body.classList.remove('dark-mode');
  localStorage.setItem('darkMode', 'disabled');
  localStorage.setItem('fontSize', 'normal');
  applyFontPref('normal');
});

// === Menu mobile toggle ===
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
