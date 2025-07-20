'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthGuard } from '@/components/auth-guard'
import { Navigation } from '@/components/navigation'
import { Loading } from '@/components/loading'

interface User {
  id: string
  email: string
  password: string
  name: string
  avatar: string
  projects: any[]
  createdAt: string
}

interface Project {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  widgetCount: number
  template?: string
  widgets: any[] // Added widgets array
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (!currentUser) {
      router.push('/auth')
      return
    }

    const userData: User = JSON.parse(currentUser)
    setUser(userData)

    // Get user's projects
    const userProjects = userData.projects || []
    setProjects(userProjects)
    setLoading(false)
  }, [router])

  const handleCreateProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: `New Project ${projects.length + 1}`,
      description: 'A new SaaS application',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      widgetCount: 0,
      widgets: [] // Add empty widgets array
    }

    const updatedProjects = [...projects, newProject]
    setProjects(updatedProjects)

    // Update user's projects in localStorage
    if (user) {
      const updatedUser = { ...user, projects: updatedProjects }
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      
      // Update in users array
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const userIndex = users.findIndex((u: User) => u.id === user.id)
      if (userIndex !== -1) {
        users[userIndex] = updatedUser
        localStorage.setItem('users', JSON.stringify(users))
      }
    }

    router.push(`/builder?project=${newProject.id}`)
  }

  if (loading) {
    return <Loading message="Loading dashboard..." isVisible={true} />
  }

  if (!user) {
    return null
  }

  const stats = {
    totalProjects: projects.length,
    totalWidgets: projects.reduce((sum, project) => sum + project.widgetCount, 0),
    activeProjects: projects.filter(p => new Date(p.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation currentPage="dashboard" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user.name}! 👋
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Ready to build your next amazing SaaS application?
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Projects</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalProjects}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Projects</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeProjects}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Widgets</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalWidgets}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={handleCreateProject}
                className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors text-left"
              >
                <div className="text-2xl mb-2">✨</div>
                <h4 className="font-semibold mb-1">Create New Project</h4>
                <p className="text-sm opacity-90">Start building from scratch</p>
              </button>
              
              <Link
                href="/templates"
                className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors text-left"
              >
                <div className="text-2xl mb-2">📋</div>
                <h4 className="font-semibold mb-1">Browse Templates</h4>
                <p className="text-sm opacity-90">Use pre-built designs</p>
              </Link>
              
              <Link
                href="/builder"
                className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors text-left"
              >
                <div className="text-2xl mb-2">🎨</div>
                <h4 className="font-semibold mb-1">Open Builder</h4>
                <p className="text-sm opacity-90">Continue editing</p>
              </Link>
            </div>
          </div>

          {/* Recent Projects */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Projects</h3>
              {projects.length > 0 && (
                <Link
                  href="/templates"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                >
                  View All
                </Link>
              )}
            </div>
            
            {projects.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                <div className="text-4xl mb-4">📁</div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No projects yet
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Create your first project to get started
                </p>
                <button
                  onClick={handleCreateProject}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Project
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.slice(0, 6).map((project) => (
                  <div
                    key={project.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {project.name}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {project.widgetCount} widgets
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Updated {new Date(project.updatedAt).toLocaleDateString()}
                      </span>
                      <Link
                        href={`/builder?project=${project.id}`}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                      >
                        Open →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
} 