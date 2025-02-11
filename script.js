document.addEventListener("DOMContentLoaded", function () {
    const stickerFolder = "stickers/"; // Path to sticker folder
    const stickerContainer = document.body;
    const stickerFormats = ["webm", "webp"];

    function getRandomPosition(max, offset) {
        return Math.floor(Math.random() * (max - offset));
    }

    function addSticker(stickerName) {
        const sticker = document.createElement(stickerName.endsWith(".webm") ? "video" : "img");
        sticker.src = `${stickerFolder}${stickerName}`;
        sticker.classList.add("sticker");

        if (stickerName.endsWith(".webm")) {
            sticker.autoplay = true;
            sticker.loop = true;
            sticker.muted = true;
            sticker.playsInline = true;
        }

        sticker.onload = () => {
            const offsetX = sticker.clientWidth || 100;
            const offsetY = sticker.clientHeight || 100;
            sticker.style.left = `${getRandomPosition(window.innerWidth, offsetX)}px`;
            sticker.style.top = `${getRandomPosition(window.innerHeight, offsetY)}px`;
        };

        stickerContainer.appendChild(sticker);
    }

    // Load stickers with numbers 1 to 10 in multiple formats
    for (let i = 1; i <= 10; i++) {
        stickerFormats.forEach(format => addSticker(`sticker${i}.${format}`));
    }
});