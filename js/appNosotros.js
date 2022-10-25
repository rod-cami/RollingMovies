let navAdmin = document.getElementById("navAdmin");
let navUser = document.getElementById("navUser");
let nombreUsuarioNav = document.getElementById('nombreUsuarioNav')

let nombreUsuarioNavbar = localStorage.getItem('name')
let tipo = localStorage.getItem('role');

window.addEventListener('load', ()=>{
  if (tipo == "admin") {
    navAdmin.className= 'nav-item';
  }else{
    navUser.className='nav-item';
    nombreUsuarioNav.innerHTML = nombreUsuarioNavbar;
  }
})