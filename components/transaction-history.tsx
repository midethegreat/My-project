"use client"

import { Card } from "@/components/ui/card"

interface Transaction {
  id: string
  type: "add" | "withdraw" | "send"
  amount: number
  recipient?: string
  timestamp: Date
}

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  if (transactions.length === 0) {
    return (
      <Card className="p-6 sm:p-8 border-border/50 bg-card/30 text-center">
        <span className="material-icons text-4xl text-muted-foreground mb-3 inline-block">history</span>
        <p className="text-muted-foreground">No transactions yet. Start by adding funds to your wallet.</p>
      </Card>
    )
  }

  return (
    <Card className="border-border/50 bg-card/30 overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-border/50">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="material-icons">history</span>
          Transaction History
        </h3>
      </div>

      <div className="divide-y divide-border/50">
        {transactions.map((tx) => {
          const icons = {
            add: "add_circle",
            withdraw: "money_off",
            send: "send",
          }
          const colors = {
            add: "text-primary",
            withdraw: "text-destructive",
            send: "text-secondary",
          }

          return (
            <div
              key={tx.id}
              className="p-4 sm:p-6 hover:bg-muted/30 transition-smooth flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                  <span className={`material-icons text-lg ${colors[tx.type]}`}>{icons[tx.type]}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground capitalize">
                    {tx.type === "send"
                      ? `Sent to ${tx.recipient?.substring(0, 6)}...${tx.recipient?.substring(-4)}`
                      : tx.type === "add"
                        ? "Added Funds"
                        : "Withdrew Funds"}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.timestamp.toLocaleString()}</p>
                </div>
              </div>
              <p className={`font-semibold text-lg ${colors[tx.type]}`}>
                {tx.type === "add" ? "+" : "-"}
                {tx.amount.toFixed(2)} OPC
              </p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
