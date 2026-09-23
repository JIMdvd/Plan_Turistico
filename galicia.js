// WGS84 geographical references, independent from the camera framing.
// Photographs and their complete provenance are also saved in Recursos/09_Galicia_Santiago_Arousa.
window.galicia = {
  zone: {
    name: 'Santiago y Arousa',
    description: 'De las plazas de Compostela a los robles de San Lourenzo, el recorrido cruza el Tambre en Ponte Maceira, se acerca a las aguas termales de Caldas de Reis y termina frente a Cortegada, en la ría de Arousa. Cinco paradas para conversar sobre patrimonio, agua y paisaje, desde el interior gallego hasta la costa. Es un recorrido temático propio, no una etapa oficial del Camino de Santiago.',
    bounds: [[-8.83,42.59],[-8.52,42.93]]
  },
  places: [
    {
      id:'santiago', name:'Santiago de Compostela', shortName:'Santiago', district:'Santiago de Compostela · A Coruña', profile:'landscape',
      coordinates:[-8.54525,42.880639], coordinateNote:'Referencia de la Catedral en la plaza del Obradoiro.', coordinateSource:'https://www.caminodesantiago.gal/es/recurso/-/recurso/3444/catedral-de-santiago-de-compostela',
      camera:{zoom:15,bearing:-20,pitch:38}, image:'santiago.jpg', imageFolder:'galicia', alt:'Catedral de Santiago de Compostela vista desde el parque de la Alameda',
      description:'La catedral y las plazas del casco histórico reúnen la memoria de una ciudad construida en torno a la peregrinación.',
      facts:[
        {label:'Catedral románica',value:'Su construcción comenzó en 1075; el edificio se amplió y transformó en épocas posteriores.'},
        {label:'Material',value:'Sillería de granito, también presente en las cubiertas de lajas.'},
        {label:'Peregrinación',value:'La catedral es la meta de los Caminos de Santiago y conserva un uso religioso vivo.'}
      ],
      source:'https://www.caminodesantiago.gal/es/recurso/-/recurso/3444/catedral-de-santiago-de-compostela',sourceName:'Camino de Santiago · Xunta de Galicia',
      imageCredit:{author:'Fernando Pascullo',license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/',url:'https://commons.wikimedia.org/wiki/File:Santiago_Compostela_Cathedral_2023_-_View_from_Alameda_Park.jpg'}
    },
    {
      id:'san-lourenzo',name:'Carballeira de San Lourenzo',shortName:'San Lourenzo',district:'Santiago de Compostela · A Coruña',profile:'landscape',
      coordinates:[-8.5568849,42.878745],coordinateNote:'Referencia del robledal público, no del interior del pazo.',coordinateSource:'https://www.santiagoturismo.com/parques-e-xardins/carballeira-de-san-lourenzo',
      camera:{zoom:15,bearing:20,pitch:35},image:'san-lourenzo.jpg',imageFolder:'galicia',alt:'Robles y senderos de la Carballeira de San Lourenzo',
      description:'A las afueras del casco histórico, este robledal conserva un espacio de sombra, paseo y encuentro junto al antiguo convento de San Lourenzo.',
      facts:[
        {label:'Superficie',value:'8 287 m², según la ficha municipal de turismo.'},
        {label:'Vegetación',value:'Robles centenarios: «carballeira» es el nombre gallego de un robledal.'},
        {label:'Vida comunitaria',value:'Las carballeiras han acogido reuniones, fiestas y procesiones; naturaleza y cultura comparten aquí el mismo espacio.'},
        {label:'Elementos del lugar',value:'Una fuente y dos cruceiros —cruces de piedra— entre los árboles.'}
      ],
      source:'https://www.santiagoturismo.com/parques-e-xardins/carballeira-de-san-lourenzo',sourceName:'Turismo de Santiago',
      imageCredit:{author:'Atobar',license:'Dominio público',url:'https://commons.wikimedia.org/wiki/File:Carballeira_de_san_lourenzo.jpg'}
    },
    {
      id:'ponte-maceira',name:'Puente de Ponte Maceira',shortName:'Ponte Maceira',district:'Ames · Negreira · A Coruña',profile:'landscape',
      coordinates:[-8.694417,42.905],coordinateNote:'Referencia de la ficha de Turismo de Galicia en el entorno del puente; no un levantamiento del centro del arco.',coordinateSource:'https://www.turismo.gal/recurso/-/detalle/7316/ponte-maceira?langId=es_ES',
      camera:{zoom:14.8,bearing:-30,pitch:38},image:'ponte-maceira.jpg',imageFolder:'galicia',alt:'Puente de piedra de Ponte Maceira sobre el río Tambre',
      description:'El puente medieval cruza el Tambre entre Ames y Negreira, integrando el paso sobre el río en un conjunto de arquitectura tradicional.',
      facts:[
        {label:'Río y territorio',value:'Conecta las dos orillas del Tambre y los municipios de Ames y Negreira.'},
        {label:'Construcción',value:'Fábrica de granito, con sillares y mampostería en distintas partes del puente.'},
        {label:'Paso histórico',value:'Calzada estrecha pavimentada con lajas de piedra; la forma del puente responde al tránsito anterior al tráfico moderno.'}
      ],
      source:'https://concellodenegreira.gal/gl/turismo/que-ver/patrimonio-civil/ponte-maceira',sourceName:'Concello de Negreira',
      imageCredit:{author:'Xosema',license:'CC BY-SA 3.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/3.0/',url:'https://commons.wikimedia.org/wiki/File:Portor_-_Negreira_-_Ponte_Maceira_-_Ponte_-_02_-_Panoramica.jpg'}
    },
    {
      id:'caldas',name:'Caldas de Reis · Fonte da Burga',shortName:'Caldas de Reis',district:'Caldas de Reis · Pontevedra',profile:'landscape',
      coordinates:[-8.64297,42.60362],coordinateNote:'Referencia de la fuente pública Fonte das Burgas (OSM 4028040424), no de todos los manantiales.',coordinateSource:'https://mapcarta.com/es/N4028040424',
      camera:{zoom:14.8,bearing:15,pitch:35},image:'caldas.jpg',imageFolder:'galicia',alt:'Peregrinos junto a la fuente termal de las Burgas en Caldas de Reis',
      description:'En esta villa del Camino Portugués, el agua caliente forma parte del espacio público y de una tradición termal que se remonta a época romana.',
      facts:[
        {label:'Fuente pública',value:'La Fonte da Burga fue construida por el ayuntamiento en 1881, con diseño neoclásico.'},
        {label:'Temperatura',value:'La fuente vierte agua a unos 45 °C, según la información turística local; no es la temperatura de una piscina de baño.'},
        {label:'Usos del agua',value:'La fuente y el lavadero cercano aprovechan el mismo manantial caliente.'},
        {label:'Actividad local',value:'El termalismo y el paso del Camino Portugués articulan buena parte de la oferta turística de la villa.'}
      ],
      source:'https://www.obotanicodecaldas.gal/es/turismo',sourceName:'Xardín Botánico de Caldas de Reis',
      imageCredit:{author:'P.Lameiro',license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/',url:'https://commons.wikimedia.org/wiki/File:Caldas,_camiño_Portugués_02-03.JPG'}
    },
    {
      id:'cortegada',name:'Carril y la isla de Cortegada',shortName:'Cortegada',district:'Vilagarcía de Arousa · Pontevedra',profile:'landscape',terrain:false,
      coordinates:[-8.78433,42.61839],coordinateNote:'Referencia cartográfica de la isla (OSM 4889752); la cámara incluye también Carril y la ría. No señala un embarcadero.',coordinateSource:'https://mapcarta.com/es/18594634',
      camera:{center:[-8.779,42.615],zoom:13.5,bearing:-15,pitch:35},image:'cortegada.jpg',imageFolder:'galicia',alt:'Isla de Cortegada y ría de Arousa vistas desde el monte Lobeira',
      description:'Frente a Carril, Cortegada ofrece un paisaje de bosque insular y aguas de ría, distinto de las islas más expuestas al océano.',
      facts:[
        {label:'Protección',value:'Forma parte del Parque Nacional Marítimo-Terrestre de las Islas Atlánticas de Galicia.'},
        {label:'Archipiélago',value:'191 hectáreas: 43,8 terrestres y 147,2 marinas. La cifra corresponde al archipiélago, no solo a la isla principal.'},
        {label:'Bosque',value:'Formaciones húmedas de laureles y otros árboles autóctonos rodean los restos de la aldea y su ermita.'},
        {label:'Relación con Carril',value:'Carril y Vilagarcía son puntos de salida de visitas marítimas a la isla; no hay transporte regular diario.'}
      ],
      source:'https://illasatlanticas.gal/es/visita-el-parque/visita-cortegada',sourceName:'Parque Nacional de las Islas Atlánticas',
      imageCredit:{author:'Pavlemadrid commons',license:'CC BY-SA 3.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/3.0/',url:'https://commons.wikimedia.org/wiki/File:Isla_de_Cortegada.pav.jpg'}
    }
  ]
};
