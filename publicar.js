const nameInput      = document.getElementById('name');
const emailInput     = document.getElementById('email');
const bodyInput      = document.getElementById('body');
const imageInput     = document.getElementById('image');
const previewContainer = document.getElementById('previewContainer');
const previewImage     = document.getElementById('previewImage');
const removeImageBtn   = document.getElementById('removeImageBtn');
const publishBtn     = document.getElementById('publishBtn');

function updatePublishBtn() {
  if (nameInput.value.trim() && emailInput.value.trim() && bodyInput.value.trim()) {
    publishBtn.disabled = false;
    publishBtn.classList.add('enabled');
  } else {
    publishBtn.disabled = true;
    publishBtn.classList.remove('enabled');
  }
}
[nameInput, emailInput, bodyInput].forEach(el => el.addEventListener('input', updatePublishBtn));

// Mostrar preview ao selecionar imagem
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

// Remover imagem selecionada
removeImageBtn.addEventListener('click', () => {
  imageInput.value = '';
  previewContainer.hidden = true;
});

// Submissão do formulário
document.getElementById('postForm').addEventListener('submit', e => {
  e.preventDefault();
  const reader = new FileReader();
  reader.onload = () => {
    const data = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      body: bodyInput.value.trim(),
      image: reader.result || null,
      createdAt: new Date().toISOString()
    };
    const posts = JSON.parse(localStorage.getItem('postagens')) || [];
    posts.unshift(data);
    localStorage.setItem('postagens', JSON.stringify(posts));
    e.target.reset();
    previewContainer.hidden = true;
    updatePublishBtn();
    alert('Postagem publicada!');
  };
  if (imageInput.files[0]) {
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    reader.onload();
  }
});
