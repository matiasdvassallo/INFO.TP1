//--------------------------------------------------------------------------------------MENU DESPLEGABLE
let juegos = document.querySelector('#juegosnav');
let navdos = document.querySelector('#ul2');
let menu = false

juegos.addEventListener('click', (e) => {

    e.preventDefault()
    if (menu == false) {
    navdos.innerHTML = '<li class="mainLi"><a href="juego1.html" target="_self"><span>Chancho va(mpiro)</span></a></li>' +
			            '<li class="mainLi"><a href="juego2.html" target="_self"><span>Dados Sangrientos</span></a></li>' +
						'<li class="mainLi"><a href="juego3.html" target="_self"><span>Netflix and Kill</span></a></li>' +
                        '<li class="mainLi""><a href="juego_backup/juego_backup.html" target="_self"><span>(Juego Backup)</span></a></li>';
    menu = true;
    } else {
        navdos.innerHTML = '';
        menu = false;
    };

});
//--------------------------------------------------------------------------------------MENU DESPLEGABLE

//------------------------------------------------Declaraciones

// Variables para el desarrollo del juego
const palabraCompleta = "CHANCHO";
const cantidadJug = 4;
let jugadores = [];
for (let i = 1; i <= cantidadJug; i++) {
    jugadores.push({
        numeroJug: i,
        letras: ''
    })
}
let ordenTocaron = [];
let rondaTerminada = true;
let botsProgramando = false;
let temporizadoresBots = [];

// Pantalla de inicio
const inicio = document.querySelector('#pantInicio');
const botonInicio = document.querySelector('#btnIniciar');

// Tablero de juego
const tablero = document.querySelector('#tablero');
const botonChancho = document.querySelector('#btnChancho');
const botonReiniciar = document.querySelector('#btnReiniciar');
const cartasJug1 = document.querySelectorAll('#jugador-1 .carta');

//------------------------------------------------Funciones

// Saca y devuelve una carta random de cartasSinRepartir 
function sacarRandom(x) {
    const indice = Math.floor(Math.random() * x.length);
    const carta = x.splice(indice, 1)[0];
    return carta;
}

// Reparte las cartas del mazo para iniciar una nueva ronda
function repartir() {
    cancelarTemporizadoresBots();
    ordenTocaron = [];
    rondaTerminada = true;
    const cartasSinRepartir = [];
    for (let i = 1; i <= jugadores.length; i++) {
        cartasSinRepartir.push(i, i, i, i);
    }
    jugadores.forEach(function(x) {
        x.carta1 = sacarRandom(cartasSinRepartir);
        x.carta2 = sacarRandom(cartasSinRepartir);
        x.carta3 = sacarRandom(cartasSinRepartir);
        x.carta4 = sacarRandom(cartasSinRepartir);
    });

    document.querySelector('#carta-1-1').src = './img/cartas/' + jugadores[0].carta1 + '.png';
    document.querySelector('#carta-1-2').src = './img/cartas/' + jugadores[0].carta2 + '.png';
    document.querySelector('#carta-1-3').src = './img/cartas/' + jugadores[0].carta3 + '.png';
    document.querySelector('#carta-1-4').src = './img/cartas/' + jugadores[0].carta4 + '.png';
    
    revisarChancho();
}

// Revisa si alguno de los jugadores juntó cuatro cartas iguales y se habilita el botón CHANCHO
function revisarChancho() {

    if (ordenTocaron.length > 0) return;

    for (let i = 0; i < jugadores.length; i++) {
        let jugador = jugadores[i];  
        if (detectarIguales(jugador)) {
            if (jugador.numeroJug != 1) {
                tocarChancho(jugador.numeroJug);
                programarBots(jugador.numeroJug);
            } 
            botonChancho.disabled = false;
            botonChancho.style.color = 'red';
            botonChancho.style.border = '3px solid red';
    
            break;
        }
    }
}

