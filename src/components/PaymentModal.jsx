
function PaymentModal(props) {
    function closeModal() {
        document.getElementsByClassName("modal")[0].style.display = "none";
    }

    return (
        <div className="modal">
            <div className="modalHeader">
                <h1>Payment <span className="closeBtn" onClick={() => closeModal()}>&times;</span></h1>
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

export default PaymentModal;