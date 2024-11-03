function ShowMessage(message, isBot) {
    let chatbox = document.getElementById("chatbox-messages");
    let msg = document.createElement("div");
    msg.classList.add("chatbox-message");
    if (isBot) {
        msg.classList.add("bot");
    }
    msg.innerText = message;
    chatbox.appendChild(msg);
    chatbox.scrollTo(0, chatbox.scrollHeight);
}

function SendMessage() {
    let inp = document.getElementById("chatbox-text");
    ShowMessage(inp.value);
    fetch('/chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: inp.value })
    })
    .then(resp => resp.json())
    .then(response => {
        ShowMessage(response.response, true);
    })
    .catch(error => console.error('Error:', error));
    inp.value = "";
}

document.getElementById("chatbox-text").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        SendMessage();
    }
});

