const getPokemon = async (pokemon) => {
  const pokemonName = pokemon.toLowerCase();
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  return await response.json();
};

const getPokemonType = async (typeUrl) => {
  const response = await fetch(typeUrl);
  return await response.json();
}

// TODO: Show Pokemon Evolution

/* const getPokemonSpecie = async (specieUrl) => {
  const response = await fetch(specieUrl);
  return await response.json();
} */

/* const getEvolutionChain = async (evolutionUrl) => {
  const response = await fetch(evolutionUrl);
  return await response.json();
} */

const createPokemonImg = (imgUrl, altPokemonName) => {
  const newImg = document.createElement('img');
  const imgContainer = document.getElementById('pokemon-img-container');
  newImg.src = imgUrl;
  newImg.alt = altPokemonName;
  imgContainer.appendChild(newImg);
}

const createListElement = (listText = '', listClasses = '') => {
  const newLi = document.createElement('li');
  newLi.innerText = listText;
  newLi.className = listClasses;
  return newLi;
}

const createStatusProgressBar = (statusValue) => {
  const newProgress = document.createElement('progress');
  newProgress.value = statusValue;
  newProgress.max = 255;
  return newProgress;
}

const formatId = (id) => {
  const idString = id.toString();
  if (idString.length === 1) return `00${idString}`;
  if (idString.length === 2) return `0${idString}`;
  if (idString.length === 3) return idString;
}

const toCapitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const formatAbilitiesText = (ability) => ability.split('-').map((value) => toCapitalize(value)).join(' ');


const renderPokemon = async (event) => {
  const test = await getPokemon(event.target.value);
  const pokemonElementName = document.getElementById('pokemon-name');
  const pokemonId = document.getElementById('pokemon-id');
  const heightValue = document.getElementById('height-value');
  const weightValue = document.getElementById('weight-value');
  const abilitiesList = document.getElementById('pokemon-abilities');
  const statsProgressBar = document.getElementById('pokemon-stats-progress-bar');
  const typesElement = document.getElementById('types');
  const weaknessElement = document.getElementById('weakness');

  const {species: {name: pokemonName, url: specieUrl}, id, height, weight, abilities, types, stats} = test;

  pokemonElementName.innerText = toCapitalize(pokemonName);
  pokemonId.innerText = `#${formatId(id)}`;
  heightValue.innerText = `${height/10} m`;
  weightValue.innerText = `${weight/10} kg`;

  createPokemonImg(`https://pokeres.bastionbot.org/images/pokemon/${id}.png`, pokemonName);
  abilities.forEach(({ability: {name: abilityName}}) => {
    abilitiesList.appendChild(createListElement(formatAbilitiesText(abilityName), 'mx-2'));
  })

  stats.forEach(({base_stat}) => {
    const newList = createListElement();
    newList.appendChild(createStatusProgressBar(base_stat))
    statsProgressBar.appendChild(newList);
  })

  types.forEach(({type: {name: typeName}}) => {
    typesElement.appendChild(createListElement(toCapitalize(typeName), 'px-4 py-1'));
  })
  console.log(types);
  
}

const getPokemonByName = () => {
  const pokemonInput = document.getElementById('pokemon-input');
  const mainContent = document.getElementById('main-content');
  pokemonInput.addEventListener('keypress', async (event) => {
    if(event.key === 'Enter'){
      try {
        await renderPokemon(event);
        mainContent.removeAttribute('hidden')
        event.target.value = '';
      } catch (error){}
    }
  })
}

window.onload = async () => {
  getPokemonByName();
}