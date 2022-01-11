import "./style.css";
import NavbarComponent from "./components/NavbarComponent";
import HomeComponent from "./components/HomeComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateProjectComponent from "./components/CreateProjectComponent";
import ConnectWallet from "./components/ConnectWallet";
import DiscoverComponent from "./components/DiscoverComponent";
import ProjectComponent from "./components/ProjectComponent";
function App() {
  return (
    <div className="app">
      {/* <ConnectWallet /> */}
      
        <BrowserRouter>
        <NavbarComponent />
          <Routes>
            <Route path="/" element={<ProjectComponent />} />
            <Route path="create_project" element={<CreateProjectComponent />} />
            <Route path="discover" element={<DiscoverComponent/>} />
          </Routes>
          <FooterComponent />
        </BrowserRouter>
      
    </div>
  );
}

export default App;
