"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface CardGameState {
  correctCard: number
  selectedCard: number | null
  revealed: boolean
  gameActive: boolean
}

export function GameArena() {
  const [gameState, setGameState] = useState<"idle" | "betting" | "playing" | "ended">("idle")
  const [totalWins, setTotalWins] = useState(0)
  const [totalLosses, setTotalLosses] = useState(0)
  const [totalEarnings, setTotalEarnings] = useState(0)
  const [bet, setBet] = useState(10)
  const [customBet, setCustomBet] = useState("")
  const [cardGame, setCardGame] = useState<CardGameState>({
    correctCard: 0,
    selectedCard: null,
    revealed: false,
    gameActive: false,
  })
  const [message, setMessage] = useState("")
  const [winAmount, setWinAmount] = useState(0)

  const startNewRound = () => {
    const correctCard = Math.floor(Math.random() * 3)
    setCardGame({
      correctCard,
      selectedCard: null,
      revealed: false,
      gameActive: true,
    })
    setMessage("")
    setGameState("playing")
  }

  const selectCard = (cardIndex: number) => {
    if (!cardGame.gameActive || cardGame.selectedCard !== null) return

    setCardGame((prev) => ({
      ...prev,
      selectedCard: cardIndex,
      revealed: true,
      gameActive: false,
    }))

    // Determine win/loss
    if (cardIndex === cardGame.correctCard) {
      const earnings = bet * 2 // Double the bet on win
      setTotalWins((prev) => prev + 1)
      setTotalEarnings((prev) => prev + earnings)
      setWinAmount(earnings)
      setMessage("🎉 You Won!")
    } else {
      setTotalLosses((prev) => prev + 1)
      setTotalEarnings((prev) => prev - bet)
      setWinAmount(-bet)
      setMessage("❌ Wrong Card")
    }
  }

  const handlePlayAgain = () => {
    startNewRound()
  }

  const handleChangeBet = () => {
    setGameState("betting")
    setCustomBet("")
    setCardGame({
      correctCard: 0,
      selectedCard: null,
      revealed: false,
      gameActive: false,
    })
  }

  const handleCustomBetInput = () => {
    const customAmount = Number.parseInt(customBet)
    if (customAmount > 0 && customAmount <= 10000) {
      setBet(customAmount)
      setCustomBet("")
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {/* Main Game Area */}
        <div className="lg:col-span-2 w-full">
          <Card className="p-4 sm:p-8 border-border/50 min-h-80 sm:min-h-96 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />

            <div className="relative z-10 text-center space-y-4 sm:space-y-8 w-full px-2 sm:px-0">
              {gameState === "idle" && (
                <>
                  <div className="text-5xl sm:text-6xl">🎴</div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Card Guessing Game</h2>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Pick the correct card and double your bet!
                    </p>
                  </div>
                  <Button
                    onClick={() => setGameState("betting")}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
                  >
                    <i className="fas fa-play mr-2" />
                    Play Now
                  </Button>
                </>
              )}

              {gameState === "betting" && (
                <>
                  <div className="text-4xl sm:text-5xl">💰</div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">Place Your Bet</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                      Choose how much to wager on this round (₦1 - ₦10,000)
                    </p>
                  </div>
                  <div className="space-y-4 w-full max-w-xs mx-auto px-2 sm:px-0">
                    {/* Responsive button grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[5, 10, 20, 50, 100, 250].map((amount) => (
                        <Button
                          key={amount}
                          onClick={() => setBet(amount)}
                          variant={bet === amount ? "default" : "outline"}
                          className={`text-xs sm:text-sm py-3 px-4 ${
                            bet === amount
                              ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                              : "border-border text-foreground hover:bg-card"
                          }`}
                        >
                          ₦{amount}
                        </Button>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm text-muted-foreground block">Or enter custom amount</label>
                      <div className="flex gap-3">
                        <input
                          type="number"
                          value={customBet}
                          onChange={(e) => setCustomBet(e.target.value)}
                          placeholder="Enter amount (₦)"
                          className="flex-1 px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary"
                          min="1"
                          max="10000"
                        />
                        <Button
                          onClick={handleCustomBetInput}
                          disabled={!customBet}
                          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-3"
                        >
                          <i className="fas fa-check" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-card rounded-lg p-4 border border-border/50">
                      <p className="text-xs sm:text-sm text-muted-foreground">Current Bet</p>
                      <p className="text-2xl sm:text-3xl font-bold text-primary">₦{bet}</p>
                      <p className="text-xs text-muted-foreground mt-2">Potential Win: ₦{bet * 2}</p>
                    </div>
                    <Button
                      onClick={startNewRound}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 font-semibold text-base"
                    >
                      <i className="fas fa-dice mr-2" />
                      Start Round
                    </Button>
                  </div>
                </>
              )}

              {gameState === "playing" && (
                <>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Pick the Correct Card</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">You're betting ₦{bet}</p>
                  </div>

                  {/* Responsive card grid - 3 columns that adapt to mobile */}
                  <div className="flex gap-2 sm:gap-4 md:gap-6 justify-center my-4 sm:my-8 flex-wrap">
                    {[0, 1, 2].map((cardIndex) => (
                      <button
                        key={cardIndex}
                        onClick={() => selectCard(cardIndex)}
                        disabled={cardGame.selectedCard !== null}
                        className={`relative group transition-all transform hover:scale-105 sm:hover:scale-110 ${
                          cardGame.selectedCard !== null ? "cursor-default" : "cursor-pointer"
                        }`}
                      >
                        <div
                          className={`w-20 h-28 sm:w-24 sm:h-32 rounded-lg border-2 flex items-center justify-center text-2xl sm:text-4xl font-bold transition-all ${
                            cardGame.revealed
                              ? cardIndex === cardGame.correctCard
                                ? "bg-green-500/20 border-green-500"
                                : cardIndex === cardGame.selectedCard
                                  ? "bg-red-500/20 border-red-500"
                                  : "bg-card border-border/50"
                              : "bg-gradient-to-br from-primary/40 to-secondary/40 border-primary hover:border-primary/80"
                          }`}
                        >
                          {cardGame.revealed
                            ? cardIndex === cardGame.correctCard
                              ? "✓"
                              : cardIndex === cardGame.selectedCard
                                ? "✗"
                                : "?"
                            : "?"}
                        </div>
                        {!cardGame.revealed && (
                          <span className="text-xs sm:text-sm font-bold text-foreground mt-2">
                            Card {cardIndex + 1}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {gameState === "ended" || (cardGame.revealed && gameState === "playing") ? (
                <>
                  <div className="text-4xl sm:text-5xl">{winAmount > 0 ? "🏆" : "💔"}</div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">{message}</h2>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">
                      {winAmount > 0 ? `You won ₦${winAmount}!` : `You lost ₦${Math.abs(winAmount)}`}
                    </p>
                  </div>
                  {/* Responsive button layout */}
                  <div className="flex flex-col gap-3 justify-center w-full max-w-xs mx-auto">
                    <Button
                      onClick={handlePlayAgain}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground w-full py-3 font-semibold"
                    >
                      <i className="fas fa-redo mr-2" />
                      Play Again
                    </Button>
                    <Button
                      onClick={handleChangeBet}
                      variant="outline"
                      className="border-border text-foreground hover:bg-card bg-transparent w-full py-3"
                    >
                      <i className="fas fa-coins mr-2" />
                      Change Bet
                    </Button>
                  </div>
                </>
              ) : null}
            </div>
          </Card>
        </div>

        {/* Side Stats Panel */}
        <div className="w-full">
          <Card className="p-4 sm:p-6 border-border/50">
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 sm:mb-6">Session Stats</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-muted-foreground">Wins</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary">{totalWins}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-muted-foreground">Losses</p>
                <p className="text-2xl sm:text-3xl font-bold text-secondary">{totalLosses}</p>
              </div>
              <div className="h-1 bg-border rounded-full" />
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-muted-foreground">Total Earnings</p>
                <p className={`text-2xl sm:text-3xl font-bold ${totalEarnings >= 0 ? "text-primary" : "text-red-400"}`}>
                  ₦{totalEarnings}
                </p>
              </div>
              {totalWins + totalLosses > 0 && (
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm text-muted-foreground">Win Rate</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">
                    {((totalWins / (totalWins + totalLosses)) * 100).toFixed(1)}%
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
