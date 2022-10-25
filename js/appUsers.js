let nombreUs = document.getElementById("inputRegistroNombre");
let usuario = document.getElementById("inputRegistroUsuario");
let contrasena = document.getElementById("inputRegistroContrasena");
let contrasenaC = document.getElementById("inputRegistroContrasenaC");
let formularioRegistro = document.getElementById("formularioRegistro");
let botonCerrarRegistro = document.getElementById("botonCerrarRegistro");

nombreUs.addEventListener('blur', ()=>{validarNombreUs(nombreUs)});
usuario.addEventListener('blur', ()=>{validarUsuario(usuario)});
contrasena.addEventListener('blur', ()=>{validarContrasena(contrasena)});
contrasenaC.addEventListener('blur', ()=>{validarContrasenaC(contrasena,contrasenaC)});
formularioRegistro.addEventListener('submit', agregarUsuario);
botonCerrarRegistro.addEventListener('click', ()=>{limpiarformulario(formularioRegistro)});

const anadirUsuario = async () =>{
  await fetch('http://localhost:3000/usuarios',{
    method: 'POST',
    body: JSON.stringify({
      nombre : nombreUs.value,
      usuario : usuario.value,
      contrasena : contrasena.value,
      tipo : "usuario",
      estado : true,
    }),
    headers:{
      'Content-type': 'application/json; charset=UTF-8'
    },
  })
}

async function agregarUsuario(e){
  e.preventDefault();
  if(validarContrasena(nombreUs), validarUsuario(usuario), validarNombreUs(nombreUs), validarContrasenaC(contrasena,contrasenaC)){
    await Swal.fire({
      title: 'Usuario agregado con éxito',
      icon: 'success',
      confirmButtonColor: '#2B2D42',
      confirmButtonText: 'Ok'
    })
    await anadirUsuario();
  }else{
    await Swal.fire({
      title: 'ERROR',
      text: 'Los campos no son correctos, por favor ingrese los campos correctamente',
      icon: 'error',
      confirmButtonColor: '#2B2D42',
      confirmButtonText: 'Ok'
    })
  }
}

function limpiarformulario(idForm) {
  idForm.reset();
  nombreUs.className = 'form-control';
  usuario.className = 'form-control';
  contrasena.className = 'form-control';
  contrasenaC.className = 'form-control';
}

function validarNombreUs(input) {
  if (input.value.length >=2 && input.value.length <= 100) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

function validarUsuario(input) {
  let patron = /^([A-Za-z0-9_-]{1,15})$/;
  if (patron.test(input.value)) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

function validarContrasena(input) {
  let patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&+]|[^ ]){8,15}$/;
  if ((patron.test(input.value))) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

function validarContrasenaC(input1,input2) {
  if (input1.value === input2.value) {
    input2.className = 'form-control is-valid';
    return true
  }else{
    input2.className = 'form-control is-invalid';
    return false
  }
}