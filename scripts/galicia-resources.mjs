// Download the selected freely reusable photographs and preserve their provenance.
import {mkdir, writeFile, copyFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const resources = path.resolve(root, '../Recursos/09_Galicia_Santiago_Arousa');
const assets = path.join(root, 'assets/galicia');
const selected = [
  ['santiago', 'File:Santiago Compostela Cathedral 2023 - View from Alameda Park.jpg'],
  ['san-lourenzo', 'File:Carballeira de san lourenzo.jpg'],
  ['ponte-maceira', 'File:Portor - Negreira - Ponte Maceira - Ponte - 02 - Panoramica.jpg'],
  ['caldas', 'File:Caldas, camiño Portugués 02-03.JPG'],
  ['cortegada', 'File:Isla de Cortegada.pav.jpg']
];
await mkdir(resources,{recursive:true}); await mkdir(assets,{recursive:true});
const records=[];
for (const [id,title] of selected) {
  const endpoint=new URL('https://commons.wikimedia.org/w/api.php');
  endpoint.search=new URLSearchParams({action:'query',titles:title,prop:'imageinfo',iiprop:'url|extmetadata',iiurlwidth:'1280',format:'json'});
  const response=await fetch(endpoint); if(!response.ok)throw new Error(response.status);
  const data=await response.json(); const info=Object.values(data.query.pages)[0].imageinfo[0];
  const image=await fetch(info.thumburl||info.url); if(!image.ok)throw new Error(`${title}: ${image.status}`);
  if(!image.headers.get('content-type')?.startsWith('image/'))throw new Error('Unexpected media type');
  const destination=path.join(resources,`${id}.jpg`);
  await writeFile(destination,Buffer.from(await image.arrayBuffer()));
  await copyFile(destination,path.join(assets,`${id}.jpg`));
  const m=info.extmetadata;
  records.push({id,title,source:info.descriptionurl,download:info.thumburl||info.url,author:m.Artist?.value,license:m.LicenseShortName?.value,licenseUrl:m.LicenseUrl?.value,description:m.ImageDescription?.value,latitude:m.GPSLatitude?.value,longitude:m.GPSLongitude?.value,changes:'Miniatura de Wikimedia; encuadre visual con object-fit en la web.',retrieved:new Date().toISOString().slice(0,10)});
  console.log(id,JSON.stringify(records.at(-1)));
}
await writeFile(path.join(resources,'creditos-imagenes.json'),JSON.stringify(records,null,2));
await copyFile(path.join(resources,'creditos-imagenes.json'),path.join(assets,'creditos-imagenes.json'));
