document.addEventListener("DOMContentLoaded", function () {
    const stickerFolder = "stickers/";
    const stickerFormats = ["webm", "webp", "tgs"];
    const container = document.querySelector(".container");
    const stickerContainer = document.body;
    const videoElement = document.getElementById("valentineVideo");

    const stickers = [];
    const stickerSize = 80; // Sticker size in pixels
    const maxTries = 100; // Max attempts to find a non-overlapping position
    const maxStickers = window.innerWidth < 600 ? 10 : 20; // Less stickers on small screens

    function getRandomPosition(max) {
        return Math.floor(Math.random() * (max - stickerSize));
    }

    function isOverlapping(newX, newY) {
        return stickers.some(sticker => {
            const dx = sticker.x - newX;
            const dy = sticker.y - newY;
            return Math.sqrt(dx * dx + dy * dy) < stickerSize * 1.2; // Ensure gap
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
            sticker.style.backgroundColor = "transparent"; // Prevent black background
        }

        sticker.onerror = () => {
            console.warn(`Sticker ${stickerName} failed to load and will be removed.`);
            sticker.remove();
        };

        let attempts = 0;
        let newX, newY;
        do {
            newX = getRandomPosition(window.innerWidth);
            newY = getRandomPosition(window.innerHeight - container.offsetHeight);
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
