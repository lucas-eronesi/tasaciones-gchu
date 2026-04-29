import { useState, useRef, useCallback, useEffect } from "react";
const SHEETS_URL="https://script.google.com/macros/s/AKfycbzhMTOSJs1NUuqK6aKuxFkoJcMy4Xnq3F6Ys_N6TC1xuuoLyY0arnkmm6qOyiLhRek/exec";

// ═══════════════════════════════════════════════════════════════════
//  TABLA ROSS-HEIDECKE COMPLETA
// ═══════════════════════════════════════════════════════════════════
const ROSS = [
  [0,0,0.032,2.52,8.09,18.1],[1,0.505,0.537,3.01,8.55,18.51],
  [2,1.02,1.052,3.51,9.03,18.94],[3,1.545,1.577,4.03,9.51,19.37],
  [4,2.08,2.111,4.55,10,19.8],[5,2.625,2.656,5.08,10.5,20.25],
  [6,3.18,3.211,5.62,11.01,20.7],[7,3.745,3.776,6.17,11.53,21.17],
  [8,4.32,4.351,6.73,12.06,21.64],[9,4.905,4.935,7.3,12.6,22.12],
  [10,5.5,5.53,7.88,13.15,22.6],[11,6.105,6.135,8.47,13.7,23.1],
  [12,6.72,6.75,9.07,14.27,23.61],[13,7.345,7.375,9.68,14.84,24.12],
  [14,7.98,8.009,10.3,15.42,24.63],[15,8.625,8.654,10.93,16.02,25.16],
  [16,9.28,9.309,11.57,16.62,25.7],[17,9.945,9.974,12.22,17.23,26.25],
  [18,10.62,10.649,12.87,17.85,26.8],[19,11.305,11.333,13.54,18.48,27.36],
  [20,12,12.028,14.22,19.12,27.93],[21,12.705,12.733,14.51,19.77,28.51],
  [22,13.42,13.448,15.6,20.42,29.09],[23,14.145,14.173,16.31,21.09,29.66],
  [24,14.83,14.907,17.03,21.77,30.26],[25,15.625,15.652,17.75,22.45,30.89],
  [26,16.38,16.407,18.49,23.14,31.51],[27,17.145,17.171,19.23,23.85,32.14],
  [28,17.92,17.956,19.99,24.56,32.78],[29,18.705,18.731,20.75,25.28,33.42],
  [30,19.5,19.526,21.53,26.01,34.07],[31,20.305,20.33,22.31,26.75,34.73],
  [32,21.12,21.155,23.11,27.5,35.4],[33,21.945,21.97,23.9,28.26,36.07],
  [34,22.78,22.805,24.73,29.03,36.76],[35,23.625,23.649,25.55,29.8,37.45],
  [36,24.48,24.504,26.38,30.59,38.15],[37,25.345,25.349,27.23,31.38,38.86],
  [38,26.22,26.244,28.08,32.19,39.57],[39,27.105,27.128,28.94,33,40.3],
  [40,28,28.023,29.81,33.82,41.03],[41,28.905,28.928,30.7,34.66,41.77],
  [42,29.82,29.842,31.59,35.5,42.52],[43,30.745,30.767,32.49,36.35,43.28],
  [44,31.68,31.702,33.4,37.21,44.05],[45,32.625,32.646,34.32,38.08,44.82],
  [46,33.58,33.601,35.25,38.95,45.6],[47,34.545,34.566,36.19,39.84,46.39],
  [48,35.52,35.541,37.14,40.74,47.19],[49,36.505,36.525,38.1,41.64,48],
  [50,37.5,37.52,39.07,42.56,48.81],[51,38.505,38.525,40.05,43.48,49.63],
  [52,39.52,39.539,41.04,44.41,50.46],[53,40.545,40.564,42.04,45.35,51.3],
  [54,41.58,41.599,43.05,46.3,52.15],[55,42.625,42.643,44.07,47.26,53.01],
  [56,43.68,43.698,45.1,48.24,53.87],[57,44.745,44.763,46.14,49.22,54.74],
  [58,45.82,45.837,47.19,50.2,55.62],[59,46.905,46.922,48.25,51.2,56.51],
  [60,48,48.017,49.32,52.2,57.41],[61,49.105,49.121,50.39,53.22,58.32],
  [62,50.22,50.236,51.47,54.25,59.23],[63,51.345,51.361,52.57,55.28,60.15],
  [64,52.48,52.495,53.68,56.32,61.08],[65,53.625,53.64,54.8,57.38,62.02],
  [66,54.78,54.794,55.93,58.44,62.96],[67,55.945,55.959,57.06,59.51,63.92],
  [68,57.12,57.134,58.2,60.59,64.88],[69,58.305,58.318,59.36,61.68,65.85],
  [70,59.5,59.513,60.52,62.78,66.83],[71,60.705,60.718,61.7,63.88,67.82],
  [72,61.92,61.932,62.88,65,68.81],[73,63.145,63.157,64.08,66.13,69.81],
  [74,64.38,64.391,65.28,67.26,70.83],[75,65.625,65.636,66.49,68.4,71.85],
  [76,66.88,66.891,67.71,69.56,72.87],[77,68.145,68.155,68.95,70.72,73.91],
  [78,69.42,69.43,70.19,71.89,74.95],[79,70.705,70.714,71.44,73.07,76.01],
  [80,72,72.009,72.71,74.27,77.07],[81,73.305,73.314,73.98,75.47,78.14],
  [82,74.62,74.628,75.26,76.67,79.21],[83,75.945,75.953,76.56,77.89,80.3],
  [84,77.28,77.287,77.85,79.12,81.39],[85,78.625,78.632,79.16,80.35,82.49],
  [86,79.98,79.986,80.48,81.6,83.6],[87,81.345,81.351,81.82,82.85,84.72],
  [88,82.72,82.725,83.16,84.12,85.85],[89,84.105,84.11,84.51,85.39,86.98],
  [90,85.5,85.505,85.87,86.67,88.12],[91,86.905,86.909,87.23,87.96,89.27],
  [92,88.32,88.324,88.61,89.26,90.43],[93,89.745,89.748,90,90.57,91.59],
  [94,91.18,91.183,91.4,91.89,92.77],[95,92.625,92.627,92.81,93.22,93.96],
  [96,94.08,94.082,94.28,94.56,95.15],[97,95.545,95.546,95.66,95.91,96.45],
  [98,97.02,97.021,97.1,97.26,97.56],[99,98.505,98.505,98.54,98.63,98.78],
];
function getRoss(pct,estado){
  const p=Math.min(99,Math.max(0,Math.round(pct)));
  const e=Math.min(5,Math.max(1,Math.round(estado)));
  return ROSS[p]?ROSS[p][e]:0;
}
const VIDA_UTIL={"Mamposteria":80,"Steel Frame":60,"Block":70,"Madera":40,"Prefabricada":30};

// ═══════════════════════════════════════════════════════════════════
//  ZONAS POT OFICIAL — Gualeguaychú 2018
// ═══════════════════════════════════════════════════════════════════
const ZONAS={
  "C":   {n:"C — Central",                  t:"Suelo Urbano",    c:1.22,mn:95, mx:180,rf:125,pm:100, fm:5, fos:0.80,d:"Casco fundacional. Maxima intensidad comercial y residencial."},
  "R1":  {n:"R1 — Residencial",             t:"Suelo Urbano",    c:1.12,mn:65, mx:120,rf:88, pm:180, fm:7, fos:0.70,d:"Zona residencial consolidada. Buena infraestructura."},
  "R2":  {n:"R2 — Residencial",             t:"Suelo Urbano",    c:1.05,mn:50, mx:95, rf:72, pm:300, fm:10,fos:0.60,d:"Residencial media densidad."},
  "R3":  {n:"R3 — Residencial",             t:"Suelo Urbano",    c:0.95,mn:35, mx:70, rf:52, pm:600, fm:20,fos:0.50,d:"Residencial baja densidad. Grandes parcelas."},
  "AP1": {n:"AP1 — Residencial Suroeste",   t:"Suelo Urbano",    c:1.00,mn:45, mx:80, rf:62, pm:180, fm:7, fos:0.60,d:"Zona residencial suroeste en consolidacion."},
  "AP2": {n:"AP2 — Residencial Suroeste",   t:"Suelo Urbano",    c:0.98,mn:40, mx:75, rf:58, pm:180, fm:7, fos:0.60,d:"Zona residencial suroeste."},
  "AP3": {n:"AP3 — Residencial Noroeste",   t:"Suelo Urbano",    c:1.02,mn:45, mx:82, rf:63, pm:180, fm:7, fos:0.60,d:"Zona residencial noroeste."},
  "AP4": {n:"AP4 — Residencial Noreste",    t:"Suelo Urbano",    c:1.06,mn:50, mx:90, rf:68, pm:180, fm:7, fos:0.60,d:"Zona residencial noreste. Cercania al rio."},
  "Co1": {n:"Co1 — Avenidas / Centro",      t:"Suelo Urbano",    c:1.15,mn:70, mx:130,rf:95, pm:400, fm:15,fos:0.80,d:"Avenidas principales. Alta intensidad mixta."},
  "Co2": {n:"Co2 — Corredores Urbanos",     t:"Suelo Urbano",    c:1.10,mn:60, mx:110,rf:82, pm:300, fm:10,fos:0.70,d:"Corredores urbanos. Uso mixto."},
  "Co3a":{n:"Co3a — En consolidacion",      t:"Suelo Urbano",    c:0.92,mn:28, mx:58, rf:42, pm:180, fm:7, fos:0.60,d:"Zona en proceso de consolidacion."},
  "Co3b":{n:"Co3b — En consolidacion",      t:"Suelo Urbano",    c:0.90,mn:25, mx:55, rf:40, pm:180, fm:7, fos:0.60,d:"Zona en consolidacion."},
  "Co3c":{n:"Co3c — En consolidacion",      t:"Suelo Urbano",    c:0.88,mn:22, mx:50, rf:36, pm:180, fm:7, fos:0.60,d:"Zona de consolidacion gradual."},
  "Co4": {n:"Co4 — Zona Promocionable",     t:"Suelo Urbano",    c:0.85,mn:18, mx:45, rf:30, pm:180, fm:7, fos:0.60,d:"Zona de promocion urbana."},
  "Z2":  {n:"Z2 — Costanera Norte",         t:"Area Especial",   c:1.30,mn:90, mx:200,rf:140,pm:300, fm:15,fos:0.60,d:"Frente al Rio Gualeguaychu. Prima maxima."},
  "Z4":  {n:"Z4 — Costanera Sur",           t:"Area Especial",   c:1.25,mn:80, mx:180,rf:120,pm:300, fm:15,fos:0.60,d:"Acceso al rio y Parque Unzue."},
  "Q":   {n:"Q — Zona de Quintas",          t:"Suelo Periurbano",c:0.75,mn:8,  mx:25, rf:15, pm:5000,fm:50,fos:0.40,d:"Franja periurbana. Minimo 5000m2."},
  "CH":  {n:"CH — Zona de Chacras",         t:"Suelo Rural",     c:0.60,mn:1.5,mx:8,  rf:4,  pm:10000,fm:100,fos:0.10,d:"1-50 ha. Uso agroproductivo."},
  "R":   {n:"R — Zona Rural",               t:"Suelo Rural",     c:0.50,mn:0.5,mx:3,  rf:1.5,pm:50000,fm:200,fos:0.05,d:"Campos > 50 ha."},
  "PB_C":{n:"Pueblo Belgrano — Centro",     t:"Ejido PB",        c:1.08,mn:40, mx:80, rf:58, pm:200, fm:8, fos:0.65,d:"Centro de Pueblo Belgrano."},
  "PB_E":{n:"Pueblo Belgrano — Expansion",  t:"Ejido PB",        c:0.88,mn:12, mx:40, rf:25, pm:300, fm:10,fos:0.55,d:"Loteos perifericos."},
};
const GRUPOS_ZONA=[
  {l:"Suelo Urbano — Central y Corredores",ids:["C","Co1","Co2"],col:"#1A5C78"},
  {l:"Suelo Urbano — Residencial",         ids:["R1","R2","R3","AP1","AP2","AP3","AP4"],col:"#2A7A9A"},
  {l:"Suelo Urbano — Consolidacion",       ids:["Co3a","Co3b","Co3c","Co4"],col:"#3A8A6A"},
  {l:"Areas Especiales — Costanera",       ids:["Z2","Z4"],col:"#0A4A6A"},
  {l:"Suelo Periurbano",                   ids:["Q"],col:"#5A7A3A"},
  {l:"Suelo Rural",                        ids:["CH","R"],col:"#7A5A2A"},
  {l:"Pueblo Belgrano",                    ids:["PB_C","PB_E"],col:"#6A3A7A"},
];
const COEFS_SUP=[
  {h:50,c:1.20},{h:80,c:1.12},{h:100,c:1.06},{h:130,c:1.02},
  {h:160,c:1.00},{h:200,c:0.97},{h:250,c:0.94},{h:999,c:0.90},
];
function coefSup(m2){for(const r of COEFS_SUP){if(m2<=r.h)return r.c;}return 0.90;}

const INMOS=[
  {n:"Angelini",   url:"https://angelinipropiedades.com/propiedades/"},
  {n:"AN Neuwirt", url:"https://an-inmuebles.com/"},
  {n:"Fleitas",    url:"https://fleitaspropiedades.com.ar/"},
  {n:"ZonaProp",   url:"https://www.zonaprop.com.ar/inmuebles-venta-gualeguaychu.html"},
  {n:"Argenprop",  url:"https://www.argenprop.com/casas/venta/gualeguaychu"},
{n:"Moussou", url:"https://www.moussoupropiedades.com.ar/"},
{n:"Martinez Del Sel", url:"https://www.martinezdelselpropiedades.com.ar/"},
{n:"Ramirez Pedro", url:"https://www.ramirezpedro.com.ar/"},
{n:"MercadoLibre", url:"https://inmuebles.mercadolibre.com.ar/venta/gualeguaychu/"},
];
const COSTOS_M2_USD={Economica:230,Media:340,Buena:500,Premium:760};

// ═══════════════════════════════════════════════════════════════════
//  CHECKLIST ROSS-HEIDECKE — 8 puntos que evalua un perito
// ═══════════════════════════════════════════════════════════════════
const CHECKLIST_ROSS=[
  {id:"techo",label:"Cubierta / Techo",desc:"Estado del techo, tejas, chapas, membrana, canaletas",
   opts:[
     {v:1,t:"Sin problemas",d:"Sin filtraciones, sin roturas, reciente o bien mantenido"},
     {v:2,t:"Mantenimiento menor",d:"Alguna canaleta tapada, pintura desgastada, sin urgencia"},
     {v:3,t:"Reparacion necesaria",d:"Filtraciones leves, alguna teja rota, membrana con desgaste"},
     {v:4,t:"Mal estado",d:"Goteras activas, estructura comprometida, requiere reemplazo"},
     {v:5,t:"Muy mal estado",d:"Sin uso posible, peligroso"},
   ]},
  {id:"aberturas",label:"Aberturas (puertas y ventanas)",desc:"Estado de marcos, hojas, vidrios, herrajes",
   opts:[
     {v:1,t:"Excelente estado",d:"Aluminio o madera en perfecto estado, cierran bien, sin oxido"},
     {v:2,t:"Buen estado",d:"Funcionan bien, algun desgaste menor en pintura o herrajes"},
     {v:3,t:"Estado regular",d:"Algunas no cierran bien, vidrios rajados, herrajes rotos"},
     {v:4,t:"Mal estado",d:"Muchas deterioradas, marcos oxidados o podridos, filtraciones de aire"},
     {v:5,t:"A reemplazar total",d:"Hay que cambiar todas"},
   ]},
  {id:"instalacion_elec",label:"Instalacion electrica",desc:"Tablero, cableado, tomacorrientes, disyuntores",
   opts:[
     {v:1,t:"Moderna y segura",d:"Tablero nuevo con disyuntores, tomacorrientes polarizados, cableado reciente"},
     {v:2,t:"En buen estado",d:"Funciona bien, puede tener algun tomacorriente viejo"},
     {v:3,t:"Necesita mejoras",d:"Tablero viejo, algunos cables vistos, sin disyuntores completos"},
     {v:4,t:"Deficiente",d:"Cableado tela, tablero antiguo, riesgo electrico visible"},
     {v:5,t:"Peligrosa",d:"Instalacion muy antigua, riesgo de incendio, hay que rehacer todo"},
   ]},
  {id:"instalacion_gas",label:"Instalacion de gas",desc:"Cañerias, cocina, calefon, termotanque",
   opts:[
     {v:1,t:"Moderna",d:"Instalacion reciente, sin perdidas, equipos nuevos"},
     {v:2,t:"Buen estado",d:"Funciona bien, equipos en uso sin problemas"},
     {v:3,t:"Regular",d:"Equipos viejos pero funcionales, alguna cañeria con desgaste"},
     {v:4,t:"Deficiente",d:"Perdidas posibles, equipos muy viejos, requiere revision urgente"},
     {v:5,t:"Sin gas / muy mal estado",d:"Sin conexion a gas natural o instalacion irrecuperable"},
   ]},
  {id:"humedad",label:"Humedad y filtraciones",desc:"Manchas, eflorescencias, pintura levantada, moho",
   opts:[
     {v:1,t:"Sin humedad",d:"Sin manchas visibles ni indicios de filtraciones"},
     {v:2,t:"Humedad minima",d:"Alguna mancha aislada, no activa, cosmética"},
     {v:3,t:"Humedad moderada",d:"Manchas en paredes o cielorrasos, algunas activas"},
     {v:4,t:"Humedad importante",d:"Varios ambientes afectados, paredes con salitre, moho visible"},
     {v:5,t:"Humedad grave",d:"Estructura comprometida, muros saturados, irrecuperable sin obra"},
   ]},
  {id:"pisos",label:"Pisos",desc:"Estado de ceramicos, porcelanato, madera, cemento",
   opts:[
     {v:1,t:"Excelentes",d:"Pisos nuevos o en perfecto estado, sin roturas ni desgaste"},
     {v:2,t:"Buen estado",d:"Algun ceramico astillado, desgaste normal de uso"},
     {v:3,t:"Estado regular",d:"Varios ceramicos rotos, pisos gastados que necesitan reemplazo"},
     {v:4,t:"Mal estado",d:"Muchas roturas, pisos muy deteriorados, afectan funcionalidad"},
     {v:5,t:"Muy mal estado",d:"Hay que reemplazar todos los pisos"},
   ]},
  {id:"paredes_cielorrasos",label:"Paredes y cielorrasos",desc:"Pintura, revoques, fisuras, terminaciones",
   opts:[
     {v:1,t:"Impecables",d:"Recien pintadas, sin fisuras, terminaciones perfectas"},
     {v:2,t:"Buen estado",d:"Pintura desgastada pero integra, sin fisuras estructurales"},
     {v:3,t:"Necesitan trabajo",d:"Revoques con defectos, fisuras menores, pintura desprendida"},
     {v:4,t:"Mal estado",d:"Fisuras importantes, revoques caidos, cielorrasos con agujeros"},
     {v:5,t:"Muy mal estado",d:"Paredes comprometidas estructuralmente"},
   ]},
  {id:"banos_cocina",label:"Banos y cocina",desc:"Estado de revestimientos, artefactos, mesadas, griferias",
   opts:[
     {v:1,t:"Excelentes",d:"Revestimientos modernos, griferias nuevas, artefactos impecables"},
     {v:2,t:"Buen estado",d:"En uso sin problemas, algun artefacto viejo pero funcional"},
     {v:3,t:"Estado regular",d:"Revestimientos con deterioro, griferias viejas con perdidas leves"},
     {v:4,t:"Mal estado",d:"Artefactos rotos, revestimientos despegados, perdidas activas"},
     {v:5,t:"A refaccionar total",d:"Hay que rehacer banos y cocina completamente"},
   ]},
];

function calcularEstadoRoss(checklist){
  const vals=Object.values(checklist).filter(v=>v>0);
  if(!vals.length)return null;
  const avg=vals.reduce((s,v)=>s+v,0)/vals.length;
  // Pesos: si algun item critico esta en 4 o 5, sube el estado final
  const criticos=["techo","instalacion_elec","humedad"];
  const maxCritico=Math.max(...criticos.map(k=>checklist[k]||0));
  const estadoCalc=Math.min(5,Math.max(1,Math.round(avg)));
  // Si algun critico es alto, no puede ser mejor que ese valor menos 1
  const estadoFinal=Math.min(5,Math.max(estadoCalc,maxCritico>=4?maxCritico-1:estadoCalc));
  return Math.round(estadoFinal);
}

function explicarEstado(checklist,estadoFinal){
  const problemas=[];
  const fortalezas=[];
  Object.entries(checklist).forEach(([k,v])=>{
    const item=CHECKLIST_ROSS.find(x=>x.id===k);
    if(!item||!v)return;
    if(v>=4)problemas.push(item.label+": "+item.opts.find(o=>o.v===v)?.t);
    else if(v<=2)fortalezas.push(item.label+": "+item.opts.find(o=>o.v===v)?.t);
  });
  const nombresEstado=["","Nuevo/Excelente","Normal","Reparaciones superficiales","Reparaciones grandes","Irrecuperable"];
  let explicacion="La propiedad fue evaluada en "+Object.keys(checklist).filter(k=>checklist[k]>0).length+" aspectos tecnicos. ";
  if(fortalezas.length)explicacion+="Puntos fuertes: "+fortalezas.slice(0,2).join("; ")+". ";
  if(problemas.length)explicacion+="Aspectos que justifican el estado "+estadoFinal+": "+problemas.join("; ")+". ";
  else explicacion+="No se detectaron problemas graves que afecten significativamente el valor. ";
  explicacion+="Estado final asignado: "+estadoFinal+" — "+nombresEstado[estadoFinal]+".";
  return explicacion;
}

