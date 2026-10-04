//--------------------------------------------------------------------------------------MENU DESPLEGABLE
let juegos = document.querySelector('#juegosnav');
let navdos = document.querySelector('#ul2');
let menu = false

juegos.addEventListener('click', (e) => {

    e.preventDefault()
    if (menu == false) {
    navdos.innerHTML = '<li class="mainLi"><a href="juego1.html" target="_self"><span>Chancho va(mpiro)</span></a></li>' +
			            '<li class="mainLi"><a href="juego2.html" target="_self"><span>Dados Sangrientos</span></a></li>' +
						'<li class="mainLi"><a href="juego3.html" target="_self"><span>Netflix and Kill</span></a></li>';
    menu = true;
    } else {
        navdos.innerHTML = '';
        menu = false;
    };

});
//--------------------------------------------------------------------------------------MENU DESPLEGABLE

// Variables

let dificultad = '';
let preguntas = [];
let indicePregunta = 0;
let vidas = 3;
let puntaje = 0;
let tiempoRestante = 10;
let intervaloTiempo;
let respuestaCorrectaActual = '';
let opcionesActuales = ['', '', '', ''];

const puntosPorDificultad = {
    facil: 10,
    medio: 20,
    dificil: 30
};

let inicioPreguntas = document.querySelector('#inicioPreguntas');
let juegoPreguntas = document.querySelector('#juegoPreguntas');
let finPreguntas = document.querySelector('#finPreguntas');

let textoPregunta = document.querySelector('#textoPregunta');
let numeroPreguntaEl = document.querySelector('#numeroPregunta');
let vidasEl = document.querySelector('#vidas');
let puntajeEl = document.querySelector('#puntaje');
let tiempoEl = document.querySelector('#tiempo');

let botonFacil = document.querySelector('#facil');
let botonMedio = document.querySelector('#medio');
let botonDificil = document.querySelector('#dificil');

// Funciones

// Trae las 10 preguntas de la API según la dificultad elegida, y arranca la partida
async function cargarPreguntas(dificultadElegida) {
    
    // Guarda la dificultad elegida
    dificultad = dificultadElegida;
    
    // Traduce la dificultad al inglés, que es lo que pide la API
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

    // Convierte el contenido en JSON
    const datos = await respuesta.json();

    // Si la API no pudo responder bien (por ejemplo, por el límite de pedidos), se avisa y no se sigue, para no romper el resto del juego
    if (datos.response_code !== 0) {
        alert('Hubo un problema al cargar las preguntas. Esperá unos segundos y probá de nuevo.');
        return;
    }

    // Guarda las preguntas
    preguntas = datos.results;

    // Arranca la trivia
    inicioPreguntas.style.display = 'none';
    juegoPreguntas.style.display = 'block';

    mostrarPregunta();
}

