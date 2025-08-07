// components/dashboard/Header.tsx
'use client'
import { User } from '@/context/AuthContext'
import { Theme } from '@/context/ThemeContext'

interface HeaderProps {
  user: User | null
  logout: () => void
  currentTheme: Theme
  theme: string
  setTheme: (theme: string) => void
}

export default function Header({ user, logout, currentTheme, theme, setTheme }: HeaderProps) {
  const themes = [
    { id: 'neon', name: 'Neon Purple', color: '#FF00FF' },
    { id: 'sunset', name: 'Sunset Orange', color: '#FF4500' },
    { id: 'forest', name: 'Forest Green', color: '#00FF00' },
    { id: 'ocean', name: 'Ocean Blue', color: '#1E90FF' },
  ]

  return (
    <header className="py-6 px-8 backdrop-blur-lg bg-white/5 border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold" style={{ color: currentTheme.primary }}>NeonTodo</h1>
          <div className="hidden md:flex space-x-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`w-8 h-8 rounded-full border-2 ${theme === t.id ? 'border-white' : 'border-transparent'}`}
                style={{ backgroundColor: t.color }}
                title={t.name}
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:block text-right">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm opacity-70">{user?.email}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={user?.avatar || ''} 
                alt={user?.name || 'User'} 
                className="w-12 h-12 rounded-full border-2"
                style={{ borderColor: currentTheme.primary }}
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}