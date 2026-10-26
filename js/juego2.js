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

//--------------------------------------------------------------------------------------JUEGO DADOS

//------------------------------------------------Declaraciones

let botondados = document.querySelector('#tirardados');
let plantarse = document.querySelector('#plantarse');
let puntos = document.querySelector('#puntos-sangrientos');
let imgdado1 = document.querySelector('#img-dado1');
let imgdado2 = document.querySelector('#img-dado2');
let texto = document.querySelector('#titulo-dados');
let reiniciar = document.querySelector('#reiniciar');
let efectoP = document.querySelector('#efecto-p');

let puntaje = 0;

let tiradasActuales = 0;
let tiradasAisladas = 0;

let vampiplantarse = false;
let malPresagio = false;

//HACER DESDE CSS
plantarse.style.border = '3px solid gray';
plantarse.style.color = 'gray';

//------------------------------------------------Funciones

function tirarDados() {
    return {
        dado1: Math.floor(Math.random() * 6) + 1,
        dado2: Math.floor(Math.random() * 6) + 1
    };
}

function aplicarEfectos(dado1, dado2) {

    let proba1 = Math.floor(Math.random() * 15) + 1;
    let proba2 = Math.floor(Math.random() * 20) + 1;
    let proba3 = Math.floor(Math.random() * 25) + 1;
    let proba4 = Math.floor(Math.random() * 30) + 1;
    let proba5 = Math.floor(Math.random() * 60) + 1;

    if (proba4 == 1 && puntaje >= 1000) {
        puntaje = Math.round(puntaje / 2);
        efectoP.innerText = 'Exposición al Sol';
        efectoP.style.color = 'orange';
    } else if (proba3 == 1 && puntaje >= 300) {
        puntaje = Math.round(puntaje - (puntaje * 0.15));
        efectoP.innerText = 'Ajo y agua';
        efectoP.style.color = 'gray';
    } else if (proba2 == 1 && puntaje > 0) {
        puntaje *= 2;
        efectoP.innerText = 'Dracubendición!';
        efectoP.style.color = 'gold';
    } else if (proba1 == 1 && puntaje > 0) {
        puntaje += Number(`${dado1}${dado2}`);
        efectoP.innerText = 'Sed de Sangre';
        efectoP.style.color = 'red';
    } else if (!malPresagio && proba5 == 1) {
        imgdado2.src = 'img/dados/malpresagio.png';
        efectoP.innerText = 'Mal Presagio';
        efectoP.style.color = 'purple';
        malPresagio = true;
    } else {
        efectoP.innerText = 'Noche Tranquila';
        efectoP.style.color = '#47415d';
    }

    if (malPresagio) {
        botondados.style.borderColor = 'purple'
        botondados.style.color = 'purple'
        botondados.style.backgroundColor = 'black'
    }
}

// FUNCIÓN COMPROBAR DERROTA
function comprobarDerrota(dado1, dado2) {
    if ((dado1 == 1 && dado2 == 3) || (malPresagio && dado1 == 1)) {
        texto.innerText = 'VAMPIPERDISTE!';
        plantarse.disabled = true;
        botondados.disabled = true;
        reiniciar.hidden = false;
        plantarse.style.border = '3px solid gray';
        plantarse.style.color = 'gray';
        botondados.style.border = '3px solid gray';
        botondados.style.color = 'gray';
        puntaje = 0;
        guardarPuntajeDados(0);
    };
}

function aplicarDracumaldicion() {
    let puntosTotales = JSON.parse(localStorage.getItem('puntosTotales')) || 0;

    if (puntosTotales > 0) {
        puntosTotales = Math.round(puntosTotales / 2);
        localStorage.setItem('puntosTotales', JSON.stringify(puntosTotales));

        texto.innerText = 'DRACUMALDITO!';
        efectoP.innerText = 'Dracumaldición!';
        texto.style.color = '#0de10d';
        efectoP.style.color = '#0de10d';
        reiniciar.style.color = '#0de10d';
        reiniciar.style.borderColor = '#0de10d';
        
        setTimeout(function() {
        alert('Muajaja! Dividiste tus Puntos Totales a la mitad por codiciosx!');
        }, 500);
        
    }
}

