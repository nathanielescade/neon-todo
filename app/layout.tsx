// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import { TodoProvider } from '@/context/TodoContext'
import { ThemeProvider } from '@/context/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NeonTodo - Vibrant Task Manager',
  description: 'A stunningly colorful todo app with powerful features',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <TodoProvider>
              <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
                {children}
              </div>
            </TodoProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}