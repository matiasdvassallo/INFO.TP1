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

function ordenarPuntajes(array, ascendente) {
    
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            
            let debeIntercambiar;
            
            if (ascendente) {
                debeIntercambiar = array[j].puntaje > array[j + 1].puntaje;
            } else {
                debeIntercambiar = array[j].puntaje < array[j + 1].puntaje;
            }
            
            if (debeIntercambiar) {
                const temporal = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temporal;
            }
        }
    }
    
    return array;
}

function mostrarTabla(clave, idContenedor, ordenAscendente) {
    
    let historial = localStorage.getItem(clave);
    
    if (historial === null) {
        historial = [];
    } else {
        historial = JSON.parse(historial);
    }
    
    historial = ordenarPuntajes(historial, ordenAscendente);
    
    const top5 = historial.slice(0, 5);
    
    const contenedor = document.querySelector('#' + idContenedor);
    
    let html = '';
    
    for (let i = 0; i < top5.length; i++) {
        html += '<div class="fila">';
        html += '<p>' + (i + 1) + '</p>';
        html += '<p>' + top5[i].puntaje + '</p>';
        html += '<p>' + top5[i].fecha + '</p>';
        html += '</div>';
    }
    
    if (top5.length === 0) {
        html = '<p>Todavía no hay partidas registradas</p>';
    }
    
    contenedor.innerHTML = html;
}

mostrarTabla('puntajesChancho', 'filasChancho', true);
mostrarTabla('puntajesTrivia', 'filasTrivia', false);
mostrarTabla('puntajesDados', 'filasDados', false);

