'use client'

import { useBuilderStore } from '@/lib/store'
import Link from 'next/link'

export default function DebugPage() {
  const { widgets, user, projects, addWidget, clearCanvas, setUser } = useBuilderStore()

  const testAddWidget = () => {
    const newWidget = {
      id: `test-${Date.now()}`,
      type: 'text' as const,
      position: { x: 100, y: 100 },
      size: { width: 200, height: 50 },
      properties: {
        label: 'Test Widget',
        text: 'This is a test widget',
        color: '#000000',
        backgroundColor: '#ffffff',
        fontSize: 16,
        borderRadius: 4
      }
    }
    addWidget(newWidget)
    console.log('Test widget added:', newWidget)
  }

  const testLogin = () => {
    setUser({ email: 'test@example.com', name: 'Test User' })
    console.log('Test user logged in')
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug Page</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Current State */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Current State</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">User:</h3>
                <pre className="bg-muted p-2 rounded text-sm overflow-auto">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>
              
              <div>
                <h3 className="font-medium">Widgets ({widgets.length}):</h3>
                <pre className="bg-muted p-2 rounded text-sm overflow-auto max-h-40">
                  {JSON.stringify(widgets, null, 2)}
                </pre>
              </div>
              
              <div>
                <h3 className="font-medium">Projects ({projects.length}):</h3>
                <pre className="bg-muted p-2 rounded text-sm overflow-auto max-h-40">
                  {JSON.stringify(projects, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          {/* Test Actions */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
            
            <div className="space-y-4">
              <button
                onClick={testAddWidget}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Test Widget
              </button>
              
              <button
                onClick={testLogin}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Test Login
              </button>
              
              <button
                onClick={clearCanvas}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Clear Canvas
              </button>
            </div>

            <div className="mt-6 space-y-2">
              <h3 className="font-medium">Quick Links:</h3>
              <div className="space-y-2">
                <Link href="/" className="block text-blue-500 hover:underline">
                  → Landing Page
                </Link>
                <Link href="/builder" className="block text-blue-500 hover:underline">
                  → Builder
                </Link>
                <Link href="/templates" className="block text-blue-500 hover:underline">
                  → Templates
                </Link>
                <Link href="/auth" className="block text-blue-500 hover:underline">
                  → Auth
                </Link>
                <Link href="/dashboard" className="block text-blue-500 hover:underline">
                  → Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 