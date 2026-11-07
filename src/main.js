const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
const papers = [
  { initials:'LC', name:'Luis Ccalluchi', concept:'Explorar decisiones como ramas', year:'2025', title:'Interactive Reasoning: Visualizing and Controlling Chain-of-Thought Reasoning in Large Language Models', explanation:'La lectura propone organizar e intervenir en una estructura de temas y subtemas. Luis relacionó ese control con la necesidad de comparar jugadas concretas y cuestionar una recomendación antes de aplicarla.', application:'En IAjedrez: ramas de jugadas y consultas situadas para explorar alternativas. La representación de pasos didácticos no implica exponer el razonamiento interno de un modelo.', file:'ETAPA A_ Luis Ccalluchi.docx' },
  { initials:'HJ', name:'Hellen Juan de Dios', concept:'Conectar los pasos del análisis', year:'2022', title:'PromptChainer: Chaining Large Language Model Prompts through Visual Programming', explanation:'Chain View y Node View permiten ver un proceso completo y examinar cada etapa. La síntesis de Hellen relaciona esta organización con la necesidad de José de explorar una duda y volver al análisis original.', application:'En IAjedrez: identificar el error, comprenderlo y explorar alternativas como pasos relacionados. Se adapta el principio de navegación; el jugador no necesita programar cadenas de prompts.', file:'HellenArtículo IHC.docx' },
  { initials:'MC', name:'Mauricio Cornejo', concept:'Dar prioridad a lo que importa', year:'2025', title:'Beyond Code Generation: LLM-supported Exploration of the Program Design Space', explanation:'La lectura de PAIL inspiró la organización por módulos. La entrevista a Jair orientó el foco hacia revisar errores, encontrar jugadas con rapidez y evitar que información secundaria distraiga del análisis.', application:'En IAjedrez: resumen de errores primero; consejos y otras vistas a demanda. La integración de Stockfish responde a la necesidad de comprobar jugadas observada en la entrevista.', file:'IHC-CornejoMauricio-U2paper.pdf' },
  { initials:'RM', name:'Rimsky Miramira', concept:'Hacer visible el hilo de la conversación', year:'2026', title:'From Conversation to Human-AI Common Ground: Extracting Cognitive Workflows for Reuse in Sense-making Tasks', explanation:'La síntesis de ThinkFlow destaca un chat y un canvas conectados, con fases que se pueden inspeccionar y corregir. Rimsky lo relaciona con las dificultades de Rony para interpretar notación y compartir el contexto.', application:'En IAjedrez: vincular fases, mensajes y posiciones. El tablero sincronizado es una extensión del equipo motivada por las entrevistas, no una función atribuida al artículo.', file:'analisis-paper-rimsky.pdf' },
];
document.querySelector('#papers').innerHTML = papers.map(p => `<details class="paper"><summary><span class="paper-initials">${p.initials}</span><div><h3>${p.concept}</h3><small>${p.name} · ${p.year}</small></div><span aria-hidden="true">+</span></summary><div class="paper-body"><h4 class="paper-title">${p.title}</h4><p>${p.explanation}</p><p class="adaptation">${p.application}</p><a class="text-link" href="${asset('materiales/'+encodeURIComponent(p.file))}" download>Leer la síntesis individual <span aria-hidden="true">↓</span></a></div></details>`).join('');

const documents = [
  ['ETAPA A_ Luis Ccalluchi.docx','Interactive Reasoning · Síntesis y propuesta','Luis Ccalluchi','docs'],
  ['HellenArtículo IHC.docx','PromptChainer · Síntesis y propuesta','Hellen Juan de Dios','docs'],
  ['IHC-CornejoMauricio-U2paper.pdf','Beyond Code Generation · Síntesis','Mauricio Cornejo','docs'],
  ['IHC-BeyondPaper-Apuntes-CornejoMauricio.pdf','Beyond Code Generation · Apuntes y bosquejo','Mauricio Cornejo','docs'],
  ['analisis-paper-rimsky.pdf','ThinkFlow · Síntesis y propuesta','Rimsky Miramira','docs'],
  ['Diapositiva Needfinding - Luis Ccalluchi.pptx','Needfinding · Gabriel y Estefani','Luis Ccalluchi','diapos'],
  ['HCI NeedFinding [HS Brit] DP 1_ Needfinding.pptx','Needfinding · José y Liz','Hellen Juan de Dios','diapos'],
  ['Needfinding-CornejoMauricio.pdf','Needfinding · Jair','Mauricio Cornejo','diapos'],
  ['Needfinding-MiramiraRimsky.pptx','Needfinding · Rony','Rimsky Miramira','diapos'],
  ['IAjedrez - Exposicion.pptx','IAjedrez — Exposición · Etapa A','Equipo completo','diapos'],
  ['IAjedrez - Exposicion(1).pptx','IAjedrez — Exposición · Síntesis conjunta','Equipo completo','diapos'],
  ['IAjedrez - Documento Grupal.docx','IAjedrez — Documento Grupal','Equipo completo','docs'],
];
const list=document.querySelector('#document-list');
list.innerHTML=documents.map(([file,title,author,category],index)=>`<article class="document-row" data-category="${category}" data-index="${index}"><span class="file-type">${file.split('.').pop().toUpperCase()}</span><div><h3>${title}</h3><p>${author} · ${category==='docs'?'Documentos y lecturas':'Diapositivas del proceso'}</p></div><a href="${asset('materiales/'+encodeURIComponent(file))}" download aria-label="Descargar ${title}, ${author}">Descargar <span aria-hidden="true">↓</span></a></article>`).join('');
let category='todos';
const normalize=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function filterDocuments(){
  const query=normalize(document.querySelector('#document-search').value.trim());
  let count=0;
  list.querySelectorAll('.document-row').forEach(row=>{
    const match=(category==='todos'||category===row.dataset.category)&&normalize(documents[Number(row.dataset.index)].join(' ')).includes(query);
    row.hidden=!match;if(match)count++;
  });
  document.querySelector('#document-count').textContent=`${count} ${count===1?'documento disponible':'documentos disponibles'}`;
  document.querySelector('#no-documents').hidden=count>0;
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  category=button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  filterDocuments();
}));
document.querySelector('#document-search').addEventListener('input',filterDocuments);filterDocuments();

