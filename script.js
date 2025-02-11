document.addEventListener("DOMContentLoaded", function () {
    const stickerFolder = "stickers/";
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

    fetch(stickerFolder)
        .then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/html");
            const links = [...doc.querySelectorAll("a")]
                .map(a => a.href.split("/").pop())
                .filter(name => name.endsWith(".webm"));

            links.forEach(addSticker);
        })
        .catch(error => console.error("Error loading stickers:", error));
});