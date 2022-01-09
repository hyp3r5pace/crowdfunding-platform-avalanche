import { useEffect } from 'react'

function ConnectWallet(props) {
    return (
        <div className='connectWallet'>
            <div className='typingContainer'>
                <h1 className='typing'>DeFindstarter</h1>
            </div>
            <button className='walletButton'>
                Connect Metamask
            </button>
        </div>
    );
}

export default ConnectWallet;