const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
menuButton.addEventListener('click',()=>{
  const open=menuButton.getAttribute('aria-expanded')!=='true';
  menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);
});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');
}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('open')){navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.focus();}});
document.querySelector('a[href="#participantes"]').addEventListener('click',()=>document.querySelector('#participantes').open=true);

const dialog=document.querySelector('#image-dialog');
const dialogImage=document.querySelector('#dialog-image');
let dialogTrigger;
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{
  dialogTrigger=button;dialogImage.src=asset(button.dataset.image);dialogImage.alt=button.dataset.caption;
  document.querySelector('#image-caption').textContent=button.dataset.caption;
  document.querySelector('.dialog-image-area').classList.toggle('is-rotated',button.dataset.rotate==='true');
  dialog.showModal();document.body.style.overflow='hidden';
}));
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.style.overflow='';dialogTrigger?.focus();});

const views={
  analisis:{image:'interface.png',caption:'Análisis de partida · La jugada seleccionada conecta el tablero con su explicación.',alt:'Vista de análisis: jugadas, tablero y resumen de errores'},
  inicio:{image:'IAjedrez_inicio.png',caption:'Inicio · Un punto de entrada para comenzar la revisión de una partida.',alt:'Captura de la pantalla de inicio de IAjedrez'},
  aprende:{image:'IAjedrez_vista_aprende.png',caption:'Aprende · Probar alternativas, pedir una pista y volver a la partida.',alt:'Captura del modo Aprende con una actividad sobre el tablero'},
};
const tabs=[...document.querySelectorAll('[data-view]')];
function selectView(button){
  const view=views[button.dataset.view];
  tabs.forEach(tab=>{tab.setAttribute('aria-selected',String(tab===button));tab.tabIndex=tab===button?0:-1;});
  const img=document.querySelector('#prototype-image');img.src=asset('assets/'+view.image);img.alt=view.alt;
  img.parentElement.dataset.image='assets/'+view.image;img.parentElement.dataset.caption=view.caption;
  document.querySelector('#prototype-caption').textContent=view.caption;
  document.querySelector('#prototype-panel').setAttribute('aria-labelledby',button.id);
}
tabs.forEach((button,index)=>{
  button.addEventListener('click',()=>selectView(button));
  button.addEventListener('keydown',event=>{
    let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;
    if(next!==undefined){event.preventDefault();tabs[next].focus();selectView(tabs[next]);}
  });
});
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){navigation.querySelectorAll('a').forEach(link=>{const selected=link.hash===`#${entry.target.id}`;link.classList.toggle('current',selected);if(selected)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}});
},{rootMargin:'-15% 0px -65% 0px',threshold:0});
['proceso','investigacion','prototipo','evaluacion','documentacion'].forEach(id=>observer.observe(document.getElementById(id)));

document.querySelector('#hellen-video').addEventListener('error',()=>document.querySelector('#video-error').hidden=false);
document.querySelector('#hellen-video source').addEventListener('error',()=>document.querySelector('#video-error').hidden=false);
fetch(asset('media.json')).then(response=>{if(!response.ok)throw new Error('No media manifest');return response.json();}).then(manifest=>{
  if(!manifest.mauricio)return;
  const section=document.querySelector('#mauricio-session');
  const source=asset(manifest.mauricio);
  section.classList.remove('pending');
  section.querySelector('.status').classList.add('available');section.querySelector('.status').textContent='Registro disponible';
  section.querySelector(':scope > p').textContent='Evaluación con usuarios · Segunda sesión';
  const video=document.createElement('video');video.controls=true;video.playsInline=true;video.preload='metadata';video.src=source;video.setAttribute('aria-label','Entrevista de evaluación de Mauricio a Jair');
  section.querySelector('.pending-media').replaceWith(video);
  const link=document.createElement('a');link.href=source;link.download='';link.textContent='Descargar video ↓';
  section.querySelector('.evaluation-bottom').replaceChildren(link);
}).catch(()=>{/* Preserve the truthful, pending state if the optional manifest is unavailable. */});
