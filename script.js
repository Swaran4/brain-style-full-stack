// ========== QUIZ DATA ==========
const questions = [
    {
        question: "How do you prefer to approach a new task or problem?",
        answers: [
            { text: "Make a step-by-step plan", type: "left" },
            { text: "Go with the flow and figure it out as I go", type: "right" },
            { text: "Understand both the logic and creative possibilities", type: "whole" }
        ]
    },
    {
        question: "What's your strength in school or work?",
        answers: [
            { text: "Math, science, logic", type: "left" },
            { text: "Art, writing, design", type: "right" },
            { text: "Managing teams, creative problem-solving", type: "whole" }
        ]
    },
    {
        question: "How do you usually make decisions?",
        answers: [
            { text: "Based on facts and data", type: "left" },
            { text: "Based on intuition and feelings", type: "right" },
            { text: "Consider both logic and emotion equally", type: "whole" }
        ]
    },
    {
        question: "How do you process information?",
        answers: [
            { text: "Step by step, one thing at a time", type: "left" },
            { text: "By pictures, patterns, or ideas in my head", type: "right" },
            { text: "I switch between logic and visual thinking", type: "whole" }
        ]
    },
    {
        question: "Which activity sounds most appealing?",
        answers: [
            { text: "Solving puzzles or analyzing data", type: "left" },
            { text: "Painting, music, or writing a story", type: "right" },
            { text: "Designing a strategy game or creative project", type: "whole" }
        ]
    },
    {
        question: "When telling a story, you...",
        answers: [
            { text: "Just tell what happened in order", type: "left" },
            { text: "Talk about feelings and what it looked like", type: "right" },
            { text: "Provide facts with flair—make it engaging but accurate", type: "whole" }
        ]
    },
    {
        question: "How do you organize your workspace?",
        answers: [
            { text: "Neat and labeled", type: "left" },
            { text: "Controlled chaos—looks messy but I know where things are", type: "right" },
            { text: "Somewhat organized with a creative touch", type: "whole" }
        ]
    },
    {
        question: "Your dream job would involve...",
        answers: [
            { text: "Organizing events, managing clubs, or leading projects", type: "left" },
            { text: "Music, design, writing, performing", type: "right" },
            { text: "Leadership, strategy, or innovation", type: "whole" }
        ]
    },
    {
        question: "What's your communication style?",
        answers: [
            { text: "Clear, direct, precise", type: "left" },
            { text: "Expressive, emotional, metaphorical", type: "right" },
            { text: "Adaptive, depends on who I'm talking to", type: "whole" }
        ]
    },
    {
        question: "When working in a group, you...",
        answers: [
            { text: "Take charge of planning and structure", type: "left" },
            { text: "Provide ideas, energy, and creativity", type: "right" },
            { text: "Balance creativity and execution", type: "whole" }
        ]
    }
];

// ========== DOM ELEMENTS ==========
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress");

// ========== QUIZ STATE ==========
let currentQuestionIndex = 0;
let scores = {
    left: 0,
    right: 0,
    whole: 0
};

// ========== QUIZ MANAGEMENT ==========
function startQuiz() {
    currentQuestionIndex = 0;
    scores = { left: 0, right: 0, whole: 0 };
    nextButton.innerHTML = "Next";
    nextButton.disabled = true;
    nextButton.style.display = "none";
    progressBar.style.width = "0%";
    showQuestion();
}

function showQuestion() {
    resetState();
    updateProgress();
    
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = createAnswerButton(answer);
        answerButtons.appendChild(button);
    });
}

function createAnswerButton(answer) {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    button.dataset.type = answer.type;
    button.addEventListener("click", selectAnswer);
    return button;
}

function resetState() {
    nextButton.style.display = "none";
    nextButton.disabled = true;
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// ========== PROGRESS MANAGEMENT ==========
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// ========== ANSWER HANDLING ==========
function selectAnswer(e) {
    const selectedBtn = e.target;
    const type = selectedBtn.dataset.type;
    scores[type]++;

    disableAllAnswerButtons();
    selectedBtn.classList.add("selected");
    showNextButton();
}

function disableAllAnswerButtons() {
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });
}

