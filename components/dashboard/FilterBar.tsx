// components/dashboard/FilterBar.tsx
'use client'
import { useTheme } from '@/context/ThemeContext'

// Define proper types for filters
interface Filters {
  category: string
  priority: string
  completed: boolean | undefined
  search: string
}

interface FilterBarProps {
  categories: string[]
  filters: Filters
  setFilters: (filters: Filters) => void
  currentTheme: {
    primary: string
    secondary: string
  }
}

export default function FilterBar({ categories, filters, setFilters, currentTheme }: FilterBarProps) {
  const priorities = ['low', 'medium', 'high', 'urgent']
  
  // Custom select styles
  const selectStyles = {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderColor: currentTheme.primary,
    color: 'white',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23${currentTheme.primary.replace('#', '')}' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 1rem center',
    backgroundSize: '12px',
    paddingRight: '2.5rem'
  }
  
  const optionStyle = {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    color: 'white',
    padding: '0.5rem 1rem'
  }
  
  const inputStyles = {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderColor: currentTheme.primary,
    color: 'white',
    // Using CSS custom property for focus ring color
    '--tw-ring-color': currentTheme.primary,
  } as React.CSSProperties // Type assertion to allow custom CSS properties
  
  return (
    <div className="mb-8 p-5 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium opacity-80">Search</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 text-white placeholder-white/50"
            style={inputStyles}
            placeholder="Search tasks..."
          />
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium opacity-80">Category</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 appearance-none"
            style={selectStyles}
          >
            <option value="" style={optionStyle}>All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} style={optionStyle}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium opacity-80">Priority</label>
          <select
            value={filters.priority}
            onChange={(e) => setFilters({...filters, priority: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 appearance-none"
            style={selectStyles}
          >
            <option value="" style={optionStyle}>All Priorities</option>
            {priorities.map((p) => (
              <option key={p} value={p} style={optionStyle}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium opacity-80">Status</label>
          <select
            value={filters.completed === undefined ? '' : filters.completed.toString()}
            onChange={(e) => setFilters({
              ...filters, 
              completed: e.target.value === '' ? undefined : e.target.value === 'true'
            })}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 appearance-none"
            style={selectStyles}
          >
            <option value="" style={optionStyle}>All Tasks</option>
            <option value="false" style={optionStyle}>Pending</option>
            <option value="true" style={optionStyle}>Completed</option>
          </select>
        </div>
      </div>
    </div>
  )
}