'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface User {
  id: string
  email: string
  password: string
  name: string
  avatar: string
  projects: any[]
  createdAt: string
}

// Demo accounts with pre-existing data
const demoUsers = [
  {
    id: 'demo-1',
    email: 'john@example.com',
    password: 'demo123',
    name: 'John Doe',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
    projects: [
      {
        id: 'proj-1',
        name: 'CRM Dashboard',
        description: 'Customer relationship management system',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T14:30:00Z',
        widgetCount: 12,
        widgets: [
          {
            id: 'header-1',
            type: 'text' as const,
            position: { x: 50, y: 30 },
            size: { width: 300, height: 60 },
            properties: {
              text: 'CRM Dashboard',
              fontSize: 24,
              fontWeight: 'bold',
              textColor: '#1f2937',
              backgroundColor: 'transparent',
              borderRadius: 0
            }
          },
          {
            id: 'metric-1',
            type: 'text' as const,
            position: { x: 50, y: 120 },
            size: { width: 200, height: 100 },
            properties: {
              text: 'Total Customers\n1,247',
              fontSize: 16,
              fontWeight: 'normal',
              textColor: '#1f2937',
              backgroundColor: '#f3f4f6',
              borderRadius: 8
            }
          }
        ]
      },
      {
        id: 'proj-2',
        name: 'Task Manager',
        description: 'Personal task management app',
        createdAt: '2024-01-10T09:00:00Z',
        updatedAt: '2024-01-18T16:45:00Z',
        widgetCount: 8,
        widgets: [
          {
            id: 'title-1',
            type: 'text' as const,
            position: { x: 50, y: 30 },
            size: { width: 300, height: 60 },
            properties: {
              text: 'My Tasks',
              fontSize: 24,
              fontWeight: 'bold',
              textColor: '#1f2937',
              backgroundColor: 'transparent',
              borderRadius: 0
            }
          },
          {
            id: 'task-1',
            type: 'text' as const,
            position: { x: 50, y: 120 },
            size: { width: 400, height: 50 },
            properties: {
              text: '✅ Complete project proposal',
              fontSize: 16,
              fontWeight: 'normal',
              textColor: '#1f2937',
              backgroundColor: '#f0f9ff',
              borderRadius: 8
            }
          }
        ]
      },
      {
        id: 'proj-3',
        name: 'Budget Tracker',
        description: 'Financial planning and expense tracking',
        createdAt: '2024-01-05T11:00:00Z',
        updatedAt: '2024-01-15T13:20:00Z',
        widgetCount: 15,
        widgets: [
          {
            id: 'title-1',
            type: 'text' as const,
            position: { x: 50, y: 30 },
            size: { width: 300, height: 60 },
            properties: {
              text: 'Budget Tracker',
              fontSize: 24,
              fontWeight: 'bold',
              textColor: '#1f2937',
              backgroundColor: 'transparent',
              borderRadius: 0
            }
          },
          {
            id: 'balance-1',
            type: 'text' as const,
            position: { x: 50, y: 120 },
            size: { width: 200, height: 100 },
            properties: {
              text: 'Current Balance\n$2,450.75',
              fontSize: 16,
              fontWeight: 'normal',
              textColor: '#1f2937',
              backgroundColor: '#f0fdf4',
              borderRadius: 8
            }
          }
        ]
      }
    ],
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'demo-2',
    email: 'sarah@example.com',
    password: 'demo123',
    name: 'Sarah Johnson',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random',
    projects: [
      {
        id: 'proj-4',
        name: 'Inventory System',
        description: 'Product inventory management',
        createdAt: '2024-01-12T08:00:00Z',
        updatedAt: '2024-01-19T10:15:00Z',
        widgetCount: 20,
        widgets: [
          {
            id: 'title-1',
            type: 'text' as const,
            position: { x: 50, y: 30 },
            size: { width: 300, height: 60 },
            properties: {
              text: 'Inventory System',
              fontSize: 24,
              fontWeight: 'bold',
              textColor: '#1f2937',
              backgroundColor: 'transparent',
              borderRadius: 0
            }
          },
          {
            id: 'product-1',
            type: 'text' as const,
            position: { x: 50, y: 120 },
            size: { width: 250, height: 100 },
            properties: {
              text: 'Product: Widget A\nStock: 45 units\nPrice: $29.99',
              fontSize: 14,
              fontWeight: 'normal',
              textColor: '#1f2937',
              backgroundColor: '#f9fafb',
              borderRadius: 8
            }
          }
        ]
      },
      {
        id: 'proj-5',
        name: 'E-commerce Platform',
        description: 'Online store management system',
        createdAt: '2024-01-08T14:00:00Z',
        updatedAt: '2024-01-16T11:30:00Z',
        widgetCount: 25,
        widgets: [
          {
            id: 'title-1',
            type: 'text' as const,
            position: { x: 50, y: 30 },
            size: { width: 300, height: 60 },
            properties: {
              text: 'E-commerce Store',
              fontSize: 24,
              fontWeight: 'bold',
              textColor: '#1f2937',
              backgroundColor: 'transparent',
              borderRadius: 0
            }
          },
          {
            id: 'product-1',
            type: 'text' as const,
            position: { x: 50, y: 120 },
            size: { width: 250, height: 300 },
            properties: {
              text: 'Premium Widget\n\n$49.99\n\nAdd to Cart',
              fontSize: 16,
              fontWeight: 'normal',
              textColor: '#1f2937',
              backgroundColor: '#f9fafb',
              borderRadius: 8
            }
          }
        ]
      }
    ],
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 'demo-3',
    email: 'mike@example.com',
    password: 'demo123',
    name: 'Mike Davis',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Davis&background=random',
    projects: [
      {
        id: 'proj-6',
        name: 'Analytics Dashboard',
        description: 'Data visualization and analytics',
        createdAt: '2024-01-14T12:00:00Z',
        updatedAt: '2024-01-21T09:45:00Z',
        widgetCount: 18,
        widgets: [
          {
            id: 'title-1',
            type: 'text' as const,
            position: { x: 50, y: 30 },
            size: { width: 300, height: 60 },
            properties: {
              text: 'Analytics Dashboard',
              fontSize: 24,
              fontWeight: 'bold',
              textColor: '#1f2937',
              backgroundColor: 'transparent',
              borderRadius: 0
            }
          },
          {
            id: 'chart-1',
            type: 'text' as const,
            position: { x: 50, y: 120 },
            size: { width: 400, height: 200 },
            properties: {
              text: '📊 Revenue Chart\n\nMonthly revenue trends and analytics data visualization.',
              fontSize: 14,
              fontWeight: 'normal',
              textColor: '#1f2937',
              backgroundColor: '#ffffff',
              borderRadius: 8
            }
          }
        ]
      },
      {
        id: 'proj-7',
        name: 'Project Tracker',
        description: 'Team project management tool',
        createdAt: '2024-01-06T15:00:00Z',
        updatedAt: '2024-01-17T16:20:00Z',
        widgetCount: 14,
        widgets: [
          {
            id: 'title-1',
            type: 'text' as const,
            position: { x: 50, y: 30 },
            size: { width: 300, height: 60 },
            properties: {
              text: 'Project Tracker',
              fontSize: 24,
              fontWeight: 'bold',
              textColor: '#1f2937',
              backgroundColor: 'transparent',
              borderRadius: 0
            }
          },
          {
            id: 'project-1',
            type: 'text' as const,
            position: { x: 50, y: 120 },
            size: { width: 400, height: 80 },
            properties: {
              text: 'Website Redesign\nStatus: In Progress\nTeam: 5 members',
              fontSize: 16,
              fontWeight: 'normal',
              textColor: '#1f2937',
              backgroundColor: '#fef3c7',
              borderRadius: 8
            }
          }
        ]
      },
      {
        id: 'proj-8',
        name: 'Content Manager',
        description: 'Content creation and management',
        createdAt: '2024-01-03T10:00:00Z',
        updatedAt: '2024-01-14T12:10:00Z',
        widgetCount: 22,
        widgets: [
          {
            id: 'title-1',
            type: 'text' as const,
            position: { x: 50, y: 30 },
            size: { width: 300, height: 60 },
            properties: {
              text: 'Content Manager',
              fontSize: 24,
              fontWeight: 'bold',
              textColor: '#1f2937',
              backgroundColor: 'transparent',
              borderRadius: 0
            }
          },
          {
            id: 'article-1',
            type: 'text' as const,
            position: { x: 50, y: 120 },
            size: { width: 500, height: 150 },
            properties: {
              text: 'Getting Started Guide\n\nLearn how to create and manage content effectively with our intuitive tools...',
              fontSize: 16,
              fontWeight: 'normal',
              textColor: '#1f2937',
              backgroundColor: '#ffffff',
              borderRadius: 8
            }
          }
        ]
      }
    ],
    createdAt: '2024-01-03T00:00:00Z'
  }
]

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Initialize demo users in localStorage if they don't exist
  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    if (existingUsers.length === 0) {
      localStorage.setItem('users', JSON.stringify(demoUsers))
    }
  }, [])

  // Gmail validation function
  const isValidGmail = (email: string) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    return gmailRegex.test(email)
  }

  // Password validation function
  const isValidPassword = (password: string) => {
    return password.length >= 6
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validate Gmail
    if (!isValidGmail(email)) {
      setError('Please use a valid Gmail address')
      setLoading(false)
      return
    }

    // Validate password
    if (!isValidPassword(password)) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    try {
      if (isLogin) {
        // Login logic
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const user = users.find((u: User) => u.email === email && u.password === password)
        
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user))
          router.push('/dashboard')
        } else {
          setError('Invalid email or password')
        }
      } else {
        // Registration logic
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const existingUser = users.find((u: User) => u.email === email)
        
        if (existingUser) {
          setError('An account with this email already exists')
        } else {
          const newUser: User = {
            id: Date.now().toString(),
            email,
            password,
            name,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
            projects: [],
            createdAt: new Date().toISOString()
          }
          
          users.push(newUser)
          localStorage.setItem('users', JSON.stringify(users))
          localStorage.setItem('currentUser', JSON.stringify(newUser))
          router.push('/dashboard')
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = (demoUser: User) => {
    setLoading(true)
    setError('')
    
    // Simulate loading
    setTimeout(() => {
      localStorage.setItem('currentUser', JSON.stringify(demoUser))
      router.push('/dashboard')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🚀</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back!' : 'Join SaaS Builder'}
          </h2>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to continue building amazing apps' : 'Create your account to start building'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required={!isLogin}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="your.email@gmail.com"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-gray-400">📧</span>
                </div>
              </div>
              {email && !isValidGmail(email) && (
                <p className="text-red-500 text-sm mt-1">Please use a valid Gmail address</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-gray-400">👁️</span>
                </div>
              </div>
              {password && !isValidPassword(password) && (
                <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">⏳</span>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  {isLogin ? '🔐 Sign In' : '✨ Create Account'}
                </span>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or try demo accounts</span>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {demoUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleDemoLogin(user)}
                  disabled={loading}
                  className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-3 text-left">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user.email} • {user.projects.length} projects
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError('')
                  setEmail('')
                  setPassword('')
                  setName('')
                }}
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
} 