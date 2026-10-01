/*
//--------------------------------------------------------------------------------------MENU DESPLEGABLE
let juegos = document.querySelector('#juegosnav');
let navdos = document.querySelector('#ul2');
let menu = false

juegos.addEventListener('click', (e) => {

    e.preventDefault()
    if (menu == false) {
    navdos.innerHTML = '<li class="mainLi"><a href="juego1.html" target="_self"><span>Chancho va(mpiro)</span></a></li>' +
			            '<li class="mainLi"><a href="juego2.html" target="_self"><span>Dados Sangrientos</span></a></li>' +
						'<li class="mainLi"><a href="juego3.html" target="_self"><span>Juego 3</span></a></li>';
    menu = true;
    } else {
        navdos.innerHTML = '';
        menu = false;
    };

});
//--------------------------------------------------------------------------------------MENU DESPLEGABLE
*/
let cantidadJug = 4;
let cartasSinRepartir = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4];
let jugadores = [];
for(i=1; i<=cantidadJug; i++) {
    jugadores.push({
        numeroJug: i,
        letras: ''
    })
}
let inicio = document.querySelector('#pantInicio');
let tablero = document.querySelector('#tablero');
let botonInicio = document.querySelector('#btnIniciar');
let botonChancho = document.querySelector('#btnChancho');
let ordenTocaron = [];
let rondaTerminada = false;
let botonReiniciar = document.querySelector('#btnReiniciar');

function sacarRandom(x) {
    const indice = Math.floor(Math.random() * x.length);
    const carta = x.splice(indice, 1)[0];
    return carta;
}

function repartir() {
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

function desplazar(posJug1) {
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
        cartasEnviadas.push(jugador['carta' + pos]);
    });

    jugadores.forEach(function(jugador, i) {
        const indiceDerecha = (i - 1 + cantidadJug) % cantidadJug;
        const posicion = posicionesElegidas[i];
        jugador['carta' + posicion] = cartasEnviadas[indiceDerecha];
    });

    for (let i = 1; i<=4; i++) {
        document.querySelector('#carta-1-' + i).src = './img/cartas/' + jugadores[0]['carta' + i] + '.png';
    }

    revisarChancho();
}

function detectarIguales(jugador) {
    return jugador.carta1 === jugador.carta2 &&
    jugador.carta1 === jugador.carta3 &&
    jugador.carta1 === jugador.carta4;
}

function revisarChancho() {
    botonChancho.disabled = true;

    jugadores.forEach(function(jugador, i) {
        if (detectarIguales(jugador)) {
            if (i === 0) {
                botonChancho.disabled = false;
            }
        }
    });
}

function estaEnArray(array, valor) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === valor) {
            return true;
        }
    }
    return false;
}

function tocarChancho(numeroJugador) {
    if (rondaTerminada) return;

    if (estaEnArray(ordenTocaron, numeroJugador)) return;

    ordenTocaron.push(numeroJugador);

    botonChancho.disabled = false;

    jugadores.forEach(function(jugador, i) {
        
        const numJug = jugador.numeroJug;

        if (numJug !== numeroJugador && !estaEnArray(ordenTocaron, numJug)) {
            const tiempoRandom = (Math.random() * (5 - 0.5) + 0.5) * 1000;
            setTimeout(function() {
                tocarChancho(numJug);
            }, tiempoRandom);
        }
    });

     if (ordenTocaron.length === jugadores.length) {
        
        resolverRondaChancho();
     }
}

function resolverRondaChancho() {
    rondaTerminada = true;
    const numeroUltimo = ordenTocaron[ordenTocaron.length - 1];
     const jugadorPerdedor = jugadores.find(function(j) {
        return j.numeroJug === numeroUltimo;
    });
    agregarLetra(jugadorPerdedor);
}

