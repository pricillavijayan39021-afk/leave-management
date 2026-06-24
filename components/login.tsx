"use client"

import { useState } from "react"
import { AlertCircle, CalendarCheck, LogIn } from "lucide-react"
import { DEMO_CREDENTIALS } from "@/lib/auth"

const fieldBase =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"

export function Login({
  onLogin,
}: {
  onLogin: (email: string, password: string) => boolean
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const ok = onLogin(email, password)
    if (!ok) setError("Invalid email or password. Try a demo account below.")
  }

  function quickFill(demoEmail: string, demoPassword: string) {
    setEmail(demoEmail)
    setPassword(demoPassword)
    setError("")
  }

  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <CalendarCheck className="size-7" aria-hidden="true" />
          </span>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
            LeaveHub
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to manage your leave
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-card-foreground"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError("")
              }}
              placeholder="you@leavehub.com"
              className={fieldBase}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-card-foreground"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError("")
              }}
              placeholder="••••••••"
              className={fieldBase}
            />
          </div>

          {error ? (
            <p
              role="alert"
              className="flex items-center gap-1.5 text-sm text-destructive"
            >
              <AlertCircle className="size-4" aria-hidden="true" />
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90"
          >
            <LogIn className="size-4" aria-hidden="true" />
            Sign in
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-dashed border-border bg-secondary/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Demo accounts
          </p>
          <ul className="mt-3 space-y-2">
            {DEMO_CREDENTIALS.map((c) => (
              <li key={c.email}>
                <button
                  type="button"
                  onClick={() => quickFill(c.email, c.password)}
                  className="flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2 text-left text-sm transition-colors hover:bg-secondary/60"
                >
                  <span>
                    <span className="font-medium text-card-foreground">
                      {c.role}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {c.email} · {c.password}
                    </span>
                  </span>
                  <span className="text-xs font-medium text-primary">
                    Use
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
