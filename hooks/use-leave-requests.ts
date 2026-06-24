"use client"

import { useCallback, useEffect, useState } from "react"
import type { LeaveRequest, LeaveStatus } from "@/lib/leave-types"

const STORAGE_KEY = "leavehub.requests.v1"

const SEED: LeaveRequest[] = [
  {
    id: "seed-1",
    employeeName: "Ava Mitchell",
    employeeId: "EMP-1042",
    leaveType: "Earned",
    startDate: "2026-07-06",
    endDate: "2026-07-10",
    reason: "Family vacation to the coast.",
    status: "Approved",
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
  },
  {
    id: "seed-2",
    employeeName: "Noah Bennett",
    employeeId: "EMP-2087",
    leaveType: "Sick",
    startDate: "2026-06-25",
    endDate: "2026-06-26",
    reason: "Recovering from a fever.",
    status: "Pending",
    createdAt: Date.now() - 1000 * 60 * 60 * 6,
  },
  {
    id: "seed-3",
    employeeName: "Mia Carter",
    employeeId: "EMP-3310",
    leaveType: "Casual",
    startDate: "2026-07-01",
    endDate: "2026-07-01",
    reason: "Personal errands.",
    status: "Rejected",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
]

export function useLeaveRequests() {
  const [requests, setRequests] = useState<LeaveRequest[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setRequests(JSON.parse(raw) as LeaveRequest[])
      } else {
        setRequests(SEED)
      }
    } catch {
      setRequests(SEED)
    } finally {
      setLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
    } catch {
      // ignore write errors (e.g. storage full / disabled)
    }
  }, [requests, loaded])

  const addRequest = useCallback(
    (data: Omit<LeaveRequest, "id" | "status" | "createdAt">) => {
      const newRequest: LeaveRequest = {
        ...data,
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        status: "Pending",
        createdAt: Date.now(),
      }
      setRequests((prev) => [newRequest, ...prev])
    },
    [],
  )

  const updateStatus = useCallback((id: string, status: LeaveStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r)),
    )
  }, [])

  return { requests, loaded, addRequest, updateStatus }
}
