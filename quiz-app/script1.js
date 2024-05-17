const questions = [
    {
        question: "which of the following live is the land?",
        answeres :[
            {text : "shark", correct : false},
            {text : "fish", correct : false},
            {text : "dog", correct : true},
            {text : "blue whale", correct : false},
        ]

    },
    {
        question: "which of the following live is the land?",
        answeres :[
            {text : "shark", correct : false},
            {text : "fish", correct : false},
            {text : "dog", correct : true},
            {text : "blue whale", correct : false},
        ]
    },
    {
        question: "which of the following live is the land?",
        answeres :[
            {text : "shark", correct : false},
            {text : "fish", correct : false},
            {text : "dog", correct : true},
            {text : "blue whale", correct : false},
        ]

    },
    {
        question: "which of the following live is the land?",
        answeres :[
            {text : "shark", correct : false},
            {text : "fish", correct : false},
            {text : "dog", correct : true},
            {text : "blue whale", correct : false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerebtnElement = document.getElementById("ans-button");
const nextbtnElement = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextbtnElement.innerHTML = "Next";
    showQuestion();
}
function showQuestion()
{
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " +currentQuestion.question;

    currentQuestion.answeres.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerebtnElement.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    })
}

function resetState()
{
    nextbtnElement.style.display = "none";
    while(answerebtnElement.firstChild){
        answerebtnElement.removeChild(answerebtnElement.firstChild);
    }
}

function selectAnswer(e)
{
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerebtnElement.children).forEach(button => {
        if(button.dataset.correct === "true")
            {
                button.classList.add("correct");
            }
            button.disabled = true;
    });
    nextbtnElement.style.display = "block";

}
function showScore()
{
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextbtnElement.innerHTML = "Play Again";
    nextbtnElement.style.display="block";
}
function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else
    {
        showScore();
    }
}
nextbtnElement.addEventListener("click" , ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else
    {
        startQuiz();
    }
})

startQuiz();