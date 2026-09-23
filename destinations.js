// Mapbox uses WGS84 [longitude, latitude]. Markers are cartographic references.
// Camera framing is configured separately from the geographical point.
window.atlas = {
  profiles: {
    landscape: { style: 'mapbox://styles/mapbox/satellite-streets-v12', terrain: true, buildings: false, pitch: 60 },
    urban: { style: 'mapbox://styles/mapbox/streets-v12', terrain: true, buildings: true, pitch: 50 }
  },
  terrain: { source: 'mapbox://mapbox.mapbox-terrain-dem-v1', exaggeration: 1, maxzoom: 14 },
  zone: {
    name: 'Abancay y Curahuasi',
    description: 'Entre las montañas de Abancay y Curahuasi, los ríos abren valles profundos y los antiguos caminos enlazan bosques, aguas termales y sitios de memoria andina. Este recorrido reúne paisajes y huellas culturales que cuentan distintas formas de habitar Apurímac.',
    bounds: [[-72.99, -13.70], [-72.60, -13.49]],
  },
  places: [
    {
      id: 'ampay', name: 'Santuario Nacional de Ampay', shortName: 'Ampay', category: 'Bosque y lagunas', district: 'Tamburco · Abancay', profile: 'landscape',
      coordinates: [-72.87595, -13.60331], coordinateNote: 'Referencia del acceso al santuario; no corresponde a la cumbre.', coordinateSource: 'https://mapcarta.com/es/N3256930630',
      camera: { center: [-72.880, -13.590], zoom: 13.3, bearing: -25, pitch: 65 }, image: 'ampay.jpg', alt: 'Laguna rodeada de bosque en el Santuario Nacional de Ampay',
      description: 'En Tamburco, el santuario conserva bosques de intimpa y una ruta de lagunas al pie del nevado Ampay.',
      facts: [
        { label: 'Área protegida', value: '3 635,5 hectáreas.' },
        { label: 'Bosque de intimpa', value: 'Aproximadamente 600 hectáreas.' },
        { label: 'Lagunas', value: 'Angasq’ocha y Usphaq’ocha forman parte de la ruta de visita.' },
        { label: 'Cumbre', value: 'El nevado Ampay alcanza 5 235 m s. n. m.' }
      ],
      source: 'https://visitaareasnaturales.sernanp.gob.pe/anps/santuario-nacional-de-ampay/'
    },
    {
      id: 'pachachaca', name: 'Puente colonial Pachachaca', shortName: 'Pachachaca', category: 'Arquitectura y caminos', district: 'Abancay', profile: 'landscape',
      coordinates: [-72.937515, -13.663249], coordinateNote: 'Referencia cartográfica del puente colonial.', coordinateSource: 'https://www.urbipedia.org/hoja/Puente_Pachachaca',
      camera: { zoom: 15.5, bearing: 25, pitch: 48 }, image: 'pachachaca.jpg', alt: 'Arco de piedra del puente colonial Pachachaca entre laderas verdes',
      description: 'Sobre el río Pachachaca, este puente histórico forma parte de la ruta que une Abancay y Andahuaylas.',
      facts: [
        { label: 'Construcción', value: 'Atribuida a 1654 en el inventario turístico.' },
        { label: 'Arquitectura', value: 'Un arco de medio punto; 36 m de largo y 22,10 m de luz.' },
        { label: 'Protección', value: 'Patrimonio Cultural de la Nación desde 1974.' }
      ],
      source: 'https://consultasenlinea.mincetur.gob.pe/fichaInventario/index.aspx?cod_Ficha=31'
    },
    {
      id: 'saywite', name: 'Conjunto arqueológico de Saywite', shortName: 'Saywite', category: 'Patrimonio arqueológico', district: 'Curahuasi · Abancay', profile: 'landscape',
      coordinates: [-72.80254, -13.54721], coordinateNote: 'Referencia del conjunto arqueológico.', coordinateSource: 'https://mapcarta.com/es/W1351977610',
      camera: { zoom: 15.3, bearing: -35, pitch: 52 }, image: 'saywite.jpg', alt: 'Relieves tallados en el monolito de Saywite',
      description: 'El sitio ceremonial de Curahuasi reúne un monolito tallado y obras vinculadas al uso ritual del agua.',
      facts: [
        { label: 'Conjunto', value: 'Se extiende por unas 60 hectáreas.' },
        { label: 'Monolito', value: 'Presenta más de 200 figuras en alto y bajo relieve.' },
        { label: 'Agua ceremonial', value: 'Fuentes escalonadas, canales y pozas interconectadas.' },
        { label: 'Protección', value: 'Patrimonio Cultural de la Nación desde 2009.' }
      ],
      source: 'https://consultasenlinea.mincetur.gob.pe/fichaInventario/index.aspx?cod_Ficha=571'
    },
    {
      id: 'cconoc', name: 'Baños termales de Cconoc', shortName: 'Cconoc', category: 'Agua y descanso', district: 'Curahuasi · Abancay', profile: 'landscape',
      coordinates: [-72.63873, -13.54298], coordinateNote: 'Referencia cartográfica de los baños termales.', coordinateSource: 'https://mapcarta.com/es/W1181813747',
      camera: { zoom: 14.5, bearing: 25, pitch: 58 }, image: 'cconoc.jpg', alt: 'Vista aérea de las pozas termales de Cconoc',
      description: 'Las aguas termales de Cconoc brotan junto al río Apurímac, en una franja cálida al pie del cañón.',
      facts: [
        { label: 'Nombre quechua', value: 'Cconoc significa «caliente».' },
        { label: 'Agua termal', value: 'El inventario registra una temperatura cercana a 50 °C.' },
        { label: 'Piso ecológico', value: 'Región Yunga, a unos 1 780 m s. n. m.' },
        { label: 'Entorno', value: 'Ribera con algarrobos, carrizales y cactus.' }
      ],
      source: 'https://consultasenlinea.mincetur.gob.pe/fichaInventario/index.aspx?cod_Ficha=575'
    },
    {
      id: 'canon', name: 'Cañón del Apurímac', shortName: 'Cañón del Apurímac', category: 'Miradores y montañas', district: 'Curahuasi · Abancay', profile: 'landscape',
      coordinates: [-72.70707, -13.51907], coordinateNote: 'Referencia del mirador Capitán Rumi. El cañón es un área extensa, no un punto único.', coordinateSource: 'https://mapcarta.com/es/N5980287486',
      camera: { zoom: 13.2, bearing: -25, pitch: 68 }, image: 'canon.jpg', alt: 'Vista del cañón del Apurímac desde el mirador',
      description: 'Esta parada sitúa la mirada en el mirador Capitán Rumi, desde donde se aprecia el Cañón del Apurímac.',
      facts: [
        { label: 'Punto de vista', value: 'Mirador Capitán Rumi, en el distrito de Curahuasi.' },
        { label: 'Roca principal', value: 'Peso estimado de 120 toneladas, según el inventario turístico.' },
        { label: 'Relato local', value: 'Una leyenda vincula estas rocas con un puente sobre el río Apurímac.' }
      ],
      source: 'https://consultasenlinea.mincetur.gob.pe/fichaInventario/index.aspx?cod_Ficha=2039'
    }
  ]
};
