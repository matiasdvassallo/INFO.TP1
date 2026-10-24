# TP 1 ("VampiJuegos") - Informática General - Cátedra Drelichman TN - UNA (Área Transdepartamental de Artes Multimediales) - Sofia Suarez y Matías Vassallo

Decidimos realizar una página con una estética retro 8-bit gótica. Estilo "Castlevania". Esta fue la piedra angular de todo el proyecto. La aplicación de los estilos y los juegos elegidos siguieron ese concepto. Priman colores fuertes pero sobrios, como los rojos sangre, el dorado, morados y grises. Además de la utilización de tipografías y boxes que acompañen la temática que queríamos para la web.



VampiJuegos consta de tres juegos: Chancho Va(mpiro), Dados Sangrientos, Netflix and Kill.

- Chancho Va(mpiro): Juega el usuario contra tres bots. Cada jugador comienza con cuatro cartas y elige cuál pasar al siguiente jugador (el último pasándosela al primero). Deberán juntar cuatro cartas iguales para poder presionar el botón CHANCHO y habilitárselo a los demás. Una vez habilitado, todo jugador deberá presionarlo sin importar el estado de sus cartas. El último en hacerlo pierde la ronda y suma una letra de 'CHANCHO'. El jugador que complete la palabra 'CHANCHO' queda eliminado. (En caso de ser el usuario, pierde la partida).
Para mantener una fidelidad con la forma de juego de una persona real, hicimos que los bots una vez que tengan una carta repetida pueden desplazar una carta diferente, con una pequeña probabilidad de desplazar una de las repetidas. Permitiendo así que jueguen con estrategias, complejizando el juego y el código.
También, luego de realizar diferentes pruebas les otorgamos un rango de tiempo de reacción a los bots, para que esto le diera al jugador un mayor desafío. 

- Dados Sangrientos: Disponés de 2 dados para lanzar con el botón. Vas a poder ir acumulando Puntos Sangrientos a medida que vas tirando los dados. El resultado de los Puntos Sangrientos a sumar será el valor que resulta de concatenar los numeros de ambos dados. Sin embargo, si los dados llegan a formar un 13 (Simbolo del mal presagio y la muerte) VAMPIPERDISTE!
Si estás contentx con tu Puntaje Sangriento podés Vampiplantarte y terminar tu turno ahí para registrar tu puntaje. Creamos un puntaje histórico que va sumando los puntajes obtenidos en cada ronda y le permite al jugador desbloquear una serie de secretos que desvelan el lore de la página (VEASE MÁS ADELANTE)
Existe la posibilidad de obtener bendiciones y maldiciones que beneficiarán o obstaculizarán tu partida:

Sed de Sangre (se doblan los puntos sangrientos obtenidos en esa ronda).
Mal Auguario (el segundo dado cambia automáticamente a 3).
Dracubendición! (Se doblan los puntos sangrientos totales obtenidos hasta el momento).
Ajo y agua (Se resta un 15% de los puntos sangrientos totales obtenidos hasta el momento. ESTE EVENTO SE ACTIVA SOLO CUANDO EL JUGADOR TIENE 300 PUNTOS SANGRIENTOS O MÁS).
Exposición al Sol (Se reducen los Puntos Sangrientos totales obtenidos hasta el momento a la mitad. ESTE EVENTO SE ACTIVA SOLO CUANDO EL JUGADOR TIENE 1000 PUNTOS SANGRIENTOS O MÁS).
Dracumaldición! (Un sistema anti-trampas para que el jugador no acumule rápidamente puntos. En el caso de que tire los dados y acto seguido se plante, y esto lo haga 3 veces, perderá la mitad de los Puntos Históricos obtenidos hasta ese momento). 

Se generó un sistema de secretos desbloqueables para este juego en particular. Nos pareció una forma adecuada y entretenida para darle mayor sentido y sustento a Dados Sangrientos. Hay 10 secretos en total con sus requisitos de Puntaje Histórico respectivos. Se creó una página adicional que los contiene. 
ACLARACIÓN: Los secretos desbloqueados no son afectados por la perdida de Puntos Históricos.

- Netflix and Kill: Esta es una trivia sobre cine. Arrancás con 3 vidas y tenés 10 preguntas con 15 segundos por pregunta. A medida que las acertás ganas puntos. Si te equivocás, perdés una vida. Si perdés las tres vidas, termina el juego. 
API UTILIZADA: https://opentdb.com/api.php?amount=10&category=11&difficulty=
Para este juego quisimos buscar alguna API con temática de vampiros o de horror pero no encontramos una pública, por lo que decidimos usar la categoría de películas de la API Open Trivia Database y mantener el concepto del proyecto llamando el juego "Netflix and Kill".
Esta API solo provee preguntas en inglés, y decidimos no involucrar otra API que las traduzca para no complejizar el proyecto.
Además, como a veces la API tarda en responder por exceso de solicitudes, agregamos un aviso para esperar unos segundos antes de seguir intentando.



- Organización de archivos:

Se crearon 7 archivos HTML (index.html / juego1.html / juego2.html / juego3.html / puntajes.html / info.html / secretos.html), una carpeta JS con 7 archivos JS (index.js / juego1.js / juego2.js / juego3.js / puntajes.js / info.js / secretos.js) y una carpeta CSS con una única hoja de estilos (estilos.css). Para las imágenes utilizadas se creó una carpeta "img" donde se crearon 4 subcarpetas (cartas / favicon / fondos / dados). Por último, un archivo README.

- Tecnologías Utilizadas:

Se utilizó VisualCode Studio con un Live Server integrado para la realización del proyecto, además de CHAT GPT, Claude, y GEMINI como IAs. Todo fue subido a GITHUB a través de GITHUB Desktop.

