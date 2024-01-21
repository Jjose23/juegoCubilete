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
}

// Usuarios
let usuario1 = { nombre: ".", resultados: [], rondasGanadas: 0, historial: [] };
let usuario2 = {
  nombre: "CPU",
  resultados: [],
  rondasGanadas: 0,
  historial: [],
};
//Captura el nombre de Usuario 1
usuario1.nombre = Swal.fire({
  title: "Ingrese su nombre:",
  input: "text",
  showCancelButton: true,
  confirmButtonText: "Aceptar",
  cancelButtonText: "Cancelar",
  inputValidator: (value) => {
    if (!value) {
      return "Por favor, ingrese su nombre";
    }
  },
})
  .then((result) => {
    if (result.isConfirmed) {
      if (!result.value) {
        return "No confirmado";
      } else {
        usuario1.nombre = result.value;
        userName.textContent = usuario1.nombre;
      }
    }
  })
  .catch((error) => {
    return "Hubo un error al cargar su nombre";
  });

let userName = document.querySelector(".user");
let btnLanzar = document.querySelector(".btn-lanzar");
let marcadorUser = document.querySelector(".marcadorUser");
let marcadorCpu = document.querySelector(".marcadorCpu");
let puntuacionUser = document.querySelector(".puntuacion-user");
let puntuacionCpu = document.querySelector(".puntuacion-cpu");
let ganadorRonda = document.querySelector(".ganador-ronda");
let ganador = document.querySelector(".ganador");
let lanza1User = document.querySelector("#lanz1User");
let lanza2User = document.querySelector("#lanz2User");
let lanza3User = document.querySelector("#lanz3User");
let lanza1Cpu = document.querySelector("#lanz1Cpu");
let lanza2Cpu = document.querySelector("#lanz2Cpu");
let lanza3Cpu = document.querySelector("#lanz3Cpu");
let imagen = document.querySelector("#imagenApi");
let mensajeDeError =document.querySelector("#mensajeDeError")

// Agrega funcionalidad al boton "Lanzar Cubilete"
btnLanzar.addEventListener("click", function () {
  if (cantidadDeLanzamientos < 3 && typeof usuario1.nombre === "string") {
    lanzarCubilete(usuario1);
    lanzarCubilete(usuario2);
    cantidadDeLanzamientos++;
    //Muestra y almacena la puntuacion obtenida en cada ronda
    puntuacionUser.textContent = `${usuario1.nombre} lanza los dados y obtiene...${usuario1.resultados}`;
    puntuacionCpu.textContent = `${usuario2.nombre} lanza los dados y obtiene...${usuario2.resultados}`;

    if (usuario1.resultados.reduce((a, b) => a + b, 0) ===
      usuario2.resultados.reduce((a, b) => a + b, 0)) {
      ganadorRonda.textContent = `Empate, deben volver a lanzar`;
    } else {
      const ganador =
        usuario1.resultados.reduce((a, b) => a + b, 0) >
        usuario2.resultados.reduce((a, b) => a + b, 0)
          ? (usuario1.rondasGanadas++, usuario1.nombre)
          : (usuario2.rondasGanadas++, "CPU");

      ganadorRonda.textContent = `El usuario ${ganador} gana la ronda`;
      marcadorUser.textContent = usuario1.rondasGanadas;
      marcadorCpu.textContent = usuario2.rondasGanadas;
    }
    //Añade todos los resultados de cada usuario en historial y lo almacena en localStorage en formato JSON
    usuario1.historial.push(usuario1.resultados);
    usuario2.historial.push(usuario2.resultados);
    localStorage.setItem("Usuario", JSON.stringify(usuario1));
    localStorage.setItem("CPU", JSON.stringify(usuario2));
  }
  // Si no cumple los parametros establecidos para comenzar el juego entonces recarga la pagina hasta que se ingresen los valores necesarios
  else {
    location.reload();
  }
  // Al termionar el juego carga los valores obtenidos por Lanzamientos y muestra una imagen randon consumiendo una Api 
  if (cantidadDeLanzamientos === 3) {
    lanza1User.textContent = usuario1.historial[0];
    lanza2User.textContent = usuario1.historial[1];
    lanza3User.textContent = usuario1.historial[2];
    lanza1Cpu.textContent = usuario2.historial[0];
    lanza2Cpu.textContent = usuario2.historial[1];
    lanza3Cpu.textContent = usuario2.historial[2];

    const url = "https://dog.ceo/api/breeds/image/random";
    fetch(url)
      .then((respuesta) => respuesta.json())
      .then((json) => {
        const message = json.message;
        imagen.src = message;
      })
      .catch((error) => {
        mensajeDeError.innerText = "Hubo un error al cargar la imagen.";
  });
  
  }
  // Condionales para obtener el ganador por mayoria de rondas ganadas
  if (
    cantidadDeLanzamientos === 3 &&
    usuario1.rondasGanadas > usuario2.rondasGanadas
  ) {
    Swal.fire({
      title: "Fin del Juego",
      text: `Ha ganado el juego ${usuario1.nombre} por mayoria de puntos`,
      icon: "info",
      confirmButtonText: "OK",
    });
  } else if (cantidadDeLanzamientos === 3) {
    Swal.fire({
      title: "Fin del Juego",
      text: `Ha ganado el juego ${usuario2.nombre} por mayoria de puntos `,
      icon: "info",
      confirmButtonText: "OK",
    });
  }
});
