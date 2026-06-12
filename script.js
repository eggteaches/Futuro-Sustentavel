document.addEventListener("DOMContentLoaded", function () {

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
    revealOnScroll(); // Chamada inicial

    // --- 2. Lógica das Partículas Verdes nas Seções de Texto ---
    const contentSections = document.querySelectorAll('.content-section');

    contentSections.forEach(section => {
        // Criar 15 partículas para cada seção de conteúdo
        for (let i = 0; i < 15; i++) {
            let particle = document.createElement('span');
            particle.classList.add('section-particle');

            // Posição horizontal aleatória (0% a 100% da largura da seção)
            particle.style.left = Math.random() * 100 + '%';

            // Posição vertical aleatória (0% a 100% da altura da seção)
            particle.style.top = Math.random() * 100 + '%';

            // Duração da animação aleatória (entre 8s e 18s para ficarem dessincronizadas)
            particle.style.animationDuration = (Math.random() * 10 + 8) + 's';

            // Atraso de animação aleatório (para não começarem todas juntas)
            particle.style.animationDelay = (Math.random() * 5) + 's';

            // Tamanho aleatório sutil
            const size = Math.random() * 3 + 2; // entre 2px e 5px
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            section.appendChild(particle);
        }
    });
});