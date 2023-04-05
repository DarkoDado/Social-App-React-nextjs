import React from 'react'
import Card from './Card'
import { ProfilePhoto } from './ProfilePhoto'
import Image from 'next/image'

export const PostCard = () => {
  return (
    <Card>
      <div className="flex gap-3">
        <div>
          <ProfilePhoto />
        </div>
        <div>
          <p>
            <a className="font-semibold">John Doe</a> shared a
            <a className="text-socialBlue"> album</a>
          </p>
          <p className="text-gray-500 text-sm">2 hours ago</p>
        </div>
      </div>
      <div>
        <p className="my-3 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
          recusandae?
        </p>
        <div className="overflow-hidden">
          {/* flex items-center justify-center */}
          <Image
            src="https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=706&q=80"
            alt=""
            width={300}
            height={350}
            className="rounded-md"
          />
        </div>
      </div>
      <div className="mt-4">
        <button className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          72
        </button>
      </div>
    </Card>
  )
}
