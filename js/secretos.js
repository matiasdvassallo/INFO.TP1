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

//--------------------------------------------------------------------------------------SISTEMA DE SECRETOS

let puntaje = Number(localStorage.getItem('puntaje'));

let secreto1Condition = false;
let secreto2Condition = false;
let secreto3Condition = false;
let secreto4Condition = false;
let secreto5Condition = false;
let secreto6Condition = false;
let secreto7Condition = false;
let secreto8Condition = false;
let secreto9Condition = false;
let secreto10Condition = false;

let secreto1guardado = localStorage.setItem('secreto1', secreto1Condition);
let secreto2guardado = localStorage.setItem('secreto2', secreto2Condition);
let secreto3guardado = localStorage.setItem('secreto3', secreto3Condition);
let secreto4guardado = localStorage.setItem('secreto4', secreto4Condition);
let secreto5guardado = localStorage.setItem('secreto5', secreto5Condition);
let secreto6guardado = localStorage.setItem('secreto6', secreto6Condition);
let secreto7guardado = localStorage.setItem('secreto7', secreto7Condition);
let secreto8guardado = localStorage.setItem('secreto8', secreto8Condition);
let secreto9guardado = localStorage.setItem('secreto9', secreto9Condition);
let secreto10guardado = localStorage.setItem('secreto10', secreto10Condition);

let secreto1 = document.querySelector('#secreto-1');
let secreto2 = document.querySelector('#secreto-2');
let secreto3 = document.querySelector('#secreto-3');
let secreto4 = document.querySelector('#secreto-4');
let secreto5 = document.querySelector('#secreto-5');
let secreto6 = document.querySelector('#secreto-6');
let secreto7 = document.querySelector('#secreto-7');
let secreto8 = document.querySelector('#secreto-8');
let secreto9 = document.querySelector('#secreto-9');
let secreto10 = document.querySelector('#secreto-10');

// VAMPISECRETOS 1

if (puntaje >= 100) {
    secreto1.innerText = 'HOLA SOY UN SECRETO 1'
    secreto1Condition = true;
    secreto1guardado = localStorage.setItem('secreto1', secreto1Condition);
}; 

if (puntaje >= 200) {
    secreto2.innerText = 'HOLA SOY UN SECRETO 2'
    secreto2Condition = true;
    secreto2guardado = localStorage.setItem('secreto2', secreto2Condition);
}; 

if (puntaje >= 300) {
    secreto3.innerText = 'HOLA SOY UN SECRETO 3'
    secreto3Condition = true;
    secreto3guardado = localStorage.setItem('secreto3', secreto3Condition);
}; 

if (puntaje >= 400) {
    secreto4.innerText = 'HOLA SOY UN SECRETO 4'
    secreto4Condition = true;
    secreto4guardado = localStorage.setItem('secreto4', secreto4Condition);
}; 

if (puntaje >= 500) {
    secreto5.innerText = 'HOLA SOY UN SECRETO 5'
    secreto5Condition = true;
    secreto5guardado = localStorage.setItem('secreto5', secreto5Condition);
}; 

if (puntaje >= 600) {
    secreto6.innerText = 'HOLA SOY UN SECRETO 6'
    secreto6Condition = true;
    secreto6guardado = localStorage.setItem('secreto6', secreto6Condition);
}; 

if (puntaje >= 700) {
    secreto7.innerText = 'HOLA SOY UN SECRETO 7'
    secreto7Condition = true;
    secreto7guardado = localStorage.setItem('secreto7', secreto7Condition);
}; 

if (puntaje >= 850) {
    secreto8.innerText = 'HOLA SOY UN SECRETO 8'
    secreto8Condition = true;
    secreto8guardado = localStorage.setItem('secreto8', secreto8Condition);
}; 

if (puntaje >= 1000) {
    secreto9.innerText = 'HOLA SOY UN SECRETO 9'
    secreto9Condition = true;
    secreto9guardado = localStorage.setItem('secreto9', secreto9Condition);
}; 

if (puntaje >= 1300) {
    secreto10.innerText = 'HOLA SOY UN SECRETO 10'
    secreto10Condition = true;
    secreto10guardado = localStorage.setItem('secreto10', secreto10Condition);
};
