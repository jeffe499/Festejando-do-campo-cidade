const postsPerPage = 10;
let currentPage = 1;

const postsList = document.getElementById('postsList');
const pagination = document.getElementById('pagination');
const newPostBtn = document.getElementById('newPostBtn');

newPostBtn.addEventListener('click', () => location.href = 'publicar.html');

// carrega posts e inicializa
function loadPosts() {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const totalPages = Math.ceil(posts.length / postsPerPage);
  renderPagination(totalPages);
  renderPage(posts, currentPage);
}

// renderiza paginação
function renderPagination(total) {
  pagination.innerHTML = '';
  if (total <= 1) return;
  for (let i = 1; i <= total; i++) {
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

// renderiza uma página
function renderPage(posts, page) {
  postsList.innerHTML = '';
  const start = (page - 1) * postsPerPage;
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

  // adiciona handlers de resposta
  document.querySelectorAll('.reply-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const pid = Number(form.dataset.id);
      const name = form.rname.value.trim();
      const body = form.rbody.value.trim();
      if (!name || !body) return;
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      const post = posts.find(p => p.id === pid);
      post.replies.push({ name, body, createdAt: new Date().toISOString() });
      localStorage.setItem('posts', JSON.stringify(posts));
      loadPosts();
    });
  });
}

loadPosts();
