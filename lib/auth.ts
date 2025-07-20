// Simple mock authentication system
export interface User {
  id: string
  email: string
  name?: string
}

// Mock user storage
let currentUser: User | null = null

export const mockAuth = {
  // Sign in with email/password
  signInWithEmail: async (email: string, password: string): Promise<User> => {
    console.log('🔐 Mock email sign-in:', email)
    
    // Simple validation
    if (!email || !email.includes('@')) {
      throw new Error('Please enter a valid email address')
    }
    
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }
    
    // Mock successful login
    const user: User = {
      id: `user-${Date.now()}`,
      email,
      name: email.split('@')[0]
    }
    
    currentUser = user
    console.log('✅ Mock email sign-in successful:', user.email)
    return user
  },

  // Sign up with email/password
  signUpWithEmail: async (email: string, password: string): Promise<User> => {
    console.log('🔐 Mock email sign-up:', email)
    
    // Simple validation
    if (!email || !email.includes('@')) {
      throw new Error('Please enter a valid email address')
    }
    
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }
    
    // Mock successful signup
    const user: User = {
      id: `user-${Date.now()}`,
      email,
      name: email.split('@')[0]
    }
    
    currentUser = user
    console.log('✅ Mock email sign-up successful:', user.email)
    return user
  },

  // Sign in with Google
  signInWithGoogle: async (): Promise<User> => {
    console.log('🔐 Mock Google sign-in')
    
    // Simulate Google auth delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock successful Google login
    const user: User = {
      id: `google-user-${Date.now()}`,
      email: 'user@gmail.com',
      name: 'Google User'
    }
    
    currentUser = user
    console.log('✅ Mock Google sign-in successful:', user.email)
    return user
  },

  // Get current user
  getCurrentUser: (): User | null => {
    return currentUser
  },

  // Sign out
  signOut: async (): Promise<void> => {
    console.log('🔐 Mock sign-out')
    currentUser = null
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return currentUser !== null
  }
} 