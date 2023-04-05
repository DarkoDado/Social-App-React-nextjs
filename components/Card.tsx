import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

export default function Card({ children }: Props) {
  return (
    <div className="bg-white shadow-md shadow-gray-300 rounded-md p-4 mb-5">
      {children}
    </div>
  )
}
