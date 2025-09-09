import { Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import { useState } from "react";

const HeroSection = () => {
  const [showValues, setShowValues] = useState(false);

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="Futuristic banking interface" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-dark via-transparent to-cyber-dark/80" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-6 py-20">
        <div className="max-w-4xl">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="h-6 w-6 text-primary pulse-glow" />
            <span className="text-primary font-semibold tracking-wider">FULLY HOMOMORPHIC ENCRYPTION</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 cyber-text-glow">
            CIPHER
            <br />
            <span className="text-primary">VAULT</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl">
            The world's first fully homomorphic encryption lending protocol. 
            Borrow and lend digital assets with complete privacy and confidentiality.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="cyber-card p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-muted-foreground">Total Value Locked</p>
                <button onClick={() => setShowValues(!showValues)}>
                  {showValues ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="encrypted-data">
                {showValues ? "$847.2M" : "████████"}
              </div>
            </div>
            
            <div className="cyber-card p-6">
              <p className="text-muted-foreground mb-2">Active Loans</p>
              <div className="encrypted-data">
                {showValues ? "12,847" : "██████"}
              </div>
            </div>
            
            <div className="cyber-card p-6">
              <p className="text-muted-foreground mb-2">Avg. Interest Rate</p>
              <div className="encrypted-data">
                {showValues ? "4.7%" : "████"}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground cyber-glow-intense">
              <a href="/borrow">Start Borrowing</a>
            </Button>
            <Button size="lg" variant="outline" className="cyber-border hover:cyber-glow">
              <a href="/lend">Become a Lender</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Animated elements */}
      <div className="absolute top-1/2 right-10 hidden lg:block">
        <div className="w-2 h-32 bg-gradient-to-b from-transparent via-primary to-transparent data-stream"></div>
      </div>
    </section>
  );
};

export default HeroSection;