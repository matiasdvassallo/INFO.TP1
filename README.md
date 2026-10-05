# TP 1 ("VampiJuegos") - Informática General - Cátedra Drelichman TN - UNA (Área Transdepartamental de Artes Multimediales) - Sofia Suarez y Matías Vassallo

Decidimos realizar un página con una estética retro 8-bit gótica. Estilo "Castlevania". Esta fue la piedra angular de todo el proyecto. La aplicación de los estilos y los juegos elegidos siguieron ese concepto. Priman colores fuertes pero sobrios, como los rojos sangres, el dorado, morados y grises. Además de la utlización de tipografías y boxes que acompañen la temática que queríamos para la web.

VampiJuegos consta de tres juegos: Chancho Va(mpiro), Dados Sangrientos, Netflix and Kill.

- Chancho Va(mpiro): Juega el usuario contra tres bots. Cada jugador comienza con cuatro cartas y elige cuál pasar al jugador debajo (el último pasándosela al primero). Deberán juntar cuatro cartas iguales para poder presionar el botón CHANCHO y habilitárselo a los demás. Una vez habilitado, todo jugador deberá presionarlo sin importar el estado de sus cartas. El último en hacerlo pierde la ronda y suma una letra de 'CHANCHO'. El jugador que complete la palabra 'CHANCHO' queda eliminado. El último en quedar vivo es el ganador.
Para no complejizar el código, decidimos que los bots, en lugar de decidir qué carta pasar, pasen una aleatoriamente. Para balancearlo y que tengan más posibilidades de ganar, creamos una función que les da un porcentaje de chance de presionar CHANCHO luego de un desplazamiento sin necesariamente tener las cuatro cartas iguales.
Lamentablemente me encontré con varios bugs a último momento que no llegué a poder resolver, como que hay veces donde el usuario consigue las cuatro cartas y toca el botón pero empieza a acumular letras como si estuviera perdiendo, o consigue las cuatro cartas iguales y no se le habilita el botón.

- Dados Sangrientos: Disponés de 2 dados para lanzar con el botón. Vas a poder ir acumulando Puntos Sangrientos a medida que vas tirando los dados. El resultado de los Puntos Sangrientos será la suma de ambos dados. Sin embargo, si los dados llegan a formar un 13 (Simbolo del mal presagio y la muerte) VAMPIPERDISTE! Si estás contentx con tu Puntaje Sangriento podés Vampiplantarte y terminar tu turno ahí para registrar tu puntaje. Además, existe la posibilidad de obtener bendiciones y maldiciones que beneficiarán o obstaculizarán tu partida: Sed de Sangre (de doblan los puntos sangrientos obtenidos en esa ronda), Mal Auguario (el segundo dado cambia automáticamente a 13), Dracubendición! (Se doblan los puntos sangrientos totales obtenidos hasta el momento. ESTE EVENTO SE ENCUENTRA VIGENTE HASTA QUE EL JUGADOR OBTENGA 1000 PUNTOS), Ajo y agua (Se resta un 15% de los puntos sangrientos totales obtenidos hasta el momento. ESTE EVENTO SE ACTIVA SOLO CUANDO EL JUGADOR TIENE MÁS DE 100 PUNTOS SANGRIENTOS).
Además, se generó un sistema de secretos desbloqueables para este juego en particular. Nos pareció una forma adecuada y entretenida para darle mayor sentido y sustento a Dados Sangrientos. Hay 10 secretos en total con sus requisitos de puntaje respectivos. Se creó una página adicional con este propósito.

- Netflix and Kill: Esta es una trivia sobre cine. Arrancás con 3 vidas y tenés 10 preguntas con 10 segundos por pregunta. A medida que las acertás ganas puntos. Si te equivocás, perdés una vida. Si perdés las tres vidas, termina el juego. 
API UTILIZADA: https://opentdb.com/api.php?amount=10&category=11&difficulty=
Para este juego quisimos buscar alguna API con temática de vampiros o de horror pero no encontramos una pública, por lo que decidimos usar la categoría de películas de la API Open Trivia Database y mantener el concepto del proyecto llamando el juego "Netflix and kill".
Esta API solo provee preguntas en inglés, y decidimos no involucrar otra API que las traduzca para no complejizar el proyecto.
Además, como a veces la API tarda en responder por exceso de solicitudes, agregamos un aviso para esperar unos segundos antes de seguir intentando.

- Organización de archivos:

Se crearon 7 archivos HTML (index.html / juego1.html / juego2.html / juego3.html / puntajes.html / info.html / secretos.html), una carpeta JS con 7 archivos JS (index.js / juego1.js / juego2.js / juego3.js / puntajes.js / info.js / secretos.js) y una carpeta CSS con una única hoja de estilos (estilos.css). Para las imágenes utilizadas se creó una carpeta "img" donde se crearon 4 subcarpetas (cartas / favicon / fondos / dados). Por último, un archivo README.

