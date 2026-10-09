const quizQuestions = [
    { question: "¿Cómo se llama la piedra que le da poder y origen al Espikos, siendo la fuente más poderosa de su universo?", options: ["Piedra Filosofal", "CRACK", "Andromedita", "Piedra Espiko"], correct: 2 },
    { question: "¿Es verdad que Elías Varnet, durante sus años de investigación con la piedra, logró obtener temporalmente un estado de inmortalidad?", options: ["Cierto", "Falso"], correct: 0 },
    { question: "¿Qué le ocurrió a Varnet en su rostro durante el experimento en la caverna para alcanzar el poder absoluto?", options: ["Una cicatriz menor", "Un fragmento alteró su ojo izquierdo", "Quedó completamente ciego", "Ninguna de las anteriores"], correct: 1 },
    { question: "¿Es cierto que Spike experimenta dudas y temores internos a pesar de poseer un gran poder?", options: ["Sí, es parte de su naturaleza", "No, él es invulnerable emocionalmente"], correct: 0 },
    { question: "¿Cuáles son las siglas que dan nombre al Proyecto S.P.K?", options: ["Señal de Paso Kilométrico", "Sentido de Partido Kiwi", "Servicio de Prevención de Kaos", "Sujeto de Potencial Kinésico"], correct: 3 },
    { question: "¿Cómo se llama la ciudad principal donde transcurren los eventos del Espikos?", options: ["Ciudad Gótica", "Metrópolis", "Ciudad Seltsamer", "Neo-City"], correct: 2 }
];

let currentQuestion = 0;
let quizScore = 0;
let quizAnswered = false;

function startQuiz() {
    document.getElementById('hub-menu').classList.add('hidden');
    document.getElementById('novel-hub').classList.add('hidden');
    document.getElementById('reader-section').classList.add('hidden');
    
    const quizSection = document.getElementById('quiz-section');
    quizSection.classList.remove('hidden');
    
    currentQuestion = 0;
    quizScore = 0;
    renderQuizQuestion();
}

function renderQuizQuestion() {
    quizAnswered = false;
    const q = quizQuestions[currentQuestion];
    const quizSection = document.getElementById('quiz-section');

    quizSection.innerHTML = `
        <button class="back-hub-btn" onclick="playSound('click'); returnToHub();">⬅ Volver al inicio</button>
        <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 8px;">Pregunta ${currentQuestion + 1} de ${quizQuestions.length}</div>
        <div style="font-size: 1.3rem; font-weight: bold; margin-bottom: 20px; color: var(--text-main);">${q.question}</div>
        <div style="display: flex; flex-direction: column; gap: 12px;" id="quiz-options-list"></div>
    `;

    const optionsList = document.getElementById('quiz-options-list');
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'section-card';
        btn.style.padding = '14px 18px';
        btn.style.flexDirection = 'row';
        btn.style.alignItems = 'center';
        btn.style.cursor = 'pointer';
        btn.innerText = opt;
        btn.onclick = () => handleQuizAnswer(index, btn);
        optionsList.appendChild(btn);
    });
}

function handleQuizAnswer(selectedIndex, btn) {
    if (quizAnswered) return;
    quizAnswered = true;

    const q = quizQuestions[currentQuestion];
    const optionsList = document.getElementById('quiz-options-list').children;

    if (selectedIndex === q.correct) {
        btn.style.borderColor = 'var(--correct)';
        btn.style.background = 'rgba(34, 197, 94, 0.15)';
        playSound('click');
        quizScore++;
    } else {
        btn.style.borderColor = 'var(--incorrect)';
        btn.style.background = 'rgba(239, 68, 68, 0.15)';
        optionsList[q.correct].style.borderColor = 'var(--correct)';
        optionsList[q.correct].style.background = 'rgba(34, 197, 94, 0.15)';
        playSound('click');
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            renderQuizQuestion();
        } else {
            showQuizResults();
        }
    }, 1300);
}

function showQuizResults() {
    const quizSection = document.getElementById('quiz-section');
    quizSection.innerHTML = `
        <button class="back-hub-btn" onclick="playSound('click'); returnToHub();">⬅ Volver al inicio</button>
        <div style="text-align: center; padding: 30px;">
            <h2 style="font-size: 2rem; margin-bottom: 10px; color: var(--accent);">¡Quiz Finalizado!</h2>
            <div style="font-size: 3.5rem; font-weight: bold; color: var(--primary); margin-bottom: 15px;">${quizScore} / ${quizQuestions.length}</div>
            <p style="color: var(--text-muted); margin-bottom: 25px; font-size: 1.1rem;">¡Gracias por poner a prueba tus conocimientos sobre el universo de El Espikos!</p>
            <button class="enter-btn" onclick="playSound('click'); startQuiz()">Volver a intentar</button>
        </div>
    `;
}
