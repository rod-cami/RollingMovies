console.log('Funciona');

fetch('http://localhost:3000/peliculas/2')
  .then(response => response.json())
  .then(json => console.log(json));

const obtenerPeliculas = async () =>{
  const resultado = await fetch('http://localhost:3000/peliculas');
  const peliculas = await resultado.json();
  return peliculas;
}

const agregarPelicula = async (nombre, descripcion,categoria,duracion,portada,direccion,actores,ano,clasificacion,estado,favorito) =>{
  const resultado = await fetch('http://localhost:3000/peliculas',{
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

  const res = await resultado.json();
  console.log(res);
}

const crearPelicula = async () =>{
  let nombre = document.getElementById("inputPostNombre").value;
  let descripcion = document.getElementById("inputPostDescripcion").value;
  let categoria = document.getElementById("inputPostCategoria").value;
  let duracion = document.getElementById("inputPostDuracion").value;
  let portada = document.getElementById("inputPostPortada").value;
  let direccion = document.getElementById("inputPostDireccion").value;
  let actores = document.getElementById("inputPostActores").value;
  let ano = document.getElementById("inputPostAno").value;
  let clasificacion = document.getElementById("inputPostClasificacion").value;
  let estado = true;
  let favorito = false;
  await agregarPelicula(nombre,descripcion,categoria,duracion,portada,direccion,actores,ano,clasificacion,estado,favorito);
}


const crearTablaPeliculas = async () =>{
  let peliculas = await obtenerPeliculas();
  console.log(peliculas);
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
      <button type="button" class="btn btn-info m-1" onclick="modificarPelicula(${pelicula.id})" data-bs-toggle="modal" data-bs-target="#myModal"><i class="bi bi-pencil text-white"></i></button>
      <button type="button" class="btn btn-warning m-1"><i class="bi bi-star text-white"></i></button>
      </td>
    </tr>
    `
  ))

  cuerpoTabla.innerHTML = cuerpo;
}

crearTablaPeliculas();


const modificarPelicula = async (id) =>{
  let peliculas = await obtenerPeliculas();
  const formModificar = document.getElementById('formModificarPelicula')

  const form = peliculas

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

const changePelicula = (id) => {
  fetch(`http://localhost:3000/peliculas/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      nombre: "Peliculon",
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

