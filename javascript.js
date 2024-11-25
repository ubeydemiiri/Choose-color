const quizQuestions = [
    { question: "red", options: ["Red", "Blue", "Green", "Yellow"], correct: 0 },
    {
      question: "green",
      options: ["Red", "Blue", "Green", "Yellow"],
      correct: 2,
    },
    { question: "blue", options: ["Red", "Blue", "Green", "Yellow"], correct: 1 },
    {
      question: "yellow",
      options: ["Red", "Blue", "Green", "Yellow"],
      correct: 3,
    },
    { question: "blue", options: ["Green", "Red", "Yellow", "Blue"], correct: 3 },
    {
      question: "green",
      options: ["Yellow", "Green", "Blue", "Red"],
      correct: 1,
    },
    { question: "red", options: ["Red", "Green", "Yellow", "Blue"], correct: 0 },
  ];
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 10;
  let timer;
  
  function renderQuestion() {
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    if (currentQuestionIndex >= quizQuestions.length) {
      endQuiz(" لقد اتممت الاجابه عحميع الاسئله");
      return;
    }
    const question = quizQuestions[currentQuestionIndex];
    questionElement.textContent = question.question;
    optionsContainer.innerHTML = "";
    question.options.forEach((color, index) => {
      const colDiv = document.createElement("div");
  
      colDiv.classList.add("col-6", "col-md-3", "mb-3");
      const button = document.createElement("button");
      button.classList.add("btn", "p-5", "w-100");
      button.style.backgroundColor = color.toLowerCase();
      button.addEventListener("click", () => handleAnswer(index));
      colDiv.appendChild(button);
      optionsContainer.appendChild(colDiv);
    });
  }
  function handleAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestionIndex];
    if (selectedIndex === question.correct) {
      score++;
      document.getElementById("score").textContent = `النتيجه:${score}`;
      currentQuestionIndex++;
      renderQuestion();
    } else {
      endQuiz("الجواب خاطئ");
    }
  }
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("timer").textContent = `الوقت المتبقي: ${timeLeft}`;
      if (timeLeft <= 0) {
        endQuiz("الوقت انتهى");
      }
    }, 1000);
  }
  
  function endQuiz(message) {
    clearInterval(timer);
    alert(`${message} \nالنتيجه النهائيه ${score}`);
    document.getElementById("restart-btn").classList.remove("d-none");
    document.getElementById("options").innerHTML = "";
    document.getElementById("question").textContent = "";
    document.getElementById("timer").textContent = "";
  }
  function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 10;
    document.getElementById("score").textContent = "0: النتيجه";
    document.getElementById("timer").textContent = "الوقت المتبقي: 10";
    document.getElementById("restart-btn").classList.add("d-none");
    startTimer();
    renderQuestion();
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    startTimer();
    renderQuestion();
  });