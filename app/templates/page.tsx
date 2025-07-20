'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthGuard } from '@/components/auth-guard'
import { Navigation } from '@/components/navigation'
import { Loading } from '@/components/loading'

interface Template {
  id: string
  name: string
  description: string
  category: string
  thumbnail: string
  widgets: any[]
  canvasSize: { width: number; height: number }
}

const templates: Template[] = [
  {
    id: 'dashboard',
    name: 'Analytics Dashboard',
    description: 'Complete dashboard with charts, metrics, and data visualization',
    category: 'Dashboard',
    thumbnail: '📊',
    canvasSize: { width: 1200, height: 800 },
    widgets: [
      {
        id: 'header-1',
        type: 'text',
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
        type: 'text',
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
        type: 'text',
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
        type: 'text',
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
    ]
  },
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Modern landing page with hero section, features, and CTA',
    category: 'Marketing',
    thumbnail: '🚀',
    canvasSize: { width: 1200, height: 1000 },
    widgets: [
      {
        id: 'hero-title',
        type: 'text',
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
        type: 'text',
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
        type: 'text',
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
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Store',
    description: 'Complete online store with product grid and shopping cart',
    category: 'E-commerce',
    thumbnail: '🛍️',
    canvasSize: { width: 1200, height: 900 },
    widgets: [
      {
        id: 'store-header',
        type: 'text',
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
        type: 'text',
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
        type: 'text',
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
    ]
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Professional portfolio with projects and contact information',
    category: 'Portfolio',
    thumbnail: '💼',
    canvasSize: { width: 1000, height: 800 },
    widgets: [
      {
        id: 'name-title',
        type: 'text',
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
        type: 'text',
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
    ]
  },
  {
    id: 'blog',
    name: 'Blog Layout',
    description: 'Clean blog layout with articles and sidebar',
    category: 'Content',
    thumbnail: '📝',
    canvasSize: { width: 1200, height: 800 },
    widgets: [
      {
        id: 'blog-header',
        type: 'text',
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
        type: 'text',
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
    ]
  },
  {
    id: 'contact',
    name: 'Contact Form',
    description: 'Professional contact page with form and information',
    category: 'Contact',
    thumbnail: '📞',
    canvasSize: { width: 800, height: 600 },
    widgets: [
      {
        id: 'contact-title',
        type: 'text',
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
        type: 'text',
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
]

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))]

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory)

  const handleUseTemplate = async (template: Template) => {
    setLoading(true)
    
    // Navigate to builder with the template ID
    setTimeout(() => {
      console.log('📋 Templates: Navigating to builder with template:', template.id)
      router.push(`/builder?template=${template.id}`)
    }, 1000)
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation currentPage="templates" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Templates</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Start with a pre-built design and customize it to your needs
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Template Preview */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="text-4xl mb-4">{template.thumbnail}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{template.category}</span>
                    <span>{template.widgets.length} widgets</span>
                  </div>
                </div>

                {/* Template Actions */}
                <div className="p-4">
                  <button
                    onClick={() => handleUseTemplate(template)}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Project...
                      </span>
                    ) : (
                      'Use Template'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No templates found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try selecting a different category or check back later for new templates.
              </p>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
} 