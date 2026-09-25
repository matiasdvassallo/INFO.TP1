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

botondados.addEventListener('click', function(e) {
    e.preventDefault()

    let dado1 = Math.floor(Math.random() * 6) + 1;
    let dado2 = Math.floor(Math.random() * 6) + 1;

    imgdado1.src = 'img/fotos/dados/dado' + dado1 + '.png';
    imgdado2.src = 'img/fotos/dados/dado' + dado2 + '.png';

    if (dado1 == 1 && dado2 == 3) {
        titulo.innerText = 'VAMPIPERDISTE!';
        plantarse.disabled = true;
        botondados.disabled = true;
        reiniciar.hidden = false;
    }

    puntaje += dado1 + dado2;

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