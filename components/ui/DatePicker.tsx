// components/ui/DatePicker.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'

interface DatePickerProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function DatePicker({ value, onChange, placeholder, className = '' }: DatePickerProps) {
  const { currentTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const pickerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    onChange(e.target.value)
  }
  
  const toggleCalendar = () => {
    setIsOpen(!isOpen)
  }
  
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }
  
  return (
    <div className={`relative ${className}`} ref={pickerRef}>
      <div className="relative">
        <input
          type="text"
          value={formatDate(inputValue)}
          onChange={handleInputChange}
          onClick={toggleCalendar}
          readOnly
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 cursor-pointer"
          style={{ 
            borderColor: isOpen ? currentTheme.primary : '',
            boxShadow: isOpen ? `0 0 0 2px ${currentTheme.primary}40` : '',
          }}
        />
        <button
          type="button"
          onClick={toggleCalendar}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </button>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 p-4 rounded-xl backdrop-blur-lg bg-white/20 border border-white/30 shadow-lg">
          <input
            type="date"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              onChange(e.target.value)
              setIsOpen(false)
            }}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2"
            style={{ focusRingColor: currentTheme.primary }}
          />
          <div className="flex justify-end mt-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}