document.addEventListener("DOMContentLoaded", function () {
    const stickerFolder = "stickers/";
    const stickerContainer = document.body;
    const stickerFormats = ["webm", "webp", "tgs"];
    const container = document.querySelector(".container");

    function getRandomPosition(max, safeStart, safeEnd) {
        let pos;
        do {
            pos = Math.floor(Math.random() * max);
        } while (pos >= safeStart && pos <= safeEnd);
        return pos;
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
            const containerRect = container.getBoundingClientRect();
            const safeTopStart = containerRect.top;
            const safeTopEnd = containerRect.bottom;

            sticker.style.position = "absolute";
            sticker.style.left = `${getRandomPosition(window.innerWidth - sticker.clientWidth, containerRect.left, containerRect.right)}px`;
            sticker.style.top = `${getRandomPosition(window.innerHeight - sticker.clientHeight, safeTopStart, safeTopEnd)}px`;
        } : null;

        sticker.addEventListener("loadeddata", () => {
            if (stickerName.endsWith(".webm")) {
                const containerRect = container.getBoundingClientRect();
                const safeTopStart = containerRect.top;
                const safeTopEnd = containerRect.bottom;

                sticker.style.position = "absolute";
                sticker.style.left = `${getRandomPosition(window.innerWidth - sticker.clientWidth, containerRect.left, containerRect.right)}px`;
                sticker.style.top = `${getRandomPosition(window.innerHeight - sticker.clientHeight, safeTopStart, safeTopEnd)}px`;
            }
        });

        stickerContainer.appendChild(sticker);
    }

    window.onload = function () {
        for (let i = 1; i <= 29; i++) {
            stickerFormats.forEach(format => addSticker(`sticker${i}.${format}`));
        }
    };

    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");
    const textElement = document.getElementById("valentineText");
    const imageElement = document.getElementById("valentineImage");

    let yesButtonSize = 16;
    let phraseIndex = 0;

    const phrases = [
        "No",
        "Are you sure?",
        "What if I asked really nicely?",
        "Pretty please",
        "With a chocolate rice cake on top",
        "What about a matcha frostie",
        "PLEASE POOKIE",
        "But :*(",
        "I am going to die",
        "Yep I'm dead",
        "Ok, you're talking to Nathan's ghost",
        "Please babe",
        ":((((",
        "PRETTY PLEASE",
        "Estoy muerto",
        "No :(",
    ];

    noButton.addEventListener("click", function () {
        noButton.innerText = phrases[phraseIndex]; // Update No button text
        phraseIndex = (phraseIndex + 1) % phrases.length; // Loop back to start

        yesButtonSize += 5;
        yesButton.style.fontSize = `${yesButtonSize}px`;
    });

    yesButton.addEventListener("click", function () {
        textElement.innerText = "Yeeee I also love you so much!!!";
        imageElement.src = "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif";
        document.querySelector(".buttons").remove();
    });
});
