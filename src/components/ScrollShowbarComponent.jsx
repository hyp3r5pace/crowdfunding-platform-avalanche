import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
export default function ScrollShowbarComponent(props) {
    const scroll = (val) => {
        document.getElementsByClassName('recentUploadsContainer')[0].scrollLeft += val;
    } 
    return (
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
    );
}