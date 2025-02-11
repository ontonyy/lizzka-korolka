document.addEventListener("DOMContentLoaded", function () {
    const stickerFolder = "sticker/"; // Path to sticker folder
    const stickerContainer = document.body;

    function getRandomPosition(max) {
        return Math.floor(Math.random() * max);
    }

    function addSticker(stickerName) {
        const sticker = document.createElement("video");
        sticker.src = `${stickerFolder}${stickerName}`;
        sticker.autoplay = true;
        sticker.loop = true;
        sticker.muted = true;
        sticker.playsInline = true;
        sticker.classList.add("sticker");

        // Set random position
        sticker.style.left = `${getRandomPosition(window.innerWidth - 100)}px`;
        sticker.style.top = `${getRandomPosition(window.innerHeight - 100)}px`;

        stickerContainer.appendChild(sticker);
    }

    // Load stickers with numbers 1 to 10
    for (let i = 1; i <= 10; i++) {
        addSticker(`sticker${i}.webm`);
    }
});