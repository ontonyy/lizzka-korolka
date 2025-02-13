document.addEventListener("DOMContentLoaded", function () {
    const stickerFolder = "stickers/";
    const stickerFormats = ["webm", "webp"];
    const container = document.querySelector(".container");
    const stickerContainer = document.querySelector(".sticker-container");
    const videoElement = document.getElementById("valentineVideo");

    const stickers = [];
    const stickerSize = window.innerWidth < 500 ? 60 : 80; // Smaller stickers on mobile
    const maxStickers = 29;

    function getRandomPosition(max, padding = 10) {
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
        }

        sticker.src = `${stickerFolder}${stickerName}`;
        sticker.onerror = () => sticker.remove();

        let newX, newY, attempts = 0;
        do {
            newX = getRandomPosition(window.innerWidth);
            newY = getRandomPosition(window.innerHeight * 0.4);
            attempts++;
        } while (isOverlapping(newX, newY) && attempts < 100);

        stickers.push({ x: newX, y: newY });
        sticker.style.position = "absolute";
        sticker.style.left = `${newX}px`;
        sticker.style.top = `${newY}px`;
        stickerContainer.appendChild(sticker);
    }

    window.onload = function () {
        for (let i = 1; i <= maxStickers; i++) {
            stickerFormats.forEach(format => addSticker(`sticker${i}.${format}`));
        }
    };

    document.body.addEventListener("click", function () {
        videoElement.play().catch(() => console.warn("Autoplay blocked"));
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
        videoElement.play();

        document.querySelector(".buttons").remove();
    });
});
