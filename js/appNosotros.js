let navAdmin = document.getElementById("navAdmin");
let navUser = document.getElementById("navUser");


let tipo = localStorage.getItem('role');

window.addEventListener('load', ()=>{
  if (tipo == "admin") {
    navAdmin.className= 'nav-item';
  }else{
    navUser.className='nav-item';
  }
})