const PROFILE_BIN_ID  = '68265b398960c979a59a4454';
const API_KEY         = '$2a$10$kplpgtHvPKcUTXITnT2lV.ToAJpCEYzGQYSWD7qKfYL65ZrJH3Sni';
const PROFILE_API_URL = `https://api.jsonbin.io/v3/b/${PROFILE_BIN_ID}`;

const form    = document.getElementById('signupForm');
const inpName = document.getElementById('name');
const inpEmail= document.getElementById('email');
const inpPass = document.getElementById('password');
const inpAv   = document.getElementById('avatar');
const hash    = s => btoa(s);

async function fetchUsers() {
  const res = await fetch(`${PROFILE_API_URL}/latest`, { headers: { 'X-Master-Key': API_KEY } });
  const { record: users = [] } = await res.json();
  return users;
}
async function saveUsers(users) {
  await fetch(PROFILE_API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Master-Key': API_KEY },
    body: JSON.stringify(users)
  });
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const users = await fetchUsers();
  const email = inpEmail.value.trim();
  if (users.some(u => u.email === email)) return alert('E-mail já cadastrado.');
  const avatarData = inpAv.files[0]
    ? await new Promise(res => {
        const fr = new FileReader();
        fr.onload = () => res(fr.result);
        fr.readAsDataURL(inpAv.files[0]);
      })
    : null;
  users.push({
    id: Date.now(),
    name: inpName.value.trim(),
    email,
    password: hash(inpPass.value),
    avatar: avatarData
  });
  await saveUsers(users);
  alert('Conta criada com sucesso!');
  window.location.href = 'indexlogin.html';
});

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
