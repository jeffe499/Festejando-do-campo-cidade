// profile.js
const PROFILE_BIN_ID  = '68265b398960c979a59a4454';
const API_KEY         = '$2a$10$kplpgtHvPKcUTXITnT2lV.ToAJpCEYzGQYSWD7qKfYL65ZrJH3Sni';
const PROFILE_API_URL = `https://api.jsonbin.io/v3/b/${PROFILE_BIN_ID}`;

const avatarImg    = document.getElementById('avatarImg');
const avatarInput  = document.getElementById('avatarInput');
const formProf     = document.getElementById('profileForm');
const inpName      = document.getElementById('name');
const inpEmail     = document.getElementById('email');
const inpPass      = document.getElementById('password');
const inpConfirm   = document.getElementById('confirmPassword');
const saveBtn      = document.getElementById('saveBtn');
const logoutBtn    = document.getElementById('logoutBtn');
const hash         = s => btoa(s);

const validatePasswords = () =>
  (!inpPass.value && !inpConfirm.value) || inpPass.value === inpConfirm.value;

const updateSaveButton = () => {
  const nameOk = inpName.value.trim().length >= 2;
  const passOk = validatePasswords();
  saveBtn.disabled = !(nameOk && passOk);
};

async function loadProfile() {
  const email = sessionStorage.getItem('loggedEmail');
  if (!email) return window.location.href = 'login.html';
  try {
    const res = await fetch(`${PROFILE_API_URL}/latest`, { headers: { 'X-Master-Key': API_KEY } });
    const { record = [] } = await res.json();
    const me = record.find(u => u.email === email);
    inpName.value    = me.name;
    inpEmail.value   = me.email;
    avatarImg.src    = me.avatar || 'default.png';
    updateSaveButton();
  } catch {
    alert('Falha ao carregar perfil.');
  }
}

avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  if (!file) return;
  const fr = new FileReader();
  fr.onload = () => {
    avatarImg.src = fr.result;
    updateSaveButton();
  };
  fr.readAsDataURL(file);
});

formProf.addEventListener('input', updateSaveButton);

logoutBtn.addEventListener('click', () => {
  sessionStorage.clear();
  window.location.href = 'login.html';
});

formProf.addEventListener('submit', async e => {
  e.preventDefault();
  if (!validatePasswords()) return alert('As senhas não conferem.');
  const email = sessionStorage.getItem('loggedEmail');
  try {
    const resGet = await fetch(`${PROFILE_API_URL}/latest`, { headers: { 'X-Master-Key': API_KEY } });
    const { record: users = [] } = await resGet.json();
    const idx = users.findIndex(u => u.email === email);
    users[idx].name = inpName.value.trim();
    if (inpPass.value) users[idx].password = hash(inpPass.value);
    if (avatarInput.files[0]) {
      users[idx].avatar = await new Promise(res => {
        const fr2 = new FileReader();
        fr2.onload = () => res(fr2.result);
        fr2.readAsDataURL(avatarInput.files[0]);
      });
    }
    const resPut = await fetch(PROFILE_API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Master-Key': API_KEY },
      body: JSON.stringify(users)
    });
    if (!resPut.ok) throw new Error();
    alert('Perfil atualizado com sucesso!');
    inpPass.value = inpConfirm.value = '';
    avatarInput.value = '';
    await loadProfile();
  } catch {
    alert('Falha ao salvar perfil.');
  }
});

loadProfile();
