"use client"

import { CalendarCheck, LogOut } from "lucide-react"
import type { SessionUser } from "@/lib/auth"

export function AppHeader({
  user,
  onLogout,
}: {
  user: SessionUser
  onLogout: () => void
}) {
  const roleLabel = user.role === "hr" ? "HR Manager" : "Employee"

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <CalendarCheck className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            LeaveHub
          </h1>
          <p className="text-sm text-muted-foreground">
            {user.role === "hr" ? "Leave Administration" : "My Leave"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">{user.name}</p>
          <p className="text-xs text-muted-foreground">
            {roleLabel} · {user.employeeId}
          </p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-card-foreground shadow-sm transition-colors hover:bg-secondary/60"
        >
          <LogOut className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </header>
  )
}
