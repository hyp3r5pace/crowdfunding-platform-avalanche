import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
export default function ScrollShowbarComponent(props) {
  const scroll = (val) => {
    document.getElementsByClassName("recentUploadsContainer")[0].scrollLeft +=
      val;
  };
  const renderCards = () => {
    return props.recentUploads.map((project) => {
      return (
        <div className="projectCard">
          <div
            className="cardImg"
            style={{ backgroundImage: `url(${"https://" + project.cid})` }}
          ></div>
          <div className="cardDetail">
            <div className="cardTitle">{project.projectName}</div>
            <div className="cardDesc">{project.projectDescription}</div>
            <div className="cardAuthor">{"By " + project.creatorName}</div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="recentUploads">
      <div className="recentUploadsHeader">
        <div className="recentUploadsHeading">{props.heading}</div>
        <div className="scrollButtons">
          <BsArrowLeftCircle
            className="scrollNavBtn"
            onClick={() => scroll(-300)}
          />
          <BsArrowRightCircle
            className="scrollNavBtn"
            onClick={() => scroll(300)}
          />
        </div>
      </div>

      <div className="recentUploadsContainer">
        {props.recentUploads.length ? (
          renderCards()
        ) : (
          <div className="noProjects">No recent uploads</div>
        )}
      </div>
    </div>
  );
}
