import Image from 'next/image'
import React from 'react'
interface Props {
  url: string | null
}

export const Cover = ({ url }: Props): JSX.Element => {
  return (
    <div className="relative min-h-[135px] overflow-hidden flex justify-center items-center">
      {url ? <Image alt="cover" src={url} fill={true} /> : ''}
    </div>
  )
}
