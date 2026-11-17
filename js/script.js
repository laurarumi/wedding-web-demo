
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



const story = document.querySelector(".story-reveal");
const leftDoor = document.querySelector(".story-photo1");
const rightDoor = document.querySelector(".story-photo2");

function updateStoryDoors() {
    if (!story || !leftDoor || !rightDoor) return;

    const rect = story.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Progress from 0 (closed) to 1 (fully open)
  const scrollDistance = window.innerHeight * 0.7;

const progress = Math.max(
    0,
    Math.min(
        1,
        (windowHeight * 0.8 - rect.top) / scrollDistance
    )
);

    // Slide each image outwards
    leftDoor.style.transform =
        `translateX(${-progress * 100}%)`;

    rightDoor.style.transform =
        `translateX(${progress * 100}%)`;
}

window.addEventListener("scroll", updateStoryDoors);
window.addEventListener("resize", updateStoryDoors);

updateStoryDoors();

const storyImages = document.querySelectorAll(
    ".story-photo1 img, .story-photo2 img"
);

storyImages.forEach(image => {

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;

    image.addEventListener("pointerdown", event => {
        event.preventDefault();

        image.setPointerCapture(event.pointerId);

        startX = event.clientX - currentX;
        startY = event.clientY - currentY;

        image.style.transition = "none";
    });

    image.addEventListener("pointermove", event => {
        if (!image.hasPointerCapture(event.pointerId)) return;

        currentX = event.clientX - startX;
        currentY = event.clientY - startY;

        image.style.transform =
            `translate(${currentX}px, ${currentY}px)`;
    });

    function returnImage() {
        image.style.transition = "transform 0.4s ease";

        currentX = 0;
        currentY = 0;

        image.style.transform = "translate(0, 0)";
    }

    image.addEventListener("pointerup", returnImage);
    image.addEventListener("pointercancel", returnImage);

});




const infoButtons = document.querySelectorAll(".info-button");

infoButtons.forEach(button => {
    button.addEventListener("click", () => {
        const details = button.nextElementSibling;
        const isOpen = button.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            details.classList.remove("is-open");
            button.setAttribute("aria-expanded", "false");

            setTimeout(() => {
                details.hidden = true;
            }, 300);
        } else {
            details.hidden = false;

            // Allow the browser to apply the initial styles first
            requestAnimationFrame(() => {
                details.classList.add("is-open");
            });

            button.setAttribute("aria-expanded", "true");
        }
    });
});

