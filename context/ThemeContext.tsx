// context/ThemeContext.tsx
'use client'
import { createContext, useContext, useEffect, useState } from 'react'

interface Theme {
  primary: string
  secondary: string
  accent: string
  background: string
  card: string
  text: string
}

const themes = {
  neon: {
    primary: '#FF00FF',
    secondary: '#00FFFF',
    accent: '#FFFF00',
    background: 'linear-gradient(135deg, #1a0033, #330066, #0066cc)',
    card: 'rgba(255, 255, 255, 0.1)',
    text: '#FFFFFF',
  },
  sunset: {
    primary: '#FF4500',
    secondary: '#FF8C00',
    accent: '#FFD700',
    background: 'linear-gradient(135deg, #330033, #660033, #cc0066)',
    card: 'rgba(255, 255, 255, 0.1)',
    text: '#FFFFFF',
  },
  forest: {
    primary: '#00FF00',
    secondary: '#32CD32',
    accent: '#7CFC00',
    background: 'linear-gradient(135deg, #003300, #006600, #009900)',
    card: 'rgba(255, 255, 255, 0.1)',
    text: '#FFFFFF',
  },
  ocean: {
    primary: '#1E90FF',
    secondary: '#00BFFF',
    accent: '#87CEFA',
    background: 'linear-gradient(135deg, #000033, #003366, #006699)',
    card: 'rgba(255, 255, 255, 0.1)',
    text: '#FFFFFF',
  },
}

interface ThemeContextType {
  theme: keyof typeof themes
  currentTheme: Theme
  setTheme: (theme: keyof typeof themes) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'neon',
  currentTheme: themes.neon,
  setTheme: () => {},
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<keyof typeof themes>('neon')
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('neontodo_theme') as keyof typeof themes
    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme)
    }
  }, [])

  const setTheme = (newTheme: keyof typeof themes) => {
    setThemeState(newTheme)
    localStorage.setItem('neontodo_theme', newTheme)
  }

  const currentTheme = themes[theme]

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)