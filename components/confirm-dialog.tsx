"use client"

import { useEffect } from "react"
import { cn } from "@/lib/utils"

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  tone = "primary",
  onConfirm,
  onCancel,
}: {
  open: boolean
  title: string
  description: string
  confirmLabel: string
  tone?: "primary" | "emerald" | "rose"
  onConfirm: () => void
  onCancel: () => void
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel()
    }
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onCancel])

  if (!open) return null

  const confirmTone = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    emerald: "bg-emerald-600 text-white hover:bg-emerald-700",
    rose: "bg-rose-600 text-white hover:bg-rose-700",
  }[tone]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-in fade-in"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl animate-in fade-in zoom-in-95">
        <h3
          id="confirm-title"
          className="text-base font-semibold text-card-foreground"
        >
          {title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-all active:scale-[0.98]",
              confirmTone,
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
