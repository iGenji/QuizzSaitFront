let homePage = `

<div>
<div class="homePage_text mt-5">
<h1 class="ml2 homePage_text">Bienvenue sur Quizz'sait</h1>
</div>
</div>
<div>
<div class="homePage_text_2 mt-5">
<h1 class="ml2 homePage_text_2">Cliquez pour continuer</h1>
</div>
</div>
`;

const HomePage = () => {
  
  let page = document.querySelector("#page_home");
  let navBar = document.querySelector("#navBar");
  navBar.innerHTML=``;
  page.setAttribute("onclick","window.location.href='/accueil';");
  page.innerHTML = homePage;
 
/***************************************************************************************
*    Title: Moving Letters
*    Author: @tobiasahlin
*    Date: 22-11-2020
*    
*    Availability: https://tobiasahlin.com/moving-letters/#2
*
***************************************************************************************/
var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
anime.timeline({loop: true})
  .add({
    targets: '.ml2 .letter',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (el, i) => 70*i
  }).add({
    targets: '.ml2',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

};

export default HomePage;
