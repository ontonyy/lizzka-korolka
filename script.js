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

        sticker.onload = () => {
            const containerRect = container.getBoundingClientRect();
            const safeTopStart = containerRect.top - 100; // Extra padding
            const safeTopEnd = containerRect.bottom + 50;

            sticker.style.position = "absolute";
            sticker.style.left = `${getRandomPosition(window.innerWidth - 100, containerRect.left, containerRect.right)}px`;
            sticker.style.top = `${getRandomPosition(window.innerHeight - 100, safeTopStart, safeTopEnd)}px`;
        };

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
    const videoElement = document.getElementById("valentineVideo");

    let yesButtonSize = 16;
    let phraseIndex = 0;

    const phrases = [
        "ЧТО РЕАЛЬНО НЕТ??",
        "Ты уверена?",
        "Что если я спрошу по другому?",
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

    function playVideo(video) {
        video.play().catch(error => {
            console.warn("Autoplay blocked, requiring user interaction");
        });
    }

    noButton.addEventListener("click", function () {
        noButton.innerText = phrases[phraseIndex]; // Update No button text
        phraseIndex = (phraseIndex + 1) % phrases.length; // Loop back to start

        yesButtonSize += 5;
        yesButton.style.fontSize = `${yesButtonSize}px`;
    });

    yesButton.addEventListener("click", function () {
        textElement.innerText = "Дааааа это победа, люблю тебя очень сильно, ты моя любимая валентинка и лучшая девушка!!!";

        // Replace video with a new .webm file
        videoElement.innerHTML = `<source src="stickers/sticker1.webm" type="video/webm">`;
        videoElement.load();
        playVideo(videoElement);

        document.querySelector(".buttons").remove();
    });

    // Autoplay fix for mobile devices
    document.body.addEventListener("click", function () {
        playVideo(videoElement);
    }, { once: true });
});
