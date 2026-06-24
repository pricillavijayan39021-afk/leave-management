"use client"

import { Search } from "lucide-react"
import { STATUS_FILTERS, type LeaveStatus } from "@/lib/leave-types"

export function SearchFilter({
  query,
  onQueryChange,
  status,
  onStatusChange,
}: {
  query: string
  onQueryChange: (value: string) => void
  status: "All" | LeaveStatus
  onStatusChange: (value: "All" | LeaveStatus) => void
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by name or employee ID..."
          aria-label="Search leave requests"
          className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground shadow-sm outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
      </div>
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as "All" | LeaveStatus)}
        aria-label="Filter by status"
        className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-all duration-200 focus:border-ring focus:ring-2 focus:ring-ring/30 sm:w-44"
      >
        {STATUS_FILTERS.map((s) => (
          <option key={s} value={s}>
            {s === "All" ? "All statuses" : s}
          </option>
        ))}
      </select>
    </div>
  )
}
