//--------------------------------------------------------------------------------------MENU DESPLEGABLE
let juegos = document.querySelector('#juegosnav');
let navdos = document.querySelector('#ul2');
let menu = false

juegos.addEventListener('click', (e) => {

    e.preventDefault()
    if (menu == false) {
    navdos.innerHTML = '<li class="mainLi"><a href="../juego1.html" target="_self"><span>Chancho va(mpiro)</span></a></li>' +
			            '<li class="mainLi"><a href="../juego2.html" target="_self"><span>Dados Sangrientos</span></a></li>' +
						'<li class="mainLi"><a href="../juego3.html" target="_self"><span>Netflix and Kill</span></a></li>' +
                        '<li class="mainLi""><a href="juego_backup.html" target="_self"><span>(Juego Backup)</span></a></li>';
    menu = true;
    } else {
        navdos.innerHTML = '';
        menu = false;
    };

});
//--------------------------------------------------------------------------------------MENU DESPLEGABLE

//--------------------------------------------------------------------------------------JUEGO CARTAS

let cartasElegir = document.querySelectorAll('.carta')

let botonReiniciar = document.querySelector('#reiniciar-backup');
let puntaje = document.querySelector('#puntos-backup');
let titulo = document.querySelector('#titulo-backup');
let vidas = document.querySelector('#vidas')

let vida = 5
let puntos = 0
let cartasDadasVuelta = 0
let cartasYaDadaVuelta = []
let cartaMalditaCondition = false

botonReiniciar.disabled = true

let cartaMaldita = Math.floor(Math.random() * 4);

for (let i = 0; i < cartasElegir.length; i++) {

    cartasElegir[i].addEventListener('click', function(e) {

        if (cartasYaDadaVuelta[i] == true) {
            return;
        }

        if (i == cartaMaldita) {

            cartaMalditaCondition = true
            cartasElegir[i].src = '../img/cartas/1.png';
            vida--;
            vidas.innerText = 'Vidas: ' + vida;

        } else {

            cartasElegir[i].src = '../img/cartas/4.png';
            puntos += 10;
            puntaje.innerText = puntos;

        }

        cartasYaDadaVuelta[i] = true;
        cartasDadasVuelta++;

        if (cartasDadasVuelta == 3 && cartaMalditaCondition == false) {

            botonReiniciar.disabled = false;
            botonReiniciar.style.color = 'purple';
            botonReiniciar.style.border = '3px solid purple';
            botonReiniciar.style.backgroundColor = 'white';

        }

        if (cartasDadasVuelta == 4 && cartaMalditaCondition == true) {

            botonReiniciar.disabled = false;
            botonReiniciar.style.color = 'purple';
            botonReiniciar.style.border = '3px solid purple';
            botonReiniciar.style.backgroundColor = 'white';

        }

        if (vida == 0) {

            titulo.innerText = 'PERDISTE!';
            botonReiniciar.disabled = false;
            botonReiniciar.innerText = 'REINTENTAR'

            botonReiniciar.addEventListener('click', function(e) {
                location.reload();
            })

        }

    });

}

botonReiniciar.addEventListener('click', function() {

    cartasDadasVuelta = 0;
    cartasYaDadaVuelta = [];
    cartaMalditaCondition = false;

    for (let i = 0; i < cartasElegir.length; i++) {

        cartasElegir[i].src = '../img/cartas/dorso.png';
        cartasElegir[i].disabled = false;

    }

    cartaMaldita = Math.floor(Math.random() * 4);

    botonReiniciar.disabled = true;
    botonReiniciar.style.color = '#47415d';
    botonReiniciar.style.border = '3px solid #47415d';
    botonReiniciar.style.backgroundColor = 'gray';

});

//--------------------------------------------------------------------------------------JUEGO CARTAS
