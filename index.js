'use strict';

// Underlying data the app needs to work; aka the set of questions and answers
const STORE = [
  {
    question:`Which actress is the star of "Murder, She Wrote"?`,
    answers: [
      `Bea Arthur`,
      `Angela Lansbury`,
      `Betty White`,
      `Rue McClanahan`
      ],
    correctAnswer:`Angela Lansbury`
  },
  {
    question:`How many children does Jessica Fletcher have?`,
    answers: [
      `None`,
      `One`,
      `Two`,
      `Four`
      ],
    correctAnswer:`None`
  },
  {
    question:`Which of the following is NOT one of Jessica Fletcher's current or former professions?`,
    answers: [
      `Mystery writer`,
      `English teacher`,
      `Lawyer`,
      `College professor`
      ],
    correctAnswer:`Lawyer`
  },
  {
    question:`Which fictional town is "Murder, She Wrote" set in?`,
    answers: [
      `Cabot Cove, Maine`,
      `Elk Cove, Massachusetts`,
      `JB Cove, Rhode Island`,
      `Lobster Cove, Delaware`
      ],
    correctAnswer:`Cabot Cove, Maine`
  },
  {
    question:`What does Jessica Fletcher NEVER learn to do?`,
    answers: [
      `Ride a bicycle`,
      `Drive`,
      `Use a typewriter`,
      `Garden`
      ],
    correctAnswer:`Drive`
  },
  {
    question:`Which character did the actor Tom Bosley play?`,
    answers: [
      `Sheriff Mort Metzger`,
      `Deputy Andy Broom`,
      `Dr. Seth Hazlitt`,
      `Sheriff Amos Tupper`
      ],
    correctAnswer:`Sheriff Amos Tupper`
  },
  {
    question:`What is the name of Jessica Fletcher's nephew that's featured in multiple episodes?`,
    answers: [
      `Harry`,
      `Grady`,
      `Seth`,
      `Gil`
      ],
    correctAnswer:`Grady`
  },
  {
    question:`What is the title of J.B. Fletcher's first novel?`,
    answers: [
      `The Corpse Danced at Midnight`,
      `Tough Guys Don't Die`,
      `Footnote to Murder`,
      `The Corpse That Wasn't There`
      ],
    correctAnswer:`The Corpse Danced at Midnight`
  },
  {
    question:`Which "Murder, She Wrote" character is a secret agent?`,
    answers: [
      `Arthur Brent`,
      `Sam Booth`,
      `Michael Hagarty`,
      `Seth Hazlitt`
      ],
    correctAnswer:`Michael Hagarty`
  },
  {
    question:`Where does Jessica Fletcher buy a second home in the second half of the series?`,
    answers: [
      `Boston, Massachusetts`,
      `Providence, Rhode Island`,
      `Portland, Maine`,
      `New York City, New York`
      ],
    correctAnswer:`New York City, New York`
  }
];

//Sets starting question number & score
let questionNumber = 0;
let score = 0;

//Increments question number
function incrementQuestionNumber() {
  questionNumber ++;
  $('.js-question-number').text(questionNumber + 1);
}

//Increments score
function incrementScore() {
  score += 1;
  $('.js-score').text(score);
}

function renderQuizApp() {
  $('.question-page').hide();  
}

function generateQuestionPageHeader() {
  return `
    <section role="region" class="col-12">
      <div>
        <img src="images/typewriter-icon.png" alt="icon of a typewriter" class="typewriter-icon">
        <ul>
         <li class="li-margin-right">Question: <span class="js-question-number">0</span> / <span>10</span></li>
         <li class="li-margin-left">Score: <span class="js-score">0</span> / <span>10</span></li>
        </ul>
      </div>
     </section>
    `;
}

//Renders the question HTML form
function generateQuestionHTML(STORE) {
  return `
    <h2>${STORE.question}</h2>
    <form action="" method="get">
      <fieldset>
        <div>
          <input type="radio" id="radio-1" value="${STORE.answers[0]}" name="answerOption" required>
          <label for="radio-1">${STORE.answers[0]}</label>
        </div>
        <div>
          <input type="radio" id="radio-2" value="${STORE.answers[1]}" name="answerOption" required>
          <label for="radio-2">${STORE.answers[1]}</label>
        </div>
        <div>
          <input type="radio" id="radio-3" value="${STORE.answers[2]}" name="answerOption" required>
          <label for="radio-3">${STORE.answers[2]}</label>
        </div>
        <div>
          <input type="radio" id="radio-4" value="${STORE.answers[3]}" name="answerOption" required>
          <label for="radio-4">${STORE.answers[3]}</label>
        </div>
      </fieldset>
      <button type="submit" class="js-answer-submit">Submit Answer</button>
    </form>
    `;
}

