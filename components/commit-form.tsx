"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send } from "lucide-react"

interface CommitFormProps {
  onCommit: (bidder: string, amount: string, salt: string) => void
  onClearMessage: () => void
}

export function CommitForm({ onCommit, onClearMessage }: CommitFormProps) {
  const [bidder, setBidder] = useState("")
  const [amount, setAmount] = useState("")
  const [salt, setSalt] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!bidder.trim() || !amount.trim() || !salt.trim()) return
    onCommit(bidder.trim(), amount.trim(), salt.trim())
    setBidder("")
    setAmount("")
    setSalt("")
  }

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Submit a Sealed Bid</CardTitle>
        <CardDescription>
          Your bid will be hashed and hidden until the reveal phase.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bidder">Bidder Name</Label>
            <Input
              id="bidder"
              placeholder="Enter your name or identifier"
              value={bidder}
              onChange={(e) => {
                setBidder(e.target.value)
                onClearMessage()
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Bid Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter bid amount"
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
            <Label htmlFor="salt">Secret Salt</Label>
            <Input
              id="salt"
              type="password"
              placeholder="Enter a secret phrase"
              value={salt}
              onChange={(e) => {
                setSalt(e.target.value)
                onClearMessage()
              }}
            />
            <p className="text-xs text-muted-foreground">
              Remember this salt—you&apos;ll need it to reveal your bid.
            </p>
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={!bidder.trim() || !amount.trim() || !salt.trim()}
          >
            <Send className="mr-2 h-4 w-4" />
            Submit Bid
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
