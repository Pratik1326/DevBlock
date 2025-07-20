'use client'

import { useBuilderStore } from '@/lib/store'
import Link from 'next/link'

export default function TestDragPage() {
  const { widgets, addWidget, clearCanvas } = useBuilderStore()

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

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Drag & Drop</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Current Widgets</h2>
            <p>Widget count: {widgets.length}</p>
            <button
              onClick={testAddWidget}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Add Test Widget
            </button>
            <button
              onClick={clearCanvas}
              className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Clear Canvas
            </button>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <div className="space-y-2">
              <Link href="/" className="block text-blue-500 hover:underline">
                → Landing Page
              </Link>
              <Link href="/builder" className="block text-blue-500 hover:underline">
                → Builder (Test Drag & Drop)
              </Link>
              <Link href="/templates" className="block text-blue-500 hover:underline">
                → Templates
              </Link>
              <Link href="/auth" className="block text-blue-500 hover:underline">
                → Auth
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 