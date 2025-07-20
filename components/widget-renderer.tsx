'use client'

import React, { useState, useCallback } from 'react'
import { Widget } from '@/lib/store'
import { useBuilderStore } from '@/lib/store'

interface WidgetRendererProps {
  widget: Widget
  isSelected?: boolean
  onClick?: (e: React.MouseEvent) => void
  onDragStart?: (e: React.DragEvent) => void
  onDragEnd?: (e: React.DragEvent) => void
}

export function WidgetRenderer({ widget, isSelected, onClick, onDragStart, onDragEnd }: WidgetRendererProps) {
  const { type, properties } = widget
  const { updateWidget, removeWidget } = useBuilderStore()
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string>('')

  const baseStyles = {
    padding: '12px',
    borderRadius: `${properties.borderRadius || 4}px`,
    color: properties.color || '#000000',
    backgroundColor: properties.backgroundColor || '#ffffff',
    fontSize: `${properties.fontSize || 16}px`,
    border: isSelected ? '2px solid #3b82f6' : '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter, system-ui, sans-serif',
    transition: 'all 0.2s ease',
    cursor: isResizing ? 'nw-resize' : 'pointer',
    position: 'absolute' as const,
    left: widget.position.x,
    top: widget.position.y,
    width: widget.size.width,
    height: widget.size.height,
    zIndex: isSelected ? 10 : 1,
    userSelect: 'none' as const
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick?.(e)
  }

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation()
    onDragStart?.(e)
  }

  const handleDragEnd = (e: React.DragEvent) => {
    e.stopPropagation()
    onDragEnd?.(e)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    removeWidget(widget.id)
  }

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation()
    setIsResizing(true)
    setResizeDirection(direction)
    
    const startX = e.clientX
    const startY = e.clientY
    const startWidth = widget.size.width
    const startHeight = widget.size.height
    const startLeft = widget.position.x
    const startTop = widget.position.y

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY

      let newWidth = startWidth
      let newHeight = startHeight
      let newLeft = startLeft
      let newTop = startTop

      switch (direction) {
        case 'se':
          newWidth = Math.max(50, startWidth + deltaX)
          newHeight = Math.max(50, startHeight + deltaY)
          break
        case 'sw':
          newWidth = Math.max(50, startWidth - deltaX)
          newHeight = Math.max(50, startHeight + deltaY)
          newLeft = startLeft + deltaX
          break
        case 'ne':
          newWidth = Math.max(50, startWidth + deltaX)
          newHeight = Math.max(50, startHeight - deltaY)
          newTop = startTop + deltaY
          break
        case 'nw':
          newWidth = Math.max(50, startWidth - deltaX)
          newHeight = Math.max(50, startHeight - deltaY)
          newLeft = startLeft + deltaX
          newTop = startTop + deltaY
          break
        case 'n':
          newHeight = Math.max(50, startHeight - deltaY)
          newTop = startTop + deltaY
          break
        case 's':
          newHeight = Math.max(50, startHeight + deltaY)
          break
        case 'w':
          newWidth = Math.max(50, startWidth - deltaX)
          newLeft = startLeft + deltaX
          break
        case 'e':
          newWidth = Math.max(50, startWidth + deltaX)
          break
      }

      updateWidget(widget.id, {
        size: { width: newWidth, height: newHeight },
        position: { x: newLeft, y: newTop }
      })
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      setResizeDirection('')
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const renderContent = () => {
    switch (type) {
      case 'text':
        return (
          <p className="text-center leading-relaxed">
            {properties.text || 'Sample Text'}
          </p>
        )

      case 'input':
        return (
          <input
            type="text"
            placeholder={properties.placeholder || 'Enter text...'}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: 'transparent',
              color: properties.color || '#000000',
              fontSize: `${properties.fontSize || 16}px`
            }}
          />
        )

      case 'button':
        return (
          <button
            className="px-4 py-2 rounded-md font-medium transition-colors hover:opacity-90"
            style={{
              backgroundColor: properties.backgroundColor || '#3b82f6',
              color: properties.color || '#ffffff',
              fontSize: `${properties.fontSize || 16}px`
            }}
          >
            {properties.label || 'Click Me'}
          </button>
        )

      case 'table':
        return (
          <div className="w-full h-full overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {properties.columns?.map((column, index) => (
                    <th key={index} className="border border-gray-300 px-3 py-2 text-left bg-gray-50">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {properties.rows?.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-300 px-3 py-2">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )

      case 'card':
        return (
          <div className="w-full h-full flex flex-col">
            <div className="flex-1 p-4">
              <h3 className="font-semibold mb-2">Card Title</h3>
              <p className="text-sm text-gray-600">
                {properties.text || 'This is a card component with customizable content.'}
              </p>
            </div>
            <div className="p-4 border-t border-gray-200">
              <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                Action
              </button>
            </div>
          </div>
        )

      case 'container':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl mb-2">📦</div>
              <p className="text-sm text-gray-600">Container</p>
              <p className="text-xs text-gray-400">Flexible layout container</p>
            </div>
          </div>
        )

      case 'pen':
        return (
          <svg
            width="100%"
            height="100%"
            style={{
              backgroundColor: 'transparent',
              border: 'none'
            }}
          >
            {properties.points && properties.points.length > 1 && (
              <polyline
                points={properties.points.map(p => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke={properties.strokeColor || '#000000'}
                strokeWidth={properties.strokeWidth || 2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        )

      case 'line':
        return (
          <svg
            width="100%"
            height="100%"
            style={{
              backgroundColor: 'transparent',
              border: 'none'
            }}
          >
            <line
              x1="10%"
              y1="50%"
              x2="90%"
              y2="50%"
              stroke={properties.strokeColor || '#000000'}
              strokeWidth={properties.strokeWidth || 2}
              strokeLinecap="round"
            />
          </svg>
        )

      default:
        return (
          <p>Unknown widget type: {type}</p>
        )
    }
  }

  return (
    <>
      <div
        style={baseStyles}
        onClick={handleClick}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {renderContent()}
      </div>

      {/* Delete Button - Only show when selected */}
      {isSelected && (
        <button
          onClick={handleDelete}
          className="absolute w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center z-30 transition-colors"
          style={{
            left: widget.position.x - 12,
            top: widget.position.y - 12
          }}
          title="Delete widget"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Resize Handles - Only show when selected */}
      {isSelected && (
        <>
          {/* Corner resize handles */}
          <div
            className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-nw-resize hover:bg-blue-600 transition-colors"
            style={{
              left: widget.position.x - 8,
              top: widget.position.y - 8,
              zIndex: 20
            }}
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
            title="Resize from top-left"
          />
          <div
            className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-ne-resize hover:bg-blue-600 transition-colors"
            style={{
              left: widget.position.x + widget.size.width - 8,
              top: widget.position.y - 8,
              zIndex: 20
            }}
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
            title="Resize from top-right"
          />
          <div
            className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-sw-resize hover:bg-blue-600 transition-colors"
            style={{
              left: widget.position.x - 8,
              top: widget.position.y + widget.size.height - 8,
              zIndex: 20
            }}
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
            title="Resize from bottom-left"
          />
          <div
            className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-se-resize hover:bg-blue-600 transition-colors"
            style={{
              left: widget.position.x + widget.size.width - 8,
              top: widget.position.y + widget.size.height - 8,
              zIndex: 20
            }}
            onMouseDown={(e) => handleResizeStart(e, 'se')}
            title="Resize from bottom-right"
          />

          {/* Edge resize handles */}
          <div
            className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-n-resize hover:bg-blue-600 transition-colors"
            style={{
              left: widget.position.x + widget.size.width / 2 - 8,
              top: widget.position.y - 8,
              zIndex: 20
            }}
            onMouseDown={(e) => handleResizeStart(e, 'n')}
            title="Resize from top"
          />
          <div
            className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-s-resize hover:bg-blue-600 transition-colors"
            style={{
              left: widget.position.x + widget.size.width / 2 - 8,
              top: widget.position.y + widget.size.height - 8,
              zIndex: 20
            }}
            onMouseDown={(e) => handleResizeStart(e, 's')}
            title="Resize from bottom"
          />
          <div
            className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-w-resize hover:bg-blue-600 transition-colors"
            style={{
              left: widget.position.x - 8,
              top: widget.position.y + widget.size.height / 2 - 8,
              zIndex: 20
            }}
            onMouseDown={(e) => handleResizeStart(e, 'w')}
            title="Resize from left"
          />
          <div
            className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-e-resize hover:bg-blue-600 transition-colors"
            style={{
              left: widget.position.x + widget.size.width - 8,
              top: widget.position.y + widget.size.height / 2 - 8,
              zIndex: 20
            }}
            onMouseDown={(e) => handleResizeStart(e, 'e')}
            title="Resize from right"
          />
        </>
      )}
    </>
  )
} 