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
           // { text: "I'm average at many things", type: "neutral" }
        ]
    },
    {
        question: "How do you usually make decisions?",
        answers: [
            { text: "Based on facts and data", type: "left" },
            { text: "Based on intuition and feelings", type: "right" },
            { text: "Consider both logic and emotion equally", type: "whole" }
            //{ text: "I just go with what feels right in the moment", type: "neutral" }
        ]
    },
    {
        question: "How do you process information?",
        answers: [
            { text: "Step by step, one thing at a time", type: "left" },
            { text: "By pictures, patterns, or ideas in my head", type: "right" },
            { text: "I switch between logic and visual thinking", type: "whole" }
           // { text: "I don’t have a consistent style", type: "neutral" }
        ]
    }   // newer shit
    ,{
        question: "Which activity sounds most appealing?",
        answers: [
            { text: "Solving puzzles or analyzing data", type: "left" },
            { text: "Painting, music, or writing a story", type: "right" },
            { text: "Designing a strategy game or creative project ", type: "whole" }
           // { text: " Watching Netflix or chatting with friends", type: "neutral" }
        ]
    },

    {
        question: "When telling a story, you... ",
        answers: [
            { text: "Just tell what happened in order", type: "left" },
            { text: "Talk about feelings and what it looked like", type: "right" },
            { text: "Provide facts with flair—make it engaging but accurate ", type: "whole" }
           // { text: "It depends on the audience ", type: "neutral" }
        ]
    },

    {
        question: "How do you organize your workspace?",
        answers: [
            { text: "Neat and labeled", type: "left" },
            { text: "Controlled chaos—looks messy but I know where things are ", type: "right" },
            { text: "Somewhat organized with a creative touch ", type: "whole" }
          //  { text: " Changes often", type: "neutral" }
        ]
    },

    {
        question: "Your dream job would involve...",
        answers: [
            { text: "Organizing events, managing clubs, or leading projects", type: "left" },
            { text: "Music, design, writing, performing", type: "right" },
            { text: "Leadership, strategy, or innovation", type: "whole" }
           // { text: " I haven't figured that out yet ", type: "neutral" }
        ]
    },

    {
        question: "What’s your communication style?",
        answers: [
            { text: "Clear, direct, precise ", type: "left" },
            { text: " Expressive, emotional, metaphorical ", type: "right" },
            { text: " Adaptive, depends on who I'm talking to ", type: "whole" }
          //  { text: "Casual and spontaneous", type: "neutral" }
        ]
    },

    {
        question: "When working in a group, you... ",
        answers: [
            { text: "Take charge of planning and structure ", type: "left" },
            { text: " Provide ideas, energy, and creativity", type: "right" },
            { text: "Balance creativity and execution ", type: "whole" }
          //  { text: "Prefer to go along with others ", type: "neutral" }
        ]
    }

];
    



const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress");

let currentQuestionIndex = 0;
let scores = {
    left: 0,
    right: 0,
    whole: 0
};
// let isShowingScore = false; // Flag to prevent premature restarts

function startQuiz() {
    currentQuestionIndex = 0;
    scores = { left: 0, right: 0, whole: 0 };
    // isShowingScore = false;
    nextButton.innerHTML = "Next";
    nextButton.disabled = true;
    nextButton.style.display = "none";
    progressBar.style.width = "0%";
    showQuestion();
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + "%";
}

function showQuestion() {
    resetState();
    updateProgress();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.dataset.type = answer.type;
        answerButtons.appendChild(button);
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    nextButton.disabled = true;
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const type = selectedBtn.dataset.type;
    scores[type]++;

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });

    selectedBtn.classList.add("selected");
    nextButton.style.display = "block";
    nextButton.disabled = false;
}

function getResult() {
    const maxScore = Math.max(scores.left, scores.right, scores.whole);
    if (
        (scores.left === scores.right && scores.left === maxScore) ||
        (scores.left === scores.whole && scores.left === maxScore) ||
        (scores.right === scores.whole && scores.right === maxScore)
    ) {
        return "Balanced/Mixed Thinker";
    }
    if (scores.left === maxScore) return "Left Brain Dominant";
    if (scores.right === maxScore) return "Right Brain Dominant";
    if (scores.whole === maxScore) return "Whole Brain Thinker";
    return "Balanced/Mixed Thinker";
}

