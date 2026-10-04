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
    secreto1.innerText = '1. Desde tiempos inmemoriales que los vampiros son grandes aficionados de los juegos de mesa. Mucha gente cree que los vampiros se pasan todo el tiempo en sus castillos por ser seres solitarios, sin embargo, solo están jugando juegos sin parar. '
    secreto1Condition = true;
    secreto1guardado = localStorage.setItem('secreto1', secreto1Condition);
}; 

if (puntaje >= 200) {
    secreto2.innerText = '2. Hay tres tipos de juegos que los vampiros adoran más que dormir en ataúdes. El "Chancho Va", los juegos de dados, y los juegos de preguntas.'
    secreto2Condition = true;
    secreto2guardado = localStorage.setItem('secreto2', secreto2Condition);
}; 

if (puntaje >= 300) {
    secreto3.innerText = '3. Los vampiros tienen un sentido del humor bastante agudo, les encanta cambiar el nombre de los juegos y adaptarlos a su cultura...'
    secreto3Condition = true;
    secreto3guardado = localStorage.setItem('secreto3', secreto3Condition);
}; 

if (puntaje >= 400) {
    secreto4.innerText = '4. Drácula fundó el primer campeonato de juegos de mesa vampíricos. Fue un total éxito que atravesó razas de monstruos e inclusive humanos. Tal fue el punto de su popularidad que fue a través de los juegos que se halló la paz entre los vampiros y los cazadores de vampiros.'
    secreto4Condition = true;
    secreto4guardado = localStorage.setItem('secreto4', secreto4Condition);
}; 

if (puntaje >= 500) {
    secreto5.innerText = '5. El cruce con los humanos permitió entrelazar culturas. Y de esto se beneficiaron las trivias, que cobraban sentidos más amplios y ricos en cuanto a conocimiento. Cosa que los vampiros adoran.'
    secreto5Condition = true;
    secreto5guardado = localStorage.setItem('secreto5', secreto5Condition);
}; 

if (puntaje >= 600) {
    secreto6.innerText = '6. Los nigromantes, no muy queridos, crearon sus propias versiones de juegos con magia oscura. En ellos, había una serie de bendiciones y maldiciones que afectaban la jugabilidad en vivo y en directo. Sin embargo, a Drácula le gustaban estas versiones'
    secreto6Condition = true;
    secreto6guardado = localStorage.setItem('secreto6', secreto6Condition);
}; 

if (puntaje >= 700) {
    secreto7.innerText = '7. Mientras más crecía la multitud que jugaba juegos de mesas vampíricos por fuera del campeonato, más era la imperiosa necesidad de establecer reglas y estandarizar los juegos. Es así Drácula oficializó 3 juegos: Chancho Va(mpiro), Dados Sangrientos y Netflix and Kill'
    secreto7Condition = true;
    secreto7guardado = localStorage.setItem('secreto7', secreto7Condition);
}; 

if (puntaje >= 850) {
    secreto8.innerText = '8. Todos estaban de acuerdo con las reglas de Drácula, excepto los nigromantes. Se sintieron traicionados ya que Drácula no había incluído su magia en los juegos oficiales.'
    secreto8Condition = true;
    secreto8guardado = localStorage.setItem('secreto8', secreto8Condition);
}; 

if (puntaje >= 1000) {
    secreto9.innerText = '9. Fue así que el 13 de enero de 1813 el equipo de Nigromantes que participaba en el Tricentésimo Vampicampeonato de juegos tendieron una trampa durante la jornada de "Dados Sangrientos". Cualquiera que sacara 1 y 3 perdería la capacidad de jugar'
    secreto9Condition = true;
    secreto9guardado = localStorage.setItem('secreto9', secreto9Condition);
}; 

if (puntaje >= 1300) {
    secreto10.innerText = '10. Para no perder la idea central de los vampijuegos: la unión entre razas, Drácula lanzó una Dracubendición sobre los juegos de mesa. Fue así que cualquiera que quisiera participar en los campeonatos o jugar en su casa, solo podría hacerlo con buenas intenciones.'
    secreto10Condition = true;
    secreto10guardado = localStorage.setItem('secreto10', secreto10Condition);
};
