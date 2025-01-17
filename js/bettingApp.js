// bettingApp.js

let provider;
let signer;

// Connect wallet function
async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            signer = provider.getSigner();
            const address = await signer.getAddress();
            document.getElementById('walletAddressDisplay').innerText = `Connected: ${address}`;
            console.log("Wallet connected: ", address);

            // Handle account changes
            window.ethereum.on('accountsChanged', async () => {
                const address = await signer.getAddress();
                document.getElementById('walletAddressDisplay').innerText = `Connected: ${address}`;
            });

        } catch (error) {
            console.error("Connection error: ", error);
            alert('Connection to MetaMask failed. Please try again.');
        }
    } else {
        alert('MetaMask is required to use this feature.');
    }
}

// Function to place a bet
function placeBet(ageRange, button) {
    const betInput = button.previousElementSibling;
    const betAmount = betInput.value;
    const walletAddress = button.getAttribute('data-address');

    if (!signer) {
        alert('Please connect MetaMask first.');
        return;
    }

    if (betAmount && !isNaN(betAmount) && betAmount > 0) {
        alert(`Bet placed!\nAge Range: ${ageRange}\nAmount: ${betAmount} ETH\nWallet: ${walletAddress}`);
        // Implement further functionality for placing a bet here, e.g., interact with a blockchain contract
        updateShareButton(ageRange);
    } else {
        alert('Please enter a valid bet amount.');
    }
}

// Function to update the share button
function updateShareButton(option) {
    const tweetText = `I just bet that Andrew Tate will face "${option}"! What are your thoughts? Join me in this bet for #Tatecase via this amazing platform! 🚀`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    const shareButton = document.getElementById('shareButton');

    if (shareButton) {
        shareButton.style.display = 'inline-block';
        shareButton.setAttribute('onclick', `window.open('${tweetUrl}', '_blank')`);
    } else {
        console.error('Share button not found in the DOM.');
    }
}

document.getElementById('connectWalletButton').addEventListener('click', connectWallet);

document.querySelector('.share-button').addEventListener('click', function() {
    const url = window.location.href;
    navigator.share({
        title: 'Andrew Tate Case Betting',
        url: url
    }).catch(console.error);
});