function getMessage(result) {
    switch (result) {
        case "Left Brain Dominant":
          //  return "You're logical, analytical, and organized. You prefer facts over feelings and love structured tasks like math, science, or planning.";
          return "You like to plan your day and follow routines. You approach tasks step by step and often double-check your work. You enjoy solving problems with clear rules and processes, and you prefer making decisions based on facts and evidence rather than guesses or feelings.";
        case "Right Brain Dominant":
            // return "You're creative, intuitive, and emotionally in tune. You thrive in artistic environments and love thinking outside the box.";
            return "You enjoy exploring new experiences and thinking in different ways. You often notice patterns and connections others miss. You like to try creative approaches to solve problems and rely on your instincts. You enjoy activities where you can experiment and express your ideas freely.";

        case "Whole Brain Thinker":
            return "You balance planning with flexibility. You can follow routines when needed but also adapt to new situations. You think through problems logically while also noticing possibilities and ideas that others might overlook. You enjoy combining practical solutions with creative approaches in daily life.";
            // return "You're a rare blend! You use both creativity and logic. You’re great at problem-solving, team leadership, and flexible thinking.";
        default:
            return "You have a flexible and adaptive thinking style. While not strongly dominant on one side, you can shift based on context—an underrated strength.";
    }
}
// function showScore() {
//     isShowingScore = true;
//     resetState();
//     const result = getResult();
//     questionElement.innerHTML = `
//         Result: <strong>${result}</strong><br>
//         ${getMessage(result)}<br><br>
//         Scores: Left Brain: ${scores.left}, Right Brain: ${scores.right}, Whole Brain: ${scores.whole}
//         <br><canvas id="scoreChart"></canvas>
//     `;
//     nextButton.innerHTML = "Play Again";
//     nextButton.style.display = "block";
//     nextButton.disabled = false;

//     // Create chart
//     const ctx = document.getElementById("scoreChart").getContext("2d");
//     new Chart(ctx, {
//         type: "bar",
//         data: {
//             labels: ["Left Brain", "Right Brain", "Whole Brain"],
//             datasets: [{
//                 label: "Scores",
//                 data: [scores.left, scores.right, scores.whole],
//                 backgroundColor: ["#4caf50", "#2196f3", "#ff9800"],
//                 borderColor: ["#388e3c", "#1976d2", "#f57c00"],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             scales: {
//                 y: { beginAtZero: true }
//             }
//         }
//     });
// }

// function showScore() {
//     isShowingScore = true;
//     resetState();
//     const result = getResult();
//     questionElement.innerHTML = `
//         Result: <strong>${result}</strong><br>
//         ${getMessage(result)}
//     `;
//     nextButton.innerHTML = "Play Again";
//     nextButton.style.display = "block";
//     nextButton.disabled = false;
// }

function showScore() {
    // isShowingScore = true; // Set flag to indicate score screen
    resetState();
    const result = getResult();
    questionElement.innerHTML = `
        Result: <strong>${result}</strong><br>
        ${getMessage(result)}<br><br>
        <em>Fetching stats...</em>
    `;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    nextButton.disabled = true;

    // Attempt to send result to backend
    fetch("http://127.0.0.1:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result: result })
    })
        .then(res => {
            if (!res.ok) throw new Error("Submit failed");
            return fetch("http://127.0.0.1:5000/stats");
        })
        .then(res => {
            if (!res.ok) throw new Error("Stats fetch failed");
            return res.json();
        })
        .then(data => {
            questionElement.innerHTML = `
                Result: <strong>${result}</strong><br>
                ${getMessage(result)}<br><br>
                <em>Total users who took quiz: ${data.total_users}</em>
            `;
            nextButton.disabled = false; // Enable only after UI update
        })
        .catch(err => {
            console.error("Error:", err);
            questionElement.innerHTML = `
                Result: <strong>${result}</strong><br>
                ${getMessage(result)}<br><br>
                <em>(Could not connect to backend)</em>
            `;
            nextButton.disabled = false;
        });
}

function handleNextButton() {
    // if (isShowingScore) return; // Prevent advancing while showing score
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if ( nextButton.innerHTML === "Play Again" && !nextButton.disabled) {       //isShowingScore &&
        startQuiz();
    } else if (!nextButton.disabled) {
        handleNextButton();
    }
});

startQuiz();

// const questionElement = document.getElementById("question");
// const answerButtons = document.getElementById("answer-buttons");
// const nextButton = document.getElementById("next-btn");
// const progressBar = document.getElementById("progress");

// let currentQuestionIndex = 0;
// let scores = {
//     left: 0,
//     right: 0,
//     whole: 0
// };

