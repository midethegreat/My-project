'use client'

import { useState } from 'react'
import { WalletConnect } from '@/components/wallet-connect'
import { GameDashboard } from '@/components/game-dashboard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [showLanding, setShowLanding] = useState(true)

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address)
    setIsConnected(true)
    setShowLanding(false)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setWalletAddress('')
    setShowLanding(true)
  }

  if (!showLanding && isConnected) {
    return (
      <main className="min-h-screen bg-background">
        <GameDashboard walletAddress={walletAddress} onDisconnect={handleDisconnect} />
      </main>
    )
  }

  if (showLanding && !isConnected) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background via-card/20 to-background">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20 md:py-28">
            {/* Navigation */}
            <nav className="flex items-center justify-between mb-12 sm:mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="flex items-center gap-2">
                <i className="fas fa-link text-3xl sm:text-4xl text-primary" />
                <span className="text-2xl sm:text-3xl font-bold text-foreground">OnePlay</span>
              </div>
              <Button
                onClick={() => setShowLanding(false)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <i className="fas fa-play mr-2" />
                Play Now
              </Button>
            </nav>

            {/* Hero Content */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight">
                    GameFi Evolution on <span className="text-primary">OneChain</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-muted-foreground">
                    Experience the future of gaming where you truly own your assets, earn real rewards, and control your digital economy
                  </p>
                </div>
                <Button
                  onClick={() => setShowLanding(false)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto px-8 py-6 text-lg"
                >
                  <i className="fas fa-rocket mr-2" />
                  Get Started Now
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                {[
                  { icon: 'fa-bolt', title: 'Lightning Fast', desc: 'Sub-second transactions' },
                  { icon: 'fa-shield', title: 'Secure', desc: 'Blockchain secured' },
                  { icon: 'fa-gem', title: 'Own Assets', desc: 'True NFT ownership' },
                  { icon: 'fa-coins', title: 'Earn Rewards', desc: 'Play and earn tokens' },
                  { icon: 'fa-chart-line', title: 'Track Stats', desc: 'Real-time analytics' },
                  { icon: 'fa-people-group', title: 'Community', desc: 'Join the GameFi revolution' },
                ].map((feature, idx) => (
                  <Card key={feature.title} className="p-4 border-border/50 hover:border-primary/50 transition-all animate-in fade-in duration-500" style={{ animationDelay: `${300 + idx * 100}ms` }}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <i className={`fas ${feature.icon} text-primary`} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-foreground text-sm">{feature.title}</h3>
                        <p className="text-xs text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-card/30 border-y border-border/50 py-16 sm:py-20 animate-in fade-in duration-700 delay-300">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12">
              Everything You Need
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: 'fa-gamepad',
                  title: 'Play & Earn',
                  desc: 'Enjoy immersive games while earning real tokens and NFT rewards',
                },
                {
                  icon: 'fa-wallet',
                  title: 'Smart Wallet',
                  desc: 'Manage, send, and trade your assets with full control',
                },
                {
                  icon: 'fa-image',
                  title: 'Collectible NFTs',
                  desc: 'Build your collection and trade on the marketplace',
                },
              ].map((item, idx) => (
                <div key={item.title} className="text-center space-y-4 animate-in fade-in duration-500" style={{ animationDelay: `${400 + idx * 100}ms` }}>
                  <div className="w-16 h-16 mx-auto rounded-xl bg-primary/20 flex items-center justify-center hover:scale-110 transition-transform">
                    <i className={`fas ${item.icon} text-3xl text-primary`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20 text-center space-y-8 animate-in fade-in duration-700 delay-500">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Ready to Enter the GameFi Revolution?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect your wallet and start playing, earning, and building your Web3 gaming empire today
            </p>
          </div>
          <Button
            onClick={() => setShowLanding(false)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg mx-auto hover:scale-105 transition-transform"
          >
            <i className="fas fa-arrow-right mr-2" />
            Launch App
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <WalletConnect onConnect={handleWalletConnect} />
    </main>
  )
}
