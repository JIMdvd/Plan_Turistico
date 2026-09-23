var config = {
    style: 'mapbox://styles/mapbox/satellite-streets-v12', // Estilo ideal para apreciar relieve y mapa urbano
    accessToken: 'pk.eyJ1IjoiamltZHZicyIsImEiOiJjbXVjcnB4Mmowamw2Mnlwdzdnc2dsbDVsIn0.VNKspOwcmg3QPlZe0uHhnw',
    showMarkers: true,
    markerColor: '#3FB1CE',
    projection: 'globe', // Activa la vista de esfera terrestre inicial
    inset: false,
    theme: 'dark',
    use3dTerrain: true, // ¡ACTIVADO! Muestra las cordilleras y montañas en 3D real
    auto: false,
    title: 'Ruta Fusión: Andes & Galicia',
    subtitle: 'De las cordilleras de Apurímac al histórico Camino de Santiago',
    byline: 'Paquete Turístico Dual',
    footer: 'Experiencia Turística Interactiva <br> Creado con Mapbox Storytelling.',
    chapters: [
        {
            id: 'globo-inicio',
            alignment: 'center',
            hidden: false,
            title: 'Un Encuentro de Dos Mundos',
            image: '',
            description: 'Explora una experiencia única conectando los imponentes cañones y la cultura inca de Apurímac (Perú) con la historia medieval y las costas de Galicia (España).',
            location: {
                center: [-40.0, 15.0],
                zoom: 1.8,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'canon-apurimac',
            alignment: 'left',
            hidden: false,
            title: 'Cañón del Apurímac',
            image: './assets/canon-apurimac.jpg',
            description: 'Uno de los cañones más profundos de América. Flanqueado por la cordillera andina, ofrece paisajes abismales, deportes de aventura y avistamiento del majestuoso cóndor.',
            location: {
                center: [-72.881, -13.633],
                zoom: 12.5,
                pitch: 65, // Inclinación para apreciar el abismo en 3D
                bearing: 45
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'choquequirao',
            alignment: 'right',
            hidden: false,
            title: 'Choquequirao: La Cuna de Oro',
            image: './assets/choquequirao.jpg',
            description: 'Santuario arqueológico inca incrustado en las crestas montañosas de los Andes. Una joya arquitectónica rodeada de vegetación e historia viva.',
            location: {
                center: [-72.878, -13.398],
                zoom: 13.8,
                pitch: 60,
                bearing: -20
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'travesia-atlantica',
            alignment: 'center',
            hidden: false,
            title: 'Travesía Transatlántica',
            image: '',
            description: 'Dejamos atrás la altitud de los Andes peruanos para cruzar el océano rumbo al noroeste de la Península Ibérica.',
            location: {
                center: [-30.0, 25.0],
                zoom: 2.8,
                pitch: 20,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'santiago-compostela',
            alignment: 'left',
            hidden: false,
            title: 'Santiago de Compostela',
            image: './assets/santiago-compostela.jpg',
            description: 'Capital de Galicia y meta final del milenario Camino de Santiago. Su casco histórico destaca por la imponente Catedral en la Praza do Obradoiro.',
            location: {
                center: [-8.5448, 42.8805],
                zoom: 16.2,
                pitch: 55, // Inclinación urbana
                bearing: 15
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'rias-baixas',
            alignment: 'right',
            hidden: false,
            title: 'Rías Baixas y Costa Gallega',
            image: './assets/rias-baixas.jpg',
            description: 'El cierre perfecto para la ruta: un recorrido por las costas atlánticas de Galicia, viñedos de Albariño y la más afamada gastronomía marina.',
            location: {
                center: [-8.812, 42.431],
                zoom: 11.0,
                pitch: 40,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        }
    ]
};