// function startQuiz() {
//     currentQuestionIndex = 0;
//     scores = { left: 0, right: 0, whole: 0 };
//     nextButton.innerHTML = "Next";
//     nextButton.disabled = true;
//     nextButton.style.display = "none"; // Ensure button is hidden initially
//     progressBar.style.width = "0%";
//     showQuestion();
// }

// function updateProgress() {
//     const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
//     progressBar.style.width = progress + "%";
// }

// function showQuestion() {
//     resetState();
//     updateProgress();
//     let currentQuestion = questions[currentQuestionIndex];
//     let questionNo = currentQuestionIndex + 1;
//     questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

//     currentQuestion.answers.forEach(answer => {
//         const button = document.createElement("button");
//         button.innerHTML = answer.text;
//         button.classList.add("btn");
//         button.dataset.type = answer.type;
//         answerButtons.appendChild(button);
//         button.addEventListener("click", selectAnswer);
//     });
// }

// function resetState() {
//     nextButton.style.display = "none";
//     nextButton.disabled = true; // Disable button during state reset
//     while (answerButtons.firstChild) {
//         answerButtons.removeChild(answerButtons.firstChild);
//     }
// }

// function selectAnswer(e) {
//     const selectedBtn = e.target;
//     const type = selectedBtn.dataset.type;
//     scores[type]++;

//     Array.from(answerButtons.children).forEach(button => {
//         button.disabled = true;
//     });

//     selectedBtn.classList.add("selected");
//     nextButton.style.display = "block";
//     nextButton.disabled = false;
// }

// function getResult() {
//     const maxScore = Math.max(scores.left, scores.right, scores.whole);
//     if (
//         (scores.left === scores.right && scores.left === maxScore) ||
//         (scores.left === scores.whole && scores.left === maxScore) ||
//         (scores.right === scores.whole && scores.right === maxScore)
//     ) {
//         return "Balanced/Mixed Thinker";
//     }
//     if (scores.left === maxScore) return "Left Brain Dominant";
//     if (scores.right === maxScore) return "Right Brain Dominant";
//     if (scores.whole === maxScore) return "Whole Brain Thinker";
//     return "Balanced/Mixed Thinker";
// }

// function getMessage(result) {
//     switch (result) {
//         case "Left Brain Dominant":
//             return "You're logical, analytical, and organized. You prefer facts over feelings and love structured tasks like math, science, or planning.";
//         case "Right Brain Dominant":
//             return "You're creative, intuitive, and emotionally in tune. You thrive in artistic environments and love thinking outside the box.";
//         case "Whole Brain Thinker":
//             return "You're a rare blend! You use both creativity and logic. You’re great at problem-solving, team leadership, and flexible thinking.";
//         default:
//             return "You have a flexible and adaptive thinking style. While not strongly dominant on one side, you can shift based on context—an underrated strength.";
//     }
// }

// function showScore() {
//     resetState();
//     const result = getResult();
//     questionElement.innerHTML = `
//         Result: <strong>${result}</strong><br>
//         ${getMessage(result)}<br><br>
//         <em>Fetching stats...</em>
//     `;
//     nextButton.innerHTML = "Play Again";
//     nextButton.style.display = "block";
//     nextButton.disabled = true; // Disable until fetch completes or fails

//     // Attempt to send result to backend
//     fetch("http://127.0.0.1:5000/submit", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ result: result })
//     })
//         .then(res => {
//             if (!res.ok) throw new Error("Submit failed");
//             return fetch("http://127.0.0.1:5000/stats");
//         })
//         .then(res => {
//             if (!res.ok) throw new Error("Stats fetch failed");
//             return res.json();
//         })
//         .then(data => {
//             questionElement.innerHTML = `
//                 Result: <strong>${result}</strong><br>
//                 ${getMessage(result)}<br><br>
//                 <em>Total users who took quiz: ${data.total_users}</em>
//             `;
//             nextButton.disabled = false; // Enable only after successful fetch
//         })
//         .catch(err => {
//             console.error("Error:", err);
//             questionElement.innerHTML = `
//                 Result: <strong>${result}</strong><br>
//                 ${getMessage(result)}<br><br>
//                 <em>(Could not connect to backend)</em>
//             `;
//             nextButton.disabled = false; // Enable even if backend fails
//         });
// }

// function handleNextButton() {
//     currentQuestionIndex++;
//     if (currentQuestionIndex < questions.length) {
//         showQuestion();
//     } else {
//         showScore();
//     }
// }

// nextButton.addEventListener("click", () => {
//     if (nextButton.innerHTML === "Play Again" && !nextButton.disabled) {
//         startQuiz();
//     } else if (!nextButton.disabled) {
//         handleNextButton();
//     }
// });

