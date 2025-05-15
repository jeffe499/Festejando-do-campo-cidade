document.addEventListener('DOMContentLoaded', () => {
  const btnMenu = document.querySelector('.btn-menu');
  const navList = document.querySelector('header nav ul');
  btnMenu.addEventListener('click', () => navList.classList.toggle('open'));

  const filtros = document.querySelectorAll('.filtro-evento input[type="checkbox"]');
  const eventos = document.querySelectorAll('.evento-item');
  filtros.forEach(chk => chk.addEventListener('change', aplicarFiltroEventos));
  function aplicarFiltroEventos() {
    const ativos = Array.from(filtros).filter(f => f.checked).map(f => f.value);
    eventos.forEach(ev => {
      const cats = ev.dataset.categorias.split(',');
      ev.style.display = (ativos.length === 0 || ativos.some(a => cats.includes(a))) ? 'block' : 'none';
    });
  }

  const galeriaImgs = document.querySelectorAll('.galeria img');
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  document.body.appendChild(lightbox);
  galeriaImgs.forEach(img => {
    img.addEventListener('click', () => {
      lightbox.classList.add('active');
      lightbox.innerHTML = '';
      lightbox.appendChild(img.cloneNode());
    });
  });
  lightbox.addEventListener('click', () => lightbox.classList.remove('active'));

  const form = document.getElementById('form-contato');
  if (form) {
    form.addEventListener('submit', e => {
      let valid = true;
      ['nome', 'email', 'mensagem'].forEach(name => {
        const field = form.querySelector(`[name="${name}"]`);
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        } else field.classList.remove('error');
      });
      if (!valid) {
        e.preventDefault();
        alert('Por favor, preencha todos os campos.');
      }
    });
  }
});
