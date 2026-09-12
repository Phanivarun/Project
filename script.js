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
const shareBtn = document.getElementById("shareBtn");

function getAllMessages() {
  return Object.values(messages).flat();
}

function generateMessage() {
  const category = categorySelect.value;
  const pool = category === "all" ? getAllMessages() : messages[category];
  const random = pool[Math.floor(Math.random() * pool.length)];
  messageEl.textContent = random;
  shareBtn.href = `https://wa.me/?text=${encodeURIComponent(random)}`;
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

// initial message on load
generateMessage();
