# Introduction  
In this tutorial, we will learn how to build a decentralized crowdfunding dApp having features namely create project, fund a project, withdraw fund, get refund if funding isn't successful etc. We will build the smart contract in Solidity and the frontend of our application with the help of ReactJS.  

# Prerequisites
- Familiarity with ReactJS and Solidity.  
- Should've completed [Deploy a Smart Contract on Avalanche using Remix and MetaMask](https://learn.figment.io/tutorials/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask) tutorial  
  
# Requirements
- [Node.js](https://nodejs.org/en/download/releases/) v10.18.0+  
- [Metamask extension](https://metamask.io/download/) on your browser  
  
# Implementing the smart contract
  
  
# Deploying the smart contract
  
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

    struct Funded{
		uint256 projectIndex;
		uint256 totalAmount;
    }

    // Stores all the projects 
    Project[] projects;

    // Stores the indexes of projects created on projects list
    mapping(address => uint256[]) addressProjectsList;

    // Stores the list of fundings  
    mapping(address => Funded[]) addressFundingList;

    modifier validIndex(uint256 _index) {
        require(_index < projects.length, "Invalid Project Id");
        _;
    }

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

    // Returns the contents of projects list
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

    // Returns the project at the index
    function getProject(uint256 _index) external view validIndex(_index) returns(Project memory project) {
        return projects[_index];
    }

    function getCreatorProjects(address creator) external view returns(uint256[] memory createdProjects) {
        return addressProjectsList[creator];
    }

    function getUserFundings(address contributor) external view returns(Funded[] memory fundedProjects) {
        return addressFundingList[contributor];
    }

    function addToFundingList(uint256 _index) internal validIndex(_index) {
        for(uint256 i = 0; i < addressFundingList[msg.sender].length; i++) {
            if(addressFundingList[msg.sender][i].projectIndex == _index) {
                addressFundingList[msg.sender][i].totalAmount += msg.value;
                return;
            }
        }
        addressFundingList[msg.sender].push(Funded(_index, msg.value));
    }
    
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

    function fundProject(uint256 _index) payable external validIndex(_index)  {
        require(projects[_index].creatorAddress != msg.sender, "You are the project owner");
        require(projects[_index].duration + projects[_index].creationTime >= block.timestamp, "Project Funding Time Expired");
        addContribution(_index);
        projects[_index].amountRaised += msg.value;
    }

    function claimFund(uint256 _index) validIndex(_index) external {
        require(projects[_index].creatorAddress == msg.sender, "You are not Project Owner");
        require(projects[_index].duration + projects[_index].creationTime < block.timestamp, "Project Funding Time Not Expired");
        require(projects[_index].refundPolicy == RefundPolicy.NONREFUNDABLE 
                    || projects[_index].amountRaised >= projects[_index].fundingGoal, "Funding goal not reached");
        require(!projects[_index].claimedAmount, "Already claimed raised funds");
        projects[_index].claimedAmount = true;
        payable(msg.sender).transfer(projects[_index].amountRaised);
    }

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
  

  
  
# Walkthrough
  
  
# Conclusion
  
  
# Troubleshooting
  
  
# About the author(s)
This tutorial was created by [Soumyajit Deb](https://github.com/hyp3r5pace) and [Sayan Kar](https://github.com/SayanKar). You can reach out to them on [Figment Forum](https://community.figment.io/u/debsoumyajit100/) for any query regarding the tutorial.
  
# References
[Deploy a smart contract on Avalanche using Remix and Metamask](https://docs.avax.network/build/tutorials/smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask/)
