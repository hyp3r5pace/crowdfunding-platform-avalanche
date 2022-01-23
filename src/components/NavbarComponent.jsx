import { useNavigate } from "react-router-dom";
export default function NavbarComponent(props) {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <nav className="leftNavbarContainer">
        <div className="navItem" onClick={() => navigate("/")}>
          Home
        </div>
        <div className="navItem" onClick={() => navigate("discover")}>
          Discover
        </div>
        <div className="navItem" onClick={() => navigate("create_project")}>
          Start a project
        </div>
      </nav>
      <div className="centerNavbarContainer">DEFINDSTARTER</div>
      <div className="rightNavbarContainer">
        <div className="navItem">{props.address}</div>
      </div>
    </div>
  );
}
