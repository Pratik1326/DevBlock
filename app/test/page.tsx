'use client'

import { useBuilderStore } from '@/lib/store'
import Link from 'next/link'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          🧪 Test Page
        </h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Tailwind CSS Test
            </h2>
            <p className="text-blue-700 dark:text-blue-300">
              If you can see this styled content, Tailwind CSS is working correctly!
            </p>
          </div>
          
          <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <h2 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              Color Test
            </h2>
            <p className="text-green-700 dark:text-green-300">
              This should have green styling applied.
            </p>
          </div>
          
          <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">
            <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Error Test
            </h2>
            <p className="text-red-700 dark:text-red-300">
              This should have red styling applied.
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
} 