// Devuelve true si el jugador juntó 4 iguales
function detectarIguales(jugador) {
    return jugador.carta1 === jugador.carta2 &&
           jugador.carta1 === jugador.carta3 &&
           jugador.carta1 === jugador.carta4;
}

// Devuelve la carta elegida por un jugador determinado
function obtenerCarta(jugador, pos) {
    if (pos == 1) return jugador.carta1;
    if (pos == 2) return jugador.carta2;
    if (pos == 3) return jugador.carta3;
    return jugador.carta4;
}

// Reemplaza la carta número 'pos' de 'jugador' por 'cartaRecibida'
function asignarCarta(jugador, pos, cartaRecibida) {
    if (pos == 1) { 
        jugador.carta1 = cartaRecibida; 
    } else if (pos == 2) { 
        jugador.carta2 = cartaRecibida; 
    } else if (pos == 3) { 
        jugador.carta3 = cartaRecibida; 
    } else {
         jugador.carta4 = cartaRecibida; 
    }
}

// Devuelve la primer posición con una carta que se repite. Si no hay repeticiones, devuelve -1.
function primerRepetido(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] === array[j]) {
                return i + 1;
            }
        }
    }
    return -1;
}

// Devuelve la posición de una carta random entre las que no son iguales a las primeras que se repiten
function unaDistinta(array) {
    const posRepetida = primerRepetido(array);
    let posSobrantes = [];
    for (let i = 0; i < 4; i++) {
        if (array[i] !== array[posRepetida - 1]) {
            posSobrantes.push(i + 1);
        }
    }
    let indice = Math.floor(Math.random() * posSobrantes.length);
    return posSobrantes[indice];
}

// Devuelve la posición de la carta elegida por ese bot
function elegirBot(jug){
    let cartas = [jug.carta1, jug.carta2, jug.carta3, jug.carta4];
    let indice = primerRepetido(cartas);
    if (indice === -1) {
        return Math.floor(Math.random() * 4) + 1;
    } else {
        // 25% de probabilidad de que este bot decida desplazar una de sus cartas repetidas
        let probabilidad = 0.25;
        if (Math.random() < probabilidad) {
            return indice;
        } else {
        return unaDistinta(cartas);
        }
    }
}

// Desplaza las cartas elegidas por cada jugador
function desplazar(posJug1) {

    botonChancho.disabled = true;
    botonChancho.style.color = 'darkred';
    botonChancho.style.border = '3px solid darkred';

    // Paso 1: decidir qué posición mueve cada jugador (el usuario elige, los bots al azar)
    let posicionesElegidas = [];
    let cartasEnviadas = [];

    jugadores.forEach(function(jugador, i) {
        let pos;
        if (i == 0) {
            pos = posJug1;
        } else {
            pos = elegirBot(jugador);
        }
        posicionesElegidas.push(pos);
        cartasEnviadas.push(obtenerCarta(jugador, pos));
    });

    // Paso 2: cada jugador reemplaza la carta que desplazó por la que llega de su jugador a la derecha
    jugadores.forEach(function(jugador, i) {
        let indiceDerecha = (i - 1 + jugadores.length) % jugadores.length;
        let posicion = posicionesElegidas[i];
        let cartaRecibida = cartasEnviadas[indiceDerecha];
        asignarCarta(jugador, posicion, cartaRecibida);
    });

    // Paso 3: Se muestran las cartas actualizadas del usuario
    document.querySelector('#carta-1-1').src = './img/cartas/' + jugadores[0].carta1 + '.png';
    document.querySelector('#carta-1-2').src = './img/cartas/' + jugadores[0].carta2 + '.png';
    document.querySelector('#carta-1-3').src = './img/cartas/' + jugadores[0].carta3 + '.png';
    document.querySelector('#carta-1-4').src = './img/cartas/' + jugadores[0].carta4 + '.png';

    revisarChancho();
}

// Devuelve true si un elemento se encuentra en un array
function estaEnArray(array, valor) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === valor) {
            return true;
        }
    }
    return false;
}

