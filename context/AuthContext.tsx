// context/AuthContext.tsx - Fixed by exporting User interface
'use client'
import { createContext, useContext, useEffect, useState } from 'react'

export interface User {  // Added 'export' keyword
  id: string
  name: string
  email: string
  avatar: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  loading: true,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('neontodo_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock user data
    const userData: User = {
      id: 'user-123',
      name: 'Neon User',
      email,
      avatar: `https://ui-avatars.com/api/?name=Neon+User&background=8A2BE2&color=fff`,
    }
    
    setUser(userData)
    localStorage.setItem('neontodo_user', JSON.stringify(userData))
    return true
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const userData: User = {
      id: 'user-' + Date.now(),
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=8A2BE2&color=fff`,
    }
    
    setUser(userData)
    localStorage.setItem('neontodo_user', JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('neontodo_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)