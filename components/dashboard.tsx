import {
  CheckCircle2,
  Clock,
  Layers,
  XCircle,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { LeaveRequest } from "@/lib/leave-types"

interface MetricCard {
  label: string
  value: number
  Icon: LucideIcon
  iconWrap: string
  accent: string
}

export function Dashboard({ requests }: { requests: LeaveRequest[] }) {
  const total = requests.length
  const approved = requests.filter((r) => r.status === "Approved").length
  const pending = requests.filter((r) => r.status === "Pending").length
  const rejected = requests.filter((r) => r.status === "Rejected").length

  const cards: MetricCard[] = [
    {
      label: "Total Requests",
      value: total,
      Icon: Layers,
      iconWrap: "bg-primary/10 text-primary",
      accent: "from-primary/10",
    },
    {
      label: "Approved",
      value: approved,
      Icon: CheckCircle2,
      iconWrap: "bg-emerald-100 text-emerald-700",
      accent: "from-emerald-100/60",
    },
    {
      label: "Pending",
      value: pending,
      Icon: Clock,
      iconWrap: "bg-amber-100 text-amber-700",
      accent: "from-amber-100/60",
    },
    {
      label: "Rejected",
      value: rejected,
      Icon: XCircle,
      iconWrap: "bg-rose-100 text-rose-700",
      accent: "from-rose-100/60",
    },
  ]

  return (
    <section aria-label="Leave metrics overview">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map(({ label, value, Icon, iconWrap, accent }) => (
          <div
            key={label}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
            )}
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                accent,
              )}
              aria-hidden="true"
            />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {label}
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-card-foreground">
                  {value}
                </p>
              </div>
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                  iconWrap,
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
