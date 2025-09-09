import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Lock, TrendingUp, Shield, Zap } from "lucide-react";
import { useAccount, useWalletClient } from 'wagmi';
import { contractFunctions } from '@/lib/contract';
import { toast } from 'sonner';

const LendingInterface = () => {
  const [borrowAmount, setBorrowAmount] = useState("");
  const [lendAmount, setLendAmount] = useState("");
  const [collateralAmount, setCollateralAmount] = useState("");
  const [loanDuration, setLoanDuration] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("ETH");
  const [selectedCollateral, setSelectedCollateral] = useState("USDC");
  const [isLoading, setIsLoading] = useState(false);
  
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  // Handle loan creation
  const handleCreateLoan = async () => {
    if (!isConnected || !walletClient) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!borrowAmount || !collateralAmount || !loanDuration) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const hash = await contractFunctions.createLoan(
        walletClient,
        parseFloat(borrowAmount),
        parseFloat(collateralAmount),
        parseInt(loanDuration) * 24 * 60 * 60 // Convert days to seconds
      );
      
      toast.success(`Loan created successfully! Transaction: ${hash}`);
      setBorrowAmount("");
      setCollateralAmount("");
      setLoanDuration("");
    } catch (error) {
      console.error("Error creating loan:", error);
      toast.error("Failed to create loan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle loan funding
  const handleFundLoan = async (loanId: number) => {
    if (!isConnected || !walletClient) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!lendAmount) {
      toast.error("Please enter the amount to lend");
      return;
    }

    setIsLoading(true);
    try {
      const hash = await contractFunctions.fundLoan(
        walletClient,
        loanId,
        parseFloat(lendAmount)
      );
      
      toast.success(`Loan funded successfully! Transaction: ${hash}`);
      setLendAmount("");
    } catch (error) {
      console.error("Error funding loan:", error);
      toast.error("Failed to fund loan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const assets = [
    { symbol: "ETH", name: "Ethereum", apr: "5.2%", available: "████.██" },
    { symbol: "BTC", name: "Bitcoin", apr: "3.8%", available: "██.████" },
    { symbol: "USDC", name: "USD Coin", apr: "8.1%", available: "███,███" },
    { symbol: "USDT", name: "Tether", apr: "7.9%", available: "███,███" },
  ];

  return (
    <section id="interface" className="py-20 bg-cyber-dark/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-text-glow">
            Encrypted <span className="text-primary">Trading Interface</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            All transactions are protected by state-of-the-art homomorphic encryption. 
            Your financial data remains private while still being verifiable.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="borrow" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 cyber-border bg-cyber-surface">
              <TabsTrigger value="borrow" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Borrow Assets
              </TabsTrigger>
              <TabsTrigger value="lend" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Lend & Earn
              </TabsTrigger>
            </TabsList>

            <TabsContent value="borrow">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Borrow Form */}
                <Card className="cyber-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Lock className="h-5 w-5 text-primary" />
                      <span>Secure Borrow</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Asset to Borrow</label>
                      <select 
                        className="w-full bg-cyber-surface border cyber-border rounded-lg p-3 text-foreground"
                        value={selectedAsset}
                        onChange={(e) => setSelectedAsset(e.target.value)}
                      >
                        <option value="ETH">ETH - Ethereum</option>
                        <option value="BTC">BTC - Bitcoin</option>
                        <option value="USDC">USDC - USD Coin</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Amount to Borrow</label>
                      <Input
                        placeholder="0.00"
                        value={borrowAmount}
                        onChange={(e) => setBorrowAmount(e.target.value)}
                        className="bg-cyber-surface border-cyber-border text-foreground"
                        type="number"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Collateral Asset</label>
                      <select 
                        className="w-full bg-cyber-surface border cyber-border rounded-lg p-3 text-foreground"
                        value={selectedCollateral}
                        onChange={(e) => setSelectedCollateral(e.target.value)}
                      >
                        <option value="USDC">USDC - USD Coin</option>
                        <option value="ETH">ETH - Ethereum</option>
                        <option value="BTC">BTC - Bitcoin</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Collateral Amount</label>
                      <Input
                        placeholder="0.00"
                        value={collateralAmount}
                        onChange={(e) => setCollateralAmount(e.target.value)}
                        className="bg-cyber-surface border-cyber-border text-foreground"
                        type="number"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Loan Duration (days)</label>
                      <Input
                        placeholder="30"
                        value={loanDuration}
                        onChange={(e) => setLoanDuration(e.target.value)}
                        className="bg-cyber-surface border-cyber-border text-foreground"
                        type="number"
                        min="1"
                      />
                    </div>

                    <div className="cyber-card p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Interest Rate</span>
                        <span className="font-semibold text-accent">██.█%</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Liquidation Threshold</span>
                        <span className="font-semibold">██%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Health Factor</span>
                        <Badge variant="outline" className="border-accent text-accent">
                          Safe
                        </Badge>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground cyber-glow"
                      onClick={handleCreateLoan}
                      disabled={isLoading || !isConnected}
                    >
                      {isLoading ? "Creating Loan..." : "Create Loan Request"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Available Assets */}
                <Card className="cyber-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-accent" />
                      <span>Available to Borrow</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assets.map((asset, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-cyber-surface/50 border cyber-border">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                              <Zap className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold">{asset.symbol}</p>
                              <p className="text-sm text-muted-foreground">{asset.name}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold encrypted-data text-sm">{asset.available}</p>
                            <p className="text-sm text-accent">APR: {asset.apr}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="lend">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Lend Form */}
                <Card className="cyber-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-accent" />
                      <span>Secure Lending</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Asset to Lend</label>
                      <select 
                        className="w-full bg-cyber-surface border cyber-border rounded-lg p-3 text-foreground"
                        value={selectedAsset}
                        onChange={(e) => setSelectedAsset(e.target.value)}
                      >
                        <option value="USDC">USDC - USD Coin</option>
                        <option value="ETH">ETH - Ethereum</option>
                        <option value="BTC">BTC - Bitcoin</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Amount to Lend</label>
                      <Input
                        placeholder="0.00"
                        value={lendAmount}
                        onChange={(e) => setLendAmount(e.target.value)}
                        className="bg-cyber-surface border-cyber-border text-foreground"
                        type="number"
                        step="0.01"
                      />
                    </div>

                    <div className="cyber-card p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Current APY</span>
                        <span className="font-semibold text-accent">█.█%</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Monthly Earnings</span>
                        <span className="font-semibold">$███.██</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Pool Utilization</span>
                        <span className="font-semibold">██%</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground cyber-glow"
                      onClick={() => handleFundLoan(1)} // Example loan ID
                      disabled={isLoading || !isConnected}
                    >
                      {isLoading ? "Funding Loan..." : "Fund Loan"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Lending Pools */}
                <Card className="cyber-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span>Active Lending Pools</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assets.map((asset, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-cyber-surface/50 border cyber-border">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                              <TrendingUp className="h-5 w-5 text-accent" />
                            </div>
                            <div>
                              <p className="font-semibold">{asset.symbol}</p>
                              <p className="text-sm text-muted-foreground">{asset.name}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-accent">APY: {asset.apr}</p>
                            <p className="text-sm encrypted-data">{asset.available} supplied</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default LendingInterface;