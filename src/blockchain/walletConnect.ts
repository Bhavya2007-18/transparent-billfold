import { BrowserProvider, formatEther } from 'ethers';

export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed!");
  }

  try {
    const provider = new BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);

    return {
      address,
      balance: formatEther(balance),
      signer,
      provider
    };
  } catch (error) {
    console.error("Error connecting to wallet:", error);
    throw error;
  }
};

export const getWalletBalance = async (address) => {
  if (!window.ethereum) return "0.0";
  const provider = new BrowserProvider(window.ethereum);
  const balance = await provider.getBalance(address);
  return formatEther(balance);
};
