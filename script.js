document.addEventListener("DOMContentLoaded", function () {
    const stickerFolder = "stickers/";
    const stickerFormats = ["webm", "webp", "tgs"];
    const container = document.querySelector(".container");
    const stickerContainer = document.querySelector(".sticker-container");
    const videoElement = document.getElementById("valentineVideo");

    const stickers = [];
    const stickerSize = 80; // Reduced size for better fit
    const maxTries = 100;
    const maxStickers = 29; // Ensure all 29 stickers appear

    function getRandomPosition(max, padding = 0) {
        return Math.floor(Math.random() * (max - stickerSize - padding));
    }

    function isOverlapping(newX, newY) {
        return stickers.some(sticker => {
            const dx = sticker.x - newX;
            const dy = sticker.y - newY;
            return Math.sqrt(dx * dx + dy * dy) < stickerSize * 1.5;
        });
    }

    function addSticker(stickerName) {
        const isVideo = stickerName.endsWith(".webm");
        const sticker = document.createElement(isVideo ? "video" : "img");
        sticker.classList.add("sticker");

        if (isVideo) {
            sticker.setAttribute("autoplay", true);
            sticker.setAttribute("loop", true);
            sticker.setAttribute("muted", true);
            sticker.setAttribute("playsinline", true);
            sticker.setAttribute("poster", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABpIrGQAAAACVBMVEX////MzMz////tOhMtAAAADUlEQVR4AWOgDhgAAAEWAAUOuHZIAAAAAElFTkSuQmCC");
            sticker.style.backgroundColor = "transparent";
        }

        sticker.src = `${stickerFolder}${stickerName}`;

        sticker.onerror = () => {
            console.warn(`Sticker ${stickerName} failed to load and will be removed.`);
            sticker.remove();
        };

        let attempts = 0;
        let newX, newY;
        do {
            newX = getRandomPosition(window.innerWidth, 20);
            newY = getRandomPosition(window.innerHeight * 0.45, 20); // Place stickers in top 45% of screen
            attempts++;
        } while (isOverlapping(newX, newY) && attempts < maxTries);

        if (attempts >= maxTries) {
            newX = getRandomPosition(window.innerWidth);
            newY = getRandomPosition(window.innerHeight * 0.45);
        }

        stickers.push({ x: newX, y: newY });
        sticker.style.position = "absolute";
        sticker.style.left = `${newX}px`;
        sticker.style.top = `${newY}px`;
        stickerContainer.appendChild(sticker);

        if (isVideo) {
            sticker.addEventListener("canplay", () => {
                sticker.play().catch(() => console.warn("Autoplay blocked for sticker", stickerName));
            });
        }
    }

    function playVideo(video) {
        video.play().catch(() => {
            console.warn("Autoplay blocked, requiring user interaction.");
        });
    }

    window.onload = function () {
        let stickerIndex = 1;
        while (stickerIndex <= maxStickers) {
            stickerFormats.forEach(format => addSticker(`sticker${stickerIndex}.${format}`));
            stickerIndex++;
        }
    };

    document.body.addEventListener("click", function () {
        playVideo(videoElement);

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
