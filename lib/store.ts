import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Widget {
  id: string
  type: 'text' | 'input' | 'button' | 'table' | 'card' | 'container' | 'pen' | 'line'
  position: { x: number; y: number }
  size: { width: number; height: number }
  properties: {
    label?: string
    text?: string
    color?: string
    fontSize?: number
    backgroundColor?: string
    borderColor?: string
    borderRadius?: number
    placeholder?: string
    required?: boolean
    columns?: string[]
    rows?: string[][]
    strokeWidth?: number
    strokeColor?: string
    points?: { x: number; y: number }[]
  }
}

export interface Project {
  id: string
  name: string
  widgets: Widget[]
  createdAt: Date
  updatedAt: Date
}

interface BuilderState {
  // Canvas state
  widgets: Widget[]
  selectedWidget: string | null
  isPreviewMode: boolean
  canvasSize: { width: number; height: number }
  
  // User state
  user: any | null
  projects: Project[]
  
  // Actions
  addWidget: (widget: Widget) => void
  updateWidget: (id: string, updates: Partial<Widget>) => void
  removeWidget: (id: string) => void
  selectWidget: (id: string | null) => void
  setPreviewMode: (isPreview: boolean) => void
  clearCanvas: () => void
  loadTemplate: (template: Widget[]) => void
  setUser: (user: any | null) => void
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  removeProject: (id: string) => void
}

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set, get) => ({
      // Initial state
      widgets: [],
      selectedWidget: null,
      isPreviewMode: false,
      canvasSize: { width: 1200, height: 800 },
      
      // User state
      user: null,
      projects: [],
      
      // Actions
      addWidget: (widget) => {
        console.log('🏪 Store: Adding widget:', widget)
        set((state) => {
          const newState = {
            widgets: [...state.widgets, widget]
          }
          console.log('🏪 Store: New state widgets count:', newState.widgets.length)
          return newState
        })
      },
      
      updateWidget: (id, updates) => set((state) => ({
        widgets: state.widgets.map(widget =>
          widget.id === id ? { ...widget, ...updates } : widget
        )
      })),
      
      removeWidget: (id) => set((state) => ({
        widgets: state.widgets.filter(widget => widget.id !== id),
        selectedWidget: state.selectedWidget === id ? null : state.selectedWidget
      })),
      
      selectWidget: (id) => set({ selectedWidget: id }),
      
      setPreviewMode: (isPreview) => set({ isPreviewMode: isPreview }),
      
      clearCanvas: () => set({ widgets: [], selectedWidget: null }),
      
      loadTemplate: (template) => set({ widgets: template }),
      
      setUser: (user) => set({ user }),
      
      addProject: (project) => set((state) => ({
        projects: [...state.projects, project]
      })),
      
      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map(project =>
          project.id === id ? { ...project, ...updates } : project
        )
      })),
      
      removeProject: (id) => set((state) => ({
        projects: state.projects.filter(project => project.id !== id)
      })),
    }),
    {
      name: 'builder-storage',
      partialize: (state) => ({
        widgets: state.widgets,
        projects: state.projects,
        user: state.user,
      }),
    }
  )
) 