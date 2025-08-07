// components/dashboard/FilterBar.tsx
'use client'
import { useTheme } from '@/context/ThemeContext'

interface FilterBarProps {
  categories: string[]
  filters: {
    category: string
    priority: string
    completed: boolean | undefined
    search: string
  }
  setFilters: (filters: any) => void
  currentTheme: any
}

export default function FilterBar({ categories, filters, setFilters, currentTheme }: FilterBarProps) {
  const priorities = ['low', 'medium', 'high', 'urgent']
  
  return (
    <div className="mb-8 p-5 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium opacity-80">Search</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2"
            style={{ focusRingColor: currentTheme.primary }}
            placeholder="Search tasks..."
          />
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium opacity-80">Category</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2"
            style={{ focusRingColor: currentTheme.primary }}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium opacity-80">Priority</label>
          <select
            value={filters.priority}
            onChange={(e) => setFilters({...filters, priority: e.target.value})}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2"
            style={{ focusRingColor: currentTheme.primary }}
          >
            <option value="">All Priorities</option>
            {priorities.map((p) => (
              <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
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
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2"
            style={{ focusRingColor: currentTheme.primary }}
          >
            <option value="">All Tasks</option>
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>
        </div>
      </div>
    </div>
  )
}