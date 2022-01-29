# Introduction  
In this tutorial, we will learn how to build a decentralized kickstarter dApp having features namely create project, fund a project, withdraw fund, get refund if funding isn't successful etc. We will build the smart contract in Solidity and the frontend of our application with the help of ReactJS.  

# Prerequisites
- Familiarity with ReactJS and Solidity.  
- Should've completed [Deploy a Smart Contract on Avalanche using Remix and MetaMask](https://learn.figment.io/tutorials/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask) tutorial  
  
# Requirements
- [Node.js](https://nodejs.org/en/download/releases/) v10.18.0+  
- [Metamask extension](https://metamask.io/download/) on your browser  
  
# Implementing the smart contract

Now we will build the smart contract of our application. Let's start by making a contract named **crowdfunding**.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract crowdfunding {

}
``` 

Let's define the structures and enums that will be required to define states. We will make two enums **Category**, which can have four values representing the category to which the project belongs, and the other enum **RefundPolicy**, it can have two values:
* *REFUNDABLE*:- This type represent that on failing to achieve the goal amount within the specified duration, all the raised funds will be returned to contributors.      
* *NONREFUNDABLE*:- For this type of project, creator can claim the amount even if the goal is not achieved.

Next, we declare our structures, we will create three  **Project**, **ProjectMetadata** and **Funded**. 

```solidity
// The category values
enum Category{
    DESIGNANDTECH,
    FILM,
    ARTS,
    GAMES
}

// Refund policies 
enum RefundPolicy{
    REFUNDABLE,
    NONREFUNDABLE
}

// Structure of each project in our dApp 
struct Project{
    string projectName;             // Stores the project's name
    string projectDescription;      // Stores the project's description
    string creatorName;             // Stores the project creator name
    string projectLink;             // Stores project link if any
    string cid;                     // Stores the ipfs link to project's image
    uint256 fundingGoal;            // Stores the funding goal
    uint256 duration;               // Stores the duration of project in minutes
    uint256 creationTime;           // Stores the project creation time
    uint256 amountRaised;           // Stores the amount contributed to this project
    address creatorAddress;         // Stores the creator's address
    Category category;              // Stores the project category  
    RefundPolicy refundPolicy;      // Stores the refund policy
    address[] contributors;         // Stores the contributors of this project
    uint256[] amount;               // Stores the amount contributed by conrtibutors at corresponding index
    bool[] refundClaimed;           // Keeps record if the contributors claimed refund at cooresponding index
    bool claimedAmount;             // Keeps record if creator claimed raised funds
}

// Structure used to return metadata of each project
struct ProjectMetadata{
    string projectName;             // Stores the project's name
    string projectDescription;      // Stores the project's description
    string creatorName;             // Stores the project creator name
    string cid;                     // Stores Ipfs link to project's image
    uint256 fundingGoal;            // Stores the goal amount
    uint256 amountRaised;           // Stores raised funds
    uint256 totalContributors;      // Stores the length of contributors array
    uint256 creationTime;           // Stores the creation time
    uint256 duration;               // Stores duration for which project can be funded  
    Category category;              // Stores the project category
}

// Each user funding gets recorded in Funded structure
struct Funded{
	uint256 projectIndex;           // Stores the project index of project that's funded
	uint256 totalAmount;            // Stores the amount funded
}
```

We now define the state variables. 

```solidity
// Stores all the projects 
Project[] projects;

// Stores the indexes of projects created on projects list by an address
mapping(address => uint256[]) addressProjectsList;

// Stores the list of fundings  by an address
mapping(address => Funded[]) addressFundingList;
```

Now, we define a modifier which will be used to check if the parameter passed is a valid index in projects array.

```solidity
// Checks if an index is a valid index in projects array
modifier validIndex(uint256 _index) {
    require(_index < projects.length, "Invalid Project Id");
    _;
}
```


  
## Setting up Metamask
  
Log in to Metamask -> Click the Network drop-down -> Select custom RPC  
    
![image of metamask](https://raw.githubusercontent.com/figment-networks/learn-tutorials/master/assets/create-an-amm-on-avalanche_metamask.png)  
#### FUJI Tesnet Settings:  
 - **Network name:** Avalanche FUJI C-Chain  
 - **New RPC URL:** [ https://api.avax-test.network/ext/bc/C/rpc]( https://api.avax-test.network/ext/bc/C/rpc)  
 - **ChainID:** `43113`  
 - **Symbol:** `C-AVAX`  
 - **Explorer:** [https://cchain.explorer.avax-test.network]( https://cchain.explorer.avax-test.network)  
  
Fund your address from the given [faucet](https://faucet.avax-test.network/).  
  
## Deploy using Remix  
  
Open [Remix](https://remix.ethereum.org/) --> Select Solidity  
  
![Picture of Remix site](https://raw.githubusercontent.com/figment-networks/learn-tutorials/master/assets/create-an-amm-on-avalanche_remix.png)  

    
Create a `crowdfunding.sol` file in the remix file explorer and paste the following code:  
  
```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract crowdfunding{
    enum Category{
        DESIGNANDTECH,
        FILM,
        ARTS,
        GAMES
    }

    enum RefundPolicy{
        REFUNDABLE,
        NONREFUNDABLE
    }

    // Structure of each project in our dApp 
    struct Project{
        string projectName;
        string projectDescription;
        string creatorName;
        string projectLink;
        string cid;
        uint256 fundingGoal;
        uint256 duration;
        uint256 creationTime;
        uint256 amountRaised;
        address creatorAddress;
        Category category;
        RefundPolicy refundPolicy;
        address[] contributors;
        uint256[] amount;
        bool[] refundClaimed;
        bool claimedAmount;
    }

    // Structure used to return metadata of each project
    struct ProjectMetadata{
        string projectName;
        string projectDescription;
        string creatorName;
        string cid;
        uint256 fundingGoal;
        uint256 amountRaised;
        uint256 totalContributors;
        uint256 creationTime;
        uint256 duration;
        Category category;
    }

    // Each user funding gets recorded in Funded structure
    struct Funded{
		uint256 projectIndex;
		uint256 totalAmount;
    }

    // Stores all the projects 
    Project[] projects;

    // Stores the indexes of projects created on projects list by an address
    mapping(address => uint256[]) addressProjectsList;

    // Stores the list of fundings  by an address
    mapping(address => Funded[]) addressFundingList;

    // Checks if an index is a valid index in projects array
    modifier validIndex(uint256 _index) {
        require(_index < projects.length, "Invalid Project Id");
        _;
    }

    // Create a new project and updates the addressProjectsList and projects array
    function createNewProject(
        string memory _name,
        string memory _desc,
        string memory _creatorName,
        string memory _projectLink,
        string memory _cid,
        uint256 _fundingGoal,
        uint256 _duration,
        Category _category,
        RefundPolicy _refundPolicy
    ) external {
        projects.push(Project({
            creatorAddress: msg.sender,
            projectName: _name,
            projectDescription: _desc,
            creatorName: _creatorName,
            projectLink: _projectLink,
            cid: _cid,
            fundingGoal: _fundingGoal * 10**18,
            duration: _duration * (1 minutes),
            creationTime: block.timestamp,
            category: _category,
            refundPolicy: _refundPolicy,
            amountRaised: 0,
            contributors: new address[](0),
            amount: new uint256[](0),
            claimedAmount: false,
            refundClaimed: new bool[](0)
        }));
        addressProjectsList[msg.sender].push(projects.length - 1);
    }

    // Returns the project metadata of all entries in projects
    function getAllProjectsDetail() external view returns(ProjectMetadata[] memory allProjects) {
        ProjectMetadata[] memory newList = new ProjectMetadata[](projects.length);
        for(uint256 i = 0; i < projects.length; i++){
            newList[i] = ProjectMetadata(
                projects[i].projectName,
                projects[i].projectDescription,
                projects[i].creatorName,
                projects[i].cid,
                projects[i].fundingGoal,
                projects[i].amountRaised,
                projects[i].contributors.length,
                projects[i].creationTime,
                projects[i].duration,
                projects[i].category
            );
        }
        return newList;
    }

    // Takes array of indexes as parameter
    // Returns array of metadata of project at respective indexes 
    function getProjectsDetail(uint256[] memory _indexList) external view returns(ProjectMetadata[] memory projectsList) {
        ProjectMetadata[] memory newList = new ProjectMetadata[](_indexList.length);
        for(uint256 index = 0; index < _indexList.length; index++) {
            if(_indexList[index] < projects.length) {
                uint256 i = _indexList[index]; 
                newList[index] = ProjectMetadata(
                    projects[i].projectName,
                    projects[i].projectDescription,
                    projects[i].creatorName,
                    projects[i].cid,
                    projects[i].fundingGoal,
                    projects[i].amountRaised,
                    projects[i].contributors.length,
                    projects[i].creationTime,
                    projects[i].duration,
                    projects[i].category
                );
            } else {
                newList[index] = ProjectMetadata(
                    "Invalid Project",
                    "Invalid Project",
                    "Invalid Project",
                    "Invalid Project",
                    0,
                    0,
                    0,
                    0,
                    0,
                    Category.DESIGNANDTECH
                );
            }

        }
        return newList;
    }

    // Returns the project at the given index
    function getProject(uint256 _index) external view validIndex(_index) returns(Project memory project) {
        return projects[_index];
    }

    // Returns array of indexes of projects created by creator
    function getCreatorProjects(address creator) external view returns(uint256[] memory createdProjects) {
        return addressProjectsList[creator];
    }

    // Returns array of details of fundings by the contributor
    function getUserFundings(address contributor) external view returns(Funded[] memory fundedProjects) {
        return addressFundingList[contributor];
    }

    // Helper function adds details of Funding to addressFundingList
    function addToFundingList(uint256 _index) internal validIndex(_index) {
        for(uint256 i = 0; i < addressFundingList[msg.sender].length; i++) {
            if(addressFundingList[msg.sender][i].projectIndex == _index) {
                addressFundingList[msg.sender][i].totalAmount += msg.value;
                return;
            }
        }
        addressFundingList[msg.sender].push(Funded(_index, msg.value));
    }

    // Helper fundtion adds details of funding to the project in projects array
    function addContribution(uint256 _index) internal validIndex(_index)  {
        for(uint256 i = 0; i < projects[_index].contributors.length; i++) {
            if(projects[_index].contributors[i] == msg.sender) {
                projects[_index].amount[i] += msg.value;
                addToFundingList(_index);
                return;
            }
        }
        projects[_index].contributors.push(msg.sender);
        projects[_index].amount.push(msg.value);
        if(projects[_index].refundPolicy == RefundPolicy.REFUNDABLE) {
            projects[_index].refundClaimed.push(false);
        }
        addToFundingList(_index);
    }

    // Funds the projects at given index
    function fundProject(uint256 _index) payable external validIndex(_index)  {
        require(projects[_index].creatorAddress != msg.sender, "You are the project owner");
        require(projects[_index].duration + projects[_index].creationTime >= block.timestamp, "Project Funding Time Expired");
        addContribution(_index);
        projects[_index].amountRaised += msg.value;
    }

    // Helps project creator to transfer the raised funds to his address
    function claimFund(uint256 _index) validIndex(_index) external {
        require(projects[_index].creatorAddress == msg.sender, "You are not Project Owner");
        require(projects[_index].duration + projects[_index].creationTime < block.timestamp, "Project Funding Time Not Expired");
        require(projects[_index].refundPolicy == RefundPolicy.NONREFUNDABLE 
                    || projects[_index].amountRaised >= projects[_index].fundingGoal, "Funding goal not reached");
        require(!projects[_index].claimedAmount, "Already claimed raised funds");
        projects[_index].claimedAmount = true;
        payable(msg.sender).transfer(projects[_index].amountRaised);
    }

    // Helper function to get the contributor index 
    function getContributorIndex(uint256 _index) validIndex(_index) internal view returns(int256) {
        int256 contributorIndex = -1;
        for(uint256 i = 0; i < projects[_index].contributors.length; i++) {
            if(msg.sender == projects[_index].contributors[i]) {
                contributorIndex = int256(i);
                break;
            }
        }
        return contributorIndex;
    }

    // Enables the contributors to claim refund when refundable project doesn't reach its goal
    function claimRefund(uint256 _index) validIndex(_index) external {
        require(projects[_index].duration + projects[_index].creationTime < block.timestamp, "Project Funding Time Not Expired");
        require(projects[_index].refundPolicy == RefundPolicy.REFUNDABLE 
                    && projects[_index].amountRaised < projects[_index].fundingGoal, "Funding goal not reached");
        
        int256 index = getContributorIndex(_index);
        require(index != -1, "You did not contribute to this project");
        
        uint256 contributorIndex = uint256(index);
        require(!projects[_index].refundClaimed[contributorIndex], "Already claimed refund amount");
        
        projects[_index].refundClaimed[contributorIndex] = true;
        payable(msg.sender).transfer(projects[_index].amount[contributorIndex]);
    }
}
```
  
Now, navigate to the solidity contract compiler tab on the left side navigation bar and click the blue button to compile `crowdfunding.sol` contract. Also, note down the `ABI` after compilation is completed.  

Navigate to deploy tab and open the "ENVIRONMENT" drop-down. Select "Injected Web3" (make sure metamask is loaded) and click the "deploy" button.  
  
Approve the transaction on Metamask pop-up interface. Once our contract is deployed successfully, make note of the deployed `contract address`.  
    
# Creating a frontend in React  
  
Now, we are going to create a react app and set up the frontend of the application.  
Open a terminal and navigate to the directory where we will create the application.  
  
```bash
cd /path/to/directory
```
  
Now, clone the github repository, move into the newly created `crowdfunding-platform-avalanche` directory and install all dependencies.  
  
```bash
git clone https://github.com/hyp3r5pace/crowdfunding-platform-avalanche.git
cd crowdfunding-platform-avalanche
npm install
```
  
In our react application we keep all the react components in the `src/components` directory.  
  
### HomeComponent  
It renders the home page of the dApp. The home page displays various projects which are being posted on the dApp for funding. The home page has three sections, mainly a featured project section, a recommended project section, and a recent upload section. The recommended project section recommends some project for you to check out. The recent upload section displays projects which were uploaded recently for funding. Also, at the top of the home page, the total number of projects posted on the site is displayed along with total amount of AVAX funded till date and also number of unique users who funded the projects.

### CreateProjectComponent  
It renders a form for creating new project. The form has various inputs, required to create a new project such as project category, project name, project description, creator name, image, project site link, funding goal, duration of the funding, refund policy. The project details are sent to the smart contract upon submission of the form. The image provided in the form is then uploaded to IPFS before sending the project details to the smart contract. Thus, the smart contract doesn't contain the image itself, but a IPFS link to the image.

### ProjectComponent  
The project component renders all the details about a individual project. At the top, it displays the project name and image, then the total funding it recieved till now, number of unique people who funded the project and a button for user to fund the project with AVAX. After that, it displays the project description and other project information such as project owner name, project link, refund policy, project category and creation date. At the bottom, a table is rendered listing all the contributors who contributed to the project till date and the amount they contributed, sorted in the descending order of amount contributed.  

### PaymentModal  
This component renders the modal for payment upon clicking the `back this project` button. The modal has input for the amount of AVAX you want to fund and a `fund` button to send the fund to contract. The modal automatically closes once the transfer of AVAX token is successful.  

### ProfileComponent  
This component renders the profile information of a user. This component has three sections, namely `Ongoing projects` section, `Completed projects` section and `Projects funded` section. The `Ongoing projects` section displays all the projects that the user has created and the funding period for which hasn't ended yet. The `Completed projects` section displays all the projects that the user has created and the funding period for which is over. `Projects funded` section displays all the projects to which the user has provided some funding. The `Projects funded` section isn't rendered if you visit some other user's profile.  
To visit your own profile, click the account address displayed on the right end of the navbar.  

### DiscoverComponent  
This component renders list of projects posted on the site based on the project category selected. There are four categories, namely Design & tech, Film, Arts and Games.  
  
### ConnectWallet  
This component renders the first page of the site. It contains a `Connect to metamask` button, which allows you to connect your metamask account to the dApp.  
  
### ScrollShowbarComponent  
This component renders a carousel which is used by various other components to display a list of projects.  
      
    
# Walkthrough
  
  
# Conclusion  
Cogratulations! We have succesfully developed a working decentralized kickstarter where users can create projects, fund various projects and even claim refunds if possible. As a next step, you can try adding new features to the dApp such as royalties for the dApp owner or providing NFTs to the top contributors of a project.  
      
# Troubleshooting  
### Transaction Failure  
- Check if your account has sufficient balance at [fuji block-explorer](https://cchain.explorer.avax-test.network/). You ca fund your address from the given [faucet](https://faucet.avax-test.network/).  
  
![metamask wallet image with 0 AVAX](https://raw.githubusercontent.com/figment-networks/learn-tutorials/master/assets/create-an-amm-on-avalanche_zero_balance.jpeg)  
  
- Make sure that you have selected the correct account on Metamask if you have more than one account connected to the site.  
  
![metamask wallet with multiple account display](https://raw.githubusercontent.com/figment-networks/learn-tutorials/master/assets/create-an-amm-on-avalanche_multiple_accounts.jpeg)  
      
# About the author(s)
This tutorial was created by [Soumyajit Deb](https://github.com/hyp3r5pace) and [Sayan Kar](https://github.com/SayanKar). You can reach out to them on [Figment Forum](https://community.figment.io/u/debsoumyajit100/) for any query regarding the tutorial.
  
# References
[Deploy a smart contract on Avalanche using Remix and Metamask](https://docs.avax.network/build/tutorials/smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask/)
