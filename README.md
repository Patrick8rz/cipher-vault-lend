# Cipher Vault Lend

A fully homomorphic encryption (FHE) powered lending protocol that enables private and confidential borrowing and lending of digital assets.

## Features

- **Fully Homomorphic Encryption**: All sensitive financial data is encrypted using FHE
- **Private Lending**: Borrow and lend assets without revealing amounts or positions
- **Secure Collateral**: Encrypted collateral management with liquidation protection
- **Real-time Analytics**: Encrypted analytics and reporting
- **Wallet Integration**: Seamless connection with popular Web3 wallets

## Technologies

This project is built with:

- **Frontend**: React, TypeScript, Vite
- **UI Components**: shadcn-ui, Tailwind CSS
- **Blockchain**: Wagmi, Viem, RainbowKit
- **Encryption**: FHEVM (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity with FHE support

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Patrick8rz/cipher-vault-lend.git
cd cipher-vault-lend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Smart Contract Deployment

The project includes FHE-enabled smart contracts for secure lending operations:

1. Deploy contracts to Zama testnet
2. Update contract addresses in the configuration
3. Verify contract functionality with encrypted operations

## Deployment

### Vercel Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to Vercel:
```bash
vercel --prod
```

### Environment Variables

Create a `.env.local` file with the following variables:

```
VITE_CONTRACT_ADDRESS=your_contract_address
VITE_RPC_URL=your_rpc_url
VITE_CHAIN_ID=your_chain_id
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