function agregarLetra(jugador) {
    
    // Buscamos el contenedor de letras de ESE jugador específico
    // (por ejemplo, si jugador.numeroJug es 2, busca "#letras-2")
    const letrasDiv = document.querySelector('#letras-' + jugador.numeroJug);
    
    // Dentro de ese contenedor, buscamos todos los <span> que todavía
    // tienen la clase "oculta" (o sea, las letras que faltan revelar)
    const ocultas = letrasDiv.querySelectorAll('.oculta');
    
    // Guardamos el texto de la PRIMERA oculta (la próxima letra a revelar)
    // antes de sacarle la clase, para poder usarlo después
    const letraRevelada = ocultas[0].textContent;
    
    // Le sacamos la clase "oculta" a ese span, así se hace visible en pantalla
    ocultas[0].classList.remove('oculta');

    // Actualizamos el dato del jugador en el array, sumándole la letra nueva
    jugador.letras += letraRevelada;

    // Chequeamos si la letra que se acaba de revelar fue la "O"
    // (que es la última letra de "CHANCHO", o sea, se completó la palabra)
    if (letraRevelada === 'O') {
        eliminado(jugador);
    } else {
        ordenTocaron = [];
        rondaTerminada = false;
        repartir();
    }
}

function eliminado(jugador) {
    
    // Buscamos el <div> completo de ese jugador (el que tiene id="jugador-X")
    const divJugador = document.querySelector('#jugador-' + jugador.numeroJug);
    
    // Le agregamos una clase CSS para que se vea "apagado"/distinto
    // (esta clase la definís vos en el CSS, por ejemplo con opacity o un fondo gris)
    divJugador.classList.add('eliminado');

    // Buscamos la posición de este jugador dentro del array "jugadores"
    // findIndex es como find, pero devuelve la POSICIÓN en vez del objeto
    const indice = jugadores.findIndex(function(j) {
        return j.numeroJug === jugador.numeroJug;
    });
    
    // Lo sacamos del array de jugadores (splice con 1 saca un solo elemento)
    jugadores.splice(indice, 1);

    // Chequeamos cuántos jugadores quedan
    if (jugadores.length >= 2) {
        
        // Si quedan 2 o más, la partida sigue.
        // Reseteamos las variables de la ronda de Chancho
        ordenTocaron = [];
        rondaTerminada = false;
        
        // Volvemos a armar el mazo completo, MENOS las 4 cartas
        // del jugador que acaba de ser eliminado (esas ya no se usan más)
        for (i = 1; i <= jugadores.length; i++) {
            cartasSinRepartir.push(i);
            cartasSinRepartir.push(i);
            cartasSinRepartir.push(i);
            cartasSinRepartir.push(i);
        }
        
        // Repartimos de nuevo para arrancar la próxima ronda
        repartir();
        
    } else {
        
        // Si queda 1 solo jugador, ese es el ganador
        const ganador = jugadores[0];
        document.querySelector('#mensaje').textContent = 
            'Ganó el jugador ' + ganador.numeroJug + '! ¿Jugamos de nuevo?';
        
        // acá después conectamos el botón de reiniciar
        botonReiniciar.style.display = 'inline';
    }
}

function reiniciar() {
    
    // Reseteamos el mazo completo, como al principio
    cartasSinRepartir = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4];
    
    // Reseteamos el array de jugadores, volviendo a crear los 4 desde cero
    jugadores = [];
    for (let i = 1; i <= cantidadJug; i++) {
        jugadores.push({
            numeroJug: i,
            letras: ''
        });
    }
    
    // Reseteamos las variables de la ronda de Chancho
    ordenTocaron = [];
    rondaTerminada = false;
    
    // Volvemos a mostrar todas las letras ocultas (por si algún jugador
    // había revelado alguna en la partida anterior)
    for (let i = 1; i <= cantidadJug; i++) {
        const spans = document.querySelectorAll('#letras-' + i + ' .letra');
        spans.forEach(function(span) {
            span.classList.add('oculta');
        });
    }
    
    // Sacamos la clase "eliminado" de todos los jugadores
    // (por si alguno había quedado marcado como eliminado)
    for (let i = 1; i <= cantidadJug; i++) {
        document.querySelector('#jugador-' + i).classList.remove('eliminado');
    }
    
    // Mostramos la pantalla de inicio y ocultamos el tablero
    tablero.style.display = 'none';
    inicio.style.display = 'block';
}

const cartasJug1 = document.querySelectorAll('#jugador-1 .carta');

cartasJug1.forEach(function(img) {
    img.addEventListener('click', function() {
        // this === img, la carta que clickeó
        const posicion = this.id.split('-')[2]; // de "carta-1-3" saca "3"
        desplazar(posicion);
    });
});

botonInicio.addEventListener('click', function(){
    inicio.style.display = 'none';
    tablero.style.display = 'block';
    repartir();
});

botonReiniciar.addEventListener('click', function() {
    botonReiniciar.style.display = 'none';
    reiniciar();
});