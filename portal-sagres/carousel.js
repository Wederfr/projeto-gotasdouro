document.addEventListener('DOMContentLoaded', function () {
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    if (!slides.length) return;

    const DISPLAY_TIME = 5000; // 5 segundos por imagem
    const FADE_TIME = 1500;    // 1.5 segundos de transição 

    let current = 0;
    let timerId = null;
    let isTransitioning = false;

    
    slides.forEach((slide, i) => {
        slide.style.opacity = (i === 0) ? '1' : '0';
        slide.style.zIndex = (i === 0) ? '2' : '1';
        slide.classList.remove('active');
    });

    
    function scheduleNext(delayMs) {
        clearTimeout(timerId);
        timerId = setTimeout(tick, delayMs);
    }

    
    function tick() {
        if (isTransitioning) return; 

        isTransitioning = true;

        const next = (current + 1) % slides.length;
        const currentSlide = slides[current];
        const nextSlide = slides[next];

        
        nextSlide.style.zIndex = '3';
        nextSlide.style.opacity = '1';

        
        setTimeout(() => {
            currentSlide.style.opacity = '0';
            currentSlide.style.zIndex = '1';

            nextSlide.style.zIndex = '2';
            current = next;

            isTransitioning = false;

            
            scheduleNext(DISPLAY_TIME);
        }, FADE_TIME);
    }

    
    scheduleNext(DISPLAY_TIME);
});