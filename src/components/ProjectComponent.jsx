import PaymentModal from "./PaymentModal";
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function ProjectComponent(props) {

    const [modalShow, setModalShow] = React.useState(false);
    const [projectDetails, setProjectDetails] = React.useState({
        amountRaised: '',
        cid: '',
        creatorName: '',
        fundingGoal: '',
        projectDescription: '',
        projectName: '',
        contributors: [],
        creationTime: 0,
        duration: 0,
        projectLink: '',
        amount: []
    });
    const [timerString, setTimerString] = useState('');
    const [isOver, setIsOver] = useState(false);
    const location = useLocation();
    const { index } = location.state;
    const PRECISION = 10 ** 18;

    async function getProjectDetails() {
        try {
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
                } = { ...res };

                setProjectDetails({
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
                    amount
                });
            });
        } catch(error) {
            alert('Error fetching details: ' + error);
            console.log(error);
        } 
    }

    React.useEffect(() => {
        getProjectDetails();
    }, []);

    // useEffect hook to handle the countdown timer
    React.useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = ((new Date()).getTime() / 1000);
            const remainingTime = currentTime - (projectDetails.creationTime + projectDetails.duration);
            const days = Math.floor(remainingTime / (60*60*24));
            const hours = Math.floor((remainingTime % (60*60*24)) / (60*60));
            const minutes = Math.floor((remainingTime % (60*60)) / 60);
            const seconds = Math.floor((remainingTime % 60));

            setTimerString(`${days}d ${hours}h ${minutes}m ${seconds}s`);

            if (remainingTime < 0) {
                clearInterval(interval);
                setIsOver(true);
            }
        }, 1000);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };

    });

    function onClickPayment() {
        setModalShow(true);
    }

    return (
        <>
        <div className="projectContainer">
            <div className="projectHeading">
                <h1>{projectDetails.projectName}</h1>
            </div>
            <div className="projectTopContainer">
                <div className="projectImage">
                    <img src={'https://' + projectDetails.cid} alt="test-pic" />
                </div>
                <div className="projectInformationContainer">
                    <div className="progressBarContainer">
                        <progress min="0" max="100" value="30"></progress>
                    </div>
                    <div className="fundingValue">
                        <h2>{Number(projectDetails.amountRaised)} AVAX</h2>
                    </div>
                    <p className="goalValueContainer">pledged of <span className="goalValue">{projectDetails.fundingGoal / PRECISION} AVAX</span> goal</p>
                    <div className="supporterContainer">
                        <h2>{projectDetails.contributors.length}</h2>
                    </div>
                    <p className="afterSupporterContainer">backers</p>
                    <div className="remainingDaysContainer">
                        <h2>{!isOver ? timerString : 'Funding duration over!!'}</h2> 
                </div>
                    {!isOver && <p className="afterRemainingDaysContainer">days to go</p>}
                    {!isOver &&  
                        <div className="supportButtonContainer">
                            <button className="supportButton" onClick={() => onClickPayment()}>Back this project</button>
                        </div>
                    }
                    {modalShow && <PaymentModal setModalShow={setModalShow}/>}
                </div>
            </div>
            <div className="projectBottomContainer">
                <div className="aboutContainer">
                    <h1 className="about">About</h1>
                    <p className="description">{projectDetails.projectDescription}</p>
                </div>
                <div className="projectLinkContainer">
                    <p className="projectLinkLabel">Project link:    
                        <a className="projectLink" target="_blank" href={projectDetails.projectLink}>{projectDetails.projectLink}</a></p>
                </div>
                <div className="projectLinkContainer">
                    <p className="projectLinkLabel">Owner: 
                        <a className="projectLink" href="https://www.instagram.com/sayan.kar2000/">{projectDetails.creatorName}</a>
                    </p>
                </div>
            </div>
            <div className="contributorHeader">
                Contributors
            </div>
            <div className="contributors">
                <div className="tableRow header">
                    <div className="item border">Address</div>
                    <div className="item border">Amount</div>
                </div>
                {projectDetails.contributors.map((contributor, idx) => (
                    <div className="tableRow darkRow">
                        <div className="item border">{contributor}</div>
                        <div className="item border">{projectDetails.amount[idx]}</div>
                    </div>
                ))}
            </div>
        </div>
    </>
    );
}

export default ProjectComponent;