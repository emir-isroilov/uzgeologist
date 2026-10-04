import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'

export type User = { id: string; name: string; email: string; createdAt: string }

type Result = { ok: true; needsConfirm?: boolean } | { ok: false; error: 'invalid' | 'exists' | 'short' | 'other'; message?: string }

type Ctx = {
  user: User | null
  loading: boolean
  demo: boolean
  signUp: (name: string, email: string, password: string) => Promise<Result>
  signIn: (email: string, password: string) => Promise<Result>
  signOut: () => Promise<void>
}

const AuthContext = createContext<Ctx | null>(null)

/* ---------- Demo rejim (Supabase ulanmaguncha) ---------- */
const USERS_KEY = 'uzg-demo-users'
const SESSION_KEY = 'uzg-demo-session'
type DemoUser = User & { hash: string }

async function sha256(s: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}
function readUsers(): DemoUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}
function writeUsers(u: DemoUser[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(u))
  } catch {
    /* ignore */
  }
}
function setSession(id: string | null) {
  try {
    if (id) localStorage.setItem(SESSION_KEY, id)
    else localStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
}
const strip = ({ hash: _h, ...u }: DemoUser): User => u

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const demo = !supabase

  useEffect(() => {
    if (supabase) {
      const toUser = (s: Awaited<ReturnType<NonNullable<typeof supabase>['auth']['getSession']>>['data']['session']): User | null =>
        s?.user
          ? {
              id: s.user.id,
              email: s.user.email ?? '',
              name: (s.user.user_metadata?.full_name as string) || (s.user.email ?? '').split('@')[0],
              createdAt: s.user.created_at,
            }
          : null
      supabase.auth.getSession().then(({ data }) => {
        setUser(toUser(data.session))
        setLoading(false)
      })
      const { data } = supabase.auth.onAuthStateChange((_e, session) => setUser(toUser(session)))
      return () => data.subscription.unsubscribe()
    }
    try {
      const id = localStorage.getItem(SESSION_KEY)
      const found = readUsers().find((u) => u.id === id)
      if (found) setUser(strip(found))
    } catch {
      /* ignore */
    }
    setLoading(false)
  }, [])

  const signUp: Ctx['signUp'] = async (name, email, password) => {
    if (password.length < 6) return { ok: false, error: 'short' }
    email = email.trim().toLowerCase()
    if (supabase) {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } })
      if (error) return { ok: false, error: /registered|exists/i.test(error.message) ? 'exists' : 'other', message: error.message }
      return { ok: true, needsConfirm: !data.session }
    }
    const users = readUsers()
    if (users.some((u) => u.email === email)) return { ok: false, error: 'exists' }
    const nu: DemoUser = { id: crypto.randomUUID(), name: name.trim(), email, createdAt: new Date().toISOString(), hash: await sha256(password) }
    writeUsers([...users, nu])
    setSession(nu.id)
    setUser(strip(nu))
    return { ok: true }
  }

  const signIn: Ctx['signIn'] = async (email, password) => {
    email = email.trim().toLowerCase()
    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      return error ? { ok: false, error: 'invalid' } : { ok: true }
    }
    const hash = await sha256(password)
    const found = readUsers().find((u) => u.email === email && u.hash === hash)
    if (!found) return { ok: false, error: 'invalid' }
    setSession(found.id)
    setUser(strip(found))
    return { ok: true }
  }

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut()
    setSession(null)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, demo, signUp, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
