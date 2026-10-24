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

//--------------------------------------------------------------------------------------SISTEMA DE SECRETOS

//------------------------------------------------Declaraciones

const secretosData = [
    { puntos: 1000, id: 'secreto-1', texto: '1. Desde tiempos inmemoriales que los vampiros son grandes aficionados de los juegos de mesa. Mucha gente cree que los vampiros se pasan todo el tiempo en sus castillos por ser seres solitarios, sin embargo, solo están jugando juegos sin parar. ' },
    { puntos: 2000, id: 'secreto-2', texto: '2. Hay tres tipos de juegos que los vampiros adoran más que dormir en ataúdes. El "Chancho Va", los juegos de dados, y los juegos de preguntas.' },
    { puntos: 3000, id: 'secreto-3', texto: '3. Los vampiros tienen un sentido del humor bastante agudo, les encanta cambiar el nombre de los juegos y adaptarlos a su cultura...' },
    { puntos: 4000, id: 'secreto-4', texto: '4. Drácula fundó el primer campeonato de juegos de mesa vampíricos. Fue un total éxito que atravesó razas de monstruos e inclusive humanos. Tal fue el punto de su popularidad que fue a través de los juegos que se halló la paz entre los vampiros y los cazadores de vampiros.' },
    { puntos: 5000, id: 'secreto-5', texto: '5. El cruce con los humanos permitió entrelazar culturas. Y de esto se beneficiaron las trivias, que cobraban sentidos más amplios y ricos en cuanto a conocimiento. Cosa que los vampiros adoran.' },
    { puntos: 6000, id: 'secreto-6', texto: '6. Los nigromantes, no muy queridos, crearon sus propias versiones de juegos con magia oscura. En ellos, había una serie de bendiciones y maldiciones que afectaban la jugabilidad en vivo y en directo. Sin embargo, a Drácula le gustaban estas versiones' },
    { puntos: 7000, id: 'secreto-7', texto: '7. Mientras más crecía la multitud que jugaba juegos de mesas vampíricos por fuera del campeonato, más era la imperiosa necesidad de establecer reglas y estandarizar los juegos. Es así Drácula oficializó 3 juegos: Chancho Va(mpiro), Dados Sangrientos y Netflix and Kill' },
    { puntos: 8500, id: 'secreto-8', texto: '8. Todos estaban de acuerdo con las reglas de Drácula, excepto los nigromantes. Se sintieron traicionados ya que Drácula no había incluído su magia en los juegos oficiales.' },
    { puntos: 10000, id: 'secreto-9', texto: '9. Fue así que el 13 de enero de 1813 el equipo de Nigromantes que participaba en el Tricentésimo Vampicampeonato de juegos tendieron una trampa durante la jornada de "Dados Sangrientos". Cualquiera que sacara 1 y 3 perdería la capacidad de jugar' },
    { puntos: 13000, id: 'secreto-10', texto: '10. Para no perder la idea central de los vampijuegos: la unión entre razas, Drácula lanzó una Dracubendición sobre los juegos de mesa. Fue así que cualquiera que quisiera participar en los campeonatos o jugar en su casa, solo podría hacerlo con buenas intenciones.' }
];

const divPuntosTotales = document.querySelector('#puntos-totales-secretos');

//------------------------------------------------Funciones

function obtenerPuntosTotales() {
    return JSON.parse(localStorage.getItem('puntosTotales')) || 0;
}

function desbloquearSecretos() {
    const puntosTotales = obtenerPuntosTotales();
    
    secretosData.forEach(secreto => {
        const elemento = document.querySelector('#' + secreto.id);
        const yaDesbloqueado = localStorage.getItem(secreto.id) === 'true';
        
        // Si ya fue desbloqueado, mantenerlo visible
        if (yaDesbloqueado) {
            elemento.innerText = secreto.texto;
        } 
        // Si no fue desbloqueado pero tiene puntos suficientes, desbloquearlo
        else if (puntosTotales >= secreto.puntos) {
            elemento.innerText = secreto.texto;
            localStorage.setItem(secreto.id, 'true');
        }
    });
    
    divPuntosTotales.innerText = 'Puntos Históricos: ' + puntosTotales;
}

//------------------------------------------------Ejecución

desbloquearSecretos();