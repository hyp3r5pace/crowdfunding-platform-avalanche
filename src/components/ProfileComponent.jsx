import ScrollShowbarComponent from "./ScrollShowbarComponent";
import { useLocation } from 'react-router-dom';

function ProfileComponent(props) {
    const location = useLocation();
    const { address } = location.state;

    async function getProjectList() {
        try {
            // fetch the project information from the contract for the address
            
        } catch(error) {
            console.log(error);
            alert('Error Fetching data: ' + error);
        }
    }

    return (
        <div className="profileContainer">
            <div className="profileHeadingContainer">
                <h1>User Name</h1>
            </div>
            <div className="profileAddressContainer">
                <h2>0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B</h2>
            </div>
            <div className="projectsContainer">
                <div className="projectList">
                    <ScrollShowbarComponent />
                </div>
            </div>
            <div className="projectsContainer">
                <div className="projectList">
                    <ScrollShowbarComponent />
                </div>
            </div>
            <div className="projectsContainer">
                <div className="projectList">
                    <ScrollShowbarComponent />
                </div>
            </div>
        </div>
    );
}

export default ProfileComponent;