function showNextButton() {
    nextButton.style.display = "block";
    nextButton.disabled = false;
}

// ========== RESULTS MANAGEMENT ==========
function getResult() {
    const maxScore = Math.max(scores.left, scores.right, scores.whole);
    
    // Check for ties
    const tieConditions = [
        scores.left === scores.right && scores.left === maxScore,
        scores.left === scores.whole && scores.left === maxScore,
        scores.right === scores.whole && scores.right === maxScore
    ];
    
    if (tieConditions.some(condition => condition)) {
        return "Balanced/Mixed Thinker";
    }
    
    if (scores.left === maxScore) return "Left Brain Dominant";
    if (scores.right === maxScore) return "Right Brain Dominant";
    if (scores.whole === maxScore) return "Whole Brain Thinker";
    
    return "Balanced/Mixed Thinker";
}

function getMessage(result) {
    const messages = {
        "Left Brain Dominant": "You like to plan your day and follow routines. You approach tasks step by step and often double-check your work. You enjoy solving problems with clear rules and processes, and you prefer making decisions based on facts and evidence rather than guesses or feelings.",
        "Right Brain Dominant": "You enjoy exploring new experiences and thinking in different ways. You often notice patterns and connections others miss. You like to try creative approaches to solve problems and rely on your instincts. You enjoy activities where you can experiment and express your ideas freely.",
        "Whole Brain Thinker": "You balance planning with flexibility. You can follow routines when needed but also adapt to new situations. You think through problems logically while also noticing possibilities and ideas that others might overlook. You enjoy combining practical solutions with creative approaches in daily life.",
        default: "You have a flexible and adaptive thinking style. While not strongly dominant on one side, you can shift based on context—an underrated strength."
    };
    
    return messages[result] || messages.default;
}

function showScore() {
    resetState();
    const result = getResult();
    
    displayInitialResult(result);
    setupPlayAgainButton();
    submitResultToBackend(result);
}

function displayInitialResult(result) {
    questionElement.innerHTML = `
        Result: <strong>${result}</strong><br>
        ${getMessage(result)}<br><br>
        <em>Fetching stats...</em>
    `;
}

function setupPlayAgainButton() {
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    nextButton.disabled = true;
}

// ========== BACKEND COMMUNICATION ==========
function submitResultToBackend(result) {
    const backendUrl = "http://127.0.0.1:5000";
    
    fetch(`${backendUrl}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result: result })
    })
    .then(handleSubmitResponse)
    .then(() => fetchStats(backendUrl))
    .then(handleStatsResponse)
    .then(data => updateResultWithStats(result, data.total_users))
    .catch(err => handleBackendError(err, result));
}

function handleSubmitResponse(response) {
    if (!response.ok) throw new Error("Submit failed");
    return response;
}

function fetchStats(backendUrl) {
    return fetch(`${backendUrl}/stats`);
}

function handleStatsResponse(response) {
    if (!response.ok) throw new Error("Stats fetch failed");
    return response.json();
}

function updateResultWithStats(result, totalUsers) {
    questionElement.innerHTML = `
        Result: <strong>${result}</strong><br>
        ${getMessage(result)}<br><br>
        <em>Total users who took quiz: ${totalUsers}</em>
    `;
    nextButton.disabled = false;
}

function handleBackendError(error, result) {
    console.error("Backend Error:", error);
    questionElement.innerHTML = `
        Result: <strong>${result}</strong><br>
        ${getMessage(result)}<br><br>
        <em>(Could not connect to backend)</em>
    `;
    nextButton.disabled = false;
}

// ========== NAVIGATION HANDLING ==========
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// ========== EVENT LISTENERS ==========
nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Play Again" && !nextButton.disabled) {
        startQuiz();
    } else if (!nextButton.disabled) {
        handleNextButton();
    }
});

// ========== INITIALIZATION ==========
startQuiz();