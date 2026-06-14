document.addEventListener("DOMContentLoaded", function () {
    // --- Lógica do Botão Voltar ao Topo ---
    const backToTopBtn = document.getElementById("backToTopBtn");

    window.addEventListener("scroll", () => {
        // Calcula o total da página que pode ser rolada
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Mostra o botão se a rolagem passar de 50% (metade da página)
        if (window.scrollY > scrollableHeight / 2) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    // Ação de clique para voltar suavemente ao topo
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // --- 1. Lógica do Scroll Reveal ---
    const reveals = document.querySelectorAll(".reveal");

    function revealOnScroll() {
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // --- 2. Lógica das Partículas Verdes ---
    const contentSections = document.querySelectorAll('.content-section');

    contentSections.forEach(section => {
        for (let i = 0; i < 15; i++) {
            let particle = document.createElement('span');
            particle.classList.add('section-particle');

            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';

            const size = Math.random() * 3 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            section.appendChild(particle);
        }
    });

    // --- 3. LÓGICA DE CURIOSIDADES ---
    const curiositiesArray = [
        "A internet consome muita energia! Se fosse um país, a internet seria o 6º maior consumidor de eletricidade do mundo.",
        "Reciclar uma única lata de alumínio economiza energia suficiente para manter uma televisão ligada por 3 horas ininterruptas.",
        "Aproximadamente 1/3 de toda a comida produzida no mundo é desperdiçada, o que contribui com impressionantes 8% das emissões globais de gases de efeito estufa.",
        "Uma única árvore adulta pode absorver até 22 kg de dióxido de carbono por ano e produzir oxigênio suficiente para duas pessoas respirarem.",
        "Cerca de 8 milhões de toneladas de plástico acabam nos oceanos todos os anos. É o equivalente a despejar um caminhão de lixo cheio de plástico no mar a cada minuto.",
        "Substituir viagens curtas de carro por bicicleta ou caminhada poderia reduzir as emissões de carbono do transporte urbano em até 11% globalmente."
    ];

    let currentCuriosityIndex = 0;
    const btnCuriosity = document.getElementById("btn-curiosity");
    const textCuriosity = document.getElementById("curiosity-text");

    if (btnCuriosity && textCuriosity) {
        btnCuriosity.addEventListener("click", () => {
            textCuriosity.innerText = `"${curiositiesArray[currentCuriosityIndex]}"`;
            currentCuriosityIndex = (currentCuriosityIndex + 1) % curiositiesArray.length;
            btnCuriosity.innerText = "Ver Outra Curiosidade";
        });
    }

    // --- 4. LÓGICA DO QUIZ INTERATIVO ---
    const questions = [
        {
            question: "O que caracteriza o modelo de Economia Circular?",
            answers: [
                { text: "Extrair recursos, produzir bens e descartá-los rapidamente.", correct: false },
                { text: "Priorizar o uso de plásticos de uso único e recicláveis.", correct: false },
                { text: "Manter materiais em uso pelo maior tempo possível e regenerar sistemas naturais.", correct: true },
                { text: "Aumentar a obsolescência programada de eletrônicos.", correct: false }
            ]
        },
        {
            question: "Qual é o conceito principal das 'Cidades de 15 Minutos' na mobilidade urbana?",
            answers: [
                { text: "Cidades onde o trânsito de carros flui a no máximo 15 km/h.", correct: false },
                { text: "Acesso a serviços essenciais, trabalho e lazer a uma curta caminhada de 15 minutos.", correct: true },
                { text: "Limitar o tempo de permanência em espaços públicos a 15 minutos.", correct: false },
                { text: "Incentivar viagens de avião com duração máxima de 15 minutos.", correct: false }
            ]
        },
        {
            question: "Qual é a principal causa atual da perda global de biodiversidade?",
            answers: [
                { text: "Expansão agrícola irresponsável e destruição de habitats.", correct: true },
                { text: "Poluição sonora urbana.", correct: false },
                { text: "Tempestades solares intensificadas.", correct: false },
                { text: "Caça esportiva controlada.", correct: false }
            ]
        },
        {
            question: "Na área de Ação Climática, o que é o 'Hidrogênio Verde'?",
            answers: [
                { text: "Hidrogênio extraído diretamente de algas marinhas.", correct: false },
                { text: "Combustível fóssil modificado quimicamente com corantes naturais.", correct: false },
                { text: "Hidrogênio obtido por eletrólise da água utilizando fontes de energia renováveis.", correct: true },
                { text: "Hidrogênio produzido a partir de energia nuclear de baixa radiação.", correct: false }
            ]
        },
        {
            question: "Qual prática está fortemente alinhada à agricultura regenerativa?",
            answers: [
                { text: "Monocultura extensiva e uso excessivo de agrotóxicos químicos.", correct: false },
                { text: "Desmatamento de matas ciliares para aumentar o pasto.", correct: false },
                { text: "Queimadas regulares para 'limpar' o solo antes do plantio.", correct: false },
                { text: "Rotação de culturas e recuperação constante da saúde biológica do solo.", correct: true }
            ]
        }
    ];

    const questionElement = document.getElementById("question-text");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const trackerText = document.getElementById("question-tracker");
    const quizContainer = document.getElementById("quiz-container");
    const resultContainer = document.getElementById("result-container");
    const scoreText = document.getElementById("score-text");
    const feedbackText = document.getElementById("feedback-text");
    const restartButton = document.getElementById("restart-btn");

    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        quizContainer.style.display = "block";
        resultContainer.style.display = "none";
        nextButton.innerHTML = "Próxima Pergunta";
        showQuestion();
    }

    function showQuestion() {
        resetState();
        let currentQuestion = questions[currentQuestionIndex];
        trackerText.innerText = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
        questionElement.innerText = currentQuestion.question;

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerText = answer.text;
            button.classList.add("quiz-btn");
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
            answerButtons.appendChild(button);
        });
    }

    function resetState() {
        nextButton.style.display = "none";
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";

        if (isCorrect) {
            selectedBtn.classList.add("correct");
            score++;
        } else {
            selectedBtn.classList.add("wrong");
        }

        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
            button.style.cursor = "not-allowed";
        });

        nextButton.style.display = "block";
    }

    function showScore() {
        resetState();
        quizContainer.style.display = "none";
        resultContainer.style.display = "block";

        scoreText.innerText = `Você acertou ${score} de ${questions.length}!`;

        if (score === 5) {
            feedbackText.innerText = "Excelente! Você é um verdadeiro especialista em sustentabilidade e compreende a importância das nossas ações no futuro do planeta.";
        } else if (score >= 3) {
            feedbackText.innerText = "Muito bom! Você tem um ótimo conhecimento sobre o futuro sustentável, mas sempre há espaço para aprender mais.";
        } else {
            feedbackText.innerText = "Parece que você precisa reler alguns pontos. A sustentabilidade é um tema vasto, volte aos textos acima para absorver mais detalhes!";
        }
    }

    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }

    if (nextButton && restartButton) {
        nextButton.addEventListener("click", handleNextButton);
        restartButton.addEventListener("click", startQuiz);
        startQuiz();
    }

    // --- 5. LÓGICA DO FAQ ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- 6. LÓGICA DO PAINEL DE CIDADES DO PARANÁ ---
    const citiesData = [
        { cidade: "Curitiba", regiao: "Leste", indice: 86.4, energia: "91%", residuos: "Coleta avançada", status: "Referência", statusClass: "status-good" },
        { cidade: "Foz do Iguaçu", regiao: "Oeste", indice: 88.5, energia: "98%", residuos: "Coleta seletiva", status: "Referência", statusClass: "status-good" },
        { cidade: "Maringá", regiao: "Norte", indice: 82.1, energia: "85%", residuos: "Programas de reciclagem", status: "Referência", statusClass: "status-good" },
        { cidade: "Londrina", regiao: "Norte", indice: 78.2, energia: "80%", residuos: "Coleta em expansão", status: "Em evolução", statusClass: "status-warn" },
        { cidade: "Cascavel", regiao: "Oeste", indice: 75.0, energia: "82%", residuos: "Gestão mista", status: "Em evolução", statusClass: "status-warn" },
        { cidade: "Toledo", regiao: "Oeste", indice: 79.5, energia: "85%", residuos: "Reciclagem crescente", status: "Em evolução", statusClass: "status-warn" },
        { cidade: "Guarapuava", regiao: "Centro-Sul", indice: 74.3, energia: "80%", residuos: "Infraestrutura em desenv.", status: "Em evolução", statusClass: "status-warn" },
        { cidade: "Paranavaí", regiao: "Noroeste", indice: 72.8, energia: "78%", residuos: "Coleta parcial", status: "Em evolução", statusClass: "status-warn" },
        { cidade: "Umuarama", regiao: "Noroeste", indice: 71.0, energia: "74%", residuos: "Coleta seletiva", status: "Em evolução", statusClass: "status-warn" },
        { cidade: "Apucarana", regiao: "Norte", indice: 69.4, energia: "70%", residuos: "Gestão mista", status: "Atenção", statusClass: "status-alert" },
        { cidade: "Ponta Grossa", regiao: "Leste", indice: 68.5, energia: "75%", residuos: "Desafios logísticos", status: "Atenção", statusClass: "status-alert" },
        { cidade: "Colombo", regiao: "Leste", indice: 62.0, energia: "68%", residuos: "Desafios estruturais", status: "Atenção", statusClass: "status-alert" }
    ];

    const dashboardBody = document.getElementById('dashboard-body');
    const citySearch = document.getElementById('city-search');
    const regionFilters = document.querySelectorAll('.filter-btn');

    let currentSearchTerm = "";
    let currentRegion = "Todas";

    function renderTable() {
        dashboardBody.innerHTML = ""; // Limpa a tabela

        // Filtra os dados
        const filteredData = citiesData.filter(city => {
            const matchSearch = city.cidade.toLowerCase().includes(currentSearchTerm.toLowerCase());
            const matchRegion = currentRegion === "Todas" || city.regiao === currentRegion;
            return matchSearch && matchRegion;
        });

        // Caso nenhuma cidade seja encontrada
        if (filteredData.length === 0) {
            dashboardBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: rgba(255,255,255,0.5);">Nenhuma cidade encontrada com os filtros atuais.</td></tr>`;
            return;
        }

        // Renderiza as linhas
        filteredData.forEach(city => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td><strong>${city.cidade}</strong></td>
                <td>${city.regiao}</td>
                <td>
                    <div class="index-container">
                        <div class="progress-bg">
                            <div class="progress-fill" style="width: ${city.indice}%;"></div>
                        </div>
                        <span>${city.indice}</span>
                    </div>
                </td>
                <td>⚡ ${city.energia}</td>
                <td>♻️ ${city.residuos}</td>
                <td><span class="status-badge ${city.statusClass}">${city.status}</span></td>
            `;

            dashboardBody.appendChild(tr);
        });
    }

    // Evento de busca por texto
    if (citySearch) {
        citySearch.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value;
            renderTable();
        });
    }

    // Evento dos botões de região
    regionFilters.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove a classe 'active' de todos
            regionFilters.forEach(b => b.classList.remove('active'));
            // Adiciona no clicado
            e.target.classList.add('active');

            currentRegion = e.target.getAttribute('data-region');
            renderTable();
        });
    });

    // Inicia a tabela preenchida se os elementos existirem
    if (dashboardBody) {
        renderTable();
    }

});