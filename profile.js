const PROFILE_BIN_ID = '68265b398960c979a59a4454';
const API_KEY = '$2a$10$kplpgtHvPKcUTXITnT2lV.ToAJpCEYzGQYSWD7qKfYL65ZrJH3Sni';
const PROFILE_API_URL = `https://api.jsonbin.io/v3/b/${PROFILE_BIN_ID}`;

const avatarImg = document.getElementById('avatarImg');
const avatarInput = document.getElementById('avatarInput');
const formProf = document.getElementById('profileForm');
const inpName = document.getElementById('name');
const inpEmail = document.getElementById('email');
const inpPass = document.getElementById('password');
const inpConfirm = document.getElementById('confirmPassword');
const saveBtn = document.getElementById('saveBtn');
const logoutBtn = document.getElementById('logoutBtn');

const hash = s => btoa(s);

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
    if (!res.ok) throw new Error(`GET perfil falhou: ${res.status}`);
    const { record = [] } = await res.json();
    const me = record.find(u => u.email === email);
    if (!me) throw new Error('Usuário não encontrado');

    inpName.value = me.name;
    inpEmail.value = me.email;
    avatarImg.src = me.avatar || 'default.png';
    updateSaveButton();
  } catch (err) {
    console.error('Erro ao carregar perfil:', err);
    alert('Falha ao carregar perfil. Tente novamente.');
  }
}

avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    avatarImg.src = reader.result;
    updateSaveButton();
  };
  reader.readAsDataURL(file);
});

formProf.addEventListener('input', updateSaveButton);

logoutBtn.addEventListener('click', () => {
  sessionStorage.clear();
  window.location.href = 'login.html';
});

formProf.addEventListener('submit', async e => {
  e.preventDefault();

  if (!validatePasswords()) {
    alert('As senhas não conferem.');
    return;
  }

  const email = sessionStorage.getItem('loggedEmail');
  try {
    const resGet = await fetch(`${PROFILE_API_URL}/latest`, { headers: { 'X-Master-Key': API_KEY } });
    if (!resGet.ok) throw new Error(`GET perfil falhou: ${resGet.status}`);
    const { record: users = [] } = await resGet.json();

    const idx = users.findIndex(u => u.email === email);
    if (idx < 0) throw new Error('Usuário não encontrado');

    users[idx].name = inpName.value.trim();
    if (inpPass.value) users[idx].password = hash(inpPass.value);

    if (avatarInput.files[0]) {
      const avatarData = await new Promise(resolve => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.readAsDataURL(avatarInput.files[0]);
      });
      users[idx].avatar = avatarData;
    }

    const resPut = await fetch(PROFILE_API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Master-Key': API_KEY },
      body: JSON.stringify(users)
    });
    if (!resPut.ok) throw new Error(`PUT falhou: ${resPut.status}`);

    alert('Perfil atualizado com sucesso!');
    await loadProfile();
    inpPass.value = '';
    inpConfirm.value = '';
    avatarInput.value = '';
    updateSaveButton();
  } catch (err) {
    console.error('Erro ao salvar perfil:', err);
    alert('Falha ao salvar perfil. Veja o console para detalhes.');
  }
});

loadProfile();
