import CategoryComponent from "./CategoryComponent";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
export default function HomeComponent(props) {
  const scroll = (val) => {
      document.getElementsByClassName('recentUploadsContainer')[0].scrollLeft += val;
  } 
  return (
    <>
      <CategoryComponent />
      {/* siteStats */}
      <div className="siteStats">
        <div className="tagLine">
          Creative work shows us what’s possible.
          <br></br>
          Help fund it here.
        </div>
        <div className="smallHeading">WITHIN THE LAST DAY</div>
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

      <div className="suggestions">
        <div className="suggLeftContainer">
          <div className="featuredCard">
            <div className="featuredHeading">FEATURED PROJECT</div>
            <div className="featuredCardProjectImg"></div>
            <div className="featuredProjectHeading">Birds</div>
            <div className="featuredProjectDescription">
              A truthful short film, inspired by real events, about motherhood
              in prison A truthful short film, inspired by real events, about
              motherhood in prison A truthful short film, inspired by real
              events, about motherhood in prison A truthful short film, inspired
              by real events, about motherhood in prison
            </div>
            <div className="featuredProjectAuthor">{"By " + "Sayan Kar"}</div>
          </div>
        </div>
        <div className="suggRightContainer">
          <div className="recommendationList">
            <div className="recommendationHeading">RECOMMENDED FOR YOU</div>
            
            <div className="recommendationCard">
              <div className="rcmdCardImg"></div>
              <div className="rcmdCardDetails">
                <div className="rcmdCardHeading">
                  Discos : there us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the table
                </div>
                <div className="rcmdCardFundedPercentage">100% Funded</div>
                <div className="rcmdCardAuthor">By Soumyajit Deb</div>
              </div>
            </div>
            
            <div className="recommendationCard">
              <div className="rcmdCardImg"></div>
              <div className="rcmdCardDetails">
                <div className="rcmdCardHeading">
                  Discos : there us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the table
                </div>
                <div className="rcmdCardFundedPercentage">100% Funded</div>
                <div className="rcmdCardAuthor">By Soumyajit Deb</div>
              </div>
            </div>
            
            <div className="recommendationCard">
              <div className="rcmdCardImg"></div>
              <div className="rcmdCardDetails">
                <div className="rcmdCardHeading">
                  Discos : there us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the table
                </div>
                <div className="rcmdCardFundedPercentage">100% Funded</div>
                <div className="rcmdCardAuthor">By Soumyajit Deb</div>
              </div>
            </div>
          
          </div>
        </div>
      </div>
      <div className="recentUploads">
        <div className="recentUploadsHeader"> 
            <div className="recentUploadsHeading">RECENT UPLOADS</div>
            <div className="scrollButtons">
                <BsArrowLeftCircle className="scrollNavBtn" onClick={() => scroll(-300)}/>
                <BsArrowRightCircle className="scrollNavBtn" onClick={() => scroll(300)}/>
            </div>
        </div>
        
        <div className="recentUploadsContainer">
            <div className="projectCard">
                <div className="cardImg"></div>
                <div className="cardDetail">
                    <div className="cardTitle">Birds1</div>
                    <div className="cardDesc">there us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the tablethere us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the tablethere us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the table</div>
                    <div className="cardAuthor">By Sayan</div>
                </div>
            </div>

            <div className="projectCard">
                <div className="cardImg"></div>
                <div className="cardDetail">
                    <div className="cardTitle">Birds2</div>
                    <div className="cardDesc">there us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the tablethere us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the tablethere us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the table</div>
                    <div className="cardAuthor">By Sayan</div>
                </div>
            </div>

            <div className="projectCard">
                <div className="cardImg"></div>
                <div className="cardDetail">
                    <div className="cardTitle">Birds3</div>
                    <div className="cardDesc">there us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the tablethere us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the tablethere us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the table</div>
                    <div className="cardAuthor">By Sayan</div>
                </div>
            </div>

            <div className="projectCard">
                <div className="cardImg"></div>
                <div className="cardDetail">
                    <div className="cardTitle">Birds4</div>
                    <div className="cardDesc">there us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the tablethere us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the tablethere us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the table</div>
                    <div className="cardAuthor">By Sayan</div>
                </div>
            </div>

            <div className="projectCard">
                <div className="cardImg"></div>
                <div className="cardDetail">
                    <div className="cardTitle">Birds5</div>
                    <div className="cardDesc">there us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the tablethere us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the tablethere us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the table</div>
                    <div className="cardAuthor">By Sayan</div>
                </div>
            </div>

            <div className="projectCard">
                <div className="cardImg"></div>
                <div className="cardDetail">
                    <div className="cardTitle">Birds6</div>
                    <div className="cardDesc">there us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the tablethere us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the tablethere us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the table</div>
                    <div className="cardAuthor">By Sayan</div>
                </div>
            </div>

            <div className="projectCard">
                <div className="cardImg"></div>
                <div className="cardDetail">
                    <div className="cardTitle">Birds7</div>
                    <div className="cardDesc">there us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the tablethere us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the tablethere us sue the tablethere us sue the tablethere us
                  sue the tablethere us sue the table</div>
                    <div className="cardAuthor">By Sayan</div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