// startQuiz();

























































// let currentQuestionIndex = 0;
// let scores = {
//     left: 0,
//     right: 0,
//     whole: 0
// };

// function startQuiz() {
//     currentQuestionIndex = 0;
//     scores = { left: 0, right: 0, whole: 0 };
//     nextButton.innerHTML = "Next";
//     nextButton.disabled = true; // Disable next button initially
//     progressBar.style.width = "0%"; // Reset progress bar
//     showQuestion();
// }

// function updateProgress() {
//     const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
//     progressBar.style.width = progress + "%";
// }

// function showQuestion() {
//     resetState();
//     updateProgress();
//     let currentQuestion = questions[currentQuestionIndex];
//     let questionNo = currentQuestionIndex + 1;
//     questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

//     currentQuestion.answers.forEach(answer => {
//         const button = document.createElement("button");
//         button.innerHTML = answer.text;
//         button.classList.add("btn");
//         button.dataset.type = answer.type;
//         answerButtons.appendChild(button);
//         button.addEventListener("click", selectAnswer);
//     });
// }

// function resetState() {
//     nextButton.style.display = "none";
//     while (answerButtons.firstChild) {
//         answerButtons.removeChild(answerButtons.firstChild);
//     }
// }

// function selectAnswer(e) {
//     const selectedBtn = e.target;
//     const type = selectedBtn.dataset.type;
//     scores[type]++;

//     Array.from(answerButtons.children).forEach(button => {
//         button.disabled = true;
//     });

//     selectedBtn.classList.add("selected");
//     nextButton.style.display = "block";
//     nextButton.disabled = false; // Enable next button after selection
// }

// function getResult() {
//     const maxScore = Math.max(scores.left, scores.right, scores.whole);
//     if (
//         (scores.left === scores.right && scores.left === maxScore) ||
//         (scores.left === scores.whole && scores.left === maxScore) ||
//         (scores.right === scores.whole && scores.right === maxScore)
//     ) {
//         return "Balanced/Mixed Thinker";
//     }
//     if (scores.left === maxScore) return "Left Brain Dominant";
//     if (scores.right === maxScore) return "Right Brain Dominant";
//     if (scores.whole === maxScore) return "Whole Brain Thinker";
//     return "Balanced/Mixed Thinker";
// }

// function getMessage(result) {
//     switch (result) {
//         case "Left Brain Dominant":
//             return "You're logical, analytical, and organized. You prefer facts over feelings and love structured tasks like math, science, or planning.";
//         case "Right Brain Dominant":
//             return "You're creative, intuitive, and emotionally in tune. You thrive in artistic environments and love thinking outside the box.";
//         case "Whole Brain Thinker":
//             return "You're a rare blend! You use both creativity and logic. You’re great at problem-solving, team leadership, and flexible thinking.";
//         default:
//             return "You have a flexible and adaptive thinking style. While not strongly dominant on one side, you can shift based on context—an underrated strength.";
//     }
// }

// function showScore() {
//     resetState();
//     const result = getResult();
//     nextButton.innerHTML = "Play Again";
//     nextButton.style.display = "block";
//     nextButton.disabled = true; // Disable until fetch completes

//     // Send result to backend
//     fetch("http://127.0.0.1:5000/submit", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ result: result })
//     })
//         .then(res => res.json())
//         .then(() => {
//             // After saving, fetch total users
//             return fetch("http://127.0.0.1:5000/stats");
//         })
//         .then(res => res.json())
//         .then(data => {
//             // Display result + total users
//             questionElement.innerHTML = `
//                 Result: <strong>${result}</strong><br>
//                 ${getMessage(result)}<br><br>
//                 <em>Total users who took quiz: ${data.total_users}</em>
//             `;
//             nextButton.disabled = false; // Enable Play Again button
//         })
//         .catch(err => {
//             console.error("Error:", err);
//             questionElement.innerHTML = `
//                 Result: <strong>${result}</strong><br>
//                 ${getMessage(result)}<br><br>
//                 <em>(Could not connect to backend)</em>
//             `;
//             nextButton.disabled = false; // Enable Play Again button even on error
//         });
// }

// function handleNextButton() {
//     currentQuestionIndex++;
//     if (currentQuestionIndex < questions.length) {
//         showQuestion();
//     } else {
//         showScore();
//     }
// }

// nextButton.addEventListener("click", () => {
//     if (nextButton.innerHTML === "Play Again") {
//         startQuiz();
//     } else {
//         handleNextButton();
//     }
// });

// startQuiz();