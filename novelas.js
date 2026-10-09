// Base de datos de novelas y textos completos de El Espikos
const novelsData = [
    {
        title: "Proyecto S.P.K: La sombra que trajo luz",
        chapters: [
            { 
                title: "Capítulo 1: La Caverna y el Ojo", 
                text: `Un equipo científico de una empresa descubre que cerca del núcleo de la tierra hay una especie de poder místico proveniente de una piedra. Elias Varnet, el encargado de la investigación, baja con su equipo para extraer ese poder.

[Interior — Plataforma de descenso. El equipo se prepara.]

CIENTÍFICA 1 (ajustando su visor)
“Presión atmosférica descendiendo. Temperatura estable. ¿Alguien más ve como que las piedras brillan?”

CIENTÍFICO 2 (mirando el suelo con linterna)
“Las rocas… se ven como galaxias adentro.”

VARNET (consultando su tableta)
“El pulso energético está aumentando. Esto es poder puro.”

[El grupo avanza hacia la cámara natural donde descansa la piedra púrpura...]` 
            },
            { 
                title: "Capítulo 2: El Núcleo del Proyecto", 
                text: `Años más tarde Varnet crearía una organización secreta para investigar el potencial de la Andromedita, aprovechando el estado de inmortalidad temporal que la piedra le otorgó en su ojo izquierdo...` 
            },
            { 
                title: "Capítulo 3: Instinto Bajo Control", 
                text: `Doce años después, Spike crece bajo el resguardo y estricto monitoreo del Proyecto SPK, entrenando habilidades que desafían la lógica...` 
            }
        ]
    },
    {
        title: "Proyecto S.P.K: Umbranova",
        chapters: [
            { title: "Capítulo 1: Rutina de Sombras", text: "Ciudad Seltsamer — 04:27 a.m. Los tejados absorben la neblina nocturna mientras Spike vigila desde las alturas..." }
        ]
    },
    {
        title: "Luminiscente: El gran inicio de la luz",
        chapters: [
            { title: "Libro Uno: Luminsword", text: "Año 2013. El mundo experimenta una revolución tecnológica mientras las fuerzas ocultas de la luz comienzan a manifestarse..." }
        ]
    }
];

let currentNovelIndex = 0;
let currentChapterIndex = 0;

function renderNovelList() {
    const gridContainer = document.getElementById('novel-grid-container');
    if (!gridContainer) return;
    gridContainer.innerHTML = '';
    
    novelsData.forEach((novel, index) => {
        const card = document.createElement('div');
        card.className = 'novel-card';
        card.onclick = () => { playSound('click'); loadNovel(index); };
        
        card.innerHTML = `
            <div class="novel-cover-art">LIBRO ${index + 1}</div>
            <div class="novel-info">
                <h3>${novel.title}</h3>
                <p>${novel.chapters.length} capítulos disponibles.</p>
            </div>
        `;
        gridContainer.appendChild(card);
    });
}

function loadNovel(index) {
    currentNovelIndex = index;
    currentChapterIndex = 0;
    document.getElementById('novel-hub').classList.add('hidden');
    document.getElementById('reader-section').classList.remove('hidden');

    const novel = novelsData[index];
    document.getElementById('reader-novel-title').innerText = novel.title;

    const selectEl = document.getElementById('chapter-select');
    selectEl.innerHTML = '';
    novel.chapters.forEach((chap, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.innerText = chap.title;
        selectEl.appendChild(opt);
    });

    displayChapter();
}

function displayChapter() {
    const novel = novelsData[currentNovelIndex];
    const chap = novel.chapters[currentChapterIndex];
    document.getElementById('chapter-content').innerText = chap.text;
    document.getElementById('chapter-select').value = currentChapterIndex;

    document.getElementById('prev-chap-btn').disabled = currentChapterIndex === 0;
    document.getElementById('next-chap-btn').disabled = currentChapterIndex === novel.chapters.length - 1;
    
    document.getElementById('reader-section').scrollTop = 0;
}

function changeChapter(index) {
    currentChapterIndex = parseInt(index);
    displayChapter();
}

function nextChapter() {
    const novel = novelsData[currentNovelIndex];
    if (currentChapterIndex < novel.chapters.length - 1) {
        currentChapterIndex++;
        displayChapter();
    }
}

function prevChapter() {
    if (currentChapterIndex > 0) {
        currentChapterIndex--;
        displayChapter();
    }
}
