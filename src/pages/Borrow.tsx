import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, Eye } from "lucide-react";

const Borrow = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold cyber-text-glow mb-4">Borrow Assets</h1>
          <p className="text-muted-foreground">Secure confidential borrowing with encrypted collateral</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Borrow Form */}
          <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Confidential Borrow Request
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Asset to Borrow</Label>
                <select className="w-full p-3 rounded-lg cyber-border bg-cyber-surface/50 text-foreground">
                  <option>ETH</option>
                  <option>USDC</option>
                  <option>DAI</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Encrypted Amount</Label>
                <div className="relative">
                  <Input 
                    placeholder="••••••••" 
                    className="cyber-border bg-cyber-surface/50 pr-10" 
                  />
                  <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Collateral Asset</Label>
                <select className="w-full p-3 rounded-lg cyber-border bg-cyber-surface/50 text-foreground">
                  <option>BTC</option>
                  <option>ETH</option>
                  <option>MATIC</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Encrypted Collateral</Label>
                <div className="relative">
                  <Input 
                    placeholder="••••••••" 
                    className="cyber-border bg-cyber-surface/50 pr-10" 
                  />
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                </div>
              </div>

              <Button className="w-full cyber-border hover:cyber-glow">
                Submit Borrow Request
              </Button>
            </CardContent>
          </Card>

          {/* Borrowing Stats */}
          <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Your Borrowing Position</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg cyber-border bg-cyber-surface/20">
                  <p className="text-sm text-muted-foreground">Total Borrowed</p>
                  <p className="text-2xl font-bold cyber-text-glow">••••••</p>
                </div>
                <div className="p-4 rounded-lg cyber-border bg-cyber-surface/20">
                  <p className="text-sm text-muted-foreground">Collateral Value</p>
                  <p className="text-2xl font-bold cyber-text-glow">••••••</p>
                </div>
              </div>
              
              <div className="p-4 rounded-lg cyber-border bg-cyber-surface/20">
                <p className="text-sm text-muted-foreground">Health Factor</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-full bg-cyber-surface rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-3/4"></div>
                  </div>
                  <span className="text-primary font-bold">1.75</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Borrow;