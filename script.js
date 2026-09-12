const messages = {
  quotes: [
    "Believe you can and you're halfway there.",
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Don't watch the clock; do what it does. Keep going.",
    "The future belongs to those who believe in the beauty of their dreams.",
  ],
  jokes: [
    "Why don't scientists trust atoms? Because they make up everything!",
    "I told my computer I needed a break, and now it won't stop sending me KitKats.",
    "Why did the scarecrow win an award? He was outstanding in his field.",
    "I'm reading a book about anti-gravity. It's impossible to put down!",
    "Why don't skeletons fight each other? They don't have the guts.",
  ],
  greetings: [
    "Hope you're having an amazing day! 🌞",
    "Sending good vibes your way today!",
    "Wishing you a day filled with small joys.",
    "Hey! Just checking in to say hi 👋",
    "May your coffee be strong and your day be smooth.",
  ],
};

const categorySelect = document.getElementById("category");
const messageEl = document.getElementById("message");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const smsBtn = document.getElementById("smsBtn");
const receiverInput = document.getElementById("receiver");
const receiverNumberInput = document.getElementById("receiverNumber");
const intervalSelect = document.getElementById("interval");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const statusEl = document.getElementById("status");
const deliveryLog = document.getElementById("deliveryLog");
const messageCountEl = document.getElementById("messageCount");

let simulationTimer;
let messageCount = 0;

function getAllMessages() {
  return Object.values(messages).flat();
}

function generateMessage() {
  const category = categorySelect.value;
  const pool = category === "all" ? getAllMessages() : messages[category];
  const random = pool[Math.floor(Math.random() * pool.length)];
  messageEl.textContent = random;
}

generateBtn.addEventListener("click", generateMessage);

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(messageEl.textContent);
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
  } catch (err) {
    console.error("Copy failed", err);
  }
});

smsBtn.addEventListener("click", () => {
  const receiverNumber = receiverNumberInput.value.trim();
  if (!receiverNumber) {
    statusEl.textContent = "Enter a receiver number before opening the SMS app.";
    receiverNumberInput.focus();
    return;
  }

  const smsNumber = receiverNumber.replace(/[^\d+]/g, "");
  window.location.href = `sms:${smsNumber}?body=${encodeURIComponent(messageEl.textContent)}`;
  statusEl.textContent = "SMS app opened. Press Send manually to send the message.";
});

function addDeliveryLog() {
  generateMessage();
  messageCount += 1;

  const entry = document.createElement("li");
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const title = document.createElement("strong");
  title.textContent = "Simulated delivery";
  const details = document.createElement("span");
  const receiverName = receiverInput.value.trim() || "Demo receiver";
  const receiverNumber = receiverNumberInput.value.trim();
  details.textContent = `${time} · ${receiverName} · ${receiverNumber}`;
  const message = document.createElement("p");
  message.textContent = messageEl.textContent;
  entry.append(title, details, message);
  deliveryLog.prepend(entry);
  messageCountEl.textContent = `${messageCount} message${messageCount === 1 ? "" : "s"}`;
  statusEl.textContent = `Simulated message ${messageCount} delivered locally. Nothing was sent online.`;
}

function stopSimulation() {
  clearInterval(simulationTimer);
  simulationTimer = undefined;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  statusEl.textContent = messageCount
    ? `Simulation stopped after ${messageCount} local message${messageCount === 1 ? "" : "s"}.`
    : "Simulation stopped. No message was sent.";
}

startBtn.addEventListener("click", () => {
  if (simulationTimer) return;

  if (!receiverNumberInput.value.trim()) {
    statusEl.textContent = "Enter a receiver number for the local simulation.";
    receiverNumberInput.focus();
    return;
  }

  const interval = Number(intervalSelect.value) * 1000;
  startBtn.disabled = true;
  stopBtn.disabled = false;
  statusEl.textContent = "Simulation running locally. Nothing is being sent online.";
  addDeliveryLog();
  simulationTimer = setInterval(addDeliveryLog, interval);
});

stopBtn.addEventListener("click", stopSimulation);

generateMessage();
