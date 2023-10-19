// JavaScript for the quiz using jQuery
const questions = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "What is 5 - 3?",
        options: ["2", "3", "4", "5"],
        answer: "2"
    },
    // Add more questions here
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let timer;
const totalTime = 60; // Total time in seconds
let remainingTime = totalTime;

const questionElement = $('#question');
const optionsElement = $('#options');
const resultElement = $('#result');
const startButton = $('#startButton');
const quizContainer = $('#quiz');
const completionScreen = $('#completionScreen');
const scoreDisplay = $('#scoreDisplay');
const initialsInput = $('#initialsInput');
const timeRemainingElement = $('#timeRemaining');
const currentScoreElement = $('#currentScore');

function updateTimerDisplay() {
    timeRemainingElement.text(remainingTime);
}

function updateScoreDisplay() {
    currentScoreElement.text(correctAnswers);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    if (currentQuestionIndex < shuffledQuestions.length) {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        questionElement.text(currentQuestion.question);
        optionsElement.html('');
        $.each(currentQuestion.options, function(index, option) {
            const li = $('<li>').text(option).addClass('option');
            li.on('click', function() {
                checkAnswer(option);
            });
            optionsElement.append(li);
        });
    } else {
        // Display the completion screen when all questions are answered
        showCompletionScreen();
        updateScoreDisplay(); // Update the score display when the quiz is completed
    }
}


function checkAnswer(selectedOption) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    currentQuestionIndex++;

    if (selectedOption === currentQuestion.answer) {
        resultElement.text('Correct!');
        currentQuestion.answeredCorrectly = true;
        correctAnswers++;
        updateScoreDisplay(); // Update the score display when an answer is correct
    } else {
        resultElement.text('Incorrect!');
        remainingTime -= 10; // Deduct 10 seconds for an incorrect answer
    }
    displayQuestion();

    setTimeout(function() {
        resultElement.text("");
    }, 1000); // Delay before the text dissapears
}


function showCompletionScreen() {
    clearInterval(timer);
    quizContainer.hide();
    completionScreen.show();

    scoreDisplay.text(`Score: ${correctAnswers}/${shuffledQuestions.length}`);
}

function startQuiz() {
    startButton.hide();
    quizContainer.show(); // Show the quiz container
    shuffleArray(questions);
    shuffledQuestions = questions.slice(); // Copy the shuffled questions
    updateTimerDisplay(); 
    timer = setInterval(function() {
        remainingTime--;
        updateTimerDisplay(); // Update the timer display after showing the next question
        if (remainingTime <= 0) {
            showCompletionScreen();
        }
    }, 1000); // Update the timer every second

    // Call displayQuestion here to start the quiz
    displayQuestion();
}

startButton.on('click', startQuiz);
