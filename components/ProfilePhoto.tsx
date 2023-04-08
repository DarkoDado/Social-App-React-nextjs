import Image from 'next/image'
import { ChildrenType } from '@/types-interfaces/ChildrenType'

export const ProfilePhoto = ({ size }: ChildrenType) => {
  let width = 'w-12'
  let height = 'h-12'
  if (size === 'big') {
    width = 'w-32'
    height = 'h-32'
  }
  return (
    <div className={`${width} ${height}`}>
      <Image
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyJTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        alt="profile"
        width={12}
        height={12}
        unoptimized
        className={`${width} ${height} rounded-full overflow-hidden `}
      />
    </div>
  )
}
