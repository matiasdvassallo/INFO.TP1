//--------------------------------------------------------------------------------------MENU DESPLEGABLE
let juegos = document.querySelector('#juegosnav');
let navdos = document.querySelector('#ul2');
let menu = false

juegos.addEventListener('click', (e) => {

    e.preventDefault()
    if (menu == false) {
    navdos.innerHTML = '<li class="mainLi"><a href="juego1.html" target="_self">Chancho va(mpiro)</a></li>' +
			            '<li class="mainLi"><a href="juego2.html" target="_self">Juego 2</a></li>' +
						'<li class="mainLi"><a href="juego3.html" target="_self">Juego 3</a></li>';
    menu = true;
    } else {
        navdos.innerHTML = '';
        menu = false;
    };

});
//--------------------------------------------------------------------------------------MENU DESPLEGABLE