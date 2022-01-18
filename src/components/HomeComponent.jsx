import CategoryComponent from "./CategoryComponent";
import ScrollShowbarComponent from "./ScrollShowbarComponent";
import context from "../context";
import { useContext } from "react";
export default function HomeComponent(props) {
  const contest = useContext(context);
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
              <div className="rcmdCardImg" ></div>
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
      <ScrollShowbarComponent />
    </>
  );
}
