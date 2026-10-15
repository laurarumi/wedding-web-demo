
const image = document.querySelector(".main-hero-img");


function updateImageTransform() {
    if (!image) return;

    const rect = image.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Start at 0 and progress as you scroll down
    const scrollDistance = 600;
    const progress = Math.max(
        0,
        Math.min(1, window.scrollY / scrollDistance)
    );

    const rotation = progress * 10;
    const scale = 1 - progress * 0.12;

    image.style.transform = `rotate(${rotation}deg) scale(${scale})`;
}

window.addEventListener("scroll", updateImageTransform);
window.addEventListener("resize", updateImageTransform);

updateImageTransform();
