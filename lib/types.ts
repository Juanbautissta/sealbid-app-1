export interface Bid {
  id: string
  bidder: string
  hash: string
  status: "hidden" | "revealed"
  amount: number | null
}
