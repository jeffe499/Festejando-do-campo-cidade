const COMMENT_BIN_ID = '681fbdb78960c979a596eccf';
const PROFILE_BIN_ID = '68265b398960c979a59a4454';
const API_KEY = '$2a$10$kplpgtHvPKcUTXITnT2lV.ToAJpCEYzGQYSWD7qKfYL65ZrJH3Sni';
const COMMENT_API_URL = `https://api.jsonbin.io/v3/b/${COMMENT_BIN_ID}`;
const PROFILE_API_URL = `https://api.jsonbin.io/v3/b/${PROFILE_BIN_ID}`;

const ADMIN_EMAILS = [
  'jefferson.kreiner@gmail.com',
  'jefferson.kreiner@escola.pr.gov.br'
];

const postsList = document.getElementById('postsList');
const pagination = document.getElementById('pagination');
const newPostBtn = document.getElementById('newPostBtn');
const logoutLink = document.getElementById('logoutLink');

if (!sessionStorage.getItem('loggedEmail')) {
  logoutLink.style.display = 'none';
}

newPostBtn.addEventListener('click', () => {
  if (sessionStorage.getItem('loggedEmail')) {
    window.location.href = 'publicar.html';
  } else {
    alert('Você precisa estar logado para criar uma postagem.');
    window.location.href = 'login.html';
  }
});

logoutLink.addEventListener('click', () => {
  sessionStorage.clear();
  window.location.href = 'login.html';
});

async function fetchPosts() {
  const res = await fetch(`${COMMENT_API_URL}/latest`, {
    headers: { 'X-Master-Key': API_KEY }
  });
  if (!res.ok) throw new Error(`GET posts falhou: ${res.status}`);
  const { record = [] } = await res.json();
  return record.map(p => ({ ...p, replies: Array.isArray(p.replies) ? p.replies : [] }));
}

async function fetchProfiles() {
  const res = await fetch(`${PROFILE_API_URL}/latest`, {
    headers: { 'X-Master-Key': API_KEY }
  });
  if (!res.ok) throw new Error(`GET profiles falhou: ${res.status}`);
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
  if (!res.ok) throw new Error(`PUT posts falhou: ${res.status}`);
}

const postsPerPage = 10;
let currentPage = 1;

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

async function loadPosts() {
  try {
    const [posts, profiles] = await Promise.all([fetchPosts(), fetchProfiles()]);

    if (posts.length === 0) {
      postsList.innerHTML = '<p>Nenhum comentário ainda.</p>';
      pagination.innerHTML = '';
      return;
    }

    renderPagination(Math.ceil(posts.length / postsPerPage));
    postsList.innerHTML = '';

    const slice = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
    const currentUser = sessionStorage.getItem('loggedEmail');

    slice.forEach(post => {
      const prof = profiles.find(u => u.email === post.author) || {};
      const avatar = prof.avatar || 'default.png';
      const displayName = prof.name || post.author;
      const isOwner = post.author === currentUser;
      const isAdmin = ADMIN_EMAILS.includes(currentUser);

      const card = document.createElement('div');
      card.className = 'post-card';
      card.innerHTML = `
        <div class="post-header">
          <img src="${avatar}" class="comment-avatar" alt="Avatar de ${displayName}">
          <strong>${displayName}</strong>
          <span class="post-meta">${new Date(post.createdAt).toLocaleString('pt-BR')}</span>
          ${isOwner || isAdmin ? `<button class="delete-btn" data-id="${post.id}">Excluir</button>` : ''}
        </div>
        <div class="post-body"></div>
      `;
      card.querySelector('.post-body').textContent = post.body;

      const repliesDiv = document.createElement('div');
      repliesDiv.className = 'replies';
      post.replies.forEach(r => {
        const rProf = profiles.find(u => u.email === r.author) || {};
        const rAv = rProf.avatar || 'default.png';
        const rName = rProf.name || r.author;
        const rep = document.createElement('div');
        rep.className = 'reply';
        rep.innerHTML = `
          <img src="${rAv}" class="reply-avatar" alt="Avatar de ${rName}">
          <strong>${rName}</strong>
          <span class="reply-meta">(${new Date(r.createdAt).toLocaleTimeString('pt-BR')}):</span>
          <p></p>
        `;
        rep.querySelector('p').textContent = r.body;
        repliesDiv.appendChild(rep);
      });

      const form = document.createElement('form');
      form.className = 'reply-form';
      form.dataset.id = post.id;
      form.innerHTML = `
        <textarea name="rbody" rows="2" placeholder="Escreva sua resposta…" required></textarea>
        <button type="submit">Responder</button>
      `;

      card.append(repliesDiv, form);
      postsList.appendChild(card);
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Excluir este post?')) return;
        const id = btn.dataset.id;
        const all = await fetchPosts();
        await savePosts(all.filter(p => String(p.id) !== id));
        loadPosts();
      });
    });

    document.querySelectorAll('.reply-form').forEach(form => {
      form.addEventListener('submit', async e => {
        e.preventDefault();
        const user = sessionStorage.getItem('loggedEmail');
        if (!user) {
          alert('Você precisa estar logado para responder.');
          return window.location.href = 'login.html';
        }
        const pid = form.dataset.id;
        const body = form.rbody.value.trim();
        if (!body) return;
        const all = await fetchPosts();
        const post = all.find(p => String(p.id) === pid);
        post.replies.push({ author: user, body, createdAt: new Date().toISOString() });
        await savePosts(all);
        loadPosts();
      });
    });

  } catch (err) {
    console.error('Erro em loadPosts:', err);
    postsList.innerHTML = '<p>Erro ao carregar comentários. Veja console.</p>';
  }
}

loadPosts();
