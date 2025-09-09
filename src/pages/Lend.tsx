import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, TrendingUp, Shield } from "lucide-react";

const Lend = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold cyber-text-glow mb-4">Lend Assets</h1>
          <p className="text-muted-foreground">Earn yield through confidential lending pools</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lending Pools */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Available Lending Pools</h2>
            
            {['ETH', 'USDC', 'DAI'].map((asset, index) => (
              <Card key={asset} className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full cyber-border bg-cyber-surface/50 flex items-center justify-center">
                        <Coins className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{asset} Pool</h3>
                        <p className="text-muted-foreground">Secure lending with FHE encryption</p>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="text-2xl font-bold text-primary">
                          {(5.2 + index * 1.3).toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">APY</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Deposits</p>
                      <p className="font-bold cyber-text-glow">••••••</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Available</p>
                      <p className="font-bold cyber-text-glow">••••••</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Utilization</p>
                      <p className="font-bold text-primary">{(65 + index * 10)}%</p>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4 cyber-border hover:cyber-glow">
                    Lend {asset}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Lending Form */}
          <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Deposit Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Select Asset</Label>
                <select className="w-full p-3 rounded-lg cyber-border bg-cyber-surface/50 text-foreground">
                  <option>ETH</option>
                  <option>USDC</option>
                  <option>DAI</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Amount</Label>
                <Input 
                  placeholder="0.00" 
                  className="cyber-border bg-cyber-surface/50" 
                />
              </div>

              <div className="p-4 rounded-lg cyber-border bg-cyber-surface/20">
                <h3 className="font-bold mb-2">Projected Earnings</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Daily:</span>
                    <span className="text-primary">••••••</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly:</span>
                    <span className="text-primary">••••••</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Yearly:</span>
                    <span className="text-primary">••••••</span>
                  </div>
                </div>
              </div>

              <Button className="w-full cyber-border hover:cyber-glow">
                Deposit & Start Earning
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Lend;