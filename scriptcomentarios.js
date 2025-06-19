document.addEventListener('DOMContentLoaded', () => {
  // Accessibility controls
  const btnContrast     = document.getElementById('btn-contrast');
  const btnFontIncrease = document.getElementById('btn-font-increase');
  const btnFontDecrease = document.getElementById('btn-font-decrease');
  const btnReset        = document.getElementById('btn-reset');

  // Comments system elements
  const postsList      = document.getElementById('postsList');
  const pagination     = document.getElementById('pagination');
  const newPostBtn     = document.getElementById('newPostBtn');

  // Configuration
  const COMMENT_BIN_ID   = '681fbdb78960c979a596eccf';
  const PROFILE_BIN_ID   = '68265b398960c979a59a4454';
  const API_KEY          = '$2a$10$kplpgtHvPKcUTXITnT2lV.ToAJpCEYzGQYSWD7qKfYL65ZrJH3Sni';
  const COMMENT_API_URL  = `https://api.jsonbin.io/v3/b/${COMMENT_BIN_ID}`;
  const PROFILE_API_URL  = `https://api.jsonbin.io/v3/b/${PROFILE_BIN_ID}`;
  const ADMIN_EMAILS     = ['jefferson.kreiner@gmail.com', 'jefferson.kreiner@escola.pr.gov.br'];
  let currentPage = 1;
  const postsPerPage = 10;

  // Initialize dark mode and font size
  const darkMode = localStorage.getItem('darkMode') === 'enabled';
  document.body.classList.toggle('dark-mode', darkMode);

  const fontPref = localStorage.getItem('fontSize');
  document.documentElement.classList.toggle('large-font', fontPref === 'large');
  document.documentElement.classList.toggle('small-font', fontPref === 'small');

  // Helper to create safe links
  function linkify(text) {
    if (typeof text !== 'string') return '';
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlPattern, url => `<a href="${url}" target="_blank" rel="noopener">${url}</a>`);
  }

  // Accessibility button handlers
  btnContrast?.addEventListener('click', () => {
    const enabled = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
  });

  btnFontIncrease?.addEventListener('click', () => {
    document.documentElement.classList.remove('small-font');
    const increased = document.documentElement.classList.toggle('large-font');
    localStorage.setItem('fontSize', increased ? 'large' : 'normal');
  });

  btnFontDecrease?.addEventListener('click', () => {
    document.documentElement.classList.remove('large-font');
    const decreased = document.documentElement.classList.toggle('small-font');
    localStorage.setItem('fontSize', decreased ? 'small' : 'normal');
  });

  btnReset?.addEventListener('click', () => {
    document.body.classList.remove('dark-mode');
    document.documentElement.classList.remove('large-font', 'small-font');
    localStorage.removeItem('darkMode');
    localStorage.removeItem('fontSize');
  });

  // New post button behavior
  if (!sessionStorage.getItem('loggedEmail')) {
    newPostBtn?.setAttribute('title', 'Entre para postar');
  }
  newPostBtn?.addEventListener('click', () => {
    if (sessionStorage.getItem('loggedEmail')) {
      window.location.href = 'indexpublicar.html';
    } else {
      alert('Você precisa estar logado para criar uma postagem.');
      window.location.href = 'indexlogin.html';
    }
  });

  // Fetch helpers
  async function fetchJsonbin(url) {
    const res = await fetch(`${url}/latest`, { headers: { 'X-Master-Key': API_KEY } });
    if (!res.ok) throw new Error(`Erro ao buscar dados: ${res.status}`);
    const { record = [] } = await res.json();
    return record;
  }

  // Load comments and render
  async function loadPosts() {
    try {
      const [postsRaw, profiles] = await Promise.all([
        fetchJsonbin(COMMENT_API_URL),
        fetchJsonbin(PROFILE_API_URL)
      ]);
      const posts = postsRaw.map(p => ({ ...p, replies: Array.isArray(p.replies) ? p.replies : [] }));

      if (!posts.length) {
        postsList.innerHTML = '<p>Nenhum comentário ainda.</p>';
        pagination.innerHTML = '';
        return;
      }

      renderPagination(Math.ceil(posts.length / postsPerPage));
      postsList.innerHTML = '';

      const slice = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
      const currentUser = sessionStorage.getItem('loggedEmail');

      slice.forEach(post => {
        const profile = profiles.find(u => u.email === post.author) || {};
        const isOwnerOrAdmin = post.author === currentUser || ADMIN_EMAILS.includes(currentUser);

        const card = document.createElement('div');
        card.className = 'post-card';
        card.innerHTML = `
          <div class="post-header">
            <img src="${profile.avatar || 'default.png'}" class="comment-avatar" alt="Avatar">
            <strong>${profile.name || post.author}</strong>
            <span class="post-meta">${new Date(post.createdAt).toLocaleString('pt-BR')}</span>
            ${isOwnerOrAdmin ? `<button class="delete-btn" data-id="${post.id}">Excluir</button>` : ''}
          </div>
          <div class="post-body">${linkify(post.body || '')}</div>
          <div class="replies">
            ${post.replies.map(r => {
              const repProf = profiles.find(u => u.email === r.author) || {};
              return `
                <div class="reply">
                  <img src="${repProf.avatar || 'default.png'}" class="reply-avatar" alt="Avatar">
                  <strong>${repProf.name || r.author}</strong>
                  <span class="reply-meta">(${new Date(r.createdAt).toLocaleTimeString('pt-BR')}):</span>
                  <p>${linkify(r.body || '')}</p>
                </div>`;
            }).join('')}
          </div>
          <form class="reply-form" data-id="${post.id}">
            <textarea name="rbody" rows="2" placeholder="Escreva sua resposta…" required></textarea>
            <button type="submit">Responder</button>
          </form>`;

        postsList.appendChild(card);
      });

      // Delete buttons
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm('Excluir este post?')) return;
          const allPosts = await fetchJsonbin(COMMENT_API_URL);
          const remaining = allPosts.filter(p => String(p.id) !== btn.dataset.id);
          await savePosts(remaining);
          loadPosts();
        });
      });

      // Reply forms
      document.querySelectorAll('.reply-form').forEach(form => {
        form.addEventListener('submit', async e => {
          e.preventDefault();
          const user = sessionStorage.getItem('loggedEmail');
          if (!user) {
            alert('Você precisa estar logado para responder.');
            return window.location.href = 'indexlogin.html';
          }
          const pid = form.dataset.id;
          const body = form.rbody.value.trim();
          if (!body) return;
          const allPosts = await fetchJsonbin(COMMENT_API_URL);
          const post = allPosts.find(p => String(p.id) === pid);
          post.replies.push({ author: user, body, createdAt: new Date().toISOString() });
          await savePosts(allPosts);
          loadPosts();
        });
      });
    } catch (err) {
      console.error(err);
      postsList.innerHTML = '<p>Erro ao carregar comentários.</p>';
    }
  }

  function renderPagination(totalPages) {
    pagination.innerHTML = '';
    if (totalPages < 2) return;
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      if (i === currentPage) btn.classList.add('active');
      btn.addEventListener('click', () => { currentPage = i; loadPosts(); });
      pagination.appendChild(btn);
    }
  }

  async function savePosts(posts) {
    const res = await fetch(COMMENT_API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Master-Key': API_KEY },
      body: JSON.stringify(posts)
    });
    if (!res.ok) throw new Error(`PUT falhou: ${res.status}`);
  }

  // Start
  loadPosts();
});
