// components/dashboard/Header.tsx - Fixed by removing unused import
'use client'
import { useState } from 'react'
import { User } from '@/context/AuthContext'
// Removed unused import: Theme
import Image from 'next/image'

// Define the specific theme names type
type ThemeName = 'neon' | 'sunset' | 'forest' | 'ocean';

interface HeaderProps {
  user: User | null
  logout: () => void
  currentTheme: {
    primary: string
    secondary: string
    accent: string
    background: string
    card: string
    text: string
  } // Updated to use inline type instead of imported Theme
  theme: ThemeName // Updated to use ThemeName type
  setTheme: (theme: ThemeName) => void // Updated to use ThemeName type
}

export default function Header({ user, logout, currentTheme, theme, setTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  const themes = [
    { id: 'neon' as ThemeName, name: 'Neon Purple', color: '#FF00FF' },
    { id: 'sunset' as ThemeName, name: 'Sunset Orange', color: '#FF4500' },
    { id: 'forest' as ThemeName, name: 'Forest Green', color: '#00FF00' },
    { id: 'ocean' as ThemeName, name: 'Ocean Blue', color: '#1E90FF' },
  ]

  // Generate initials from user name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  // Generate a consistent color based on user name
  const getUserColor = (name: string) => {
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFBE0B', '#FB5607', 
      '#8338EC', '#3A86FF', '#FF006E', '#8AC926', '#1982C4'
    ]
    
    return colors[Math.abs(hash) % colors.length]
  }

  return (
    <header className="py-4 px-4 md:px-8 backdrop-blur-lg bg-white/5 border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: currentTheme.primary }}>NeonTodo</h1>
          
          {/* Theme picker - visible on medium screens and up */}
          <div className="hidden md:flex space-x-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 ${theme === t.id ? 'border-white' : 'border-transparent'}`}
                style={{ backgroundColor: t.color }}
                title={t.name}
              />
            ))}
          </div>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-lg bg-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        
        {/* Desktop user menu */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-right">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm opacity-70 truncate max-w-[150px]">{user?.email}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              {imageError || !user?.avatar ? (
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold border-2"
                  style={{ 
                    borderColor: currentTheme.primary,
                    backgroundColor: getUserColor(user?.name || 'User')
                  }}
                >
                  {getInitials(user?.name || 'User')}
                </div>
              ) : (
                <Image 
                  src={user.avatar} 
                  alt={user?.name || 'User'} 
                  width={48}
                  height={48}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2"
                  style={{ borderColor: currentTheme.primary }}
                  onError={() => setImageError(true)}
                />
              )}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            
            <button
              onClick={logout}
              className="px-3 py-1 md:px-4 md:py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm md:text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 p-4 rounded-xl backdrop-blur-lg bg-white/10 border border-white/20">
          <div className="flex flex-col space-y-4">
            {/* Mobile theme picker */}
            <div>
              <p className="text-sm font-medium mb-2 opacity-80">Theme</p>
              <div className="flex space-x-2">
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
            
            {/* Mobile user info */}
            <div className="flex items-center space-x-4">
              {imageError || !user?.avatar ? (
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold border-2"
                  style={{ 
                    borderColor: currentTheme.primary,
                    backgroundColor: getUserColor(user?.name || 'User')
                  }}
                >
                  {getInitials(user?.name || 'User')}
                </div>
              ) : (
                <Image 
                  src={user.avatar} 
                  alt={user?.name || 'User'} 
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full border-2"
                  style={{ borderColor: currentTheme.primary }}
                  onError={() => setImageError(true)}
                />
              )}
              <div>
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm opacity-70">{user?.email}</p>
              </div>
            </div>
            
            {/* Mobile logout button */}
            <button
              onClick={() => {
                logout()
                setMobileMenuOpen(false)
              }}
              className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  )
}