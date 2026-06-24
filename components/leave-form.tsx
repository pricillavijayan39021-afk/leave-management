"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle2, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  LEAVE_TYPES,
  type LeaveRequest,
  type LeaveType,
} from "@/lib/leave-types"

type FormState = {
  employeeName: string
  employeeId: string
  leaveType: LeaveType
  startDate: string
  endDate: string
  reason: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const EMPTY: FormState = {
  employeeName: "",
  employeeId: "",
  leaveType: "Casual",
  startDate: "",
  endDate: "",
  reason: "",
}

const fieldBase =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"

export function LeaveForm({
  onSubmit,
  lockedEmployee,
}: {
  onSubmit: (data: Omit<LeaveRequest, "id" | "status" | "createdAt">) => void
  lockedEmployee?: { name: string; employeeId: string }
}) {
  const initial: FormState = lockedEmployee
    ? { ...EMPTY, employeeName: lockedEmployee.name, employeeId: lockedEmployee.employeeId }
    : EMPTY
  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<FormErrors>({})
  const [success, setSuccess] = useState(false)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
    setSuccess(false)
  }

  function validate(state: FormState): FormErrors {
    const next: FormErrors = {}
    if (!state.employeeName.trim())
      next.employeeName = "Employee name is required."
    if (!state.employeeId.trim()) next.employeeId = "Employee ID is required."
    if (!state.startDate) next.startDate = "Start date is required."
    if (!state.endDate) next.endDate = "End date is required."
    if (!state.reason.trim()) next.reason = "Please provide a reason."
    if (
      state.startDate &&
      state.endDate &&
      new Date(state.endDate) < new Date(state.startDate)
    ) {
      next.endDate = "End date cannot be before the start date."
    }
    return next
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSuccess(false)
      return
    }
    onSubmit({
      employeeName: form.employeeName.trim(),
      employeeId: form.employeeId.trim(),
      leaveType: form.leaveType,
      startDate: form.startDate,
      endDate: form.endDate,
      reason: form.reason.trim(),
    })
    setForm(initial)
    setErrors({})
    setSuccess(true)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-card-foreground">
        Apply for Leave
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Fill in the details below to submit a new leave request.
      </p>

      {success && (
        <div
          role="status"
          className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-800 ring-1 ring-inset ring-emerald-600/20"
        >
          <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
          Leave request submitted successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Employee Name" error={errors.employeeName} id="name">
            <input
              id="name"
              type="text"
              value={form.employeeName}
              onChange={(e) => update("employeeName", e.target.value)}
              placeholder="Jane Doe"
              readOnly={Boolean(lockedEmployee)}
              className={cn(
                fieldBase,
                errors.employeeName && errorRing,
                lockedEmployee && "cursor-not-allowed bg-secondary/60 text-muted-foreground",
              )}
            />
          </Field>
          <Field label="Employee ID" error={errors.employeeId} id="empId">
            <input
              id="empId"
              type="text"
              value={form.employeeId}
              onChange={(e) => update("employeeId", e.target.value)}
              placeholder="EMP-1001"
              readOnly={Boolean(lockedEmployee)}
              className={cn(
                fieldBase,
                errors.employeeId && errorRing,
                lockedEmployee && "cursor-not-allowed bg-secondary/60 text-muted-foreground",
              )}
            />
          </Field>
        </div>

        <Field label="Leave Type" id="type">
          <select
            id="type"
            value={form.leaveType}
            onChange={(e) => update("leaveType", e.target.value as LeaveType)}
            className={fieldBase}
          >
            {LEAVE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Start Date" error={errors.startDate} id="start">
            <input
              id="start"
              type="date"
              value={form.startDate}
              onChange={(e) => update("startDate", e.target.value)}
              className={cn(fieldBase, errors.startDate && errorRing)}
            />
          </Field>
          <Field label="End Date" error={errors.endDate} id="end">
            <input
              id="end"
              type="date"
              value={form.endDate}
              onChange={(e) => update("endDate", e.target.value)}
              className={cn(fieldBase, errors.endDate && errorRing)}
            />
          </Field>
        </div>

        <Field label="Reason" error={errors.reason} id="reason">
          <textarea
            id="reason"
            value={form.reason}
            onChange={(e) => update("reason", e.target.value)}
            placeholder="Briefly describe the reason for your leave..."
            rows={3}
            className={cn(fieldBase, "resize-none", errors.reason && errorRing)}
          />
        </Field>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:opacity-90 active:scale-[0.99]"
        >
          <Send className="size-4" aria-hidden="true" />
          Submit Request
        </button>
      </form>
    </div>
  )
}

const errorRing = "border-destructive focus:border-destructive focus:ring-destructive/30"

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string
  id: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-card-foreground"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}