// Reemplaza los símbolos HTML raros (&quot;, &#039;, etc.) por su caracter normal
function decodificarTexto(texto) {
    let resultado = texto;
    
    resultado = resultado.split('&quot;').join('"');
    resultado = resultado.split('&#039;').join("'");
    resultado = resultado.split('&rsquo;').join("'");
    resultado = resultado.split('&lsquo;').join("'");
    resultado = resultado.split('&rdquo;').join('"');
    resultado = resultado.split('&ldquo;').join('"');
    resultado = resultado.split('&amp;').join('&');
    resultado = resultado.split('&eacute;').join('é');
    resultado = resultado.split('&iacute;').join('í');
    resultado = resultado.split('&oacute;').join('ó');
    resultado = resultado.split('&aacute;').join('á');
    resultado = resultado.split('&uacute;').join('ú');
    resultado = resultado.split('&ntilde;').join('ñ');
    
    return resultado;
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
    
    // Decodifica los textos (pregunta, correcta e incorrectas)
    const preguntaTexto = decodificarTexto(pregunta.question);
    const correcta = decodificarTexto(pregunta.correct_answer);
    const incorrecta1 = decodificarTexto(pregunta.incorrect_answers[0]);
    const incorrecta2 = decodificarTexto(pregunta.incorrect_answers[1]);
    const incorrecta3 = decodificarTexto(pregunta.incorrect_answers[2]);
    
    // Guarda cuál es la correcta, para compararla cuando el jugador responda
    respuestaCorrectaActual = correcta;
    
    // Mezcla las 4 opciones
    const opcionesMezcladas = mezclarOpciones(correcta, [incorrecta1, incorrecta2, incorrecta3]);
    
    // Muestra el texto de la pregunta
    textoPregunta.innerText = preguntaTexto;
    
    // Actualiza los textos de arriba (número de pregunta, vidas, puntaje)
    numeroPreguntaEl.innerText = 'Pregunta ' + (indicePregunta + 1) + ' de ' + preguntas.length;
    vidasEl.innerText = 'Vidas: ' + vidas;
    puntajeEl.innerText = 'Puntaje: ' + puntaje;
    
    opcionesActuales = opcionesMezcladas;
    
    for (let i = 0; i < 4; i++) {
        const boton = document.querySelector('#opcion-' + i);
        boton.innerText = opcionesMezcladas[i];
    }
    
    // Arranca el cronómetro de 10 segundos
    iniciarTemporizador();
}

// Arranca un cronómetro de 10 segundos para la pregunta actual
function iniciarTemporizador() {
    tiempoRestante = 10;
    tiempoEl.innerText = 'Tiempo: ' + tiempoRestante;
    
    // Por si quedó un intervalo corriendo de la pregunta anterior, se para
    clearInterval(intervaloTiempo);
    
    intervaloTiempo = setInterval(function() {
        tiempoRestante--;
        tiempoEl.innerText = 'Tiempo: ' + tiempoRestante;
        
        if (tiempoRestante <= 0) {
            clearInterval(intervaloTiempo);
            perderVida(); // se acabó el tiempo sin responder, cuenta como fallo
        }
    }, 1000);
}

// Compara la opción que eligió el jugador contra la correcta, y suma puntos o resta una vida
function verificarRespuesta(opcionElegida) {
    
    // Apenas el jugador responde, se para el cronómetro
    clearInterval(intervaloTiempo);
    
    if (opcionElegida === respuestaCorrectaActual) {
        sumarPuntos();
    } else {
        perderVida();
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
function terminarJuego(gano) {
    juegoPreguntas.style.display = 'none';
    finPreguntas.style.display = 'block';
    
    if (gano) {
        document.querySelector('#mensajeFinal').innerText = '¡Ganaste!';
    } else {
        document.querySelector('#mensajeFinal').innerText = 'Perdiste...';
    }
    
    document.querySelector('#puntajeFinal').innerText = 'Puntaje final: ' + puntaje;

    guardarPuntajeTrivia(puntaje);
}

// Resetea todas las variables del juego a sus valores iniciales, y vuelve a la pantalla de inicio
function reiniciarPreguntas() {
    dificultad = '';
    preguntas = [];
    indicePregunta = 0;
    vidas = 3;
    puntaje = 0;
    tiempoRestante = 10;
    
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
    
    // Lo convierte de nuevo a JSON y lo guarda
    localStorage.setItem('puntajesTrivia', JSON.stringify(historial));
}

// Escucha de eventos

botonFacil.addEventListener('click', function() {
    cargarPreguntas('facil');
});

botonMedio.addEventListener('click', function() {
    cargarPreguntas('medio');
});

botonDificil.addEventListener('click', function() {
    cargarPreguntas('dificil');
});

for (let i = 0; i < 4; i++) {
    const boton = document.querySelector('#opcion-' + i);
    const posicion = i; 
    
    boton.addEventListener('click', function() {
        verificarRespuesta(opcionesActuales[posicion]);
    });
}

document.querySelector('#btnReiniciarPreguntas').addEventListener('click', function() {
    reiniciarPreguntas();
});