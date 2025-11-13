"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface FundActionsModalProps {
  isOpen: boolean
  onClose: () => void
  balance: number
  onBalanceChange: (newBalance: number) => void
}

type ActionType = "add" | "withdraw" | "send" | null

export function FundActionsModal({ isOpen, onClose, balance, onBalanceChange }: FundActionsModalProps) {
  const [action, setAction] = useState<ActionType>(null)
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  if (!isOpen) return null

  const handleAction = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      setMessage({ type: "error", text: "Please enter a valid amount" })
      return
    }

    if (action === "send" && !recipient) {
      setMessage({ type: "error", text: "Please enter a recipient address" })
      return
    }

    if (action !== "add" && Number.parseFloat(amount) > balance) {
      setMessage({ type: "error", text: "Insufficient balance" })
      return
    }

    setIsProcessing(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const amountNum = Number.parseFloat(amount)
      let newBalance = balance

      if (action === "add") {
        newBalance = balance + amountNum
        setMessage({ type: "success", text: `Added ${amountNum} OPC to your wallet` })
      } else if (action === "withdraw") {
        newBalance = balance - amountNum
        setMessage({ type: "success", text: `Withdrew ${amountNum} OPC from your wallet` })
      } else if (action === "send") {
        newBalance = balance - amountNum
        setMessage({
          type: "success",
          text: `Sent ${amountNum} OPC to ${recipient.substring(0, 6)}...${recipient.substring(-4)}`,
        })
      }

      onBalanceChange(newBalance)

      setTimeout(() => {
        setAmount("")
        setRecipient("")
        setAction(null)
        setMessage(null)
        onClose()
      }, 2000)
    } finally {
      setIsProcessing(false)
    }
  }

  if (action === null) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md border-border/50 bg-card/95 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="material-icons">account_balance_wallet</span>
              Manage Funds
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-lg transition-smooth text-muted-foreground hover:text-foreground"
            >
              <span className="material-icons">close</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 p-6">
            {[
              { id: "add" as const, icon: "add_circle", label: "Add Funds" },
              { id: "send" as const, icon: "send", label: "Send" },
              { id: "withdraw" as const, icon: "money_off", label: "Withdraw" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setAction(btn.id)}
                className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-smooth group"
              >
                <span className="material-icons text-2xl text-muted-foreground group-hover:text-primary transition-smooth">
                  {btn.icon}
                </span>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">
                  {btn.label}
                </span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    )
  }

  const actionLabels = {
    add: "Add Funds",
    withdraw: "Withdraw Funds",
    send: "Send Funds",
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border-border/50 bg-card/95 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <span className="material-icons">
              {action === "add" ? "add_circle" : action === "send" ? "send" : "money_off"}
            </span>
            {actionLabels[action]}
          </h2>
          <button
            onClick={() => setAction(null)}
            className="p-1 hover:bg-muted rounded-lg transition-smooth text-muted-foreground hover:text-foreground"
          >
            <span className="material-icons">arrow_back</span>
          </button>
        </div>

        <div className="p-6 space-y-4">
          {action === "send" && (
            <div>
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 block">
                Recipient Address
              </label>
              <input
                type="text"
                placeholder="0x..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                disabled={isProcessing}
                className="w-full px-4 py-2 rounded-lg bg-input border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-smooth disabled:opacity-50"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 block">
              Amount (OPC)
            </label>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isProcessing}
              step="0.01"
              min="0"
              className="w-full px-4 py-2 rounded-lg bg-input border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-smooth disabled:opacity-50"
            />
            <p className="text-xs text-muted-foreground mt-2">Available: {balance.toFixed(2)} OPC</p>
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg border text-sm flex items-center gap-2 ${
                message.type === "success"
                  ? "bg-primary/10 border-primary/50 text-primary"
                  : "bg-destructive/10 border-destructive/50 text-destructive"
              }`}
            >
              <span className="material-icons text-base">{message.type === "success" ? "check_circle" : "error"}</span>
              {message.text}
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              onClick={() => setAction(null)}
              variant="outline"
              disabled={isProcessing}
              className="flex-1 text-foreground border-border hover:border-border transition-smooth"
            >
              Back
            </Button>
            <Button
              onClick={handleAction}
              disabled={isProcessing || !amount}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 transition-smooth text-primary-foreground font-semibold flex items-center justify-center gap-2"
            >
              <span className="material-icons text-lg">
                {isProcessing ? "hourglass_empty" : action === "add" ? "add" : action === "send" ? "send" : "download"}
              </span>
              {isProcessing ? "Processing..." : actionLabels[action]}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
