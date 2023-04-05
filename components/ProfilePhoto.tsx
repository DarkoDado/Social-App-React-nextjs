import Image from 'next/image'
import React from 'react'

export const ProfilePhoto = () => {
  return (
    <div className="w-12 h-12 rounded-full overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        alt=""
        width={50}
        height={0}
        className="object-contain"
      />
    </div>
  )
}
