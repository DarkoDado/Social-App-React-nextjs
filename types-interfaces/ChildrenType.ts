import { ReactNode } from 'react'

export interface ChildrenType {
  children?: ReactNode
  noPadding?: boolean
  hideNavigation?: boolean
}

// export interface Profiles {
//   avatar: string
//   id: string
//   name: string
// } | null

export interface Profiles {
  id: number
  avatar: string
  name: string
  cover: string
  place: string
}

export interface Post {
  id?: number
  content?: string
  created_at?: Date
  photos?: string[]
  profiles?: Profiles
}

export interface Post1 {
  id: number
  content: string
  created_at: Date
  photos: string[]
  profiles: Profiles[]
}
