"use client"

import { Card } from "@/components/ui/card"

export function NFTGallery() {
  const nfts = [
    {
      id: 1,
      name: "Legendary Warrior",
      rarity: "Legendary",
      power: 9800,
      icon: "⚔️",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 2,
      name: "Shadow Assassin",
      rarity: "Epic",
      power: 7200,
      icon: "🗡️",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      name: "Ice Mage",
      rarity: "Epic",
      power: 6800,
      icon: "❄️",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 4,
      name: "Fire Phoenix",
      rarity: "Rare",
      power: 5400,
      icon: "🔥",
      color: "from-red-500 to-yellow-500",
    },
    {
      id: 5,
      name: "Forest Guardian",
      rarity: "Rare",
      power: 5100,
      icon: "🌲",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 6,
      name: "Ancient Golem",
      rarity: "Uncommon",
      power: 3900,
      icon: "🗿",
      color: "from-gray-500 to-slate-500",
    },
  ]

  const rarityColors = {
    Legendary: "text-yellow-400 border-yellow-400/50",
    Epic: "text-purple-400 border-purple-400/50",
    Rare: "text-blue-400 border-blue-400/50",
    Uncommon: "text-green-400 border-green-400/50",
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Your NFT Collection</h2>
        <p className="text-muted-foreground">{nfts.length} Assets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft) => (
          <Card
            key={nft.id}
            className={`p-6 border-border/50 hover:border-primary/50 transition-all cursor-pointer overflow-hidden group`}
          >
            {/* Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${nft.color} opacity-10 group-hover:opacity-20 transition-opacity`}
            />

            <div className="relative z-10">
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">{nft.icon}</div>
              <h3 className="text-lg font-bold text-foreground mb-2">{nft.name}</h3>
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-xs font-bold px-2 py-1 rounded border ${
                    rarityColors[nft.rarity as keyof typeof rarityColors]
                  }`}
                >
                  {nft.rarity}
                </span>
                <span className="text-sm font-mono text-muted-foreground">#{nft.id}</span>
              </div>
              <div className="space-y-2 pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">Power Level</p>
                <p className="text-2xl font-bold text-primary">{nft.power}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
