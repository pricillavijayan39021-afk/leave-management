import { CheckCircle2, Clock, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LeaveStatus } from "@/lib/leave-types"

const STYLES: Record<
  LeaveStatus,
  { label: string; className: string; Icon: typeof Clock }
> = {
  Pending: {
    label: "Pending",
    className: "bg-amber-100 text-amber-800 ring-amber-600/20",
    Icon: Clock,
  },
  Approved: {
    label: "Approved",
    className: "bg-emerald-100 text-emerald-800 ring-emerald-600/20",
    Icon: CheckCircle2,
  },
  Rejected: {
    label: "Rejected",
    className: "bg-rose-100 text-rose-800 ring-rose-600/20",
    Icon: XCircle,
  },
}

export function StatusBadge({ status }: { status: LeaveStatus }) {
  const { label, className, Icon } = STYLES[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  )
}
