import { setLayout } from "./utils/render.js";
import HomePage from "./Components/HomePage.js"
import {Router} from "./Components/Router.js";
import Navbar from "./Components/Navbar.js";

const HEADER_TITLE = "Quizz'sait";
const PAGE_TITLE = "Quizz'sait"
const FOOTER_TEXT = "Développé dans le cadre du cours de Web2 par Obey, Yvan, Patrick et Domitien \n Contact ";

Navbar();

Router();

setLayout(HEADER_TITLE, PAGE_TITLE, FOOTER_TEXT);
