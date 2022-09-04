//Variaveis globais

const pokemonName = document.querySelector(".pokemon_name")
const pokemonNumber = document.querySelector(".pokemon_number")
const pokemonImage = document.querySelector(".pokemon_image")
const pokemonDesc = document.querySelector(".pokemon_description")
const form = document.querySelector(".form")
const input = document.querySelector(".input_search")
const spanType = document.querySelector(".spanType")

const modal = document.querySelector('.modal-container')

const btnDesc = document.querySelector(".btn-desc")
const btnPrev = document.querySelector(".btn-prev")
const btnNext = document.querySelector(".btn-next")

const liHp = document.querySelector(".hp")
const liAttack = document.querySelector(".attack")
const liDefense = document.querySelector(".defense")
const liSpecialAttack = document.querySelector(".special-attack")
const liSpecialDefense = document.querySelector(".special-defense")
const liSpeed = document.querySelector(".speed")

let searchPokemon = 1


function openModal() {
    modal.classList.add('active')
}
function closeModal() {
    modal.classList.remove('active')
}


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data
    }

}
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''
    const data = await fetchPokemon(pokemon)
    if (data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = ''
        searchPokemon = data.id
        descPokemon(`${searchPokemon}`)
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not Found :('
        pokemonNumber.innerHTML = ''
    }
}
const descPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon)
    if (data) {
        if (data['types'].length > 1) {
            spanType.innerHTML = `<span>${data['types']['0']['type']['name']} | ${data['types']['1']['type']['name']}</span>`
        } else {
            spanType.innerHTML = `<span> ${data['types']['0']['type']['name']}</span>`
        }

        data['stats'].forEach(stat => {
            if (stat.stat.name == 'hp') {
                liHp.innerHTML = `${stat.stat.name} = ${stat.base_stat}`
            } else if (stat.stat.name == 'attack') {
                liAttack.innerHTML = `${stat.stat.name} = ${stat.base_stat}`
            } else if (stat.stat.name == 'defense') {
                liDefense.innerHTML = `${stat.stat.name} = ${stat.base_stat}`
            } else if (stat.stat.name == 'special-attack') {
                liSpecialAttack.innerHTML = `${stat.stat.name} = ${stat.base_stat}`
            } else if (stat.stat.name == 'special-defense') {
                liSpecialDefense.innerHTML = `${stat.stat.name} = ${stat.base_stat}`
            } else {
                liSpeed.innerHTML = `${stat.stat.name} = ${stat.base_stat}`
            }
        });
    } else {
        pass
    }
}
form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value)
    descPokemon(input.value)
})
btnPrev.addEventListener('click', () => {
    if (searchPokemon === 1) {
        return
    } else {
        searchPokemon--
        renderPokemon(`${searchPokemon}`)
        descPokemon(`${searchPokemon}`)
    }
})
btnNext.addEventListener('click', () => {
    searchPokemon++
    renderPokemon(`${searchPokemon}`)
    descPokemon(`${searchPokemon}`)

})


renderPokemon(`${searchPokemon}`);