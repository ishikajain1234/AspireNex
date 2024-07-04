document.addEventListener("DOMContentLoaded", () => {
  const quizData = JSON.parse(localStorage.getItem("quizData"));
  if (quizData) {
    loadQuiz(quizData);
  } else {
    alert("No quiz data found. Please create a quiz first.");
    window.location.href = "index.html";
  }
});

function loadQuiz(quizData) {
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = "";
  quizData.forEach((quizItem, index) => {
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `
            <p>${quizItem.question}</p>
            ${quizItem.options
              .map(
                (option, i) => `
                <label>
                    <input type="radio" name="question${index}" value="${option}">
                    ${option}
                </label>
            `
              )
              .join("")}
        `;
    quizContainer.appendChild(questionElement);
  });
}

function submitQuiz() {
  const quizData = JSON.parse(localStorage.getItem("quizData"));
  const resultsContainer = document.getElementById("results");
  let score = 0;

  quizData.forEach((quizItem, index) => {
    const selectedOption = document.querySelector(
      `input[name="question${index}"]:checked`
    );
    if (selectedOption && selectedOption.value === quizItem.answer) {
      score++;
    }
  });

  resultsContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;
}
