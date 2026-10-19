
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
  const scrollDistance = window.innerHeight * 1.4;

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

