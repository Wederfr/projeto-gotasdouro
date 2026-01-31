document.addEventListener('DOMContentLoaded', function () {
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    if (slides.length === 0) return;

    const DISPLAY_TIME = 5000;     // tempo que cada imagem fica "no ar"
    const FADE_TIME = 1500;        // precisa bater com CSS: transition 1.5s

    let current = 0;
    let intervalId = null;

    // Estado inicial: primeira visível e no topo
    slides.forEach((slide, i) => {
        slide.style.opacity = (i === 0) ? '1' : '0';
        slide.style.zIndex = (i === 0) ? '2' : '1';
        slide.classList.remove('active'); // não usamos mais a classe active
    });

    function nextSlide() {
        const next = (current + 1) % slides.length;

        const currentSlide = slides[current];
        const nextSlide = slides[next];

        // Coloca a próxima por cima e começa a aparecer
        nextSlide.style.zIndex = '3';
        nextSlide.style.opacity = '1';

        // Depois do fade, esconde a atual e normaliza z-index
        setTimeout(() => {
            currentSlide.style.opacity = '0';
            currentSlide.style.zIndex = '1';

            nextSlide.style.zIndex = '2';
            current = next;
        }, FADE_TIME);
    }

    function start() {
        if (intervalId) return;
        intervalId = setInterval(nextSlide, DISPLAY_TIME);
    }

    function stop() {
        clearInterval(intervalId);
        intervalId = null;
    }

    start();

    const container = document.querySelector('.container');
    if (container) {
        container.addEventListener('mouseenter', stop);
        container.addEventListener('mouseleave', start);
    }
});