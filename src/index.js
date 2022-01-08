import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {FaTwitter} from "react-icons/fa"
import {IconContext} from "react-icons"
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
<BrowserRouter>
    <App />
</BrowserRouter>, 
document.getElementById("root")
);
