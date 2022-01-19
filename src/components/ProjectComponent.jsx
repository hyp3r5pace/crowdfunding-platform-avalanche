import PaymentModal from "./PaymentModal";
import React from 'react';

function ProjectComponent(props) {

    const [modalShow, setModalShow] = React.useState(false);

    function onClickPayment() {
        setModalShow(true);
    }

    return (
        <>
        <div className="projectContainer">
            <div className="projectHeading">
                <h1>Project Name</h1>
            </div>
            <div className="projectTopContainer">
                <div className="projectImage">
                    <img src="https://images.pexels.com/photos/6335/man-coffee-cup-pen.jpg" alt="test-pic" />
                </div>
                <div className="projectInformationContainer">
                    <div className="progressBarContainer">
                        <progress min="0" max="100" value="30"></progress>
                    </div>
                    <div className="fundingValue">
                        <h2>1,000 AVAX</h2>
                    </div>
                    <p className="goalValueContainer">pledged of <span className="goalValue">1,500 AVAX</span> goal</p>
                    <div className="supporterContainer">
                        <h2>1,945</h2>
                    </div>
                    <p className="afterSupporterContainer">backers</p>
                    <div className="remainingDaysContainer">
                        <h2>3</h2>
                    </div>
                    <p className="afterRemainingDaysContainer">days to go</p>
                    <div className="supportButtonContainer">
                        <button className="supportButton" onClick={() => onClickPayment()}>Back this project</button>
                    </div>
                    {modalShow && <PaymentModal />}
                </div>
            </div>
            <div className="projectBottomContainer">
                <div className="aboutContainer">
                    <h1 className="about">About</h1>
                    <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed 
                    ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                    eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam 
                    voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione 
                    voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci 
                    velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut 
                    enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea 
                    commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae 
                    consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                </div>
                <div className="projectLinkContainer">
                    <p className="projectLinkLabel">Project link:    
                        <a className="projectLink" href="https://www.kickstarter.com/"> https://www.kickstarter.com/</a></p>
                </div>
                <div className="ownerNameContainer">
                    <p className="ownerNameLabel">Owner: 
                        <a className="ownerName" href="https://www.instagram.com/sayan.kar2000/"> Sayan Kar</a>
                    </p>
                </div>
            </div>
        </div>
    </>
    );
}

export default ProjectComponent;