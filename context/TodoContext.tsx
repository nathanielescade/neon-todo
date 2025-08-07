// context/TodoContext.tsx
'use client'
import { createContext, useContext, useEffect, useState } from 'react'

export interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: string
  tags: string[]
  dueDate?: string
  attachments?: string[]
  createdAt: string
  updatedAt: string
  subtasks?: Subtask[]
}

interface Subtask {
  id: string
  title: string
  completed: boolean
}

interface TodoContextType {
  todos: Todo[]
  categories: string[]
  tags: string[]
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTodo: (id: string, updates: Partial<Todo>) => void
  deleteTodo: (id: string) => void
  toggleComplete: (id: string) => void
  addCategory: (category: string) => void
  addTag: (tag: string) => void
  filterTodos: (filters: {
    category?: string
    priority?: string
    completed?: boolean
    search?: string
  }) => Todo[]
}

const TodoContext = createContext<TodoContextType>({
  todos: [],
  categories: ['Personal', 'Work', 'Health', 'Learning', 'Finance'],
  tags: ['Important', 'Urgent', 'Later', 'Ideas'],
  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
  toggleComplete: () => {},
  addCategory: () => {},
  addTag: () => {},
  filterTodos: () => [],
})

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [categories, setCategories] = useState<string[]>(['Personal', 'Work', 'Health', 'Learning', 'Finance'])
  const [tags, setTags] = useState<string[]>(['Important', 'Urgent', 'Later', 'Ideas'])

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('neontodo_todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
    
    const savedCategories = localStorage.getItem('neontodo_categories')
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    }
    
    const savedTags = localStorage.getItem('neontodo_tags')
    if (savedTags) {
      setTags(JSON.parse(savedTags))
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('neontodo_todos', JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem('neontodo_categories', JSON.stringify(categories))
  }, [categories])

  useEffect(() => {
    localStorage.setItem('neontodo_tags', JSON.stringify(tags))
  }, [tags])

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: 'todo-' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTodos([...todos, newTodo])
  }

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...updates, updatedAt: new Date().toISOString() } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleComplete = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() } : todo
    ))
  }

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category])
    }
  }

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag])
    }
  }

  const filterTodos = (filters: {
    category?: string
    priority?: string
    completed?: boolean
    search?: string
  }) => {
    return todos.filter(todo => {
      if (filters.category && todo.category !== filters.category) return false
      if (filters.priority && todo.priority !== filters.priority) return false
      if (filters.completed !== undefined && todo.completed !== filters.completed) return false
      if (filters.search && !todo.title.toLowerCase().includes(filters.search.toLowerCase())) return false
      return true
    })
  }

  return (
    <TodoContext.Provider value={{
      todos,
      categories,
      tags,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleComplete,
      addCategory,
      addTag,
      filterTodos,
    }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodo = () => useContext(TodoContext)