// Se van guardando en órden quienes tocan el botón CHANCHO
function tocarChancho(numeroJugador) {

    // Evita que el mismo jugador se cuente dos veces
    if (estaEnArray(ordenTocaron, numeroJugador)) return;

    if (!rondaTerminada) return;

    ordenTocaron.push(numeroJugador);

    if (numeroJugador == 1) {
        programarBots(1);
    }
    
    if (ordenTocaron.length === jugadores.length) {
        rondaTerminada = false;
        resolverRondaChancho();
    }
}

// Devuelve el objeto correspondiente al jugador 'numero'
function buscarJugador(numero) {
    for (let i = 0; i < jugadores.length; i++) {
        if (jugadores[i].numeroJug === numero) {
            return jugadores[i];
        }
    }
}

// Resuelve la ronda y agrega una letra a quien perdió
function resolverRondaChancho() {
    let ultimoJug = ordenTocaron[ordenTocaron.length - 1];
    let perdedor = buscarJugador(ultimoJug);
    ordenTocaron = [];
    agregarLetra(perdedor);
}

// Agrega una letra de CHANCHO al perdedor de la ronda
function agregarLetra(jugador) {
    
    // Captura el contenedor de letras de 'jugador'
    let letrasDiv = document.querySelector('#letras-' + jugador.numeroJug);
    
    // Captura los span que forman CHANCHO
    let palabra = letrasDiv.querySelectorAll('.letra');
    
    // Posición de la próxima letra a agregar
    let posicion = jugador.letras.length;
    
    // Busca en la constante palabraCompleta qué letra corresponde a esa posición
    let letra = palabraCompleta[posicion];
    
    // Se la escribe al span correspondiente (reemplaza el "_")
    palabra[posicion].innerText = letra;

    // Actualiza el dato del jugador
    jugador.letras += letra;

    if (letra === 'O') {
        eliminado(jugador);
    } else {
        repartir();
    }
}

// Elimina a 'jugador' de la partida
function eliminado(jugador) {
    
    // Si se elimina al usuario
    if (jugador.numeroJug == 1) {

        for (let i = 0; i < jugadores.length; i++) {
            let divJugador = document.querySelector('#jugador-' + jugadores[i].numeroJug);
            divJugador.style.display = 'none';
        }

        jugadores = [];

        botonChancho.style.display = 'none';
        document.querySelector('#mensajeFinal').innerText = '¡Perdiste! ¿Querés jugar de nuevo?';

        // Se habilita el botón de reiniciar
        botonReiniciar.style.display = 'inline';

    // Si se elimina un bot
    } else { 
        // Busca el <div> completo de ese jugador (el que tiene id="jugador-X")
        let divJugador = document.querySelector('#jugador-' + jugador.numeroJug);
        
        // Oculto al jugador eliminado
        divJugador.style.display = 'none';

        // Busca la posición de este jugador dentro del array "jugadores"
        let indice;
        for (let i = 0; i < jugadores.length; i++) {
            if (jugadores[i].numeroJug == jugador.numeroJug) {
                indice = i;
                break;
            }
        } 
        
        // Se saca del array de jugadores
        jugadores.splice(indice, 1);

        // Chequea cuántos jugadores quedan
        if (jugadores.length >= 2) {
            
            rondaTerminada = true;
            // Se reparte de nuevo para arrancar la próxima ronda
            repartir();
            
        } else {
            // Ganó el usuario
            let ganador = jugadores[0];

            let divGanador = document.querySelector('#jugador-' + ganador.numeroJug);
            divGanador.style.display = 'none'; 

            botonChancho.style.display = 'none';

            // Calcula el puntaje obtenido: 7 menos las letras que juntó el usuario
            let puntajeChancho = 7 - ganador.letras.length;
            guardarPuntajeChancho(puntajeChancho);

            document.querySelector('#mensajeFinal').innerText = '¡Ganaste y obtuviste ' + puntajeChancho + ' puntos! ¿Querés jugar de nuevo?';
            
            // Se habilita el botón de reiniciar
            botonReiniciar.style.display = 'inline';
        }
    }
}

