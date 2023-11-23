const dados = ["1", "2", "3", "4", "5", "6"];
const cantidadDeLanzamientos = 3; // cantidad de lanzamientos

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
let usuario1 = { nombre: 'Usuario1', resultados: [], rondasGanadas:0 };
let usuario2 = { nombre: 'Usuario2', resultados: [], rondasGanadas:0 };

// Realiza lanzamientos  para cada usuario
for (let lanzamiento = 1; lanzamiento <= cantidadDeLanzamientos; lanzamiento++) {
    lanzarCubilete(usuario1);
    lanzarCubilete(usuario2);

  // Condiciones para determinar el ganador de la ronda
    if (usuario1.resultados === usuario2.resultados) {
    console.log('Empate');
    } else if (usuario1.resultados.reduce((a, b) => a + b, 0) > usuario2.resultados.reduce((a, b) => a + b, 0)) {
    console.log('Usuario1 gana la ronda');
    usuario1.rondasGanadas++;
    } else {
    console.log('Usuario2 gana la ronda');
    usuario2.rondasGanadas++
    }
}
console.log('------------------------------------------------');
if(usuario1.rondasGanadas > usuario2.rondasGanadas){
    console.log('-------------Usuario1 gana el juego-------------');
    console.log('------------------------------------------------');
}else{console.log('-------------Usuario2 gana el juego-------------');
console.log('------------------------------------------------');}