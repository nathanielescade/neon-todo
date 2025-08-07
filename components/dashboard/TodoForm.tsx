// components/dashboard/TodoForm.tsx
'use client'
import { useState } from 'react'
import { useTodo } from '@/context/TodoContext'
import { useTheme } from '@/context/ThemeContext'
import { Todo } from '@/context/TodoContext'

interface TodoFormProps {
  categories: string[]
  tags: string[]
  setShowForm: (show: boolean) => void
}

export default function TodoForm({ categories, tags, setShowForm }: TodoFormProps) {
  const { addTodo, addCategory, addTag } = useTodo()
  const { currentTheme } = useTheme()
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Todo['priority']>('medium')
  const [category, setCategory] = useState(categories[0] || '')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [dueDate, setDueDate] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newTag, setNewTag] = useState('')
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [showNewTag, setShowNewTag] = useState(false)
  
  // Custom input styles
  const inputStyles = {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderColor: currentTheme.primary,
    color: 'white',
    // Using CSS custom property for focus ring color
    '--tw-ring-color': currentTheme.primary,
  } as React.CSSProperties // Type assertion to allow custom CSS properties
  
  // Custom select styles
  const selectStyles = {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderColor: currentTheme.primary,
    color: 'white',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23${currentTheme.primary.replace('#', '')}' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 1rem center',
    backgroundSize: '12px',
    paddingRight: '2.5rem',
    // Using CSS custom property for focus ring color
    '--tw-ring-color': currentTheme.primary,
  } as React.CSSProperties
  
  const optionStyle = {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    color: 'white',
    padding: '0.5rem 1rem'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) return
    
    addTodo({
      title,
      description,
      completed: false,
      priority,
      category,
      tags: selectedTags,
      dueDate: dueDate || undefined,
    })
    
    // Reset form
    setTitle('')
    setDescription('')
    setPriority('medium')
    setCategory(categories[0] || '')
    setSelectedTags([])
    setDueDate('')
    setShowForm(false)
  }

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim())
      setCategory(newCategory.trim())
      setNewCategory('')
      setShowNewCategory(false)
    }
  }

  const handleAddTag = () => {
    if (newTag.trim()) {
      addTag(newTag.trim())
      setSelectedTags([...selectedTags, newTag.trim()])
      setNewTag('')
      setShowNewTag(false)
    }
  }

  return (
    <div className="mb-10 p-6 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20">
      <h3 className="text-2xl font-bold mb-6" style={{ color: currentTheme.primary }}>Add New Task</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-white placeholder-white/50"
            style={inputStyles}
            placeholder="What needs to be done?"
            required
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-white placeholder-white/50"
            style={inputStyles}
            placeholder="Add details..."
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Priority</label>
            <div className="grid grid-cols-4 gap-2">
              {(['low', 'medium', 'high', 'urgent'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`py-2 rounded-lg font-medium transition-all ${
                    priority === p 
                      ? 'text-white' 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                  style={{
                    backgroundColor: priority === p ? 
                      (p === 'low' ? '#2ECC40' : 
                       p === 'medium' ? '#FFDC00' : 
                       p === 'high' ? '#FF851B' : '#FF4136') : '',
                  }}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Category</label>
            <div className="flex space-x-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 appearance-none"
                style={selectStyles}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} style={optionStyle}>{cat}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowNewCategory(!showNewCategory)}
                className="px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                +
              </button>
            </div>
            
            {showNewCategory && (
              <div className="mt-2 flex space-x-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 text-white placeholder-white/50"
                  style={inputStyles}
                  placeholder="New category"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-4 py-2 rounded-lg font-medium"
                  style={{ backgroundColor: currentTheme.primary }}
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Tags</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? 'text-white'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                style={{
                  backgroundColor: selectedTags.includes(tag) ? currentTheme.secondary : '',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setShowNewTag(!showNewTag)}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              + Add Tag
            </button>
            
            {showNewTag && (
              <div className="flex-1 flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 text-white placeholder-white/50"
                  style={inputStyles}
                  placeholder="New tag"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 rounded-lg font-medium"
                  style={{ backgroundColor: currentTheme.primary }}
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Due Date (Optional)</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 appearance-none"
            style={inputStyles}
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-6 py-3 rounded-lg font-medium bg-white/10 hover:bg-white/20 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ 
              background: `linear-gradient(90deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
              boxShadow: `0 4px 15px ${currentTheme.primary}40`
            }}
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  )
}