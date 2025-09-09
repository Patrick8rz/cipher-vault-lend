import { createPublicClient, createWalletClient, http, parseEther } from 'viem';
import { sepolia } from 'viem/chains';
import { fheConfig, fheUtils } from './fhe';

// Contract ABI for CipherVaultLend
export const contractABI = [
  {
    "inputs": [
      { "name": "_verifier", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "loanId", "type": "uint256" },
      { "indexed": true, "name": "borrower", "type": "address" },
      { "indexed": false, "name": "amount", "type": "uint32" }
    ],
    "name": "LoanCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "loanId", "type": "uint256" },
      { "indexed": true, "name": "lender", "type": "address" },
      { "indexed": false, "name": "amount", "type": "uint32" }
    ],
    "name": "LoanFunded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "loanId", "type": "uint256" },
      { "indexed": true, "name": "borrower", "type": "address" },
      { "indexed": false, "name": "amount", "type": "uint32" }
    ],
    "name": "LoanRepaid",
    "type": "event"
  },
  {
    "inputs": [
      { "name": "amount", "type": "bytes" },
      { "name": "collateralAmount", "type": "bytes" },
      { "name": "duration", "type": "uint256" },
      { "name": "inputProof", "type": "bytes" }
    ],
    "name": "createLoan",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "loanId", "type": "uint256" },
      { "name": "amount", "type": "bytes" },
      { "name": "inputProof", "type": "bytes" }
    ],
    "name": "fundLoan",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "loanId", "type": "uint256" },
      { "name": "amount", "type": "bytes" },
      { "name": "inputProof", "type": "bytes" }
    ],
    "name": "repayLoan",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "loanId", "type": "uint256" }],
    "name": "getLoanInfo",
    "outputs": [
      { "name": "borrower", "type": "address" },
      { "name": "lender", "type": "address" },
      { "name": "amount", "type": "uint8" },
      { "name": "collateralAmount", "type": "uint8" },
      { "name": "interestRate", "type": "uint8" },
      { "name": "duration", "type": "uint256" },
      { "name": "startTime", "type": "uint256" },
      { "name": "isActive", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Create public client for reading contract data
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(fheConfig.rpcUrl),
});

// Contract interaction functions
export const contractFunctions = {
  // Create a new loan request
  createLoan: async (
    walletClient: any,
    amount: number,
    collateralAmount: number,
    duration: number
  ) => {
    try {
      // Encrypt the amounts using FHE
      const encryptedAmount = await fheUtils.encrypt(amount);
      const encryptedCollateral = await fheUtils.encrypt(collateralAmount);
      
      // Generate proof for the encrypted amount
      const inputProof = await fheUtils.generateProof(encryptedAmount);
      
      const hash = await walletClient.writeContract({
        address: fheConfig.contractAddress as `0x${string}`,
        abi: contractABI,
        functionName: 'createLoan',
        args: [encryptedAmount, encryptedCollateral, BigInt(duration), inputProof],
        value: parseEther(collateralAmount.toString()),
      });
      
      return hash;
    } catch (error) {
      console.error('Error creating loan:', error);
      throw error;
    }
  },

  // Fund an existing loan
  fundLoan: async (
    walletClient: any,
    loanId: number,
    amount: number
  ) => {
    try {
      const encryptedAmount = await fheUtils.encrypt(amount);
      const inputProof = await fheUtils.generateProof(encryptedAmount);
      
      const hash = await walletClient.writeContract({
        address: fheConfig.contractAddress as `0x${string}`,
        abi: contractABI,
        functionName: 'fundLoan',
        args: [BigInt(loanId), encryptedAmount, inputProof],
        value: parseEther(amount.toString()),
      });
      
      return hash;
    } catch (error) {
      console.error('Error funding loan:', error);
      throw error;
    }
  },

  // Repay a loan
  repayLoan: async (
    walletClient: any,
    loanId: number,
    amount: number
  ) => {
    try {
      const encryptedAmount = await fheUtils.encrypt(amount);
      const inputProof = await fheUtils.generateProof(encryptedAmount);
      
      const hash = await walletClient.writeContract({
        address: fheConfig.contractAddress as `0x${string}`,
        abi: contractABI,
        functionName: 'repayLoan',
        args: [BigInt(loanId), encryptedAmount, inputProof],
        value: parseEther(amount.toString()),
      });
      
      return hash;
    } catch (error) {
      console.error('Error repaying loan:', error);
      throw error;
    }
  },

  // Get loan information
  getLoanInfo: async (loanId: number) => {
    try {
      const result = await publicClient.readContract({
        address: fheConfig.contractAddress as `0x${string}`,
        abi: contractABI,
        functionName: 'getLoanInfo',
        args: [BigInt(loanId)],
      });
      
      return result;
    } catch (error) {
      console.error('Error getting loan info:', error);
      throw error;
    }
  },
};
