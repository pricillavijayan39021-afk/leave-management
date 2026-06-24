"use client"

import { useMemo, useState } from "react"
import { Dashboard } from "@/components/dashboard"
import { SearchFilter } from "@/components/search-filter"
import { LeaveTable } from "@/components/leave-table"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { useLeaveRequests } from "@/hooks/use-leave-requests"
import type { LeaveRequest, LeaveStatus } from "@/lib/leave-types"

export function HrView() {
  const { requests, loaded, updateStatus } = useLeaveRequests()
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<"All" | LeaveStatus>("All")
  const [pending, setPending] = useState<{
    request: LeaveRequest
    nextStatus: LeaveStatus
  } | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return requests
      .filter((r) => (status === "All" ? true : r.status === status))
      .filter((r) =>
        q === ""
          ? true
          : r.employeeName.toLowerCase().includes(q) ||
            r.employeeId.toLowerCase().includes(q),
      )
  }, [requests, query, status])

  function requestAction(request: LeaveRequest, nextStatus: LeaveStatus) {
    setPending({ request, nextStatus })
  }

  function confirmAction() {
    if (pending) {
      updateStatus(pending.request.id, pending.nextStatus)
      setPending(null)
    }
  }

  return (
    <div className="mt-8 space-y-8">
      <Dashboard requests={requests} />

      <section aria-label="Leave requests" className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground">
            All Requests
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              {filtered.length}
            </span>
          </h2>
        </div>
        <SearchFilter
          query={query}
          onQueryChange={setQuery}
          status={status}
          onStatusChange={setStatus}
        />
        {loaded ? (
          <LeaveTable requests={filtered} onAction={requestAction} />
        ) : (
          <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
            Loading requests…
          </div>
        )}
      </section>

      <ConfirmDialog
        open={pending !== null}
        title={
          pending?.nextStatus === "Approved"
            ? "Approve leave request?"
            : "Reject leave request?"
        }
        description={
          pending
            ? `You are about to mark ${pending.request.employeeName}'s ${pending.request.leaveType.toLowerCase()} leave as ${pending.nextStatus.toLowerCase()}.`
            : ""
        }
        confirmLabel={pending?.nextStatus === "Approved" ? "Approve" : "Reject"}
        tone={pending?.nextStatus === "Approved" ? "emerald" : "rose"}
        onConfirm={confirmAction}
        onCancel={() => setPending(null)}
      />
    </div>
  )
}
