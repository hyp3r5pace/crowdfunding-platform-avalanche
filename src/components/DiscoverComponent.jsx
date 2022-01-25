import CategoryComponent from "./CategoryComponent";
import { useState } from "react";
export default function DiscoverComponent(props) {
    const [filter, setFilter] = useState(-1);
    const [projects, setProjects] = useState(0);
    const getAllProjects = async () => {
        try {
          let res = await props.contract.getAllProjectDetails().then((res) => {
            let tmp = [];
            for (const index in res) {
              let {
                amountRaised,
                cid,
                creatorName,
                fundingGoal,
                projectDescription,
                projectName,
                totalContributors,
              } = { ...res[index] };
              tmp.push({
                amountRaised,
                cid,
                creatorName,
                fundingGoal,
                projectDescription,
                projectName,
                totalContributors,
                index,
              });
            }
            return tmp;
          });
        } catch (err) {
          alert(err);
        }
      };
    const renderCards = () => {
        
    }
    return (
        <>
        <CategoryComponent />
        <div className="discoverHeading">Discover</div>
        <div className="discoverContainer">
           

            <div className="projectCardWrapper">
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
            
            <div className="projectCardWrapper">
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
            
            <div className="projectCardWrapper">
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
            
            <div className="projectCardWrapper">
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
            
            <div className="projectCardWrapper">
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
            
            <div className="projectCardWrapper">
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
            
            <div className="projectCardWrapper">
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