let formularioLogin = document.getElementById('formularioLogin');
let formularioRecuperar = document.getElementById('formularioRecuperarContrasena');
let botonCerrar = document.getElementById('botonCerrarRecuperar');
let emailRecuperar = document.getElementById('emailRecuperar');
let contrasenaRec = document.getElementById('contrasenaRecuperar');
let contrasenaCRec = document.getElementById('contrasenaCRecuperar');

emailRecuperar.addEventListener('blur', ()=>{validarEmail(emailRecuperar)});
contrasenaRec.addEventListener('blur', ()=>{validarContrasena(contrasenaRec)});
contrasenaCRec.addEventListener('blur', ()=>{validarContrasenaC(contrasenaRec,contrasenaCRec)});
botonCerrar.addEventListener('click', ()=>{limpiarformulario(formularioRecuperar)});
formularioLogin.addEventListener('submit', inicioSesion);
formularioRecuperar.addEventListener('submit', recuperarContrasena);

async function inicioSesion(e) {
  e.preventDefault();
  const emailLogin = document.getElementById('email').value
  const passwordLogin = document.getElementById('password').value

  const result = await fetch('http://localhost:3000/users')
  const users = await result.json()

  const user = users.find(user => user.email === emailLogin)
  if (!user) {
    await Swal.fire({
      title: 'ERROR',
      text: `No existe el usuario con correro ${emailLogin}`,
      icon: 'error',
      confirmButtonColor: '#2B2D42',
      confirmButtonText: 'Ok'
    })
  } else if (user.password === passwordLogin) {
    localStorage.setItem('role', user.role)
    localStorage.setItem('name', user.username)
    if (user.role == "admin") {
      window.location.href = "../html/pageAdmin.html"
    } else {
      window.location.href = "../html/pageInicio.html"
    }
  } else {
    await Swal.fire({
      title: 'ERROR',
      text: 'Los campos no son correctos, por favor ingrese los campos correctamente',
      icon: 'error',
      confirmButtonColor: '#2B2D42',
      confirmButtonText: 'Ok'
    })
  }
}

async function recuperarContrasena(e){
  e.preventDefault();

  const resultado = await fetch('http://localhost:3000/users')
  const usuarios = await resultado.json()
  let contrasenaRecup = contrasenaRec.value;
  
  const usuario = usuarios.find(user => user.email == emailRecuperar.value);
  await console.log(usuario)

  if (!usuario) {
    await Swal.fire({
      title: 'ERROR',
      text: `No existe el usuario con correro ${emailRecuperar.value}`,
      icon: 'error',
      confirmButtonColor: '#2B2D42',
      confirmButtonText: 'Ok'
    })
  } else if (validarEmail(emailRecuperar) && validarContrasena(contrasenaRec) && validarContrasenaC(contrasenaRec,contrasenaCRec)) {
    await Swal.fire({
      title: 'Recuperado con éxito',
      text: `Se modifico la contraseña del email ${emailRecuperar.value}, porfavor inicie sesión`,
      icon: 'success',
      confirmButtonColor: '#2B2D42',
      confirmButtonText: 'Ok'
    })
    await fetch(`http://localhost:3000/users/${usuario.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        password: contrasenaRecup
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  } else{
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
  emailRecuperar.className = 'form-control';
  contrasenaRec.className = 'form-control';
  contrasenaCRec.className = 'form-control';
}

function validarEmail(input) {
  let patron = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
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