"use client"

import { Calendar, Check, Inbox, X } from "lucide-react"
import { StatusBadge } from "@/components/status-badge"
import { durationInDays, type LeaveRequest, type LeaveStatus } from "@/lib/leave-types"

function formatRange(start: string, end: string) {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }
  const s = new Date(start).toLocaleDateString(undefined, opts)
  const e = new Date(end).toLocaleDateString(undefined, opts)
  const days = durationInDays(start, end)
  const label = start === end ? s : `${s} – ${e}`
  return { label, days }
}

function Actions({
  request,
  onAction,
}: {
  request: LeaveRequest
  onAction: (request: LeaveRequest, status: LeaveStatus) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onAction(request, "Approved")}
        disabled={request.status === "Approved"}
        className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Check className="size-3.5" aria-hidden="true" />
        Approve
      </button>
      <button
        type="button"
        onClick={() => onAction(request, "Rejected")}
        disabled={request.status === "Rejected"}
        className="inline-flex items-center gap-1 rounded-md bg-rose-600 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <X className="size-3.5" aria-hidden="true" />
        Reject
      </button>
    </div>
  )
}

export function LeaveTable({
  requests,
  onAction,
  readOnly = false,
}: {
  requests: LeaveRequest[]
  onAction: (request: LeaveRequest, status: LeaveStatus) => void
  readOnly?: boolean
}) {
  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-muted-foreground">
          <Inbox className="size-7" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-base font-semibold text-card-foreground">
          No leave requests found
        </h3>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          Try adjusting your search or filters, or submit a new leave request to
          get started.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">Employee</th>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium">Duration</th>
              <th className="px-5 py-3 font-medium">Reason</th>
              <th className="px-5 py-3 font-medium">Status</th>
              {!readOnly && (
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {requests.map((r) => {
              const { label, days } = formatRange(r.startDate, r.endDate)
              return (
                <tr
                  key={r.id}
                  className="transition-colors hover:bg-secondary/40"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-card-foreground">
                      {r.employeeName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {r.employeeId}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-card-foreground">
                    {r.leaveType}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-card-foreground">
                      <Calendar
                        className="size-3.5 text-muted-foreground"
                        aria-hidden="true"
                      />
                      {label}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {days} {days === 1 ? "day" : "days"}
                    </p>
                  </td>
                  <td className="max-w-xs px-5 py-4">
                    <p className="truncate text-muted-foreground" title={r.reason}>
                      {r.reason}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={r.status} />
                  </td>
                  {!readOnly && (
                    <td className="px-5 py-4">
                      <div className="flex justify-end">
                        <Actions request={r} onAction={onAction} />
                      </div>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {requests.map((r) => {
          const { label, days } = formatRange(r.startDate, r.endDate)
          return (
            <div
              key={r.id}
              className="rounded-2xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-card-foreground">
                    {r.employeeName}
                  </p>
                  <p className="text-xs text-muted-foreground">{r.employeeId}</p>
                </div>
                <StatusBadge status={r.status} />
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Type</dt>
                  <dd className="text-card-foreground">{r.leaveType}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Duration</dt>
                  <dd className="text-card-foreground">
                    {label}{" "}
                    <span className="text-muted-foreground">
                      ({days} {days === 1 ? "day" : "days"})
                    </span>
                  </dd>
                </div>
              </dl>
              <div className="mt-3">
                <dt className="text-xs text-muted-foreground">Reason</dt>
                <dd className="text-sm text-card-foreground">{r.reason}</dd>
              </div>
              {!readOnly && (
                <div className="mt-4">
                  <Actions request={r} onAction={onAction} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
