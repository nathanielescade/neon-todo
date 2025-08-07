// components/auth/Login.tsx - Fixed unused variable
'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login, register } = useAuth()
  const { currentTheme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      let success
      if (isRegistering) {
        success = await register(name, email, password)
      } else {
        success = await login(email, password)
      }
      
      if (!success) {
        setError('Authentication failed. Please try again.')
      }
    } catch {
      // Fixed: Removed unused 'err' parameter
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: currentTheme.primary }}>NeonTodo</h1>
        <p className="text-lg opacity-80">Your Vibrant Task Manager</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {isRegistering && (
          <div>
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your name"
              required
            />
          </div>
        )}
        
        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="you@example.com"
            required
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="••••••••"
            required
          />
        </div>
        
        {error && (
          <div className="text-red-400 text-center">{error}</div>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ 
            background: `linear-gradient(90deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
            boxShadow: `0 4px 15px ${currentTheme.primary}40`
          }}
        >
          {loading ? 'Processing...' : (isRegistering ? 'Create Account' : 'Sign In')}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-sm opacity-80 hover:opacity-100 transition-opacity"
          style={{ color: currentTheme.accent }}
        >
          {isRegistering 
            ? 'Already have an account? Sign In' 
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  )
}