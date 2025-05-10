// publicar.js

// Configurações do seu JSONBin
const BIN_ID   = '681fbdb78960c979a596eccf';
const API_KEY  = '$2a$10$kplpgtHvPKcUTXITnT2lV.ToAJpCEYzGQYSWD7qKfYL65ZrJH3Sni';
const API_URL  = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// Elementos do form
const nameInput       = document.getElementById('name');
const emailInput      = document.getElementById('email');
const bodyInput       = document.getElementById('body');
const imageInput      = document.getElementById('image');
const previewContainer= document.getElementById('previewContainer');
const previewImage    = document.getElementById('previewImage');
const removeImageBtn  = document.getElementById('removeImageBtn');
const publishBtn      = document.getElementById('publishBtn');

// Habilita/desabilita o botão Publicar
function updatePublishBtn() {
  if (nameInput.value && emailInput.value && bodyInput.value) {
    publishBtn.disabled = false;
    publishBtn.classList.add('enabled');
  } else {
    publishBtn.disabled = true;
    publishBtn.classList.remove('enabled');
  }
}
[nameInput, emailInput, bodyInput].forEach(i => i.addEventListener('input', updatePublishBtn));

// Preview da imagem
imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    previewImage.src = reader.result;
    previewContainer.hidden = false;
  };
  reader.readAsDataURL(file);
});
removeImageBtn.addEventListener('click', () => {
  imageInput.value = '';
  previewContainer.hidden = true;
});

// Busca os posts atuais do Bin
async function fetchPosts() {
  const res  = await fetch(`${API_URL}/latest`, {
    headers: { 'X-Master-Key': API_KEY }
  });
  const json = await res.json();
  return json.record || [];
}

// Salva o array de posts no Bin
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

// Submissão do form
document.getElementById('postForm').addEventListener('submit', async e => {
  e.preventDefault();
  const reader = new FileReader();
  reader.onload = async () => {
    const newPost = {
      id: Date.now(),
      name:  nameInput.value.trim(),
      email: emailInput.value.trim(),
      body:  bodyInput.value.trim(),
      image: reader.result || null,
      createdAt: new Date().toISOString(),
      replies: []  // array vazio para respostas
    };
    // adiciona ao início do array
    const posts = await fetchPosts();
    posts.unshift(newPost);
    await savePosts(posts);
    window.location.href = 'comentarios.html';
  };
  if (imageInput.files[0]) reader.readAsDataURL(imageInput.files[0]);
  else reader.onload();
});
