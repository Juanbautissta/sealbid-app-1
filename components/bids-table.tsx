"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Inbox } from "lucide-react"
import type { Bid } from "@/lib/types"

interface BidsTableProps {
  bids: Bid[]
}

export function BidsTable({ bids }: BidsTableProps) {
  if (bids.length === 0) {
    return (
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Submitted Bids</CardTitle>
          <CardDescription>All bids will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3">
              <Inbox className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm font-medium text-foreground">No bids yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Submit your first sealed bid to get started.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Submitted Bids</CardTitle>
        <CardDescription>
          {bids.length} bid{bids.length !== 1 && "s"} submitted • {bids.filter(b => b.status === "revealed").length} revealed
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="pl-6">Bidder</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Hash</TableHead>
              <TableHead className="pr-6 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bids.map((bid) => (
              <TableRow key={bid.id} className="border-border">
                <TableCell className="pl-6 font-medium">{bid.bidder}</TableCell>
                <TableCell>
                  {bid.status === "hidden" ? (
                    <Badge variant="secondary" className="gap-1">
                      <EyeOff className="h-3 w-3" />
                      Hidden
                    </Badge>
                  ) : (
                    <Badge className="gap-1 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">
                      <Eye className="h-3 w-3" />
                      Revealed
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <code className="rounded bg-muted px-2 py-1 text-xs font-mono text-muted-foreground">
                    {bid.hash}
                  </code>
                </TableCell>
                <TableCell className="pr-6 text-right">
                  {bid.status === "revealed" && bid.amount !== null ? (
                    <span className="font-medium text-emerald-400">
                      ${bid.amount.toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
