"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PlayerStats } from "./player-stats"
import { GameArena } from "./game-arena"
import { TokenomicsView } from "./tokenomics-view"
import { NFTGallery } from "./nft-gallery"
import { WalletBalance } from "./wallet-balance"
import { FundActionsModal } from "./fund-actions-modal"
import { TransactionHistory } from "./transaction-history"

interface GameDashboardProps {
  walletAddress: string
  onDisconnect: () => void
}

type Tab = "arena" | "assets" | "nfts" | "stats" | "wallet"

interface Transaction {
  id: string
  type: "add" | "withdraw" | "send"
  amount: number
  recipient?: string
  timestamp: Date
}

export function GameDashboard({ walletAddress, onDisconnect }: GameDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("arena")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [balance, setBalance] = useState(5420.35)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [fundModalOpen, setFundModalOpen] = useState(false)

  const shortAddress = `${walletAddress.substring(0, 6)}...${walletAddress.substring(-4)}`

  const tabs = [
    { id: "arena", label: "Game Arena", icon: "sports_esports" },
    { id: "assets", label: "Tokenomics", icon: "pie_chart" },
    { id: "nfts", label: "NFT Assets", icon: "image" },
    { id: "stats", label: "Statistics", icon: "trending_up" },
    { id: "wallet", label: "Wallet", icon: "account_balance_wallet" },
  ]

  const handleBalanceChange = (newBalance: number) => {
    const oldBalance = balance
    const difference = newBalance - oldBalance
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: difference > 0 ? "add" : "withdraw",
      amount: Math.abs(difference),
      timestamp: new Date(),
    }
    setBalance(newBalance)
    setTransactions([transaction, ...transactions])
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="material-icons text-white text-xl">sports_esports</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  OnePlay
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Premium GameFi Hub</p>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <span className="material-icons">{mobileMenuOpen ? "close" : "menu"}</span>
            </button>

            <div className="hidden md:flex items-center gap-4">
              <div className="px-4 py-2 rounded-lg bg-card border border-primary/30 hover:border-primary/50 transition-smooth">
                <p className="text-xs text-muted-foreground">Connected</p>
                <p className="text-sm font-mono font-semibold text-primary">{shortAddress}</p>
              </div>
              <Button
                onClick={onDisconnect}
                variant="outline"
                className="text-foreground border-border hover:border-destructive hover:text-destructive bg-transparent transition-smooth"
              >
                <span className="material-icons text-base mr-2">logout</span>
                Disconnect
              </Button>
            </div>
          </div>

          {/* Mobile wallet display */}
          <div className="md:hidden mt-4 pt-4 border-t border-border/50 space-y-3">
            <div className="px-3 py-2 rounded-lg bg-card border border-primary/30">
              <p className="text-xs text-muted-foreground">Connected</p>
              <p className="text-xs sm:text-sm font-mono font-semibold text-primary">{shortAddress}</p>
            </div>
            <Button
              onClick={onDisconnect}
              variant="outline"
              className="w-full text-foreground border-border hover:border-destructive hover:text-destructive bg-transparent transition-smooth"
            >
              <span className="material-icons text-base mr-2">logout</span>
              Disconnect
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Player Stats Overview */}
        <PlayerStats />

        <div className="mb-6 sm:mb-8">
          <div className="flex gap-1 sm:gap-2 border-b border-border/50 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as Tab)
                  setMobileMenuOpen(false)
                }}
                className={`px-2 sm:px-4 py-3 font-medium text-xs sm:text-sm transition-smooth relative whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="material-icons text-base">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-t" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "arena" && <GameArena />}
          {activeTab === "assets" && <TokenomicsView />}
          {activeTab === "nfts" && <NFTGallery />}
          {activeTab === "stats" && (
            <Card className="p-6 sm:p-8 text-center border-border/50 bg-card/30">
              <span className="material-icons text-4xl text-muted-foreground mb-3 inline-block">analytics</span>
              <p className="text-muted-foreground">Advanced statistics coming soon</p>
            </Card>
          )}
          {activeTab === "wallet" && (
            <div className="space-y-6">
              <WalletBalance balance={balance} onOpenActions={() => setFundModalOpen(true)} />
              <TransactionHistory transactions={transactions} />
            </div>
          )}
        </div>
      </div>

      {/* Fund Actions Modal */}
      <FundActionsModal
        isOpen={fundModalOpen}
        onClose={() => setFundModalOpen(false)}
        balance={balance}
        onBalanceChange={handleBalanceChange}
      />
    </div>
  )
}
