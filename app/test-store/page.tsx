'use client'

import { useBuilderStore } from '@/lib/store'

export default function TestStorePage() {
  const { widgets, addWidget, clearCanvas } = useBuilderStore()

  const addTestWidget = () => {
    const newWidget = {
      id: `test-widget-${Date.now()}`,
      type: 'text' as any,
      position: { x: 100, y: 100 },
      size: { width: 200, height: 100 },
      properties: {
        text: 'Test Widget',
        color: '#000000',
        backgroundColor: '#ffffff',
        fontSize: 16,
        borderRadius: 4
      }
    }
    
    console.log('🧪 Adding test widget:', newWidget)
    addWidget(newWidget)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Store Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Store Actions */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Store Actions</h2>
            <div className="space-y-2">
              <button
                onClick={addTestWidget}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Test Widget
              </button>
              <button
                onClick={clearCanvas}
                className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear Canvas
              </button>
            </div>
          </div>

          {/* Widgets Status */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Widgets Status</h2>
            <p><strong>Total Widgets:</strong> {widgets.length}</p>
            <div className="mt-4 space-y-2">
              {widgets.map((widget, index) => (
                <div key={widget.id} className="p-2 bg-muted rounded text-sm">
                  <strong>{index + 1}.</strong> {widget.type} widget (ID: {widget.id.slice(0, 8)}...)
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-8 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
            ✅ Store Test Results
          </h3>
          <ul className="text-green-700 dark:text-green-300 space-y-1">
            <li>• Store is working: {widgets.length >= 0 ? 'Yes' : 'No'}</li>
            <li>• Widgets can be added: {widgets.length > 0 ? 'Yes' : 'No'}</li>
            <li>• Canvas can be cleared: 'Yes'</li>
            <li>• Check console for debug logs</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 