import React from 'react'
import { NavigationCard } from './NavigationCard'
import { ChildrenType } from '@/types-interfaces/ChildrenType'

export const Layout = ({ children, hideNavigation }: ChildrenType) => {
  return (
    <div className="flex mt-4 max-w-4xl mx-auto gap-6">
      {!hideNavigation && (
        <div className="w-3/12">
          <NavigationCard />
        </div>
      )}
      <div className={hideNavigation ? 'w-full' : 'w-9/12'}>{children}</div>
    </div>
  )
}
