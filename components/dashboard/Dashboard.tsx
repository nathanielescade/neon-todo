// components/dashboard/Dashboard.tsx
'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useTodo } from '@/context/TodoContext'
import { useTheme } from '@/context/ThemeContext'
import Header from './Header'
import Stats from './Stats'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import FilterBar from './FilterBar'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { todos, categories, tags } = useTodo()
  const { currentTheme, theme, setTheme } = useTheme()
  const [showForm, setShowForm] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    priority: '',
    completed: undefined as boolean | undefined,
    search: '',
  })

  const filteredTodos = useTodo().filterTodos(filters)

  return (
    <div className="min-h-screen">
      <Header 
        user={user} 
        logout={logout} 
        currentTheme={currentTheme}
        theme={theme}
        setTheme={setTheme}
      />
      
      <div className="container mx-auto px-4 py-8">
        <Stats todos={todos} />
        
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Your Tasks</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ 
              background: `linear-gradient(90deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
              boxShadow: `0 4px 15px ${currentTheme.primary}40`
            }}
          >
            {showForm ? 'Cancel' : 'Add New Task'}
          </button>
        </div>
        
        {showForm && (
          <TodoForm 
            categories={categories} 
            tags={tags} 
            setShowForm={setShowForm} 
          />
        )}
        
        <FilterBar 
          categories={categories} 
          filters={filters} 
          setFilters={setFilters} 
          currentTheme={currentTheme}
        />
        
        <TodoList todos={filteredTodos} />
      </div>
    </div>
  )
}