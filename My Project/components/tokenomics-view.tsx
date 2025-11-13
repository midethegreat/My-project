"use client"

import { Card } from "@/components/ui/card"

export function TokenomicsView() {
  const tokens = [
    {
      name: "ONEPLAY",
      symbol: "OPT",
      balance: "5,420.35",
      value: "$2,710.18",
      change: "+5.2%",
      icon: "🪙",
    },
    {
      name: "Game Reward Token",
      symbol: "GRT",
      balance: "12,850.00",
      value: "$1,285.00",
      change: "+8.1%",
      icon: "💎",
    },
    {
      name: "OneChain Native",
      symbol: "ONE",
      balance: "245.50",
      value: "$612.75",
      change: "+2.3%",
      icon: "⛓️",
    },
  ]

  const portfolio = [
    { name: "ONEPLAY", percentage: 52 },
    { name: "GRT", percentage: 31 },
    { name: "ONE", percentage: 17 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Token Holdings */}
      <div className="lg:col-span-2 space-y-4">
        {tokens.map((token) => (
          <Card key={token.symbol} className="p-6 border-border/50 hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{token.icon}</span>
                <div>
                  <h3 className="font-bold text-foreground">{token.name}</h3>
                  <p className="text-sm text-muted-foreground">{token.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{token.balance}</p>
                <p className="text-sm text-muted-foreground">{token.value}</p>
                <p className="text-sm text-primary font-medium mt-1">{token.change}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Portfolio Distribution */}
      <div>
        <Card className="p-6 border-border/50">
          <h3 className="text-lg font-bold text-foreground mb-6">Portfolio Mix</h3>
          <div className="space-y-4">
            {portfolio.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-sm font-bold text-primary">{item.percentage}%</p>
                </div>
                <div className="w-full bg-card rounded-full h-2 border border-border/50 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
