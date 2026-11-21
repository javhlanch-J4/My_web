// Асуултуудын сан (Та өөрийн хүссэн асуултуудаар баяжуулж болно)
const questions = [
  {
    question: "HTML гэдэг үгийн товчлол юу вэ?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Mode Link",
      "Home Tool Markup Language"
    ],
    answer: 0
  },
  {
    question: "CSS-ийг HTML файлтай ямар тагаар холбодог вэ?",
    options: ["<script>", "<style>", "<link>", "<css>"],
    answer: 2
  },
  {
    question: "JavaScript дээр хувьсагч зарлахад аль түлхүүр үгийг ашигладаг вэ?",
    options: ["var, let, const", "int, string", "define", "variable"],
    answer: 0
  },
  {
    question: "Монгол Улсын хамгийн өндөр оргил аль нь вэ?",
    options: ["Отгонтэнгэр", "Хүйтэн оргил", "Асралт хайрхан", "Мөнхсардиг"],
    answer: 1
  },
  {
    question: "DOM гэдэг нь юуны товчлол вэ?",
    options: [
      "Data Object Mode",
      "Document Object Model",
      "Digital Ordinance Model",
      "Desktop Oriented Mode"
    ],
    answer: 1
  }
];

// Хувьсагчид
let currentQuestionIndex = 0;
let score = 0;
let lives = 3;
let timeLeft = 15;
let timerInterval;
let fiftyUsed = false;
let playerName = "Тоглогч";

// HTML элементүүдийг барьж авах
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const playerNameInput = document.getElementById("player-name");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const nextBtn = document.getElementById("next-btn");
const fiftyBtn = document.getElementById("fifty-btn");

const livesEl = document.getElementById("lives");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const progressFill = document.getElementById("progress-fill");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const leaderboardList = document.getElementById("leaderboard-list");

// Анх ачаалахад шилдэг тоглогчдыг харуулах
renderLeaderboard();

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", () => {
  endScreen.classList.remove("active");
  startScreen.classList.add("active");
  renderLeaderboard();
});
nextBtn.addEventListener("click", nextQuestion);
fiftyBtn.addEventListener("click", useFiftyFifty);

function startGame() {
  const inputName = playerNameInput.value.trim();
  playerName = inputName !== "" ? inputName : "Зочин тоглогч";

  currentQuestionIndex = 0;
  score = 0;
  lives = 3;
  fiftyUsed = false;
  fiftyBtn.disabled = false;

  updateStatus();
  startScreen.classList.remove("active");
  gameScreen.classList.add("active");
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timerInterval);
  nextBtn.disabled = true;
  optionsContainer.innerHTML = "";

  const currentQ = questions[currentQuestionIndex];
  questionText.textContent = `${currentQuestionIndex + 1}. ${currentQ.question}`;

  // Явцын зураас шинэчлэх
  const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
  progressFill.style.width = `${progressPercent}%`;

  // Хариултын товчлуурууд үүсгэх
  currentQ.options.forEach((optionText, index) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = optionText;
    btn.dataset.index = index;
    btn.addEventListener("click", () => selectAnswer(index, btn));
    optionsContainer.appendChild(btn);
  });

  startTimer();
}

function startTimer() {
  timeLeft = 15;
  timerEl.textContent = `⏱️ ${timeLeft}с`;
  timerEl.classList.remove("danger");

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏱️ ${timeLeft}с`;

    if (timeLeft <= 5) {
      timerEl.classList.add("danger");
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeOut();
    }
  }, 1000);
}

function handleTimeOut() {
  lives--;
  updateStatus();
  disableAllOptions();

  // Зөв хариултыг харуулах
  const correctIndex = questions[currentQuestionIndex].answer;
  optionsContainer.children[correctIndex].classList.add("correct");

  if (lives <= 0) {
    setTimeout(() => endGame(false), 1200);
  } else {
    nextBtn.disabled = false;
  }
}

function selectAnswer(selectedIndex, selectedBtn) {
  clearInterval(timerInterval);
  disableAllOptions();

  const correctIndex = questions[currentQuestionIndex].answer;

  if (selectedIndex === correctIndex) {
    selectedBtn.classList.add("correct");
    score += 10 + timeLeft; // Хурдан хариулах тусам нэмэлт оноо авна
  } else {
    selectedBtn.classList.add("wrong");
    optionsContainer.children[correctIndex].classList.add("correct");
    lives--;
  }

  updateStatus();

  if (lives <= 0) {
    setTimeout(() => endGame(false), 1200);
  } else {
    nextBtn.disabled = false;
  }
}

function useFiftyFifty() {
  if (fiftyUsed) return;
  fiftyUsed = true;
  fiftyBtn.disabled = true;

  const correctIndex = questions[currentQuestionIndex].answer;
  const wrongIndices = [0, 1, 2, 3].filter(i => i !== correctIndex);

  // Санамсаргүй 2 буруу хариултыг идэвхгүй болгох
  wrongIndices.sort(() => Math.random() - 0.5);
  const toHide = wrongIndices.slice(0, 2);

  toHide.forEach(idx => {
    const btn = optionsContainer.children[idx];
    btn.disabled = true;
    btn.style.visibility = "hidden";
  });
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    progressFill.style.width = "100%";
    endGame(true);
  }
}

function disableAllOptions() {
  Array.from(optionsContainer.children).forEach(btn => {
    btn.disabled = true;
  });
}

function updateStatus() {
  livesEl.textContent = "❤️".repeat(Math.max(0, lives)) + "🖤".repeat(Math.max(0, 3 - lives));
  scoreEl.textContent = `Оноо: ${score}`;
}

function endGame(completed) {
  clearInterval(timerInterval);
  gameScreen.classList.remove("active");
  endScreen.classList.add("active");

  const endTitle = document.getElementById("end-title");
  const finalScoreText = document.getElementById("final-score-text");

  endTitle.textContent = completed ? "🎉 Баяр хүргэе! Дууслаа" : "💔 Амь дууслаа!";
  finalScoreText.textContent = `${playerName}, та нийт ${score} оноо авлаа.`;

  saveScore(playerName, score);
}

// LocalStorage дээр оноо хадгалах ба унших
function saveScore(name, newScore) {
  const highScores = JSON.parse(localStorage.getItem("quizLeaderboard")) || [];
  highScores.push({ name, score: newScore });
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5); // Зөвхөн эхний 5-ийг үлдээнэ
  localStorage.setItem("quizLeaderboard", JSON.stringify(highScores));
}

function renderLeaderboard() {
  const highScores = JSON.parse(localStorage.getItem("quizLeaderboard")) || [];
  if (highScores.length === 0) {
    leaderboardList.innerHTML = "<li>Одоогоор оноо бүртгэгдээгүй байна.</li>";
    return;
  }

  leaderboardList.innerHTML = highScores
    .map((entry, idx) => `<li><span>${idx + 1}. ${entry.name}</span> <strong>${entry.score} оноо</strong></li>`)
    .join("");
}