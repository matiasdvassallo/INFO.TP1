//--------------------------------------------------------------------------------------MENU DESPLEGABLE
let juegos = document.querySelector('#juegosnav');
let navdos = document.querySelector('#ul2');
let menu = false

juegos.addEventListener('click', (e) => {

    e.preventDefault()
    if (menu == false) {
    navdos.innerHTML = '<li class="mainLi"><a href="juego1.html#tablero" target="_self"><span>Chancho va(mpiro)</span></a></li>' +
			            '<li class="mainLi"><a href="juego2.html#dados" target="_self"><span>Dados Sangrientos</span></a></li>' +
						'<li class="mainLi"><a href="juego3.html#inicioPreguntas" target="_self"><span>Netflix and Kill</span></a></li>';
    menu = true;
    } else {
        navdos.innerHTML = '';
        menu = false;
    };

});
//--------------------------------------------------------------------------------------MENU DESPLEGABLE

//------------------------------------------------Declaraciones

// Pantallas
const inicioPreguntas = document.querySelector('#inicioPreguntas');
const juegoPreguntas = document.querySelector('#juegoPreguntas');
const finPreguntas = document.querySelector('#finPreguntas');

// Información
const textoPregunta = document.querySelector('#textoPregunta');
const numeroPregunta = document.querySelector('#numeroPregunta');
const vidasEl = document.querySelector('#vidas');
const puntajeEl = document.querySelector('#puntaje');
const tiempoEl = document.querySelector('#tiempo');
const mensajeFinal = document.querySelector('#mensajeFinal');
const puntajeFinal = document.querySelector('#puntajeFinal');
const puntosPorDificultad = {
    facil: 10,
    medio: 20,
    dificil: 30
};

// Botones
const botonFacil = document.querySelector('#facil');
const botonMedio = document.querySelector('#medio');
const botonDificil = document.querySelector('#dificil');
const botonReinicio = document.querySelector('#btnReiniciarPreguntas');
const botonesOpciones = [];
for (let i = 0; i < 4; i++) {
    botonesOpciones.push(document.querySelector('#opcion-' + i));
}

// Variables del juego
let dificultad = '';
let preguntas = [];
let indicePregunta = 0;
let indiceCorrectaActual = 0;
let vidas = 3;
let puntaje = 0;
let tiempoRestante = 10;
let intervaloTiempo;
let respuestaCorrectaActual = '';
let opcionesActuales = ['', '', '', ''];

// Limpiador de elementos HTML
const divDecodificador = document.querySelector('#decodificador');

//------------------------------------------------Funciones

// Trae las 10 preguntas de la API según la dificultad elegida, y arranca la partida
async function cargarPreguntas(dificultadElegida) {
    
    dificultad = dificultadElegida;
    
    let dificultadAPI;
    if (dificultadElegida === 'facil') {
        dificultadAPI = 'easy';
    } else if (dificultadElegida === 'medio') {
        dificultadAPI = 'medium';
    } else {
        dificultadAPI = 'hard';
    }
    
    // Arma la URL completa. La categoría 11 es de Películas.
    const url = 'https://opentdb.com/api.php?amount=10&category=11&difficulty=' + dificultadAPI + '&type=multiple';
    
    // Realiza la solicitud y espera la respuesta
    const respuesta = await fetch(url);

    // Convierte el JSON en objetos y arrays
    const datos = await respuesta.json();

    // Si la API no pudo responder bien (por ejemplo, por el límite de pedidos), se avisa y no se sigue, para no romper el resto del juego
    if (datos.response_code !== 0) {
        alert('Hubo un problema al cargar las preguntas. Esperá unos segundos y probá de nuevo.');
        return;
    }

    // Guarda las preguntas
    preguntas = datos.results;

    inicioPreguntas.style.display = 'none';
    juegoPreguntas.style.display = 'block';

    mostrarPregunta();
}

// Limpia el código HTML del texto
function decodificarTexto(texto) {
    divDecodificador.innerHTML = texto;
    return divDecodificador.innerText;
}

// Saca un elemento al azar de un array, y lo devuelve
function sacarRandom(x) {
    const indice = Math.floor(Math.random() * x.length);
    const rta = x.splice(indice, 1)[0];
    return rta;
}

// Junta la respuesta correcta y las 3 incorrectas en un solo array y lo randomiza
function mezclarOpciones(correcta, incorrectas) {
    const todas = [correcta, incorrectas[0], incorrectas[1], incorrectas[2]];
    const mezcladas = [];
    
    for (let i = 0; i < 4; i++) {
        mezcladas.push(sacarRandom(todas));
    }
    
    return mezcladas;
}

