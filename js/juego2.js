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
plantarse.disabled = false;

let efectoP = document.querySelector('#efecto-p')

botondados.addEventListener('click', function(e) {
    e.preventDefault()
    
    // DATO DE DADOS
    let dado1 = Math.floor(Math.random() * 6) + 1;
    let dado2 = Math.floor(Math.random() * 6) + 1;

    // DADOS
    imgdado1.src = 'img/fotos/dados/dado' + dado1 + '.png';
    imgdado2.src = 'img/fotos/dados/dado' + dado2 + '.png';

    // SUAMR PUNTAJE
    puntaje += dado1 + dado2;

    // DATO DE EVENTOS
    let evento = Math.floor(Math.random() * 3) + 1;

    // EVENTOS
    if (evento == 1 || evento == 2 || evento == 3) {
        efectoP.style.color = 'red';
    }
    
    if (evento == 1 && puntaje > 0) {
        puntaje += dado1 + dado2
        efectoP.innerText = 'Sed de Sangre';
        efectoP.style.color = 'red';

    } else if (evento == 2 && puntaje >= 15) {
        puntaje -= 15;
        efectoP.innerText = 'Ajo y agua';
        efectoP.style.color = 'gray'  
    } else if (evento == 3) {
        dado2 = 3
        imgdado2.src = 'img/fotos/dados/dado' + dado2 + '.png';
        efectoP.innerText = 'Mal Presagio'
        efectoP.style.color = 'purple'
    } else {
        efectoP.innerText = 'Noche Tranquila'
        efectoP.style.color = '#47415d'
    };

    // COMRPOBAR DERROTA
    if (dado1 == 1 && dado2 == 3) {
        titulo.innerText = 'VAMPIPERDISTE!';
        plantarse.disabled = true;
        botondados.disabled = true;
        reiniciar.hidden = false;
    }

    //MOSTRAR RESULTADO
    puntos.innerText = puntaje;

});

plantarse.addEventListener ('click', function(e) {
    titulo.innerText = 'Puntos Sangrientos FINALES';
    plantarse.disabled = true;
    botondados.disabled = true;
    reiniciar.hidden = false;
})

reiniciar.addEventListener('click', function(e) {
    location.reload(); //MOMENTANEO?
})

// FALTAN PONER BENEFICIOS Y OBSTACULOS (?

//--------------------------------------------------------------------------------------JUEGO DADOS