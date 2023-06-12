"https://pokeapi.co/api/v2/pokemon/gengar"


const form = document.getElementById("form");
const pokeInput= document.querySelector(".poke-input");
const cardContainer = document.querySelector(".pokemon-container");


const pokemonTemplate = pokemon => {
    return {
    // id, name, tipo, altura, peso, imagen

    name: pokemon.name,
    id: pokemon.id,
    type: pokemon.types,
    height: pokemon.height / 10,
    weight: pokemon.weight / 10,
    img: pokemon.sprites.other.home.front_default,    
};
};

const createTypeCards = (types) => {
	return types
		.map((tipo) => {
			return `<span class="${tipo.type.name} poke__type">${tipo.type.name}</span>`;
		})
		.join(" ");
};

const createPokemonTemplate = pokemon =>{
    const {
        name,
        id,
        type,
        height,
        weight,
        img,

    } = pokemonTemplate(pokemon);
    return `
    <div class="pokemon-container">
        <img
            src="${img}"
        />
        <h2>${name}</h2>
        <div class="tipo-poke">
            ${createTypeCards(type)}
        </div>
        <p class="height">Height: ${height}</p>
        <p class="weight">Weight: ${weight}</p>
     
    </div> 

    `
};




const renderEmptyInput = () => {
    const emptyInputCard = `
    <div class="pokemon-notFound">
    <img src="./assets/img/depositphotos_117086104-stock-photo-restricted-area-for-pokemon.jpg" alt="no se encontro tu busqueda">
    <h2>No olvides ingresar un Número</h2>
    </div>`
    cardContainer.innerHTML = emptyInputCard;
    return
};


const renderErrorInput = () => {
    const errorInputCard = `
    <div class="pokemon-notFound">
    <img src="./assets/img/depositphotos_117086104-stock-photo-restricted-area-for-pokemon.jpg" alt="no se encontro tu busqueda">
    <h2>No se encontro tu Pokemon, probá con otro número!!</h2>
    </div>`
    cardContainer.innerHTML = errorInputCard;
    return
};


const renderPokeCard = pokemon => {
    cardContainer.innerHTML = createPokemonTemplate(pokemon);
  };






const isEmptyInput = () => {
    return pokeInput.value.trim() === "";
};


const isValidPokemon = (pokemon) => {
    return pokemon.id === "404"
};

const isInvalidPokemon = pokemon => !pokemon.id;




const searchPokemon = async e =>{
    e.preventDefault();
    if(isEmptyInput()) {
        renderEmptyInput();
        return
    };
    const fetchedPoke = await requestPoke(pokeInput.value.trim());
    
    if(!fetchedPoke){
        renderErrorInput();
        form.reset();
        return 
    };
    renderPokeCard(fetchedPoke);
    form.reset();


}





const init = () => {
    form.addEventListener("submit", searchPokemon);
}


init()
