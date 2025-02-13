document.addEventListener("DOMContentLoaded", function () {
    const stickerFolder = "stickers/";
    const stickerFormats = ["webm", "webp", "tgs"];
    const container = document.querySelector(".container");
    const stickerContainer = document.body;
    const videoElement = document.getElementById("valentineVideo");

    // Create an extended area at the bottom for more stickers
    const extendedArea = document.createElement("div");
    extendedArea.id = "extended-area";
    document.body.appendChild(extendedArea);

    const stickers = [];
    const stickerSize = 100;
    const maxTries = 200;
    const pageHeight = document.body.scrollHeight + window.innerHeight; // More height
    const maxStickers = window.innerWidth < 600 ? 12 : 25; // Reduce stickers for small screens

    function getRandomPosition(max, padding = 0) {
        return Math.floor(Math.random() * (max - stickerSize - padding));
    }

    function isOverlapping(newX, newY) {
        return stickers.some(sticker => {
            const dx = sticker.x - newX;
            const dy = sticker.y - newY;
            return Math.sqrt(dx * dx + dy * dy) < stickerSize * 1.5; // Prevent overlap
        });
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
            sticker.style.backgroundColor = "transparent";

            // Fix autoplay issue
            sticker.oncanplay = () => {
                sticker.play().catch(() => console.warn("Autoplay blocked for sticker", stickerName));
            };
        }

        sticker.onerror = () => {
            console.warn(`Sticker ${stickerName} failed to load and will be removed.`);
            sticker.remove();
        };

        let attempts = 0;
        let newX, newY;
        do {
            newX = getRandomPosition(window.innerWidth, 20);
            newY = getRandomPosition(pageHeight, 20);
            attempts++;
        } while (isOverlapping(newX, newY) && attempts < maxTries);

        if (attempts < maxTries) {
            stickers.push({ x: newX, y: newY });
            sticker.style.position = "absolute";
            sticker.style.left = `${newX}px`;
            sticker.style.top = `${newY}px`;
            stickerContainer.appendChild(sticker);
        }
    }

    function playVideo(video) {
        video.play().catch(() => {
            console.warn("Autoplay blocked, requiring user interaction.");
        });
    }

    window.onload = function () {
        for (let i = 1; i <= maxStickers; i++) {
            stickerFormats.forEach(format => addSticker(`sticker${i}.${format}`));
        }
    };

    document.body.addEventListener("click", function () {
        playVideo(videoElement);

        // Fix for all WebM stickers (force play on interaction)
        document.querySelectorAll("video.sticker").forEach(video => {
            video.play().catch(() => console.warn("Sticker autoplay blocked"));
        });
    }, { once: true });

    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");
    const textElement = document.getElementById("valentineText");

    let yesButtonSize = 16;
    let phraseIndex = 0;

    const phrases = [
        "ЧТО РЕАЛЬНО НЕТ??",
        "Ты уверена?",
        "Что если я спрошу по-другому?",
        "Ну пожааалуйста",
        "Пару милка шоколадок, чокопай и макси кинг, всё равно нет?",
        "Что на счёт пампкин фраппучино?",
        "Пожалуйста чемпионка",
        "Но блиинн :*(((",
        "Я умру так :(((",
        "Всё я умер",
        "Ок, ты разговариваешь с призраком уже",
        "Пожалуйста девушка",
        ":((((",
        "Прошу ну пожалуйста, одумайся",
        "НЕТ :((((",
    ];

    noButton.addEventListener("click", function () {
        noButton.innerText = phrases[phraseIndex];
        phraseIndex = (phraseIndex + 1) % phrases.length;

        yesButtonSize += 5;
        yesButton.style.fontSize = `${yesButtonSize}px`;
    });

    yesButton.addEventListener("click", function () {
        textElement.innerText = "Дааааа это победа, люблю тебя очень сильно, ты моя любимая валентинка и лучшая девушка!!!";

        videoElement.innerHTML = `<source src="stickers/sticker1.webm" type="video/webm">`;
        videoElement.load();
        playVideo(videoElement);

        document.querySelector(".buttons").remove();
    });
});
