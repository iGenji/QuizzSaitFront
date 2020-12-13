/* In a template literal, the ` (backtick), \ (backslash), and $ (dollar sign) characters should be 
escaped using the escape character \ if they are to be included in their template value. 
By default, all escape sequences in a template literal are ignored.*/
import { getUserSessionData, setUserSessionData } from "../utils/session.js";
import { RedirectUrl } from "./Router.js";
import Navbar from "./Navbar.js";
import { API_URL } from "../utils/server.js";

let loginPage = `
<div class="container mt-5 ">
  <div class="wrapper fadeInDown">
    <div id="formContent navBar_colors">
    <div class="fadeIn first mt-3">
      <h3>Connexion</h3>
    </div>
        <form>
        <div class="form-group mt-3 fadeIn second">
          <p>Email</p>
          <input class="form-control" id="email" type="text" name="email" placeholder="Entrez votre email" required="" pattern="^\\w+([.-]?\\w+)*@\\w+([\.-]?\\w+)*(\\.\\w{2,4})+\$" />
        </div>
        <div class="form-group fadeIn third">
          <p><label for="password">Password</label></p>
          <input class="form-control" id="password" type="password" name="password" placeholder="Enter votre mot de passe" required="" pattern=".*[A-Z]+.*" />
        </div>
        <div class="alert alert-danger m-2 d-none" id="messageBoard"></div>
        <button class="btn btn-primary mt-2 fadeIn third" id="btn" type="submit">Se connecter</button>
        <!-- Create an alert component with bootstrap that is not displayed by default-->
        
        </form>
        <br>

    </div>
  </div>
</div>
`;

const LoginPage = () => {
  document.querySelector("#page_home").classList.remove('full-size');
  let page = document.querySelector("#page");
  page.innerHTML = loginPage;
  let loginForm = document.querySelector("form");
  const user = getUserSessionData();
  if (user) {
    // re-render the navbar for the authenticated user
    Navbar();
    RedirectUrl("/");
  } else loginForm.addEventListener("submit", onLogin);
};

const onLogin = (e) => {
  e.preventDefault();
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  let user = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  fetch(API_URL + "users/login", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(user), // body data type must match "Content-Type" header
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Error code : " + response.status + " : " + response.statusText
        );
      return response.json();
    })
    .then((data) => onUserLogin(data))
    .catch((err) => onError(err));
};

const onUserLogin = (userData) => {
  console.log("onUserLogin:", userData);
  const user = { ...userData, isAutenticated: true };
  setUserSessionData(user);
  // re-render the navbar for the authenticated user
  Navbar();
  RedirectUrl("/accueil");
};

const onError = (err) => {
  let messageBoard = document.querySelector("#messageBoard");
  let errorMessage = "";
  if (err.message.includes("401")) errorMessage = "Wrong username or password.";
  else errorMessage = err.message;
  messageBoard.innerText = errorMessage;
  // show the messageBoard div (add relevant Bootstrap class)
  messageBoard.classList.add("d-block");
};

export default LoginPage;
