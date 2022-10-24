let nombre = document.getElementById("inputPostNombre");
let descripcion = document.getElementById("inputPostDescripcion");
let categoria = document.getElementById("inputPostCategoria");
let duracion = document.getElementById("inputPostDuracion");
let portada = document.getElementById("inputPostPortada");
let direccion = document.getElementById("inputPostDireccion");
let actores = document.getElementById("inputPostActores");
let ano = document.getElementById("inputPostAno");
let clasificacion = document.getElementById("inputPostClasificacion");
let estado = document.getElementById("inputPostEstado");
let botonCerrarAgregar = document.getElementById("botonCerrarAgregar");
let botonCerrarModificar = document.getElementById("botonCerrarModificar");
let botonFormModificar = document.getElementById("botonFormModificar");
let nombreF = document.getElementById("inputFormNombre");
let descripcionF = document.getElementById("inputFormDescripcion");
let anoF = document.getElementById("inputFormAno");
let categoriaF = document.getElementById("inputFormCategoria");
let duracionF = document.getElementById("inputFormDuracion");
let portadaF = document.getElementById("inputFormPortada");
let direccionF = document.getElementById("inputFormDireccion");
let actoresF = document.getElementById("inputFormActores");
let estadoF = document.getElementById("inputFormEstado");
let clasificacionF = document.getElementById("inputFormClasificacion");
let formularioF = document.getElementById('formModificarPelicula');
let formulario = document.getElementById("formularioPost");
nombre.addEventListener('blur', ()=>{validarNombre(nombre)});
descripcion.addEventListener('blur', ()=>{validarDescripcion(descripcion)});
categoria.addEventListener('blur', ()=>{validarCategoria(categoria)});
duracion.addEventListener('blur', ()=>{validarDuracion(duracion)});
portada.addEventListener('blur', ()=>{validarPortada(portada)});
direccion.addEventListener('blur', ()=>{validarDireccion(direccion)});
actores.addEventListener('blur', ()=>{validarActores(actores)});
ano.addEventListener('blur', ()=>{validarAno(ano)});
clasificacion.addEventListener('blur', ()=>{validarClasificacion(clasificacion)});
botonCerrarAgregar.addEventListener('click', ()=>{limpiarformulario(formulario)});
botonCerrarModificar.addEventListener('click', ()=>{limpiarformulario(formularioF)});
formulario.addEventListener('submit', crearPelicula);

const obtenerUnaPelicula = async (id) =>{
  const resultado = await fetch(`http://localhost:3000/peliculas/${id}`);
  const pelicula = await resultado.json();
  return pelicula;
}

const obtenerPeliculas = async () =>{
  const resultado = await fetch('http://localhost:3000/peliculas');
  const peliculas = await resultado.json();
  return peliculas;
}

const agregarPelicula = async (nombre, descripcion,categoria,duracion,portada,direccion,actores,ano,clasificacion,estado,favorito) =>{
  await fetch('http://localhost:3000/peliculas',{
    method: 'POST',
    body: JSON.stringify({
      nombre: nombre,
      descripcion: descripcion,
      categoria: categoria,
      duracion: duracion,
      portada: portada,
      direccion: direccion,
      actores: actores,
      ano: ano,
      clasificacion: clasificacion,
      estado: estado,
      favorito: favorito
    }),
    headers:{
      'Content-type': 'application/json; charset=UTF-8'
    },
  }) 
    .then(response => response.json())
    .then(json => json)
}

