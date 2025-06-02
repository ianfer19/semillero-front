export interface Project {
  id: number
  name: string
  description: string
  status: 'active' | 'completed' | 'archived'
  createdAt: string
  updatedAt: string
} 