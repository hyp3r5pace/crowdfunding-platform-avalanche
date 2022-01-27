import PaymentModal from "./PaymentModal";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import dummyPic from "../assets/pg1.jpg";

function ProjectComponent(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [projectDetails, setProjectDetails] = React.useState({
    amountRaised: 0,
    cid: "",
    creatorName: "",
    fundingGoal: 0,
    projectDescription: "",
    projectName: "",
    contributors: [],
    creationTime: 0,
    duration: 0,
    projectLink: "",
    amount: [],
    creatorAddress: "",
    category: "",
  });
  const [timerString, setTimerString] = useState("");
  const [isOver, setIsOver] = useState(false);
  const location = useLocation();
  const { index } = location.state;
  const PRECISION = 10 ** 18;

  // func to update the progress bar everytime getProjectDetails() executes.
  function updateProgressBar() {
    let progressBar = document.getElementsByClassName("progressBar")[0];
    progressBar.max = projectDetails.fundingGoal / PRECISION;
    progressBar.value = projectDetails.amountRaised / PRECISION;
  }

  async function getProjectDetails() {
    try {
      // fetching project information from the contract
      let res = await props.contract.getProject(parseInt(index)).then((res) => {
        let {
          amountRaised,
          cid,
          creatorName,
          fundingGoal,
          projectDescription,
          projectName,
          contributors,
          creationTime,
          duration,
          projectLink,
          amount,
          creatorAddress,
          refundPolicy,
          category,
          refundClaimed,
          claimedAmount,
        } = { ...res };

        setProjectDetails({
          amountRaised: amountRaised,
          cid: cid,
          creatorName: creatorName,
          fundingGoal: fundingGoal,
          projectDescription: projectDescription,
          projectName: projectName,
          contributors: contributors,
          creationTime: creationTime * 1,
          duration: duration,
          projectLink: projectLink,
          amount: amount,
          creatorAddress: creatorAddress,
          refundPolicy: refundPolicy,
          category: category,
          refundClaimed: refundClaimed,
          claimedAmount: claimedAmount,
        });
      });
    } catch (error) {
      alert("Error fetching details: " + error);
      console.log(error);
    }
  }

  React.useEffect(() => {
    getProjectDetails();
  }, []);

  // useEffect hook to handle the countdown timer
  React.useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime() / 1000;
      const remainingTime =
        Number(projectDetails.creationTime) +
        Number(projectDetails.duration) -
        currentTime;
      const days = Math.floor(remainingTime / (60 * 60 * 24));
      const hours = Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
      const seconds = Math.floor(remainingTime % 60);

      setTimerString(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      if (remainingTime < 0) {
        setTimerString("0d 0h 0m 0s");
        clearInterval(interval);
        // this condition is set because at initial render, creationTime and duration state are not set
        // so remaining time turns out to be negative
        if (projectDetails.creationTime > 0) {
          setIsOver(true);
        }
      }
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [projectDetails.creationTime, projectDetails.duration]);

  useEffect(() => {
    updateProgressBar();
  }, [projectDetails]);

  function onClickPayment() {
    setModalShow(true);
  }

  function getCategoryFromCode(val) {
    let categoryCode = ["Design & Tech", "Film", "Arts", "Games"];
    if (val >= 0 && val < 4) return categoryCode[val];
  }

  function displayDate(val) {
    let date = new Date(val * 1000);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }


  function isOwner() {
      return (props.userAddress === projectDetails.creatorAddress);
  }

  return (
    <>
      <div className="projectContainer">
        <div className="projectHeading">
          <h1>{projectDetails.projectName}</h1>
        </div>
        <div className="projectTopContainer">
          <div className="projectImage">
            <img
              src={
                projectDetails.cid ? "https://" + projectDetails.cid : dummyPic
              }
              alt="test-pic"
            />
          </div>
          <div className="projectInformationContainer">
            <div className="progressBarContainer">
              <progress
                min="0"
                max="100"
                value="30"
                className="progressBar"
              ></progress>
            </div>
            <div className="fundingValue">
              <h2>{projectDetails.amountRaised / PRECISION} AVAX</h2>
            </div>
            <p className="goalValueContainer">
              pledged of{" "}
              <span className="goalValue">
                {projectDetails.fundingGoal / PRECISION} AVAX
              </span>{" "}
              goal
            </p>
            <div className="supporterContainer">
              <h2>{projectDetails.contributors.length}</h2>
            </div>
            <p className="afterSupporterContainer">backers</p>
            <div className="remainingDaysContainer">
              <h2>{!isOver ? timerString : "Funding duration over!!"}</h2>
            </div>
            {!isOver && (
              <p className="afterRemainingDaysContainer">
                time left for funding
              </p>
            )}
            {!isOver ? (!isOwner() && (
              <div className="supportButtonContainer">
                <button
                  className="supportButton"
                  onClick={() => onClickPayment()}
                >
                  Back this project
                </button>
              </div>
            )) : isOwner() ? (
              <div className="supportButtonContainer">
                <button
                  className="supportButton"
                  onClick={() => onClickPayment()}
                >
                  Claim Fund
                </button>
              </div>
            ) : (
              <div className="supportButtonContainer">
                <button
                  className="supportButton"
                  onClick={() => onClickPayment()}
                >
                  Claim Refund
                </button>
              </div>
            )}
            {modalShow && (
              <PaymentModal
                setModalShow={setModalShow}
                contract={props.contract}
                index={index}
                projectDetails={projectDetails}
                setProjectDetails={setProjectDetails}
                userAddress={props.userAddress}
              />
            )}
          </div>
        </div>
        <div className="projectBottomContainer">
          <div className="aboutContainer">
            <h1 className="about">About</h1>
            <p className="description">{projectDetails.projectDescription}</p>
          </div>
          <div className="projectLinkContainerWrapper">
            <div className="projectLinkContainer">
              <p className="projectLinkLabel">
                Refund Policy:{" "}
                {projectDetails.refundPolicy ? "Non-Refundable " : "Refundable"}
              </p>
            </div>
            <div className="projectLinkContainer">
              <p className="projectLinkLabel">
                Project link:
                <a
                  className="projectLink"
                  target="_blank"
                  href={projectDetails.projectLink}
                >
                  {projectDetails.projectLink}
                </a>
              </p>
            </div>
            <div className="projectLinkContainer">
              <p className="projectLinkLabel">
                Owner:
                <Link
                  className="projectLinkLabel"
                  to="/profile"
                  state={{
                    address: projectDetails.creatorAddress,
                    name: projectDetails.creatorName,
                  }}
                >
                  {" " + projectDetails.creatorName}
                </Link>
              </p>
            </div>
            <div className="projectLinkContainer">
              <p className="projectLinkLabel">
                Category: {getCategoryFromCode(projectDetails.category)}
              </p>
            </div>
            <div className="projectLinkContainer">
              <p className="projectLinkLabel">
                Creation Time: {displayDate(projectDetails.creationTime)}
              </p>
            </div>
          </div>
        </div>
        <div className="contributorHeader">Contributors</div>
        <div className="contributors">
          <div className="tableRow header">
            <div className="item border">Address</div>
            <div className="item border">Amount</div>
          </div>
          {projectDetails.contributors.length > 0 ? (
            projectDetails.contributors.map((contributor, idx) => (
              <div
                className={
                  "tableRow " + (idx % 2 === 0 ? "darkRow" : "lightRow")
                }
                key={idx}
              >
                <div className="item border">{contributor}</div>
                <div className="item border">
                  {projectDetails.amount[idx] / PRECISION}
                </div>
              </div>
            ))
          ) : (
            <div className="noProjects">No contributors yet</div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProjectComponent;
