import { ReactNode } from 'react'

export interface ChildrenType {
  children?: ReactNode
  noPadding?: boolean
  hideNavigation?: boolean
}

export interface Profiles {
  id?: number
  name: string | undefined
  place?: string
  avatar?: string
  cover?: string | null
}

export interface Post {
  id?: number
  content?: string
  created_at?: number | Date
  photos?: string[]
  profiles?: Profiles | null
  user_id?: string
}

export interface Post1 {
  id: number
  content: string
  created_at: Date
  photos: string[]
  profiles: Profiles[]
}
