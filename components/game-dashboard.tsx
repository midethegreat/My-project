"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PlayerStats } from "./player-stats"
import { GameArena } from "./game-arena"
import { TokenomicsView } from "./tokenomics-view"
import { NFTGallery } from "./nft-gallery"
import { WalletManager } from "./wallet-manager"

interface GameDashboardProps {
  walletAddress: string
  onDisconnect: () => void
}

type Tab = "wallet" | "arena" | "assets" | "nfts" | "stats"

export function GameDashboard({ walletAddress, onDisconnect }: GameDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("wallet")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const shortAddress = `${walletAddress.substring(0, 6)}...${walletAddress.substring(-4)}`

  const tabs = [
    { id: "wallet", label: "Wallet", icon: "fa-wallet" },
    { id: "arena", label: "Game Arena", icon: "fa-dice" },
    { id: "assets", label: "Tokenomics", icon: "fa-chart-pie" },
    { id: "nfts", label: "NFT Assets", icon: "fa-image" },
    { id: "stats", label: "Statistics", icon: "fa-chart-line" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 sm:gap-3">
              <i className="fas fa-link text-2xl sm:text-3xl text-primary" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-primary">OnePlay</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">GameFi Hub on OneChain</p>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <i className={`fas fa-${mobileMenuOpen ? "xmark" : "bars"}`} />
            </button>

            {/* Desktop wallet info and disconnect */}
            <div className="hidden md:flex items-center gap-4">
              <div className="px-3 sm:px-4 py-2 rounded-lg bg-card border border-primary/30">
                <p className="text-xs text-muted-foreground">Connected</p>
                <p className="text-sm font-mono font-semibold text-primary">{shortAddress}</p>
              </div>
              <Button
                onClick={onDisconnect}
                variant="outline"
                className="text-foreground border-border hover:border-destructive hover:text-destructive bg-transparent"
              >
                <i className="fas fa-sign-out-alt mr-2" />
                Disconnect
              </Button>
            </div>
          </div>

          {/* Mobile wallet info and disconnect */}
          <div className="md:hidden mt-4 pt-4 border-t border-border/50 space-y-3">
            <div className="px-3 py-2 rounded-lg bg-card border border-primary/30">
              <p className="text-xs text-muted-foreground">Connected</p>
              <p className="text-xs sm:text-sm font-mono font-semibold text-primary">{shortAddress}</p>
            </div>
            <Button
              onClick={onDisconnect}
              variant="outline"
              className="w-full text-foreground border-border hover:border-destructive hover:text-destructive bg-transparent"
            >
              <i className="fas fa-sign-out-alt mr-2" />
              Disconnect
            </Button>
          </div>
        </div>
      </header>

      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <WalletManager />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Player Stats Overview */}
        <PlayerStats />

        {/* Navigation Tabs */}
        <div className="mb-6 sm:mb-8">
          <div className="flex gap-1 sm:gap-2 border-b border-border/50 overflow-x-auto pb-0 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as Tab)
                  setMobileMenuOpen(false)
                }}
                className={`px-2 sm:px-4 py-3 font-medium text-xs sm:text-sm transition-all relative whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="hidden sm:inline">
                  <i className={`fas ${tab.icon} mr-2`} />
                  {tab.label}
                </span>
                <span className="sm:hidden">
                  <i className={`fas ${tab.icon}`} />
                </span>
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t" />}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "wallet" && <div className="hidden" />}
          {activeTab === "arena" && <GameArena />}
          {activeTab === "assets" && <TokenomicsView />}
          {activeTab === "nfts" && <NFTGallery />}
          {activeTab === "stats" && (
            <Card className="p-6 sm:p-8 text-center border-border/50">
              <div className="space-y-4">
                <i className="fas fa-chart-line text-4xl text-primary" />
                <p className="text-muted-foreground">Advanced statistics coming soon</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
