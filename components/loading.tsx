'use client'

import React, { useState, useEffect } from 'react'

interface LoadingProps {
  message?: string
  isVisible?: boolean
}

export function Loading({ message = "Loading DevBlocks...", isVisible = true }: LoadingProps) {
  const [dots, setDots] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots(prev => (prev + 1) % 4)
    }, 500)

    // Animate rotation
    const rotationInterval = setInterval(() => {
      setRotation(prev => prev + 2)
    }, 50)

    // Animate scale
    const scaleInterval = setInterval(() => {
      setScale(prev => prev === 1 ? 1.1 : 1)
    }, 1000)

    // Fade in
    const fadeIn = setTimeout(() => {
      setOpacity(1)
    }, 100)

    return () => {
      clearInterval(dotsInterval)
      clearInterval(rotationInterval)
      clearInterval(scaleInterval)
      clearTimeout(fadeIn)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center z-50"
      style={{ opacity, transition: 'opacity 0.3s ease-in-out' }}
    >
      <div className="text-center">
        {/* Logo Animation */}
        <div className="relative mb-8">
          <div 
            className="w-24 h-24 mx-auto relative"
            style={{ 
              transform: `rotate(${rotation}deg) scale(${scale})`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Main Logo Block */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-2xl flex items-center justify-center">
              <div className="text-white text-2xl font-bold">DB</div>
            </div>
            
            {/* Floating Blocks */}
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-md animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-md animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-red-400 rounded-md animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-pink-400 rounded-md animate-bounce" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-white text-xl font-semibold mb-4">
          {message}
          <span className="inline-block w-4 ml-1">
            {'.'.repeat(dots)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"
            style={{
              width: `${(dots + 1) * 25}%`,
              transition: 'width 0.5s ease-in-out'
            }}
          ></div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i <= dots ? 'bg-blue-400 scale-125' : 'bg-gray-500'
              }`}
              style={{
                animation: i <= dots ? 'pulse 1s infinite' : 'none'
              }}
            ></div>
          ))}
        </div>

        {/* Subtle Text */}
        <div className="text-gray-400 text-sm mt-4">
          Building your development experience
        </div>
      </div>
    </div>
  )
}

// Page Loading Component
export function PageLoading() {
  const [loadingSteps] = useState([
    "Initializing DevBlocks...",
    "Loading components...",
    "Setting up canvas...",
    "Preparing widgets...",
    "Almost ready..."
  ])
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 800)

    return () => clearInterval(interval)
  }, [loadingSteps.length])

  return (
    <Loading 
      message={loadingSteps[currentStep]} 
      isVisible={true}
    />
  )
} 