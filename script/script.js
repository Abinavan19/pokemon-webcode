const lists__pokemons = document.getElementById('lists__pokemons')
let url = 'https://pokeapi.co/api/v2/pokemon'
const pokemons_number = 52;
const search = document.getElementById("search");
const form = document.getElementById("form");
let templateHtml = '';
const buttons = document.getElementById('buttons')
let BtnNext;
let BtnPrevious;


const GetPokemons = async (url) => {
  lists__pokemons.innerHTML = `
  <div class="lds-roller"></div>
  `
  try {
    const response = await fetch(url)
    const results = await response.json();
    DataPokemons(results.results)
    BtnPrevious = results.previous ? `<button class="btn" data-url=${results.previous}>⏮</button>` : ''
    BtnNext = results.next ? `<button class="btn" data-url=${results.next}>⏩</button>` : ''
    buttons.innerHTML = BtnPrevious + " " + BtnNext;
  } catch (error) {
    console.log(error)
  }
}

const DataPokemons = async (urlPokemon) => {
  lists__pokemons.innerHTML = ''
  for (let index of urlPokemon) {
    try {
      const res = await fetch(index.url)
      const result = await res.json();
      templateHtml = `
    <div class="pokemon__img">
      <img src=${result.sprites.other.dream_world.front_default} alt=${result.name}/>
      <p>ID :${result.id}</p>
      <p>Name :${result.name}</p>
     <span id= pokedetails">
      <p>Base :${result.base_experience}</p>
      <p>Height :${result.height}</p>
      <p>Weight :${result.weight}</p>
      <p>Abilities :${result.abilities[1].ability.name}</p>
      <p>HP :${result.stats[0].base_stat}</p>
      <p>Attack :${result.stats[1].base_stat}</p>
      <p>Defence :${result.stats[2].base_stat}</p>
      </span>
    </div>
    `
      lists__pokemons.innerHTML += templateHtml
    } catch (error) {
      console.log(error)
    }
  }
}

GetPokemons(url)

buttons.addEventListener('click', (e) => {
  console.log(e.target.dataset.url)
  GetPokemons(e.target.dataset.url)
})