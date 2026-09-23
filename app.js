(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const { profiles, terrain } = window.atlas;

  // Galicia se carga de forma diferida: solo cuando el usuario elige España.
  // Al inicio solo se conoce el módulo de Perú.
  let galiciaLoaded = !!window.galicia;
  function buildCountries() {
    return {
      PE: {name:'Perú', title:'Abancay y Curahuasi', context:'Abancay · Curahuasi', center:[-70,-12], bearing:-8, zone:window.atlas.zone, places:window.atlas.places},
      ...(window.galicia ? {ES:{name:'España', title:window.galicia.zone.name, context:'Santiago · Ría de Arousa', center:[-4,40], bearing:0, zone:window.galicia.zone, places:window.galicia.places}} : {})
    };
  }
  let countries = buildCountries();

  let countryCode = 'PE', country = countries.PE, zone = country.zone, places = country.places;
  let storyPlaces = ['pachachaca', 'ampay', 'saywite', 'canon', 'cconoc'].map(id => places.find(place => place.id === id));
  const panel = $('panel');
  const storyRail = $('story-rail');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = () => matchMedia('(max-width: 760px)').matches;
  let map, ready = false, activeId = null, activeStage = null, exploring = false, mode = 'landscape', threeD = true, scrollPending = false, scrollbarTimer, currentStyleUrl = null, errorTimer = null;
  let localityContext = 'Abancay · Curahuasi';
  const markers = [];

  // ── Control del splash screen ──
  const splash = $('splash');
  let splashMinReached = false, splashMapReady = false;
  function dismissSplash() {
    if (!splashMinReached || !splashMapReady) return;
    if (!splash || splash.classList.contains('is-hidden')) return;
    splash.classList.add('is-hidden');
    document.body.style.overflow = '';
    // Eliminar del DOM tras la transición para liberar memoria
    splash.addEventListener('transitionend', () => splash.remove(), { once: true });
  }
  // Bloquear scroll mientras el splash está visible
  document.body.style.overflow = 'hidden';
  const duration = ms => reducedMotion ? 0 : ms;
  const escape = text => String(text).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  function status(message, temporary = false) {
    clearTimeout(errorTimer);
    $('map-status').textContent = message;
    $('map-status').hidden = !message;
    if (temporary && message) errorTimer = setTimeout(() => { $('map-status').hidden = true; }, 5000);
  }
  function refreshLocationLabel() {
    const isFar = map && map.getZoom() < 4;
    $('location-label').textContent = isFar || activeStage === 'intro' ? '' : localityContext;
  }
  function setLocality(id) {
    localityContext = countryCode === 'ES' ? (places.find(p=>p.id===id)?.district || country.context) : id === 'ampay' || id === 'pachachaca' ? 'Abancay' : id ? 'Curahuasi' : country.context;
    refreshLocationLabel();
  }
  function updateBackButton() {
    $('back-map').hidden = !exploring && (!activeStage || activeStage === 'intro' || activeStage === 'zone');
  }
  function padding() { return mobile() ? {top:145,bottom:Math.round(innerHeight*.53)+35,left:35,right:35} : {top:155,bottom:95,left:countryCode==='ES'?570:500,right:90}; }
  function photo(place, card = false) {
    if (!place.image) return '';
    const cls = place.id === 'pachachaca' ? ' bridge' : place.id === 'ampay' ? ' ampay' : place.id === 'saywite' ? ' saywite' : '';
    const img = `<img src="${escape(imagePath(place))}" alt="${escape(place.alt)}" ${card ? '' : 'loading="lazy"'}>`;
    return card ? `<button class="photo-card${cls}" data-place="${place.id}" aria-label="Explorar ${escape(place.name)}">${img}<span>${escape(place.shortName)}</span></button>` : `<figure class="detail-photo${cls}">${img}</figure>${photoCredit(place)}`;
  }
  function imagePath(place) { return `./assets/${place.imageFolder || 'apurimac'}/${place.image}`; }
  function photoCredit(/* place */) {
    // Créditos ocultos visualmente; los datos originales se conservan en imageCredit de cada destino.
    return '';
  }
  function zoneItinerary() {
    return `<ol class="zone-itinerary" aria-label="Orden del recorrido">${storyPlaces.map(p=>`<li><button data-place="${p.id}">${escape(p.shortName)}</button></li>`).join('')}</ol>`;
  }
  function placeFacts(place) {
    return `<dl class="place-facts">${place.facts.map(fact => `<div class="place-fact"><dt>${escape(fact.label)}</dt><dd>${escape(fact.value)}</dd></div>`).join('')}</dl>`;
  }
  function zoneSlideshow() {
    if (!storyPlaces.length) return '<p class="route-pending">Relato en preparación · Próximamente, los lugares de este recorrido.</p>';
    const first = storyPlaces[Math.floor(Math.random() * storyPlaces.length)];
    const second = storyPlaces.find(place => place.id !== first.id);
    const image = place => escape(imagePath(place));
    return `<div class="zone-slideshow-group"><button class="zone-slideshow" data-place="${first.id}" aria-label="Abrir ${escape(first.name)}">
      <img class="zone-slide-image is-visible" src="${image(first)}" alt="${escape(first.alt)}">
      <img class="zone-slide-image" src="${image(second)}" alt="" aria-hidden="true">
      <span class="zone-slide-caption">${escape(first.shortName)}</span>
    </button><div class="slide-credit">${photoCredit(first)}</div></div>`;
  }
  function rotateZoneSlides() {
    if (storyPlaces.length < 2) return;
    document.querySelectorAll('.zone-slideshow').forEach(slide => {
      const currentId = slide.dataset.place;
      const choices = storyPlaces.filter(place => place.id !== currentId);
      const next = choices[Math.floor(Math.random() * choices.length)];
      const images = slide.querySelectorAll('.zone-slide-image');
      const visible = [...images].find(image => image.classList.contains('is-visible'));
      const incoming = [...images].find(image => image !== visible);
      const preload = new Image();
      preload.onload = () => {
        if (!slide.isConnected) return;
        incoming.src = preload.src;
        incoming.alt = next.alt;
        incoming.removeAttribute('aria-hidden');
        visible.alt = '';
        visible.setAttribute('aria-hidden', 'true');
        requestAnimationFrame(() => {
          incoming.classList.add('is-visible');
          visible.classList.remove('is-visible');
        });
        slide.dataset.place = next.id;
        slide.setAttribute('aria-label', `Abrir ${next.name}`);
        slide.querySelector('.zone-slide-caption').textContent = next.shortName;
        slide.parentElement.querySelector('.slide-credit').innerHTML=photoCredit(next);
      };
      preload.src = imagePath(next);
    });
  }
  function renderStory() {
    storyRail.innerHTML = `<div class="hero-step" id="story-intro" data-stage="intro"></div>
      <section class="story-step" id="story-zone" data-stage="zone"><div class="story-card">
        <h2>${escape(country.title)}</h2><p class="lead">${escape(zone.description)}</p>
        ${zoneSlideshow()}${zoneItinerary()}
      </div></section>
      ${storyPlaces.map((p,i) => `<section class="story-step" id="story-${p.id}" data-stage="${p.id}"><div class="story-card">
        <h2>${escape(p.name)}</h2>${photo(p)}
        <p class="lead">${escape(p.description)}</p>${placeFacts(p)}
        ${reference(p)}
      </div></section>`).join('')}`;
  }
  function goToStage(stage) {
    if (exploring) setExplorer(false);
    const target = $('story-' + stage);
    if (target) target.scrollIntoView({behavior:reducedMotion?'auto':'smooth',block:'start'});
  }
  function activateStage(stage, force = false) {
    if (exploring || (!force && stage === activeStage)) return;
    activeStage = stage;
    setLocality(stage === 'intro' || stage === 'zone' ? null : stage);
    updateBackButton();
    document.body.classList.toggle('at-intro', stage === 'intro');
    document.querySelectorAll('.story-step').forEach(step => step.classList.toggle('is-active',step.dataset.stage === stage));
    markers.forEach(marker => marker.getElement().hidden = stage === 'intro');
    activeId = stage === 'intro' || stage === 'zone' ? null : stage;
    updatePins();
    if (!ready) return;
    if (stage === 'intro') {
      map.stop(); map.flyTo({center:country.center,zoom:2.3,pitch:0,bearing:country.bearing,padding:{top:Math.min(360,innerHeight*.42),bottom:0,left:0,right:0},duration:duration(1300)});
    } else if (stage === 'zone') focusZone();
    else { const place = places.find(p=>p.id===stage); if(place) focusPlace(place); }
  }
  function updateStoryPosition(force = false) {
    if (exploring) return;
    const position = scrollY + innerHeight * 0.55;
    let stage = 'intro';
    document.querySelectorAll('[data-stage]').forEach(step => {if(step.offsetTop <= position) stage = step.dataset.stage;});
    activateStage(stage, force);
  }
  function setExplorer(enabled) {
    exploring = enabled;
    updateBackButton();
    document.body.classList.toggle('map-explore', enabled);
    $('zone-nav').textContent = enabled ? 'Volver al relato' : 'Explorar mapa';
    $('zone-nav').setAttribute('aria-pressed', String(enabled));
    if (map) enabled ? map.scrollZoom.enable() : map.scrollZoom.disable();
    if (enabled) activeStage && !['intro','zone'].includes(activeStage) ? openPlace(activeStage) : renderZone();
    else { panel.hidden = true; updateStoryPosition(true); }
  }
  function revealPanel() {
    panel.hidden = false;
    markers.forEach(marker => marker.getElement().hidden = false);
    panel.scrollTop = 0;
  }
  function renderZone(focus = true) {
    activeId = null; setLocality(null); updateBackButton(); revealPanel();
    panel.classList.add('zone-panel');
    panel.innerHTML = `<div class="panel-inner"><h2>${escape(country.title)}</h2><p class="lead">${escape(zone.description)}</p>${zoneSlideshow()}${zoneItinerary()}</div>`;
    updatePins();
    if (focus) focusZone();
  }
  function focusZone() {
    if (!ready) return;
    map.stop();
    map.fitBounds(zone.bounds, {padding:padding(),pitch:threeD?45:0,bearing:0,duration:duration(1800),maxZoom:11.7});
  }
  function openPlace(id, focusPanel = false) {
    const p = places.find(place => place.id === id); if (!p) return;
    panel.classList.remove('zone-panel');
    activeId = id; setLocality(id); updateBackButton(); revealPanel();
    const index = storyPlaces.indexOf(p), next = storyPlaces[(index+1)%storyPlaces.length];
    panel.innerHTML = `<div class="panel-inner"><button class="back" data-zone>← Volver a la zona</button><h2>${escape(p.name)}</h2>${photo(p)}<p class="lead">${escape(p.description)}</p>${placeFacts(p)}${reference(p)}<button class="next-place" data-place="${next.id}"><span>Siguiente · ${escape(next.shortName)}</span><span>→</span></button></div>`;
    if (mode !== p.profile) { mode = p.profile; switchStyle(); }
    updatePins(); focusPlace(p);
    if (focusPanel) panel.focus({preventScroll:true});
  }
  // Precarga silenciosa de las imágenes del país activo para evitar parpadeos.
  function preloadPlaces(list) {
    list.forEach(place => {
      if (!place.image) return;
      const img = new Image();
      img.src = imagePath(place);
    });
  }
  function focusPlace(p) {
    if (!ready) return;
    map.stop();
    // 1400 ms: suficiente para la animación, menos mosaicos intermedios solicitados.
    map.flyTo({center:p.coordinates,...p.camera,pitch:threeD?p.camera.pitch:0,padding:padding(),duration:duration(1400),essential:false});
  }
  function updatePins() {
    markers.forEach((marker,i) => {
      const element = marker.getElement();
      element.classList.toggle('is-active', storyPlaces[i].id === activeId);
      element.setAttribute('aria-pressed', String(storyPlaces[i].id === activeId));
      element.classList.toggle('pin-separated', storyPlaces[i].id === 'santiago' && map && map.getZoom() < 12);
    });
  }
  function reference(place) {
    const sourceName = place.sourceName || (place.id === 'ampay' ? 'SERNANP' : 'MINCETUR');
    return `<div class="detail-meta"><a class="source-link" href="${escape(place.source)}" target="_blank" rel="noopener noreferrer">Fuente de los datos · ${sourceName} ↗</a></div>`;
  }
  function applyLayers() {
    const profile = profiles[mode];
    if (!map.getSource('peru-boundaries')) map.addSource('peru-boundaries',{type:'vector',url:'mapbox://mapbox.country-boundaries-v1'});
    const peruFilter=countryFilter();
    const firstLabel=map.getStyle().layers.find(layer=>layer.type==='symbol'&&layer.layout?.['text-field'])?.id;
    if (!map.getLayer('peru-highlight-fill')) map.addLayer({id:'peru-highlight-fill',type:'fill',source:'peru-boundaries','source-layer':'country_boundaries',filter:peruFilter,paint:{'fill-color':'#d8aa62','fill-opacity':['interpolate',['linear'],['zoom'],0,0.16,2.5,0.11,4,0] }},firstLabel);
    if (!map.getLayer('peru-highlight-outline')) map.addLayer({id:'peru-highlight-outline',type:'line',source:'peru-boundaries','source-layer':'country_boundaries',filter:peruFilter,paint:{'line-color':'#f0c879','line-width':['interpolate',['linear'],['zoom'],0,1.5,2.5,2.4,4,1.5,5,0],'line-opacity':['interpolate',['linear'],['zoom'],0,0.9,3.5,0.85,5,0]}},firstLabel);
    if (!map.getSource('terrain-dem')) map.addSource('terrain-dem',{type:'raster-dem',url:terrain.source,tileSize:512,maxzoom:terrain.maxzoom});
    map.setTerrain(threeD && profile.terrain ? {source:'terrain-dem',exaggeration:terrain.exaggeration}:null);
    map.setFog({color:'#dce7e8','high-color':'#49749d','horizon-blend':0.08,'space-color':'#0b141c','star-intensity':0.12});
    // Elevations of buildings are used only where the vector tiles supply them.
    if (profile.buildings && map.getSource('composite') && !map.getLayer('urban-buildings')) {
      const label = map.getStyle().layers.find(layer => layer.type==='symbol' && layer.layout && layer.layout['text-field']);
      map.addLayer({id:'urban-buildings',source:'composite','source-layer':'building',filter:['==','extrude','true'],type:'fill-extrusion',minzoom:14,paint:{'fill-extrusion-color':'#c5c2b5','fill-extrusion-height':['coalesce',['get','height'],0],'fill-extrusion-base':['coalesce',['get','min_height'],0],'fill-extrusion-opacity':0.9}},label?.id);
    }
    if (map.getLayer('urban-buildings')) map.setLayoutProperty('urban-buildings','visibility',threeD && profile.buildings?'visible':'none');
    // Spanish map labels when a translated name is present.
    map.getStyle().layers.filter(l=>l.type==='symbol' && l.layout?.['text-field']).forEach(l=>{
      if (JSON.stringify(l.layout['text-field']).includes('name')) map.setLayoutProperty(l.id,'text-field',['coalesce',['get','name_es'],['get','name'],['get','name_en']]);
    });
  }
  function switchStyle() {
    if (!map) return;
    const target = profiles[mode].style;
    if (currentStyleUrl === target) return; // evita recargar el mapa si el estilo ya es el correcto
    currentStyleUrl = target;
    ready = false;
    status('Cargando la vista…');
    map.setStyle(target);
  }
  function countryFilter() {
    return ['all',['==',['get','iso_3166_1'],countryCode],['==',['get','disputed'],'false'],['any',['==',['get','worldview'],'all'],['in',countryCode,['get','worldview']]]];
  }
  function rebuildMarkers() {
    markers.splice(0).forEach(marker => marker.remove());
    if (!map) return;
    storyPlaces.forEach((p,i)=>{
      const element=document.createElement('button');element.className='pin';element.hidden=true;element.dataset.placeId=p.id;element.setAttribute('aria-label',`Explorar ${p.name}`);
      element.innerHTML=`<span class="pin-visual"><span class="pin-label">${escape(p.shortName)}</span><span class="pin-dot">${String(i+1).padStart(2,'0')}</span></span>`;
      element.onclick=()=>exploring?openPlace(p.id,true):goToStage(p.id);
      markers.push(new mapboxgl.Marker({element,anchor:'bottom'}).setLngLat(p.coordinates).addTo(map));
    });
  }
  $('country-options').addEventListener('click', event => {
    const selected=event.target.closest('[data-country]')?.dataset.country;
    if (!selected) return;

    // Carga diferida de galicia.js: solo la primera vez que se elige España.
    if (selected === 'ES' && !galiciaLoaded) {
      status('Cargando datos de España…');
      const script = document.createElement('script');
      script.src = './galicia.js';
      script.onload = () => {
        galiciaLoaded = true;
        countries = buildCountries();
        status('');
        switchToCountry('ES');
      };
      script.onerror = () => status('No se pudieron cargar los datos de España.', true);
      document.head.appendChild(script);
      return;
    }

    if (!countries[selected] || selected === countryCode) return;
    switchToCountry(selected);
  });

  function switchToCountry(selected) {
    countryCode=selected; country=countries[countryCode]; zone=country.zone; places=country.places;
    document.querySelectorAll('[data-country]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.country===countryCode)));
    storyPlaces=countryCode==='PE' ? ['pachachaca','ampay','saywite','canon','cconoc'].map(id=>places.find(p=>p.id===id)) : [...places];
    exploring=false; activeId=null; activeStage=null;
    document.body.classList.remove('map-explore','journey-started');
    panel.hidden=true; panel.innerHTML='';
    $('zone-nav').textContent='Explorar mapa'; $('zone-nav').setAttribute('aria-pressed','false');
    if (map) map.scrollZoom.disable();
    $('map').setAttribute('aria-label',`Mapa interactivo de ${country.name}`);
    storyRail.setAttribute('aria-label',`Recorrido por ${country.title}`);
    renderStory(); rebuildMarkers();
    preloadPlaces(storyPlaces); // precarga imágenes del país recién seleccionado
    window.scrollTo({top:0,behavior:'instant'});
    if (ready) ['peru-highlight-fill','peru-highlight-outline'].forEach(id=>{if(map.getLayer(id))map.setFilter(id,countryFilter());});
    activateStage('intro',true);
  }
  panel.addEventListener('click',event=>{
    const place = event.target.closest('[data-place]');
    if(place) openPlace(place.dataset.place);
    else if(event.target.closest('[data-zone]')) renderZone();
  });
  storyRail.addEventListener('click',event=>{
    const place = event.target.closest('[data-place]');
    if(place) goToStage(place.dataset.place);
  });
  $('zone-nav').onclick = () => setExplorer(!exploring);
  $('back-map').onclick = () => {
    if (exploring && activeId) { renderZone(); return; }
    if (exploring) setExplorer(false);
    goToStage('zone');
  };
  window.addEventListener('keydown',event=>{if(event.key==='Escape'&&exploring) activeId ? renderZone() : setExplorer(false);});
  window.addEventListener('scroll',()=>{
    document.body.classList.add('journey-started');
    document.documentElement.classList.add('scrollbar-visible');
    clearTimeout(scrollbarTimer);
    scrollbarTimer=setTimeout(()=>document.documentElement.classList.remove('scrollbar-visible'),1200);
    if(scrollPending || exploring) return;
    scrollPending=true;
    requestAnimationFrame(()=>{scrollPending=false;updateStoryPosition();});
  },{passive:true});
  let resizeTimer;
  window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(!ready)return;if(exploring) activeId?focusPlace(places.find(p=>p.id===activeId)):focusZone();else updateStoryPosition(true);},180);});
  renderStory();
  if (!reducedMotion) window.setInterval(rotateZoneSlides, 4500);
  document.body.classList.add('at-intro');
  updateStoryPosition();
  if (!window.mapboxgl || !mapboxgl.supported()) { status('El mapa necesita conexión y un navegador con WebGL. Puedes explorar las fichas.'); return; }
  mapboxgl.accessToken = config.accessToken;
  try {
    map = new mapboxgl.Map({
      container:'map', style:profiles.landscape.style,
      center:[-70,-12], zoom:2.3, bearing:-8,
      padding:{top:360,bottom:0,left:0,right:0},
      projection:'globe', pitch:0, antialias:true,
      maxPitch:75, maxZoom:18,
      logoPosition:'bottom-right', attributionControl:false,
      maxTileCacheSize: 256, // mantiene en memoria mosaicos ya visitados
      fadeDuration: 120      // transición más rápida al aparecer mosaicos
    });
    map.addControl(new mapboxgl.AttributionControl({compact:true}),'bottom-right');
    map.addControl(new mapboxgl.NavigationControl({visualizePitch:true}),'top-right');
    map.on('zoomend',refreshLocationLabel);
    map.on('zoomend',updatePins);
    map.scrollZoom.disable();
    rebuildMarkers();
    map.on('style.load',()=>{
      currentStyleUrl=profiles[mode].style;
      applyLayers(); ready=true; status('');
      preloadPlaces(storyPlaces);
      if(exploring)activeId?focusPlace(places.find(p=>p.id===activeId)):focusZone();
      else updateStoryPosition(true);
      // Señalar al splash que el mapa está listo
      splashMapReady = true;
      dismissSplash();
    });
    map.on('error',event=>{
      console.error('Mapbox:',event.error);
      const status401 = event.error?.status === 401 || event.error?.status === 403;
      if (status401 || !ready) {
        // Error de autenticación o fallo al cargar el estilo: mensaje permanente
        status('No se pudo cargar el mapa. Revisa el token de Mapbox.');
      } else {
        // Fallo de mosaico aislado: aviso temporal que desaparece en 5 s
        status('Algunos mosaicos no cargaron. Reintentando…', true);
      }
    });
  } catch(error) {console.error(error);status('No se pudo iniciar el mapa. Las fichas siguen disponibles.');}

  // Máximo 2 s si todo carga bien; si el mapa falla, la red de seguridad lo quita a los 8 s
  setTimeout(() => { splashMinReached = true; dismissSplash(); }, 2000);
  // Red de seguridad: si el mapa falla, quitar el splash a los 8 s de todos modos
  setTimeout(() => { splashMapReady = true; splashMinReached = true; dismissSplash(); }, 8000);
})();