- Funcionalidades (JS):

- Se utilizó JS para realizar un menú desplegable con links a cada juego
- En Chancho Va(mpiro) hay un reparto aleatorio de cartas, un desplazamiento de cartas del usuario y de los bots, un sistema que detecta si alguien juntó cuatro cartas iguales, un botón CHANCHO que se habilita cuando corresponde, una función que permite a los bots acumular cartas iguales y tener una chance de cambiar estrategias y un sistema de eliminación progresiva.
- En Dados Sangrientos se utilizó el Local Storage para poder acumular los Puntos Totales obtenidos, y a partir de esto poder usarlos para desbloquear los secretos en la página de Vampisecretos y darle funcionalidad a la mecánica antitrampas.
- En Netflix and Kill hay una selección de dificultad, obtención de preguntas desde una API externa, decodificación de texto, mezcla de las opciones de respuesta (para que la ubicación de la correcta no sea predecible), un sistema de vidas y un tiempo límite por pregunta.
- Todos los puntajes de los juegos son guardados en el Local Storage y mostrados en la página de Puntajes.

- Declaración de uso de IA:

Matías: Utilicé CHAT GPT Plus y CHAT GPT Estándar. Empecé usando lo poco que me quedaba de la membresía gratis del Plus para el proyecto y luego me pasé a la versión estándar nuevamente. El cambio es total. De base que al pasar a la versión común tenía un máximo muy chico de preguntas aprox. para hacerle antes de que se bloqueara el chat. Al utilizar el mismo chat siempre para codear, tiene registro de archivos, capturas, consultas, memoria que, en la versión estándar, limita la cantidad de usos que le podes dar.
Para este proyecto no realicé un uso intensivo de la IA. Fue para resolver pequeńas dudas puntuales. Luego del segundo parcial me terminé familiarizando con la lógica del JS por lo que hice uso de la IA solo para estructurar bien operaciones del JS del juego de dados. Luego fueron dudas puntuales sobre el JS, sobre variables y operaciones, o dudas sobre el LocalStorage. 
El principal uso que le di fue para resolver algunos layouts de CSS. Al haber tantos div, article, section, aside, necesitaba una mano muchas veces para poder determinar con eficacia cómo estructurar el diseńo de las páginas o qué es lo que estaba haciendo que no quedén las cosas como el boceto. Donde más uso le di fue para realizar la página de Dados Sangrientos. Sin embargo, luego haber utilizado la IA, algunos de los trucos, consejos, o teoría que me brindaba me las aprendía y reducía la frecuencia de uso que le daba.

Pros: 1) Ya me conoce, sabe cómo trabajo, está al tanto de la materia y los requisitos que esta pide por lo que las consultas que le hago siempre tienen una respuesta que me sirve y es veraz. 2) Utilizar CHAT GPT Plus cambia mucho el paradigma de la IA. Es más rápida, más atenta, precavida, utiliza más la memoria registrada, tenés más tiempo para usar el chat sin importar la cantidad de archivos o imágenes que este tenga. Las respuestas son personalizadas y mucho más completas.

Contras: 1) El principal contra fue el pasaje del PLUS al Estándar. Ahí directamente la dejé de usar porque no podía intercambiar más de 2 consultas sin que se me bloquee. Es un poco tramposo, ya que te obliga a pagar la membresía. El problema de empezar un nuevo chat es que no captura toda la memoria registrada y las respuestas no son "a medida". 
También, me doy cuenta que darle un uso casi rutinario a la IA (no solo para esta materia, sino en general) genera en efecto una deuda cognitiva. La voluntad para pensar y razonar se reduce y la necesidad de delegarle todo a la IA aumenta. Me resulta más grato siempre que me explique qué es lo que hizo o como lo razonó para yo aprender y poder entenderlo, que leer su resolución, me haga sentido y estar conforme.

Sofía: Utilicé Claude (versión gratuita). La utilicé para que me sugiera una forma de estructurar el HTML del juego de cartas y la trivia, y para que me ayude a desarrollar sus respectivas funciones en JS. En el caso del juego de cartas, me tomé el tiempo antes de desarrollar las reglas y un texto con algo de pseudocódigo de cómo tendría que funcionar el juego, y a partir de ahí me fui ayudando con la IA para desarrollarlo en JS. En el caso de la trivia, la IA me ayudó a entender cómo interactuar con la API, qué me devuelve, cómo decodificar los símbolos extraños, y a desarrollar las distintas funciones. Siempre pedí que fuera explicativa, que se mantuviera en los parámetros de lo que aprendí, busqué que no complejice demás el desarrollo y me tomé el tiempo de entender y ajustar el código.
También utilicé en menor medida GEMINI, para ayudarme a resolver problemas que surgían con la aplicación de estilos a lo largo de la página.

Pros: Le delegué más cosas que en los parciales y pude probar y desarrollar los juegos más rápido de lo que podría haberlo hecho sola. 

Contras: Me sentí menos en control del desarrollo del js y siento que dedicarle menos tiempo por delegar tanto me volvió más dependiente y no me permitió aprender tanto. Además, en el Chancho Va me fui encontrando con bugs y en el ida y vuelta con la IA para solucionarlo me quedé sin mensajes gratuitos y resolverlo se terminó haciendo muy largo y tosco. Cuando intenté usar otra IA (chat gpt) para ayudarme a resolverlo, no tenía tan presente mi contexto y me devolvía incoherencias, empeorando el problema que intentaba resolver. Además, noté un peor desempeño de Claude en relación a la ayuda que me dio en los parciales, y tuve que tener largos idas y vueltas para que no me rompa el código o lo complejice demás.
