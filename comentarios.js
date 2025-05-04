const postsList = document.getElementById('postsList');

function loadPosts() {
  const posts = JSON.parse(localStorage.getItem('postagens')) || [];
  postsList.innerHTML = '';

  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card';

    const header = document.createElement('div');
    header.className = 'post-header';
    header.innerHTML = `
      <h2>${post.name}</h2>
      <div class="post-meta">${new Date(post.createdAt).toLocaleString('pt-BR')}</div>
    `;
    card.appendChild(header);

    const body = document.createElement('p');
    body.textContent = post.body;
    card.appendChild(body);

    if (post.image) {
      const img = document.createElement('img');
      img.src = post.image;
      card.appendChild(img);
    }

    postsList.appendChild(card);
  });
}

loadPosts();
