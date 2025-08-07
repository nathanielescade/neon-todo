// app/page.tsx
'use client'
import { useAuth } from '@/context/AuthContext'
import Login from '@/components/auth/Login'
import Dashboard from '@/components/dashboard/Dashboard'

export default function Home() {
  const { user } = useAuth()

  return (
    <main className="container mx-auto px-4 py-8">
      {user ? <Dashboard /> : <Login />}
    </main>
  )
}