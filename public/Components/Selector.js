let selector = 
`<div class="container fadeInDown">
        <div class="row mt-3">
            <div class="col">
                <div class="border border-5 border-secondary rounded fadeIn first" id="div_violet_smoother">
                    <div class="m-3">
                        <h5>Veuillez selectionner un thème </h5>
                    </div>
                    <div class="m-3">
                        <h6>Le Quizz commencera dès qu'un thème sera selectionné</h6>
                    </div>
                </div>
                        <div class = "wrapper fadeIn Second">
                            <div class="mt-2">
                                <div class="form-check">
                                
                                
                                        <div class="m-2">
                                        <button type="button" class="btn btn-secondary btn-lg" id="div_orange_smoother" onclick="window.location.href='/quizz';localStorage.setItem('cat','Manga')">Anime/Manga</button>
                                        </div>
                            
                            
                                
                                </div>
                            </div>
                            <div class="mt-2">
                                <div class="form-check">
                                
                                
                                        <div class="m-2">
                                        <button type="button" class="btn btn-secondary btn-lg" id="div_vert" onclick="window.location.href='/quizz';localStorage.setItem('cat','Geographie')">Géographie</button>
                                        </div>
                            
                            
                                
                                </div>
                            </div>

                            <div class="mt-2">
                                <div class="form-check">
                                
                                
                                        <div class="m-2">
                                        <button type="button" class="btn btn-secondary btn-lg" id="div_violet" onclick="window.location.href='/quizz';localStorage.setItem('cat','Histoire')">Histoire</button>
                                        </div>
                            
                            
                                
                                </div>
                            </div>

                            <div class="mt-2">
                            <div class="form-check">
                            
                            
                                    <div class="m-2">
                                    <button type="button" class="btn btn-secondary btn-lg" id="div_blue" onclick="window.location.href='/quizz';localStorage.setItem('cat','Art')">Art/Littérature</button>
                                    </div>
                        
                        
                            
                            </div>
                            </div>
                            <div class="mt-2">
                            <div class="form-check">
                            
                            
                            <div class="m-2">
                            <button type="button" class="btn btn-secondary btn-lg" id="div_grey" onclick="window.location.href='/quizz';localStorage.setItem('cat','Technologie')">Technologie</button>
                            </div>
                    
                
                        
                            </div>
                        </div>
                       

            </div>
                
            
                
                    
                </div>
                
            </div>

        </div>
   
    
   `;



let page = document.querySelector("#page");

const Selector = () => {
  document.querySelector("#page_home").classList.remove('full-size');
  let page = document.querySelector("#page");
  return (page.innerHTML = selector);
 
};

export default Selector;
