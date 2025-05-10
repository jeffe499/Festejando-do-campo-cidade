// comentarios.js

// Quantos posts por página
const postsPerPage = 10;
let currentPage = 1;

// Elementos do DOM
const postsList  = document.getElementById('postsList');
const pagination = document.getElementById('pagination');
const newPostBtn = document.getElementById('newPostBtn');

// Redireciona para criar postagem
newPostBtn.addEventListener('click', () => {
  window.location.href = 'publicar.html';
});

// CONFIGURAÇÃO do JSONBin (substitua pelos seus valores)
const BIN_ID  = '681fbdb78960c979a596eccf';
const API_KEY = '$2a$10$kplpgtHvPKcUTXITnT2lV.ToAJpCEYzGQYSWD7qKfYL65ZrJH3Sni';
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// 1) Busca todos os posts do Bin remoto
async function fetchPosts() {
  const res = await fetch(`${API_URL}/latest`, {
    headers: { 'X-Master-Key': API_KEY }
  });
  const json = await res.json();
  // normaliza para garantir que replies exista
  const posts = (json.record || []).map(p => ({
    ...p,
    replies: Array.isArray(p.replies) ? p.replies : []
  }));
  return posts;
}

// 2) Salva (PUT) o array completo de posts/responses de volta no Bin
async function savePosts(posts) {
  await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': API_KEY
    },
    body: JSON.stringify(posts)
  });
}

// 3) Gera os botões de paginação
function renderPagination(totalPages) {
  pagination.innerHTML = '';
  if (totalPages <= 1) return;
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active');
    btn.addEventListener('click', () => {
      currentPage = i;
      loadPosts();
    });
    pagination.appendChild(btn);
  }
}

// 4) Carrega e renderiza os posts da página atual
async function loadPosts() {
  const posts = await fetchPosts();
  const totalPages = Math.ceil(posts.length / postsPerPage);
  renderPagination(totalPages);

  postsList.innerHTML = '';
  const start = (currentPage - 1) * postsPerPage;
  const slice = posts.slice(start, start + postsPerPage);

  slice.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
      <div class="post-header">
        <strong>${post.name}</strong>
        <span class="post-meta">${new Date(post.createdAt).toLocaleString('pt-BR')}</span>
      </div>
      <div class="post-body">${post.body}</div>
      ${post.image ? `<img src="${post.image}">` : ''}
      <div class="replies" id="replies-${post.id}">
        ${post.replies.map(r => `
          <div class="reply">
            <strong>${r.name}</strong>
            <span class="reply-meta">(${new Date(r.createdAt).toLocaleTimeString('pt-BR')}):</span>
            <p>${r.body}</p>
          </div>
        `).join('')}
      </div>
      <form class="reply-form" data-id="${post.id}">
        <input type="text" name="rname" placeholder="Seu nome" required>
        <textarea name="rbody" rows="2" placeholder="Resposta..." required></textarea>
        <button type="submit">Responder</button>
      </form>
    `;
    postsList.appendChild(card);
  });

  // 5) Vincula cada form de reply ao handler que salva a resposta
  document.querySelectorAll('.reply-form').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const pid  = Number(form.dataset.id);
      const name = form.rname.value.trim();
      const body = form.rbody.value.trim();
      if (!name || !body) return;

      // busca posts, adiciona reply e salva de volta
      const posts = await fetchPosts();
      const post  = posts.find(p => p.id === pid);
      post.replies.push({ name, body, createdAt: new Date().toISOString() });
      await savePosts(posts);

      // recarrega o feed (mantém a mesma página)
      loadPosts();
    });
  });
}

// Inicia
loadPosts();
