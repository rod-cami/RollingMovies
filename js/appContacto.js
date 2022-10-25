
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
