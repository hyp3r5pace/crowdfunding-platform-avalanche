import { useEffect } from 'react'

function PaymentModal(props) {
    function closeModal() {
        var btn = document.getElementsByClassName("closeBtn");
        var modal = document.getElementsByClassName("modal");
    
        btn.onClick = () => {
            modal.style.display = "none";
        }
    }

    useEffect(() => {
        closeModal();
    });

    return (
        <div className="modal">
            <div className="modalHeader">
                <h1>Payment <span className="closeBtn">&times;</span></h1>
            </div>
            <div className="modalContent">
                <form className="paymentForm">
                    <label for="payment">Amount (AVAX)</label>
                    <input type="number" name="payment" id="payment" placeholder="Enter AVAX amount" required/>
                    <input type="submit"></input>
                </form>
            </div>
        </div>
    );
}

export default PaymentModal