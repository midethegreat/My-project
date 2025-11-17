'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'

interface WalletConnectProps {
  onConnect: (address: string) => void
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mockWallets = [
    {
      name: 'MetaMask',
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.5 5.5L12 10.5l-3-5H3l7 10-3.5 5h6l1.5-2.5L20 10.5l1.5-5h-2z" fill="#E2761B" />
          <path d="M2.5 5.5L12 10.5l-3-5H0l7 10-3.5 5h6l1.5-2.5L19 10.5l1.5-5h-2z" fill="#CD6116" />
          <circle cx="12" cy="12" r="10" fill="#F6851B" fillOpacity="0.2" />
        </svg>
      ),
    },
    {
      name: 'WalletConnect',
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" fill="none" />
          <path
            d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z"
            fill="none"
            stroke="#3B99FC"
            strokeWidth="2"
          />
          <path d="M9 12h6M12 9v6" stroke="#3B99FC" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: 'Coinbase Wallet',
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#1652F0" />
          <text x="12" y="16" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">
            ₿
          </text>
        </svg>
      ),
    },
    {
      name: 'OneChain Native',
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#9333EA" />
          <path d="M12 6v12M6 12h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ]

  const handleConnect = async (walletName: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/wallet/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletName }),
      })

      if (!response.ok) {
        throw new Error('Failed to connect wallet')
      }

      const { address } = await response.json()
      onConnect(address)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed')
      setTimeout(() => setIsLoading(false), 1500)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-card to-background">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="space-y-3 text-center">
          <div className="text-5xl font-bold text-primary mb-2">
            <i className="fa-solid fa-chain"></i> OnePlay
          </div>
          <h1 className="text-3xl font-bold text-foreground">GameFi on OneChain</h1>
          <p className="text-muted-foreground">Connect your wallet to enter the on-chain gaming revolution</p>
        </div>

        {/* Wallet Options */}
        <Card className="p-6 space-y-4 border-border/50">
          <h2 className="text-lg font-semibold text-foreground mb-4">Connect Wallet</h2>

          <div className="space-y-3">
            {mockWallets.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => handleConnect(wallet.name)}
                disabled={isLoading}
                className="w-full flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-card/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  {wallet.logo}
                  <span className="font-medium text-foreground">{wallet.name}</span>
                </div>
                <span className="text-muted-foreground">→</span>
              </button>
            ))}
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">{error}</div>
          )}
        </Card>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          {[
            { icon: 'fa-solid fa-bolt', label: 'Fast Transactions' },
            { icon: 'fa-solid fa-gamepad', label: 'Play & Earn' },
            { icon: 'fa-solid fa-gem', label: 'Own Assets' },
            { icon: 'fa-solid fa-rocket', label: 'Web3 Gaming' },
          ].map((feature) => (
            <div
              key={feature.label}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card border border-border/50"
            >
              <i className={`${feature.icon} text-2xl text-primary`}></i>
              <span className="text-xs text-center text-muted-foreground">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
