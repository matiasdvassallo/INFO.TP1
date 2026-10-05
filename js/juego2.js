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

//--------------------------------------------------------------------------------------JUEGO DADOS

let botondados = document.querySelector('#tirardados');
let plantarse = document.querySelector('#plantarse');
let puntos = document.querySelector('#puntos-sangrientos');
let imgdado1 = document.querySelector('#img-dado1');
let imgdado2 = document.querySelector('#img-dado2');
let titulo = document.querySelector('#titulo-dados');
let reiniciar = document.querySelector('#reiniciar');

let puntaje = 0;
botondados.disabled = false;
plantarse.disabled = true;
let vampiplantarse = false;

let efectoP = document.querySelector('#efecto-p')

if (plantarse.disabled == true) {
    plantarse.style.border = '3px solid gray';
    plantarse.style.color = 'gray';
};

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

// FUNCIÓN DE DADOS
botondados.addEventListener('click', function(e) {
    e.preventDefault()
    
    plantarse.disabled = false;

    if (plantarse.disabled == false) {
        plantarse.style.border = '3px solid crimson';
        plantarse.style.color = 'crimson';
    };

    // DATO DE DADOS
    let dado1 = Math.floor(Math.random() * 6) + 1;
    let dado2 = Math.floor(Math.random() * 6) + 1;

    // DADOS IMG
    imgdado1.src = 'img/fotos/dados/dado' + dado1 + '.png';
    imgdado2.src = 'img/fotos/dados/dado' + dado2 + '.png';

    // SUAMR PUNTAJE
    puntaje += dado1 + dado2;

    // DATO DE EVENTOS
    let evento = Math.floor(Math.random() * 15) + 1;

    // EVENTOS 
    if (evento == 1 && puntaje > 0) {
        puntaje += dado1 + dado2;
        efectoP.innerText = 'Sed de Sangre';
        efectoP.style.color = 'red';

    } else if (evento == 3) {
        dado2 = 3;
        imgdado2.src = 'img/fotos/dados/dado' + dado2 + '.png';
        efectoP.innerText = 'Mal Presagio';
        efectoP.style.color = 'purple';
        imgdado2.src = 'img/fotos/dados/MalPresagio.png';
    } else {
        efectoP.innerText = 'Noche Tranquila';
        efectoP.style.color = '#47415d';
    };

    let evento2 = Math.floor(Math.random() * 15) + 1;

    if (evento2 == 1 && puntaje > 0 && puntaje <= 1000) {
        puntaje *= 2;
        efectoP.innerText = 'Dracubendición!';
        efectoP.style.color = 'gold';
    };

    let evento3 = Math.floor(Math.random() * 20) + 1;

    if (evento3 == 1 && puntaje >= 100) {
        puntaje = Math.round(puntaje - (puntaje * 0.15));
        efectoP.innerText = 'Ajo y agua';
        efectoP.style.color = 'gray';
    };

    // COMRPOBAR DERROTA
    if (dado1 == 1 && dado2 == 3) {
        titulo.innerText = 'VAMPIPERDISTE!';
        plantarse.disabled = true;
        botondados.disabled = true;
        reiniciar.hidden = false;
        plantarse.style.border = '3px solid gray'
        plantarse.style.color = 'gray'
        botondados.style.border = '3px solid gray'
        botondados.style.color = 'gray'

        puntaje = 0

        guardarPuntajeDados(0);
    };

        //MOSTRAR RESULTADO
    puntos.innerText = puntaje;

    // FUNCIÓN DE REINICIAR
    reiniciar.addEventListener('click', function(e) {
        location.reload();
    });

    });

    // FUNCIÓN DE PLANTARSE
    plantarse.addEventListener ('click', function(e) {
    vampiplantarse = true;
    titulo.innerText = 'Puntos Sangrientos FINALES';
    plantarse.disabled = true;
    botondados.disabled = true;
    reiniciar.hidden = false;
    plantarse.style.border = '3px solid gray'
    plantarse.style.color = 'gray'
    botondados.style.border = '3px solid gray'
    botondados.style.color = 'gray'
    let puntajeGuardado = localStorage.setItem('puntaje', puntaje);

    guardarPuntajeDados(puntaje);

    let secreto1Condition = localStorage.getItem('secreto1');
    let secreto2Condition = localStorage.getItem('secreto2');
    let secreto3Condition = localStorage.getItem('secreto3');
    let secreto4Condition = localStorage.getItem('secreto4');
    let secreto5Condition = localStorage.getItem('secreto5');
    let secreto6Condition = localStorage.getItem('secreto6');
    let secreto7Condition = localStorage.getItem('secreto7');
    let secreto8Condition = localStorage.getItem('secreto8');
    let secreto9Condition = localStorage.getItem('secreto9');
    let secreto10Condition = localStorage.getItem('secreto10');
        
    // SISTEMA DE SECRETOS
    if (puntaje >= 100 && vampiplantarse == true && secreto1Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };
    if (puntaje >= 200 && vampiplantarse == true && secreto2Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };
    if (puntaje >= 300 && vampiplantarse == true && secreto3Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };
    if (puntaje >= 400 && vampiplantarse == true && secreto4Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };
    if (puntaje >= 500 && vampiplantarse == true && secreto5Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };
    if (puntaje >= 600 && vampiplantarse == true && secreto6Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };
    if (puntaje >= 700 && vampiplantarse == true && secreto7Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };
    if (puntaje >= 850 && vampiplantarse == true && secreto8Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };
    if (puntaje >= 1000 && vampiplantarse == true && secreto9Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };
    if (puntaje >= 1300 && vampiplantarse == true && secreto10Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };

    // FUNCIÓN DE REINICIAR
    reiniciar.addEventListener('click', function(e) {
        location.reload();
    });

    });

    


//--------------------------------------------------------------------------------------JUEGO DADOS