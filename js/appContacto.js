let navAdmin = document.getElementById("navAdmin");
let navUser = document.getElementById("navUser");
let nombreUsuarioNav = document.getElementById('nombreUsuarioNav')

let nombreUsuarioNavbar = localStorage.getItem('name')
let tipo = localStorage.getItem('role');

window.addEventListener('load', ()=>{
  if (tipo == "admin") {
    navAdmin.className= 'nav-item';
  }else{
    navUser.className='nav-item'
    nombreUsuarioNav.innerHTML = nombreUsuarioNavbar;
  }
})

function enviarMail(){
  Email.send({
    Host : "smtp.elasticemail.com",
    Username : "juanjose91blg@gmail.com",
    Password : "BA3D1DE85624947AF30B266D181BA6777870",
    To : 'juanjose91blg@gmail.com',
    From : document.getElementById("email").value,
    Subject : document.getElementById("asunto").value  ,
    Body : document.getElementById("mensaje").value,
}).then( message => alert("¡Mensaje Enviado, nos pondremos en contacto a la brevedad!")
);
}
