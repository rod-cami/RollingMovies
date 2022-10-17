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
    .then(json => console.log(json))
}

async function crearPelicula(e){
  e.preventDefault();
  let estadoP;
  let favorito = false;

  if (estado.value == 'Publicado') {
    estadoP = true;
  } else {
    estadoP = false;
  }

  if (validarNombre(nombre) && validarActores(actores) && validarAno(ano) && validarCategoria(categoria) && validarClasificacion(clasificacion) && validarDescripcion(descripcion) && validarDireccion(direccion) && validarDuracion(duracion) && validarPortada(portada)) {
    await agregarPelicula(nombre.value,descripcion.value,categoria.value,duracion.value,portada.value,direccion.value,actores.value,ano.value,clasificacion.value,estadoP,favorito);
  } else {
    console.log('salio mal algo')
  }
}


const crearTablaPeliculas = async () =>{
  let peliculas = await obtenerPeliculas();
  console.log('hola');
  const cuerpoTabla = document.getElementById("tablaBodyListarPeliculas");

  let cuerpo = peliculas.map(pelicula =>(
    `
    <tr>
      <th scope="row">${pelicula.id}</th>
      <td>${pelicula.nombre}</td>
      <td>${pelicula.categoria}</td>
      <td>${pelicula.descripcion}</td>
      <td name="estado${pelicula.estado}" class="align-middle"></td>
      <td>
      <button type="button" class="btn btn-danger m-1" onclick="eliminarPelicula(${pelicula.id})"><i class="bi bi-trash"></i></button>
      <button type="button" class="btn btn-info m-1" onclick="modificarPelicula(${pelicula.id})" data-bs-toggle="modal" data-bs-target="#modalModificarPelicula"><i class="bi bi-pencil text-white"></i></button>
      <button type="button" class="btn btn-warning m-1" onclick="seleccionarFavorito(${pelicula.id})" name="iconFavorito${pelicula.favorito}"><i class="bi bi-star text-white"></i></button>
      </td>
    </tr>
    `
  ))
  
  cuerpoTabla.innerHTML = cuerpo;

  let arrayTrue = document.querySelectorAll('[name="estadotrue"]')
  arrayTrue.forEach(x => (x.innerHTML = '<div class="d-flex justify-content-center"><i class="bi bi-check-circle text-center"></i></div>'));
  
  let arrayFalse = document.querySelectorAll('[name="estadofalse"]')
  arrayFalse.forEach(x => (x.innerHTML = '<div class="d-flex justify-content-center"><i class="bi bi-x-circle text-center"></i></div>'));
  
  let arrayIconoTrue = document.querySelectorAll('[name="iconFavoritotrue"]')
  arrayIconoTrue.forEach(x => (x.innerHTML = '<i class="bi bi-star-fill text-white"></i>'));
  return false;
}

async function modificarPelicula(id){
  let pelicula = await obtenerUnaPelicula(id);
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
  let valorEstado =true;

  nombreF.setAttribute('value',pelicula.nombre);
  descripcionF.setAttribute('value',pelicula.descripcion);
  anoF.setAttribute('value',pelicula.ano);
  categoriaF.setAttribute('value',pelicula.categoria);
  duracionF.setAttribute('value',pelicula.duracion);
  portadaF.setAttribute('value',pelicula.portada);
  direccionF.setAttribute('value',pelicula.direccion);
  actoresF.setAttribute('value',pelicula.actores);
  clasificacionF.setAttribute('value',pelicula.clasificacion);

  // if (pelicula.estado == true) {
  //   estadoF.setAttribute('selected', 'selected');
  //   valorEstado = true;
  // }else
  // {
  //   valorEstado = false;
  // }

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
    e.preventDefault();
    cambiarPelicula(pelicula.id,nombreF.value,descripcionF.value,categoriaF.value,duracionF.value,portadaF.value,direccionF.value,actoresF.value,anoF.value,clasificacionF.value,valorEstado,pelicula.favorito);
  });
  
  return false;
}


async function cambiarPelicula(id,nombre, descripcion,categoria,duracion,portada,direccion,actores,ano,clasificacion,estado,favorito){

  await fetch(`http://localhost:3000/peliculas/${id}`, {
    method: 'PUT',
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
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

const borrarPelicula = async (id) =>{

  await fetch(`http://localhost:3000/peliculas/${id}`,{
    method: 'DELETE'
  })
}

const eliminarPelicula = async (id) => {
  await borrarPelicula(id);
  crearTablaPeliculas();
}

const seleccionarFavorito = async (id) =>{
  let pelicula = await obtenerUnaPelicula(id);

  if (pelicula.favorito === false) {
    await fetch(`http://localhost:3000/peliculas/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        favorito: true
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  }else{
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
  return false;
}

crearTablaPeliculas();

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
  if (input.value.length >=2 && input.value.length <= 500) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

function validarCategoria(input) {
  let patron = /^[a-zA-Z\s]{2,25}$/ ;

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

  if ((patron.test(input.value)) && input.value.length >=2 && input.value.length <= 7) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

function validarClasificacion(input) {
  let patron = /^[a-z0-9-]+$/
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
  let patron = /^[a-zA-Z\s]{2,25}$/ ;

  if (patron.test(input.value)) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

function validarActores(input) {
  let patron = /^[a-zA-Z,-\s]{2,500}$/ ;

  if (patron.test(input.value)) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

function validarAno(input) {
  let patron = /^(189[5-9]|19[8-9][0-9]|20[0-2][0-9])$/ ;

  if (patron.test(input.value)) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}
