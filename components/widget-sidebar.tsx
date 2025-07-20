'use client'

import { useState } from 'react'
import { useBuilderStore } from '@/lib/store'

const widgets = [
  {
    type: 'text',
    name: 'Text',
    description: 'Add text content',
    icon: 'T',
    category: 'CONTENT'
  },
  {
    type: 'input',
    name: 'Input',
    description: 'Add input field',
    icon: 'I',
    category: 'FORMS'
  },
  {
    type: 'button',
    name: 'Button',
    description: 'Add clickable button',
    icon: 'B',
    category: 'FORMS'
  },
  {
    type: 'table',
    name: 'Table',
    description: 'Add data table',
    icon: '⊞',
    category: 'DATA'
  },
  {
    type: 'card',
    name: 'Card',
    description: 'Add content card',
    icon: '□',
    category: 'CONTENT'
  },
  {
    type: 'container',
    name: 'Container',
    description: 'Add layout container',
    icon: '▤',
    category: 'LAYOUT'
  },
  {
    type: 'pen',
    name: 'Pen',
    description: 'Draw freehand',
    icon: '✏️',
    category: 'DRAWING'
  },
  {
    type: 'line',
    name: 'Line',
    description: 'Draw straight line',
    icon: '╱',
    category: 'DRAWING'
  }
]

const keyboardShortcuts = [
  { key: 'Ctrl+C', action: 'Copy selected widget' },
  { key: 'Ctrl+V', action: 'Paste widget' },
  { key: 'Ctrl+X', action: 'Cut selected widget' },
  { key: 'Delete', action: 'Delete selected widget' },
  { key: 'Ctrl+A', action: 'Select all widgets' },
  { key: 'Ctrl+Z', action: 'Undo last action' },
  { key: 'Ctrl+Y', action: 'Redo last action' },
  { key: 'Arrow Keys', action: 'Nudge selected widget' },
  { key: 'Shift+Click', action: 'Multi-select widgets' },
  { key: 'Space', action: 'Toggle pan mode' },
  { key: 'Escape', action: 'Deselect widget' },
  { key: 'F', action: 'Focus search' }
]

export function WidgetSidebar() {
  const { addWidget } = useBuilderStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [showQuickTips, setShowQuickTips] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)

  const handleAddWidget = (widgetType: string) => {
    console.log('🎯 WidgetSidebar: Adding widget type:', widgetType)
    const widget = {
      id: `widget-${Date.now()}`,
      type: widgetType as any,
      position: { x: 100, y: 100 },
      size: { width: 150, height: 50 },
      properties: {
        text: widgetType === 'text' ? 'Sample text' : '',
        label: widgetType === 'button' ? 'Button' : '',
        placeholder: widgetType === 'input' ? 'Enter text...' : '',
        color: '#000000',
        backgroundColor: '#ffffff',
        borderRadius: 4,
        fontSize: 16,
        columns: widgetType === 'table' ? ['Column 1', 'Column 2', 'Column 3'] : [],
        rows: widgetType === 'table' ? [
          ['Row 1 Cell 1', 'Row 1 Cell 2', 'Row 1 Cell 3'],
          ['Row 2 Cell 1', 'Row 2 Cell 2', 'Row 2 Cell 3']
        ] : []
      }
    }
    console.log('🎯 WidgetSidebar: Created widget:', widget)
    addWidget(widget)
    console.log('🎯 WidgetSidebar: Called addWidget')
    
    // Force a re-render by updating the store
    setTimeout(() => {
      console.log('🎯 WidgetSidebar: Current widgets in store:', useBuilderStore.getState().widgets.length)
    }, 100)
  }

  const filteredWidgets = widgets.filter(widget =>
    widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    widget.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const groupedWidgets = filteredWidgets.reduce((groups, widget) => {
    const category = widget.category
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(widget)
    return groups
  }, {} as Record<string, typeof widgets>)

  return (
    <div className="w-40 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Widgets</h2>
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-2 py-1 pl-7 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          />
          <svg className="absolute left-2 top-1.5 h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Widgets List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {Object.entries(groupedWidgets).map(([category, categoryWidgets]) => (
          <div key={category}>
            <h3 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
              {category}
            </h3>
            <div className="grid grid-cols-2 gap-1">
              {categoryWidgets.map((widget) => (
                <div
                  key={widget.type}
                  onClick={() => {
                    console.log('🎯 WidgetSidebar: Widget clicked:', widget.type)
                    handleAddWidget(widget.type)
                  }}
                  className="group relative p-2 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  title={`${widget.name} - ${widget.description}`}
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center text-white font-medium text-xs mx-auto">
                    {widget.icon}
                  </div>
                  
                  {/* Hover Tooltip */}
                  <div className="absolute left-full top-0 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    <div className="font-medium">{widget.name}</div>
                    <div className="text-gray-300">{widget.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tips Toggle */}
      <div className="p-2 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setShowQuickTips(!showQuickTips)}
          className="w-full flex items-center justify-between p-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <span>Tips</span>
          <svg className={`w-3 h-3 transition-transform ${showQuickTips ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showQuickTips && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded space-y-1">
            <p className="text-xs text-blue-700 dark:text-blue-300">Click to add widgets</p>
            <p className="text-xs text-blue-700 dark:text-blue-300">Drag to place precisely</p>
            <p className="text-xs text-blue-700 dark:text-blue-300">Use containers for layout</p>
          </div>
        )}

        {/* Keyboard Shortcuts Toggle */}
        <button
          onClick={() => setShowShortcuts(!showShortcuts)}
          className="w-full flex items-center justify-between p-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mt-1"
        >
          <span>Shortcuts</span>
          <svg className={`w-3 h-3 transition-transform ${showShortcuts ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showShortcuts && (
          <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded space-y-1 max-h-32 overflow-y-auto">
            {keyboardShortcuts.slice(0, 6).map((shortcut, index) => (
              <div key={index} className="flex justify-between text-xs">
                <span className="font-mono text-gray-600 dark:text-gray-400">{shortcut.key}</span>
                <span className="text-gray-500 dark:text-gray-500 text-xs">{shortcut.action}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 