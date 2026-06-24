export type LeaveStatus = "Pending" | "Approved" | "Rejected"

export type LeaveType = "Casual" | "Sick" | "Earned"

export interface LeaveRequest {
  id: string
  employeeName: string
  employeeId: string
  leaveType: LeaveType
  startDate: string
  endDate: string
  reason: string
  status: LeaveStatus
  createdAt: number
}

export const LEAVE_TYPES: LeaveType[] = ["Casual", "Sick", "Earned"]

export const STATUS_FILTERS: ("All" | LeaveStatus)[] = [
  "All",
  "Pending",
  "Approved",
  "Rejected",
]

export function durationInDays(startDate: string, endDate: string): number {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diff = end.getTime() - start.getTime()
  if (Number.isNaN(diff) || diff < 0) return 0
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1
}
