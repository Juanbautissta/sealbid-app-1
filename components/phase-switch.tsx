"use client"

import { cn } from "@/lib/utils"

interface PhaseSwitchProps {
  phase: "commit" | "reveal"
  onPhaseChange: (phase: "commit" | "reveal") => void
}

export function PhaseSwitch({ phase, onPhaseChange }: PhaseSwitchProps) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex rounded-lg border border-border bg-muted/30 p-1">
        <button
          onClick={() => onPhaseChange("commit")}
          className={cn(
            "rounded-md px-6 py-2 text-sm font-medium transition-all",
            phase === "commit"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Commit
        </button>
        <button
          onClick={() => onPhaseChange("reveal")}
          className={cn(
            "rounded-md px-6 py-2 text-sm font-medium transition-all",
            phase === "reveal"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Reveal
        </button>
      </div>
    </div>
  )
}
