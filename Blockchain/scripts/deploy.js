const hre = require("hardhat");

async function main() {
    const SupplyChain = await hre.ethers.getContractFactory("SupplyChain");
    const supplyChain = await SupplyChain.deploy();

    await supplyChain.waitForDeployment();  // FIX: Use waitForDeployment instead of deployed()
    console.log(`SupplyChain contract deployed at: ${await supplyChain.getAddress()}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
