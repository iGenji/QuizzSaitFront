import {getUserSessionData} from "../utils/session.js";

const AccueilPage = () => {
    document.querySelector("#page_home").classList.remove('full-size');
    let page = document.querySelector("#page");
    let user = getUserSessionData();  
    let accueilPage;
    if (user) {
        accueilPage =`<div class="container">
        <div class="row mt-3">
    
            <div class="col m-4">
            <h1 class="ml10 accueilPage_text">
            <span class="text-wrapper">
                <span class="letters">Commencez votre <br> Quizz'sait !</span>
            </span>
            </h1>
                <div class="m-5 text-center"><button type="button" class="btn btn-secondary btn-lg" onclick="window.location.href='/selector'">Let's begin</button></div>
            
            </div>
            <div class="col m-5">

            <div class="col m-1 border border-5 border-dark rounded text-center" id="div_violet_darker">
            <div class="m-3" id="button_title">Mes meilleurs scores</div>
            </div>
                <div class="mb-2 text-center"><h4 id="score1"></h4></div>
                <div class="mb-2 text-center"><h4 id="score2"></h4></div>
                <div class="mb-2 text-center"><h4 id="score3"></h4></div>
            </div>
        
        </div>
    </div>`}else{
        accueilPage=`<div class="container">
        <div class="row mt-3">
    
            <div class="col m-4">
            <h1 class="ml10 accueilPage_text">
            <span class="text-wrapper">
                <span class="letters">Commencez votre <br> Quizz'sait !</span>
            </span>
            <h4>Vous devez d'abord vous connecter</h4>
            </h1>
                <div class="m-5 text-center"><button type="button" class="btn btn-secondary btn-lg" onclick="window.location.href='/login'">Se connecter</button></div>
            
            </div>
            <div class="col m-5">

            <div class="col m-1 border border-5 border-dark rounded text-center" id="div_violet_darker">
            <div class="m-3" id="button_title">Mes meilleurs scores</div>
            </div>
                <div class="mb-2 text-center" id="recentScore"><h4>Vous devez d'abord vous connecter avant d'afficher vos scores</h4></div>
            </div>
        
        </div>
    </div>`;

    }
 
    page.innerHTML = accueilPage;
    let score1 = document.querySelector('#score1');
    let score2 = document.querySelector('#score2');
    let score3 = document.querySelector('#score3');
    score1.innerText = "1.  " + user.score1;
    score2.innerText = "2.  " + user.score2;
    score3.innerText = "3.  " + user.score3;
    /***************************************************************************************
    *    Title: Moving Letters
    *    Author: @tobiasahlin
    *    Date: 22-11-2020
    *    
    *    Availability: https://tobiasahlin.com/moving-letters/#2
    *
    ***************************************************************************************/
   var textWrapper = document.querySelector('.ml10 .letters');
   textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
   
   anime.timeline({loop: true})
     .add({
       targets: '.ml10 .letter',
       rotateY: [-90, 0],
       duration: 1300,
       delay: (el, i) => 45 * i
     }).add({
       targets: '.ml10',
       opacity: 0,
       duration: 1000,
       easing: "easeOutExpo",
       delay: 1000
     });
    }
    /*************************************************************************************** */

export default AccueilPage;