// Muestra en pantalla la pregunta actual, sus 4 opciones mezcladas, y arranca el cronómetro
function mostrarPregunta() {
    
    const pregunta = preguntas[indicePregunta];
    const preguntaTexto = decodificarTexto(pregunta.question);
    const correcta = decodificarTexto(pregunta.correct_answer);
    const incorrecta1 = decodificarTexto(pregunta.incorrect_answers[0]);
    const incorrecta2 = decodificarTexto(pregunta.incorrect_answers[1]);
    const incorrecta3 = decodificarTexto(pregunta.incorrect_answers[2]);
    
    respuestaCorrectaActual = correcta;
    opcionesActuales = mezclarOpciones(correcta, [incorrecta1, incorrecta2, incorrecta3]);

    textoPregunta.innerText = preguntaTexto;
    numeroPregunta.innerText = 'Pregunta ' + (indicePregunta + 1) + ' de ' + preguntas.length;
    vidasEl.innerText = 'Vidas: ' + vidas;
    puntajeEl.innerText = 'Puntaje: ' + puntaje;
    
    botonesOpciones.forEach((boton, indice) => {
        boton.style.backgroundColor = '';
        boton.style.color = '';
        boton.innerText = opcionesActuales[indice];
    });
    
    iniciarTemporizador();
}

// Arranca un cronómetro de 15 segundos para la pregunta actual
function iniciarTemporizador() {
    tiempoRestante = 15;
    tiempoEl.innerText = 'Tiempo: ' + tiempoRestante;
    
    clearInterval(intervaloTiempo);
    
    intervaloTiempo = setInterval(function() {
        tiempoRestante--;
        tiempoEl.innerText = 'Tiempo: ' + tiempoRestante;
        
        if (tiempoRestante <= 0) {
            clearInterval(intervaloTiempo);
            perderVida(); 
        }
    }, 1000);
}

// Compara la opción que eligió el jugador contra la correcta, y suma puntos o resta una vida
function verificarRespuesta(indiceOpcionElegida) {
    
    clearInterval(intervaloTiempo);
    
    const opcionElegida = opcionesActuales[indiceOpcionElegida];
    const botonElegido = document.querySelector('#opcion-' + indiceOpcionElegida);
    let botonCorrecto;

    for (let i = 0; i < 4; i++) {
            if (opcionesActuales[i] === respuestaCorrectaActual) {
                botonCorrecto = document.querySelector('#opcion-' + i);
                break;
            }
        }

    if (opcionElegida === respuestaCorrectaActual) {
        botonElegido.style.backgroundColor = 'gold';
        setTimeout(() => sumarPuntos(), 1000);
    } else {
        botonElegido.style.backgroundColor = 'darkred';
        botonElegido.style.color = 'black';
        botonCorrecto.style.backgroundColor = 'gold';
        setTimeout(() => perderVida(), 1000);
    }
}

// Suma puntos según la dificultad elegida
function sumarPuntos() {
    if (dificultad === 'facil') {
        puntaje += 10;
    } else if (dificultad === 'medio') {
        puntaje += 20;
    } else {
        puntaje += 30;
    }
    siguientePreguntaOFin();
}

// Resta una vida
function perderVida() {
    vidas--;
    
    if (vidas <= 0) {
        terminarJuego(false); // false = perdió
    } else {
        siguientePreguntaOFin();
    }
}

// Avanza a la próxima pregunta, o termina el juego
function siguientePreguntaOFin() {
    indicePregunta++;
    
    if (indicePregunta >= preguntas.length) {
        terminarJuego(true); // true = ganó (respondió todas sin quedarse sin vidas)
    } else {
        mostrarPregunta();
    }
}

// Muestra la pantalla final, con el mensaje de victoria o derrota y el puntaje
function terminarJuego(resultado) {
    juegoPreguntas.style.display = 'none';
    finPreguntas.style.display = 'block';
    
    if (resultado == true) {
        mensajeFinal.innerText = '¡Ganaste!';
    } else {
        mensajeFinal.innerText = 'Perdiste...';
    }
    
    puntajeFinal.innerText = 'Puntaje final: ' + puntaje;

    guardarPuntajeTrivia(puntaje);
}

// Resetea todas las variables del juego a sus valores iniciales, y vuelve a la pantalla de inicio
function reiniciarPreguntas() {
    dificultad = '';
    preguntas = [];
    indicePregunta = 0;
    vidas = 3;
    puntaje = 0;
    tiempoRestante = 15;
    
    clearInterval(intervaloTiempo);
    
    finPreguntas.style.display = 'none';
    inicioPreguntas.style.display = 'block';
}

// Guarda un nuevo puntaje de Trivia en el historial de localStorage
function guardarPuntajeTrivia(puntajeFinal) {
    
    // Lee lo que ya había guardado
    let historial = localStorage.getItem('puntajesTrivia');
    
    if (historial === null) {
        historial = [];
    } else {
        historial = JSON.parse(historial);
    }
    
    // Arma el nuevo registro
    const nuevoRegistro = {
        puntaje: puntajeFinal,
        fecha: new Date().toLocaleDateString()
    };
    
    // Lo agrega al array
    historial.push(nuevoRegistro);
    
    // Lo convierte de nuevo a string JSON y lo guarda
    localStorage.setItem('puntajesTrivia', JSON.stringify(historial));
}

//------------------------------------------------Escuchas de eventos

botonFacil.addEventListener('click', function() {
    cargarPreguntas('facil');
});

botonMedio.addEventListener('click', function() {
    cargarPreguntas('medio');
});

botonDificil.addEventListener('click', function() {
    cargarPreguntas('dificil');
});

botonesOpciones.forEach((boton, indice) => {
    boton.addEventListener('click', function() {
        verificarRespuesta(indice);
    })
})

botonReinicio.addEventListener('click', function() {
    reiniciarPreguntas();
});