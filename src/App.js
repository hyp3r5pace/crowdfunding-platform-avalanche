import "./style.css";
import NavbarComponent from "./components/NavbarComponent";
import HomeComponent from "./components/HomeComponent";
import FooterComponent from "./components/FooterComponent";
import CategoryComponent from "./components/CategoryComponent";
function App() {
  return (
    <div className="app">
      <NavbarComponent />
      <CategoryComponent />
      <HomeComponent />
      <FooterComponent />
    </div>
  );
}

export default App;
