import { ReactNode } from 'react'

export interface ChildrenType {
  children?: ReactNode
  noPadding?: boolean
  hideNavigation?: boolean
}

export interface Profiles {
  avatar: string
  id: string
  name: string
  place: string
  cover: string
}

export interface Post {
  id?: number
  created_at?: Date
  content?: string
  profiles?: Profiles
  photos?: string[]
}
