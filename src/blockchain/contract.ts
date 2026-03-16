import { ethers } from 'ethers';

// Mock ABI for a donation contract
// In a real app, this would be the actual ABI of the deployed contract
export const CONTRACT_ABI = [
  "function donate(string purpose) public payable",
  "function getDonationHistory() public view returns (tuple(address sender, address recipient, uint256 amount, string purpose, uint256 timestamp)[])",
  "event DonationSent(address indexed sender, address indexed recipient, uint256 amount, string purpose)"
];

export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Placeholder

export const getContract = (signer) => {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};