- Tecnologías Utilizadas:

Se utilizó VisualCode Studio con un Live Server integrado para la realización del proyecto, además de CHAT GPT y Claude como IAs. Todo fue subido a GITHUB a través de GITHUB Desktop.

- Funcionalidades (JS):

- Se utilizó JS para realizar un menú desplegable con links a cada juego
- En Chancho Va(mpiro) hay un reparto aleatorio de cartas, un desplazamiento de cartas del usuario (a elección) y de los bots (aleatorio), un sistema que detecta si alguien juntó cuatro cartas iguales, un botón CHANCHO que se habilita cuando corresponde, un amague para que los bots tengan una probabilidad de ganar la ronda sin tener 4 cartas iguales y un sistema de eliminación progresiva.
- En Dados Sangrientos se uitilizó el Local Storage para poder utilizar la variable de puntaje y su value en la página de secretos para desbloquear los Vampisecretos.
- En Netflix and Kill hay una selección de dificultad, obtención de preguntas desde una API externa, decodificación de texto, mezcla de las opciones de respuesta (para que la ubicación de la correcta no sea predecible), un sistema de vidas y un tiempo límite por pregunta.
- Todos los puntajes de los juegos son guardados en el Local Storage y mostrados en la página de Puntajes.

- Declaración de uso de IA:

Matías: Utilicé CHAT GPT Plus y CHAT GPT Estándar. Empecé usando lo poco que me quedaba de la membresía gratis del Plus para el proyecto y luego me pasé a la versión estándar nuevamente. El cambio es total. De base que al pasar a la versión común tenía un máximo muy chico de preguntas aprox. para hacerle antes de que se bloqueara el chat. Al utilizar el mismo chat siempre para codear, tiene registro de archivos, capturas, consultas, memoria que, en la versión estándar, limita la cantidad de usos que le podes dar.
Para este proyecto debo admitir que no realicé un uso intensivo de la IA. Fue para resolver pequeńas dudas puntuales. Luego del segundo parcial me terminé familiarizando con la lógica del JS por lo que hice uso de la IA solo dos veces para estructurar bien una operación del JS del huego de dados, 
El principal uso que le di fue para resolver algunos layouts de CSS. Al haber tantos div, article, section, aside, necesitaba una mano muchas veces para poder determinar con eficacia cómo estructurar el diseńo de las páginas o qué es lo que estaba haciendo que no quedén las cosas como el boceto. Donde más uso le di fue para realizar la página de Dados Sangrientos. Sin embargo, luego haber utilizado la IA, muchos de los trucos, consejos, o teorías que me brindaba me las aprendía y para la segunda mitad del TP ya no necesité.

Pros: 1) Ya me conoce, sabe cómo trabajo, está al tanto de la materia y los requisitos que esta pide por lo que las consultas que le hago siempre tienen una respuesta que me sirve y es veraz. 2) Utilizar CHAT GPT Plus cambia mucho el paradigma de la IA. Es más rápida, más atenta, precavida, utiliza más la memoria registrada, tenés más tiempo para usar el chat sin importar la cantidad de archivos o imágenes que este tenga. 

Contras: 1) El principal contra fue el pasaje del PLUS al Estándar. Ahí directamente la dejé de usar porque no podía intercambiar más de 2 consultas sin que se me bloquee. Es un poco tramposo, ya que te obliga a pagar la membresía.

Sofía: Utilicé Claude (versión gratuita). La utilicé para que me sugiera una forma de estructurar el HTML del juego de cartas y la trivia, y para que me ayude a desarrollar sus respectivas funciones en JS. En el caso del juego de cartas, me tomé el tiempo antes de desarrollar las reglas y un texto con algo de pseudocódigo de cómo tendría que funcionar el juego, y a partir de ahí me fui ayudando con la IA para desarrollarlo en JS. En el caso de la trivia, la IA me ayudó a entender cómo interactuar con la API, qué me devuelve, cómo decodificar los símbolos extraños, y a desarrollar las distintas funciones. Siempre pedí que fuera explicativa, que se mantuviera en los parámetros de lo que aprendí, busqué que no complejice demás el desarrollo y me tomé el tiempo de entender y ajustar el código.

Pros: Le delegué más cosas que en los parciales y pude probar y desarrollar los juegos más rápido de lo que podría haberlo hecho sola. 

Contras: Me sentí menos en control del desarrollo del js y siento que dedicarle menos tiempo por delegar tanto me volvió más dependiente y no me permitió aprender tanto. Además, en el Chancho Va me fui encontrando con bugs y en el ida y vuelta con la IA para solucionarlo me quedé sin mensajes gratuitos y sin tiempo de resolverlo. Cuando intenté usar otra IA (chat gpt) para ayudarme a resolverlo, no tenía tan presente mi contexto y me devolvía incoherencias, empeorando el problema que intentaba resolver.