// FUNCIÓN GUARDAR PUNTOS PARA PAG. PUNTAJES
function guardarPuntajeDados(puntajeFinal) {
    
    let historial = localStorage.getItem('puntajesDados');
    
    if (historial === null) {
        historial = [];
    } else {
        historial = JSON.parse(historial);
    }
    
    const nuevoRegistro = {
        puntaje: puntajeFinal,
        fecha: new Date().toLocaleDateString()
    };
    
    historial.push(nuevoRegistro);
    
    localStorage.setItem('puntajesDados', JSON.stringify(historial));
}

// FUNCIÓN GUARDAR PUNTAJE HISTORICO

function guardarPuntajeHistorico (punt) {
    let total = JSON.parse(localStorage.getItem('puntosTotales')) || 0;
    total += punt;
    localStorage.setItem('puntosTotales', JSON.stringify(total));
};

function verificarSecretos() {
    const puntosTotalesSecretos = JSON.parse(localStorage.getItem('puntosTotales'));
    
    const puntosParaSecretos = [
        { puntos: 1000, numero: 1 },
        { puntos: 2000, numero: 2 },
        { puntos: 3000, numero: 3 },
        { puntos: 4000, numero: 4 },
        { puntos: 5000, numero: 5 },
        { puntos: 6000, numero: 6 },
        { puntos: 7000, numero: 7 },
        { puntos: 8500, numero: 8 },
        { puntos: 10000, numero: 9 },
        { puntos: 13000, numero: 10 }
    ];

puntosParaSecretos.forEach(secreto => {

    if (puntosTotalesSecretos >= secreto.puntos &&
        localStorage.getItem(`avisoSecreto${secreto.numero}`) !== 'true') {

        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');

        localStorage.setItem(`avisoSecreto${secreto.numero}`, 'true');
    }

})};

//------------------------------------------------Escuchas de eventos

botondados.addEventListener('click', function(e) {

    tiradasActuales ++;

    plantarse.disabled = false;
    plantarse.style.border = '3px solid crimson';
    plantarse.style.color = 'crimson';

    const dados = tirarDados();

    // DADOS IMG
    imgdado1.src = 'img/dados/dado' + dados.dado1 + '.png';
    if (!malPresagio) {
        imgdado2.src = 'img/dados/dado' + dados.dado2 + '.png';
    }
    
    // SUMAR PUNTAJE
    puntaje += Number(`${dados.dado1}${dados.dado2}`);

    aplicarEfectos(dados.dado1, dados.dado2);

    // COMPROBAR DERROTA
    comprobarDerrota(dados.dado1, dados.dado2);

    //MOSTRAR RESULTADO
    puntos.innerText = puntaje;
});

plantarse.addEventListener ('click', function(e) {
    vampiplantarse = true;
    texto.innerText = 'Puntos Sangrientos FINALES';
    plantarse.disabled = true;
    botondados.disabled = true;
    reiniciar.hidden = false;

    plantarse.style.border = '3px solid gray';
    plantarse.style.color = 'gray';
    botondados.style.border = '3px solid gray';
    botondados.style.color = 'gray';

    // MALDICIÓN ANTI-TRAMPAS
    if (tiradasActuales == 1) {
    tiradasAisladas++;
    } else {
    tiradasAisladas = 0;
    }

    if (tiradasAisladas == 3) {
    aplicarDracumaldicion();
    tiradasAisladas = 0;
    }

    guardarPuntajeDados(puntaje);
    guardarPuntajeHistorico(puntaje);

    verificarSecretos();
});

reiniciar.addEventListener('click', function(e) {
    puntaje = 0;
    tiradasActuales = 0;
    malPresagio = false;
    puntos.innerText = puntaje;
    vampiplantarse = false;
    botondados.disabled = false;
    botondados.style.border = '3px solid crimson';
    botondados.style.color = 'crimson'
    plantarse.disabled = true;
    reiniciar.hidden = true;
    imgdado1.src = 'img/dados/dado1.png';
    imgdado2.src = 'img/dados/dado1.png';
    texto.innerText = 'Puntos Sangrientos';
    texto.style.color = 'crimson';
    efectoP.innerText = 'Noche Tranquila';
    efectoP.style.color = '#47415d';
    reiniciar.style.color = 'crimson';
    reiniciar.style.borderColor = 'crimson';
    botondados.style.backgroundColor = '#47415d'

});

//--------------------------------------------------------------------------------------JUEGO DADOS