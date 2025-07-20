'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { AuthGuard } from '@/components/auth-guard'
import { Canvas } from '@/components/canvas'
import { WidgetSidebar } from '@/components/widget-sidebar'
import { PropertiesPanel } from '@/components/properties-panel'
import { Loading } from '@/components/loading'
import { useBuilderStore } from '@/lib/store'

export default function BuilderPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [projectId, setProjectId] = useState<string | null>(null)
  const [projectName, setProjectName] = useState<string>('')
  const searchParams = useSearchParams()
  const { loadTemplate, widgets, clearCanvas } = useBuilderStore()

  useEffect(() => {
    const project = searchParams.get('project')
    const template = searchParams.get('template')
    
    console.log('🔧 Builder: Loading with project:', project, 'template:', template)
    
    // Clear canvas first
    clearCanvas()
    
    if (project) {
      setProjectId(project)
      loadProjectData(project)
    } else if (template) {
      loadTemplateData(template)
    }
    
    // Simulate loading time for builder
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [searchParams, loadTemplate, clearCanvas])

  const loadProjectData = (projectId: string) => {
    console.log('🔧 Builder: Loading project data for ID:', projectId)
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      const user = JSON.parse(currentUser)
      const project = user.projects?.find((p: any) => p.id === projectId)
      
      if (project) {
        console.log('🔧 Builder: Found project:', project)
        setProjectName(project.name)
        if (project.widgets && project.widgets.length > 0) {
          console.log('🔧 Builder: Loading project widgets:', project.widgets.length)
          loadTemplate(project.widgets)
        } else {
          console.log('🔧 Builder: No widgets found in project')
        }
      } else {
        console.log('🔧 Builder: Project not found')
      }
    } else {
      console.log('🔧 Builder: No current user found')
    }
  }

  const loadTemplateData = (templateId: string) => {
    console.log('🔧 Builder: Loading template data for ID:', templateId)
    // Template data from templates page
    const templates: Record<string, any[]> = {
      dashboard: [
        {
          id: 'header-1',
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
          id: 'metric-1',
          type: 'text' as const,
          position: { x: 50, y: 120 },
          size: { width: 200, height: 100 },
          properties: {
            text: 'Total Revenue\n$124,563',
            fontSize: 16,
            fontWeight: 'normal',
            textColor: '#1f2937',
            backgroundColor: '#f3f4f6',
            borderRadius: 8
          }
        },
        {
          id: 'metric-2',
          type: 'text' as const,
          position: { x: 280, y: 120 },
          size: { width: 200, height: 100 },
          properties: {
            text: 'Active Users\n2,847',
            fontSize: 16,
            fontWeight: 'normal',
            textColor: '#1f2937',
            backgroundColor: '#f3f4f6',
            borderRadius: 8
          }
        },
        {
          id: 'chart-area',
          type: 'text' as const,
          position: { x: 50, y: 250 },
          size: { width: 600, height: 300 },
          properties: {
            text: '📈 Revenue Chart\n\nThis area would contain an interactive chart showing revenue trends over time.',
            fontSize: 14,
            fontWeight: 'normal',
            textColor: '#1f2937',
            backgroundColor: '#ffffff',
            borderRadius: 8
          }
        }
      ],
      landing: [
        {
          id: 'hero-title',
          type: 'text' as const,
          position: { x: 100, y: 100 },
          size: { width: 500, height: 80 },
          properties: {
            text: 'Build Amazing Apps\nWith DevBlocks',
            fontSize: 32,
            fontWeight: 'bold',
            textColor: '#1f2937',
            backgroundColor: 'transparent',
            borderRadius: 0
          }
        },
        {
          id: 'hero-subtitle',
          type: 'text' as const,
          position: { x: 100, y: 200 },
          size: { width: 400, height: 60 },
          properties: {
            text: 'Create beautiful, responsive applications with our intuitive drag-and-drop builder.',
            fontSize: 18,
            fontWeight: 'normal',
            textColor: '#6b7280',
            backgroundColor: 'transparent',
            borderRadius: 0
          }
        },
        {
          id: 'cta-button',
          type: 'text' as const,
          position: { x: 100, y: 300 },
          size: { width: 150, height: 50 },
          properties: {
            text: 'Get Started',
            fontSize: 16,
            fontWeight: 'bold',
            textColor: '#ffffff',
            backgroundColor: '#3b82f6',
            borderRadius: 8
          }
        }
      ],
      ecommerce: [
        {
          id: 'store-header',
          type: 'text' as const,
          position: { x: 50, y: 30 },
          size: { width: 300, height: 60 },
          properties: {
            text: 'DevBlocks Store',
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
            text: 'Product 1\n\n$29.99\n\nAdd to Cart',
            fontSize: 16,
            fontWeight: 'normal',
            textColor: '#1f2937',
            backgroundColor: '#f9fafb',
            borderRadius: 8
          }
        },
        {
          id: 'product-2',
          type: 'text' as const,
          position: { x: 320, y: 120 },
          size: { width: 250, height: 300 },
          properties: {
            text: 'Product 2\n\n$39.99\n\nAdd to Cart',
            fontSize: 16,
            fontWeight: 'normal',
            textColor: '#1f2937',
            backgroundColor: '#f9fafb',
            borderRadius: 8
          }
        }
      ],
      portfolio: [
        {
          id: 'name-title',
          type: 'text' as const,
          position: { x: 100, y: 100 },
          size: { width: 400, height: 60 },
          properties: {
            text: 'John Doe\nFull Stack Developer',
            fontSize: 28,
            fontWeight: 'bold',
            textColor: '#1f2937',
            backgroundColor: 'transparent',
            borderRadius: 0
          }
        },
        {
          id: 'about-section',
          type: 'text' as const,
          position: { x: 100, y: 200 },
          size: { width: 400, height: 150 },
          properties: {
            text: 'About Me\n\nPassionate developer with 5+ years of experience building web applications. Specialized in React, Node.js, and modern web technologies.',
            fontSize: 16,
            fontWeight: 'normal',
            textColor: '#374151',
            backgroundColor: '#f3f4f6',
            borderRadius: 8
          }
        }
      ],
      blog: [
        {
          id: 'blog-header',
          type: 'text' as const,
          position: { x: 50, y: 30 },
          size: { width: 300, height: 60 },
          properties: {
            text: 'My Blog',
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
          size: { width: 600, height: 200 },
          properties: {
            text: 'Getting Started with DevBlocks\n\nLearn how to build your first application using our intuitive drag-and-drop builder...',
            fontSize: 16,
            fontWeight: 'normal',
            textColor: '#1f2937',
            backgroundColor: '#ffffff',
            borderRadius: 8
          }
        }
      ],
      contact: [
        {
          id: 'contact-title',
          type: 'text' as const,
          position: { x: 100, y: 50 },
          size: { width: 300, height: 60 },
          properties: {
            text: 'Contact Us',
            fontSize: 28,
            fontWeight: 'bold',
            textColor: '#1f2937',
            backgroundColor: 'transparent',
            borderRadius: 0
          }
        },
        {
          id: 'contact-form',
          type: 'text' as const,
          position: { x: 100, y: 150 },
          size: { width: 400, height: 300 },
          properties: {
            text: 'Contact Form\n\nName: [Input Field]\nEmail: [Input Field]\nMessage: [Text Area]\n\n[Submit Button]',
            fontSize: 16,
            fontWeight: 'normal',
            textColor: '#1f2937',
            backgroundColor: '#f9fafb',
            borderRadius: 8
          }
        }
      ]
    }

    const templateData = templates[templateId]
    if (templateData) {
      console.log('🔧 Builder: Loading template widgets:', templateData.length)
      loadTemplate(templateData as any)
      setProjectName(`${templateId.charAt(0).toUpperCase() + templateId.slice(1)} Template`)
    } else {
      console.log('🔧 Builder: Template not found:', templateId)
    }
  }

  if (isLoading) {
    return <Loading message="Loading DevBlocks Builder..." isVisible={true} />
  }

  return (
    <AuthGuard>
      <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">DB</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  DevBlocks Builder
                </h2>
              </div>
              {projectName && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {projectName}
                </span>
              )}
              {projectId && (
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  ID: {projectId}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {widgets.length} widget{widgets.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-16">
          <WidgetSidebar />
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col pt-16">
          <Canvas />
        </div>

        {/* Properties Panel */}
        <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 pt-16">
          <PropertiesPanel />
        </div>
      </div>
    </AuthGuard>
  )
} 