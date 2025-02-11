document.addEventListener("DOMContentLoaded", function () {
    const stickerFolder = "stickers/";
    const stickerContainer = document.body;
    const stickerFormats = ["webm", "webp", "tgs"];

    function getRandomPosition(max) {
        return Math.floor(Math.random() * max);
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

        sticker.onerror = () => {
            console.warn(`Sticker ${stickerName} failed to load and will be removed.`);
            sticker.remove();
        };

        sticker.onload = stickerName.endsWith(".webp") || stickerName.endsWith(".tgs") ? () => {
            sticker.style.position = "absolute";
            sticker.style.left = `${getRandomPosition(window.innerWidth - sticker.clientWidth)}px`;
            sticker.style.top = `${getRandomPosition(window.innerHeight - sticker.clientHeight)}px`;
        } : null;

        sticker.addEventListener("loadeddata", () => {
            if (stickerName.endsWith(".webm")) {
                sticker.style.position = "absolute";
                sticker.style.left = `${getRandomPosition(window.innerWidth - sticker.clientWidth)}px`;
                sticker.style.top = `${getRandomPosition(window.innerHeight - sticker.clientHeight)}px`;
            }
        });

        stickerContainer.appendChild(sticker);
    }

    window.onload = function () {
        for (let i = 1; i <= 10; i++) {
            stickerFormats.forEach(format => addSticker(`sticker${i}.${format}`));
        }
    };
});