"use client"

import { Card } from "@/components/ui/card"

interface WalletBalanceProps {
  balance: number
  onOpenActions: () => void
}

export function WalletBalance({ balance, onOpenActions }: WalletBalanceProps) {
  return (
    <Card className="p-6 sm:p-8 border-border/50 bg-gradient-to-br from-card/50 to-card/30 hover:from-card/70 hover:to-card/50 transition-smooth group">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-medium">Wallet Balance</p>
          <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            {balance.toFixed(2)} OPC
          </p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
          <span className="material-icons text-primary text-2xl">account_balance_wallet</span>
        </div>
      </div>
      <button
        onClick={onOpenActions}
        className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/30 transition-smooth flex items-center justify-center gap-2"
      >
        <span className="material-icons text-lg">add</span>
        Manage Funds
      </button>
    </Card>
  )
}