function cancelarTemporizadoresBots() {
    temporizadoresBots.forEach(x => clearTimeout(x));
    temporizadoresBots = [];
    botsProgramando = false;
}

// Hace que los bots (salvo numeroJugador) toquen el botón CHANCHO (si fue habilitado) en un tiempo random entre 0.075 y 1.5 segundos
function programarBots(numeroJugador) {
    if (botsProgramando) return;
    if (!rondaTerminada) return;
    botsProgramando = true;

    jugadores.forEach(function(jugador) {
        if (jugador.numeroJug != 1 && jugador.numeroJug != numeroJugador) {
            let tiempoRandom = (Math.random() * (1.5 - 0.075) + 0.075) * 1000;
            let temporizador = setTimeout(function() {
                tocarChancho(jugador.numeroJug);
            }, tiempoRandom);
            temporizadoresBots.push(temporizador);
        }
    });
}

// Reinicia el juego
function reiniciar() {
    
    cancelarTemporizadoresBots();

    // Resetea el array de jugadores y sus letras
    jugadores = [];
    for (let i = 1; i <= cantidadJug; i++) {
        jugadores.push({
            numeroJug: i,
            letras: ''
        })
    }
    
    // Resetea las variables de la ronda de Chancho
    ordenTocaron = [];
    rondaTerminada = true;

    // Pone "_" en todas las letras
    for (let i = 1; i <= cantidadJug; i++) {
        let spans = document.querySelectorAll('#letras-' + i + ' .letra');
        spans.forEach(function(span) {
            span.innerText = '_';
        });
    }
    
    // Vuelvo a mostrar a los jugadores eliminados
    for (let i = 1; i <= cantidadJug; i++) {
        let jugador = document.querySelector('#jugador-' + i);
        jugador.style.display = 'block'; 
    }
    
    document.querySelector('#mensajeFinal').innerText = '';
    // Muestra la pantalla de inicio y oculta el tablero
    tablero.style.display = 'none';
    inicio.style.display = 'block';
}

// Guarda un nuevo puntaje de Chancho en el historial de localStorage
function guardarPuntajeChancho(puntaje) {
    
    // Lee lo que ya había guardado
    let historial = localStorage.getItem('puntajesChancho');
    
    if (historial == null) {
        historial = [];
    } else {
        historial = JSON.parse(historial);
    }
    
    // Arma el nuevo registro
    let nuevoRegistro = {
        puntaje: puntaje,
        fecha: new Date().toLocaleDateString()
    };
    
    // Se agrega al array
    historial.push(nuevoRegistro);
    
    // Se convierte de nuevo a JSON y se guarda (reemplazando lo anterior)
    localStorage.setItem('puntajesChancho', JSON.stringify(historial));
}

//------------------------------------------------Escuchas de eventos

// Escucha si el usuario tocó Iniciar Partida
botonInicio.addEventListener('click', function(){
    inicio.style.display = 'none';
    tablero.style.display = 'block';
    botonChancho.style.display = 'block';
    repartir();
});

// Escucha si el usuario clickea una carta
cartasJug1.forEach(function(img) {
    img.addEventListener('click', function() {
        if (ordenTocaron.length > 0) return;
        let posicion = this.id[this.id.length - 1]; 
        desplazar(posicion);
    });
});

// Escucha si el usuario tocó el botón CHANCHO
botonChancho.addEventListener('click', function() {
    botonChancho.disabled = true;
    botonChancho.style.color = 'darkred';
    botonChancho.style.border = '3px solid darkred';
    tocarChancho(1);
});

// Escucha si el usuario reinició el juego
botonReiniciar.addEventListener('click', function() {
    botonReiniciar.style.display = 'none';
    reiniciar();
});