// JavaScript for the quiz using jQuery
const questions = [
    {
        question: "What is the purpose of JavaScript in web development?",
        options: ["To style web pages", "To add interactivity and functionality to web pages", "To create web page layouts"],
        answer: "To add interactivity and functionality to web pages"
    },
    {
        question: "What is the result of `typeof null`?",
        options: ["'undefined'", "'null'", "'object'"],
        answer: "'object'"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["'var'", "'let'", "'const'", "'all of the above'"],
        answer: "'all of the above'"
    },
    {
        question: "What is the correct way to write a single-line comment in JavaScript?",
        options: ["'// This is a comment'", "'<!-- This is a comment -->'", "'/* This is a comment'"],
        answer: "'// This is a comment'"
    },
    {
        question: "What is the output of `2 + '2'` in JavaScript?",
        options: ["4", "'22'", "2 + 2"],
        answer: "'22'"
    },
    {
        question: "Which loop is used to iterate over the properties of an object in JavaScript?",
        options: ["for-in loop", "for loop", "while loop"],
        answer: "for-in loop"
    },
    {
        question: "What is the purpose of the `if` statement in JavaScript?",
        options: ["To define a function", "To execute a block of code if a condition is true", "To create a new variable"],
        answer: "To execute a block of code if a condition is true"
    },
    {
        question: "What is the result of `3 === '3'` in JavaScript?",
        options: ["true", "false", "undefined"],
        answer: "false"
    },
    {
        question: "What is the JavaScript operator used to combine two or more strings?",
        options: ["'+'", "'&'", "'/'"],
        answer: "'+'"
    },
    {
        question: "What is the role of the `addEventListener` method in JavaScript?",
        options: ["To add a new element to the DOM", "To create an array", "To attach an event handler function to an HTML element"],
        answer: "To attach an event handler function to an HTML element"
    },
    {
        question: "How do you define a function in JavaScript?",
        options: ["function myFunction() {}", "var myFunction = function() {}", "Both A and B"],
        answer: "Both A and B"
    },
    {
        question: "What is the JavaScript function `parseInt('42px')` return?",
        options: ["'42px'", "42", "NaN"],
        answer: "42"
    },
    {
        question: "Which JavaScript method is used to add or change HTML content?",
        options: ["innerHTML", "createElement", "appendChild"],
        answer: "innerHTML"
    },
    {
        question: "What is a JavaScript closure?",
        options: ["A function that is defined inside another function", "A way to lock a variable to prevent changes", "A comment at the end of a line of code"],
        answer: "A function that is defined inside another function"
    },
    {
        question: "How do you check if a variable is an array in JavaScript?",
        options: ["Using the `Array.isArray(variable)` method", "Using the `typeof` operator", "There's no way to check if a variable is an array"],
        answer: "Using the `Array.isArray(variable)` method"
    },
    {
        question: "What is the purpose of the `return` statement in a JavaScript function?",
        options: ["To define a new variable", "To stop the execution of a function and return a value", "To create a loop"],
        answer: "To stop the execution of a function and return a value"
    },
    {
        question: "What is a callback function in JavaScript?",
        options: ["A function that is called at the beginning of a program", "A function that is passed as an argument to another function and executed later", "A function that returns a boolean value"],
        answer: "A function that is passed as an argument to another function and executed later"
    },
    {
        question: "Which JavaScript method is used to remove the last element from an array?",
        options: ["pop()", "shift()", "unshift()"],
        answer: "pop()"
    },
    {
        question: "What is the difference between `null` and `undefined` in JavaScript?",
        options: ["They are the same and can be used interchangeably", "`null` represents an intentional absence of value, while `undefined` indicates a variable that has been declared but has not been assigned a value.", "`null` is a number, and `undefined` is a string."],
        answer: "`null` represents an intentional absence of value, while `undefined` indicates a variable that has been declared but has not been assigned a value."
    },
    {
        question: "How do you define a constant variable in JavaScript?",
        options: ["Using the `let` keyword", "Using the `var` keyword", "Using the `const` keyword"],
        answer: "Using the `const` keyword"
    },
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

    scoreDisplay.text(`Score: ${correctAnswers}`);
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
