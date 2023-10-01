console.log("evaluating script.js from top to bottom");

const startQuizButton = document.getElementById("startquizbutton");
const timerElement = document.getElementById("quizTimer");
const answerElement = document.getElementById("answer");

if (performance.getEntriesByType("navigation")[0].type === "reload" && window.location.href.includes("quiz.html")) {
  // Redirect to the results page with a zero score
  window.location.href = "results.html?score=0";
  localStorage.setItem("finalScore", "invalid submission")

}


console.log(startQuizButton, timerElement);
console.log(window.location.href);

let time = 60;
let timerInterval;
let correctAnswers = 0;
let incorrectAnswers = 0;
let currentQuestion = 0;

const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts"
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above"
    ],
    answer: "4. all of the above"
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes"
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log"
    ],
    answer: "4. console.log"
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break"
  }
];

function startTimer() {
  timerInterval = setInterval(() => {
    time--;
    if (time < 0) {
      clearInterval(timerInterval);
      timerElement.textContent = "Time is up!";
      // Handle timer expiry, e.g., submit quiz automatically
    } else {
      const minutes = Math.floor(time / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (time % 60).toString().padStart(2, "0");
      timerElement.textContent = `${minutes}:${seconds}`;
    }
  }, 1000);
}

function showNextQuestion() {
  if (currentQuestion < questions.length) {
    console.log(currentQuestion, questions.length)
    const question = questions[currentQuestion];
    // Show the question and options on the quiz.html page
    document.querySelector(".pagetitle").textContent = question.questionText;
    const optionButtons = document.querySelectorAll(".question");
    optionButtons.forEach((button, index) => {
      button.textContent = question.options[index];
      button.addEventListener("click", checkAnswer);
    });
  } else {
    
    answerElement.textContent = "Quiz completed!";
    console.log("Quiz completed!");
    console.log("Correct Answers:", correctAnswers);
    console.log("Incorrect Answers:", incorrectAnswers);

    // Redirect to results.html after a brief delay
    /*setTimeout(() => {
      window.location.href = "results.html";
    }, 1000);*/

    clearInterval(timerInterval); 
    // Stop the timer interval
  }
}

function checkAnswer(event) {
  const selectedOption = event.target.textContent;
  const question = questions[currentQuestion];
  if (selectedOption === question.answer) {
    // Correct answer
    answerElement.textContent = "Correct answer!";
    console.log("Correct answer!");
    correctAnswers++;
    console.log(correctAnswers)
  } else {
    // Incorrect answer
    answerElement.textContent = "Incorrect answer!";
    console.log("Incorrect answer!");
    incorrectAnswers++;
    console.log(incorrectAnswers)
    time -= 10; // Reduce the timer by 10 seconds for incorrect answers
  }

  currentQuestion++;
  // showNextQuestion();

  setTimeout(() => {
    answerElement.textContent = "";
    
    if (currentQuestion === questions.length) {
      const finalScore = correctAnswers - incorrectAnswers;
      localStorage.setItem("finalScore", finalScore);

      setTimeout(() => {
        answerElement.textContent = "Quiz completed!";
      }, 1000);

      // Redirect to results.html
      setTimeout(() => {
        window.location.href = `results.html?score=${finalScore}`
      }, 2000); // Delay the redirection by 1 second

      clearInterval(timerInterval); // Stop the timer interval
    } else {
      showNextQuestion();
    }
  }, 1000); // Delay the clearing of the answerElement and the showing of the next question by 1 second
}


console.log("current page ---->", window.location.href);
console.log("current value of startQuizButton --->", startQuizButton);
console.log(
  "current value of startQuizButton.addEventListener --->",
  startQuizButton?.addEventListener
);

startQuizButton?.addEventListener("click", () => {
  // Redirect the user to the quiz.html page
  console.log("start timer");
  startTimer();
  console.log("page load");
  window.location.href = "quiz.html";
});

console.log("reached before");

if (window.location.href.includes("quiz.html")) {
  console.log("reached after");
  startTimer();
  showNextQuestion();
}



if (window.location.href.includes("results.html")) {
        // Retrieve the final score from localStorage
  const finalScore = localStorage.getItem("finalScore");

  // Update the score element with the retrieved score
  const scoreElement = document.getElementById("score");
  if (scoreElement) {
      scoreElement.textContent = `Your final score is: ${finalScore || 0}`;
  }

  // Handle form submission
  document.addEventListener("DOMContentLoaded", function () {
  const usernameForm = document.getElementById("usernameForm");
  usernameForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission

      // Get the entered username
      const username = document.getElementById("box").value;

      // Store username in localStorage
      localStorage.setItem("username", username);

      // Redirect to highscores.html
      window.location.href = "highscores.html";
  });
  });

} 



if (window.location.href.includes("highscores.html")){ 

  if (performance.getEntriesByType("navigation")[0].type === "reload" && window.location.href.includes("highscores.html")) {
    // Redirect to the results page with a zero score
    window.location.href = "index.html";

    }
  document.addEventListener("DOMContentLoaded", function () {
    // Get the username and score from localStorage
    const username = localStorage.getItem("username");
    const finalScore = localStorage.getItem("finalScore");

    // Get the existing high scores from localStorage, or initialize to an empty array if it doesn't exist
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    // Add the new score to the array
    highscores.push({ username, finalScore });

    // Save the updated high scores back to localStorage
    localStorage.setItem("highscores", JSON.stringify(highscores));

    const highscoresDiv = document.getElementById("highscores");
    highscores.sort((a, b) => b.finalScore - a.finalScore);

    // Display high scores

    // Display high scores
    highscores.forEach(function (entry, index) {
        const div = document.createElement("div");
        div.textContent = (index + 1) + ". " + entry.username + "- " + entry.finalScore;
        div.classList.add("score-entry");
        highscoresDiv.appendChild(div);
    });
    

    const resetButton = document.getElementById("resetbutton");
    resetButton.addEventListener("click", function () {
    // Clear high scores and redirect to quiz.html
        localStorage.removeItem("highscores");
        localStorage.removeItem("username"); // Remove username from local storage
        localStorage.removeItem("finalScore"); // Remove finalScore from local storage
        highscoresDiv.innerHTML = "";
        window.location.href = "quiz.html";
    });

    const restartButton = document.getElementById("restartbutton");
    restartButton.addEventListener("click", function () {
      // Redirect to quiz.html without clearing high scores
      window.location.href = "quiz.html";
    });

  });

} 