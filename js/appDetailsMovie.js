
let id = localStorage.getItem('id');
window.addEventListener('load', ()=>{llenarPagina(id)});

const obtenerUnaPelicula = async (id) =>{
  const resultado = await fetch(`http://localhost:3000/peliculas/${id}`);
  const pelicula = await resultado.json();
  return pelicula;
}

const llenarPagina = async (id) =>{
  let pelicula = await obtenerUnaPelicula(id);
  let contenedor = document.getElementById('contenidoDetalles')

  let contenido = 
  `
  <div class="detailsPage">
            <div class="inside-detailsPage">
              <span>A CONTINUACIÓN...</span>
            <div class="line1"></div>
            <h1>${pelicula.nombre}</h1>
            <p>${pelicula.ano}‧ ${pelicula.categoria} ‧ ${pelicula.duracion}</p>
              <div class="btn1">
              <a href="#"><i class="fas fa-play"></i>Ver Ahora</a>
              <a href="${pelicula.trailer}" target="_blank"><i class="fas fa-play"></i>Trailer</button></a>
              </div>
              <p class="detailsMovie">${pelicula.descripcion}</p>
              </div>
            </div>
        </div>
    <div class="poster">
        <img src="${pelicula.portada}" alt="">
    </div>
  
  `;

  contenedor.innerHTML = contenido;
  
}