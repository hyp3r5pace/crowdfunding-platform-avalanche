import { useState } from 'react';

function PaymentModal(props) {

    let [amount, setAmount] = useState(1);

    function closeModal() {
        props.setModalShow(false);
    }

function handleChange(e) {
    setAmount(e.target.value);
}

async function sendFund() {
    console.log('Sending fund...');
    try {
         let txn = await props.contract.fundProject(props.index);
         await txn.wait(txn);
         alert(`${amount} AVAX Succesfully funded`);
         setAmount(1);
     } catch(error) {
         console.log('Funding error: ');
         console.log(error);
         console.log('................');
         alert('Error Sending AVAX: ' + error);
     }
}

    return (
        <div className="modal">
            <div className="modalHeader">
                <h1>Payment <span className="closeBtn" onClick={() => closeModal()}>&times;</span></h1>
            </div>
            <div className="modalContent">
                <form className="paymentForm">
                    <label>Amount (AVAX)</label>
                    <input type="number" name="payment" id="payment" placeholder="Enter AVAX amount" min="1" step="1" value={amount} onChange={handleChange} required/>
                    <button className="submit" onClick={() => sendFund()}>Fund</button>
                </form>
            </div>
        </div>
    );
}

export default PaymentModal;