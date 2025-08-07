// components/dashboard/TodoItem.tsx
'use client'
import { useState } from 'react'
import { Todo } from '@/context/TodoContext'
import { useTodo } from '@/context/TodoContext'
import { useTheme } from '@/context/ThemeContext'

interface TodoItemProps {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { updateTodo, deleteTodo, toggleComplete } = useTodo()
  const { currentTheme } = useTheme()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
    category: todo.category,
    tags: [...todo.tags],
    dueDate: todo.dueDate || '',
  })
  
  const handleSave = () => {
    updateTodo(todo.id, editData)
    setIsEditing(false)
  }
  
  const handleCancel = () => {
    setEditData({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      category: todo.category,
      tags: [...todo.tags],
      dueDate: todo.dueDate || '',
    })
    setIsEditing(false)
  }
  
  const handleTagToggle = (tag: string) => {
    if (editData.tags.includes(tag)) {
      setEditData({
        ...editData,
        tags: editData.tags.filter(t => t !== tag)
      })
    } else {
      setEditData({
        ...editData,
        tags: [...editData.tags, tag]
      })
    }
  }
  
  const getPriorityColor = (priority: Todo['priority']) => {
    switch (priority) {
      case 'low': return '#2ECC40'
      case 'medium': return '#FFDC00'
      case 'high': return '#FF851B'
      case 'urgent': return '#FF4136'
      default: return currentTheme.primary
    }
  }
  
  return (
    <div 
      className={`p-5 rounded-2xl backdrop-blur-lg border transition-all duration-300 ${
        todo.completed 
          ? 'bg-white/5 border-white/10 opacity-70' 
          : 'bg-white/10 border-white/20 hover:border-white/30'
      }`}
    >
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({...editData, title: e.target.value})}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2"
              style={{ focusRingColor: currentTheme.primary }}
            />
          </div>
          
          <div>
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({...editData, description: e.target.value})}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2"
              style={{ focusRingColor: currentTheme.primary }}
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-sm opacity-80">Priority</label>
              <select
                value={editData.priority}
                onChange={(e) => setEditData({...editData, priority: e.target.value as Todo['priority']})}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2"
                style={{ focusRingColor: currentTheme.primary }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-2 text-sm opacity-80">Category</label>
              <select
                value={editData.category}
                onChange={(e) => setEditData({...editData, category: e.target.value})}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2"
                style={{ focusRingColor: currentTheme.primary }}
              >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Health">Health</option>
                <option value="Learning">Learning</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-2 text-sm opacity-80">Due Date</label>
              <input
                type="date"
                value={editData.dueDate}
                onChange={(e) => setEditData({...editData, dueDate: e.target.value})}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2"
                style={{ focusRingColor: currentTheme.primary }}
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm opacity-80">Tags</label>
            <div className="flex flex-wrap gap-2">
              {['Important', 'Urgent', 'Later', 'Ideas'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    editData.tags.includes(tag)
                      ? 'text-white'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                  style={{
                    backgroundColor: editData.tags.includes(tag) ? currentTheme.secondary : '',
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg font-medium"
              style={{ backgroundColor: currentTheme.primary }}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start">
          <button
            onClick={() => toggleComplete(todo.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 mr-4 ${
              todo.completed 
                ? 'border-transparent' 
                : 'border-white/30 hover:border-white/50'
            }`}
            style={{
              backgroundColor: todo.completed ? currentTheme.secondary : '',
            }}
          >
            {todo.completed && (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            )}
          </button>
          
          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className={`text-xl font-semibold ${todo.completed ? 'line-through opacity-70' : ''}`}>
                {todo.title}
              </h3>
              
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 rounded-full hover:bg-red-500/20 transition-colors"
                >
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {todo.description && (
              <p className={`mt-2 opacity-80 ${todo.completed ? 'line-through' : ''}`}>
                {todo.description}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: getPriorityColor(todo.priority) }}
                ></div>
                <span className="text-sm capitalize opacity-80">{todo.priority}</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
                <span className="text-sm opacity-80">{todo.category}</span>
              </div>
              
              {todo.dueDate && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-sm opacity-80">
                    {new Date(todo.dueDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              
              <div className="flex flex-wrap gap-1">
                {todo.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${currentTheme.secondary}40` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}