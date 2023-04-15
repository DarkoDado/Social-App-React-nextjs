import { ReactNode } from 'react'

export interface ChildrenType {
  children?: ReactNode
  noPadding?: boolean
  hideNavigation?: boolean
}

export interface Post {
  id?: number
  author?: string
  createdAt?: Date
  content?: string
}
