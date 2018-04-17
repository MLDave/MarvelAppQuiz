
let questionNumber = 0;
let score = 0;
let win = 0;
let lose = 0;
//generate question html

function generateQuestion() {
    if (questionNumber < STORE.length) {
        return `<div class="question-${questionNumber} question-form">
      <h2>${STORE[questionNumber].question}</h2>
      <form class="card-text">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="${STORE[questionNumber].answers[0]}" checked>
                <label class="form-check-label" for="exampleRadios1">
                ${STORE[questionNumber].answers[0]}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="${STORE[questionNumber].answers[1]}">
                <label class="form-check-label" for="exampleRadios2">
                ${STORE[questionNumber].answers[1]}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="${STORE[questionNumber].answers[2]}">
                <label class="form-check-label" for="exampleRadios3">
                ${STORE[questionNumber].answers[2]}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="${STORE[questionNumber].answers[3]}">
                <label class="form-check-label" for="exampleRadios4">
                ${STORE[questionNumber].answers[3]}
                </label>
            </div>
    
        <a href="#" class="btn btn-primary finished answered">Submit</a>
      </form>
      </div>`;
    } else {
        restartQuiz();
        $('.question-number').text(10)
    }
}

/**hides and removes cards */
function startQuiz() {
    $('.question-answer-form, .correction, .finish-line').hide();
    $('.quiz-start').on('click', '.start-button', function (event) {
        $('.quiz-start').remove();
        $('.question-answer-form').show();
        $('.question-number').text(1);
    });
}

// render question in DOM
function renderQuestion() {
    $('.question-answer-form').html(generateQuestion());
}

//user selects answer on submit run user feedback
function userSelectAnswer() {
    $('.finished').on('click', function (event) {
        event.preventDefault();
        let selected = $('input:checked');
        let answer = selected.val();
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        if (answer === correctAnswer) {
            ifAnswerIsCorrect();
            answerFeedback();
        } else {
            ifAnswerIsWrong();
            answerFeedback();
        }
    });
}

function answerFeedback() {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('form').hide();
    $('.corrected').text(`The right answer was ${correctAnswer}`);
    $('.correction').show();
}

//user feedback for correct answer
function userAnswerFeedbackCorrect() {
    $('.feed-back-title').text('Awesome!');
}

//user feedback for wrong answer
function userAnswerFeedbackWrong() {
    $('.feed-back-title').text('Sorry!');
}

// gives the result of the answered question and updates that scores
function ifAnswerIsCorrect() {
    userAnswerFeedbackCorrect();
    win++;
    $('.total-win').text(win);
}

function ifAnswerIsWrong() {
    userAnswerFeedbackWrong();
    lose++;
    $('.total-lose').text(lose);
}

function changeQuestionNumber() {
    questionNumber++;
    $('.question-number').text(questionNumber + 1);
}

//what happens when the user clicks next
function renderNextQuestion() {
    $('.container').on('click', '.next', function (event) {
        $('.correction').hide();
        $('form').show();
        changeQuestionNumber();
        renderQuestion();
        userSelectAnswer();

        if (questionNumber >= 10) {
            $('form').remove();
            $('.finish-line').show();
            if (win >= 8) {
                $('.resultScore').text(`Congratulations! You are Super! You got ${win}/10`);
            } else if (score < 8 && score >= 5) {
                $('.resultScore').text(`Rusty but you made it! You got ${win}/10`);
            } else {
                $('.resultScore').text(`You need to sharpen your powers! You got ${win}/10`);
            }
        }
    });
}

function changeScore() {
    score++;
}

//restart quiz function - reloads page to start quiz over
function restartQuiz() {
    $('.finish-line').on('click', '.restart', function (event) {
        location.reload();
    });
}



//run quiz functions
function createQuiz() {
    startQuiz();
    renderQuestion();
    userSelectAnswer();
    renderNextQuestion();
}

$(createQuiz);



// $("#formsubmit").click(function () {
//     $("#myform").hide();
//     $("#myresults").text($("#mytext").val());
//     $("#myresultsWrap").show();
// });
// $("#toform").click(function () {
//     $("#myresultsWrap").hide();
//     $("#myform").show();
// });