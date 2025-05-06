const nameInput       = document.getElementById('name');
const emailInput      = document.getElementById('email');
const bodyInput       = document.getElementById('body');
const imageInput      = document.getElementById('image');
const previewContainer= document.getElementById('previewContainer');
const previewImage    = document.getElementById('previewImage');
const removeImageBtn  = document.getElementById('removeImageBtn');
const publishBtn      = document.getElementById('publishBtn');

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

document.getElementById('postForm').addEventListener('submit', e => {
  e.preventDefault();
  const reader = new FileReader();
  reader.onload = () => {
    const post = {
      id: Date.now(),
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      body: bodyInput.value.trim(),
      image: reader.result || null,
      createdAt: new Date().toISOString(),
      replies: []  // inicializa array de respostas
    };
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.unshift(post);
    localStorage.setItem('posts', JSON.stringify(posts));
    window.location.href = 'comentarios.html';
  };
  if (imageInput.files[0]) reader.readAsDataURL(imageInput.files[0]);
  else reader.onload();
});
