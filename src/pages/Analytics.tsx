import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";

const Analytics = () => {
  const volumeData = [
    { name: 'Jan', volume: 4000 },
    { name: 'Feb', volume: 3000 },
    { name: 'Mar', volume: 5000 },
    { name: 'Apr', volume: 4500 },
    { name: 'May', volume: 6000 },
    { name: 'Jun', volume: 5500 },
  ];

  const tvlData = [
    { name: 'Week 1', tvl: 10000 },
    { name: 'Week 2', tvl: 12000 },
    { name: 'Week 3', tvl: 15000 },
    { name: 'Week 4', tvl: 18000 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold cyber-text-glow mb-4">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Confidential protocol analytics with encrypted metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Volume</p>
                  <p className="text-2xl font-bold cyber-text-glow">••••••••</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-green-400">+12.5%</span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Loans</p>
                  <p className="text-2xl font-bold cyber-text-glow">••••••</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-green-400">+8.2%</span>
                  </div>
                </div>
                <Activity className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold cyber-text-glow">••••••</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingDown className="h-4 w-4 text-red-400" />
                    <span className="text-sm text-red-400">-2.1%</span>
                  </div>
                </div>
                <Activity className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Protocol Revenue</p>
                  <p className="text-2xl font-bold cyber-text-glow">••••••••</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-green-400">+15.8%</span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Monthly Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--cyber-surface))',
                      border: '1px solid hsl(var(--primary))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="volume" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>TVL Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={tvlData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--cyber-surface))',
                      border: '1px solid hsl(var(--primary))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="tvl" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Protocol Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'Borrow', amount: '••••••', asset: 'ETH', time: '2 min ago', status: 'Completed' },
                { type: 'Lend', amount: '••••••', asset: 'USDC', time: '5 min ago', status: 'Completed' },
                { type: 'Repay', amount: '••••••', asset: 'DAI', time: '8 min ago', status: 'Completed' },
                { type: 'Withdraw', amount: '••••••', asset: 'ETH', time: '12 min ago', status: 'Processing' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg cyber-border bg-cyber-surface/20">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full cyber-border bg-cyber-surface/50 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">{activity.type} {activity.asset}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold cyber-text-glow">{activity.amount}</p>
                    <Badge 
                      variant={activity.status === 'Completed' ? 'default' : 'secondary'}
                      className="cyber-border"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Analytics;