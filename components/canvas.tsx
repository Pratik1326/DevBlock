'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useBuilderStore } from '@/lib/store'
import { WidgetRenderer } from './widget-renderer'

// Throttle function for resize handling
function throttle<T extends (...args: any[]) => any>(func: T, delay: number): T {
  let timeoutId: NodeJS.Timeout | null = null
  return ((...args: any[]) => {
    if (timeoutId) return
    timeoutId = setTimeout(() => {
      func(...args)
      timeoutId = null
    }, delay)
  }) as T
}

export function Canvas() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const { widgets, selectedWidget, selectWidget, updateWidget, addWidget, removeWidget, clearCanvas: clearCanvasStore } = useBuilderStore()
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 })
  const [isResizing, setIsResizing] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [copiedWidget, setCopiedWidget] = useState<any>(null)

  // Debug logging
  useEffect(() => {
    console.log('🎨 Canvas: Widgets count:', widgets.length)
  }, [widgets])

  // Throttled resize handler
  const handleResize = useCallback(
    throttle(() => {
      if (!canvasRef.current) return
      
      const rect = canvasRef.current.getBoundingClientRect()
      const newWidth = Math.max(800, Math.min(3000, rect.width))
      const newHeight = Math.max(600, Math.min(2000, rect.height))
      
      setCanvasSize({ width: newWidth, height: newHeight })
      setIsResizing(false)
    }, 100),
    []
  )

  // Resize observer for canvas size changes
  useEffect(() => {
    if (!canvasRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        
        if (width > 2500 || height > 1500) {
          setIsResizing(true)
          handleResize()
        }
      }
    })

    resizeObserver.observe(canvasRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [handleResize])

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      selectWidget(null)
    }
  }

  const handleWidgetClick = (e: React.MouseEvent, widgetId: string) => {
    e.stopPropagation()
    selectWidget(widgetId)
  }

  const handleWidgetDragStart = (e: React.DragEvent, widgetId: string) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
    selectWidget(widgetId)
  }

  const handleWidgetDragEnd = (e: React.DragEvent) => {
    setIsDragging(false)
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect && selectedWidget) {
      const widget = widgets.find(w => w.id === selectedWidget)
      if (widget) {
        const newX = e.clientX - rect.left
        const newY = e.clientY - rect.top
        updateWidget(selectedWidget, {
          position: { x: newX, y: newY }
        })
      }
    }
  }

  // Enhanced keyboard shortcuts
  const handleKeyDown = (e: KeyboardEvent) => {
    // Prevent shortcuts when typing in input fields
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return
    }

    if (selectedWidget) {
      const widget = widgets.find(w => w.id === selectedWidget)
      if (widget) {
        const { position } = widget
        let newPosition = { ...position }

        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault()
            newPosition.x -= e.shiftKey ? 10 : 1
            break
          case 'ArrowRight':
            e.preventDefault()
            newPosition.x += e.shiftKey ? 10 : 1
            break
          case 'ArrowUp':
            e.preventDefault()
            newPosition.y -= e.shiftKey ? 10 : 1
            break
          case 'ArrowDown':
            e.preventDefault()
            newPosition.y += e.shiftKey ? 10 : 1
            break
          case 'Delete':
          case 'Backspace':
            e.preventDefault()
            removeWidget(selectedWidget)
            break
        }

        updateWidget(selectedWidget, { position: newPosition })
      }
    }

    // Global keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'c':
          e.preventDefault()
          if (selectedWidget) {
            const widget = widgets.find(w => w.id === selectedWidget)
            if (widget) {
              setCopiedWidget({ ...widget, id: `copy-${Date.now()}` })
              console.log('📋 Copied widget:', widget)
            }
          }
          break
        case 'v':
          e.preventDefault()
          if (copiedWidget) {
            const newWidget = {
              ...copiedWidget,
              id: `widget-${Date.now()}`,
              position: { x: copiedWidget.position.x + 20, y: copiedWidget.position.y + 20 }
            }
            addWidget(newWidget)
            selectWidget(newWidget.id)
            console.log('📋 Pasted widget:', newWidget)
          }
          break
        case 'x':
          e.preventDefault()
          if (selectedWidget) {
            const widget = widgets.find(w => w.id === selectedWidget)
            if (widget) {
              setCopiedWidget({ ...widget, id: `copy-${Date.now()}` })
              removeWidget(selectedWidget)
              console.log('✂️ Cut widget:', widget)
            }
          }
          break
        case 'a':
          e.preventDefault()
          // Select all widgets (future feature)
          console.log('📋 Select all (future feature)')
          break
        case 'z':
          e.preventDefault()
          // Undo (future feature)
          console.log('↶ Undo (future feature)')
          break
        case 'y':
          e.preventDefault()
          // Redo (future feature)
          console.log('↷ Redo (future feature)')
          break
        case 'd':
          e.preventDefault()
          if (selectedWidget) {
            const widget = widgets.find(w => w.id === selectedWidget)
            if (widget) {
              const newWidget = {
                ...widget,
                id: `widget-${Date.now()}`,
                position: { x: widget.position.x + 20, y: widget.position.y + 20 }
              }
              addWidget(newWidget)
              selectWidget(newWidget.id)
              console.log('📋 Duplicated widget:', newWidget)
            }
          }
          break
      }
    }

    // Escape key to deselect
    if (e.key === 'Escape') {
      selectWidget(null)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedWidget, widgets, copiedWidget])

  const clearCanvas = () => {
    setShowClearConfirm(true)
  }

  const confirmClear = () => {
    clearCanvasStore()
    setShowClearConfirm(false)
  }

  const cancelClear = () => {
    setShowClearConfirm(false)
  }

  // Optimized background pattern based on canvas size
  const getBackgroundStyle = () => {
    const isLarge = canvasSize.width > 2000 || canvasSize.height > 1200
    
    return {
      backgroundImage: `radial-gradient(circle, #9ca3af 1px, transparent 1px)`,
      backgroundSize: isLarge ? '40px 40px' : '20px 20px',
      backgroundPosition: '0 0',
      minWidth: '800px',
      minHeight: '600px',
      maxWidth: '3000px',
      maxHeight: '2000px'
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Clean Professional Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">DB</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                DevBlocks Canvas
              </h2>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {widgets.length} widget{widgets.length !== 1 ? 's' : ''}
            </div>
            {selectedWidget && (
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Selected widget
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={clearCanvas}
              className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Clear All</span>
            </button>
          </div>
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="mr-4">⌘C: Copy</span>
          <span className="mr-4">⌘V: Paste</span>
          <span className="mr-4">⌘X: Cut</span>
          <span className="mr-4">⌘D: Duplicate</span>
          <span className="mr-4">Delete: Remove</span>
          <span className="mr-4">Arrow Keys: Move</span>
          <span>Shift+Arrow: Move 10px</span>
          {copiedWidget && (
            <span className="ml-4 text-green-600 dark:text-green-400">
              ✓ Widget copied
            </span>
          )}
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className={`flex-1 relative overflow-auto bg-white dark:bg-gray-800 ${
          isResizing ? 'pointer-events-none' : ''
        }`}
        onClick={handleCanvasClick}
        style={getBackgroundStyle()}
      >
        {isResizing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="text-white text-lg">Resizing canvas...</div>
          </div>
        )}
        
        {widgets.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl text-gray-300 dark:text-gray-600 mb-4">+</div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">Drop Widgets Here</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Start building your app by clicking widgets from the sidebar
              </p>
            </div>
          </div>
        ) : (
          widgets.map((widget) => (
            <WidgetRenderer
              key={widget.id}
              widget={widget}
              isSelected={selectedWidget === widget.id}
              onClick={(e) => handleWidgetClick(e, widget.id)}
              onDragStart={(e) => handleWidgetDragStart(e, widget.id)}
              onDragEnd={handleWidgetDragEnd}
            />
          ))
        )}
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Clear Canvas
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to clear all widgets? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={confirmClear}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={cancelClear}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 