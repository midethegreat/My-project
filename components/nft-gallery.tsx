"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

interface NFTData {
  id: number
  name: string
  rarity: string
  power: number
  image: string
  bgColor: string
  floorPrice: number
  owner: string
  description: string
  tokenValue: number
  isGenerating?: boolean
}

export function NFTGallery() {
  const [selectedNFT, setSelectedNFT] = useState<NFTData | null>(null)
  const [showConvertModal, setShowConvertModal] = useState(false)
  const [showListModal, setShowListModal] = useState(false)
  const [listPrice, setListPrice] = useState("")
  const [convertAmount, setConvertAmount] = useState("")
  const [nfts, setNfts] = useState<NFTData[]>([
    {
      id: 1,
      name: "Legendary Warrior",
      rarity: "Legendary",
      power: 9800,
      image: "/legendary-warrior-fantasy-game-character-epic.jpg",
      bgColor: "from-yellow-500 to-orange-500",
      floorPrice: 150.5,
      owner: "0x1234...5678",
      description: "A mythical warrior with unmatched strength and combat abilities.",
      tokenValue: 500,
    },
    {
      id: 2,
      name: "Shadow Assassin",
      rarity: "Epic",
      power: 7200,
      image: "/shadow-assassin-dark-fantasy-character.jpg",
      bgColor: "from-purple-500 to-pink-500",
      floorPrice: 89.2,
      owner: "0x1234...5678",
      description: "Swift and deadly, master of stealth and precision strikes.",
      tokenValue: 300,
    },
    {
      id: 3,
      name: "Ice Mage",
      rarity: "Epic",
      power: 6800,
      image: "/ice-mage-blue-magic-fantasy-wizard.jpg",
      bgColor: "from-blue-500 to-cyan-500",
      floorPrice: 75.0,
      owner: "0x1234...5678",
      description: "Commands the power of winter with devastating frost spells.",
      tokenValue: 250,
    },
    {
      id: 4,
      name: "Fire Phoenix",
      rarity: "Rare",
      power: 5400,
      image: "/fire-phoenix-red-mythical-creature-flames.jpg",
      bgColor: "from-red-500 to-yellow-500",
      floorPrice: 45.8,
      owner: "0x1234...5678",
      description: "Reborn from flames, bringing heat and destruction.",
      tokenValue: 180,
    },
    {
      id: 5,
      name: "Forest Guardian",
      rarity: "Rare",
      power: 5100,
      image: "/forest-guardian-green-nature-fantasy-protector.jpg",
      bgColor: "from-green-500 to-emerald-500",
      floorPrice: 38.2,
      owner: "0x1234...5678",
      description: "Protector of nature, grows stronger in harmony with the earth.",
      tokenValue: 160,
    },
    {
      id: 6,
      name: "Ancient Golem",
      rarity: "Uncommon",
      power: 3900,
      image: "/ancient-golem-stone-creature-gray-fantasy.jpg",
      bgColor: "from-gray-500 to-slate-500",
      floorPrice: 22.5,
      owner: "0x1234...5678",
      description: "An ancient construct of immense durability and resilience.",
      tokenValue: 100,
    },
  ])

  const rarityColors = {
    Legendary: "text-yellow-400 border-yellow-400/50 bg-yellow-400/10",
    Epic: "text-purple-400 border-purple-400/50 bg-purple-400/10",
    Rare: "text-blue-400 border-blue-400/50 bg-blue-400/10",
    Uncommon: "text-green-400 border-green-400/50 bg-green-400/10",
  }

  const handleSell = (nft: NFTData) => {
    setSelectedNFT(nft)
    setShowListModal(true)
  }

  const handleConfirmList = () => {
    const price = parseFloat(listPrice)
    if (price > 0 && selectedNFT) {
      alert(`${selectedNFT.name} listed for ₦${price}`)
      setListPrice("")
      setShowListModal(false)
      setSelectedNFT(null)
    }
  }

  const handleConvert = (nft: NFTData) => {
    setSelectedNFT(nft)
    setShowConvertModal(true)
  }

  const handleConfirmConvert = () => {
    const amount = parseFloat(convertAmount)
    if (amount > 0 && selectedNFT) {
      const tokens = Math.floor((amount / 100) * selectedNFT.tokenValue)
      alert(`${selectedNFT.name} converted to ${tokens} OPT tokens!`)
      setConvertAmount("")
      setShowConvertModal(false)
      setSelectedNFT(null)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Your NFT Collection</h2>
        <p className="text-xs sm:text-sm text-muted-foreground bg-card/50 px-3 py-1 rounded-lg border border-border/50 whitespace-nowrap">
          {nfts.length} Assets
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {nfts.map((nft) => (
          <Card
            key={nft.id}
            onClick={() => setSelectedNFT(nft)}
            className="p-3 sm:p-4 md:p-6 border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group relative"
          >
            <div className="relative z-10 space-y-3 sm:space-y-4 h-full flex flex-col">
              <div className="relative w-full h-32 sm:h-40 md:h-48 rounded-lg bg-gradient-to-br overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img
                  src={nft.image || "/placeholder.svg"}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 flex-grow">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground text-center line-clamp-2">{nft.name}</h3>
                <div className="flex justify-center">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-md border ${
                      rarityColors[nft.rarity as keyof typeof rarityColors]
                    }`}
                  >
                    {nft.rarity}
                  </span>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-border/50">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Power</p>
                    <p className="text-base sm:text-lg md:text-xl font-bold text-primary">{nft.power}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Floor</p>
                    <p className="text-base sm:text-lg md:text-xl font-bold text-green-400">₦{nft.floorPrice}</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={(e) => { e.stopPropagation(); setSelectedNFT(nft) }}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm mt-4 py-3"
              >
                <i className="fas fa-expand mr-2" />
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {selectedNFT && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
          <Card className="w-full max-w-2xl p-4 sm:p-6 md:p-8 border-border/50 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4 sm:mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground line-clamp-2">{selectedNFT.name}</h2>
              <button
                onClick={() => setSelectedNFT(null)}
                className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-card rounded flex-shrink-0"
              >
                <i className="fas fa-xmark text-lg sm:text-xl" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 order-2 sm:order-1">
                <div className="flex items-center justify-center w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br overflow-hidden shadow-lg">
                  <img
                    src={selectedNFT.image || "/placeholder.svg"}
                    alt={selectedNFT.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Token ID</p>
                  <p className="text-xs sm:text-sm font-mono text-foreground font-bold">#{selectedNFT.id}</p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6 order-1 sm:order-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Description</p>
                  <p className="text-xs sm:text-sm text-foreground/80">{selectedNFT.description}</p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Rarity</p>
                    <span
                      className={`inline-block text-xs font-bold px-3 py-2 rounded-md border ${
                        rarityColors[selectedNFT.rarity as keyof typeof rarityColors]
                      }`}
                    >
                      {selectedNFT.rarity}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Power Level</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">{selectedNFT.power}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Floor Price</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">₦{selectedNFT.floorPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Token Value</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">{selectedNFT.tokenValue} OPT</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Current Owner</p>
                    <p className="text-xs sm:text-sm font-mono text-foreground/80 break-all">{selectedNFT.owner}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-6 border-t border-border/50">
                  <Button
                    onClick={() => handleSell(selectedNFT)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm py-3"
                  >
                    <i className="fas fa-tag mr-2" />
                    List for Sale
                  </Button>
                  <Button
                    onClick={() => handleConvert(selectedNFT)}
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-sm py-3"
                  >
                    <i className="fas fa-coins mr-2" />
                    Convert to Tokens
                  </Button>
                  <Button
                    onClick={() => setSelectedNFT(null)}
                    variant="outline"
                    className="w-full border-border hover:bg-card/50 text-sm py-3"
                  >
                    <i className="fas fa-times mr-2" />
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {showListModal && selectedNFT && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md p-6 border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <i className="fas fa-tag text-primary text-xl" />
              </div>
              List for Sale
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">NFT: {selectedNFT.name}</p>
                <p className="text-sm font-bold text-foreground">{selectedNFT.rarity}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-2">Listing Price (₦)</label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={listPrice}
                  onChange={(e) => setListPrice(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleConfirmList}
                  disabled={!listPrice}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <i className="fas fa-check mr-2" />
                  List
                </Button>
                <Button
                  onClick={() => { setShowListModal(false); setListPrice("") }}
                  variant="outline"
                  className="flex-1 border-border"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {showConvertModal && selectedNFT && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md p-6 border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <i className="fas fa-coins text-secondary text-xl" />
              </div>
              Convert to Tokens
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">NFT: {selectedNFT.name}</p>
                <p className="text-sm font-bold text-foreground">{selectedNFT.rarity}</p>
              </div>
              <div className="bg-card/50 border border-border/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Base Token Value</p>
                <p className="text-lg font-bold text-primary">{selectedNFT.tokenValue} OPT</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-2">Percentage to Convert (%)</label>
                <input
                  type="number"
                  placeholder="Enter percentage (0-100)"
                  value={convertAmount}
                  onChange={(e) => setConvertAmount(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  min="0"
                  max="100"
                  step="1"
                />
              </div>
              {convertAmount && (
                <div className="bg-secondary/10 border border-secondary/50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">You will receive</p>
                  <p className="text-lg font-bold text-secondary">
                    {Math.floor((parseFloat(convertAmount) / 100) * selectedNFT.tokenValue)} OPT
                  </p>
                </div>
              )}
              <div className="flex gap-3">
                <Button
                  onClick={handleConfirmConvert}
                  disabled={!convertAmount}
                  className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  <i className="fas fa-check mr-2" />
                  Convert
                </Button>
                <Button
                  onClick={() => { setShowConvertModal(false); setConvertAmount("") }}
                  variant="outline"
                  className="flex-1 border-border"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
