import Card from '@/components/Card'
import { Cover } from '@/components/Cover'
import FriendInfo from '@/components/FriendInfo'
import { Layout } from '@/components/Layout'
import { PostCard } from '@/components/PostCard'
import { ProfilePhoto } from '@/components/ProfilePhoto'
import { Profiles } from '@/types-interfaces/ChildrenType'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profiles | null>(null)
  const router = useRouter()
  const userId = router.query.id
  const session = useSession()
  const { asPath: pathname } = router
  const supabase = useSupabaseClient()

  const fetchUser = useCallback(() => {
    supabase
      .from('profiles')
      .select()
      .eq('id', userId)
      .then((result: any) => {
        if (result.error) {
          throw result.error
        }
        if (result.data) {
          setProfile(result.data[0])
        }
      })
  }, [supabase, userId])

  useEffect(() => {
    if (!userId) {
      return
    }
    fetchUser()
  }, [fetchUser, userId])

  const isPosts = pathname.includes('posts') || pathname === '/profile'
  const isAbout = pathname.includes('about')
  const isFriends = pathname.includes('friends')
  const isPhotos = pathname.includes('photos')
  const tabClasses = 'flex gap-1 px-3 py-1 items-center'
  const activeTabClasses =
    'flex gap-1 px-3 py-1 items-center bg-socialBlue text-white rounded-md shadow-md shadow-gray-300'

  const isMyUser = userId === session?.user?.id

  return (
    <Layout>
      <Card noPadding={true}>
        <div className="relative overflow-hidden rounded-md">
          <Cover
            url={profile ? profile.cover : ''}
            editable={isMyUser}
            onChange={fetchUser}
          />
          <div className="absolute top-20 left-4 z-15">
            {profile && <ProfilePhoto size={'big'} url={profile.avatar} />}
          </div>
          <div className="p-4 pt-1 md:pt-4">
            <div className="ml-28 md:ml-40">
              <h1 className="text-3xl font-bold">{profile?.name}</h1>
              <div className="text-gray-500 loading-4">{profile?.place}</div>
            </div>
            <div className="mt-4 md:mt-7 flex gap-1">
              <Link
                href={'/profile/posts'}
                className={isPosts ? activeTabClasses : tabClasses} // bg-blue-400 bg-opacity-20 rounded-t-md // border-socialBlue border-b-4 text-blue-600
              >
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                <span className="hidden sm:block">Posts</span>
              </Link>
              <Link
                href={'/profile/about'}
                className={isAbout ? activeTabClasses : tabClasses}
              >
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
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <span className="hidden sm:block">About</span>
              </Link>
              <Link
                href={'/profile/friends'}
                className={isFriends ? activeTabClasses : tabClasses}
              >
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
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
                <span className="hidden sm:block">Friends</span>
              </Link>
              <Link
                href={'/profile/photos'}
                className={isPhotos ? activeTabClasses : tabClasses}
              >
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
                <span className="hidden sm:block">Photos</span>
              </Link>
            </div>
          </div>
        </div>
      </Card>
      {isPosts && <PostCard />}
      {isAbout && (
        <div>
          <Card>
            <h2 className="text-3xl mb-3">About me</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea harum
              neque pariatur, facere deserunt quae?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ad
              quas quasi, est laboriosam dolor sapiente doloremque, id minima
              quaerat consequatur esse.
            </p>
          </Card>
        </div>
      )}
      {isFriends && (
        <div>
          <Card>
            <h2 className="text-3xl mb-2">Friends</h2>
            <div className="">
              <div className="border-b border-b-gray-200 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-200 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-200 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-200 p-4 -mx-4">
                <FriendInfo />
              </div>
            </div>
          </Card>
        </div>
      )}
      {isPhotos && (
        <div>
          <Card>
            <div className="grid md:grid-cols-2 gap-4 ">
              <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1678116084010-1c4f3502c49d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  alt=""
                  width={500}
                  height={100}
                />
              </div>
              <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1678116084010-1c4f3502c49d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  alt=""
                  width={500}
                  height={100}
                />
              </div>
              <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1678116084010-1c4f3502c49d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  alt=""
                  width={500}
                  height={100}
                />
              </div>
              <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1678116084010-1c4f3502c49d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  alt=""
                  width={500}
                  height={100}
                />
              </div>
            </div>
          </Card>
        </div>
      )}
    </Layout>
  )
}
