"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { PhaseSwitch } from "@/components/phase-switch"
import { CommitForm } from "@/components/commit-form"
import { RevealForm } from "@/components/reveal-form"
import { BidsTable } from "@/components/bids-table"
import type { Bid } from "@/lib/types"

async function createCommitment(bidder: string, amount: string, salt: string) { 
  const data = new TextEncoder().encode(`${bidder}:${amount}:${salt}`) 
  const digest = await crypto.subtle.digest("SHA-256", data)

  return Array.from(new Uint8Array(digest)) .map((byte) => byte.toString(16).padStart(2, "0")) 
  .join("") 
}


export default function SealBidPage() {
  const [phase, setPhase] = useState<"commit" | "reveal">("commit")
  const [bids, setBids] = useState<Bid[]>([])
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleCommit = async (bidder: string, amount: string, salt: string) => {
    // Generate a simple hash for demo purposes
    const hash = await createCommitment(bidder, amount, salt)
    
    const existingBid = bids.find((b) => b.bidder === bidder)
    if (existingBid) {
      setMessage({ type: "error", text: `Bidder "${bidder}" has already committed a bid.` })
      return
    }

    const newBid: Bid = {
      id: crypto.randomUUID(),
      bidder,
      hash,
      status: "hidden",
      amount: null,
    }

    setBids((prev) => [...prev, newBid])
    setMessage({ type: "success", text: `Bid committed successfully for ${bidder}.` })
  }

  const handleReveal = async (bidder: string, amount: string, salt: string) => {
    const expectedHash = await createCommitment(bidder, amount, salt)
    const bid = bids.find((b) => b.bidder === bidder)

    if (!bid) {
      setMessage({ type: "error", text: `No committed bid found for "${bidder}".` })
      return
    }

    if (bid.status === "revealed") {
      setMessage({ type: "error", text: `Bid for "${bidder}" has already been revealed.` })
      return
    }

    if (bid.hash !== expectedHash) {
      setMessage({ type: "error", text: "Invalid reveal: hash mismatch. Check your bid amount and salt." })
      return
    }

    setBids((prev) =>
      prev.map((b) =>
        b.id === bid.id ? { ...b, status: "revealed" as const, amount: parseFloat(amount) } : b
      )
    )
    setMessage({ type: "success", text: `Bid revealed successfully for ${bidder}: $${amount}` })
  }

  const clearMessage = () => setMessage(null)

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Header />
        
        <div className="mt-10">
          <PhaseSwitch phase={phase} onPhaseChange={setPhase} />
        </div>

        <div className="mt-8">
          {phase === "commit" ? (
            <CommitForm onCommit={handleCommit} onClearMessage={clearMessage} />
          ) : (
            <RevealForm 
              onReveal={handleReveal} 
              onBack={() => setPhase("commit")} 
              onClearMessage={clearMessage}
            />
          )}
        </div>

        {message && (
          <div
            className={`mt-6 rounded-lg border px-4 py-3 text-sm ${
              message.type === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-destructive/30 bg-destructive/10 text-destructive"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mt-12">
          <BidsTable bids={bids} />
        </div>
      </div>
    </main>
  )
}
