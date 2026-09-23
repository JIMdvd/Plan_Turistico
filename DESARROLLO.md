# Entorno del mapa turístico

El proyecto es un sitio estático con HTML, CSS y JavaScript. Usa Mapbox GL JS 3.8.0, ya empleado en el proyecto. No necesita backend ni compilación. Abrir con un servidor local (por ejemplo Live Server) para desarrollar; no publicar aún.

Con Node 18 o posterior: ejecutar `npm run dev` en esta carpeta y abrir `http://127.0.0.1:5173`. No requiere instalar paquetes. `npm run check` comprueba la sintaxis de los archivos. El servidor solo escucha en el equipo local y no sirve las copias de respaldo. Los mapas requieren conexión a Internet.

- `index.html`: estructura y dependencias, versión fija de Mapbox.
- `styles.css`: tipografía, paneles, tarjetas y adaptación a móvil.
- `destinations.js`: contenido, fotos, coordenadas WGS84 y cámaras por lugar. Cada coordenada tiene fuente y una nota que distingue acceso, atractivo y mirador.
- `app.js`: recorrido por scroll, selección de sitios, exploración libre y carga de capas.
- `config.js`: se conserva la configuración previa; la aplicación nueva toma de ella el token público de Mapbox.
- `assets/apurimac`: copias de las tres fotos suministradas. Los originales permanecen en Recursos.
- `backups/antes-apurimac`: copia del HTML y la configuración anteriores.

## Perfiles

`landscape` combina imagen satelital, carreteras y terreno con elevación de Mapbox Terrain DEM. La exageración es 1 para conservar la escala vertical. El relieve es una superficie basada en elevaciones, no un modelo fotogramétrico de cada roca o monumento.

`urban` usa Streets con calles y etiquetas; añade volúmenes de edificios usando altura y base disponibles en las teselas. No inventa alturas. La cobertura depende de Mapbox; no representa fachadas detalladas ni garantiza un modelo de cada monumento. Para Galicia se asigna `profile: 'urban'` al lugar y se define su cámara. Los edificios se muestran desde zoom 14.

Cada destino tiene `coordinates` para el marcador y `camera` para encuadrar el paisaje. Mapbox recibe longitud primero y latitud después. Ampay está anclado en la referencia cartográfica del acceso, no en la cumbre. El cañón utiliza el mirador Capitán Rumi, no un centro arbitrario del cañón. Las posiciones no constituyen navegación de senderos.

El cambio de estilo vuelve a cargar terreno y edificios; 2D desactiva ambos. Se mantienen los controles de zoom y brújula y se respeta la preferencia de movimiento reducido. No se dibuja una ruta entre sitios porque todavía no hay una ruta vial verificada.

## Recorrido y mapa libre

La página usa scroll natural: portada, vista general de Abancay y Curahuasi, y cinco lugares. Al entrar cada sección, la cámara cambia de posición; las fichas se revelan y el marcador correspondiente se destaca. En este modo la rueda del mouse mueve la página. Los botones del mapa siguen controlando zoom, giro e inclinación.

El botón «Explorar mapa» abre un panel lateral y activa el zoom con la rueda. Se puede arrastrar, acercar y cambiar de vista sin alterar la posición del relato. «Volver al relato» retoma la misma sección. Las fotos, la lista de lugares y los marcadores también permiten saltar directamente a una parada. El botón «Toda la zona» vuelve a la vista general.

## Pendientes de contenido

Faltan imágenes propias de Cconoc y del cañón. Sus fichas muestran texto y mapa sin fotos ajenas. La foto del puente contiene una franja gris inferior y se encuadra con CSS. Completar autoría y licencia de las imágenes antes de publicar. Para desplegar, restringir el token público a los dominios del sitio desde la cuenta Mapbox y verificar cuotas; no insertar tokens secretos en el navegador.
