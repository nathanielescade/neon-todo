// components/dashboard/TodoList.tsx
'use client'
import { useState } from 'react'
import { Todo } from '@/context/TodoContext'
import { useTodo } from '@/context/TodoContext'
import { useTheme } from '@/context/ThemeContext'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
}

export default function TodoList({ todos }: TodoListProps) {
  const { deleteTodo, toggleComplete } = useTodo()
  const { currentTheme } = useTheme()
  const [draggedTodo, setDraggedTodo] = useState<Todo | null>(null)
  
  const handleDragStart = (todo: Todo) => {
    setDraggedTodo(todo)
  }
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }
  
  const handleDrop = (targetTodo: Todo) => {
    if (draggedTodo && draggedTodo.id !== targetTodo.id) {
      // In a real app, you would reorder the todos here
      // For simplicity, we'll just toggle completion
      toggleComplete(draggedTodo.id)
    }
    setDraggedTodo(null)
  }
  
  if (todos.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: currentTheme.primary }}>No tasks found!</h3>
        <p className="opacity-80">Add a new task to get started</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          draggable
          onDragStart={() => handleDragStart(todo)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(todo)}
          className="group"
        >
          <TodoItem todo={todo} />
        </div>
      ))}
    </div>
  )
}