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

    noButton.addEventListener("click", function () {
        noButton.innerText = phrases[phraseIndex]; // Update No button text
        phraseIndex = (phraseIndex + 1) % phrases.length; // Loop back to start

        yesButtonSize += 5;
        yesButton.style.fontSize = `${yesButtonSize}px`;
    });

    yesButton.addEventListener("click", function () {
        textElement.innerText = "Дааааа это победа, люблю тебя очень сильно, ты моя любимая валентинка и лучшая девушка!!!";

        // Replace the video with a new .webm video
        const newVideo = document.createElement("video");
        newVideo.classList.add("common-sticker");
        newVideo.autoplay = true;
        newVideo.loop = true;
        newVideo.muted = true;
        newVideo.playsInline = true;

        const source = document.createElement("source");
        source.src = "stickers/sticker1.webm"; // Replace with your final .webm file
        source.type = "video/webm";

        newVideo.appendChild(source);

        // Replace the existing video
        const container = document.querySelector(".container");
        const oldVideo = document.getElementById("valentineVideo");
        container.replaceChild(newVideo, oldVideo);

        document.querySelector(".buttons").remove();
    });
});
