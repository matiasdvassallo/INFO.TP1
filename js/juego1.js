
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

const palabraCompleta = "CHANCHO";
let cantidadJug = 4;
let cartasSinRepartir = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4];
let jugadores = [];
for(i=1; i<=cantidadJug; i++) {
    jugadores.push({
        numeroJug: i,
        letras: ''
    })
}
let ordenTocaron = [];
let rondaTerminada = false;
let inicio = document.querySelector('#pantInicio');
let tablero = document.querySelector('#tablero');
let botonInicio = document.querySelector('#btnIniciar');
let botonChancho = document.querySelector('#btnChancho');
let botonReiniciar = document.querySelector('#btnReiniciar');
const cartasJug1 = document.querySelectorAll('#jugador-1 .carta');

// Saca y devuelve una carta random de cartasSinRepartir 
function sacarRandom(x) {
    const indice = Math.floor(Math.random() * x.length);
    const carta = x.splice(indice, 1)[0];
    return carta;
}

// Reparte las cartas del mazo para iniciar una nueva ronda
function repartir() {
    cartasSinRepartir = [];
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

    console.log('--- revisarChancho ---');
    console.log('ordenTocaron:', ordenTocaron);
    console.log('rondaTerminada:', rondaTerminada);
    console.log('botón disabled:', botonChancho.disabled);
    console.log('tus 4 cartas:', jugadores[0].carta1, jugadores[0].carta2, jugadores[0].carta3, jugadores[0].carta4);
    console.log('¿tenés 4 iguales?', detectarIguales(jugadores[0]));

    if (ordenTocaron.length > 0) return;

    botonChancho.disabled = true;
    botonChancho.style.color = 'darkred';
    botonChancho.style.border = '3px solid darkred';

    for (let i = 0; i < jugadores.length; i++) {
    const jugador = jugadores[i];
        
        if (detectarIguales(jugador)) {
            if (i === 0) {
                botonChancho.disabled = false;
                botonChancho.style.color = 'red';
                botonChancho.style.border = '3px solid red';
            } else {
                tocarChancho(jugador.numeroJug);
                programarBots();
                
                botonChancho.disabled = false;
                botonChancho.style.color = 'red';
                botonChancho.style.border = '3px solid red';
            }
            
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

// Reemplaza la carta número 'pos' de 'jugador' por 'valor'
function asignarCarta(jugador, pos, valor) {
    if (pos == 1) { 
        jugador.carta1 = valor; 
    } else if (pos == 2) { 
        jugador.carta2 = valor; 
    } else if (pos == 3) { 
        jugador.carta3 = valor; 
    } else {
         jugador.carta4 = valor; 
    }
}

// Desplaza las cartas elegidas por cada jugador
function desplazar(posJug1) {

    // Paso 1: decidir qué posición mueve cada jugador (el usuario elige, los bots al azar)
    let posicionesElegidas = [];
    let cartasEnviadas = [];

    jugadores.forEach(function(jugador, i) {
        let pos;
        if (i == 0) {
            pos = posJug1;
        } else {
            pos = Math.floor(Math.random() * 4) + 1;
        }
        posicionesElegidas.push(pos);
        cartasEnviadas.push(obtenerCarta(jugador, pos));
    });

    // Paso 2: cada jugador reemplaza la carta que desplazó por la que llega de su jugador a la derecha
    jugadores.forEach(function(jugador, i) {
        const indiceDerecha = (i - 1 + jugadores.length) % jugadores.length;
        const posicion = posicionesElegidas[i];
        const cartaRecibida = cartasEnviadas[indiceDerecha];
        asignarCarta(jugador, posicion, cartaRecibida);
    });

    // Paso 3: Se muestran las cartas actualizadas del usuario
    document.querySelector('#carta-1-1').src = './img/cartas/' + jugadores[0].carta1 + '.png';
    document.querySelector('#carta-1-2').src = './img/cartas/' + jugadores[0].carta2 + '.png';
    document.querySelector('#carta-1-3').src = './img/cartas/' + jugadores[0].carta3 + '.png';
    document.querySelector('#carta-1-4').src = './img/cartas/' + jugadores[0].carta4 + '.png';

    revisarChancho();
    chanchoFalso();
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
    // Evita que se dispare después de que la ronda termine
    if (rondaTerminada) return;
    // Evita que el mismo jugador se cuente dos veces
    if (estaEnArray(ordenTocaron, numeroJugador)) return;

    ordenTocaron.push(numeroJugador);

    if (ordenTocaron.length === jugadores.length) {
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
    return null;
}

// Resuelve la ronda y agrega una letra a quien perdió
function resolverRondaChancho() {
    rondaTerminada = true;
    const ultimoJug = ordenTocaron[ordenTocaron.length - 1];
    const perdedor = buscarJugador(ultimoJug);
    agregarLetra(perdedor);
}

// Agrega una letra de CHANCHO al perdedor de la ronda
function agregarLetra(jugador) {
    
    // Captura el contenedor de letras de 'jugador'
    const letrasDiv = document.querySelector('#letras-' + jugador.numeroJug);
    
    // Captura los span que forman CHANCHO
    const palabra = letrasDiv.querySelectorAll('.letra');
    
    // Posición de la próxima letra a agregar
    const posicion = jugador.letras.length;
    
    // Busca en la constante palabraCompleta qué letra corresponde a esa posición
    const letra = palabraCompleta[posicion];
    
    // Se la escribe al span correspondiente (reemplaza el "_")
    palabra[posicion].innerText = letra;

    // Actualiza el dato del jugador
    jugador.letras += letra;

    if (letra === 'O') {
        eliminado(jugador);
    } else {
        ordenTocaron = [];
        rondaTerminada = false;
        repartir();
    }
}

// Elimina a 'jugador' de la partida
function eliminado(jugador) {
    
    // Busca el <div> completo de ese jugador (el que tiene id="jugador-X")
    const divJugador = document.querySelector('#jugador-' + jugador.numeroJug);
    
    // Se le agrega una clase CSS para que se vea "apagado"/distinto
    divJugador.classList.add('eliminado');

    // Busca la posición de este jugador dentro del array "jugadores"
    let indice = -1;
    for (let i = 0; i < jugadores.length; i++) {
        if (jugadores[i].numeroJug === jugador.numeroJug) {
            indice = i;
            break;
        }
    }
    
    // Se saca del array de jugadores
    jugadores.splice(indice, 1);

    // Chequea cuántos jugadores quedan
    if (jugadores.length >= 2) {
        
        // Si quedan 2 o más, la partida sigue.
        // Resetea las variables de la ronda de Chancho
        ordenTocaron = [];
        rondaTerminada = false;
        
        // Se reparte de nuevo para arrancar la próxima ronda
        repartir();
        
    } else {
        
        // Si queda 1 solo jugador, ese es el ganador
        const ganador = jugadores[0];
        document.querySelector('#mensaje').innerText = 
            'Ganó el jugador ' + ganador.numeroJug + '! ¿Querés jugar de nuevo?';
        
        // Calcula el puntaje obtenido: 7 menos las letras que juntó el ganador
        const puntajeChancho = 7 - ganador.letras.length;
        guardarPuntajeChancho(puntajeChancho);

        // Se habilita el botón de reiniciar
        botonReiniciar.style.display = 'inline';
    }
}

// Hace que los bots toquen el botón CHANCHO (si fue habilitado) en un tiempo random entre 0.5 y 2 segundos
function programarBots() {
    jugadores.forEach(function(jugador) {
        if (jugador.numeroJug !== 1) {
            const tiempoRandom = (Math.random() * (2 - 0.5) + 0.5) * 1000;
            setTimeout(function() {
                tocarChancho(jugador.numeroJug);
            }, tiempoRandom);
        }
    });
}

// Le permite a los bots una chance de se les active el botón CHANCHO sin tener las 4 iguales, para balancear el juego
function chanchoFalso() {
    // Si ya hay una ronda de chancho en curso, no se interfiere
    if (rondaTerminada === false && ordenTocaron.length > 0) return;

    jugadores.forEach(function(jugador) {
        if (jugador.numeroJug !== 1) {
            
            // 5% de probabilidad de que ESTE bot decida bluffear en este momento
            const probabilidadBluff = 0.05;
            
            if (Math.random() < probabilidadBluff) {

                // El bot "toca" el botón
                tocarChancho(jugador.numeroJug);
                
                // Se habilita el botón al usuario
                botonChancho.disabled = false;
                botonChancho.style.color = 'red';
                botonChancho.style.border = '3px solid red';
                
                // Se habilita el botón a los bots
                programarBots();
            }
        }
    });
}

// Reinicia el juego
function reiniciar() {
    
    // Resetea el mazo completo
    cartasSinRepartir = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4];
    
    // Resetea el array de jugadores y las palabras
    jugadores = [];
    for (let i = 1; i <= cantidadJug; i++) {
        jugadores.push({
            numeroJug: i,
            letras: ''
        });
    }
    
    // Resetea las variables de la ronda de Chancho
    ordenTocaron = [];
    rondaTerminada = false;

    // Pone "_" en todas las letras
    for (let i = 1; i <= cantidadJug; i++) {
        const spans = document.querySelectorAll('#letras-' + i + ' .letra');
        spans.forEach(function(span) {
            span.innerText = '_';
        });
    }
    
    // Saca la clase "eliminado" de todos los jugadores
    for (let i = 1; i <= cantidadJug; i++) {
        document.querySelector('#jugador-' + i).classList.remove('eliminado');
    }
    
    // Muestra la pantalla de inicio y oculta el tablero
    tablero.style.display = 'none';
    inicio.style.display = 'block';
}

// Guarda un nuevo puntaje de Chancho en el historial de localStorage
function guardarPuntajeChancho(puntaje) {
    
    // Lee lo que ya había guardado
    let historial = localStorage.getItem('puntajesChancho');
    
    if (historial === null) {
        historial = [];
    } else {
        historial = JSON.parse(historial);
    }
    
    // Arma el nuevo registro
    const nuevoRegistro = {
        puntaje: puntaje,
        fecha: new Date().toLocaleDateString()
    };
    
    // Se agrega al array
    historial.push(nuevoRegistro);
    
    // Se convierte de nuevo a JSON y se guarda (reemplazando lo anterior)
    localStorage.setItem('puntajesChancho', JSON.stringify(historial));
}

// Escucha si el usuario clickea una carta
cartasJug1.forEach(function(img) {
    img.addEventListener('click', function() {
        // this === img, la carta que clickeó
        const posicion = this.id.split('-')[2]; // de "carta-1-3" saca "3"
        desplazar(posicion);
    });
});

// Escucha si el usuario tocó Iniciar Partida
botonInicio.addEventListener('click', function(){
    inicio.style.display = 'none';
    tablero.style.display = 'block';
    repartir();
});

// Escucha si el usuario tocó el botón CHANCHO
botonChancho.addEventListener('click', function() {
    botonChancho.disabled = true;
    botonChancho.style.color = 'darkred';
    botonChancho.style.border = '3px solid darkred';
    tocarChancho(1);
    programarBots();
});

// Escucha si el usuario reinició el juego
botonReiniciar.addEventListener('click', function() {
    botonReiniciar.style.display = 'none';
    reiniciar();
});