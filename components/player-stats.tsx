"use client"

import { Card } from "@/components/ui/card"

export function PlayerStats() {
  const stats = [
    {
      label: "Total Earnings",
      value: "₦2,847.50",
      change: "+12.5%",
      icon: "fa-wallet",
      trend: "up",
    },
    {
      label: "Game Level",
      value: "24",
      change: "+2 levels",
      icon: "fa-star",
      trend: "up",
    },
    {
      label: "NFTs Owned",
      value: "18",
      change: "+3 this week",
      icon: "fa-image",
      trend: "up",
    },
    {
      label: "Token Balance",
      value: "5,420.35",
      change: "+245 tokens",
      icon: "fa-coins",
      trend: "up",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 w-full">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 sm:p-6 border-border/50 hover:border-primary/50 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1 truncate">{stat.label}</p>
              <p className="text-xl sm:text-2xl font-bold text-foreground break-words">{stat.value}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 ml-2">
              <i className={`${stat.icon} text-lg sm:text-xl text-primary`} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-primary font-medium truncate">{stat.change}</span>
            <i className="fas fa-arrow-trend-up text-sm text-primary flex-shrink-0" />
          </div>
        </Card>
      ))}
    </div>
  )
}
