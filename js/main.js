
const dados = ["1", "2", "3", "4", "5", "6"];
let cantidadDeLanzamientos = 0; // cantidad de lanzamientos
// Función para obtener valores aleatorios permitiendo repeticiones dentro del mismo array
function obtenerValoresAleat(dados, cantidad) {
    const resultados = [];

    for (let i = 0; i < cantidad; i++) {
    const dadoAleatorio = dados[Math.floor(Math.random() * dados.length)];
    resultados.push(dadoAleatorio);
    }

    return resultados;
}

// Función para que un usuario realice sus lanzamientos
function lanzarCubilete(usuario) {
  // Elimina los resultados anteriores antes de agregar nuevos resultados
    usuario.resultados = [];

  // Agrega nuevos resultados
    usuario.resultados.push(...obtenerValoresAleat(dados, dados.length));
    console.log(`${usuario.nombre} está lanzando el cubilete y obtiene ${usuario.resultados}`);
}

// usuarios
let usuario1 = { nombre: '', resultados: [], rondasGanadas:0, historial:[] };
let usuario2 = { nombre: 'CPU', resultados: [], rondasGanadas:0, historial:[] };
usuario1.nombre = prompt("Por favor, ingrese su nombre:");

let userName = document.querySelector('.user');
let btnLanzar = document.querySelector('.btn-lanzar');
let marcadorUser = document.querySelector('.marcadorUser')
let marcadorCpu = document.querySelector('.marcadorCpu')
let puntuacionUser = document.querySelector('.puntuacion-user')
let puntuacionCpu = document.querySelector('.puntuacion-cpu')
let ganadorRonda = document.querySelector('.ganador-ronda')
let ganador = document.querySelector('.ganador')

userName.textContent =usuario1.nombre;
btnLanzar.addEventListener('click', function() {

  if (cantidadDeLanzamientos < 3) {
    lanzarCubilete(usuario1);
    lanzarCubilete(usuario2);
    cantidadDeLanzamientos++;
    //Muestra la puntuacion de cada usuario en el navegador
    puntuacionUser.textContent = `${usuario1.nombre} lanza los dados y obtiene...${usuario1.resultados}`;
    puntuacionCpu.textContent = `${usuario2.nombre} lanza los dados y obtiene...${usuario2.resultados}`;
    
    if (usuario1.resultados === usuario2.resultados) {
        console.log('Empate');
    } else {
        const ganador = usuario1.resultados.reduce((a, b) => a + b, 0) > usuario2.resultados.reduce((a, b) => a + b, 0)
            ? (usuario1.rondasGanadas++, usuario1.nombre)
            : (usuario2.rondasGanadas++, 'CPU');

        ganadorRonda.textContent = `El usuario ${ganador} gana la ronda`;
        marcadorUser.textContent = usuario1.rondasGanadas;
        marcadorCpu.textContent = usuario2.rondasGanadas;
    }
    //añade todos los resultados de cada usuario en historial y lo almacena en localStorage en formato JSON
    usuario1.historial.push(usuario1.resultados)
    usuario2.historial.push(usuario2.resultados)
    localStorage.setItem('Usuario', JSON.stringify(usuario1))
    localStorage.setItem('CPU', JSON.stringify(usuario2))
}
// Condionales para obtener el ganador por mayoria de rondas ganadas
if (cantidadDeLanzamientos === 3 && usuario1.rondasGanadas > usuario2.rondasGanadas) {
  ganador.textContent = `El usuario ${usuario1.nombre} por mayoria de puntos ha ganado el juego`;

} else if (cantidadDeLanzamientos === 3) {
  ganador.textContent = `El usuario ${usuario2.nombre} por mayoria de puntos ha ganado el juego`;
}

});