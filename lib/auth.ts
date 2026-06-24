export type Role = "employee" | "hr"

export interface User {
  email: string
  password: string
  name: string
  employeeId: string
  role: Role
}

// Demo credentials. In a real app, never store plaintext passwords client-side.
export const USERS: User[] = [
  {
    email: "ava@leavehub.com",
    password: "employee123",
    name: "Ava Mitchell",
    employeeId: "EMP-1042",
    role: "employee",
  },
  {
    email: "noah@leavehub.com",
    password: "employee123",
    name: "Noah Bennett",
    employeeId: "EMP-2087",
    role: "employee",
  },
  {
    email: "hr@leavehub.com",
    password: "hr123",
    name: "Jordan Lee",
    employeeId: "HR-0001",
    role: "hr",
  },
]

export type SessionUser = Omit<User, "password">

export function authenticate(
  email: string,
  password: string,
): SessionUser | null {
  const match = USERS.find(
    (u) =>
      u.email.toLowerCase() === email.trim().toLowerCase() &&
      u.password === password,
  )
  if (!match) return null
  const { password: _pw, ...session } = match
  return session
}

export const DEMO_CREDENTIALS = [
  { role: "HR Manager", email: "hr@leavehub.com", password: "hr123" },
  { role: "Employee", email: "ava@leavehub.com", password: "employee123" },
  { role: "Employee", email: "noah@leavehub.com", password: "employee123" },
] as const
