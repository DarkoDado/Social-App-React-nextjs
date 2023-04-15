import Image from 'next/image'

interface ProfilePhotoProps {
  url?: string
  size?: string
}
export const ProfilePhoto = ({ size, url }: ProfilePhotoProps) => {
  let width = 'w-12'
  let height = 'h-12'
  if (size === 'big') {
    width = 'w-28 md:w-32'
    height = 'h-28 md:h-32'
  }
  console.log(url)
  return (
    <div className={`${width} ${height}`}>
      {url && (
        <Image
          src={url}
          alt="profile"
          width={12}
          height={12}
          unoptimized
          className={`${width} ${height} rounded-full overflow-hidden `}
        />
      )}
    </div>
  )
}
