const COMMENT_BIN_ID = '681fbdb78960c979a596eccf';
const COMMENT_API_URL = `https://api.jsonbin.io/v3/b/${COMMENT_BIN_ID}`;
const API_KEY = '$2a$10$kplpgtHvPKcUTXITnT2lV.ToAJpCEYzGQYSWD7qKfYL65ZrJH3Sni';

const formPost = document.getElementById('postForm');
const bodyInput = document.getElementById('body');

async function fetchPosts() {
  const res = await fetch(`${COMMENT_API_URL}/latest`, { headers: { 'X-Master-Key': API_KEY } });
  if (!res.ok) throw new Error(`GET falhou: ${res.status}`);
  const { record = [] } = await res.json();
  return record;
}

async function savePosts(posts) {
  const res = await fetch(COMMENT_API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Master-Key': API_KEY },
    body: JSON.stringify(posts)
  });
  if (!res.ok) throw new Error(`PUT falhou: ${res.status} — ${await res.text()}`);
}

formPost.addEventListener('submit', async e => {
  e.preventDefault();
  const body = bodyInput.value.trim();
  if (!body) return alert('Digite uma mensagem antes de publicar.');

  const author = sessionStorage.getItem('loggedEmail');
  if (!author) {
    alert('Você precisa estar logado para publicar.');
    return window.location.href = 'login.html';
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
    window.location.href = 'comentarios.html';
  } catch (err) {
    console.error('Erro ao publicar:', err);
    alert('Ocorreu um erro ao publicar. Veja o console para mais detalhes.');
  }
});
