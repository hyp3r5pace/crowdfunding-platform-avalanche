export default function ConnectWallet(props) {
    return (
        <div className='connectWallet'>
            <div className='typingContainer'>
                <div className='typing'>DeFindstarter</div>
            </div>
            <div className="walletButtonContainer">
                <button className='walletButton'>
                    Connect to Metamask
                </button>
            </div>
        </div>
    );
}