"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Eye } from "lucide-react"

interface RevealFormProps {
  onReveal: (bidder: string, amount: string, salt: string) => void
  onBack: () => void
  onClearMessage: () => void
}

export function RevealForm({ onReveal, onBack, onClearMessage }: RevealFormProps) {
  const [bidder, setBidder] = useState("")
  const [amount, setAmount] = useState("")
  const [salt, setSalt] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!bidder.trim() || !amount.trim() || !salt.trim()) return
    onReveal(bidder.trim(), amount.trim(), salt.trim())
    setBidder("")
    setAmount("")
    setSalt("")
  }

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Reveal Your Bid</CardTitle>
        <CardDescription>
          Enter the same values you used during commit to reveal your bid.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reveal-bidder">Bidder Name</Label>
            <Input
              id="reveal-bidder"
              placeholder="Enter your name or identifier"
              value={bidder}
              onChange={(e) => {
                setBidder(e.target.value)
                onClearMessage()
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reveal-amount">Bid Amount ($)</Label>
            <Input
              id="reveal-amount"
              type="number"
              placeholder="Enter the same bid amount"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
                onClearMessage()
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reveal-salt">Secret Salt</Label>
            <Input
              id="reveal-salt"
              type="password"
              placeholder="Enter your secret phrase"
              value={salt}
              onChange={(e) => {
                setSalt(e.target.value)
                onClearMessage()
              }}
            />
          </div>
          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Commit
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={!bidder.trim() || !amount.trim() || !salt.trim()}
            >
              <Eye className="mr-2 h-4 w-4" />
              Reveal Bid
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
