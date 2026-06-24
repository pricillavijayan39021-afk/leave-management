"use client"

import { useMemo } from "react"
import { Dashboard } from "@/components/dashboard"
import { LeaveForm } from "@/components/leave-form"
import { LeaveTable } from "@/components/leave-table"
import { useLeaveRequests } from "@/hooks/use-leave-requests"
import type { SessionUser } from "@/lib/auth"
import type { LeaveRequest, LeaveStatus } from "@/lib/leave-types"

export function EmployeeView({ user }: { user: SessionUser }) {
  const { requests, loaded, addRequest } = useLeaveRequests()

  const myRequests = useMemo(
    () => requests.filter((r) => r.employeeId === user.employeeId),
    [requests, user.employeeId],
  )

  // Employees cannot change status, so this is a no-op safety stub.
  function noop(_r: LeaveRequest, _s: LeaveStatus) {}

  return (
    <div className="mt-8 space-y-8">
      <Dashboard requests={myRequests} />

      <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
        <div className="lg:sticky lg:top-8 lg:self-start">
          <LeaveForm
            onSubmit={addRequest}
            lockedEmployee={{ name: user.name, employeeId: user.employeeId }}
          />
        </div>

        <section aria-label="My leave requests" className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            My Requests
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              {myRequests.length}
            </span>
          </h2>
          {loaded ? (
            <LeaveTable requests={myRequests} onAction={noop} readOnly />
          ) : (
            <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
              Loading requests…
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
