const quizContent = document.getElementsByClassName('quiz-content')[0];
const submitBtn = document.getElementById('submit');
const form = document.getElementById('opForm');
const title = document.getElementsByClassName('title')[0];
const op1 = document.getElementById('op01');
const op2 = document.getElementById('op02');
const op3 = document.getElementById('op03');
const op4 = document.getElementById('op04');
const op1_text = document.getElementById('op01_text');
const op2_text = document.getElementById('op02_text');
const op3_text = document.getElementById('op03_text');
const op4_text = document.getElementById('op04_text');
const li = document.querySelectorAll('li');

const quizs = [
    {
        'Q': '1+1?',
        'op': ['1','2','3','4'],
        'A': '2'
    },
    {
        'Q': '3+3?',
        'op': ['4','5','6','7'],
        'A': '6'
    },
    {
        'Q': '9+9?',
        'op': ['20','21','22','18'],
        'A': '18'
    },
]

let quizsNum = 0;

function init(){
    title.innerText = quizs[quizsNum].Q;
    op1.value = quizs[quizsNum].op[0];
    op1_text.innerText = quizs[quizsNum].op[0];
    op2.value = quizs[quizsNum].op[1];
    op2_text.innerText = quizs[quizsNum].op[1];
    op3.value = quizs[quizsNum].op[2];
    op3_text.innerText = quizs[quizsNum].op[2];
    op4.value = quizs[quizsNum].op[3];
    op4_text.innerText = quizs[quizsNum].op[3];
}

init()


let answers = [];
let correct = 0;

submitBtn.addEventListener('click', function(e){
    e.preventDefault();
    answers.push(form.answers.value);
    op1.checked = true;
    op2.checked = false;
    op3.checked = false;
    op4.checked = false;

    if (quizsNum < quizs.length-1) {
        quizsNum++;
        init();
    } else {
        countingCorrect();
        // console.log(answers)
    }
    

})

function countingCorrect(){

    for(let i=0; i<quizs.length; i++) {
        if(quizs[i].A == answers[i]){
            correct++;
        }
    }

    quizContent.classList.add('result');
    submitBtn.remove();

    title.innerHTML = `
    <div>你答對${correct}/${quizs.length}</div>
    <button onclick="location.reload()" class="button">reload</button>
    `
    
    answers = [];
    correct = 0;
}

