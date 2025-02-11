document.addEventListener("DOMContentLoaded", function () {
    const messageInput = document.getElementById("message");
    const generateButton = document.getElementById("generate");
    const outputDiv = document.getElementById("output");

    generateButton.addEventListener("click", function () {
        const message = messageInput.value.trim();

        if (message === "") {
            outputDiv.innerHTML = "<p class='error'>Please enter a message!</p>";
            return;
        }

        outputDiv.innerHTML = `<div class='valentine-message'>💖 ${message} 💖</div>`;
    });
});