const createCard = async () => {
  const personajes = await getPersonajes();
  const div = document.getElementById('card');

  const cards = personajes.map(personaje => (`
    <div class="card m-3 estiloCard" style="width: 18rem;">
      <img src=${personaje.image} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${personaje.name}</h5>
        <p class="card-text">Status: ${personaje.status}</p>
        <p class="card-text">Species: ${personaje.species}</p>
        <button onclick='redirectDetail(${personaje.id})' class="btn btn-primary">Go somewhere</button>
      </div>
    </div>
  `))

  div.innerHTML = cards
}

createCard()

const redirectDetail = (id) => {
  localStorage.setItem('id', id)
  window.location.href = '/personajes.html'
}