async function crearPelicula(e){
  e.preventDefault();
  let estadoP;
  let favorito = false;
  if (estado.value == 1) {
    estadoP = true;
  } else {
    estadoP = false;
  }
  if (validarNombre(nombre) && validarActores(actores) && validarAno(ano) && validarCategoria(categoria) && validarClasificacion(clasificacion) && validarDescripcion(descripcion) && validarDireccion(direccion) && validarDuracion(duracion) && validarPortada(portada)) {
    await Swal.fire({
      title: 'Película agregada con éxito',
      icon: 'success',
      confirmButtonColor: '#2B2D42',
      confirmButtonText: 'Ok'
    })
    await agregarPelicula(nombre.value,descripcion.value,categoria.value,duracion.value,portada.value,direccion.value,actores.value,ano.value,clasificacion.value,estadoP,favorito);
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

const crearTablaPeliculas = async () =>{
  let peliculas = await obtenerPeliculas();
  const cuerpoTabla = document.getElementById("tablaBodyListarPeliculas");
  let cuerpo = peliculas.map(pelicula =>(
    `
    <tr>
      <th scope="row" class="align-middle m-0 p-0">${pelicula.id}</th>
      <td class="align-middle m-0 p-0">${pelicula.nombre}</td>
      <td class="align-middle m-0 p-0">${pelicula.categoria}</td>
      <td class="align-middle m-0 p-0">${pelicula.descripcion}</td>
      <td name="estado${pelicula.estado}" class="align-middle  m-0 p-0"></td>
      <td class="align-middle">
      <button type="button" class="btn btn-outline-danger m-1" onclick="eliminarPelicula(${pelicula.id})"><i class="bi bi-trash"></i></button>
      <button type="button" class="btn btn-outline-primary m-1" onclick="modificarPelicula(${pelicula.id})" data-bs-toggle="modal" data-bs-target="#modalModificarPelicula"><i class="bi bi-pencil"></i></button>
      <button type="button" class="btn btn-outline-warning m-1" onclick="seleccionarFavorito(${pelicula.id})" name="iconFavorito${pelicula.favorito}"><i class="bi bi-star"></i></button>
      </td>
    </tr>
    `
  ))
  
  cuerpoTabla.innerHTML = cuerpo.join('');
  let arrayTrue = document.querySelectorAll('[name="estadotrue"]')
  arrayTrue.forEach(x => (x.innerHTML = '<div class="d-flex justify-content-center"><i class="bi bi-check-circle text-center"></i></div>'));
  let arrayFalse = document.querySelectorAll('[name="estadofalse"]')
  arrayFalse.forEach(x => (x.innerHTML = '<div class="d-flex justify-content-center"><i class="bi bi-x-circle text-center"></i></div>'));
  let arrayIconoTrue = document.querySelectorAll('[name="iconFavoritotrue"]')
  arrayIconoTrue.forEach(x => (x.innerHTML = '<i class="bi bi-star-fill"></i>'));
  return false;
}

async function modificarPelicula(id){
  let peliculaF = await obtenerUnaPelicula(id);
  nombreF.setAttribute('value',peliculaF.nombre);
  descripcionF.setAttribute('value',peliculaF.descripcion);
  anoF.setAttribute('value',peliculaF.ano);
  categoriaF.setAttribute('value',peliculaF.categoria);
  duracionF.setAttribute('value',peliculaF.duracion);
  portadaF.setAttribute('value',peliculaF.portada);
  direccionF.setAttribute('value',peliculaF.direccion);
  actoresF.setAttribute('value',peliculaF.actores);
  clasificacionF.setAttribute('value',peliculaF.clasificacion);
  validarNombre(nombreF);
  validarDescripcion(descripcionF);
  validarAno(anoF);
  validarCategoria(categoriaF);
  validarDuracion(duracionF);
  validarPortada(portadaF);
  validarDireccion(direccionF);
  validarActores(actoresF);
  validarClasificacion(clasificacionF);
  nombreF.addEventListener('blur', ()=>{validarNombre(nombreF)});
  descripcionF.addEventListener('blur', ()=>{validarDescripcion(descripcionF)});
  categoriaF.addEventListener('blur', ()=>{validarCategoria(categoriaF)});
  duracionF.addEventListener('blur', ()=>{validarDuracion(duracionF)});
  portadaF.addEventListener('blur', ()=>{validarPortada(portadaF)});
  direccionF.addEventListener('blur', ()=>{validarDireccion(direccionF)});
  actoresF.addEventListener('blur', ()=>{validarActores(actoresF)});
  anoF.addEventListener('blur', ()=>{validarAno(anoF)});
  clasificacionF.addEventListener('blur', ()=>{validarClasificacion(clasificacionF)});
  formularioF.addEventListener("submit", function (e) {
    e.preventDefault()
    cambiarPelicula(peliculaF.id,nombreF,descripcionF,categoriaF,duracionF,portadaF,direccionF,actoresF,anoF,clasificacionF,estadoF.value,peliculaF.favorito);
  });
  return false;
}

async function cambiarPelicula(id,nombreF,descripcionF,categoriaF,duracionF,portadaF,direccionF,actoresF,anoF,clasificacionF,estado,favorito){
  if (estado == 1) {
    estado = true;
  } else {
    estado = false;
  }
  if (validarNombre(nombreF) && validarActores(actoresF) && validarAno(anoF) && validarCategoria(categoriaF) && validarClasificacion(clasificacionF) && validarDescripcion(descripcionF) && validarDireccion(direccionF) && validarDuracion(duracionF) && validarPortada(portadaF)) {
    await Swal.fire({
      title: 'Película modificada con éxito',
      icon: 'success',
      confirmButtonColor: '#2B2D42',
      confirmButtonText: 'Ok'
    })
    await fetch(`http://localhost:3000/peliculas/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        nombre: nombreF.value,
        descripcion: descripcionF.value,
        categoria: categoriaF.value,
        duracion: duracionF.value,
        portada: portadaF.value,
        direccion: direccionF.value,
        actores: actoresF.value,
        ano: anoF.value,
        clasificacion: clasificacionF.value,
        estado: estado,
        favorito: favorito
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
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

const borrarPelicula = async (id) =>{
  await fetch(`http://localhost:3000/peliculas/${id}`,{
    method: 'DELETE'
  })
}

const eliminarPelicula = async (id) => {
  let borrar = false;
  await Swal.fire({
    title: 'Borrar película',
    text: `¿Está seguro? Recuerde que este proceso es irreversible`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#2B2D42',
    cancelButtonColor: '#2B2D42',
    confirmButtonText: 'Borrar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      borrar = true;
    }
  })
  if (borrar) {
    await Swal.fire({
      title: 'Borrada con éxito',
      text: "La película se borro exitosamente",
      icon: 'success',
      confirmButtonColor: '#2B2D42',
      confirmButtonText: 'Ok'
    })
    await borrarPelicula(id);
    crearTablaPeliculas();
  }
}

const seleccionarFavorito = async (id) =>{
  let pelicula = await obtenerUnaPelicula(id);
  let banFavorito, banDesfavorito;
  if (pelicula.favorito === false) {
    await Swal.fire({
      title: 'Marcar favorito',
      text: `¿Está seguro que quiere marcar ${pelicula.nombre} como favorito?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2B2D42',
      cancelButtonColor: '#2B2D42',
      confirmButtonText: 'Marcar',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        banFavorito = true;
      }
    })
  }else{
    await Swal.fire({
      title: 'Desmarcar favorito',
      text: `¿Está seguro que quiere desmarcar ${pelicula.nombre} como favorito?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2B2D42',
      cancelButtonColor: '#2B2D42',
      confirmButtonText: 'Desmarcar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        banDesfavorito = true;
      }
    })
  }
  if (banFavorito) {
    await Swal.fire({
      title: 'Marcado como Favorito',
      text: "La película se marcó como favorito",
      icon: 'success',
      confirmButtonColor: '#2B2D42',
      confirmButtonText: 'Ok'
    })
    await fetch(`http://localhost:3000/peliculas/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        favorito: true
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  }
  if (banDesfavorito) {
    await Swal.fire({
      title: 'Desmarcado con éxito',
      text: "La película se desmarcó exitosamente",
      icon: 'success',
      confirmButtonColor: '#2B2D42',
      confirmButtonText: 'Ok'
    })
    await fetch(`http://localhost:3000/peliculas/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        favorito: false
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  }
}

crearTablaPeliculas();

function limpiarformulario(idForm) {
  idForm.reset();
  nombre.className = 'form-control';
  descripcion.className = 'form-control';
  categoria.className = 'form-control';
  direccion.className = 'form-control';
  actores.className = 'form-control';
  ano.className = 'form-control';
  clasificacion.className = 'form-control';
  duracion.className = 'form-control';
  portada.className = 'form-control';
}

function validarNombre(input) {
  if (input.value.length >=2 && input.value.length <= 100) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

function validarDescripcion(input) {
  if (input.value.length >=2 && input.value.length <= 1000) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

function validarCategoria(input) {
  let patron = /^[a-zA-Z\u00C0-\u017F,\s]+$/;
  if (patron.test(input.value)) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

function validarDuracion(input) {
  let patron = /^[A-Za-z0-9\s]+$/;
  if ((patron.test(input.value)) && input.value.length >=2 && input.value.length <= 11) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

function validarClasificacion(input) {
  let patron = /^[a-z0-9\u00C0-\u017F-]+$/
  if (patron.test(input.values) && input.value.length >=1 && input.value.length <= 5) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

function validarPortada(input) {
  let patron = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if (patron.test(input.value)) {
    input.className = "form-control is-valid";
    return true
  } else {
    input.className = "form-control is-invalid";
    return false
  }
}

function validarDireccion(input) {
  let patron = /^[a-zA-Z\u00C0-\u017F.\s]{2,25}$/ ;
  if (patron.test(input.value)) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

function validarActores(input) {
  let patron = /^[a-zA-Z\u00C0-\u017F',-.\s]{2,500}$/ ;
  if (patron.test(input.value)) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

function validarAno(input) {
  let patron = /^(189[5-9]|19[0-9][0-9]|20[0-2][0-9])$/ ;
  if (patron.test(input.value)) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}
