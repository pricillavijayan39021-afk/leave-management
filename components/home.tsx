"use client"

import { useAuth } from "@/hooks/use-auth"
import { Login } from "@/components/login"
import { AppHeader } from "@/components/app-header"
import { EmployeeView } from "@/components/employee-view"
import { HrView } from "@/components/hr-view"

export function Home() {
  const { user, loaded, login, logout } = useAuth()

  if (!loaded) {
    return (
      <main className="flex min-h-svh items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </main>
    )
  }

  if (!user) {
    return <Login onLogin={login} />
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <AppHeader user={user} onLogout={logout} />
      {user.role === "hr" ? <HrView /> : <EmployeeView user={user} />}
    </main>
  )
}
