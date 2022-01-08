import "./style.css";
import NavbarComponent from "./components/NavbarComponent";
import HomeComponent from "./components/HomeComponent";
import FooterComponent from "./components/FooterComponent";
import CategoryComponent from "./components/CategoryComponent";
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-md";
import CreateProjectComponent from "./components/CreateProjectComponent";

function App() {
  return (
    <div className="app">
      <NavbarComponent />
      <CreateProjectComponent />
      <FooterComponent />
    </div>
  );
}

export default App;
