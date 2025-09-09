import { Shield, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const Header = () => {
  const { isConnected } = useAccount();

  return (
    <header className="relative border-b cyber-border bg-cyber-surface/50 backdrop-blur-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and branding */}
          <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary rotate-slow" />
              <div className="absolute inset-0 h-8 w-8 text-primary opacity-30 animate-pulse">
                <Shield />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold cyber-text-glow">Cipher Vault</h1>
              <p className="text-sm text-muted-foreground">FHE Lending Protocol</p>
            </div>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/borrow" className="text-foreground hover:text-primary transition-colors">
              Borrow
            </a>
            <a href="/lend" className="text-foreground hover:text-primary transition-colors">
              Lend
            </a>
            <a href="/pools" className="text-foreground hover:text-primary transition-colors">
              Pools
            </a>
            <a href="/analytics" className="text-foreground hover:text-primary transition-colors">
              Analytics
            </a>
          </nav>

          {/* Connect wallet */}
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated');

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <Button 
                          onClick={openConnectModal} 
                          variant="outline" 
                          className="cyber-border hover:cyber-glow"
                        >
                          <Wallet className="h-4 w-4 mr-2" />
                          Connect Wallet
                        </Button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <Button 
                          onClick={openChainModal} 
                          variant="outline" 
                          className="cyber-border hover:cyber-glow border-red-500 text-red-500"
                        >
                          Wrong network
                        </Button>
                      );
                    }

                    return (
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={openChainModal}
                          variant="outline"
                          className="cyber-border hover:cyber-glow"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: 'hidden',
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  style={{ width: 12, height: 12 }}
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </Button>

                        <Button
                          onClick={openAccountModal}
                          variant="outline"
                          className="cyber-border hover:cyber-glow"
                        >
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ''}
                        </Button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    </header>
  );
};

export default Header;