//Renders the question form interface
function renderQuestionInterface(STORE) {
  $('#js-question-form').html(generateQuestionHTML(STORE));
}

//When start button is clicked, hides start page and renders quiz page
function startQuizApp() {
  $('.js-start-button').click(function () {
    $('.start-page').hide();
    $('.question-page').show();  
    $('header').html(generateQuestionPageHeader());
    $('.js-question-number').text(1);
    renderQuestionInterface(STORE[questionNumber]);
  });
}

function feedbackCorrectAnswer() {
  $('#js-question-form').html(`
    <section role="region">
      <section role="region">
        <h2>Correct!</h2>
        <img src="images/gifs/correct.gif" alt="jessica fletcher cheersing with a coffee mug" class="msw-gif">
      </section>
      <section role="region">
        <button type="button" class="js-next-button">Next</button>
      </section>
    </section>
    `);
  incrementScore();
}

function feedbackIncorrectAnswer() {
   let correctAnswer = STORE[questionNumber].correctAnswer;
   $('#js-question-form').html(`
    <section role="region">
      <section role="region">
          <h2>Incorrect!</h2>
          <img src="images/gifs/incorrect.gif" alt="jessica fletcher facepalming" class="msw-gif">
          <p>The correct answer was actually <span>"${correctAnswer}"</span></p>
      </section>
      <section role="region">
        <button type="button" class="js-next-button">Next</button>
      </section>
    </section>
    `);
}

//When submit button is clicked, stores selected answer as variable, stores correct answer as variable, runs corresponding feedback function
function getUserAnswer() {
  $(document).on('submit', function (event) {
    event.preventDefault();
    let correctAnswer = STORE[questionNumber].correctAnswer;
    let selectedAnswer = $('input:checked');
    let userAnswer = selectedAnswer.val();
    if (userAnswer === correctAnswer) {
      feedbackCorrectAnswer();
    } 
    else {
      feedbackIncorrectAnswer();
    }
  }); 
}

//Renders different results page based on score
function renderResultsPage() {
  if (score >= 8) {
    $('#js-question-form').html(`
        <section role="region">
          <h2>You got ${score} out of 10!</h2>
          <img src="images/gifs/good-score.gif" alt="jessica fletcher smiling" class="msw-gif">
          <p>Wow! You are a Cabot Cove citizen AND you just might give Jessica a run for her money.</p>
        </section>
        <section role="region">
          <button type="button" class="js-restart-button">Restart Quiz</button>
        </section>
      `);
  } else if (score < 8 && score >= 5) {
    $('#js-question-form').html(`
        <section role="region">
          <h2>You got ${score} out of 10!</h2>
          <img src="images/gifs/average-score.gif" alt="jessica fletcher smirking" class="msw-gif">
          <p>You might have visited Cabot Cove, but you aren't outsmarting Jessica any time soon.</p>
        </section>
        <section role="region">
          <button type="button" class="js-restart-button">Restart Quiz</button>
        </section>
      `);
  } else {
    $('#js-question-form').html(`
        <section role="region">
          <h2>You got ${score} out of 10!</h2>
          <img src="images/gifs/bad-score.gif" alt="jessica fletcher puzzled" class="msw-gif">
          <p>Have you even BEEN to Cabot Cove?!  What are you waiting for?! Go visit Jessica right now!!</p>
        </section>
        <section role="region">
          <button type="button" class="js-restart-button">Restart Quiz</button>
        </section>
      `);
  }
}

//When Next button is clicked,
function renderNextQuestion() {
 $('#js-question-form').on('click', '.js-next-button', function (event) {
    if(questionNumber < 9) {
      incrementQuestionNumber();
      renderQuestionInterface(STORE[questionNumber]);
    }
    else {
      renderResultsPage();
    }
  });
}

//When restart quiz button is pressed, reloads the page
function restartQuizButton() {
  $('#js-question-form').on('click', '.js-restart-button', function (event) {
    location.reload();
  });
}

function handleQuizApp() {
  renderQuizApp()
  startQuizApp();
  getUserAnswer();
  renderNextQuestion();
  restartQuizButton();
}

$(handleQuizApp);