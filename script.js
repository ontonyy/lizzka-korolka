document.addEventListener("DOMContentLoaded", function () {
    const stickerFolder = "stickers/";
    const stickerFormats = ["jpg", "webp"];
    const container = document.querySelector(".container");
    const stickerContainer = document.querySelector(".sticker-container");
    const mainImage = document.getElementById("valentineImage");

    const stickers = [];
    const stickerSize = window.innerWidth < 500 ? 60 : 80;
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
        const sticker = document.createElement("img");
        sticker.classList.add("sticker");

        sticker.src = `${stickerFolder}${stickerName}`;
        sticker.onerror = () => sticker.remove();

        let newX, newY, attempts = 0;
        do {
            newX = getRandomPosition(window.innerWidth);
            newY = getRandomPosition(window.innerHeight * 0.3);
            attempts++;
        } while (isOverlapping(newX, newY) && attempts < 100);

        stickers.push({ x: newX, y: newY });
        sticker.style.position = "absolute";
        sticker.style.left = `${newX}px`;
        sticker.style.top = `${newY}px`;
        stickerContainer.appendChild(sticker);
    }

    function reloadStickers() {
        stickerContainer.innerHTML = "";
        stickers.length = 0;

        for (let i = 1; i <= maxStickers; i++) {
            stickerFormats.forEach(format => addSticker(`sticker${i}.${format}`));
        }
    }

    window.onload = reloadStickers;

    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");
    const textElement = document.getElementById("valentineText");

    let yesButtonSize = 16;
    let phraseIndex = 0;
    let yesPhraseIndex = 0;

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
        "Я расстроен",
        "Нет это грустно",
        "НЕТ :((((",
        "Я дурею если нет",
    ];

    const yesPhrases = [
        "Может всё таки да",
        "ну да хороший ответ",
        "ДА ДА И ДА?",
        "СТО ПРОЦЕНТОВ",
        "миллион процентов",
        "Офкорс да",
        "ДААААА",
        "ОУЕС",
    ];

    noButton.addEventListener("click", function () {
        noButton.innerText = phrases[phraseIndex];
        phraseIndex = (phraseIndex + 1) % phrases.length;

        yesButton.innerText = yesPhrases[yesPhraseIndex];
        yesPhraseIndex = (yesPhraseIndex + 1) % yesPhrases.length;

        yesButtonSize += 5;
        yesButton.style.fontSize = `${yesButtonSize}px`;

        reloadStickers();
    });

    yesButton.addEventListener("click", function () {
        textElement.innerText = "Победаааааа, люблю тебя очень сильно, ценю тебя так же сильно, ты лучшая и любимая девушка, спасибо за всё время проведённое вместе, всегда жду чтобы провести побольше времени вместе!!!!!!💗💗💗";

        mainImage.src = "stickers/sticker3.webp";

        document.querySelector(".buttons").remove();

        reloadStickers();

        const newButton = document.createElement("button");
        newButton.innerText = "💗 Открыть сюрприз 💗";
        newButton.id = "surpriseButton";
        newButton.style.marginTop = "20px";
        newButton.style.padding = "14px";
        newButton.style.borderRadius = "8px";
        newButton.style.fontSize = "18px";
        newButton.style.fontWeight = "bold";
        newButton.style.cursor = "pointer";
        newButton.style.backgroundColor = "purple";
        newButton.style.color = "white";
        newButton.style.border = "none";

        container.appendChild(newButton);

        newButton.addEventListener("click", function () {
            showImageSequence(newButton);
        });
    });

    function showImageSequence(button) {
        const imageSequence = [
            { src: "stickers/images/generated-1.jpg", text: "Подарок это ты!!! 💓💓💓" },
            { src: "stickers/images/generated-2.jpg", text: "💗🎀 ДА И ДА, ПРАВДА ТЫ 💗🎀 (вот с элей)" },
            { src: "stickers/images/generated-3.jpg", text: "Нет, я не вру, с тобой спокойствие!!!💞💞💞!" },
            { src: "stickers/images/generated-4.jpg", text: "Как можно врать, когда ты такая красотка 💗🎀💗🎀💗🎀" },
            { src: "stickers/images/generated-5.jpg", text: "💓💓💓 Нежная королева 💓💓💓" },
            { src: "stickers/images/generated-6.jpg", text: "Такая ты красивая блин 💖💖💖!" },
            { src: "stickers/images/generated-7.jpg", text: "Правда ну очень красивая 💗💗💗!!!" },
            { src: "stickers/images/generated-8.jpg", text: "Чемпионка в битве с ягером!!🎀🎀🎀" },
            { src: "stickers/images/generated-9.jpg", text: "Красивее любых персонажей мультиков!!🎀🎀🎀" },
            { src: "stickers/images/generated-10.jpg", text: "Только и хочется смотреть на такую красотку 💖💖💖🎀🎀🎀" },
            { src: "stickers/images/generated-11.jpg", text: "Нежная и мили мили девушка 💗💗💗" },
            { src: "stickers/images/generated-12.jpg", text: "Вот такой вот дэп от королевы 🎀🎀🎀" },
            { src: "stickers/images/generated-13.jpg", text: "Такие вот нежные мы 💖💖💖🎀🎀🎀" },
            { src: "stickers/images/generated-14.jpg", text: "И ещё нас нежных 💗💗💗" },
            { src: "stickers/images/generated-15.jpg", text: "Всё было вместе со снегом 💗💗💗" },
            { src: "stickers/images/generated-16.jpg", text: "Лего мир прекрасен если ты там 🎀🎀🎀" },
            { src: "stickers/images/generated-17.jpg", text: "С новым годом, люблю тебя очень сильно!!!!! 💓💓💓" }
        ];

        const sequenceContainer = document.createElement("div");
        sequenceContainer.id = "sequence-container";
        sequenceContainer.style.width = "100%";
        sequenceContainer.style.marginTop = "20px";
        sequenceContainer.style.display = "flex";
        sequenceContainer.style.flexDirection = "column";
        sequenceContainer.style.alignItems = "center";

        // ✅ Append images below `.container`
        container.appendChild(sequenceContainer);
        button.remove(); // Remove button after clicking

        let currentIndex = 0;

        function addNextImage() {
            if (currentIndex < imageSequence.length) {
                const imgContainer = document.createElement("div");
                imgContainer.style.marginBottom = "30px";
                imgContainer.style.textAlign = "center";

                const imgText = document.createElement("h2");
                imgText.innerText = imageSequence[currentIndex].text;
                imgText.style.color = "#e6005c";
                imgText.style.fontSize = "22px";
                imgText.style.marginBottom = "10px";

                const imgElement = document.createElement("img");
                imgElement.src = imageSequence[currentIndex].src;
                imgElement.style.width = "80%";
                imgElement.style.borderRadius = "10px";
                imgElement.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";

                imgContainer.appendChild(imgText);
                imgContainer.appendChild(imgElement);
                sequenceContainer.appendChild(imgContainer);

                currentIndex++;

                setTimeout(addNextImage, 2000); // Show next image every 2 seconds
            }
        }

        addNextImage();
    }
});
