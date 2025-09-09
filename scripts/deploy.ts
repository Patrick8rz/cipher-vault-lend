import { ethers } from "hardhat";

async function main() {
  console.log("Deploying CipherVaultLend contract...");

  // Get the contract factory
  const CipherVaultLend = await ethers.getContractFactory("CipherVaultLend");

  // Deploy the contract with a verifier address (you can change this)
  const verifierAddress = "0x1234567890123456789012345678901234567890"; // Replace with actual verifier address
  
  const cipherVaultLend = await CipherVaultLend.deploy(verifierAddress);

  await cipherVaultLend.waitForDeployment();

  const contractAddress = await cipherVaultLend.getAddress();
  
  console.log("CipherVaultLend deployed to:", contractAddress);
  console.log("Verifier address:", verifierAddress);
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    verifierAddress,
    network: "sepolia",
    timestamp: new Date().toISOString(),
  };
  
  console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
