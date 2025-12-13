const textSection = document.getElementById("textSection");
const videoContainer = document.getElementById("videoContainer");

window.addEventListener("scroll", () => {
    const trigger = window.innerHeight * 0.5;

    if (textSection.getBoundingClientRect().top < trigger) {
        textSection.classList.add("visible");
        videoContainer.classList.add("scrolled");
    } else {
        textSection.classList.remove("visible");
        videoContainer.classList.remove("scrolled");
    }
});


document.querySelector('.scroll-indicator').addEventListener('click', () => {
    const section = document.getElementById('textSection');
    if (!section) return;

    section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

