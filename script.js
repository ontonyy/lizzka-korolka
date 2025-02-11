document.addEventListener("DOMContentLoaded", function () {
    const sticker = document.getElementById("sticker");

    function placeRandomly() {
        const maxX = window.innerWidth - sticker.clientWidth;
        const maxY = window.innerHeight - sticker.clientHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        sticker.style.left = `${randomX}px`;
        sticker.style.top = `${randomY}px`;
    }

    placeRandomly();
    window.addEventListener("resize", placeRandomly); // Reposition on resize
});