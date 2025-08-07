// components/ui/Select.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function Select({ options, value, onChange, placeholder, className = '' }: SelectProps) {
  const { currentTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  
  const selectedOption = options.find(option => option.value === value)
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 flex justify-between items-center"
        style={{ 
          borderColor: isOpen ? currentTheme.primary : '',
          boxShadow: isOpen ? `0 0 0 2px ${currentTheme.primary}40` : '',
        }}
      >
        <span className={selectedOption ? 'text-white' : 'opacity-70'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg 
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 rounded-xl backdrop-blur-lg bg-white/20 border border-white/30 overflow-hidden shadow-lg">
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors ${
                  value === option.value ? 'bg-white/10' : ''
                }`}
                style={{
                  borderLeft: value === option.value ? `4px solid ${currentTheme.primary}` : '',
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}