console.log('You have connected...')

document.addEventListener("DOMContentLoaded", () =>{

    let generateBtn = document.querySelector('#generate-pokemon');
    generateBtn.addEventListener('click', renderEverything)

    getDeleteBtn().addEventListener('click', deleteEverything);
})

function renderEverything(){
    let allPokemonContainer = document.querySelector('#poke-container')
    allPokemonContainer.innerText = "";
    fetchKantoPokemon();

    getDeleteBtn().style.display = 'block'
}

function getDeleteBtn(){
    return document.querySelector('#delete-btn')
}


function fetchKantoPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=30')
    .then(response => response.json())
    .then(function(allpokemon){
        allpokemon.results.forEach(function(pokemon){
            fetchPokemonData(pokemon);
        })
    })
}

function fetchPokemonData(pokemon){
    let url = pokemon.url 
                                
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData){
        renderPokemon(pokeData)
    })
}


function renderPokemon(pokeData){
    let allPokemonContainer = document.getElementById('poke-container');
    let pokeContainer = document.createElement("div") 
    pokeContainer.classList.add('ui', 'card');


    let pokeName = document.createElement('h3') 
    pokeName.innerText = pokeData.name

    let pokeNumber = document.createElement('h3')
    pokeNumber.innerText = `#${pokeData.id}`
   
    let pokeTypes = document.createElement('ul')

    createTypes(pokeData.types, pokeTypes)
    
    pokeContainer.append(pokeNumber, pokeName);
    createPokeImage(pokeData.id, pokeContainer);
    pokeContainer.append(pokeTypes);     
    allPokemonContainer.appendChild(pokeContainer);   
}

function createTypes(types, ul){
    types.forEach(function(type){
        let typeLi = document.createElement('li');
        typeLi.innerText = type['type']['name'];
        ul.append(typeLi)
    })
}

function createPokeImage(pokeID, containerDiv){
    let pokeImgContainer = document.createElement('div')
    pokeImgContainer.classList.add('image')

    let pokeImage = document.createElement('img')
    pokeImage.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`

    pokeImgContainer.append(pokeImage);
    containerDiv.append(pokeImgContainer);
}

function deleteEverything(event){
    event.target.style = 'none';
    let allPokemonContainer = document.querySelector('#poke-container')
    allPokemonContainer.innerText = ""

    let generateBtn = document.createElement('button')
    generateBtn.innerText = "Generate Pokemon"
    generateBtn.id = 'generate-pokemon'
    generateBtn.classList.add('ui', 'secondary', 'button')
    generateBtn.addEventListener('click', renderEverything);

    allPokemonContainer.append(generateBtn)
}