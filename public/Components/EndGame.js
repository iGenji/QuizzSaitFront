let endGame = `
<div class="container mt-5 ">
    <div class="wrapper fadeInDown">
        <div id="formContent navBar_colors">
            <div class="fadeIn first mt-3">
                    
                <div class="mb-2 text-center">
                    <h1 class="drawing">Félicitation !</h1>
                </div>
            
            </div>
    
   
            <div class="fadeIn second mt-3">
            
                <div class="mb-2 text-center">
                    <h3 id="score1"></h3>
                </div>
            
            </div>
            <div class="fadeIn third mt-5">
            
            <div class="mb-5 text-center">
                <h3>Cliquez pour continuer</h3>
            </div>
        
        </div>
        </div>
    </div>
</div>
`;
const EndGame = () => {
  
  let page = document.querySelector("#page_home");
  page.innerHTML = endGame;
  let score = document.querySelector("#score1");
  score.innerText= "Vous avez obtenu un score de "+ localStorage.getItem('recentScore');
  page.setAttribute("onclick","window.location.href='/accueil';");
  
  anime({
    targets: '.drawing .lines path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
  });
 
};

export default EndGame;
