const imgPoke2 = document.querySelector('#poke2');
const namePoke2 = document.querySelector('#nombrePoke-rival');
const poke2Tipo = document.querySelector('#tipoRival');
const poke2Ataque = document.querySelector('#ataqueRival');
const poke2Movimientos = document.querySelector('#movimientosRival');

const imgPoke = document.querySelector('#poke');
const namePoke = document.querySelector('#nombrePoke-propio');
const pokeTipo = document.querySelector('#tipoPropio');
const pokeAtaque = document.querySelector('#ataquePropio');
const pokeMovimientos = document.querySelector('#movimientosPropio');

const input = document.querySelector('#input');
const btnElegir = document.querySelector('#btn-poke');
const btnPelear = document.querySelector('#combate');
const fireball = document.querySelector('#fireball');

const getNumRandom = () => {
    let min = Math.ceil(1);
    let max = Math.floor(1000);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const obtenerPokePropio = () => {
    const num = input.value;

    axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`).then((res) => {
        return res.data;
    }).then((res) => {
        imgPoke.src = res.sprites.back_default;
        pokeTipo.innerHTML = res.types[0].type.name;
        namePoke.innerHTML = res.name;
        pokeAtaque.innerHTML = res.stats[1].base_stat;  
        pokeMovimientos.innerHTML = res.moves.slice(0, 4).map(move => move.move.name).join(', ');
    });
}

const obtenerPokeRival = () => {
    const numPokeRival = getNumRandom();

    axios.get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`).then((res) => {
        return res.data;
    }).then((res) => {
        imgPoke2.src = res.sprites.front_default;
        poke2Tipo.innerHTML = res.types[0].type.name;
        namePoke2.innerHTML = res.name;
        poke2Ataque.innerHTML = res.stats[1].base_stat;  
        poke2Movimientos.innerHTML = res.moves.slice(0, 4).map(move => move.move.name).join(', ');
    });
}

const mostrarBolaDeFuego = () => {
    fireball.style.display = 'block';
    fireball.style.animation = 'fireballMove 1s linear forwards';
    fireball.addEventListener('animationend', () => {
        fireball.style.display = 'none';
        fireball.style.animation = ''; // Resetea la animación
    });
}

const combate = () => {
    const ataqueRivale = parseInt(poke2Ataque.textContent);
    const ataquePropio = parseInt(pokeAtaque.textContent);

    mostrarBolaDeFuego();

    setTimeout(() => { // Da tiempo para que la animación se complete antes de mostrar el resultado
        if (ataquePropio > ataqueRivale) {
            alert("¡¡ Ganaste !!");
        } else if (ataquePropio < ataqueRivale) {
            alert("Perdiste");
        } else {
            alert("Empate");
        }
    }, 1000); // Duración de la animación
}

window.addEventListener('load', obtenerPokeRival);
btnElegir.addEventListener('click', obtenerPokePropio);
btnPelear.addEventListener('click', combate);

