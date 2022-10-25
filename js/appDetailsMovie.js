
let id = localStorage.getItem('id');
window.addEventListener('load', ()=>{llenarPagina(id)});

let navAdmin = document.getElementById("navAdmin");
let navUser = document.getElementById("navUser");
let nombreUsuarioNav = document.getElementById('nombreUsuarioNav')

let nombreUsuarioNavbar = localStorage.getItem('name')
let tipo = localStorage.getItem('role');

window.addEventListener('load', ()=>{
  if (tipo == "admin") {
    navAdmin.className= 'nav-item';
  }else{
    navUser.className='nav-item';
    nombreUsuarioNav.innerHTML = nombreUsuarioNavbar;
  }
})
const limpiarLocalStorage = () =>{
  localStorage.clear();
}

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
  <div class="row p-2">
  <div class="container p-1 col-xxl-6 col-xl-6 col-lg-6 col-sm-12 col-md-12">
    <div class="inside-detailsPage ms">
        <div class="">A CONTINUACIÓN...</div>
        <div class="line1"></div>
        <div class="mt-3"><h1>${pelicula.nombre}</h1></div>
        <p>${pelicula.ano}‧ ${pelicula.categoria} ‧ ${pelicula.duracion}</p>
          <div class="btn1">
              <a href="#"><i class="fas fa-play"></i>Ver Ahora</a>
              <a class="ms-2" href="${pelicula.trailer}" target="_blank"><i class="fas fa-play"></i>Trailer</a>
          </div>
          <p class="detailsMovie mt-4">${pelicula.descripcion}</p>
      </div>
  </div>
  <div class="container p-1 col-xxl-6 col-xl-6 col-lg-6 col-sm-12 col-md-12">
    <div class="poster">
        <img class="" src="${pelicula.portada}" alt="">
      </div>
  </div>
</div>
    
  `;
  contenedor.innerHTML = contenido;
  
}