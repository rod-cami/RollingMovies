import {validarActores, validarAno, validarCategoria, validarClasificacion, validarDescripcion, validarDireccion, validarDuracion, validarNombre, validarPortada} from "./helpersAdmin.js";

let nombre = document.getElementById("inputPostNombre");
let descripcion = document.getElementById("inputPostDescripcion");
let categoria = document.getElementById("inputPostCategoria");
let duracion = document.getElementById("inputPostDuracion");
let portada = document.getElementById("inputPostPortada");
let direccion = document.getElementById("inputPostDireccion");
let actores = document.getElementById("inputPostActores");
let ano = document.getElementById("inputPostAno");
let clasificacion = document.getElementById("inputPostClasificacion");
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
// formulario.addEventListener('submit', crearPelicula);

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

  let estado = true;
  let favorito = false;

  if (validarNombre(nombre) && validarActores(actores) && validarAno(ano) && validarCategoria(categoria) && validarClasificacion(clasificacion) && validarDescripcion(descripcion) && validarDireccion(direccion) && validarDuracion(duracion) && validarPortada(portada)) {
    await agregarPelicula(nombre.value,descripcion.value,categoria.value,duracion.value,portada.value,direccion.value,actores.value,ano.value,clasificacion.value,estado,favorito);
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
      <td>${pelicula.estado}</td>
      <td>
      <button type="button" class="btn btn-danger m-1" onclick="eliminarPelicula(${pelicula.id})"><i class="bi bi-trash"></i></button>
      <button type="button" class="btn btn-info m-1" onclick="modificarPelicula(${pelicula.id})" data-bs-toggle="modal" data-bs-target="#modalModificarPelicula"><i class="bi bi-pencil text-white"></i></button>
      <button type="button" class="btn btn-warning m-1" onclick="seleccionarFavorito(${pelicula.id})"><i class="bi bi-star text-white"></i></button>
      </td>
    </tr>
    `
  ))
  
  console.log('hola2');
  cuerpoTabla.innerHTML = cuerpo;
}

async function modificarPelicula(id){
  
  console.log('hola3');
  let pelicula = await obtenerUnaPelicula(id);
  const formModificar = document.getElementById('formModificarPelicula')

  const form = (
    `
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="inputFormNombre" value="${pelicula.nombre}">
        <label for="floatingInput">Nombre</label>
      </div>
      <div class="form-floating">
        <input type="text" class="form-control" id="inputFormDescripcion" value="${pelicula.descripcion}">
        <label for="floatingPassword">Descripcion</label>
      </div>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="inputFormAno" value="${pelicula.ano}">
        <label for="floatingInput">Año de Estreno</label>
      </div>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="inputFormCategoria" value="${pelicula.categoria}">
        <label for="floatingInput">Categoria</label>
      </div>
      <div class="form-floating">
        <input type="text" class="form-control" id="inputFormDuracion" value="${pelicula.duracion}">
        <label for="floatingPassword">Duración</label>
      </div>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="inputFormPortada" value="${pelicula.portada}">
        <label for="floatingInput">Imagen de Portada</label>
      </div>
      <div class="form-floating">
        <input type="text" class="form-control" id="inputFormDireccion" value="${pelicula.direccion}">
        <label for="floatingPassword">Direccion</label>
      </div>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="inputFormActores" value="${pelicula.actores}">
        <label for="floatingInput">Actores</label>
      </div>
      <div class="form-floating">
        <input type="text" class="form-control" id="inputFormClasificacion" value="${pelicula.clasificacion}">
        <label for="floatingPassword">Clasificacion</label>
      </div>
      <div class="form-floating">
        <input type="text" class="form-control" id="inputFormClasificacion" value="${pelicula.estado}">
        <label for="floatingPassword">Estado</label>
      </div>
      <div class="col-auto">
        <button type="button" class="btn btn-primary mb-3" onclick="cambiarPelicula(${pelicula.id})">Modificar</button>
      </div>
    `
  )
  
  formModificar.innerHTML = form;
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

const cambiarPelicula = async (id) => {
  let nombre = document.getElementById("inputFormNombre").value;
  let descripcion = document.getElementById("inputFormDescripcion").value;
  let categoria = document.getElementById("inputFormCategoria").value;
  let duracion = document.getElementById("inputFormDuracion").value;
  let portada = document.getElementById("inputFormPortada").value;
  let direccion = document.getElementById("inputFormDireccion").value;
  let actores = document.getElementById("inputFormActores").value;
  let ano = document.getElementById("inputFormAno").value;
  let clasificacion = document.getElementById("inputFormClasificacion").value;
  let estado = true;
  let favorito = false;

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

const seleccionarFavorito = async (id) =>{
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

crearTablaPeliculas();