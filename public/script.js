async function sendText() {
  const input = document.getElementById('userInput').value;
  addMessage("Você: " + input);

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ message: input })
  });

  const data = await response.json();
  const botReply = data.reply || "Erro na resposta";
  addMessage("Bot: " + botReply);
  speak(botReply);
}

function addMessage(text) {
  const messages = document.getElementById("messages");
  messages.innerHTML += "<p>" + text + "</p>";
  messages.scrollTop = messages.scrollHeight;
}

function startVoice() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'pt-BR';
  recognition.onresult = (event) => {
    const voiceInput = event.results[0][0].transcript;
    document.getElementById('userInput').value = voiceInput;
    sendText();
  };
  recognition.start();
}

function speak(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'pt-BR';
  synth.speak(utter);
}