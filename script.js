
const slider = document.getElementById("slider");
const slidesOriginal = Array.from(slider.children); // récupère les slides existantes
let index = 0; // slide centrale


function renderSlider() {
    const isMobile = window.innerWidth <= 1100;
    const n = slidesOriginal.length;

    // Vide le slider pour le réorganiser
    slider.innerHTML = "";

    let visibleSlides = [];

    if (isMobile) {
        // 1 slide centrée sur mobile
        visibleSlides.push(slidesOriginal[index]);
    } else {
        // 3 slides sur desktop
        const left   = slidesOriginal[(index - 1 + n) % n];
        const center = slidesOriginal[index];
        const right  = slidesOriginal[(index + 1) % n];

        visibleSlides.push(left, center, right);
    }

    // Ajoute les slides visibles dans le DOM
    visibleSlides.forEach(slide => slider.appendChild(slide));

    // Relance toutes les vidéos visibles
    visibleSlides.forEach(slide => {
        const videos = slide.querySelectorAll("video");
        videos.forEach(video => {
            video.pause();       // assure qu'on redémarre proprement
            video.currentTime = 0;
            video.play().catch(() => {}); // catch pour éviter les erreurs si autoplay bloqué
        });
    });
}


// Navigation
function moveSlide(direction){
    const n = slidesOriginal.length;
    index = (index + direction + n) % n;
    renderSlider();
}

// Flèches
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");

arrowLeft.addEventListener("click", () => moveSlide(-1));
arrowRight.addEventListener("click", () => moveSlide(1));

// Initialisation
renderSlider();
window.addEventListener("resize", renderSlider);

// Optionnel : uniquement sur mobile
function updateArrowsVisibility() {
    const isMobile = window.innerWidth <= 1100;
    arrowLeft.style.display = "flex";
    arrowRight.style.display = "flex";
}
updateArrowsVisibility();
window.addEventListener("resize", updateArrowsVisibility);
