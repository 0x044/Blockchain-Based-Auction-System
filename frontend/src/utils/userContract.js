import { ethers } from 'ethers';
import SupplyChainABI from '../abi/SupplyChain.json';

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with your actual deployed address if needed

export const getEthereumContract = async () => {
  if (!window.ethereum) {
    throw new Error('❌ MetaMask not detected');
  }

  // Create a provider instance using the browser's injected provider (MetaMask)
  const provider = new ethers.BrowserProvider(window.ethereum);

  // Prompt user to connect wallet if not already connected
  await provider.send("eth_requestAccounts", []);

  // Get signer (i.e., user's connected wallet for sending transactions)
  const signer = await provider.getSigner();

  // Create contract instance with signer so it can send transactions
  const contract = new ethers.Contract(CONTRACT_ADDRESS, SupplyChainABI.abi, signer);

  return contract;
};
