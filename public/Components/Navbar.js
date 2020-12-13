let navBar = document.querySelector("#navBar");
import {getUserSessionData} from "../utils/session.js";
// destructuring assignment
const Navbar = () => {
  let navbar;
  let user = getUserSessionData();

  if (user) {
      
    localStorage.setItem('scoreUn',user.score1);
    localStorage.setItem('scoreDeux',user.score2);
    localStorage.setItem('scoreTrois',user.score3);
    navbar = `<nav class="navbar navbar-expand-lg navbar-light navBar_colors mb-2" id="navBar">
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav" id="navBar_text">
      <a class="nav-item nav-link" href="/">Accueil</a>
      <a class="nav-item nav-link" href="#" data-uri="/logout">Logout</a>
      <a class="nav-item nav-link disabled" href="#">${user.username}</a>

      
    </div>
  </div>
  </nav>`;
  } else {
    navbar = `<nav class="navbar navbar-expand-lg navbar-light navBar_colors mb-2" id="navBar">
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        
       
        <a class="nav-item nav-link" href="/" class="right">Accueil</a>
        <a class="nav-item nav-link" href="/login" class="right">Login</a>
        <a class="nav-item nav-link" href="/login" class="right">Register</a>
        
      </div>
    </div>
    </nav>`;
  }

  return (navBar.innerHTML = navbar);
};

export default Navbar;
