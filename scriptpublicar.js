const btnContrast     = document.getElementById('btn-contrast');
const btnFontIncrease = document.getElementById('btn-font-increase');
const btnFontDecrease = document.getElementById('btn-font-decrease');
const btnReset        = document.getElementById('btn-reset');

if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
}
const fontPref = localStorage.getItem('fontSize');
if (fontPref === 'large') {
  document.documentElement.classList.add('large-font');
} else if (fontPref === 'small') {
  document.documentElement.classList.add('small-font');
}

btnContrast.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem(
    'darkMode',
    document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled'
  );
});

btnFontIncrease.addEventListener('click', () => {
  document.documentElement.classList.remove('small-font');
  document.documentElement.classList.toggle('large-font');
  localStorage.setItem(
    'fontSize',
    document.documentElement.classList.contains('large-font') ? 'large' : 'normal'
  );
});

btnFontDecrease.addEventListener('click', () => {
  document.documentElement.classList.remove('large-font');
  document.documentElement.classList.toggle('small-font');
  localStorage.setItem(
    'fontSize',
    document.documentElement.classList.contains('small-font') ? 'small' : 'normal'
  );
});

btnReset.addEventListener('click', () => {
  document.body.classList.remove('dark-mode');
  document.documentElement.classList.remove('small-font','large-font');
  localStorage.removeItem('darkMode');
  localStorage.removeItem('fontSize');
});


const COMMENT_BIN_ID  = '681fbdb78960c979a596eccf';
const COMMENT_API_URL = `https://api.jsonbin.io/v3/b/${COMMENT_BIN_ID}`;
const API_KEY         = '$2a$10$kplpgtHvPKcUTXITnT2lV.ToAJpCEYzGQYSWD7qKfYL65ZrJH3Sni';

const formPost  = document.getElementById('postForm');
const bodyInput = document.getElementById('body');

async function fetchPosts() {
  const res = await fetch(`${COMMENT_API_URL}/latest`, {
    headers: { 'X-Master-Key': API_KEY }
  });
  if (!res.ok) throw new Error(`GET falhou: ${res.status}`);
  const { record = [] } = await res.json();
  return record;
}

async function savePosts(posts) {
  const res = await fetch(COMMENT_API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': API_KEY
    },
    body: JSON.stringify(posts)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PUT falhou: ${res.status} — ${text}`);
  }
}

formPost.addEventListener('submit', async e => {
  e.preventDefault();
  const body = bodyInput.value.trim();
  if (!body) {
    alert('Digite uma mensagem antes de publicar.');
    return;
  }

  const author = sessionStorage.getItem('loggedEmail');
  if (!author) {
    alert('Você precisa estar logado para publicar.');
    return window.location.href = 'indexlogin.html';
  }

  try {
    const posts = await fetchPosts();
    posts.unshift({
      id: Date.now(),
      author,
      body,
      createdAt: new Date().toISOString(),
      replies: []
    });
    await savePosts(posts);
    window.location.href = 'indexcomentarios.html';
  } catch (err) {
    console.error('Erro ao publicar:', err);
    alert('Ocorreu um erro ao publicar. Veja o console para mais detalhes.');
  }
});
