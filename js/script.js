
const image = document.querySelector(".main-hero-img");
const storyImages = document.querySelectorAll(
    ".story-photo1 .photo-inner, .story-photo2 .photo-inner"
);
const dragHint = document.querySelector(".drag-hint");


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

let wiggleTriggered = false;

function updateStoryDoors() {
    if (!story || !leftDoor || !rightDoor) return;

    const rect = story.getBoundingClientRect();
    const windowHeight = window.innerHeight;

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

    // Trigger wiggle when images are fully open
    if (progress === 1 && !wiggleTriggered) {

    wiggleTriggered = true;

    setTimeout(() => {
    dragHint.classList.add("visible");
    }, 1000);

    // First wiggle after 5 seconds
    setTimeout(() => {

        storyImages.forEach(image => {
            image.classList.add("wiggle");
        });

        // Remove the class after the animation finishes
        setTimeout(() => {

            storyImages.forEach(image => {
                image.classList.remove("wiggle");
            });

            // Second wiggle after another 10 seconds
            setTimeout(() => {

                storyImages.forEach(image => {
                    image.classList.add("wiggle");
                });

            }, 15000);

        }, 1200);

    }, 2000);
}
}

window.addEventListener("scroll", updateStoryDoors);
window.addEventListener("resize", updateStoryDoors);

updateStoryDoors();


const draggableImages = document.querySelectorAll(
    ".story-photo1 img, .story-photo2 img"
);

draggableImages.forEach(image => {

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;

    image.addEventListener("pointerdown", event => {
        event.preventDefault();

         dragHint.classList.add("hidden");

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


function updateInformationHeight() {
    const section = document.querySelector(".information");
    const openDetails = section.querySelectorAll(
        ".info-details.is-open"
    );

    section.style.minHeight = "100svh";

    const sectionRect = section.getBoundingClientRect();

    let requiredHeight = sectionRect.height;

    openDetails.forEach(details => {
        const detailsRect = details.getBoundingClientRect();

        const bottomPosition =
            detailsRect.bottom - sectionRect.top + 30;

        requiredHeight = Math.max(
            requiredHeight,
            bottomPosition
        );
    });

    section.style.minHeight =
        `max(100svh, ${requiredHeight}px)`;
}

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
                 updateInformationHeight();
            }, 300);
        } else {
            details.hidden = false;

            // Allow the browser to apply the initial styles first
            requestAnimationFrame(() => {
                details.classList.add("is-open");
                updateInformationHeight();
            });

            button.setAttribute("aria-expanded", "true");
        }
    });
});

