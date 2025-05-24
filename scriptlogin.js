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
