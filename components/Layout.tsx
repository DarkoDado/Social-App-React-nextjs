import React from 'react'
import { NavigationCard } from './NavigationCard'
import { ChildrenType } from '@/types-interfaces/ChildrenType'

export const Layout = ({ children, hideNavigation }: ChildrenType) => {
  let rightColumnClasses = ''
  if (hideNavigation) {
    rightColumnClasses += 'w-full'
  } else {
    rightColumnClasses += 'mx-3 md:mx-0 md:w-9/12'
  }
  return (
    <div className="md:flex mt-4 max-w-4xl mx-auto gap-6 mb-24 md:mb-0">
      {!hideNavigation && (
        <div className="md:static w-full bottom-0 fixed md:w-3/12 -mb-5">
          <NavigationCard />
        </div>
      )}
      <div className={rightColumnClasses}>{children}</div>
    </div>
  )
}
