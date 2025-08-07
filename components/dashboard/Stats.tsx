// components/dashboard/Stats.tsx
'use client'
import { Todo } from '@/context/TodoContext'
import { useTheme } from '@/context/ThemeContext'

interface StatsProps {
  todos: Todo[]
}

export default function Stats({ todos }: StatsProps) {
  const { currentTheme } = useTheme()
  
  const completed = todos.filter(todo => todo.completed).length
  const pending = todos.length - completed
  const urgent = todos.filter(todo => todo.priority === 'urgent').length
  const high = todos.filter(todo => todo.priority === 'high').length
  
  const stats = [
    { title: 'Total Tasks', value: todos.length, color: currentTheme.primary },
    { title: 'Completed', value: completed, color: currentTheme.secondary },
    { title: 'Pending', value: pending, color: currentTheme.accent },
    { title: 'Urgent', value: urgent, color: '#FF4136' },
    { title: 'High Priority', value: high, color: '#FF851B' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="p-5 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 flex flex-col items-center justify-center"
        >
          <div className="text-3xl font-bold mb-2" style={{ color: stat.color }}>
            {stat.value}
          </div>
          <div className="text-center text-sm opacity-80">
            {stat.title}
          </div>
        </div>
      ))}
    </div>
  )
}