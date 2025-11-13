"use client"

import { Card } from "@/components/ui/card"

export function PlayerStats() {
  const stats = [
    {
      label: "Total Earnings",
      value: "$2,847.50",
      change: "+12.5%",
      icon: "account_balance_wallet",
      trend: "up",
    },
    {
      label: "Game Level",
      value: "24",
      change: "+2 levels",
      icon: "star_rate",
      trend: "up",
    },
    {
      label: "NFTs Owned",
      value: "18",
      change: "+3 this week",
      icon: "image",
      trend: "up",
    },
    {
      label: "Token Balance",
      value: "5,420.35",
      change: "+245 tokens",
      icon: "toll",
      trend: "up",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="p-6 border-border/50 hover:border-primary/50 transition-smooth bg-card/50 hover:bg-card/70 group"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
              <span className="material-icons text-primary text-xl">{stat.icon}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-sm font-medium">{stat.change}</span>
            <span className="material-icons text-primary text-base">trending_up</span>
          </div>
        </Card>
      ))}
    </div>
  )
}
