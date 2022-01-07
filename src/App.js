import "./style.css"
function App() {
  return (
    <div className="app">
      {/* navbar component */}
      <div className="navbar">
        <div className="leftNavbarContainer">
          <div className="navItem">
            Discover
          </div>
          <div className="navItem">
            Start a project
          </div>
        </div>
        <div className="centerNavbarContainer">
          DEFINDSTARTER
        </div>
        <div className="rightNavbarContainer">
          <div className="navItem">
            Connect to Metamask
          </div>
        </div>
      </div>
      
      {/* Category component */}
      <div className="category">
        <div className="categoryItem">
          Arts
        </div>
        <div className="categoryItem">
          Film
        </div>
        <div className="categoryItem">
          {"Design & tech"}
        </div>
        <div className="categoryItem">
          Games
        </div>
      </div>
      
      {/* siteStats */}
      <div className="siteStats">
        <div className="tagLine">
          Creative work shows us what’s possible. 
          <br></br>
          Help fund it here.
        </div>
        <div className="smallHeading">
          WITHIN THE LAST DAY
        </div>
        <div className="stats">
          <div className="statItem">
            <div className="statItemValue">28</div>
            <div className="statItemTag">projects funded</div>
          </div>
          <div className="statItem">
            <div className="statItemValue">{"$" + "670,400"}</div>
            <div className="statItemTag">towards creative work</div>
          </div>
          <div className="statItem">
            <div className="statItemValue">6859</div>
            <div className="statItemTag">backings</div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