// ═══════════════════════════════════════════════════════════════════
//  UTILS
// ═══════════════════════════════════════════════════════════════════
const nv=v=>Number(v)||0;
const ars=v=>v?"$ "+Math.round(v).toLocaleString("es-AR"):"—";
const usdFmt=v=>v?"USD "+Math.round(v).toLocaleString("es-AR"):"—";
const hoy=()=>new Date().toLocaleDateString("es-AR",{day:"2-digit",month:"long",year:"numeric"});
const uid=()=>Math.random().toString(36).slice(2,9);
const nroInforme=()=>"TAS-"+new Date().getFullYear()+"-"+String(Math.floor(Math.random()*9000)+1000);

// ═══════════════════════════════════════════════════════════════════
//  CSS
// ═══════════════════════════════════════════════════════════════════
const CSS=[
"@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');",
"*{box-sizing:border-box;margin:0;padding:0}",
":root{--nv:#0F2D3D;--tl:#1A5C78;--t2:#2A7A9A;--sd:#F5EFE4;--cr:#FDFAF5;--pc:#EDE4D4;--gd:#B8892A;--g2:#D4A43A;--rs:#8B4513;--ik:#1A1A1A;--md:#5A5A5A;--lt:#9A9A9A;--ok:#2E7D32;--er:#B71C1C;--sh:0 2px 14px rgba(15,45,61,.09);}",
"body{font-family:'Outfit',sans-serif;background:var(--sd);color:var(--ik);min-height:100vh}",
".hdr{background:linear-gradient(150deg,var(--nv) 0%,var(--tl) 55%,var(--t2) 100%);padding:18px 22px 13px;overflow:hidden;position:relative}",
".hdr::after{content:'';position:absolute;top:-50px;right:8%;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,.04)}",
".hi{width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,var(--gd),var(--g2));display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 4px 12px rgba(0,0,0,.26);flex-shrink:0}",
".hdr-row{display:flex;align-items:center;gap:11px;position:relative;z-index:1;max-width:1060px;margin:0 auto}",
".hdr h1{font-family:'Cormorant Garamond',serif;font-size:21px;font-weight:700;color:#fff;line-height:1}",
".hdr p{font-size:10px;color:rgba(255,255,255,.56);letter-spacing:1.2px;text-transform:uppercase;margin-top:2px}",
".hdr-meta{display:flex;gap:10px;margin-top:9px;padding-top:8px;border-top:1px solid rgba(255,255,255,.11);flex-wrap:wrap;max-width:1060px;margin-left:auto;margin-right:auto;position:relative;z-index:1}",
".hdr-meta span{font-size:10px;color:rgba(255,255,255,.5);display:flex;align-items:center;gap:3px}",
".hdr-meta strong{color:rgba(255,255,255,.86);font-weight:500}",

// DOLAR BAR
".dbar{background:rgba(10,30,45,.96);padding:0 22px}",
".dbar-in{max-width:1060px;margin:0 auto;display:flex;align-items:stretch;gap:0;min-height:44px}",
".dbar-section{display:flex;align-items:center;gap:8px;padding:8px 14px;border-right:1px solid rgba(255,255,255,.08)}",
".dbar-section:last-child{border-right:none}",
".dbar-lbl{font-size:10px;font-weight:700;color:var(--g2);text-transform:uppercase;letter-spacing:.7px;white-space:nowrap}",
".dbar-val{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:700;color:#fff;white-space:nowrap}",
".dbar-sub{font-size:10px;color:rgba(255,255,255,.38);white-space:nowrap}",
".dbar-inp{background:rgba(255,255,255,.08);border:1px solid rgba(212,164,58,.3);border-radius:5px;padding:4px 9px;color:#fff;font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;width:100px;outline:none}",
".dbar-inp:focus{border-color:var(--g2)}",
".dbar-load{font-size:11px;color:rgba(255,255,255,.4);padding:8px 14px;display:flex;align-items:center;gap:6px}",
".spin{width:14px;height:14px;border:2px solid rgba(255,255,255,.15);border-top-color:var(--g2);border-radius:50%;animation:sp .7s linear infinite;flex-shrink:0}",
"@keyframes sp{to{transform:rotate(360deg)}}",

".tabbar{background:var(--nv);padding:0 22px;display:flex;border-bottom:3px solid var(--gd);overflow-x:auto}",
".tabbar::-webkit-scrollbar{height:0}",
".tb{padding:10px 12px;border:none;background:none;cursor:pointer;font-family:'Outfit',sans-serif;font-size:11px;font-weight:500;color:rgba(255,255,255,.42);white-space:nowrap;position:relative;transition:color .18s}",
".tb:hover{color:rgba(255,255,255,.78)}",
".tb.on{color:var(--g2);font-weight:600}",
".tb.on::after{content:'';position:absolute;bottom:-3px;left:0;right:0;height:3px;background:var(--g2)}",
".page{max-width:1060px;margin:0 auto;padding:20px 22px}",
"@media(max-width:700px){.page{padding:10px 10px}.hdr,.tabbar,.dbar{padding-left:10px;padding-right:10px}}",
".card{background:var(--cr);border-radius:12px;padding:18px 20px;margin-bottom:14px;box-shadow:var(--sh);border:1px solid rgba(15,45,61,.07)}",
".ct{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:600;color:var(--nv);margin-bottom:13px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;line-height:1.2}",
".pill{font-family:'Outfit',sans-serif;font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;letter-spacing:.5px;text-transform:uppercase}",
".pg{background:var(--gd);color:#fff}.pt{background:var(--tl);color:#fff}.po{background:var(--ok);color:#fff}",
".g2{display:grid;grid-template-columns:1fr 1fr;gap:11px}",
".g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:11px}",
".g4{display:grid;grid-template-columns:repeat(4,1fr);gap:11px}",
"@media(max-width:700px){.g2,.g3,.g4{grid-template-columns:1fr}}",
".fl{display:flex;flex-direction:column;gap:4px}",
".fl label{font-size:11px;font-weight:600;color:var(--md);text-transform:uppercase;letter-spacing:.7px}",
".fl input,.fl select,.fl textarea{padding:8px 11px;border:1.5px solid rgba(15,45,61,.14);border-radius:8px;font-family:'Outfit',sans-serif;font-size:13.5px;color:var(--ik);background:#fff;outline:none;transition:border-color .18s,box-shadow .18s;width:100%}",
".fl input:focus,.fl select:focus{border-color:var(--tl);box-shadow:0 0 0 3px rgba(26,92,120,.10)}",
".fl textarea{resize:vertical;min-height:58px;line-height:1.55}",
".fl .ht{font-size:10.5px;color:var(--lt);margin-top:2px}",
".btn{padding:9px 17px;border:none;border-radius:8px;font-family:'Outfit',sans-serif;font-size:12.5px;font-weight:600;cursor:pointer;transition:all .18s;display:inline-flex;align-items:center;gap:6px}",
".bp{background:linear-gradient(135deg,var(--tl),var(--nv));color:#fff;box-shadow:0 3px 10px rgba(15,45,61,.22)}",
".bp:hover{transform:translateY(-1px)}",
".bg{background:linear-gradient(135deg,var(--gd),var(--g2));color:#fff}",
".bg:hover{transform:translateY(-1px)}",
".bh{background:var(--pc);color:var(--tl);border:1.5px solid rgba(26,92,120,.18)}",
".bh:hover{background:rgba(26,92,120,.07)}",
".bd{background:#FEE2E2;color:var(--er);border:1px solid #FECACA}",
".bsm{padding:5px 10px;font-size:11px;border-radius:6px}",
".brow{display:flex;gap:8px;flex-wrap:wrap;margin-top:6px}",
".cr-row{display:flex;justify-content:space-between;align-items:flex-start;padding:8px 0;border-bottom:1px dashed rgba(15,45,61,.09);font-size:12.5px;gap:8px}",
".cr-row:last-child{border:none}",
".cr-row .cl{color:var(--md);flex:1}",
".cr-row .cv{font-weight:600;text-align:right}",
".cr-row .cu{font-size:10.5px;color:var(--lt);text-align:right;margin-top:1px}",
".cr-row.sb .cl{font-weight:600;color:var(--nv)}.cr-row.sb .cv{color:var(--nv);font-size:13px}",
".cr-row.tt .cl{font-weight:700;color:var(--nv);font-size:13.5px}.cr-row.tt .cv{font-family:'Cormorant Garamond',serif;font-size:17px;color:var(--nv)}",
".cr-row.ng .cv{color:var(--er)}.cr-row.ps .cv{color:var(--ok)}",
".rb{background:linear-gradient(135deg,var(--nv),var(--tl));border-radius:11px;padding:18px 22px;color:#fff;position:relative;overflow:hidden;margin-top:10px}",
".rb::before{content:'';position:absolute;top:-24px;right:-24px;width:110px;height:110px;border-radius:50%;background:rgba(255,255,255,.05)}",
".rb-in{position:relative;z-index:1}",
".rl{font-size:10px;font-weight:600;letter-spacing:.9px;text-transform:uppercase;opacity:.62;margin-bottom:3px}",
".rv{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:700;line-height:1}",
".rm{font-size:12.5px;opacity:.68;margin-top:4px}",
".rr{font-size:10.5px;opacity:.48;margin-top:4px}",
".dv{height:1px;background:rgba(15,45,61,.09);margin:13px 0}",
".inf{background:rgba(184,137,42,.07);border:1.5px solid rgba(184,137,42,.18);border-radius:8px;padding:9px 12px;font-size:12px;color:var(--md);line-height:1.65;margin-bottom:11px}",
".inf strong{color:var(--rs)}",
".hl{background:rgba(26,92,120,.06);border-radius:8px;padding:9px 12px;margin:9px 0;font-size:12px;line-height:1.65}",
".hl strong{color:var(--nv)}",
".ok-box{background:rgba(46,125,50,.07);border:1.5px solid rgba(46,125,50,.2);border-radius:8px;padding:9px 12px;font-size:12px;color:var(--ok);margin:9px 0}",
".guia-btn{width:100%;background:rgba(26,92,120,.05);border:1.5px solid rgba(26,92,120,.18);border-radius:9px;padding:11px 15px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;margin-bottom:12px;font-family:'Outfit',sans-serif}",
".guia-body{background:rgba(26,92,120,.04);border:1.5px solid rgba(26,92,120,.11);border-radius:0 0 9px 9px;padding:13px 15px;margin-top:-12px;margin-bottom:12px}",

// FOTOS
".ph-zone{border:2.5px dashed rgba(26,92,120,.28);border-radius:10px;padding:20px;text-align:center;cursor:pointer;transition:all .2s;background:rgba(26,92,120,.03);position:relative;margin-bottom:11px}",
".ph-zone:hover{border-color:var(--tl);background:rgba(26,92,120,.07)}",
".ph-zone.has{border-style:solid;border-color:var(--tl)}",
".ph-zone input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%}",
".ph-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-bottom:11px}",
"@media(max-width:600px){.ph-grid{grid-template-columns:1fr 1fr}}",
".ph-th{position:relative;border-radius:8px;overflow:hidden;aspect-ratio:4/3;border:2px solid rgba(15,45,61,.1)}",
".ph-th img{width:100%;height:100%;object-fit:cover}",
".ph-th .ph-lbl{position:absolute;top:4px;left:4px;background:rgba(15,45,61,.78);color:#fff;font-size:9px;font-weight:600;padding:2px 5px;border-radius:7px}",
".ph-th .ph-rm{position:absolute;top:3px;right:3px;background:rgba(183,28,28,.82);color:#fff;border:none;border-radius:50%;width:18px;height:18px;font-size:11px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1}",

// CHECKLIST ROSS
".ck-item{background:#fff;border-radius:9px;border:1.5px solid rgba(15,45,61,.09);margin-bottom:10px;overflow:hidden}",
".ck-hdr{padding:11px 14px;cursor:pointer;display:flex;justify-content:space-between;align-items:center}",
".ck-hdr .ck-lbl{font-weight:600;font-size:13px;color:var(--nv)}",
".ck-hdr .ck-desc{font-size:11px;color:var(--lt);margin-top:2px}",
".ck-hdr .ck-badge{font-size:11px;font-weight:700;padding:3px 9px;border-radius:10px;color:#fff;flex-shrink:0}",
".ck-opts{padding:0 10px 10px}",
".ck-opt{border:1.5px solid rgba(15,45,61,.11);border-radius:7px;padding:8px 11px;margin-bottom:6px;cursor:pointer;transition:all .16s;display:flex;align-items:flex-start;gap:8px}",
".ck-opt:hover{border-color:var(--tl);background:rgba(26,92,120,.04)}",
".ck-opt.sel{border-color:var(--tl);background:rgba(26,92,120,.07)}",
".ck-opt .co-n{font-size:18px;font-weight:700;font-family:'Cormorant Garamond',serif;color:var(--nv);min-width:22px}",
".ck-opt .co-t{font-size:12.5px;font-weight:600;color:var(--nv);margin-bottom:1px}",
".ck-opt .co-d{font-size:11.5px;color:var(--md);line-height:1.45}",

// RESULTADO ROSS
".ross-result{border-radius:11px;padding:16px 18px;margin-top:12px}",
".ross-result .rr-n{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:700;line-height:1;margin-bottom:4px}",
".ross-result .rr-l{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px}",
".ross-result .rr-exp{font-size:13px;line-height:1.7;margin-top:8px;opacity:.88}",

// ZONAS
".zona-grupo{margin-bottom:16px}",
".zg-hdr{font-family:'Cormorant Garamond',serif;font-size:13.5px;font-weight:600;padding:6px 12px;border-radius:6px 6px 0 0;color:#fff}",
".zona-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px;background:rgba(255,255,255,.5);border:1px solid rgba(15,45,61,.07);border-top:none;border-radius:0 0 7px 7px}",
"@media(max-width:700px){.zona-grid{grid-template-columns:1fr}}",
".zcard{background:#fff;border-radius:8px;padding:10px 12px;border:2px solid transparent;cursor:pointer;transition:all .16s;box-shadow:0 1px 4px rgba(15,45,61,.06)}",
".zcard:hover{border-color:var(--tl)}.zcard.sel{border-color:var(--tl);background:rgba(26,92,120,.04)}",
".zcard .zn{font-weight:700;font-size:12px;color:var(--nv);margin-bottom:2px}",
".zcard .zd{font-size:11px;color:var(--md);margin-bottom:5px;line-height:1.4}",
".zcard .zp{display:flex;gap:5px;flex-wrap:wrap}",
".zpill{font-size:9.5px;font-weight:600;padding:2px 6px;border-radius:9px;background:rgba(26,92,120,.09);color:var(--tl)}",
".zpill2{background:rgba(184,137,42,.12);color:var(--rs)}",
".tc{background:rgba(26,92,120,.05);border:1.5px solid rgba(26,92,120,.14);border-radius:9px;padding:14px 16px;margin-top:11px}",
".tc-t{font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:600;color:var(--nv);margin-bottom:11px}",
".terr-res{background:linear-gradient(135deg,var(--rs),var(--gd));border-radius:9px;padding:14px 18px;color:#fff;margin-top:11px}",
".tr-l{font-size:9.5px;letter-spacing:.9px;text-transform:uppercase;opacity:.76;margin-bottom:2px}",
".tr-v{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;line-height:1}",
".tr-u{font-size:12px;opacity:.74;margin-top:3px}",
".tr-r{font-size:10px;opacity:.53;margin-top:4px}",
".tbl{width:100%;border-collapse:collapse;font-size:12px}",
".tbl th{text-align:left;padding:7px 9px;background:rgba(15,45,61,.06);color:var(--nv);font-weight:600;font-size:10px;text-transform:uppercase;letter-spacing:.5px;border-bottom:2px solid rgba(15,45,61,.11)}",
".tbl td{padding:7px 9px;border-bottom:1px solid rgba(15,45,61,.05);vertical-align:middle}",
".tbl tr:hover td{background:rgba(26,92,120,.02)}",
".tbl td input,.tbl td select{width:100%;border:1.5px solid rgba(15,45,61,.12);border-radius:5px;padding:5px 8px;font-family:'Outfit',sans-serif;font-size:11.5px;outline:none}",
".tbl td input:focus,.tbl td select:focus{border-color:var(--tl)}",
".chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px}",
".chip{display:inline-flex;align-items:center;gap:4px;padding:5px 9px;background:#fff;border:1.5px solid rgba(26,92,120,.18);border-radius:6px;font-size:11px;color:var(--tl);font-weight:500;text-decoration:none;transition:all .16s}",
".chip:hover{background:rgba(26,92,120,.06);transform:translateY(-1px)}",
".cb-row{display:flex;gap:13px;flex-wrap:wrap;margin-top:9px}",
".cb{display:flex;align-items:center;gap:6px;cursor:pointer;font-size:12px;color:var(--md)}",
".cb input{width:13px;height:13px;accent-color:var(--tl)}",
".sum-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-top:11px}",
"@media(max-width:700px){.sum-grid{grid-template-columns:1fr}}",
".sc{background:#fff;border-radius:9px;padding:12px 14px;border:1.5px solid rgba(15,45,61,.09)}",
".sc .sl{font-size:10px;font-weight:600;color:var(--lt);text-transform:uppercase;letter-spacing:.6px;margin-bottom:4px}",
".sc .sv{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:700;color:var(--nv)}",
".sc .sm{font-size:10px;color:var(--md);margin-top:2px}",
".pond-row{display:flex;align-items:center;gap:9px;margin-bottom:8px;flex-wrap:wrap}",
".pond-row label{font-size:12px;color:var(--md);min-width:155px}",
".pond-row input[type=range]{flex:1;min-width:80px;accent-color:var(--tl)}",
".pv{font-weight:700;color:var(--nv);min-width:32px;text-align:right;font-size:12.5px}",
".final-box{background:linear-gradient(135deg,var(--rs) 0%,var(--gd) 100%);border-radius:12px;padding:22px 26px;color:#fff;text-align:center;margin-top:14px;box-shadow:0 7px 20px rgba(184,137,42,.22)}",
".fb-l{font-size:10px;letter-spacing:1.4px;text-transform:uppercase;opacity:.82;margin-bottom:4px}",
".fb-v{font-family:'Cormorant Garamond',serif;font-size:40px;font-weight:700;line-height:1}",
".fb-u{font-size:15px;opacity:.82;margin-top:4px}",
".fb-m{font-size:12.5px;opacity:.68;margin-top:3px}",
".fb-d{font-size:10px;opacity:.5;margin-top:6px}",
".arg-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px}",
"@media(max-width:600px){.arg-grid{grid-template-columns:1fr}}",
".arg-card{background:rgba(26,92,120,.04);border:1.5px solid rgba(26,92,120,.11);border-radius:9px;padding:12px 13px}",
".arg-card .a-ico{font-size:17px;margin-bottom:4px}",
".arg-card .a-tit{font-family:'Cormorant Garamond',serif;font-size:13.5px;font-weight:600;color:var(--nv);margin-bottom:4px}",
".arg-card .a-bod{font-size:11.5px;color:var(--md);line-height:1.62}",
".arg-card .a-val{font-weight:700;color:var(--tl);margin-top:5px;font-size:11.5px}",
".dep-b{display:inline-flex;align-items:center;gap:5px;background:rgba(184,137,42,.09);border:1px solid rgba(184,137,42,.2);border-radius:7px;padding:5px 10px;font-size:12px;color:var(--rs);font-weight:500}",
".costo-ref{background:rgba(184,137,42,.07);border-radius:7px;padding:7px 11px;margin-bottom:11px;font-size:12.5px}",
".costo-ref strong{color:var(--rs)}",
".hist-card{background:#fff;border-radius:9px;padding:12px 14px;border:1.5px solid rgba(15,45,61,.09);margin-bottom:9px}",
".hist-card .hc-dom{font-weight:600;color:var(--nv);font-size:13px}",
".hist-card .hc-val{font-family:'Cormorant Garamond',serif;font-size:17px;color:var(--tl);margin:2px 0}",
".hist-card .hc-det{font-size:11px;color:var(--lt)}",
".zona-idx{background:#fff;border-radius:9px;padding:11px 13px;border:1.5px solid rgba(15,45,61,.09);margin-bottom:7px}",
".zona-idx .zi-n{font-weight:600;color:var(--nv);font-size:12.5px;margin-bottom:3px}",
".zona-idx .zi-v{font-family:'Cormorant Garamond',serif;font-size:16px;color:var(--tl)}",
".zona-idx .zi-r{font-size:11px;color:var(--lt);margin-top:2px}",
".tips-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px}",
"@media(max-width:700px){.tips-grid{grid-template-columns:1fr}}",
".tip{background:#fff;border-radius:9px;padding:12px 14px;border-left:4px solid var(--tl);box-shadow:var(--sh)}",
".tip.gd{border-left-color:var(--gd)}.tip.rs{border-left-color:var(--rs)}",
".tip .tn{font-size:10px;font-weight:700;color:var(--tl);text-transform:uppercase;letter-spacing:.7px;margin-bottom:3px}",
".tip.gd .tn{color:var(--gd)}.tip.rs .tn{color:var(--rs)}",
".tip .tt2{font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:600;color:var(--nv);margin-bottom:4px}",
".tip .tb3{font-size:11.5px;color:var(--md);line-height:1.62}",
".empty{text-align:center;padding:22px;color:var(--lt);font-size:13.5px}",
"@media print{.tabbar,.btn,.brow,.chips,.dbar,.no-print{display:none!important}.card{box-shadow:none;break-inside:avoid}body{background:#fff}.page{padding:0}}",
].join("\n");

