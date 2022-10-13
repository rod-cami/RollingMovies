const openModal = document.querySelector('.login__cta');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');
const entrarModal = document.querySelector('.modal__entrar');

openModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('modal--show');
});

closeModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.remove('modal--show');
});

entrarModal.addEventListener('click', (e)=>{
  e.preventDefault();
  modal.classList.remove('modal--show');
});