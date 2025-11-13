"use client"

import { useState } from "react"
import { WalletConnect } from "@/components/wallet-connect"
import { GameDashboard } from "@/components/game-dashboard"

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address)
    setIsConnected(true)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setWalletAddress("")
  }

  return (
    <main className="min-h-screen bg-background">
      {!isConnected ? (
        <WalletConnect onConnect={handleWalletConnect} />
      ) : (
        <GameDashboard walletAddress={walletAddress} onDisconnect={handleDisconnect} />
      )}
    </main>
  )
}
