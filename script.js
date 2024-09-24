const questions = [
    {
        question: "WHAT IS THE LARGEST OCEAN IN THE WORLD",
        answer: [
            { text: "INDIAN", correct: false },
            { text: "PACIFIC", correct: true },
            { text: "ATLANTIC", correct: false },
            { text: "RED ", correct: false }
        ]
    },
    {
        question: "WHAT IS THE LARGEST CONTINENT IN THE WORLD",
        answer: [
            { text: "ASIA", correct: true },
            { text: "AFRICA", correct: false },
            { text: "EUROPE", correct: false },
            { text: "ANTARCTICA", correct: false }
        ]
    }, {
        question: "WHAT IS THE LARGEST MAMAMAL IN THE WORLD",
        answer: [
            { text: "LION", correct: false },
            { text: "CROCOCDILE", correct: false },
            { text: "HIPPO", correct: false },
            { text: "ELEPHANT", correct: true }
        ],
    },

    {
        question: "WHICH CITY IS FOUND IN ETHIOPIA ?",
        answer: [
            { text: "ADDIS ABABA", correct: false },
            { text: "ADAMA", correct: false },
            { text: "WOLLO", correct: false },
            { text: "ALL", correct: true }
        ]
    }
];
const questionElement = document.getElementById("question");
const answerbutton = document.getElementById("answers");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0, score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "NEXT";
    showQuiz();
}
function showQuiz() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("ans-btn");
        answerbutton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectanswer);
    })
}
function resetState() {
    nextButton.style.display = "none";
    while (answerbutton.firstChild) {
        answerbutton.removeChild(answerbutton.firstChild);
    }
}
function selectanswer(e) {
    const selectedbtn = e.target;
    const iscorrect = (selectedbtn.dataset.correct === "true");
    if (iscorrect) {
        selectedbtn.classList.add("correct");
        score++;
    }
    else {
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button => {
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showscore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block";
}
function handleNextbutton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuiz();
    } else {
        showscore();
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextbutton();
    } else {
        startQuiz();
    }
})
startQuiz();