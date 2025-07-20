'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loading } from './loading'

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = localStorage.getItem('currentUser')
      const isAuth = !!currentUser
      
      setIsAuthenticated(isAuth)
      
      // Only redirect if we're sure about the auth state
      if (requireAuth && !isAuth) {
        // Add a small delay to prevent flash redirects
        setTimeout(() => {
          router.push('/auth')
        }, 100)
      } else if (!requireAuth && isAuth) {
        // Only redirect to dashboard if we're on auth page
        if (window.location.pathname === '/auth') {
          router.push('/dashboard')
        }
      } else {
        setLoading(false)
      }
    }

    // Add a small delay to ensure localStorage is available
    setTimeout(checkAuth, 50)
  }, [requireAuth, router])

  if (loading) {
    return <Loading message="Checking authentication..." isVisible={true} />
  }

  if (requireAuth && !isAuthenticated) {
    return null
  }

  if (!requireAuth && isAuthenticated) {
    return null
  }

  return <>{children}</>
} 