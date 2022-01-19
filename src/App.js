import "./style.css";
import NavbarComponent from "./components/NavbarComponent";
import HomeComponent from "./components/HomeComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateProjectComponent from "./components/CreateProjectComponent";
import ConnectWallet from "./components/ConnectWallet";
import DiscoverComponent from "./components/DiscoverComponent";
import ProjectComponent from "./components/ProjectComponent";
import ProfileComponent from "./components/ProfileComponent";
import { useState } from "react";
import context from "./context";
import { ethers } from "ethers";
import { abi } from "./abi";
const CONTRACT_ADDRESS = "0xF122C172c96E58fF971F975436Bdadc52A5A21c4";

function App() {
  const [myContract, setMyContract] = useState(null);
  const [address, setAddress] = useState();

  let provider, signer, add;

  // Connects to Metamask and sets the myContract state with a new instance of the contract
  async function connect() {
    let res = await connectToMetamask();
    if (res === true) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      add = await signer.getAddress();
      setAddress(add);
      try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
        setMyContract(contract);
      } catch (err) {
        alert("CONTRACT_ADDRESS not set properly");
      }
    } else {
      alert("Couldn't connect to Metamask");
    }
  }

  // Helps open Metamask
  async function connectToMetamask() {
    try {
      await window.ethereum.enable();
      return true;
    } catch (err) {
      return false;
    }
  }
  const checkConnected = (component) => {
    return !myContract ? <ConnectWallet connectMetamask={connect}/> : component;
  };
  return (
    <context.Provider value={{ contract: myContract }}>
      <div className="app">
        <BrowserRouter>
          {myContract && <NavbarComponent />}
          <Routes>
            <Route path="/" element={checkConnected(<HomeComponent />)} />
            <Route path="create_project" element={checkConnected(<CreateProjectComponent />)} />
            <Route path="discover" element={checkConnected(<DiscoverComponent />)} />
            <Route path="profile" element={checkConnected(<ProfileComponent />)} />
            <Route path="project" element={checkConnected(<ProjectComponent />)} />
          </Routes>
          {myContract && <FooterComponent />}
        </BrowserRouter>
      </div>
    </context.Provider>
  );
}

export default App;
