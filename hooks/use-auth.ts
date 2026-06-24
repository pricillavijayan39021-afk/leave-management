"use client"

import { useCallback, useEffect, useState } from "react"
import { authenticate, type SessionUser } from "@/lib/auth"

const SESSION_KEY = "leavehub.session.v1"

export function useAuth() {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY)
      if (raw) setUser(JSON.parse(raw) as SessionUser)
    } catch {
      // ignore
    } finally {
      setLoaded(true)
    }
  }, [])

  const login = useCallback((email: string, password: string) => {
    const session = authenticate(email, password)
    if (!session) return false
    setUser(session)
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    } catch {
      // ignore write errors
    }
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    try {
      localStorage.removeItem(SESSION_KEY)
    } catch {
      // ignore
    }
  }, [])

  return { user, loaded, login, logout }
}
