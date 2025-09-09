import { createFhevmInstance } from '@zama-fhe/oracle-solidity';

// FHE configuration for Zama testnet
export const fheConfig = {
  chainId: 0x1a2, // Zama testnet chain ID
  rpcUrl: 'https://devnet.zama.ai',
  contractAddress: process.env.VITE_CONTRACT_ADDRESS || '',
};

// Create FHE instance
export const createFheInstance = async () => {
  try {
    const instance = await createFhevmInstance({
      chainId: fheConfig.chainId,
      publicKey: {
        name: 'FHEVM',
        version: '1.0.0',
      },
    });
    return instance;
  } catch (error) {
    console.error('Failed to create FHE instance:', error);
    throw error;
  }
};

// FHE utility functions
export const fheUtils = {
  // Encrypt a value for FHE operations
  encrypt: async (value: number) => {
    const instance = await createFheInstance();
    return instance.encrypt32(value);
  },

  // Decrypt a value from FHE operations
  decrypt: async (encryptedValue: any) => {
    const instance = await createFheInstance();
    return instance.decrypt(encryptedValue);
  },

  // Generate proof for external encrypted value
  generateProof: async (encryptedValue: any) => {
    const instance = await createFheInstance();
    return instance.generateProof(encryptedValue);
  },
};
