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
let texto = document.querySelector('#titulo-dados');
let reiniciar = document.querySelector('#reiniciar');
let efectoP = document.querySelector('#efecto-p');

let puntaje = 0;

let vampiplantarse = false;

plantarse.style.border = '3px solid gray';
plantarse.style.color = 'gray';

// FUNCIÓN COMPROBAR DERROTA
function comprobarDerrota(dado1, dado2) {
    if (dado1 == 1 && dado2 == 3) {
        texto.innerText = 'VAMPIPERDISTE!';
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

// FUNCIÓN DE DADOS
botondados.addEventListener('click', function(e) {
    //e.preventDefault()
    
    plantarse.disabled = false;
    plantarse.style.border = '3px solid crimson';
    plantarse.style.color = 'crimson';

    // DATO DE DADOS
    let dado1 = Math.floor(Math.random() * 6) + 1;
    let dado2 = Math.floor(Math.random() * 6) + 1;

    // DADOS IMG
    imgdado1.src = 'img/dados/dado' + dado1 + '.png';
    imgdado2.src = 'img/dados/dado' + dado2 + '.png';

    // SUAMR PUNTAJE
    puntaje += Number(`${dado1}${dado2}`);

    // DATO DE EFECTOS (PROBABILIDADES)
    let proba1 = Math.floor(Math.random() * 15) + 1;
    let proba2 = Math.floor(Math.random() * 20) + 1;
    let proba3 = Math.floor(Math.random() * 25) + 1;
    let proba4 = Math.floor(Math.random() * 30) + 1;

    // EFECTOS 

    // EFECTOS PROBA1
    if (proba1 == 1 && puntaje > 0) {
        puntaje += Number(`${dado1}${dado2}`); // x2
        efectoP.innerText = 'Sed de Sangre';
        efectoP.style.color = 'red';

    } else if (proba1 == 2) {
        dado2 = 3;
        imgdado2.src = 'img/dados/dado' + dado2 + '.png';
        efectoP.innerText = 'Mal Presagio';
        efectoP.style.color = 'purple';
        imgdado2.src = 'img/dados/malpresagio.png';
    
    } else {
        efectoP.innerText = 'Noche Tranquila';
        efectoP.style.color = '#47415d';
    };

    // EFECTOS PROBA2
    if (proba2 == 1 && puntaje > 0) {
        puntaje *= 2;
        efectoP.innerText = 'Dracubendición!';
        efectoP.style.color = 'gold';
    };

    // EFECTOS PROBA3
    if (proba3 == 1 && puntaje > 0) {
        puntaje = Math.round(puntaje - (puntaje * 0.15));
        efectoP.innerText = 'Ajo y agua';
        efectoP.style.color = 'gray';
    };

    // EFECTOS PROBA4 
    if (proba4 == 1 && puntaje > 0) {
        puntaje = Math.round(puntaje / 2);
        efectoP.innerText = 'Exposición al Sol';
        efectoP.style.color = 'orange';
    }

    // COMPROBAR DERROTA
    comprobarDerrota(dado1, dado2);

    //MOSTRAR RESULTADO
    puntos.innerText = puntaje;

    // FUNCIÓN DE REINICIAR

});

// FUNCIÓN DE PLANTARSE
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

    localStorage.setItem('puntaje', puntaje);

    guardarPuntajeDados(puntaje);

    guardarPuntajeHistorico(puntaje);

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

    let puntosParaSecretos = JSON.parse(localStorage.getItem('puntosTotales'));
        
    // SISTEMA DE SECRETOS
    if (puntosParaSecretos >= 1000 && vampiplantarse == true && secreto1Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };
    if (puntosParaSecretos >= 2000 && vampiplantarse == true && secreto2Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };
    if (puntosParaSecretos >= 3000 && vampiplantarse == true && secreto3Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };
    if (puntosParaSecretos >= 4000 && vampiplantarse == true && secreto4Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };
    if (puntosParaSecretos >= 5000 && vampiplantarse == true && secreto5Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };
    if (puntosParaSecretos >= 6000 && vampiplantarse == true && secreto6Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };
    if (puntosParaSecretos >= 7000 && vampiplantarse == true && secreto7Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };
    if (puntosParaSecretos >= 8500 && vampiplantarse == true && secreto8Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };
    if (puntosParaSecretos >= 10000 && vampiplantarse == true && secreto9Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };
    if (puntosParaSecretos >= 13000 && vampiplantarse == true && secreto10Condition == 'false') {
        alert('Desbloqueaste un Vampisecreto! Andá a "Secretos" para descubrirlo');
    };
});

// FUNCIÓN DE REINICIAR
reiniciar.addEventListener('click', function(e) {
    location.reload();
});



    


//--------------------------------------------------------------------------------------JUEGO DADOS