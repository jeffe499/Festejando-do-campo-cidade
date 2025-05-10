const postsPerPage = 10;
let currentPage = 1;

const postsList = document.getElementById('postsList');
const pagination = document.getElementById('pagination');
const newPostBtn = document.getElementById('newPostBtn');

newPostBtn.addEventListener('click', () =>
  window.location.href = 'publicar.html'
);

// busca posts do Bin
async function fetchPosts() {
  const res = await fetch(`https://api.jsonbin.io/v3/b/SEU_BIN_ID_AQUI/latest`, {
    headers: { 'X-Master-Key': 'SUA_X_MASTER_KEY_AQUI' }
  });
  const json = await res.json();
  return json.record || [];
}

// renderiza paginação
function renderPagination(totalPages) {
  pagination.innerHTML = '';
  if (totalPages <= 1) return;
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active');
    btn.onclick = () => {
      currentPage = i;
      loadPosts();
    };
    pagination.appendChild(btn);
  }
}

// renderiza posts + replies
async function loadPosts() {
  const posts = await fetchPosts();
  const totalPages = Math.ceil(posts.length / postsPerPage);
  renderPagination(totalPages);

  postsList.innerHTML = '';
  const start = (currentPage - 1) * postsPerPage;
  posts.slice(start, start + postsPerPage).forEach(post => {
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
            <strong>${r.name}</strong> (${new Date(r.createdAt).toLocaleTimeString('pt-BR')}):
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

  // attach reply handlers
  document.querySelectorAll('.reply-form').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const pid = Number(form.dataset.id);
      const name = form.rname.value.trim();
      const body = form.rbody.value.trim();
      if (!name || !body) return;

      // atualiza o Bin
      const posts = await fetchPosts();
      const post = posts.find(p => p.id === pid);
      post.replies.push({ name, body, createdAt: new Date().toISOString() });

      await fetch(`https://api.jsonbin.io/v3/b/SEU_BIN_ID_AQUI`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': 'SUA_X_MASTER_KEY_AQUI'
        },
        body: JSON.stringify(posts)
      });
      loadPosts();
    });
  });
}

loadPosts();
