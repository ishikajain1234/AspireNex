let quizData = [];

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("add-question-form")
    .addEventListener("submit", addQuestion);
  document.getElementById("add-option").addEventListener("click", addOption);
});

function addQuestion(event) {
  event.preventDefault();
  const question = document.getElementById("question").value;
  const options = Array.from(document.querySelectorAll(".option-input")).map(
    (input) => input.value
  );
  const answer = document.getElementById("answer").value;

  if (options.includes(answer)) {
    quizData.push({question, options, answer});
    document.getElementById("add-question-form").reset();
    document.getElementById("options-container").innerHTML = `
            <label for="option">Option 1:</label>
            <input type="text" name="option" class="option-input" required>
        `;
  } else {
    alert("Correct answer must be one of the options.");
  }
}

function addOption() {
  const optionsContainer = document.getElementById("options-container");
  const optionCount = document.querySelectorAll(".option-input").length + 1;
  const newOption = document.createElement("div");
  newOption.innerHTML = `
        <label for="option">Option ${optionCount}:</label>
        <input type="text" name="option" class="option-input" required>
    `;
  optionsContainer.appendChild(newOption);
}

function startQuiz() {
  localStorage.setItem("quizData", JSON.stringify(quizData));
  window.location.href = "quiz.html";
}
