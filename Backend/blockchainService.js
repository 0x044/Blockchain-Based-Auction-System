require("dotenv").config();
const { ethers } = require("ethers");
const fs = require("fs");

// Load contract ABI
const contractABI = JSON.parse(fs.readFileSync("../blockchain/artifacts/contracts/SupplyChain.sol/SupplyChain.json")).abi;

// Connect to the blockchain
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

async function addMedicine(name, description, quantity, basePrice) {
    const tx = await contract.addMedicine(name, description, quantity, ethers.parseEther(basePrice));
    await tx.wait();
    console.log(`Medicine added: ${name}`);
}

async function startAuction(medicineId) {
    const tx = await contract.startAuction(medicineId);
    await tx.wait();
    console.log(`Auction started for Medicine ID: ${medicineId}`);
}

async function placeBid(medicineId, amount) {
    const tx = await contract.placeBid(medicineId, { value: ethers.parseEther(amount) });
    await tx.wait();
    console.log(`Bid placed on Medicine ID: ${medicineId} with amount: ${amount} ETH`);
}

async function endAuction(medicineId) {
    const tx = await contract.endAuction(medicineId);
    await tx.wait();
    console.log(`Auction ended for Medicine ID: ${medicineId}`);
}

module.exports = { addMedicine, startAuction, placeBid, endAuction };