// ═══════════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════════
function Fld({label,hint,children}){
  return(<div className="fl"><label>{label}</label>{children}{hint&&<span className="ht">{hint}</span>}</div>);
}
function CRow({label,value,usdVal,sub,neg,pos,tot}){
  const cls=["cr-row",sub?"sb":"",neg?"ng":"",pos?"ps":"",tot?"tt":""].filter(Boolean).join(" ");
  return(<div className={cls}><div><div className="cl">{label}</div>{usdVal&&<div className="cu">{usdVal}</div>}</div><span className="cv">{value}</span></div>);
}
function Guia({tipo}){
  const [open,setOpen]=useState(false);
  const G={
    comparables:{t:"Guia: Metodo de Comparables",q:"Buscar propiedades similares en venta para saber cuanto vale la del propietario hoy.",p:["Buscar 3-6 propiedades con tipo, zona y superficie similar en Angelini, Neuwirt, Fleitas.","Calcular el USD/m2 de cada una.","Promediar los precios.","Aplicar coeficiente de localizacion segun zona POT.","Aplicar coeficiente de homogeneizacion por diferencia de superficie.","Ajustar por caracteristicas: garaje, piscina, estado, esquina.","Multiplicar el USD/m2 final por los m2 cubiertos de la propiedad."],d:"Mire, busque en las inmobiliarias de Gualeguaychu propiedades similares a la suya en la misma zona. El mercado me dice que propiedades como la suya valen entre USD X y USD Y por metro cuadrado. La suya tiene Z metros cubiertos, entonces su valor de mercado es USD W. Eso es lo que el mercado paga hoy.",f:"Directo. Muestra lo que el mercado paga HOY.",l:"Requiere comparables disponibles en la misma zona."},
    capitalizacion:{t:"Guia: Metodo de Capitalizacion de Rentas",q:"Calcular el valor segun los ingresos que genera o podria generar como alquiler.",p:["Determinar el alquiler mensual de mercado para esa propiedad y zona.","Calcular el ingreso anual bruto (alquiler x 12).","Descontar la vacancia.","Dividir el ingreso anual neto por la tasa de capitalizacion del mercado local (GCU: 6%-10%).","El resultado es el valor de la propiedad."],d:"Esta propiedad, puesta en alquiler, generaria USD X por mes. En un ano, neto de vacancia, eso son USD Y. En el mercado de Gualeguaychu, una inversion inmobiliaria rinde entre el 6% y el 10% anual. Dividiendo el ingreso por la tasa, la propiedad vale USD Z. Si un inversor la compra a ese precio, gana exactamente lo que paga el mercado.",f:"Muestra la rentabilidad real en dolares.",l:"Depende del alquiler de mercado vigente."},
    reposicion:{t:"Guia: Metodo de Reposicion",q:"Calcular cuanto costaria construir hoy la misma propiedad y aplicarle la depreciacion real.",p:["Determinar el costo de construccion por m2 segun tipo y calidad.","Ajustar por zona POT.","Multiplicar por la superficie.","Sumar gastos indirectos (~15%).","Calcular vida consumida: anos de antiguedad / vida util.","Buscar en la tabla Ross-Heidecke el % de depreciacion.","Aplicar depreciacion y sumar el terreno."],d:"Para construir hoy una propiedad igual a la suya costaria USD X. Tiene Y anos de antiguedad, consumio el Z% de su vida util. La tabla Ross-Heidecke oficial —la misma que usan todos los peritos de Argentina— dice que la depreciacion es del W%. Sumando el terreno, llegamos a USD T.",f:"El metodo mas riguroso. Funciona para cualquier propiedad.",l:"Requiere conocer bien el costo actual de construccion."},
  };
  const g=G[tipo];if(!g)return null;
  return(
    <div style={{marginBottom:12}}>
      <button className="guia-btn" onClick={()=>setOpen(!open)}>
        <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14.5,fontWeight:600,color:"var(--nv)"}}>{g.t}</span>
        <span style={{fontSize:17,color:"var(--tl)",fontWeight:700}}>{open?"−":"+"}</span>
      </button>
      {open&&(
        <div className="guia-body">
          <p style={{fontSize:12.5,color:"var(--md)",lineHeight:1.7,marginBottom:10}}>{g.q}</p>
          <div style={{marginBottom:10}}>
            <div style={{fontSize:10.5,fontWeight:700,color:"var(--tl)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:4}}>Paso a paso</div>
            <ol style={{fontSize:12.5,color:"var(--md)",lineHeight:1.8,paddingLeft:16}}>{g.p.map((p,i)=><li key={i}>{p}</li>)}</ol>
          </div>
          <div style={{background:"rgba(184,137,42,.08)",borderRadius:8,padding:"10px 13px",marginBottom:9}}>
            <div style={{fontSize:10.5,fontWeight:700,color:"var(--rs)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:4}}>Que decirle al propietario</div>
            <p style={{fontSize:12.5,color:"var(--ik)",lineHeight:1.75,fontStyle:"italic"}}>"{g.d}"</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
            <div style={{background:"rgba(46,125,50,.07)",borderRadius:7,padding:"8px 11px"}}><div style={{fontSize:10,fontWeight:700,color:"var(--ok)",marginBottom:3}}>FORTALEZA</div><p style={{fontSize:11.5,color:"var(--md)",lineHeight:1.6}}>{g.f}</p></div>
            <div style={{background:"rgba(183,28,28,.06)",borderRadius:7,padding:"8px 11px"}}><div style={{fontSize:10,fontWeight:700,color:"var(--er)",marginBottom:3}}>LIMITACION</div><p style={{fontSize:11.5,color:"var(--md)",lineHeight:1.6}}>{g.l}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
function Semaforo({rComp,rCap,rRep}){
  const vals=[rComp&&rComp.usdTotal,rCap&&rCap.val,rRep&&rRep.total].filter(Boolean);
  if(vals.length<2)return null;
  const max=Math.max(...vals),min=Math.min(...vals),prom=vals.reduce((a,b)=>a+b,0)/vals.length;
  const dis=((max-min)/prom)*100;
  let col,nivel,titulo,msg,det;
  if(dis<=10){col="#2E7D32";nivel="VERDE";titulo="Tasacion muy confiable";msg="Los "+vals.length+" metodos coinciden con "+dis.toFixed(1)+"% de diferencia.";det="Valor respaldado desde todos los angulos. Muy dificil de cuestionar.";}
  else if(dis<=20){col="#F59E0B";nivel="AMARILLO";titulo="Confiable con observacion";msg="Diferencia del "+dis.toFixed(1)+"%. Aceptable, revisar datos.";det="Hasta 20% de diferencia es normal en tasaciones. Revisar comparables y tasa de capitalizacion.";}
  else if(dis<=35){col="#F97316";nivel="NARANJA";titulo="Diferencia significativa";msg="Diferencia del "+dis.toFixed(1)+"%. Revisar datos antes de presentar.";det="No invalida la tasacion pero debe poder justificarse. Revisar que los comparables sean realmente similares.";}
  else{col="#B71C1C";nivel="ROJO";titulo="Revision necesaria";msg="Diferencia del "+dis.toFixed(1)+"%. Revisar todos los datos.";det="Diferencia muy grande. Algun dato importante puede estar incorrecto. No presentar sin revisar.";}
  return(
    <div style={{border:"2px solid "+col,borderRadius:12,padding:"14px 16px",marginBottom:14,background:col+"0D"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
        <div style={{width:14,height:14,borderRadius:"50%",background:col,flexShrink:0,boxShadow:"0 0 7px "+col+"88"}}/>
        <div><div style={{fontSize:10.5,fontWeight:700,color:col,textTransform:"uppercase",letterSpacing:".8px"}}>Semaforo — {nivel}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:600,color:"var(--nv)"}}>{titulo}</div></div>
      </div>
      <p style={{fontSize:12.5,color:"var(--ik)",fontWeight:500,marginBottom:5}}>{msg}</p>
      <p style={{fontSize:12,color:"var(--md)",lineHeight:1.65,marginBottom:9}}>{det}</p>
      <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
        {[rComp&&{l:"Comparables",v:rComp.usdTotal},rCap&&{l:"Capitalizacion",v:rCap.val},rRep&&{l:"Reposicion",v:rRep.total}].filter(Boolean).map(m=>(
          <div key={m.l} style={{background:"rgba(255,255,255,.7)",borderRadius:6,padding:"4px 10px",fontSize:11.5}}>
            <span style={{color:"var(--lt)",marginRight:4}}>{m.l}:</span>
            <strong style={{color:"var(--nv)"}}>USD {Math.round(m.v).toLocaleString("es-AR")}</strong>
          </div>
        ))}
        <div style={{background:col+"22",borderRadius:6,padding:"4px 10px",fontSize:11.5}}>
          <span style={{color:"var(--lt)",marginRight:4}}>Dispersion:</span>
          <strong style={{color:col}}>{dis.toFixed(1)}%</strong>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  BARRA DE DÓLAR EN TIEMPO REAL
// ═══════════════════════════════════════════════════════════════════
function DolarBar({tc,setTc}){
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [lastUpdate,setLastUpdate]=useState(null);
  const [tcSeleccionado,setTcSeleccionado]=useState("blue_promedio");
  const [expandido,setExpandido]=useState(false);

  const fetch_=useCallback(async()=>{
    setLoading(true);setError("");
    try{
      const r=await fetch("https://dolarapi.com/v1/dolares");
      if(!r.ok)throw new Error("HTTP "+r.status);
      const arr=await r.json();
      const m={};
      arr.forEach(d=>{m[d.casa.toLowerCase()]=d;});
      setData(m);
      // Aplicar automaticamente el promedio blue
      const bl=m["blue"];
      if(bl&&bl.venta){
        const prom=Math.round(((bl.compra||bl.venta)+bl.venta)/2);
        setTc(String(prom));
      }
      setLastUpdate(new Date().toLocaleTimeString("es-AR",{hour:"2-digit",minute:"2-digit"}));
    }catch(e){
      setError("Sin conexion. Ingresa el TC manualmente.");
    }
    setLoading(false);
  },[setTc]);

  useEffect(()=>{fetch_();},[]);

  const aplicarTC=(tipo)=>{
    if(!data)return;
    const MAPA={
      "blue_compra":  ()=>data.blue&&data.blue.compra,
      "blue_venta":   ()=>data.blue&&data.blue.venta,
      "blue_promedio":()=>data.blue&&Math.round(((data.blue.compra||data.blue.venta)+data.blue.venta)/2),
      "oficial_venta":()=>data.oficial&&data.oficial.venta,
      "mep":          ()=>data.bolsa&&data.bolsa.venta,
      "ccl":          ()=>data.contadoconliqui&&data.contadoconliqui.venta,
      "cripto":       ()=>data.cripto&&data.cripto.venta,
      "mayorista":    ()=>data.mayorista&&data.mayorista.venta,
    };
    const fn=MAPA[tipo];
    if(fn){const v=fn();if(v){setTcSeleccionado(tipo);setTc(String(Math.round(v)));}}
  };

  const TIPOS_DOLAR=[
    {key:"blue_promedio", label:"Blue Promedio",  desc:"Promedio compra/venta blue — recomendado para inmuebles"},
    {key:"blue_compra",   label:"Blue Compra",    desc:"Precio al que el mercado compra dolares"},
    {key:"blue_venta",    label:"Blue Venta",     desc:"Precio al que el mercado vende dolares"},
    {key:"oficial_venta", label:"Oficial",        desc:"Tipo de cambio oficial Banco Nacion"},
    {key:"mep",           label:"MEP / Bolsa",    desc:"Dolar financiero via bonos"},
    {key:"ccl",           label:"CCL",            desc:"Contado con liquidacion"},
    {key:"cripto",        label:"Cripto",         desc:"Dolar via criptomonedas"},
    {key:"mayorista",     label:"Mayorista",      desc:"Para operaciones bancarias mayoristas"},
  ];

  const tcN=nv(tc);
  const bl=data&&data.blue;
  const blProm=bl?Math.round(((bl.compra||bl.venta)+bl.venta)/2):null;

  return(
    <div style={{background:"rgba(15,45,61,.92)",padding:"0 24px"}}>
      <div style={{maxWidth:1060,margin:"0 auto"}}>

        {/* FILA PRINCIPAL — siempre visible */}
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0",flexWrap:"wrap"}}>

          {/* ICONO Y TITULO */}
          <span style={{fontSize:13,fontWeight:700,color:"var(--g2)",letterSpacing:".8px",textTransform:"uppercase"}}>
            💵 Dolar
          </span>

          {/* BLUE DESTACADO */}
          {loading&&<span style={{fontSize:12,color:"rgba(255,255,255,.5)",display:"flex",alignItems:"center",gap:5}}><div className="spin"/>Actualizando...</span>}
          {!loading&&error&&<span style={{fontSize:12,color:"rgba(255,120,120,.8)"}}>{error}</span>}
          {!loading&&bl&&(
            <div style={{display:"flex",gap:4,alignItems:"center",background:"rgba(184,137,42,.15)",borderRadius:7,padding:"4px 10px",border:"1px solid rgba(184,137,42,.3)"}}>
              <span style={{fontSize:10.5,color:"var(--g2)",fontWeight:600,textTransform:"uppercase",letterSpacing:".6px"}}>BLUE</span>
              <span style={{fontSize:11.5,color:"rgba(255,255,255,.6)"}}>C: <strong style={{color:"#fff"}}>${(bl.compra||"—").toLocaleString()}</strong></span>
              <span style={{fontSize:11.5,color:"rgba(255,255,255,.6)"}}>V: <strong style={{color:"#fff"}}>${(bl.venta||"—").toLocaleString()}</strong></span>
              {blProm&&<span style={{fontSize:11,color:"var(--g2)",fontWeight:700}}>Prom: ${blProm.toLocaleString()}</span>}
            </div>
          )}

          {/* OTROS TIPOS — compacto */}
          {!loading&&data&&(
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {[["oficial","Oficial"],["bolsa","MEP"],["contadoconliqui","CCL"]].map(([key,lbl])=>(
                data[key]&&<span key={key} style={{fontSize:11,color:"rgba(255,255,255,.45)"}}>
                  {lbl}: <strong style={{color:"rgba(255,255,255,.7)"}}>${(data[key].venta||"—").toLocaleString()}</strong>
                </span>
              ))}
            </div>
          )}

          {/* TC ACTUAL */}
          <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:11,color:"rgba(255,255,255,.45)"}}>TC:</span>
            <input
              style={{background:"rgba(255,255,255,.1)",border:"1px solid rgba(212,164,58,.3)",borderRadius:5,padding:"4px 9px",color:"#fff",fontFamily:"Outfit,sans-serif",fontSize:13,fontWeight:700,width:90,outline:"none"}}
              type="number" value={tc} onChange={e=>setTc(e.target.value)} placeholder="TC"
            />
            <span style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>ARS/USD</span>
          </div>

          {/* BOTON EXPANDIR */}
          <button
            onClick={()=>setExpandido(!expandido)}
            style={{background:"rgba(184,137,42,.15)",border:"1px solid rgba(184,137,42,.25)",color:"var(--g2)",borderRadius:5,padding:"4px 10px",cursor:"pointer",fontFamily:"Outfit,sans-serif",fontSize:11,fontWeight:600}}
          >
            {expandido?"▲ Cerrar":"▼ Cambiar tipo"}
          </button>
          <button
            onClick={fetch_}
            style={{background:"rgba(26,92,120,.3)",border:"1px solid rgba(26,92,120,.4)",color:"rgba(255,255,255,.7)",borderRadius:5,padding:"4px 10px",cursor:"pointer",fontFamily:"Outfit,sans-serif",fontSize:11}}
          >
            ↻{lastUpdate?" "+lastUpdate:""}
          </button>
        </div>

        {/* PANEL EXPANDIBLE — seleccionar tipo de dolar */}
        {expandido&&(
          <div style={{borderTop:"1px solid rgba(255,255,255,.08)",padding:"10px 0 12px"}}>
            <div style={{fontSize:11,color:"rgba(255,255,255,.45)",marginBottom:8,letterSpacing:".5px"}}>
              SELECCIONA EL TIPO DE DOLAR A USAR EN LA TASACION:
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {TIPOS_DOLAR.map(tipo=>{
                const MAPA={
                  "blue_compra":  data&&data.blue&&data.blue.compra,
                  "blue_venta":   data&&data.blue&&data.blue.venta,
                  "blue_promedio":blProm,
                  "oficial_venta":data&&data.oficial&&data.oficial.venta,
                  "mep":          data&&data.bolsa&&data.bolsa.venta,
                  "ccl":          data&&data.contadoconliqui&&data.contadoconliqui.venta,
                  "cripto":       data&&data.cripto&&data.cripto.venta,
                  "mayorista":    data&&data.mayorista&&data.mayorista.venta,
                };
                const valor=MAPA[tipo.key];
                const activo=tcSeleccionado===tipo.key;
                return(
                  <button
                    key={tipo.key}
                    onClick={()=>aplicarTC(tipo.key)}
                    title={tipo.desc}
                    style={{
                      background:activo?"rgba(184,137,42,.35)":"rgba(255,255,255,.06)",
                      border:activo?"1px solid var(--g2)":"1px solid rgba(255,255,255,.12)",
                      borderRadius:7,padding:"6px 12px",cursor:"pointer",
                      fontFamily:"Outfit,sans-serif",textAlign:"left",
                      transition:"all .15s",
                    }}
                  >
                    <div style={{fontSize:11,fontWeight:600,color:activo?"var(--g2)":"rgba(255,255,255,.65)"}}>{tipo.label}</div>
                    <div style={{fontSize:12.5,fontWeight:700,color:activo?"#fff":"rgba(255,255,255,.8)"}}>
                      {valor?"$"+Math.round(valor).toLocaleString("es-AR"):"—"}
                    </div>
                  </button>
                );
              })}
            </div>
            {tcN>0&&(
              <div style={{marginTop:9,fontSize:11.5,color:"rgba(255,255,255,.45)"}}>
                TC activo: <strong style={{color:"var(--g2)"}}>$ {tcN.toLocaleString("es-AR")}/USD</strong>
                {" "}—{" "}
                USD 1.000 = {ars(tcN*1000)} |
                USD 10.000 = {ars(tcN*10000)} |
                USD 50.000 = {ars(tcN*50000)} |
                USD 100.000 = {ars(tcN*100000)}
              </div>
            )}
            <div style={{marginTop:8,fontSize:10.5,color:"rgba(255,255,255,.3)",lineHeight:1.5}}>
              Para tasaciones inmobiliarias se recomienda el <strong style={{color:"rgba(255,255,255,.5)"}}>Dolar Blue Promedio</strong>.
              Es el tipo de cambio de referencia en el mercado inmobiliario argentino.
              Fuente: dolarapi.com — actualizado en tiempo real.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
//  TAB TASADOR
// ═══════════════════════════════════════════════════════════════════
function TabTasador({tasador,setTasador}){
  const s=(k,v)=>setTasador(t=>({...t,[k]:v}));
  return(
    <div>
      <div className="card">
        <div className="ct">Datos del Tasador e Inmobiliaria</div>
        <div className="inf"><strong>Importante:</strong> Estos datos aparecen en el informe PDF y le dan validez profesional a la tasacion.</div>
        <div className="g2" style={{marginBottom:12}}>
          <Fld label="Nombre y apellido del tasador"><input placeholder="Juan Perez" value={tasador.nombre||""} onChange={e=>s("nombre",e.target.value)}/></Fld>
          <Fld label="Matricula Colegio Inmobiliario ER"><input placeholder="CIER-0000" value={tasador.matricula||""} onChange={e=>s("matricula",e.target.value)}/></Fld>
        </div>
        <div className="g2" style={{marginBottom:12}}>
          <Fld label="Nombre de la inmobiliaria"><input placeholder="Inmobiliaria GCU" value={tasador.inmo||""} onChange={e=>s("inmo",e.target.value)}/></Fld>
          <Fld label="Telefono / WhatsApp"><input placeholder="+54 3446 000000" value={tasador.tel||""} onChange={e=>s("tel",e.target.value)}/></Fld>
        </div>
        <div className="g2">
          <Fld label="Email"><input placeholder="info@inmobiliaria.com.ar" value={tasador.email||""} onChange={e=>s("email",e.target.value)}/></Fld>
          <Fld label="Domicilio profesional"><input placeholder="San Martin 123, Gualeguaychu" value={tasador.dir||""} onChange={e=>s("dir",e.target.value)}/></Fld>
        </div>
      </div>
      {tasador.nombre&&<div className="ok-box">Informe firmado por: <strong>{tasador.nombre}</strong>{tasador.matricula&&" | Mat. N° "+tasador.matricula}{tasador.inmo&&" | "+tasador.inmo}</div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  TAB INMUEBLE
// ═══════════════════════════════════════════════════════════════════
function TabInmueble({prop,setProp,tc,onNext}){
  const s=(k,v)=>setProp(p=>({...p,[k]:v}));
  const sArr=(k,v)=>setProp(p=>({...p,[k]:(p[k]||[]).includes(v)?(p[k]||[]).filter(x=>x!==v):[...(p[k]||[]),v]}));
  const zona=ZONAS[prop.zona_id];
  const gps=()=>navigator.geolocation&&navigator.geolocation.getCurrentPosition(p=>{s("lat",p.coords.latitude.toFixed(6));s("lng",p.coords.longitude.toFixed(6));});
  return(
    <div>
      <div className="card">
        <div className="ct">Identificacion</div>
        <div className="g3" style={{marginBottom:12}}>
          <Fld label="Tipo"><select value={prop.tipo} onChange={e=>s("tipo",e.target.value)}>{["Casa","Departamento","PH","Duplex","Local","Oficina","Terreno","Chacra","Quinta"].map(t=><option key={t}>{t}</option>)}</select></Fld>
          <Fld label="Domicilio"><input placeholder="Urquiza 543" value={prop.dom} onChange={e=>s("dom",e.target.value)}/></Fld>
          <Fld label="Zona POT"><select value={prop.zona_id} onChange={e=>s("zona_id",e.target.value)}><option value="">Seleccionar...</option>{GRUPOS_ZONA.map(g=>(<optgroup key={g.l} label={g.l}>{g.ids.map(id=><option key={id} value={id}>{ZONAS[id].n}</option>)}</optgroup>))}</select></Fld>
        </div>
        {zona&&<div className="hl"><strong>{zona.n}</strong> — {zona.t}<br/><span style={{fontSize:11.5,color:"var(--md)"}}>{zona.d}</span><br/><span style={{fontSize:11,color:"var(--lt)"}}>Parcela min: {zona.pm}m2 | FOS: {zona.fos} | Coef: x{zona.c.toFixed(2)}</span></div>}
      </div>
      <div className="card">
        <div className="ct">Superficies</div>
        <div className="g4" style={{marginBottom:12}}>
          <Fld label="Sup. terreno (m2)"><input type="number" placeholder="300" value={prop.st} onChange={e=>s("st",e.target.value)}/></Fld>
          <Fld label="Sup. cubierta (m2)"><input type="number" placeholder="120" value={prop.sc} onChange={e=>s("sc",e.target.value)}/></Fld>
          <Fld label="Sup. semicubierta (m2)"><input type="number" placeholder="20" value={prop.ss||""} onChange={e=>s("ss",e.target.value)}/></Fld>
          <Fld label="Ano de construccion"><input type="number" placeholder="2000" value={prop.ano_const||""} onChange={e=>s("ano_const",e.target.value)}/></Fld>
        </div>
        <div className="g4">
          <Fld label="Ambientes"><input type="number" placeholder="3" value={prop.amb} onChange={e=>s("amb",e.target.value)}/></Fld>
          <Fld label="Dormitorios"><input type="number" placeholder="2" value={prop.dorm||""} onChange={e=>s("dorm",e.target.value)}/></Fld>
          <Fld label="Banos"><input type="number" placeholder="1" value={prop.ban} onChange={e=>s("ban",e.target.value)}/></Fld>
          <Fld label="Plantas"><select value={prop.plantas||"PB"} onChange={e=>s("plantas",e.target.value)}>{["PB","PB+PA","PB+2","Solo PA","3 o mas"].map(p=><option key={p}>{p}</option>)}</select></Fld>
        </div>
      </div>
      <div className="card">
        <div className="ct">Caracteristicas Tecnicas</div>
        <div className="g3" style={{marginBottom:12}}>
          <Fld label="Tipo de construccion"><select value={prop.tipo_const||"Mamposteria"} onChange={e=>s("tipo_const",e.target.value)}>{["Mamposteria","Steel Frame","Block","Madera","Prefabricada","Mixta"].map(t=><option key={t}>{t}</option>)}</select></Fld>
          <Fld label="Tipo de cubierta"><select value={prop.tipo_cubierta||""} onChange={e=>s("tipo_cubierta",e.target.value)}><option value="">—</option>{["Losa hormigon","Chapa prepintada","Chapa galvanizada","Teja ceramica","Teja francesa","Membrana asfaltica","Fibrocemento","Mixta"].map(t=><option key={t}>{t}</option>)}</select></Fld>
          <Fld label="Orientacion"><select value={prop.orientacion||""} onChange={e=>s("orientacion",e.target.value)}><option value="">—</option>{["Norte","Sur","Este","Oeste","Noreste","Noroeste","Sureste","Suroeste"].map(o=><option key={o}>{o}</option>)}</select></Fld>
        </div>
        <div className="g2" style={{marginBottom:12}}>
          <Fld label="Estado de conservacion"><select value={prop.est} onChange={e=>s("est",e.target.value)}>{["Muy bueno","Bueno","Regular","A refaccionar"].map(e=><option key={e}>{e}</option>)}</select></Fld>
          <Fld label="Titulo / Escritura"><select value={prop.escritura||""} onChange={e=>s("escritura",e.target.value)}><option value="">—</option>{["Escritura vigente","En tramite","Sin escritura","Sucesion","Boleto de compraventa"].map(t=><option key={t}>{t}</option>)}</select></Fld>
        </div>
        <div style={{marginBottom:10}}>
          <div className="fl"><label>Servicios disponibles</label></div>
          <div className="cb-row" style={{marginTop:6}}>
            {["Gas natural","Agua corriente","Cloaca","Pavimento","Internet fibra","Luz 220v","Gas envasado"].map(sv=>(
              <label key={sv} className="cb"><input type="checkbox" checked={(prop.servicios||[]).includes(sv)} onChange={()=>sArr("servicios",sv)}/>{sv}</label>
            ))}
          </div>
        </div>
        <div className="cb-row">
          {[["gar","Garaje/Cochera"],["pic","Piscina"],["lat","Esquina"],["dep_serv","Dependencia"],["baulera","Baulera"],["alquilada","Alquilada al tasar"]].map(([k,l])=>(
            <label key={k} className="cb"><input type="checkbox" checked={!!prop[k]} onChange={e=>s(k,e.target.checked)}/>{l}</label>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="ct">Ubicacion GPS</div>
        <div className="g3" style={{marginBottom:9}}>
          <Fld label="Latitud"><input placeholder="-33.0000" value={prop.lat||""} onChange={e=>s("lat",e.target.value)}/></Fld>
          <Fld label="Longitud"><input placeholder="-59.0000" value={prop.lng||""} onChange={e=>s("lng",e.target.value)}/></Fld>
          <div style={{display:"flex",alignItems:"flex-end"}}><button className="btn bh" style={{width:"100%"}} onClick={gps}>Detectar GPS</button></div>
        </div>
        {prop.lat&&prop.lng&&<div className="ok-box">Coordenadas registradas: {prop.lat}, {prop.lng} — <a href={"https://maps.google.com/?q="+prop.lat+","+prop.lng} target="_blank" rel="noreferrer" style={{color:"var(--tl)",fontSize:12}}>Ver en Google Maps</a></div>}
        <Fld label="Observaciones"><textarea placeholder="Entorno, vista, estado del barrio, novedades..." value={prop.obs||""} onChange={e=>s("obs",e.target.value)}/></Fld>
      </div>
      <div style={{textAlign:"center"}}><button className="btn bp" onClick={onNext}>Continuar con Fotos →</button></div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  TAB FOTOS + CHECKLIST ROSS-HEIDECKE
// ═══════════════════════════════════════════════════════════════════
const FOTO_CATS=["Frente","Lateral izq.","Lateral der.","Fondo","Sala/Living","Comedor","Cocina","Bano 1","Bano 2","Dormitorio 1","Dormitorio 2","Techo/Cubierta","Piso","Aberturas","Instalaciones"];

const COLORES_ESTADO={1:"#2E7D32",2:"#558B2F",3:"#F59E0B",4:"#F97316",5:"#B71C1C"};

function TabFotos({fotos,setFotos,checklist,setChecklist,estadoRoss,setEstadoRoss}){
  const ref=useRef(null);
  const [expandidos,setExpandidos]=useState({});
  const [analizando,setAnalizando]=useState(false);
  const [analisisIA,setAnalisisIA]=useState(null);
  const [errorIA,setErrorIA]=useState("");
  const toggleExp=id=>setExpandidos(e=>({...e,[id]:!e[id]}));

  const analizarFotos=async()=>{
    if(!fotos.length)return;
    setAnalizando(true);setAnalisisIA(null);setErrorIA("");
    try{
      const imgs=fotos.map(f=>({type:"image",source:{type:"base64",media_type:f.tipo||"image/jpeg",data:f.b64||f.preview.split(",")[1]}}));
      const instruccion = "Sos un perito tasador inmobiliario matriculado en Argentina con 20 anos de experiencia en Gualeguaychu." +
        " Analiza estas " + fotos.length + " foto(s) de la propiedad y determina el estado Ross-Heidecke (1 al 5)." +
        " Estados: 1=Nuevo/Excelente conservacion, 2=Estado normal, 3=Reparaciones superficiales, 4=Reparaciones grandes, 5=Irrecuperable." +
        " Responde SOLO con JSON valido sin markdown con estas claves:" +
        " estado (numero 1-5), confianza (alta/media/baja), razon (explicacion concreta de elementos visibles en las fotos)," +
        " materiales (objeto con estructura/cubierta/pisos/aberturas), observaciones (detalles relevantes para la tasacion).";
      const resp=await fetch("/api/anthropic",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-haiku-4-5-20251001",
          max_tokens:800,
          messages:[{role:"user",content:[...imgs,{type:"text",text:instruccion}]}]
        })
      });
      if(!resp.ok){
        const ed=await resp.json().catch(()=>({}));
        throw new Error((ed.error&&ed.error.message)||"HTTP "+resp.status);
      }
      const datos=await resp.json();
      const texto=datos.content.filter(b=>b.type==="text").map(b=>b.text).join("").trim();
      const match=texto.match(/\{[\s\S]*\}/);
      if(!match)throw new Error("Respuesta no valida de la IA");
      const resultado=JSON.parse(match[0]);
      if(!resultado.estado||resultado.estado<1||resultado.estado>5)throw new Error("Estado fuera de rango");
      setAnalisisIA(resultado);
    }catch(e){
      setErrorIA(e.message);
    }
    setAnalizando(false);
  };

  const agregar=e=>{
    const files=Array.from(e.target.files);
    let pend=files.length;if(!pend)return;
    const nuevas=[];
    files.forEach((f,i)=>{
      const r=new FileReader();
      r.onload=()=>{
        nuevas.push({id:uid(),preview:r.result,label:FOTO_CATS[fotos.length+i]||"Foto "+(fotos.length+i+1)});
        pend--;if(pend===0)setFotos(fs=>[...fs,...nuevas].slice(0,15));
      };
      r.readAsDataURL(f);
    });
    e.target.value="";
  };

  const setItem=(id,val)=>{
    const nuevo={...checklist,[id]:val};
    setChecklist(nuevo);
    const est=calcularEstadoRoss(nuevo);
    if(est)setEstadoRoss(est);
  };

  const completados=Object.values(checklist).filter(v=>v>0).length;
  const explicacion=completados>0?explicarEstado(checklist,estadoRoss||2):null;

  return(
    <div>
      <div className="card">
        <div className="ct">Registro Fotografico <span className="pill pt">hasta 15 fotos</span></div>
        <div className="inf">Subi fotos de todas las partes del inmueble. Aparecen en el informe PDF.</div>
        <div className={"ph-zone"+(fotos.length>0?" has":"")}>
          <input type="file" accept="image/*" multiple onChange={agregar} ref={ref}/>
          <div style={{fontSize:30,marginBottom:7,opacity:fotos.length>0?0.7:0.35}}>{fotos.length>0?"🖼️":"📷"}</div>
          <div style={{fontSize:14,fontWeight:600,color:"var(--nv)",marginBottom:2}}>{fotos.length>0?fotos.length+" foto"+(fotos.length>1?"s":"")+" cargada"+(fotos.length>1?"s":""):"Toca para subir fotos"}</div>
          <div style={{fontSize:12,color:"var(--md)"}}>{fotos.length>0?"Toca para agregar mas (max 15)":"JPG o PNG"}</div>
        </div>
        {fotos.length>0&&(
          <>
            <div className="ph-grid">{fotos.map(f=>(<div key={f.id} className="ph-th"><img src={f.preview} alt={f.label}/><div className="ph-lbl">{f.label}</div><button className="ph-rm" onClick={()=>setFotos(fs=>fs.filter(x=>x.id!==f.id))}>x</button></div>))}</div>
            <div className="brow">
              <button className="btn bp" onClick={analizarFotos} disabled={analizando}>
                {analizando
                  ?<><div className="spin"/>Analizando como perito tasador...</>
                  :"Analizar fotos con IA — Estado Ross-Heidecke"
                }
              </button>
              <button className="btn bd bsm" onClick={()=>{setFotos([]);setAnalisisIA(null);setErrorIA("");}}>Borrar fotos</button>
            </div>
          </>
        )}
        {analizando&&(
          <div style={{background:"rgba(26,92,120,.06)",borderRadius:9,padding:"12px 16px",marginTop:10,fontSize:13,color:"var(--md)",display:"flex",alignItems:"center",gap:8}}>
            <div className="spin"/>
            Claude analiza las {fotos.length} fotos como perito tasador matriculado...
          </div>
        )}
        {analisisIA&&!analizando&&(
          <div style={{background:"rgba(46,125,50,.06)",border:"1.5px solid rgba(46,125,50,.2)",borderRadius:10,padding:"14px 16px",marginTop:10}}>
            <div style={{fontSize:11,fontWeight:700,color:"var(--ok)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:8}}>Analisis IA completado</div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
              <div style={{width:50,height:50,borderRadius:10,background:COLORES_ESTADO[analisisIA.estado]||"var(--tl)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:"Cormorant Garamond,serif",fontSize:28,fontWeight:700,flexShrink:0}}>
                {analisisIA.estado}
              </div>
              <div>
                <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:17,fontWeight:600,color:"var(--nv)"}}>
                  {["","Nuevo / Excelente conservacion","Estado normal de conservacion","Necesita reparaciones superficiales","Necesita reparaciones grandes","Estado irrecuperable"][analisisIA.estado]||"Estado "+analisisIA.estado}
                </div>
                <div style={{fontSize:12,color:"var(--md)",marginTop:2}}>Confianza del analisis: <strong>{analisisIA.confianza}</strong></div>
              </div>
            </div>
            <div style={{fontSize:13,color:"var(--ik)",lineHeight:1.7,background:"rgba(26,92,120,.04)",borderRadius:8,padding:"10px 13px",marginBottom:10}}>
              <strong style={{color:"var(--nv)"}}>Por que este estado:</strong><br/>{analisisIA.razon}
            </div>
            {analisisIA.materiales&&(
              <div style={{fontSize:12.5,color:"var(--md)",lineHeight:1.7,marginBottom:8}}>
                <strong style={{color:"var(--nv)"}}>Materiales detectados:</strong>{" "}
                {[analisisIA.materiales.estructura&&("Estructura: "+analisisIA.materiales.estructura),
                  analisisIA.materiales.cubierta&&("Cubierta: "+analisisIA.materiales.cubierta),
                  analisisIA.materiales.pisos&&("Pisos: "+analisisIA.materiales.pisos),
                  analisisIA.materiales.aberturas&&("Aberturas: "+analisisIA.materiales.aberturas),
                ].filter(Boolean).join(" | ")}
              </div>
            )}
            {analisisIA.observaciones&&(
              <div style={{fontSize:12.5,color:"var(--md)",lineHeight:1.7,marginBottom:10}}>
                <strong style={{color:"var(--nv)"}}>Observaciones:</strong>{" "}{analisisIA.observaciones}
              </div>
            )}
            <div className="brow">
              <button className="btn bp bsm" onClick={()=>setEstadoRoss(analisisIA.estado)}>
                Aplicar Estado {analisisIA.estado} a la tasacion
              </button>
              <button className="btn bh bsm" onClick={()=>setAnalisisIA(null)}>Descartar</button>
            </div>
          </div>
        )}
        {errorIA&&(
          <div style={{background:"#FEF2F2",border:"1.5px solid #FECACA",borderRadius:9,padding:"12px 15px",marginTop:10,fontSize:13,color:"var(--er)"}}>
            Error: {errorIA}<br/>
            <span style={{fontSize:11.5,marginTop:4,display:"block",color:"var(--md)"}}>El analisis de fotos con IA funciona desde claude.ai. Para uso offline, usa el checklist de abajo.</span>
          </div>
        )}
      </div>

      <div className="card">
        <div className="ct">
          Checklist de Estado — Ross-Heidecke
          {completados>0&&<span className="pill pt">{completados}/8 completados</span>}
        </div>
        <div className="inf">
          <strong>Evalua cada aspecto de la propiedad</strong> mirando las fotos y la visita. La app calcula automaticamente en que estado Ross-Heidecke se encuentra y explica por que.
        </div>

        {CHECKLIST_ROSS.map(item=>{
          const valActual=checklist[item.id]||0;
          const color=valActual>0?COLORES_ESTADO[valActual]:"rgba(15,45,61,.3)";
          return(
            <div key={item.id} className="ck-item" style={{borderColor:valActual>0?color:"rgba(15,45,61,.09)"}}>
              <div className="ck-hdr" onClick={()=>toggleExp(item.id)}>
                <div>
                  <div className="ck-lbl">{item.label}</div>
                  <div className="ck-desc">{item.desc}</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  {valActual>0&&(
                    <div className="ck-badge" style={{background:color}}>
                      Estado {valActual}
                    </div>
                  )}
                  <span style={{fontSize:16,color:"var(--tl)",fontWeight:700}}>{expandidos[item.id]?"−":"+"}</span>
                </div>
              </div>
              {expandidos[item.id]&&(
                <div className="ck-opts">
                  {item.opts.map(opt=>(
                    <div key={opt.v} className={"ck-opt"+(valActual===opt.v?" sel":"")} onClick={()=>setItem(item.id,opt.v)}>
                      <div className="co-n" style={{color:COLORES_ESTADO[opt.v]}}>{opt.v}</div>
                      <div><div className="co-t">{opt.t}</div><div className="co-d">{opt.d}</div></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {estadoRoss&&completados>0&&(
          <div className="ross-result" style={{background:COLORES_ESTADO[estadoRoss]+"15",border:"2px solid "+COLORES_ESTADO[estadoRoss]}}>
            <div className="rr-l" style={{color:COLORES_ESTADO[estadoRoss]}}>Estado Ross-Heidecke calculado</div>
            <div className="rr-n" style={{color:COLORES_ESTADO[estadoRoss]}}>{estadoRoss}</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:600,color:"var(--nv)",marginBottom:6}}>
              {["","Nuevo / Excelente conservacion","Estado normal de conservacion","Necesita reparaciones superficiales","Necesita reparaciones grandes","Estado irrecuperable"][estadoRoss]}
            </div>
            {explicacion&&<div className="rr-exp" style={{color:"var(--ik)"}}>{explicacion}</div>}
            <div style={{fontSize:11,color:"var(--md)",marginTop:8,fontStyle:"italic"}}>Este estado se aplica automaticamente en el calculo de reposicion (tabla Ross-Heidecke).</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  TAB TERRENO
// ═══════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
//  SELECTOR DE ZONA POT — Desplegable por grupos
// ═══════════════════════════════════════════════════════════════════
function PotSelector({value,onChange}){
  const [abierto,setAbierto]=useState(false);
  const zonaSelec=value?ZONAS[value]:null;

  return(
    <div style={{position:"relative"}}>
      <button
        type="button"
        onClick={()=>setAbierto(!abierto)}
        style={{
          width:"100%",padding:"9px 11px",border:"1.5px solid rgba(15,45,61,.14)",
          borderRadius:8,fontFamily:"Outfit,sans-serif",fontSize:13.5,
          color:zonaSelec?"var(--nv)":"var(--lt)",background:"#fff",
          cursor:"pointer",textAlign:"left",display:"flex",
          justifyContent:"space-between",alignItems:"center",
        }}
      >
        <span>{zonaSelec?zonaSelec.n:"No aplica / No esta en GCU ciudad"}</span>
        <span style={{fontSize:16,color:"var(--tl)",fontWeight:700}}>{abierto?"−":"+"}</span>
      </button>

      {abierto&&(
        <div style={{
          position:"absolute",top:"calc(100% + 4px)",left:0,right:0,
          background:"#fff",border:"1.5px solid rgba(26,92,120,.2)",
          borderRadius:10,boxShadow:"0 8px 28px rgba(15,45,61,.18)",
          zIndex:999,maxHeight:400,overflowY:"auto",
        }}>
          {/* Opcion: no aplica */}
          <div
            onClick={()=>{onChange("");setAbierto(false);}}
            style={{
              padding:"10px 14px",cursor:"pointer",fontSize:13,
              color:"var(--md)",borderBottom:"1px solid rgba(15,45,61,.08)",
              background:!value?"rgba(26,92,120,.05)":"#fff",
              fontStyle:"italic",
            }}
          >
            No aplica / El terreno no esta en la planta urbana de Gualeguaychu
          </div>

          {GRUPOS_ZONA.map(grupo=>(
            <div key={grupo.l}>
              {/* Encabezado del grupo */}
              <div style={{
                padding:"7px 14px",fontSize:10.5,fontWeight:700,
                textTransform:"uppercase",letterSpacing:".8px",
                color:"#fff",background:grupo.col,
              }}>
                {grupo.l}
              </div>
              {/* Zonas del grupo */}
              {grupo.ids.map(id=>{
                const z=ZONAS[id];
                const sel=value===id;
                return(
                  <div
                    key={id}
                    onClick={()=>{onChange(id);setAbierto(false);}}
                    style={{
                      padding:"10px 14px",cursor:"pointer",
                      background:sel?"rgba(26,92,120,.07)":"#fff",
                      borderBottom:"1px solid rgba(15,45,61,.06)",
                      transition:"background .15s",
                    }}
                  >
                    <div style={{fontWeight:sel?700:600,fontSize:13,color:"var(--nv)",marginBottom:2}}>{z.n}</div>
                    <div style={{fontSize:11.5,color:"var(--md)",marginBottom:3}}>{z.d}</div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      <span style={{fontSize:10,background:"rgba(26,92,120,.09)",color:"var(--tl)",padding:"1px 7px",borderRadius:10,fontWeight:600}}>
                        USD {z.mn}–{z.mx}/m2
                      </span>
                      <span style={{fontSize:10,background:"rgba(184,137,42,.12)",color:"var(--rs)",padding:"1px 7px",borderRadius:10,fontWeight:600}}>
                        FOS {z.fos}
                      </span>
                      <span style={{fontSize:10,color:"var(--lt)",padding:"1px 0"}}>
                        Parcela min: {z.pm}m2 | Frente min: {z.fm}m
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Detalle de la zona seleccionada */}
      {zonaSelec&&(
        <div style={{
          marginTop:6,padding:"8px 11px",background:"rgba(26,92,120,.05)",
          borderRadius:7,fontSize:12,color:"var(--md)",lineHeight:1.5,
        }}>
          <strong style={{color:"var(--nv)"}}>{zonaSelec.n}</strong> — {zonaSelec.t}<br/>
          {zonaSelec.d}<br/>
          <span style={{fontSize:11,color:"var(--lt)"}}>
            Parcela min: {zonaSelec.pm}m2 | Frente min: {zonaSelec.fm}m | FOS: {zonaSelec.fos} | Coef. tasacion: x{zonaSelec.c.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}

function TabTerreno({result,setResult,tc}){
  const tcN=nv(tc);
  const mkComp=()=>({id:uid(),dom:"",fuente:"",sup:"",usdT:"",usdM2:""});

  // FICHA DEL TERRENO
  const [ficha,setFicha]=useState({
    dom:"",ciudad:"",provincia:"Entre Rios",zona:"",sup:"",frente:"",fondo:"",
    forma:"Regular",orientacion:"",esquina:false,
    gas:false,agua:false,cloaca:false,luz:false,pavimento:false,internet:false,
    anegable:false,calleImp:false,escritura:"",obs:"",uso_pot:"",
  });
  const sf=(k,v)=>setFicha(f=>({...f,[k]:v}));
  const sfa=(k)=>setFicha(f=>({...f,[k]:!f[k]}));

  // COMPARABLES
  const [comps,setComps]=useState([mkComp(),mkComp(),mkComp()]);
  const updC=(id,k,v)=>setComps(cs=>cs.map(c2=>{
    if(c2.id!==id)return c2;
    const u={...c2,[k]:v};
    if(k==="usdT"&&nv(u.sup))u.usdM2=(nv(v)/nv(u.sup)).toFixed(0);
    if(k==="sup"&&nv(u.usdT))u.usdM2=(nv(u.usdT)/nv(v)).toFixed(0);
    if(k==="usdM2"&&nv(u.sup))u.usdT=(nv(v)*nv(u.sup)).toFixed(0);
    return u;
  }));

  const INMOS_T=[
    {n:"Angelini",   url:"https://angelinipropiedades.com/propiedades/"},
    {n:"AN Neuwirt", url:"https://an-inmuebles.com/"},
    {n:"Fleitas",    url:"https://fleitaspropiedades.com.ar/"},
    {n:"ZonaProp Terrenos", url:"https://www.zonaprop.com.ar/terrenos-venta-gualeguaychu.html"},
    {n:"Argenprop Terrenos",url:"https://www.argenprop.com/terrenos/venta/gualeguaychu"},
    {n:"MercadoLibre",url:"https://inmuebles.mercadolibre.com.ar/terrenos/venta/gualeguaychu-entre-rios/"},
  ];

  const calcular=()=>{
    const validos=comps.filter(c2=>nv(c2.usdM2)>0&&nv(c2.sup)>0);
    if(!validos.length)return;
    const vals=validos.map(c2=>nv(c2.usdM2));
    const avg=vals.reduce((a,b)=>a+b,0)/vals.length;
    const sup=nv(ficha.sup)||0;
    // Ajustes por caracteristicas del lote
    let aj=1;
    if(ficha.esquina)aj+=0.15;
    if(ficha.calleImp)aj+=0.08;
    if(!ficha.gas)aj-=0.05;
    if(!ficha.cloaca)aj-=0.08;
    if(!ficha.pavimento)aj-=0.04;
    if(ficha.anegable)aj-=0.20;
    // Coeficientes de forma de parcela (metodologia de valuacion inmobiliaria)
    const COEF_FORMA={
      "Cuadrada":0.05,
      "Rectangular regular":0,
      "Rectangular frente angosto":-0.05,
      "En esquina":0.12,
      "En L":-0.08,
      "Irregular":-0.10,
      "Triangular":-0.15,
    };
    if(ficha.forma&&COEF_FORMA[ficha.forma]!==undefined)aj+=COEF_FORMA[ficha.forma];
    const m2adj=avg*aj;
    const usdT=m2adj*sup;
    const arsT=tcN>0?usdT*tcN:0;
    setResult({
      ficha,
      n:validos.length,avg,aj,m2adj,
      usdT,arsT,
      usdMin:Math.min(...vals)*sup*0.90,
      usdMax:Math.max(...vals)*sup*1.10,
      comparables:validos,
    });
  };

  const r=result;
  const serviciosActivos=[
    ficha.gas&&"Gas natural",ficha.agua&&"Agua corriente",ficha.cloaca&&"Cloaca",
    ficha.luz&&"Luz 220v",ficha.pavimento&&"Pavimento",ficha.internet&&"Internet",
  ].filter(Boolean);

  return(
    <div>
      {/* FICHA DEL TERRENO */}
      <div className="card">
        <div className="ct">Ficha del Terreno</div>
        <div className="inf"><strong>Completa los datos del terreno.</strong> Esta informacion aparece completa en el informe PDF y es la base para justificar el valor ante el propietario.</div>

        <div className="g3" style={{marginBottom:13}}>
          <Fld label="Domicilio / Referencia"><input placeholder="Av. Urquiza 1200" value={ficha.dom} onChange={e=>sf("dom",e.target.value)}/></Fld>
          <Fld label="Ciudad / Localidad"><input placeholder="Gualeguaychu" value={ficha.ciudad} onChange={e=>sf("ciudad",e.target.value)}/></Fld>
          <Fld label="Provincia"><input placeholder="Entre Rios" value={ficha.provincia} onChange={e=>sf("provincia",e.target.value)}/></Fld>
        </div>

        <div className="g3" style={{marginBottom:13}}>
          <Fld label="Barrio / Zona / Loteo"><input placeholder="Villa del Parque / Raices / Prados..." value={ficha.zona} onChange={e=>sf("zona",e.target.value)}/></Fld>
          <Fld label="Zona POT (si aplica)" hint="Solo para planta urbana de Gualeguaychu">
            <PotSelector value={ficha.uso_pot} onChange={v=>sf("uso_pot",v)}/>
          </Fld>
          <Fld label="Tipo de escritura / Titulo">
            <select value={ficha.escritura} onChange={e=>sf("escritura",e.target.value)}>
              <option value="">— Seleccionar —</option>
              {["Escritura vigente","En tramite","Sin escritura","Boleto de compraventa","Sucesion","Mensura aprobada"].map(t=><option key={t}>{t}</option>)}
            </select>
          </Fld>
        </div>

        <div className="g4" style={{marginBottom:13}}>
          <Fld label="Superficie total (m2)"><input type="number" placeholder="300" value={ficha.sup} onChange={e=>sf("sup",e.target.value)}/></Fld>
          <Fld label="Frente (ml)"><input type="number" placeholder="12" value={ficha.frente} onChange={e=>sf("frente",e.target.value)}/></Fld>
          <Fld label="Fondo (ml)"><input type="number" placeholder="25" value={ficha.fondo} onChange={e=>sf("fondo",e.target.value)}/></Fld>
          <Fld label="Forma de la parcela">
            <select value={ficha.forma} onChange={e=>sf("forma",e.target.value)}>
              <option value="">— Seleccionar forma —</option>
              <option value="Cuadrada">Cuadrada (+5%) — Forma ideal, maximo aprovechamiento</option>
              <option value="Rectangular regular">Rectangular regular (0%) — Estandar de mercado</option>
              <option value="Rectangular frente angosto">Rectangular frente angosto (-5%) — Frente menor a 8m</option>
              <option value="En esquina">En esquina (+12%) — Doble frente, dos accesos</option>
              <option value="En L">En L (-8%) — Parte no edificable, proyecto complejo</option>
              <option value="Irregular">Irregular (-10%) — Perdida de superficie util</option>
              <option value="Triangular">Triangular (-15%) — Gran perdida en vertices</option>
            </select>
          </Fld>
        </div>

        <div className="g2" style={{marginBottom:13}}>
          <Fld label="Orientacion principal">
            <select value={ficha.orientacion} onChange={e=>sf("orientacion",e.target.value)}>
              <option value="">— Seleccionar —</option>
              {["Norte","Sur","Este","Oeste","Noreste","Noroeste","Sureste","Suroeste"].map(o=><option key={o}>{o}</option>)}
            </select>
          </Fld>
          <Fld label="Uso / Destino posible">
            <select value={ficha.uso} onChange={e=>sf("uso",e.target.value)}>
              <option value="">— Seleccionar —</option>
              {["Residencial","Comercial","Industrial","Mixto","Agricola/Rural","Turistico","Countries/Loteo cerrado"].map(u=><option key={u}>{u}</option>)}
            </select>
          </Fld>
        </div>

        {/* SERVICIOS */}
        <div style={{marginBottom:13}}>
          <div className="fl"><label>Servicios disponibles en el terreno</label></div>
          <div className="cb-row" style={{marginTop:6}}>
            {[["gas","Gas natural"],["agua","Agua corriente"],["cloaca","Cloaca"],["luz","Luz 220v"],["pavimento","Pavimento"],["internet","Internet/Fibra"]].map(([k,l])=>(
              <label key={k} className="cb">
                <input type="checkbox" checked={!!ficha[k]} onChange={()=>sfa(k)}/>
                {l}
              </label>
            ))}
          </div>
          {serviciosActivos.length>0&&(
            <div className="ok-box" style={{marginTop:8}}>
              Servicios confirmados: <strong>{serviciosActivos.join(", ")}</strong>
            </div>
          )}
        </div>

        {/* CARACTERISTICAS ESPECIALES */}
        <div style={{marginBottom:13}}>
          <div className="fl"><label>Caracteristicas especiales</label></div>
          <div className="cb-row" style={{marginTop:6}}>
            <label className="cb"><input type="checkbox" checked={!!ficha.esquina} onChange={()=>sfa("esquina")}/>Terreno esquina (+15%)</label>
            <label className="cb"><input type="checkbox" checked={!!ficha.calleImp} onChange={()=>sfa("calleImp")}/>Frente a calle importante (+8%)</label>
            <label className="cb"><input type="checkbox" checked={!!ficha.anegable} onChange={()=>sfa("anegable")}/>Zona anegable/inundable (-20%)</label>
          </div>
        </div>

        <Fld label="Observaciones del terreno">
          <textarea placeholder="Detalles adicionales: vista, topografia, estado del entorno, acceso, colindantes, cualquier aspecto relevante para la tasacion..."
            value={ficha.obs} onChange={e=>sf("obs",e.target.value)}/>
        </Fld>

        {/* RESUMEN FICHA */}
        {ficha.sup&&(
          <div className="hl" style={{marginTop:12}}>
            <strong>{ficha.sup}m2</strong>
            {ficha.frente&&ficha.fondo&&<span> ({ficha.frente}m x {ficha.fondo}m)</span>}
            {ficha.forma&&<span> — {ficha.forma}</span>}
            {ficha.orientacion&&<span> — Orientacion {ficha.orientacion}</span>}
            {ficha.ciudad&&<span> — {ficha.ciudad}{ficha.zona?", "+ficha.zona:""}</span>}
            {serviciosActivos.length>0&&<span> — Servicios: {serviciosActivos.join(", ")}</span>}
          </div>
        )}
      </div>

      {/* COMPARABLES */}
      <div className="card">
        <div className="ct">Tasacion por Comparables de Terrenos</div>
        <div className="inf">
          <strong>Como funciona:</strong> Busca lotes con caracteristicas similares (misma zona, superficie parecida, mismos servicios) en estas fuentes. Carga el precio y la superficie de cada uno. La app calcula el USD/m2 promedio y lo ajusta segun las caracteristicas de tu terreno.
        </div>
        <div className="chips" style={{marginBottom:14}}>
          {INMOS_T.map(im=><a key={im.n} className="chip" href={im.url} target="_blank" rel="noreferrer">{im.n}</a>)}
        </div>

        <div style={{overflowX:"auto"}}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Direccion / Referencia</th>
                <th>Fuente</th>
                <th>Superficie m2</th>
                <th>Precio USD</th>
                <th>USD/m2</th>
                {tcN>0&&<th>En pesos</th>}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {comps.map(c2=>(
                <tr key={c2.id}>
                  <td><input value={c2.dom} onChange={e=>updC(c2.id,"dom",e.target.value)} placeholder="Calle 123 esq. Av. X"/></td>
                  <td>
                    <select value={c2.fuente} onChange={e=>updC(c2.id,"fuente",e.target.value)}>
                      <option value="">—</option>
                      {INMOS_T.map(im=><option key={im.n}>{im.n}</option>)}
                      <option>Particular</option>
                      <option>Escritura publica</option>
                      <option>Otro</option>
                    </select>
                  </td>
                  <td><input type="number" value={c2.sup} onChange={e=>updC(c2.id,"sup",e.target.value)} placeholder="300"/></td>
                  <td><input type="number" value={c2.usdT} onChange={e=>updC(c2.id,"usdT",e.target.value)} placeholder="15000"/></td>
                  <td style={{fontWeight:700,color:"var(--tl)",fontSize:12}}>
                    {nv(c2.usdM2)>0?"USD "+nv(c2.usdM2).toLocaleString("es-AR"):"—"}
                  </td>
                  {tcN>0&&<td style={{fontSize:11,color:"var(--lt)"}}>{nv(c2.usdT)>0?ars(nv(c2.usdT)*tcN):"—"}</td>}
                  <td><button className="btn bd bsm" onClick={()=>setComps(cs=>cs.filter(x=>x.id!==c2.id))}>x</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="brow">
          <button className="btn bh" onClick={()=>setComps(cs=>[...cs,mkComp()])}>+ Agregar comparable</button>
          <button className="btn bp" onClick={calcular}>Calcular valor del terreno</button>
        </div>

        {/* AJUSTES APLICADOS */}
        {r&&(
          <>
            <div className="dv"/>
            <div style={{fontSize:12,color:"var(--md)",marginBottom:8}}>
              <strong style={{color:"var(--nv)"}}>Ajustes aplicados a tu terreno:</strong>
              {[
                ficha.esquina&&" Esquina +15%",
                ficha.calleImp&&" Calle importante +8%",
                !ficha.gas&&" Sin gas -5%",
                !ficha.cloaca&&" Sin cloaca -8%",
                !ficha.pavimento&&" Sin pavimento -4%",
                ficha.anegable&&" Anegable -20%",
                ficha.forma&&ficha.forma!=="Rectangular regular"&&" Forma "+ficha.forma,
              ].filter(Boolean).join(" |") || " Ninguno (terreno estandar)"}
            </div>
            <CRow label={"Precio promedio USD/m2 bruto ("+r.n+" comparables)"} value={"USD "+r.avg.toFixed(0)+"/m2"}/>
            <CRow label={"Ajuste por caracteristicas del lote"} value={"x "+r.aj.toFixed(3)}/>
            <CRow label={"Precio USD/m2 ajustado"} value={"USD "+r.m2adj.toFixed(0)+"/m2"} sub/>
            <CRow label={"Superficie — "+r.ficha.sup+"m2"} value={"USD "+Math.round(r.usdT).toLocaleString("es-AR")} usdVal={tcN>0?ars(r.arsT):null} tot/>

            <div className="terr-res">
              <div className="tr-l">
                {r.ficha.ciudad||"Terreno"}{r.ficha.zona?", "+r.ficha.zona:""} — {r.ficha.sup}m2
                {r.ficha.orientacion?" — "+r.ficha.orientacion:""}
              </div>
              <div className="tr-v">USD {Math.round(r.usdT).toLocaleString("es-AR")}</div>
              {tcN>0&&<div className="tr-u">{ars(r.arsT)} — TC $ {tcN.toLocaleString("es-AR")}</div>}
              <div className="tr-r">
                USD {r.m2adj.toFixed(0)}/m2 ajustado — Rango: USD {Math.round(r.usdMin).toLocaleString("es-AR")} — USD {Math.round(r.usdMax).toLocaleString("es-AR")}
              </div>
            </div>

            {/* ARGUMENTO PARA EL PROPIETARIO */}
            <div style={{background:"rgba(184,137,42,.08)",borderRadius:9,padding:"12px 15px",marginTop:12}}>
              <div style={{fontSize:11,fontWeight:700,color:"var(--rs)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:6}}>Argumento para el propietario</div>
              <p style={{fontSize:13,color:"var(--ik)",lineHeight:1.75,fontStyle:"italic"}}>
                "Para determinar el valor de su terreno de {r.ficha.sup}m2
                {r.ficha.orientacion?" con orientacion "+r.ficha.orientacion:""} en
                {r.ficha.zona?" "+r.ficha.zona+",":""} {r.ficha.ciudad||"Gualeguaychu"},
                analice {r.n} terrenos comparables en la misma zona que se encuentran en venta actualmente.
                El precio promedio de mercado es de USD {r.avg.toFixed(0)}/m2.
                {r.aj!==1?" Ajustando por las caracteristicas especificas de este lote ("+serviciosActivos.join(", ")+(ficha.esquina?", esquina":"")+(ficha.anegable?", zona anegable":"")+"), el precio justo por metro cuadrado es USD "+r.m2adj.toFixed(0)+".":""}
                Por lo tanto, el valor del terreno es de USD {Math.round(r.usdT).toLocaleString("es-AR")}.
                Este es el valor que el mercado de {r.ficha.ciudad||"la zona"} paga hoy por un lote con estas caracteristicas."
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
//  TAB COMPARABLES
// ═══════════════════════════════════════════════════════════════════
function TabComp({prop,result,setResult,tc}){
  const mkRow=()=>({id:uid(),dom:"",fuente:"",sc:"",usdT:"",usdM2:"",obs:""});
  const [rows,setRows]=useState([mkRow()]);
  const tcN=nv(tc);

  const upd=(id,k,v)=>setRows(rs=>rs.map(r=>{
    if(r.id!==id)return r;
    const u={...r,[k]:v};
    if(k==="usdT"&&nv(u.sc))u.usdM2=(nv(v)/nv(u.sc)).toFixed(0);
    if(k==="sc"&&nv(u.usdT))u.usdM2=(nv(u.usdT)/nv(v)).toFixed(0);
    if(k==="usdM2"&&nv(u.sc))u.usdT=(nv(v)*nv(u.sc)).toFixed(0);
    return u;
  }));

  const calcular=useCallback(()=>{
    const v=rows.filter(r=>nv(r.usdM2)>0&&nv(r.sc)>0);
    if(!v.length)return;
    const zona=ZONAS[prop.zona_id];
    const coef=zona?zona.c:1;
    const avg=v.reduce((s,r)=>s+nv(r.usdM2),0)/v.length;
    const scProp=nv(prop.sc)||120;
    const coefHom=coefSup(scProp);
    let aj=1;
    if(prop.gar)aj+=0.03;if(prop.pic)aj+=0.05;if(prop.lat)aj+=0.02;if(prop.dep_serv)aj+=0.02;
    if(prop.est==="Muy bueno")aj+=0.04;if(prop.est==="Regular")aj-=0.06;if(prop.est==="A refaccionar")aj-=0.14;
    const m2f=avg*coef*coefHom*aj;
    const usdT=m2f*scProp;
    setResult({usdTotal:usdT,arsTotal:tcN>0?usdT*tcN:0,usdM2:m2f,avgBruto:avg,min:usdT*.90,max:usdT*1.10,n:v.length,coef,coefHom,aj,usdMin:Math.min(...v.map(r=>nv(r.usdM2)))*scProp,usdMax:Math.max(...v.map(r=>nv(r.usdM2)))*scProp});
  },[rows,prop,tcN,setResult]);

  const zona=ZONAS[prop.zona_id];const r=result;
  return(
    <div>
      <div className="card">
        <div className="ct">Comparables de Mercado</div>
        <Guia tipo="comparables"/>
        <p style={{fontSize:12.5,color:"var(--md)",marginBottom:7}}>Busca propiedades similares. <strong style={{color:"var(--nv)"}}>Todos los precios en USD.</strong></p>
        <div className="chips">{INMOS.map(im=><a key={im.n} className="chip" href={im.url} target="_blank" rel="noreferrer">{im.n}</a>)}</div>
        {zona&&<div className="hl" style={{marginTop:11}}><strong>Zona {zona.n}</strong> — Coef. POT: x{zona.c.toFixed(2)} | Coef. homogeneizacion ({nv(prop.sc)||120}m2): x{coefSup(nv(prop.sc)||120).toFixed(3)}</div>}
        <div style={{overflowX:"auto",marginTop:12}}>
          <table className="tbl">
            <thead><tr><th>Direccion</th><th>Fuente</th><th>m2 cub.</th><th>Precio USD</th><th>USD/m2</th>{tcN>0&&<th>ARS</th>}<th>Obs.</th><th></th></tr></thead>
            <tbody>
              {rows.map(r2=>(<tr key={r2.id}>
                <td><input value={r2.dom} onChange={e=>upd(r2.id,"dom",e.target.value)} placeholder="Mitre 234"/></td>
                <td><select value={r2.fuente} onChange={e=>upd(r2.id,"fuente",e.target.value)}><option value="">—</option>{INMOS.map(im=><option key={im.n}>{im.n}</option>)}<option>Particular</option><option>Escritura</option><option>Otro</option></select></td>
                <td><input type="number" value={r2.sc} onChange={e=>upd(r2.id,"sc",e.target.value)} placeholder="120"/></td>
                <td><input type="number" value={r2.usdT} onChange={e=>upd(r2.id,"usdT",e.target.value)} placeholder="35000"/></td>
                <td style={{fontWeight:700,color:"var(--tl)"}}>{nv(r2.usdM2)>0?"USD "+nv(r2.usdM2).toLocaleString("es-AR"):"—"}</td>
                {tcN>0&&<td style={{fontSize:11,color:"var(--lt)"}}>{nv(r2.usdT)>0?ars(nv(r2.usdT)*tcN):"—"}</td>}
                <td><input value={r2.obs||""} onChange={e=>upd(r2.id,"obs",e.target.value)} placeholder="Obs."/></td>
                <td><button className="btn bd bsm" onClick={()=>setRows(cs=>cs.filter(x=>x.id!==r2.id))}>x</button></td>
              </tr>))}
            </tbody>
          </table>
        </div>
        <div className="brow">
          <button className="btn bh" onClick={()=>setRows(cs=>[...cs,mkRow()])}>+ Comparable</button>
          <button className="btn bp" onClick={calcular}>Calcular por comparables</button>
        </div>
        {r&&(<><div className="dv"/>
          <CRow label={"Promedio USD/m2 bruto ("+r.n+" comparables)"} value={"USD "+r.avgBruto.toFixed(0)+"/m2"}/>
          <CRow label={"Coef. zona POT x "+r.coef.toFixed(2)} value={"USD "+(r.avgBruto*r.coef).toFixed(0)+"/m2"}/>
          <CRow label={"Coef. homogeneizacion superficie x "+r.coefHom.toFixed(3)} value={"USD "+(r.avgBruto*r.coef*r.coefHom).toFixed(0)+"/m2"}/>
          <CRow label={"Ajuste caracteristicas x "+r.aj.toFixed(3)} value={"USD "+r.usdM2.toFixed(0)+"/m2"}/>
          <CRow label="VALOR POR COMPARABLES" value={"USD "+Math.round(r.usdTotal).toLocaleString("es-AR")} usdVal={tcN>0?ars(r.arsTotal):null} tot/>
          <div className="rb" style={{marginTop:11}}>
            <div className="rb-in">
              <div className="rl">Comparables — {r.n} propiedades</div>
              <div className="rv">USD {Math.round(r.usdTotal).toLocaleString("es-AR")}</div>
              {tcN>0&&<div className="rm">{ars(r.arsTotal)}</div>}
              <div className="rr">Rango: USD {Math.round(r.usdMin).toLocaleString("es-AR")} — USD {Math.round(r.usdMax).toLocaleString("es-AR")}</div>
            </div>
          </div>
        </>)}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  TAB CAPITALIZACIÓN
// ═══════════════════════════════════════════════════════════════════
function TabCap({prop,result,setResult,tc}){
  const [d,setD]=useState({alqUsd:"",tasa:"8",vac:"5"});
  const s=(k,v)=>setD(x=>({...x,[k]:v}));
  const tcN=nv(tc);
  const calcular=()=>{
   if(!alq)return;
    
   const tasa=d.tasa?nv(d.tasa)/100:0.08;
const bruto=alq*12,vacM=bruto*vac,neto=bruto-vacM,val=neto/tasa;
    setResult({alqUsd:alq,tasa,vac,bruto,vacM,neto,val,arsVal:tcN>0?val*tcN:0,m2:val/(nv(prop.sc)||1)});
  };
  const r=result;
  return(
    <div>
      <div className="card">
        <div className="ct">Capitalizacion de Rentas</div>
        <Guia tipo="capitalizacion"/>
        <div className="inf"><strong>Tasa tipica GCU:</strong> 6% a 10% anual. Consulta alquileres en USD en Fleitas, Neuwirt y Angelini.</div>
      <div className="g3" style={{marginBottom:12}}>
<Fld label="Tipo de propiedad" hint="Selecciona para ajustar tasas automaticamente">
<select value={d.tipoCap||"vivienda_estandar"} onChange={e=>s("tipoCap",e.target.value)} style={{width:"100%",padding:"8px",borderRadius:"6px",border:"1px solid #ccc",fontSize:"14px"}}>
<option value="vivienda_estandar">Vivienda estandar</option>
<option value="vivienda_premium">Vivienda premium / Centro</option>
<option value="local_comercial">Local comercial</option>
<option value="galpon_industrial">Galpon zona industrial</option>
<option value="galpon_periferia">Galpon zona periferica</option>
</select></Fld>
<Fld label="Alquiler mensual (USD)" hint="Fuente: inmobiliarias locales"><input type="number" value={d.alqUsd} onChange={e=>s("alqUsd",e.target.value)} placeholder="500"/></Fld>
<Fld label="Vacancia (%)" hint="Tiempo sin inquilino. GCU: 5-10%"><input type="number" value={d.vac} onChange={e=>s("vac",e.target.value)} placeholder="5"/></Fld>
          <Fld label="Vacancia (%)"><input type="number" value={d.vac} onChange={e=>s("vac",e.target.value)} placeholder="5"/></Fld>
        </div>
        <button className="btn bp" onClick={calcular}>Calcular por capitalizacion</button>
      </div>
      {r&&(<div className="card">
        <div className="ct">Resultado — Capitalizacion</div>
        <CRow label="Alquiler mensual" value={"USD "+Math.round(r.alqUsd)} usdVal={tcN>0?ars(r.alqUsd*tcN)+"/mes":null}/>
        <CRow label="Ingreso anual bruto" value={"USD "+Math.round(r.bruto)}/>
        <CRow label={"Vacancia ("+(r.vac*100).toFixed(0)+"%)"} value={"- USD "+Math.round(r.vacM)} neg/>
        <CRow label="Ingreso anual neto" value={"USD "+Math.round(r.neto)} sub/>
        <CRow label="Tasa de capitalizacion" value={(r.tasa*100).toFixed(1)+"%"}/>
        <CRow label="VALOR POR CAPITALIZACION" value={"USD "+Math.round(r.val).toLocaleString("es-AR")} usdVal={tcN>0?ars(r.arsVal):null} tot/>
       <CRow l="Tasa 6% — Premium/Centro alta demanda" value={"USD "+Math.round(r.neto/0.06).toLocaleString("es-AR")} usdVal={tcN>0?Math.round(r.neto/0.06):null} tot/>
<CRow l="Tasa 7% — Buena zona consolidada" value={"USD "+Math.round(r.neto/0.07).toLocaleString("es-AR")} usdVal={tcN>0?Math.round(r.neto/0.07):null} tot/>
<CRow l="Tasa 8% — Estandar zona media" value={"USD "+Math.round(r.neto/0.08).toLocaleString("es-AR")} usdVal={tcN>0?Math.round(r.neto/0.08):null} tot/>
<CRow l="Tasa 9% — Menor demanda/Periferia" value={"USD "+Math.round(r.neto/0.09).toLocaleString("es-AR")} usdVal={tcN>0?Math.round(r.neto/0.09):null} tot/>
<CRow l="PROMEDIO SUGERIDO (6 a 9%)" value={"USD "+Math.round((r.neto/0.06+r.neto/0.07+r.neto/0.08+r.neto/0.09)/4).toLocaleString("es-AR")} usdVal={tcN>0?Math.round((r.neto/0.06+r.neto/0.07+r.neto/0.08+r.neto/0.09)/4):null} tot/>
        <div className="rb" style={{marginTop:11}}>
          <div className="rb-in">
            <div className="rl">Capitalizacion — tasa {(r.tasa*100).toFixed(1)}%</div>
            <div className="rv">USD {Math.round(r.val).toLocaleString("es-AR")}</div>
            {tcN>0&&<div className="rm">{ars(r.arsVal)}</div>}
            <div className="rm">Rentabilidad bruta: {((r.bruto/r.val)*100).toFixed(1)}% anual</div>
          </div>
        </div>
      </div>)}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  TAB REPOSICIÓN
// ═══════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
//  TABLA DE REFERENCIAS DE COSTO DE CONSTRUCCION
//  Fuentes: CAPER (Colegio Arquitectos Entre Rios), CAC, datos GCU 2026
// ═══════════════════════════════════════════════════════════════════
function TablaCostos({tc}){
  const [abierta,setAbierta]=useState(false);
  const tcN=nv(tc);

  // Datos reales — actualizar mensualmente
  // Fuente CAPER (Colegio Arquitectos Pcia. Entre Rios) — abril 2026
  // Fuente CAC (Camara Argentina de la Construccion) — abril 2026
  const REFS=[
    {
      fuente:"CAPER — Colegio de Arquitectos de Entre Rios",
      url:"https://www.colegioarquitectos.org.ar/category/costo-m2/",
      actualizado:"Abril 2026",
      datos:[
        {label:"Costo directo m2 (mat. + mano de obra + equipos)",pesos:1142529,nota:"Sin honorarios, impuestos ni beneficio"},
        {label:"Precio total m2 vivienda urbana tipo",pesos:1728075,nota:"Incluye todos los gastos. Referencia oficial Entre Rios"},
      ],
      descripcion:"Es la fuente MAS CONFIABLE para Entre Rios. Publicado mensualmente por el Colegio de Arquitectos de la Provincia.",
    },
    {
      fuente:"CAC — Camara Argentina de la Construccion",
      url:"https://www.camarco.org.ar/indicadores/indicadores-de-costos/",
      actualizado:"Abril 2026",
      datos:[
        {label:"Variacion mensual CAC — Materiales",pct:1.1,nota:"Variacion respecto al mes anterior"},
        {label:"Variacion mensual CAC — Mano de obra",pct:1.7,nota:"Acuerdo UOCRA vigente"},
      ],
      descripcion:"El indice CAC mide variaciones del costo de construccion. No es un precio por m2, sino un porcentaje de variacion mensual para actualizar presupuestos.",
    },
    {
      fuente:"Referencia GCU — Corralones locales (2026)",
      url:"https://www.ropelato.com.ar/",
      actualizado:"Abril 2026",
      datos:[
        {label:"Vivienda economica (obra negra + terminaciones basicas)",usd:250,nota:"Ropelato, CdO, Prodema"},
        {label:"Vivienda estandar / media (buena calidad)",usd:370,nota:"Materiales de zona"},
        {label:"Vivienda buena calidad (buen nivel terminaciones)",usd:530,nota:"Porcelanatos, DVH, buenas aberturas"},
        {label:"Vivienda premium (alta gama)",usd:800,nota:"Materiales importados, arquitectura"},
      ],
      descripcion:"Valores de referencia para Gualeguaychu basados en cotizaciones de Ropelato (Primera Junta 1701), Construcciones del Oeste (Artigas 2450) y Prodema (Bv. Montana 1276).",
    },
    {
      fuente:"Maestros mayores de obra — GCU (referencia 2026)",
      url:"",
      actualizado:"Abril 2026",
      datos:[
        {label:"Mano de obra sola (sin materiales) — por m2",usd:120,nota:"Oficial albanil GCU"},
        {label:"Direccion tecnica / Maestro mayor de obra",pct:8,nota:"Sobre el costo total de la obra"},
        {label:"Honorarios arquitecto (proyecto + direccion)",pct:12,nota:"Sobre el presupuesto total"},
      ],
      descripcion:"Valores orientativos de mano de obra en Gualeguaychu. La mano de obra representa aprox. el 40-45% del costo directo total de una vivienda.",
    },
  ];

  return(
    <div style={{marginBottom:14}}>
      <button
        type="button"
        onClick={()=>setAbierta(!abierta)}
        style={{
          width:"100%",background:"rgba(26,92,120,.06)",border:"1.5px solid rgba(26,92,120,.2)",
          borderRadius:abierta?"10px 10px 0 0":"10px",padding:"11px 15px",cursor:"pointer",
          display:"flex",justifyContent:"space-between",alignItems:"center",
          fontFamily:"Outfit,sans-serif",marginBottom:0,
        }}
      >
        <div style={{textAlign:"left"}}>
          <div style={{fontSize:13,fontWeight:600,color:"var(--nv)"}}>
            Referencias de Costo de Construccion — Entre Rios 2026
          </div>
          <div style={{fontSize:11.5,color:"var(--md)",marginTop:2}}>
            CAPER, CAC, Corralones GCU, Maestros de obra — Toca para ver
          </div>
        </div>
        <span style={{fontSize:18,color:"var(--tl)",fontWeight:700,marginLeft:12}}>{abierta?"−":"+"}</span>
      </button>

      {abierta&&(
        <div style={{
          border:"1.5px solid rgba(26,92,120,.2)",borderTop:"none",
          borderRadius:"0 0 10px 10px",background:"#fff",
          padding:"14px 16px",marginBottom:0,
        }}>
          {REFS.map((ref,ri)=>(
            <div key={ri} style={{marginBottom:ri<REFS.length-1?16:0,paddingBottom:ri<REFS.length-1?16:0,borderBottom:ri<REFS.length-1?"1px dashed rgba(15,45,61,.1)":"none"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5,gap:8}}>
                <div>
                  <div style={{fontSize:12.5,fontWeight:700,color:"var(--nv)"}}>{ref.fuente}</div>
                  <div style={{fontSize:11,color:"var(--lt)"}}>Actualizado: {ref.actualizado}</div>
                </div>
                {ref.url&&(
                  <a href={ref.url} target="_blank" rel="noreferrer"
                    style={{fontSize:11,color:"var(--tl)",fontWeight:500,textDecoration:"none",whiteSpace:"nowrap"}}>
                    Ver fuente
                  </a>
                )}
              </div>
              <div style={{fontSize:12,color:"var(--md)",lineHeight:1.55,marginBottom:8,
                background:"rgba(26,92,120,.04)",borderRadius:6,padding:"6px 9px"}}>
                {ref.descripcion}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr",gap:4}}>
                {ref.datos.map((d2,di)=>(
                  <div key={di} style={{
                    display:"flex",justifyContent:"space-between",alignItems:"center",
                    padding:"6px 9px",background:"rgba(15,45,61,.03)",borderRadius:6,
                    fontSize:12.5,gap:8,flexWrap:"wrap",
                  }}>
                    <span style={{color:"var(--md)",flex:1}}>{d2.label}</span>
                    <div style={{textAlign:"right"}}>
                      {d2.pesos&&(
                        <div style={{fontWeight:700,color:"var(--nv)"}}>
                          $ {Math.round(d2.pesos).toLocaleString("es-AR")}
                          {tcN>0&&<span style={{fontSize:10.5,color:"var(--lt)",marginLeft:6}}>
                            USD {(d2.pesos/tcN).toFixed(0)}
                          </span>}
                        </div>
                      )}
                      {d2.usd&&(
                        <div style={{fontWeight:700,color:"var(--nv)"}}>
                          USD {d2.usd}
                          {tcN>0&&<span style={{fontSize:10.5,color:"var(--lt)",marginLeft:6}}>
                            = {ars(d2.usd*tcN)}
                          </span>}
                        </div>
                      )}
                      {d2.pct&&(
                        <div style={{fontWeight:700,color:"var(--tl)"}}>
                          {d2.pct}%
                        </div>
                      )}
                      {d2.nota&&<div style={{fontSize:10.5,color:"var(--lt)"}}>{d2.nota}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{marginTop:12,padding:"9px 11px",background:"rgba(184,137,42,.07)",borderRadius:7,fontSize:12,color:"var(--md)",lineHeight:1.6}}>
            <strong style={{color:"var(--rs)"}}>Como usar estos datos:</strong> Los valores del CAPER son los mas representativos para Entre Rios.
            El costo directo ($1.142.529) es lo que cuesta la obra sola. El precio total ($1.728.075) incluye honorarios, impuestos y beneficio del constructor.
            Para la tasacion, usa el <strong style={{color:"var(--nv)"}}>precio total</strong> ya que representa el costo real de reposicion que pagaria el propietario.
            Actualiza estos valores consultando el sitio del CAPER o llamando a los corralones locales.
          </div>
        </div>
      )}
    </div>
  );
}

function TabRep({prop,result,setResult,rTerreno,tc,estadoRoss}){
  const [d,setD]=useState({tipo_c:"Mamposteria",cal:"Media",sc:prop.sc||"",ss:prop.ss||"",ant_c:prop.ant||"",gi:"15"});
  const [vtUsd,setVtUsd]=useState("");
  const s=(k,v)=>setD(x=>({...x,[k]:v}));
  const tcN=nv(tc);
  const coefZ=(ZONAS[prop.zona_id]&&ZONAS[prop.zona_id].c)||1;
  const costoBase=COSTOS_M2_USD[d.cal]||340;
  const costoAdj=costoBase*coefZ;
  const vidaUtil=VIDA_UTIL[d.tipo_c]||80;
  const ant=nv(d.ant_c);
  const vidaPct=Math.min(99,Math.round((ant/vidaUtil)*100));
  const estUsado=estadoRoss||2;
  const depPct=getRoss(vidaPct,estUsado);
  const vtDefault=rTerreno?Math.round(rTerreno.usdT):0;
  const zona=ZONAS[prop.zona_id];

  const calcular=()=>{
    const sc=nv(d.sc),ss=nv(d.ss)||0,vt=nv(vtUsd)||vtDefault;
    if(!sc)return;
    const gi=nv(d.gi)/100;
    const cc=sc*costoAdj,cs=ss*costoAdj*.5,sub=cc+cs;
    const gastos=sub*gi,vNuevo=sub+gastos,depMonto=vNuevo*(depPct/100),vObra=vNuevo*(1-depPct/100);
    const total=vObra+vt,arsTotal=tcN>0?total*tcN:0;
    setResult({sc,ss,vtUsd:vt,costoM2Usd:costoAdj,cc,cs,sub,gastos,vNuevo,depPct,depMonto,vObra,total,arsTotal,m2Usd:sc>0?total/sc:0,vidaUtil,vidaConsumidaPct:vidaPct,estadoUsado:estUsado,ant});
  };
  const r=result;
  return(
    <div>
      <div className="card">
        <div className="ct">Metodo de Reposicion — Ross-Heidecke</div>
        <Guia tipo="reposicion"/>
        {/* TABLA DE REFERENCIAS DE COSTO — FUENTES REALES */}
        <TablaCostos tc={tcN}/>

        <div className="g2" style={{marginBottom:12}}>
          <Fld label="Tipo de construccion"><select value={d.tipo_c} onChange={e=>s("tipo_c",e.target.value)}>{Object.keys(VIDA_UTIL).map(t=><option key={t}>{t}</option>)}</select></Fld>
          <Fld label="Calidad"><select value={d.cal} onChange={e=>s("cal",e.target.value)}>{["Economica","Media","Buena","Premium"].map(c=><option key={c}>{c}</option>)}</select></Fld>
        </div>
        <div className="costo-ref">
          <strong>Costo base:</strong>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:700,color:"var(--rs)",marginLeft:5}}>USD {costoBase}/m2</span>
          {zona&&<span style={{fontSize:11,color:"var(--md)",marginLeft:5}}>x {coefZ.toFixed(2)} zona = <strong style={{color:"var(--tl)"}}>USD {costoAdj.toFixed(0)}/m2</strong></span>}
          {tcN>0&&<span style={{fontSize:10.5,color:"var(--lt)",marginLeft:5}}>= {ars(costoAdj*tcN)}/m2</span>}
        </div>
        <div className="g4" style={{marginBottom:12}}>
          <Fld label="Sup. cubierta (m2)"><input type="number" value={d.sc} onChange={e=>s("sc",e.target.value)} placeholder="120"/></Fld>
          <Fld label="Semicubierta (m2)" hint="Al 50%"><input type="number" value={d.ss} onChange={e=>s("ss",e.target.value)} placeholder="20"/></Fld>
          <Fld label="Antiguedad (anos)"><input type="number" value={d.ant_c} onChange={e=>s("ant_c",e.target.value)} placeholder="15"/></Fld>
          <Fld label="Gastos indirectos (%)"><input type="number" value={d.gi} onChange={e=>s("gi",e.target.value)} placeholder="15"/></Fld>
        </div>
        {ant>0&&(
          <div className="hl" style={{marginBottom:12}}>
            <strong>Ross-Heidecke:</strong> Vida util {d.tipo_c}: {vidaUtil} anos | {ant} anos / {vidaUtil} = <strong>{vidaPct}% vida consumida</strong><br/>
            Estado: <strong>{estUsado}</strong> (evaluado en tab Fotos) | Depreciacion: <strong style={{color:"var(--er)",fontSize:15}}>{depPct.toFixed(2)}%</strong>
          </div>
        )}
        <div className="g2" style={{marginBottom:12}}>
          <Fld label="Valor del terreno (USD)" hint={rTerreno?"Del modulo Terreno: USD "+Math.round(vtDefault).toLocaleString("es-AR"):"Usar tab Terreno o ingresar"}>
            <input type="number" value={vtUsd||(vtDefault?String(vtDefault):"")} onChange={e=>setVtUsd(e.target.value)} placeholder={vtDefault?String(vtDefault):"8000"}/>
          </Fld>
        </div>
        <button className="btn bp" onClick={calcular}>Calcular por reposicion</button>
      </div>
      {r&&(<div className="card">
        <div className="ct">Resultado — Reposicion</div>
        <CRow label={"Costo m2 ajustado"} value={"USD "+r.costoM2Usd.toFixed(0)+"/m2"} usdVal={tcN>0?ars(r.costoM2Usd*tcN)+"/m2":null}/>
        <CRow label={"Sup. cubierta "+r.sc+"m2"} value={"USD "+Math.round(r.cc).toLocaleString("es-AR")}/>
        {r.ss>0&&<CRow label={"Semicubierta "+r.ss+"m2 x50%"} value={"USD "+Math.round(r.cs).toLocaleString("es-AR")}/>}
        <CRow label={"Gastos indirectos ("+d.gi+"%)"} value={"USD "+Math.round(r.gastos).toLocaleString("es-AR")}/>
        <CRow label="Valor de reposicion a nuevo" value={"USD "+Math.round(r.vNuevo).toLocaleString("es-AR")} usdVal={tcN>0?ars(r.vNuevo*tcN):null} sub/>
        <CRow label={"Depreciacion Ross-Heidecke "+r.depPct.toFixed(2)+"% (fila "+r.vidaConsumidaPct+"%, Est."+r.estadoUsado+")"} value={"- USD "+Math.round(r.depMonto).toLocaleString("es-AR")} neg/>
        <CRow label={"Valor obra depreciada ("+(100-r.depPct).toFixed(1)+"%)"} value={"USD "+Math.round(r.vObra).toLocaleString("es-AR")} usdVal={tcN>0?ars(r.vObra*tcN):null} sub/>
        {r.vtUsd>0&&<CRow label="Valor del terreno" value={"USD "+Math.round(r.vtUsd).toLocaleString("es-AR")} usdVal={tcN>0?ars(r.vtUsd*tcN):null} pos/>}
        <CRow label="VALOR POR REPOSICION" value={"USD "+Math.round(r.total).toLocaleString("es-AR")} usdVal={tcN>0?ars(r.arsTotal):null} tot/>
        <div className="rb" style={{marginTop:11}}>
          <div className="rb-in">
            <div className="rl">Reposicion — {r.ant} anos — Estado {r.estadoUsado} — {r.depPct.toFixed(1)}% deprec.</div>
            <div className="rv">USD {Math.round(r.total).toLocaleString("es-AR")}</div>
            {tcN>0&&<div className="rm">{ars(r.arsTotal)}</div>}
            <div className="rm">USD {r.m2Usd.toFixed(0)}/m2</div>
          </div>
        </div>
      </div>)}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  INFORME PDF
// ═══════════════════════════════════════════════════════════════════
function generarPDF({tasador,prop,rComp,rCap,rRep,rTerreno,tc,estadoRoss,promUsd,fotos,nroInf,checklist}){
  const z=ZONAS[prop.zona_id];const tcN=nv(tc);
  const arsFmt=v=>v&&tcN?"$ "+Math.round(v*tcN).toLocaleString("es-AR"):"";
  const fpts=fotos.slice(0,4);
  const metodos=[rComp&&{n:"Comparables",v:rComp.usdTotal},rCap&&{n:"Capitalizacion",v:rCap.val},rRep&&{n:"Reposicion",v:rRep.total}].filter(Boolean);
  const explicacionRoss=estadoRoss&&Object.values(checklist||{}).some(v=>v>0)?explicarEstado(checklist||{},estadoRoss):null;

  const estilos=[
    "@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@400;500;600&display=swap');",
    "*{box-sizing:border-box;margin:0;padding:0}",
    "body{font-family:'Outfit',sans-serif;color:#1A1A1A;background:#fff;padding:28px 36px;max-width:800px;margin:0 auto;font-size:13px}",
    "@media print{body{padding:12px 18px}@page{margin:10mm}}",
    "h1{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;color:#0F2D3D}",
    "h2{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:600;color:#0F2D3D;margin:18px 0 8px;border-bottom:2px solid #B8892A;padding-bottom:5px}",
    ".hdr{background:linear-gradient(135deg,#0F2D3D,#1A5C78);color:#fff;padding:22px 26px;border-radius:9px;margin-bottom:22px}",
    ".hdr .sub{font-size:10px;letter-spacing:1.4px;text-transform:uppercase;opacity:.7;margin-bottom:5px}",
    ".hdr .nro{font-size:10.5px;opacity:.52;margin-top:3px}",
    ".g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px;margin:9px 0}",
    ".g2{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin:9px 0}",
    ".dato{background:#F5EFE4;border-radius:6px;padding:8px 11px}",
    ".dato .dl{font-size:10px;font-weight:600;color:#5A5A5A;text-transform:uppercase;letter-spacing:.6px;margin-bottom:2px}",
    ".dato .dv{font-size:13.5px;font-weight:600;color:#0F2D3D}",
    ".mc{border:1.5px solid #E0E0E0;border-radius:8px;padding:13px 15px;margin:9px 0}",
    ".mc .mc-n{font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:600;color:#0F2D3D;margin-bottom:4px}",
    ".mc .mc-v{font-size:20px;font-weight:700;color:#1A5C78;margin-bottom:2px}",
    ".mc .mc-a{font-size:11.5px;color:#5A5A5A;margin-bottom:7px}",
    ".cr{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px dashed #E0E0E0;font-size:12px}",
    ".cr:last-child{border:none}",
    ".cr .cl{color:#5A5A5A}",
    ".cr .cv{font-weight:600}",
    ".cr.ng .cv{color:#B71C1C}",
    ".cr.ps .cv{color:#2E7D32}",
    ".cr.tt .cl{font-weight:700;color:#0F2D3D;font-size:13px}",
    ".cr.tt .cv{font-family:'Cormorant Garamond',serif;font-size:17px;color:#0F2D3D}",
    ".final{background:linear-gradient(135deg,#8B4513,#B8892A);color:#fff;border-radius:9px;padding:20px 24px;margin:16px 0;text-align:center}",
    ".final .fv{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:700;line-height:1}",
    ".explain{background:#F0F7FA;border-left:4px solid #1A5C78;border-radius:0 7px 7px 0;padding:10px 13px;margin:8px 0;font-size:12px;line-height:1.7}",
    ".explain strong{color:#0F2D3D}",
    ".fotos-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:9px 0}",
    ".fotos-grid img{width:100%;height:150px;object-fit:cover;border-radius:7px;border:1px solid #E0E0E0}",
    ".negoc{display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px;margin:9px 0}",
    ".neg-card{border-radius:7px;padding:11px 13px;text-align:center}",
    ".neg-card .nc-l{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;margin-bottom:3px}",
    ".neg-card .nc-v{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:700}",
    ".firma{margin-top:28px;padding-top:14px;border-top:2px solid #E0E0E0;display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:end}",
    ".f-line{border-top:1px solid #1A1A1A;padding-top:6px;font-size:11px;color:#5A5A5A;margin-top:36px}",
    ".ross-box{border-radius:8px;padding:12px 15px;margin:9px 0}",
  ].join("\n");

  const contenido=[
    "<style>"+estilos+"</style>",
    "<div class='hdr'>",
    "<div class='sub'>Informe de Tasacion Inmobiliaria</div>",
    "<h1>"+(prop.tipo||"Propiedad")+(prop.dom?" — "+prop.dom:"")+"</h1>",
    "<div class='nro'>N° "+nroInf+" | Fecha: "+hoy()+(tcN>0?" | TC Blue: $ "+tcN.toLocaleString("es-AR")+"/USD":"")+"</div>",
    tasador.nombre?"<div style='font-size:12px;margin-top:5px;opacity:.78'>"+tasador.nombre+(tasador.matricula?" | Mat. N° "+tasador.matricula:"")+(tasador.inmo?" | "+tasador.inmo:"")+"</div>":"",
    "</div>",

    "<h2>1. Descripcion del Inmueble</h2>",
    "<div class='g3'>",
    "<div class='dato'><div class='dl'>Tipo</div><div class='dv'>"+(prop.tipo||"—")+"</div></div>",
    "<div class='dato'><div class='dl'>Domicilio</div><div class='dv'>"+(prop.dom||"—")+"</div></div>",
    "<div class='dato'><div class='dl'>Zona POT</div><div class='dv'>"+(z?z.n:"—")+"</div></div>",
    "<div class='dato'><div class='dl'>Sup. Terreno</div><div class='dv'>"+(prop.st||"—")+" m2</div></div>",
    "<div class='dato'><div class='dl'>Sup. Cubierta</div><div class='dv'>"+(prop.sc||"—")+" m2</div></div>",
    "<div class='dato'><div class='dl'>Antiguedad</div><div class='dv'>"+(prop.ant||"—")+" anos</div></div>",
    "<div class='dato'><div class='dl'>Ambientes</div><div class='dv'>"+(prop.amb||"—")+"</div></div>",
    "<div class='dato'><div class='dl'>Estado</div><div class='dv'>"+(prop.est||"—")+"</div></div>",
    "<div class='dato'><div class='dl'>Estado Ross-H.</div><div class='dv'>Estado "+(estadoRoss||"—")+"</div></div>",
    "</div>",

    estadoRoss&&explicacionRoss?"<div class='ross-box' style='background:#FFF8E1;border:1.5px solid #F59E0B'><strong style='color:#B45309'>Estado Ross-Heidecke "+estadoRoss+":</strong> "+explicacionRoss+"</div>":"",

    z?"<div class='explain'><strong>Zona POT: "+z.n+"</strong> — "+z.t+". "+z.d+" Parcela min: "+z.pm+"m2 | FOS: "+z.fos+" | Coef. tasacion: x"+z.c.toFixed(2)+"</div>":"",

    prop.lat&&prop.lng?"<div style='background:#F5EFE4;border-radius:6px;padding:7px 11px;font-size:11px;color:#5A5A5A;margin:8px 0'>GPS: "+prop.lat+", "+prop.lng+"</div>":"",

    fpts.length>0?"<h2>2. Registro Fotografico</h2><div class='fotos-grid'>"+fpts.map(f=>"<img src='"+f.preview+"' alt='"+f.label+"'/>").join("")+"</div>":"",

    rComp?"<h2>3. Metodo de Comparables de Mercado</h2>" +
      "<div class='explain'><strong>Que es:</strong> Se comparan propiedades similares en venta en Gualeguaychu. " +
      "Se analizaron <strong>"+rComp.n+" comparables</strong>. Precio promedio bruto: USD "+rComp.avgBruto.toFixed(0)+"/m2. " +
      "Coef. zona POT x"+rComp.coef.toFixed(2)+". Coef. homogeneizacion x"+rComp.coefHom.toFixed(3)+". Ajuste caracteristicas x"+rComp.aj.toFixed(3)+". " +
      "Precio ajustado: <strong>USD "+rComp.usdM2.toFixed(0)+"/m2</strong>.</div>" +
      "<div class='mc'><div class='mc-n'>Comparables de Mercado</div><div class='mc-v'>USD "+Math.round(rComp.usdTotal).toLocaleString("es-AR")+"</div>" +
      (tcN>0?"<div class='mc-a'>"+arsFmt(rComp.usdTotal)+" al TC del dia</div>":"") +
      "<div class='cr'><span class='cl'>Promedio bruto</span><span class='cv'>USD "+rComp.avgBruto.toFixed(0)+"/m2</span></div>" +
      "<div class='cr'><span class='cl'>Coef. zona POT</span><span class='cv'>x "+rComp.coef.toFixed(2)+"</span></div>" +
      "<div class='cr'><span class='cl'>Coef. homogeneizacion</span><span class='cv'>x "+rComp.coefHom.toFixed(3)+"</span></div>" +
      "<div class='cr'><span class='cl'>Ajuste caracteristicas</span><span class='cv'>x "+rComp.aj.toFixed(3)+"</span></div>" +
      "<div class='cr tt'><span class='cl'>VALOR POR COMPARABLES</span><span class='cv'>USD "+Math.round(rComp.usdTotal).toLocaleString("es-AR")+"</span></div></div>":"",

    rCap?"<h2>Metodo de Capitalizacion de Rentas</h2>" +
      "<div class='explain'><strong>Que es:</strong> Valor segun ingresos por alquiler. Alquiler mensual USD "+Math.round(rCap.alqUsd)+". Ingreso anual neto USD "+Math.round(rCap.neto)+" (vacancia "+(rCap.vac*100).toFixed(0)+"%). Tasa: "+(rCap.tasa*100).toFixed(1)+"% anual.</div>" +
      "<div class='mc'><div class='mc-n'>Capitalizacion de Rentas</div><div class='mc-v'>USD "+Math.round(rCap.val).toLocaleString("es-AR")+"</div>" +
      (tcN>0?"<div class='mc-a'>"+arsFmt(rCap.val)+" al TC del dia</div>":"") +
      "<div class='cr'><span class='cl'>Alquiler mensual</span><span class='cv'>USD "+Math.round(rCap.alqUsd)+"</span></div>" +
      "<div class='cr ng'><span class='cl'>Vacancia "+(rCap.vac*100).toFixed(0)+"%</span><span class='cv'>- USD "+Math.round(rCap.vacM)+"</span></div>" +
      "<div class='cr'><span class='cl'>Ingreso anual neto</span><span class='cv'>USD "+Math.round(rCap.neto)+"</span></div>" +
      "<div class='cr tt'><span class='cl'>VALOR POR CAPITALIZACION</span><span class='cv'>USD "+Math.round(rCap.val).toLocaleString("es-AR")+"</span></div>" +
      "<div style='background:#F5EFE4;border-radius:5px;padding:7px 10px;font-size:11.5px;color:#5A5A5A;margin-top:7px'>Rentabilidad bruta: "+((rCap.bruto/rCap.val)*100).toFixed(1)+"% anual</div></div>":"",

    rRep?"<h2>Metodo de Reposicion — Ross-Heidecke</h2>" +
      "<div class='explain'><strong>Que es:</strong> Costo de construir hoy la misma propiedad con depreciacion real. " +
      "Vida util "+d(rRep.vidaUtil)+" anos | "+rRep.ant+" anos consumidos = "+rRep.vidaConsumidaPct+"% vida consumida. " +
      "Estado "+rRep.estadoUsado+". Depreciacion Ross-Heidecke: <strong>"+rRep.depPct.toFixed(2)+"%</strong>.</div>" +
      "<div class='mc'><div class='mc-n'>Reposicion — Ross-Heidecke</div><div class='mc-v'>USD "+Math.round(rRep.total).toLocaleString("es-AR")+"</div>" +
      (tcN>0?"<div class='mc-a'>"+arsFmt(rRep.total)+" al TC del dia</div>":"") +
      "<div class='cr'><span class='cl'>Costo m2 ajustado</span><span class='cv'>USD "+rRep.costoM2Usd.toFixed(0)+"/m2</span></div>" +
      "<div class='cr'><span class='cl'>Sup. cubierta "+rRep.sc+"m2</span><span class='cv'>USD "+Math.round(rRep.cc).toLocaleString("es-AR")+"</span></div>" +
      (rRep.ss>0?"<div class='cr'><span class='cl'>Semicubierta "+rRep.ss+"m2</span><span class='cv'>USD "+Math.round(rRep.cs).toLocaleString("es-AR")+"</span></div>":"") +
      "<div class='cr'><span class='cl'>Gastos indirectos</span><span class='cv'>USD "+Math.round(rRep.gastos).toLocaleString("es-AR")+"</span></div>" +
      "<div class='cr'><span class='cl'>Valor a nuevo</span><span class='cv'>USD "+Math.round(rRep.vNuevo).toLocaleString("es-AR")+"</span></div>" +
      "<div class='cr ng'><span class='cl'>Deprec. Ross-Heidecke "+rRep.depPct.toFixed(2)+"% (fila "+rRep.vidaConsumidaPct+"%, Est."+rRep.estadoUsado+")</span><span class='cv'>- USD "+Math.round(rRep.depMonto).toLocaleString("es-AR")+"</span></div>" +
      (rRep.vtUsd>0?"<div class='cr ps'><span class='cl'>Valor del terreno</span><span class='cv'>USD "+Math.round(rRep.vtUsd).toLocaleString("es-AR")+"</span></div>":"") +
      "<div class='cr tt'><span class='cl'>VALOR POR REPOSICION</span><span class='cv'>USD "+Math.round(rRep.total).toLocaleString("es-AR")+"</span></div></div>":"",

    promUsd?"<div class='final'>" +
      "<div style='font-size:10.5px;letter-spacing:1.4px;text-transform:uppercase;opacity:.82;margin-bottom:5px'>Valor Final de Tasacion — Gualeguaychu, Entre Rios</div>" +
      "<div class='fv'>USD "+Math.round(promUsd).toLocaleString("es-AR")+"</div>" +
      (tcN>0?"<div style='font-size:15px;opacity:.82;margin-top:4px'>"+arsFmt(promUsd)+" al TC $ "+tcN.toLocaleString("es-AR")+"/USD</div>":"") +
      "</div>" +
      "<div class='explain'><strong>Como se llego a este valor:</strong> Se aplicaron "+metodos.length+" metodos de valuacion independientes: "+metodos.map(m=>m.n+" (USD "+Math.round(m.v).toLocaleString("es-AR")+")").join(", ")+". Valor final: promedio ponderado.</div>" +
      "<h2>Precios Sugeridos</h2>" +
      "<div class='negoc'>" +
      "<div class='neg-card' style='background:#EBF5FB;border:1.5px solid #1A5C78'><div class='nc-l' style='color:#1A5C78'>Precio de publicacion</div><div class='nc-v' style='color:#1A5C78'>USD "+Math.round(promUsd*1.10).toLocaleString("es-AR")+"</div>"+(tcN>0?"<div style='font-size:11px;color:#5A5A5A'>"+arsFmt(promUsd*1.10)+"</div>":"")+"<div style='font-size:10.5px;color:#5A5A5A;margin-top:4px'>+10% margen de negociacion</div></div>" +
      "<div class='neg-card' style='background:#EDE4D4;border:1.5px solid #8B4513'><div class='nc-l' style='color:#8B4513'>Valor tasado</div><div class='nc-v' style='color:#0F2D3D'>USD "+Math.round(promUsd).toLocaleString("es-AR")+"</div>"+(tcN>0?"<div style='font-size:11px;color:#5A5A5A'>"+arsFmt(promUsd)+"</div>":"")+"<div style='font-size:10.5px;color:#5A5A5A;margin-top:4px'>Valor justo — 3 metodos</div></div>" +
      "<div class='neg-card' style='background:#FEF2F2;border:1.5px solid #B71C1C'><div class='nc-l' style='color:#B71C1C'>Precio minimo</div><div class='nc-v' style='color:#B71C1C'>USD "+Math.round(promUsd*0.92).toLocaleString("es-AR")+"</div>"+(tcN>0?"<div style='font-size:11px;color:#5A5A5A'>"+arsFmt(promUsd*0.92)+"</div>":"")+"<div style='font-size:10.5px;color:#5A5A5A;margin-top:4px'>Minimo aceptable (-8%)</div></div>" +
      "</div>":"",

    "<div class='firma'>",
    "<div><div style='font-size:11px;color:#5A5A5A;margin-bottom:36px'>Tasador Inmobiliario</div><div class='f-line'>"+(tasador.nombre||"Nombre y apellido")+(tasador.matricula?" | Mat. N° "+tasador.matricula:"")+(tasador.inmo?" | "+tasador.inmo:"")+"</div></div>",
    "<div style='text-align:right'><div style='font-size:11px;color:#5A5A5A'>Gualeguaychu, "+hoy()+"</div>"+(tcN>0?"<div style='font-size:10px;color:#9A9A9A;margin-top:2px'>TC Blue: $ "+tcN.toLocaleString("es-AR")+"/USD</div>":"")+"<div style='font-size:10px;color:#9A9A9A;margin-top:2px'>Informe N° "+nroInf+"</div></div>",
    "</div>",
  ];

  // Helper to avoid reference errors
  function d(val){return val||0;}

  const html="<!DOCTYPE html><html lang='es'><head><meta charset='utf-8'/><title>Informe "+nroInf+"</title></head><body>"+contenido.join("")+"</body></html>";
  const v=window.open("","_blank");
  if(!v)return;
  v.document.write(html);v.document.close();v.focus();
  setTimeout(()=>v.print(),900);
}

// ═══════════════════════════════════════════════════════════════════
//  TAB RESUMEN
// ═══════════════════════════════════════════════════════════════════
function TabResumen({tasador,prop,rComp,rCap,rRep,rTerreno,tc,estadoRoss,fotos,checklist}){
  const [ponds,setPonds]=useState({comp:33,cap:33,rep:34});
  const [nroInf]=useState(nroInforme());
  const tcN=nv(tc);
  const metodos=[
    {key:"comp",label:"Comparables",  v:rComp&&rComp.usdTotal},
    {key:"cap", label:"Capitalizacion",v:rCap&&rCap.val},
    {key:"rep", label:"Reposicion",   v:rRep&&rRep.total},
  ].filter(m=>m.v);
  const totalP=metodos.reduce((s,m)=>s+ponds[m.key],0)||1;
  const promUsd=metodos.length?metodos.reduce((s,m)=>s+m.v*(ponds[m.key]/totalP),0):null;
  const promArs=promUsd&&tcN>0?promUsd*tcN:null;
  const sc=nv(prop.sc)||1;
  const zona=ZONAS[prop.zona_id];
  if(!metodos.length)return(<div className="card"><div className="empty">Completa al menos un metodo para ver el resumen.</div></div>);
  return(
    <div>
      <div className="card">
        <div className="ct">Valores por Metodo <span className="pill pt">N° {nroInf}</span></div>
        <Semaforo rComp={rComp} rCap={rCap} rRep={rRep}/>
        <div className="sum-grid">
          {metodos.map(m=>(<div key={m.key} className="sc"><div className="sl">{m.label}</div><div className="sv">USD {Math.round(m.v).toLocaleString("es-AR")}</div>{tcN>0&&<div className="sm">{ars(m.v*tcN)}</div>}<div style={{fontSize:10,color:"var(--lt)",marginTop:2}}>USD {(m.v/sc).toFixed(0)}/m2</div></div>))}
          {rTerreno&&(<div className="sc" style={{borderColor:"var(--rs)"}}><div className="sl">Terreno</div><div className="sv">USD {Math.round(rTerreno.usdT).toLocaleString("es-AR")}</div>{tcN>0&&<div className="sm">{ars(rTerreno.arsT)}</div>}<div style={{fontSize:10,color:"var(--lt)",marginTop:2}}>USD {rTerreno.m2adj.toFixed(0)}/m2</div></div>)}
        </div>
      </div>
      {metodos.length>1&&(<div className="card">
        <div className="ct">Ponderacion</div>
        {metodos.map(m=>(<div key={m.key} className="pond-row"><label>{m.label}</label><input type="range" min="0" max="100" value={ponds[m.key]} onChange={e=>setPonds(p=>({...p,[m.key]:Number(e.target.value)}))}/><span className="pv">{ponds[m.key]}%</span></div>))}
      </div>)}
      {promUsd&&(<div className="final-box">
        <div className="fb-l">Valor Final de Tasacion — Gualeguaychu, Entre Rios</div>
        <div className="fb-v">USD {Math.round(promUsd).toLocaleString("es-AR")}</div>
        {tcN>0&&<div className="fb-u">{ars(promArs)}</div>}
        <div className="fb-m">USD {(promUsd/sc).toFixed(0)}/m2 — {nv(prop.sc)}m2 cubiertos</div>
        <div className="fb-d">{prop.tipo||"Inmueble"}{zona?" — Zona "+zona.n:""}{prop.dom?" — "+prop.dom:""}{estadoRoss?" — Estado "+estadoRoss+" (Ross-Heidecke)":""}{" — "+hoy()}{tcN>0?" — TC $ "+tcN.toLocaleString("es-AR")+"/USD":""}</div>
      </div>)}
      {promUsd&&(<div className="card" style={{marginTop:12}}>
        <div className="ct">Calculadora de Negociacion</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {[{l:"Precio de publicacion",pct:0.10,col:"var(--tl)",desc:"Publicar 10% arriba"},{l:"Valor de tasacion",pct:0,col:"var(--nv)",desc:"El valor justo"},{l:"Precio minimo",pct:-0.08,col:"var(--er)",desc:"Minimo a aceptar"}].map(item=>(
            <div key={item.l} style={{background:"#fff",borderRadius:9,padding:"11px 13px",border:"1.5px solid rgba(15,45,61,.1)"}}>
              <div style={{fontSize:10,fontWeight:700,color:item.col,textTransform:"uppercase",letterSpacing:".6px",marginBottom:3}}>{item.l}</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontWeight:700,color:item.col}}>USD {Math.round(promUsd*(1+item.pct)).toLocaleString("es-AR")}</div>
              {tcN>0&&<div style={{fontSize:10.5,color:"var(--lt)",marginTop:2}}>{ars(promUsd*(1+item.pct)*tcN)}</div>}
              <div style={{fontSize:10.5,color:"var(--md)",marginTop:4,lineHeight:1.5}}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>)}
      {promUsd&&(<div className="card" style={{marginTop:12}}>
        <div className="ct">Argumentos para el Propietario</div>
        <div className="arg-grid">
          {rComp&&(<div className="arg-card"><div className="a-ico">Mercado</div><div className="a-tit">Respaldo de mercado real</div><div className="a-bod">Se analizaron {rComp.n} propiedades en venta en Gualeguaychu. Precio promedio USD {rComp.avgBruto.toFixed(0)}/m2. Con coef. zona {zona?zona.n:""}(x{rComp.coef.toFixed(2)}), homogeneizacion (x{rComp.coefHom.toFixed(3)}) y ajustes, precio justo: USD {rComp.usdM2.toFixed(0)}/m2. Es lo que el mercado paga HOY.</div><div className="a-val">USD {Math.round(rComp.usdTotal).toLocaleString("es-AR")}{tcN>0?" = "+ars(rComp.arsTotal):""}</div></div>)}
          {rCap&&(<div className="arg-card"><div className="a-ico">Rentabilidad</div><div className="a-tit">Rentabilidad como inversion</div><div className="a-bod">Puesta en alquiler genera USD {Math.round(rCap.alqUsd)}/mes. Ingreso neto anual: USD {Math.round(rCap.neto)}. Tasa de mercado GCU: {(rCap.tasa*100).toFixed(1)}% anual. Al valor tasado, el inversor gana exactamente lo que paga el mercado.</div><div className="a-val">USD {Math.round(rCap.val).toLocaleString("es-AR")}{tcN>0?" = "+ars(rCap.arsVal):""}</div></div>)}
          {rRep&&(<div className="arg-card"><div className="a-ico">Construccion</div><div className="a-tit">Imposible construirla mas barato hoy</div><div className="a-bod">Construir hoy esta propiedad costaria USD {Math.round(rRep.vNuevo).toLocaleString("es-AR")}. Depreciacion Ross-Heidecke: {rRep.ant} anos = {rRep.vidaConsumidaPct}% vida consumida, Estado {rRep.estadoUsado}, {rRep.depPct.toFixed(2)}% de depreciacion. Con terreno: USD {Math.round(rRep.total).toLocaleString("es-AR")}.</div><div className="a-val">USD {Math.round(rRep.total).toLocaleString("es-AR")}{tcN>0?" = "+ars(rRep.arsTotal):""}</div></div>)}
          {zona&&(<div className="arg-card"><div className="a-ico">POT Oficial</div><div className="a-tit">Zona {zona.n} — POT GCU</div><div className="a-bod">Segun el Plan de Ordenamiento Territorial, esta propiedad esta en zona {zona.n} ({zona.t}). {zona.d} La localizacion representa el 30-50% del valor final y no puede modificarse.</div></div>)}
          {estadoRoss&&rRep&&checklist&&Object.values(checklist).some(v=>v>0)&&(<div className="arg-card"><div className="a-ico">Ross-Heidecke</div><div className="a-tit">Depreciacion calculada con 8 criterios</div><div className="a-bod">{explicarEstado(checklist,estadoRoss)}</div></div>)}
          {rTerreno&&(<div className="arg-card"><div className="a-ico">Terreno</div><div className="a-tit">El terreno solo vale mucho</div><div className="a-bod">El terreno de {rTerreno&&rTerreno.ficha?rTerreno.ficha.sup:nv(prop.st)}m2 en {rTerreno&&rTerreno.ficha&&rTerreno.ficha.ciudad?rTerreno.ficha.ciudad+", "+(rTerreno.ficha.zona||""):"la zona"} vale USD {Math.round(rTerreno.usdT).toLocaleString("es-AR")} (USD {rTerreno&&rTerreno.m2adj?rTerreno.m2adj.toFixed(0):"—"}/m2). Este componente nunca deprecia.</div><div className="a-val">USD {Math.round(rTerreno.usdT).toLocaleString("es-AR")}{tcN>0?" = "+ars(rTerreno.arsT):""}</div></div>)}
        </div>
      </div>)}
      <div className="brow no-print" style={{justifyContent:"center",marginTop:4,gap:10}}>
        <button className="btn bg" onClick={()=>generarPDF({tasador,prop,rComp,rCap,rRep,rTerreno,tc:tcN,estadoRoss,promUsd,fotos,nroInf,checklist})}>
          Generar Informe PDF Profesional
        </button>
        <button className="btn bh" onClick={()=>window.print()}>Imprimir pantalla</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  TAB HISTORIAL
// ═══════════════════════════════════════════════════════════════════
function TabHistorial({historial,setHistorial,rComp,rCap,rRep,prop,promUsd,tc}){
  const tcN=nv(tc);
  const guardar=()=>{
    if(!promUsd||!prop.dom)return;
    setHistorial(h=>[{id:uid(),fecha:hoy(),dom:prop.dom,tipo:prop.tipo,zona_id:prop.zona_id,sc:prop.sc,usdTotal:Math.round(promUsd),arsTotal:tcN>0?Math.round(promUsd*tcN):null,tc:tcN,metodos:[rComp&&"Comp",rCap&&"Cap",rRep&&"Rep"].filter(Boolean).join("+")}, ...h].slice(0,50));
  };
  const indiceZonas={};
  historial.forEach(e=>{
    if(!e.zona_id||!e.usdTotal||!e.sc)return;
    if(!indiceZonas[e.zona_id])indiceZonas[e.zona_id]={suma:0,n:0,zona:ZONAS[e.zona_id]};
    indiceZonas[e.zona_id].suma+=e.usdTotal/nv(e.sc);
    indiceZonas[e.zona_id].n++;
  });
  return(
    <div>
      {promUsd&&prop.dom&&(<div className="card">
        <div className="ct">Guardar Tasacion Actual</div>
        <div className="hl"><strong>{prop.tipo} — {prop.dom}</strong> — USD {Math.round(promUsd).toLocaleString("es-AR")}{tcN>0?" = "+ars(promUsd*tcN):""}</div>
        <button className="btn bp" onClick={guardar}>Guardar en historial</button>
      </div>)}
      <div className="card">
        <div className="ct">Historial <span className="pill pt">{historial.length} tasaciones</span></div>
        {!historial.length?<div className="empty">Sin tasaciones guardadas todavia.</div>:
          historial.map(e=>(<div key={e.id} className="hist-card">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div className="hc-dom">{e.tipo} — {e.dom}</div>
                <div className="hc-val">USD {e.usdTotal.toLocaleString("es-AR")}{e.arsTotal?" = "+ars(e.arsTotal):""}</div>
                <div className="hc-det">{e.fecha} | {ZONAS[e.zona_id]?ZONAS[e.zona_id].n:e.zona_id||"—"} | {e.sc}m2 | {e.metodos} | USD {e.sc?Math.round(e.usdTotal/nv(e.sc)):0}/m2</div>
              </div>
              <button className="btn bd bsm" onClick={()=>setHistorial(h=>h.filter(x=>x.id!==e.id))}>x</button>
            </div>
          </div>))
        }
      </div>
      {Object.keys(indiceZonas).length>0&&(<div className="card">
        <div className="ct">Indice de Mercado Propio — GCU</div>
        <div className="inf"><strong>Basado en tus propias tasaciones.</strong> Tu referencia mas confiable por zona.</div>
        {Object.entries(indiceZonas).map(([zid,data])=>(<div key={zid} className="zona-idx">
          <div className="zi-n">{data.zona?data.zona.n:zid}</div>
          <div className="zi-v">USD {(data.suma/data.n).toFixed(0)}/m2 promedio</div>
          <div className="zi-r">Basado en {data.n} tasacion{data.n>1?"es":""}</div>
        </div>))}
      </div>)}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  TAB TIPS
// ═══════════════════════════════════════════════════════════════════
function TabTips(){
  const tips=[
    {c:"",  n:"01",t:"Siempre usa los 3 metodos",b:"Comparables + Capitalizacion + Reposicion. Si los tres convergen, el valor es irrefutable."},
    {c:"gd",n:"02",t:"Todo en dolares, siempre",b:"El mercado de GCU opera en dolares. La barra superior muestra dolar blue, oficial y MEP en tiempo real. Usa blue para tasaciones."},
    {c:"",  n:"03",t:"Ross-Heidecke: usa el checklist",b:"Evalua los 8 puntos del checklist. La app calcula el estado automaticamente y explica por que. Eso es lo que te diferencia de un tasador amateur."},
    {c:"rs",n:"04",t:"Precio de oferta no es precio de cierre",b:"En GCU los inmuebles cierran entre 5% y 15% por debajo del precio publicado. Ajusta siempre los comparables."},
    {c:"gd",n:"05",t:"El rio y el Parque Unzue valen plata",b:"Zona Z2 y Z4 tienen prima de 20-30%. No subvalues propiedades con acceso al rio."},
    {c:"",  n:"06",t:"Verifica la escritura antes de tasar",b:"Sin escritura o en sucesion puede implicar descuentos del 5-15%. Siempre pregunta."},
    {c:"rs",n:"07",t:"Actualiza el TC al inicio de cada tasacion",b:"La barra superior actualiza el dolar automaticamente. Si no hay conexion, ingresalo manual."},
    {c:"gd",n:"08",t:"El coeficiente de homogeneizacion importa",b:"No se compara directamente una propiedad de 80m2 con una de 200m2. La app aplica el coeficiente automaticamente."},
    {c:"",  n:"09",t:"El FOS del POT limita el valor edificable",b:"Zona R3 (FOS 0.5) solo puede construir el 50% de la superficie. Siempre verificar antes de tasar un terreno."},
    {c:"rs",n:"10",t:"Guarda todas tus tasaciones",b:"El Indice de Mercado Propio se construye con tus tasaciones guardadas. Con el tiempo, es tu referencia mas valiosa."},
  ];
  return(
    <div>
      <div className="card">
        <div className="ct">Tips para Gualeguaychu <span className="pill pt">10 consejos</span></div>
        <div className="tips-grid">{tips.map(t=>(<div key={t.n} className={"tip "+t.c}><div className="tn">TIP {t.n}</div><div className="tt2">{t.t}</div><div className="tb3">{t.b}</div></div>))}</div>
      </div>
    </div>
  );
}
const BancoTab=()=>{
const [form,setForm]=useState({fecha:new Date().toISOString().split("T")[0],direccion:"",zona:"",tipo:"Casa",operacion:"Venta",m2_cubiertos:"",m2_terreno:"",ambientes:"",dormitorios:"",banos:"",estado:"Bueno",estructura:"Mamposteria",antiguedad:"",cochera:"No",piscina:"No",jardin:"No",quincho:"No",luz:"Si",agua:"Si",cloaca:"Si",gas:"Si",pavimento:"Si",precio_usd:"",precio_ars:"",usd_m2:"",fuente:"",observaciones:""});
const [filas,setFilas]=useState([]);
const [msg,setMsg]=useState("");
const [cargando,setCargando]=useState(false);
const guardar=async()=>{
if(!form.direccion||!form.precio_usd){setMsg("AVISO: Completá al menos dirección y precio USD");return;}
setCargando(true);setMsg("");
try{
const r=await fetch(SHEETS_URL,{method:"POST",body:JSON.stringify(form)});
const d=await r.json();
if(d.ok){setMsg("OK Comparable guardado correctamente");setForm(f=>({...f,direccion:"",precio_usd:"",precio_ars:"",usd_m2:"",observaciones:""}))}
else setMsg("Error: Error: "+d.error);
}catch(e){setMsg("Error: Error de conexión");}
setCargando(false);
};
const cargar=async()=>{
setCargando(true);
try{
const r=await fetch(SHEETS_URL);
const d=await r.json();
setFilas(d.slice(1));
}catch(e){setMsg("Error: Error al cargar datos");}
setCargando(false);
};
return(
<div className="card">
<div className="ct">Banco de Comparables <span className="pill pt">Google Sheets</span></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"12px"}}>
<div><label className="lb">Fecha</label><input className="inp" type="date" value={form.fecha} onChange={e=>setForm(f=>({...f,fecha:e.target.value}))}/></div>
<div><label className="lb">Dirección *</label><input className="inp" placeholder="Ej: San Martin 450" value={form.direccion} onChange={e=>setForm(f=>({...f,direccion:e.target.value}))}/></div>
<div><label className="lb">Zona POT</label><select className="inp" value={form.zona} onChange={e=>setForm(f=>({...f,zona:e.target.value}))}><option value="">--</option>{["C","R1","R2","R3","AP1","AP2","AP3","AP4","Co1","Co2","Co3a","Co3b","Co3c","Co4","Q","CH","R","PB_C","PB_E"].map(z=><option key={z}>{z}</option>)}</select></div>
<div><label className="lb">Tipo</label><select className="inp" value={form.tipo} onChange={e=>setForm(f=>({...f,tipo:e.target.value}))}>{["Casa","Departamento","Terreno","Local","Galpon","Campo","PH","Duplex"].map(t=><option key={t}>{t}</option>)}</select></div>
<div><label className="lb">m² Cubiertos</label><input className="inp" type="number" value={form.m2_cubiertos} onChange={e=>setForm(f=>({...f,m2_cubiertos:e.target.value}))}/></div>
<div><label className="lb">m² Terreno</label><input className="inp" type="number" value={form.m2_terreno} onChange={e=>setForm(f=>({...f,m2_terreno:e.target.value}))}/></div>
<div><label className="lb">Precio USD *</label><input className="inp" type="number" value={form.precio_usd} onChange={e=>setForm(f=>({...f,precio_usd:e.target.value}))}/></div>
<div><label className="lb">USD/m²</label><input className="inp" type="number" value={form.usd_m2} onChange={e=>setForm(f=>({...f,usd_m2:e.target.value}))}/></div>
<div><label className="lb">Fuente</label><input className="inp" placeholder="Ej: ZonaProp" value={form.fuente} onChange={e=>setForm(f=>({...f,fuente:e.target.value}))}/></div>
<div><label className="lb">Estado</label><select className="inp" value={form.estado} onChange={e=>setForm(f=>({...f,estado:e.target.value}))}>{["Excelente","Muy bueno","Bueno","Regular","A reciclar"].map(t=><option key={t}>{t}</option>)}</select></div>
</div>
<div style={{marginBottom:"8px"}}><label className="lb">Observaciones</label><input className="inp" value={form.observaciones} onChange={e=>setForm(f=>({...f,observaciones:e.target.value}))}/></div>
{msg&&<div style={{padding:"8px",marginBottom:"8px",background:msg.startsWith("✅")?"#1a3a1a":"#3a1a1a",borderRadius:"6px",fontSize:"13px"}}>{msg}</div>}
<div style={{display:"flex",gap:"8px",marginBottom:"16px"}}>
<button className="btn" onClick={guardar} disabled={cargando}>{cargando?"Guardando...":"💾 Guardar Comparable"}</button>
<button className="btn" style={{background:"#2a4a6a"}} onClick={cargar} disabled={cargando}>{cargando?"Cargando...":"📋 Ver Guardados"}</button>
</div>
{filas.length>0&&<div style={{overflowX:"auto"}}><table style={{width:"100%",fontSize:"11px",borderCollapse:"collapse"}}><thead><tr>{["Fecha","Dirección","Zona","Tipo","m²","USD","USD/m²","Fuente"].map(h=><th key={h} style={{padding:"4px",background:"#2a2a2a",textAlign:"left"}}>{h}</th>)}</tr></thead><tbody>{filas.map((f,i)=><tr key={i} style={{borderBottom:"1px solid #333"}}><td style={{padding:"4px"}}>{f[0]}</td><td style={{padding:"4px"}}>{f[1]}</td><td style={{padding:"4px"}}>{f[2]}</td><td style={{padding:"4px"}}>{f[3]}</td><td style={{padding:"4px"}}>{f[5]}</td><td style={{padding:"4px"}}>{f[22]}</td><td style={{padding:"4px"}}>{f[24]}</td><td style={{padding:"4px"}}>{f[25]}</td></tr>)}</tbody></table></div>}
</div>
);
};

// ═══════════════════════════════════════════════════════════════════
//  APP PRINCIPAL
// ═══════════════════════════════════════════════════════════════════
const TABS=[
  {l:"Tasador"},{l:"Inmueble"},{l:"Fotos + Estado"},
  {l:"Terreno"},{l:"Comparables"},{l:"Capitalizacion"},
  {l:"Reposicion"},{l:"Resumen"},{l:"Historial"},{l:"Tips"},{l:"Banco"}
];

export default function App(){
  const [tab,setTab]=useState(0);
  const [tc,setTc]=useState("1300");
  const [tasador,setTasador]=useState({nombre:"",matricula:"",inmo:"",tel:"",email:"",dir:""});
  const [prop,setProp]=useState({tipo:"Casa",dom:"",zona_id:"",st:"",sc:"",ss:"",ant:"",amb:"",dorm:"",ban:"",est:"Bueno",gar:false,pic:false,lat:false,dep_serv:false,baulera:false,alquilada:false,servicios:[]});
  const [fotos,setFotos]=useState([]);
  const [checklist,setChecklist]=useState({});
  const [estadoRoss,setEstadoRoss]=useState(null);
  const [rComp,setRComp]=useState(null);
  const [rCap,setRCap]=useState(null);
  const [rRep,setRRep]=useState(null);
  const [rTerreno,setRTerreno]=useState(null);
  const [historial,setHistorial]=useState([]);

  const tcN=nv(tc);
  const completados=[rComp,rCap,rRep].filter(Boolean).length;
  const zona=prop.zona_id?ZONAS[prop.zona_id]:null;
  const metodos=[{key:"comp",v:rComp&&rComp.usdTotal},{key:"cap",v:rCap&&rCap.val},{key:"rep",v:rRep&&rRep.total}].filter(m=>m.v);
  const promUsd=metodos.length?metodos.reduce((s,m)=>s+m.v,0)/metodos.length:null;

  return(
    <>
      <style>{CSS}</style>
      <div>
        <div className="hdr">
          <div className="hdr-row">
            <div className="hi">🏡</div>
            <div><h1>Tasaciones Inmobiliarias</h1><p>Gualeguaychu, Entre Rios — POT Ord. 2018</p></div>
          </div>
          <div className="hdr-meta">
            <span>📅 <strong>{hoy()}</strong></span>
            {prop.dom&&<span>🏠 <strong>{prop.tipo} — {prop.dom}</strong></span>}
            {zona&&<span>📍 <strong>{zona.n}</strong></span>}
            {estadoRoss&&<span>📊 <strong>Estado {estadoRoss} (Ross-H.)</strong></span>}
            {completados>0&&<span>✅ <strong>{completados} metodo{completados>1?"s":""}</strong></span>}
            {tasador.nombre&&<span>👤 <strong>{tasador.nombre}</strong></span>}
          </div>
        </div>

        <DolarBar tc={tc} setTc={setTc}/>

        <div className="tabbar">
          {TABS.map((t,i)=>(<button key={i} className={"tb"+(tab===i?" on":"")} onClick={()=>setTab(i)}>{t.l}</button>))}
        </div>

        <div className="page">
          {tab===0&&<TabTasador tasador={tasador} setTasador={setTasador}/>}
          {tab===1&&<TabInmueble prop={prop} setProp={setProp} tc={tcN} onNext={()=>setTab(2)}/>}
          {tab===2&&<TabFotos fotos={fotos} setFotos={setFotos} checklist={checklist} setChecklist={setChecklist} estadoRoss={estadoRoss} setEstadoRoss={setEstadoRoss}/>}
          {tab===3&&<TabTerreno prop={prop} result={rTerreno} setResult={setRTerreno} tc={tcN}/>}
          {tab===4&&<TabComp prop={prop} result={rComp} setResult={setRComp} tc={tcN}/>}
          {tab===5&&<TabCap prop={prop} result={rCap} setResult={setRCap} tc={tcN}/>}
          {tab===6&&<TabRep prop={prop} result={rRep} setResult={setRRep} rTerreno={rTerreno} tc={tcN} estadoRoss={estadoRoss}/>}
          {tab===7&&<TabResumen tasador={tasador} prop={prop} rComp={rComp} rCap={rCap} rRep={rRep} rTerreno={rTerreno} tc={tcN} estadoRoss={estadoRoss} fotos={fotos} checklist={checklist}/>}
          {tab===8&&<TabHistorial historial={historial} setHistorial={setHistorial} rComp={rComp} rCap={rCap} rRep={rRep} prop={prop} promUsd={promUsd} tc={tcN}/>}
          {tab===9&&<TabTips/>}
          {tab===10&&<BancoTab/>}
        </div>
      </div>
    </>
  );
}
