const openModal = document.querySelector('.login__cta');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');

openModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('modal--show');
});

closeModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.remove('modal--show');
});


const inicioSesion = async() => {
    const emailLogin = document.getElementById('email').value
    const passwordLogin = document.getElementById('password').value
  
    const result = await fetch('http://localhost:3000/users')
    const users = await result.json()
  
    const user = users.find(user => user.email === emailLogin)
    console.log(user);
  
    if (!user) {
      return alert('Los datos no coinciden')
    }
    if (user.password === passwordLogin) {
      localStorage.setItem('role', user.role)
      window.location.href = './html/index.html'
    } else {
      alert('Los datos no coinciden')
    }
  
  }