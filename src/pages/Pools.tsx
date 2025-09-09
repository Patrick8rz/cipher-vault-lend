import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, TrendingUp, Users, Lock } from "lucide-react";

const Pools = () => {
  const poolsData = [
    { name: 'ETH/USDC', tvl: '••••••', apy: '12.4%', users: '••••', status: 'Active' },
    { name: 'BTC/ETH', tvl: '••••••', apy: '8.9%', users: '••••', status: 'Active' },
    { name: 'USDC/DAI', tvl: '••••••', apy: '6.2%', users: '••••', status: 'Active' },
    { name: 'MATIC/ETH', tvl: '••••••', apy: '15.7%', users: '••••', status: 'New' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold cyber-text-glow mb-4">Liquidity Pools</h1>
          <p className="text-muted-foreground">Confidential liquidity pools with encrypted TVL and positions</p>
        </div>

        {/* Pool Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total TVL</span>
              </div>
              <p className="text-2xl font-bold cyber-text-glow">••••••••</p>
            </CardContent>
          </Card>

          <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Avg APY</span>
              </div>
              <p className="text-2xl font-bold text-primary">10.8%</p>
            </CardContent>
          </Card>

          <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Active Users</span>
              </div>
              <p className="text-2xl font-bold cyber-text-glow">••••••</p>
            </CardContent>
          </Card>

          <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Pools</span>
              </div>
              <p className="text-2xl font-bold text-primary">{poolsData.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Pools List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">All Pools</h2>
          
          <div className="grid gap-6">
            {poolsData.map((pool, index) => (
              <Card key={pool.name} className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full cyber-border bg-cyber-surface/50 flex items-center justify-center">
                        <Droplets className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold">{pool.name}</h3>
                          <Badge 
                            variant={pool.status === 'New' ? 'default' : 'secondary'}
                            className="cyber-border"
                          >
                            {pool.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">Confidential liquidity pool</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="text-2xl font-bold text-primary">{pool.apy}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">APY</p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 rounded-lg cyber-border bg-cyber-surface/20">
                      <p className="text-sm text-muted-foreground mb-1">Total Value Locked</p>
                      <p className="text-lg font-bold cyber-text-glow">{pool.tvl}</p>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg cyber-border bg-cyber-surface/20">
                      <p className="text-sm text-muted-foreground mb-1">Liquidity Providers</p>
                      <p className="text-lg font-bold cyber-text-glow">{pool.users}</p>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg cyber-border bg-cyber-surface/20">
                      <p className="text-sm text-muted-foreground mb-1">24h Volume</p>
                      <p className="text-lg font-bold cyber-text-glow">••••••</p>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg cyber-border bg-cyber-surface/20">
                      <p className="text-sm text-muted-foreground mb-1">Your Position</p>
                      <p className="text-lg font-bold cyber-text-glow">••••••</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pools;