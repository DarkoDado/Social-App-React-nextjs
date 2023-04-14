import Image from 'next/image'
import { ChildrenType } from '@/types-interfaces/ChildrenType'
interface Props extends ChildrenType {
  url: any
}
export const ProfilePhoto = ({ size, url }: Props) => {
  let width = 'w-12'
  let height = 'h-12'
  if (size === 'big') {
    width = 'w-28 md:w-32'
    height = 'h-28 md:h-32'
  }
  return (
    <div className={`${width} ${height}`}>
      <Image
        src={url}
        alt="profile"
        width={12}
        height={12}
        unoptimized
        className={`${width} ${height} rounded-full overflow-hidden `}
      />
    </div>
  )
}
