import { UserContext } from '@/context/UserContext'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useContext, useState } from 'react'
import Card from './Card'
import { ProfilePhoto } from './ProfilePhoto'
import Image from 'next/image'
import { Spinner } from './Spinner'

// interface Profile {
//   id: number
//   avatar: string
//   name: string
// }

// interface PostgrestResponse<T> {
//   data: T[]
//   error: Error | null
//   status: number
//   statusText: string
//   count: number | null
// }ate

interface onPost {
  onPost(): void
}

export const PostFormCard = ({ onPost }: onPost) => {
  // const [profile, setProfile] = useState<Profile | null>(null)
  const [content, setContent] = useState<string>('')
  const [uploads, setUploads] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState<boolean>(true)
  const supabase = useSupabaseClient()
  const session = useSession()
  const { profile } = useContext(UserContext)
  // useEffect(() => {
  //   // alert(session?.user.id)
  //   supabase
  //     .from('profiles')
  //     .select()
  //     .eq('id', session?.user.id)
  //     .then((result: any) => {
  //       console.log(result)
  //       if (result.data.length) {
  //         setProfile(result.data[0])
  //       }
  //     })
  // }, [session?.user.id, supabase])

  function createPost() {
    supabase
      .from('posts')
      .insert({
        author: session?.user.id,
        content,
      })
      .then((response) => {
        if (!response.error) {
          setContent('')
          if (onPost) {
            onPost()
          }
        }
      })
  }

  const addPhoto = (e: any) => {
    const files = e.target.files
    for (const file of files) {
      const newName = Date.now() + file.name
      supabase.storage
        .from('photos')
        .upload(newName, file)
        .then((result) => {
          console.log(result)
          if (result.data) {
            const url =
              process.env.NEXT_PUBLIC_SUPABASE_URL +
              '/storage/v1/object/public/photos/' +
              result.data.path
            setUploads((prevUploads) => [...prevUploads, url])
          }
        })
    }
  }

  // https://lrhxgwvgpvjfbkisrvaq.supabase.co/storage/v1/object/public/photos/1681713116896etnoselo.jpg?t=2023-04-17T06%3A43%3A54.369Z
  // https://lrhxgwvgpvjfbkisrvaq.supabase.co/storage/v1/object/public/photos/1681713116896etnoselo.jpg?t=2023-04-17T07%3A42%3A15.216Z

  return (
    <Card>
      <div className="flex gap-3">
        <div>{profile && <ProfilePhoto url={profile.avatar} />}</div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="grow p-3 h-12"
          placeholder={
            profile
              ? `Whats on your mind, ${profile.name} ?`
              : 'Waiting for profile info...'
          }
        />
      </div>
      {isUploading && (
        <div className="my-4 flex justify-center">
          <Spinner />
        </div>
      )}
      {uploads.length > 0 && (
        <div className="flex gap-3">
          {uploads.map((upload) => (
            <div key={upload}>
              <Image
                height={22}
                width={120}
                src={upload}
                alt=""
                className="rounded-md mt-2"
                unoptimized
              />
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-5 items-center">
        <div>
          <label className="flex gap-1 mt-3 cursor-pointer">
            <input
              type="file"
              className="hidden"
              multiple
              onChange={addPhoto}
            />
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
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>

            <span className="hidden md:block">Photos</span>
          </label>
        </div>

        <div>
          <button className="flex gap-1 mt-3">
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
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <span className="hidden md:block">People</span>
          </button>
        </div>
        <div className="flex gap-5 items-center">
          <div>
            <button className="flex gap-1 mt-3">
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
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span className="hidden md:block">Check in</span>
            </button>
          </div>
          <div>
            <button className="flex gap-1 mt-3">
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
                  d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                />
              </svg>
              <span className="hidden md:block">Mood</span>
            </button>
          </div>
          <div className="grow text-right">
            <button
              onClick={createPost}
              className="mt-3 bg-socialBlue text-white px-5 py-1 rounded-md"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </Card>
  )
}
