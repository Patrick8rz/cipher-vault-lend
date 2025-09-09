// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@zama-fhe/oracle-solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@zama-fhe/oracle-solidity/lib/FHE.sol";

contract CipherVaultLend is SepoliaConfig {
    using FHE for *;
    
    struct Loan {
        euint32 loanId;
        euint32 amount;
        euint32 collateralAmount;
        euint32 interestRate;
        euint32 duration;
        address borrower;
        address lender;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
        bool isFunded;
        bool isRepaid;
    }
    
    struct LendingPool {
        euint32 totalLiquidity;
        euint32 totalBorrowed;
        euint32 interestRate;
        bool isActive;
        address poolManager;
    }
    
    mapping(uint256 => Loan) public loans;
    mapping(address => euint32) public borrowerReputation;
    mapping(address => euint32) public lenderReputation;
    mapping(string => LendingPool) public lendingPools;
    
    uint256 public loanCounter;
    address public owner;
    address public verifier;
    
    event LoanCreated(uint256 indexed loanId, address indexed borrower, uint32 amount);
    event LoanFunded(uint256 indexed loanId, address indexed lender, uint32 amount);
    event LoanRepaid(uint256 indexed loanId, address indexed borrower, uint32 amount);
    event PoolCreated(string indexed asset, address indexed manager);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }
    
    function createLoan(
        externalEuint32 amount,
        externalEuint32 collateralAmount,
        uint256 duration,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(duration > 0, "Duration must be positive");
        require(msg.value > 0, "Must provide collateral");
        
        uint256 loanId = loanCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        euint32 internalCollateral = FHE.fromExternal(collateralAmount, inputProof);
        
        // Calculate interest rate based on collateral ratio (encrypted)
        euint32 interestRate = FHE.div(internalAmount, internalCollateral);
        interestRate = FHE.mul(interestRate, FHE.asEuint32(100)); // Convert to percentage
        
        loans[loanId] = Loan({
            loanId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            collateralAmount: internalCollateral,
            interestRate: interestRate,
            duration: FHE.asEuint32(duration),
            borrower: msg.sender,
            lender: address(0),
            startTime: 0,
            endTime: 0,
            isActive: true,
            isFunded: false,
            isRepaid: false
        });
        
        emit LoanCreated(loanId, msg.sender, 0); // Amount will be decrypted off-chain
        return loanId;
    }
    
    function fundLoan(
        uint256 loanId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public payable returns (bool) {
        require(loans[loanId].borrower != address(0), "Loan does not exist");
        require(loans[loanId].isActive, "Loan is not active");
        require(!loans[loanId].isFunded, "Loan already funded");
        require(msg.value > 0, "Must provide funding amount");
        
        // Convert external encrypted value to internal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Verify the funding amount matches the loan amount (encrypted comparison)
        ebool amountMatches = FHE.eq(internalAmount, loans[loanId].amount);
        require(FHE.decrypt(amountMatches), "Funding amount must match loan amount");
        
        loans[loanId].lender = msg.sender;
        loans[loanId].isFunded = true;
        loans[loanId].startTime = block.timestamp;
        loans[loanId].endTime = block.timestamp + FHE.decrypt(loans[loanId].duration);
        
        emit LoanFunded(loanId, msg.sender, 0); // Amount will be decrypted off-chain
        return true;
    }
    
    function repayLoan(
        uint256 loanId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public payable returns (bool) {
        require(loans[loanId].borrower == msg.sender, "Only borrower can repay");
        require(loans[loanId].isFunded, "Loan must be funded");
        require(!loans[loanId].isRepaid, "Loan already repaid");
        require(block.timestamp <= loans[loanId].endTime, "Loan has expired");
        
        // Convert external encrypted value to internal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Calculate total repayment amount (principal + interest)
        euint32 interestAmount = FHE.mul(loans[loanId].amount, loans[loanId].interestRate);
        interestAmount = FHE.div(interestAmount, FHE.asEuint32(100));
        euint32 totalRepayment = FHE.add(loans[loanId].amount, interestAmount);
        
        // Verify repayment amount (encrypted comparison)
        ebool amountMatches = FHE.eq(internalAmount, totalRepayment);
        require(FHE.decrypt(amountMatches), "Repayment amount must match total amount");
        
        loans[loanId].isRepaid = true;
        loans[loanId].isActive = false;
        
        // Transfer funds back to lender
        payable(loans[loanId].lender).transfer(msg.value);
        
        emit LoanRepaid(loanId, msg.sender, 0); // Amount will be decrypted off-chain
        return true;
    }
    
    function createLendingPool(
        string memory asset,
        externalEuint32 initialLiquidity,
        externalEuint32 interestRate,
        bytes calldata inputProof
    ) public payable returns (bool) {
        require(msg.value > 0, "Must provide initial liquidity");
        require(bytes(asset).length > 0, "Asset name cannot be empty");
        
        // Convert external encrypted values to internal
        euint32 internalLiquidity = FHE.fromExternal(initialLiquidity, inputProof);
        euint32 internalInterestRate = FHE.fromExternal(interestRate, inputProof);
        
        lendingPools[asset] = LendingPool({
            totalLiquidity: internalLiquidity,
            totalBorrowed: FHE.asEuint32(0),
            interestRate: internalInterestRate,
            isActive: true,
            poolManager: msg.sender
        });
        
        emit PoolCreated(asset, msg.sender);
        return true;
    }
    
    function updateReputation(address user, euint32 reputation, bool isBorrower) public onlyVerifier {
        require(user != address(0), "Invalid user address");
        
        if (isBorrower) {
            borrowerReputation[user] = reputation;
        } else {
            lenderReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getLoanInfo(uint256 loanId) public view returns (
        address borrower,
        address lender,
        uint8 amount,
        uint8 collateralAmount,
        uint8 interestRate,
        uint256 duration,
        uint256 startTime,
        bool isActive
    ) {
        Loan storage loan = loans[loanId];
        return (
            loan.borrower,
            loan.lender,
            0, // FHE.decrypt(loan.amount) - will be decrypted off-chain
            0, // FHE.decrypt(loan.collateralAmount) - will be decrypted off-chain
            0, // FHE.decrypt(loan.interestRate) - will be decrypted off-chain
            FHE.decrypt(loan.duration),
            loan.startTime,
            loan.isActive
        );
    }
    
    function getPoolInfo(string memory asset) public view returns (
        uint8 totalLiquidity,
        uint8 totalBorrowed,
        uint8 interestRate,
        bool isActive,
        address poolManager
    ) {
        LendingPool storage pool = lendingPools[asset];
        return (
            0, // FHE.decrypt(pool.totalLiquidity) - will be decrypted off-chain
            0, // FHE.decrypt(pool.totalBorrowed) - will be decrypted off-chain
            0, // FHE.decrypt(pool.interestRate) - will be decrypted off-chain
            pool.isActive,
            pool.poolManager
        );
    }
    
    function getBorrowerReputation(address borrower) public view returns (uint8) {
        return 0; // FHE.decrypt(borrowerReputation[borrower]) - will be decrypted off-chain
    }
    
    function getLenderReputation(address lender) public view returns (uint8) {
        return 0; // FHE.decrypt(lenderReputation[lender]) - will be decrypted off-chain
    }
    
    function liquidateLoan(uint256 loanId) public onlyVerifier {
        require(loans[loanId].isFunded, "Loan must be funded");
        require(!loans[loanId].isRepaid, "Loan already repaid");
        require(block.timestamp > loans[loanId].endTime, "Loan has not expired");
        
        // Mark loan as liquidated
        loans[loanId].isActive = false;
        
        // Transfer collateral to lender
        // In a real implementation, this would transfer the actual collateral
        payable(loans[loanId].lender).transfer(address(this).balance);
    }
    
    function emergencyWithdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
