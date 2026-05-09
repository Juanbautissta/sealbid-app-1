import { Lock } from "lucide-react"

export function Header() {
  return (
    <header className="text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
        <Lock className="h-3 w-3" />
        Commit-Reveal Protocol
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        SealBid
      </h1>
      <p className="mt-3 text-lg text-muted-foreground text-balance">
        Private bidding with cryptographic commitments.
        <br className="hidden sm:inline" />
        Submit sealed bids, then reveal them fairly.
      </p>
    </header>
  )
}
