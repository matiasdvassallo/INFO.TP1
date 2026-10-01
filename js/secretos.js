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

//--------------------------------------------------------------------------------------SISTEMA DE SECRETOS

let puntaje = Number(localStorage.getItem('puntaje'));

let secreto1 = document.querySelector('#secreto-1');
let secreto2 = document.querySelector('#secreto-2');
let secreto3 = document.querySelector('#secreto-3');

// VAMPISECRETOS 1

if (puntaje >= 100) {
    secreto1.innerText = 'HOLA SOY UN SECRETO 1'
}; if (puntaje >= 250) {
    secreto2.innterText = 'HOLA SOY UN SECRETO 2'
} if (puntaje >= 400) {
    secreto3.innerText = 'HOLA SOY UN SECRETO 3'
}
