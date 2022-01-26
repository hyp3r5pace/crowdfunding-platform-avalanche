import { useState } from "react";
import { ethers } from "ethers";

function PaymentModal(props) {
  let [amount, setAmount] = useState(1);
  const PRECISION = 10 ** 18;

  function closeModal() {
    props.setModalShow(false);
  }

  function handleChange(e) {
    setAmount(e.target.value);
  }

  async function sendFund() {
    console.log("Sending fund...");
    try {
      let fund = {value: ethers.utils.parseEther(amount.toString())};
      let txn = await props.contract.fundProject(props.index, fund);
      await txn.wait();
      alert(`${amount} AVAX Succesfully funded`);

      let tmp = (props.projectDetails['amountRaised'] / PRECISION) + amount;
      let idx = props.projectDetails.contributors.indexOf(props.userAddress);
      let contributorsCopy = [...props.projectDetails.contributors];
      let amountCopy = [...props.projectDetails.amount];
      if (idx < 0) {
        contributorsCopy.push(props.userAddress);
        amountCopy.push(amount);
      } else {
        amountCopy[idx] = ((amountCopy[idx] / PRECISION) + amount) * PRECISION;
      }
      
      setAmount(1);
      closeModal();
      // set the states so rerender occurs in parent component
      props.setProjectDetails({
        amountRaised: tmp * PRECISION,
        cid: props.projectDetails['cid'],
        creatorName: props.projectDetails['creatorName'],
        fundingGoal: props.projectDetails['fundingGoal'],
        projectDescription: props.projectDetails['projectDescription'],
        projectName: props.projectDetails['projectName'],
        contributors: contributorsCopy,
        creationTime: props.projectDetails['creationTime'],
        duration: props.projectDetails['duration'],
        projectLink: props.projectDetails['projectLink'],
        amount: amountCopy,
        creatorAddress: props.projectDetails['creatorAddress']
      });
    } catch (error) {
      console.log("Funding error: ");
      console.log(error);
      console.log("................");
      alert("Error Sending AVAX: " + error);
    }
  }

  return (
    <div className="modal">
      <div className="modalHeader">
        <h1>
          Payment{" "}
          <span className="closeBtn" onClick={() => closeModal()}>
            &times;
          </span>
        </h1>
      </div>
      <div className="modalContent">
        <div className="paymentForm">
          <label className="paymentLabel">Amount (AVAX)</label>
          <input
            type="number"
            name="payment"
            id="payment"
            className="payment"
            placeholder="Enter AVAX amount"
            min="1"
            step="1"
            value={amount}
            onChange={handleChange}
            required
          />
          <button className="submit" onClick={() => sendFund()}>
            Fund
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
