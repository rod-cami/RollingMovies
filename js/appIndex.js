const obtenerPeliculas = async () =>{
  const resultado = await fetch('http://localhost:3000/peliculas');
  const peliculas = await resultado.json();
  return peliculas;
}

obtenerPeliculas();

const accion = document.getElementById('categoriaAccion');
const romance = document.getElementById('categoriaRomance');
const terror = document.getElementById('categoriaTerror');
const fantasia = document.getElementById('categoriaFantasia');
const infantil = document.getElementById('categoriaInfantiles');

const llenarCategorias = async () =>{
  let peliculas = await obtenerPeliculas();
  let i = 0, j=0, q=0, p=0, k=0;
  let arrayAccion=[];
  let arrayRomance=[];
  let arrayTerror=[];
  let arrayFantasia=[];
  let arrayInfantiles=[];

  peliculas.map(x =>{
    let categoria = x.categoria;
    if ((categoria.toLowerCase()).includes('accion') && x.estado === true) {
      arrayAccion[i] = 
      `
      <div class="card m-2" style="width: 18rem;">
        <img src="${x.portada}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title text-center">${x.nombre}</h5>
        </div>
      </div>
      `;
      i++;
    }
    
    if ((categoria.toLowerCase()).includes('romance') && x.estado === true) {
      arrayRomance[j] = 
      `
      <div class="card m-2" style="width: 18rem;">
        <img src="${x.portada}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title text-center">${x.nombre}</h5>
        </div>
      </div>
      `;
      j++;
    }
    
    if ((categoria.toLowerCase()).includes('terror') && x.estado === true) {
      arrayTerror[q] = 
      `
      <div class="card m-2" style="width: 18rem;">
        <img src="${x.portada}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title text-center">${x.nombre}</h5>
        </div>
      </div>
      `;
      q++;
    }
    
    if ((categoria.toLowerCase()).includes('fantasia') && x.estado === true) {
      arrayFantasia[p] = 
      `
      <div class="card m-2" style="width: 18rem;">
        <img src="${x.portada}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title text-center">${x.nombre}</h5>
        </div>
      </div>
      `;
      p++;
    }
    
    if ((categoria.toLowerCase()).includes('infantil') && x.estado === true) {
      arrayInfantiles[k] = 
      `
      <div class="card m-2" style="width: 18rem;">
        <img src="${x.portada}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title text-center">${x.nombre}</h5>
        </div>
      </div>
      `;
      k++;
    }
  });
  accion.innerHTML = arrayAccion.join('');
  terror.innerHTML = arrayTerror.join('');
  romance.innerHTML = arrayRomance.join('');
  fantasia.innerHTML = arrayFantasia.join('');
  infantil.innerHTML = arrayInfantiles.join('');

  realizarCarrousel();
}

const llenarPortada = async () =>{
  let peliculas = await obtenerPeliculas();
  let pelicula, portadaPeli;
  let portadaPeliculaFavorita = document.getElementById("portadaPeliculaFavorita");

  peliculas.map(x => {
    if (x.favorito === true) {
      console.log(x);
      pelicula = x;
    }
  })

  portadaPeli = `<div class"contenedor">
    <img src="https://www.themoviedb.org/t/p/original/leeHVfEoza4GaZio1tIzevz6XYc.jpg" class="position-relative w-100 imgPortada col-md-12" alt="Asesino-sin-memoria">
    <div class="text-white">
      <div class="datosPortada col-md-6">
        <h5 class="text-peliportada1 fs-3">${pelicula.nombre}</h5>
        <h6 class="text-peliportada2 col-md-6">${pelicula.descripcion}</h6>
        <button class="btn1">Reproducir</button>
      </div>
    </div>
    </div>
  `;

  portadaPeliculaFavorita.innerHTML = portadaPeli;
}

llenarCategorias();
llenarPortada();

const realizarCarrousel = () =>{
  new Glider(document.querySelector('.listaPeliculasAccion'),{
    slidesToScroll: 1,
    slidesToShow: 5.5,
    arrows: {
      prev: '.btn-anterior-Accion',
      next: '.btn-siguiente-Accion'
    }
  });
  new Glider(document.querySelector('.listaPeliculasRomance'),{
    slidesToScroll: 1,
    slidesToShow: 5.5,
    arrows: {
      prev: '.btn-anterior-Romance',
      next: '.btn-siguiente-Romance'
    }
  });
  new Glider(document.querySelector('.listaPeliculasTerror'),{
    slidesToScroll: 1,
    slidesToShow: 5.5,
    arrows: {
      prev: '.btn-anterior-Terror',
      next: '.btn-siguiente-Terror'
    }
  });
  new Glider(document.querySelector('.listaPeliculasFantasia'),{
    slidesToScroll: 1,
    slidesToShow: 5.5,
    arrows: {
      prev: '.btn-anterior-Fantasia',
      next: '.btn-siguiente-Fantasia'
    }
  });
  new Glider(document.querySelector('.listaPeliculasInfantiles'),{
    slidesToScroll: 1,
    slidesToShow: 5.5,
    arrows: {
      prev: '.btn-anterior-Infantiles',
      next: '.btn-siguiente-Infantiles'
    }
  });
}