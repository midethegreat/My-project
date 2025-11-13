"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

interface WalletConnectProps {
  onConnect: (address: string) => void
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mockWallets = [
    { name: "MetaMask", icon: "account_balance_wallet" },
    { name: "WalletConnect", icon: "link" },
    { name: "Coinbase Wallet", icon: "wallet" },
    { name: "OneChain Native", icon: "currency_exchange" },
  ]

  const handleConnect = async (walletName: string) => {
    setIsLoading(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock wallet address generation
      const mockAddress = `0x${Array(40)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")}`
      onConnect(mockAddress)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection failed")
      setTimeout(() => setIsLoading(false), 1500)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-card/30 to-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="space-y-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="material-icons text-2xl text-white">sports_esports</span>
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              OnePlay
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-foreground">GameFi on OneChain</h2>
          <p className="text-sm text-muted-foreground">
            Connect your wallet to enter the next era of blockchain gaming
          </p>
        </div>

        <Card className="p-6 space-y-4 border-border/50 bg-card/50 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-icons text-primary text-xl">security</span>
            <h2 className="text-lg font-semibold text-foreground">Connect Wallet</h2>
          </div>

          <div className="space-y-3">
            {mockWallets.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => handleConnect(wallet.name)}
                disabled={isLoading}
                className="w-full flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                    <span className="material-icons text-primary">{wallet.icon}</span>
                  </div>
                  <span className="font-medium text-foreground">{wallet.name}</span>
                </div>
                <span className="material-icons text-muted-foreground group-hover:text-primary transition-smooth">
                  arrow_forward
                </span>
              </button>
            ))}
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive text-sm flex items-center gap-2">
              <span className="material-icons text-sm">error</span>
              {error}
            </div>
          )}
        </Card>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: "flash_on", label: "Fast Transactions" },
            { icon: "videogame_asset", label: "Play & Earn" },
            { icon: "diamond", label: "Own Assets" },
            { icon: "rocket_launch", label: "Web3 Gaming" },
          ].map((feature) => (
            <div
              key={feature.label}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 transition-smooth"
            >
              <span className="material-icons text-primary text-2xl">{feature.icon}</span>
              <span className="text-xs text-center text-muted-foreground font-medium">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
