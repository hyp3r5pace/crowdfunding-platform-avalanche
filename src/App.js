import "./style.css";
import NavbarComponent from "./components/NavbarComponent";
import HomeComponent from "./components/HomeComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateProjectComponent from "./components/CreateProjectComponent";
import ConnectWallet from "./components/ConnectWallet";

function App() {
  return (
    <div className="app">
      <ConnectWallet />
      {/* <NavbarComponent />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeComponent/>} />
            <Route path="create_project" element={<CreateProjectComponent />} />
          </Routes>
        </BrowserRouter>
      <FooterComponent /> */}
    </div>
  );
}

export default App;
