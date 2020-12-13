import { RedirectUrl } from "./Router.js";
import { getUserSessionData,setUserSessionData } from "../utils/session.js";
import { API_URL } from "../utils/server.js";




let quizz = `<div class="container">
    <div class="justify-center flex-column">

    </div>
    <div id="game" class="justify-center flex-column">
        <div id="hud">
          
        </div>
        <h1 id="question">
            What is the answer to this question?
        </h1>
        <div class="choice-container">
            <p class="choice-prefix">A.</p>
            <p class="choice-text" data-number="1"></p>
        </div>
        <div class="choice-container">
            <p class="choice-prefix">B.</p>
            <p class="choice-text" data-number="2"></p>
        </div>
        <div class="choice-container">
            <p class="choice-prefix">C.</p>
            <p class="choice-text" data-number="3"></p>
        </div>
        <div class="choice-container">
            <p class="choice-prefix">D.</p>
            <p class="choice-text" data-number="4"></p>
        </div>
    </div>

    </div>

    <div class="footer">
    <div class="hud-item">
        <p id="progressText" class="hud-prefix">
            Question
        </p>
        <div id="progressBar">
            <div id="progressBarFull"></div>
        </div>
    </div>
    <div class="hud-item">
        <p class="hud-prefix">
            Score
        </p>
        <h1 class="hud-main-text" id="score">
            0
        </h1>
    </div>
    </div>`


    let question = document.querySelector('#question');
    let choices = Array.from(document.querySelectorAll('.choice-text'));
    let progressText = document.querySelector('#progressText');
    let scoreText = document.querySelector('#score');
    let progressBarFull = document.querySelector('#progressBarFull');
    
    
    let currentQuestion = {};
    let acceptingAnswers = true;
    let score = 0;
    let questionCounter = 0;
    let availableQuestions = [];
    let questions = [];
  
  
  const SCORE_QUESTION = 100;
  const MAX_QUESTIONS = 5;
  
        
    
const Quizz = () => {
  document.querySelector("#page_home").classList.remove('full-size');
  let page = document.querySelector("#page");
  page.innerHTML = quizz;
  
  
  let cat = localStorage.getItem('cat')
  
  
  getListCat(cat);
  
  
  question = document.querySelector('#question');
  choices = Array.from(document.querySelectorAll('.choice-text'));
  progressText = document.querySelector('#progressText');
  scoreText = document.querySelector('#score');
  progressBarFull = document.querySelector('#progressBarFull');
  
};

function getListCat(categorie){
    const user = getUserSessionData();
    if (!user) RedirectUrl("/error", "Resource not authorized. Please login.");
    let cat = localStorage.getItem('cat');
    fetch(API_URL + "questions/"+ cat, {
        method: "GET",
        async:false,
        headers: {
          Authorization: user.token,
        },
      })
    .then((response) => {
      if (!response.ok){
        throw new Error(
          "Error code : " + response.status + " : " + response.statusText
        );
      }
      return response.json();
    })
    .then((data) => toQuestionList(data))
    .catch((err) => onError(err))
    .then(startGame)
  };
  const toQuestionList = (data) => {
  
    questions.push(data);
    for (var i = 0; i < data.length; i++) { 
      
          questions.push(data[i]);

    }
    return questions;
  }

// main funtion 
function startGame(){
  questionCounter = 1;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
 
}

function getNewQuestion(){
  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
      localStorage.setItem('recentScore',score);
      trierScore(score);
      window.alert("Fin du quizz, vous allez être redirigé");
      return window.location.assign("/endgame");
  }

  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;

  const questionsIndex = (Math.floor(Math.random()*(availableQuestions.length-1)))+1;
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.title;

  var arrayValueJson = [currentQuestion.reponse1,currentQuestion.reponse2,currentQuestion.reponse3,currentQuestion.reponse4];
  var count = 0;

  // showing all 4 possible answers
  choices.forEach(choice => {
      choice.innerText = arrayValueJson[count];
      
      count ++;
  });

  availableQuestions.splice(questionsIndex,1);
  acceptingAnswers = true;

  questionCounter++;




// Defining if the user picked the right answer out of the 4 possible
choices.forEach(choice =>{
  choice.addEventListener('click',e =>{
      if(!acceptingAnswers) return;

      acceptingAnswers = false;
      let selectedChoice = e.target;
      let selectedAnswer = selectedChoice.innerText;
      
      let classToApply = selectedAnswer == currentQuestion.reponseCorrecte ? 'correct' : 'incorrect';

      if(classToApply === 'correct'){
          incrementScore(SCORE_QUESTION)
      }

      selectedChoice.parentElement.classList.add(classToApply);
      
      // Timeout between the change of questions for a smoother transition, 1000 ms
      setTimeout(() => {
          selectedChoice.parentElement.classList.remove(classToApply);
          getNewQuestion();
       },1000)

  });
});
}

// function that increments the score, called if the right answer is picked
function incrementScore(num){
  score = score + num;
  scoreText.innerText = score;
}

//function for order 3 first score of user
function trierScore(score){
  let username = getUserSessionData()
  let premierMeilleurScore = username.score1;
  let secondMeilleurScore = username.score2;
  let troisiemeMeilleurScore = username.score3;
  //si plus petit on fait rien
  if(troisiemeMeilleurScore>score){
    
  }
  //Si entre 3 et 2 : il prend la place du troisieme
  else if(score>troisiemeMeilleurScore && score<=secondMeilleurScore){
    troisiemeMeilleurScore=score;
    
  //Si entre 1 et 2 il prend la place de 2 et 2 prend la place de 3
  }else if(score>secondMeilleurScore && score<=premierMeilleurScore){
    let tmp = secondMeilleurScore;
    secondMeilleurScore = score;
    troisiemeMeilleurScore = tmp;
    
  //Si plus grand de 1 : 1 prend la place de 2 et 2 prend la place de 3
  }else if(score>premierMeilleurScore){
    let tmp = premierMeilleurScore;
    let tmp2 = secondMeilleurScore;
    premierMeilleurScore= score;
    secondMeilleurScore = tmp;
    troisiemeMeilleurScore = tmp2; 
  }

  let scoresUser = {
    username: username.username,
    score1: premierMeilleurScore,
    score2: secondMeilleurScore,
    score3: troisiemeMeilleurScore
  }

  fetch(API_URL + "users/scores", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    async:false,
    body: JSON.stringify(scoresUser), // body data type must match "Content-Type" header
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok)
      throw new Error(
        "Error code : " + response.status + " : " + response.statusText
      );
   
    return response.json();
  }).then((data) => updateScoresData(data))
  .catch((err) => onError(err));
};

const updateScoresData = (userData) => {
  
  let user = getUserSessionData();
  
  const userUpdate = {username:userData.username,token:user.token,email:userData.email,score1:userData.score1,score2:userData.score2,score3:userData.score3,isAutenticated: true };
  setUserSessionData(userUpdate);
  // re-render the navbar for the authenticated user
};
 



const onError = (err) => {
  console.error("QuizzPage::onError:", err);
  let errorMessage = "Error";
  if (err.message) {
    if (err.message.includes("401"))
      errorMessage =
        "Unauthorized access to this ressource : you must first login.";
    else errorMessage = err.message;
  }
  RedirectUrl("/error", errorMessage);
};

export default Quizz;
