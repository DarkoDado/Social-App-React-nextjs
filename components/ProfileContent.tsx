import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Image from 'next/image'
import { SetStateAction, useCallback, useEffect, useState } from 'react'
import Card from './Card'
import FriendInfo from './FriendInfo'
import { PostCard } from './PostCard'

interface Post {
  id: number
  content: string
  created_at: number
  author: string
}

interface Props {
  activeTab: string
  userId?: string | string[]
}
export default function ProfileContent({ activeTab, userId }: Props) {
  const [posts, setPosts] = useState<Post[]>([])
  const [profile, setProfile] = useState(null)
  const supabase = useSupabaseClient()

  const userPosts = useCallback(
    async (userId: Props['userId']) => {
      const { data } = await supabase
        .from('posts')
        .select('id, content, created_at, author')
        .eq('author', userId)
      return data
    },
    [supabase]
  )

  const userProfile = useCallback(
    async (userId: string | string[]) => {
      const { data } = await supabase.from('profiles').select().eq('id', userId)
      return data?.[0]
    },
    [supabase]
  )

  useEffect(() => {
    async function loadPosts() {
      if (!userId) {
        return
      }
      if (activeTab === 'posts') {
        try {
          const posts = await userPosts(userId)
          setPosts(posts ?? [])

          const profile = await userProfile(userId)
          setProfile(profile as SetStateAction<null>)
        } catch (error) {
          console.error(error)
        }
      }
    }
    loadPosts()
  }, [userId, activeTab, userPosts, userProfile])

  //   async function loadPosts() {
  //     if (!userId) {
  //       return
  //     }
  //     try {
  //       const posts = await userPosts(userId)
  //       setPosts(posts ?? [])

  //       const profile = await userProfile(userId)
  //       setProfile(profile as SetStateAction<null>)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  return (
    <div>
      {activeTab === 'posts' && (
        <div>
          {posts.length > 0 &&
            posts.map((post) => (
              <PostCard {...post} key={post.created_at} profiles={profile} />
            ))}
        </div>
      )}
      {activeTab === 'about' && (
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
      {activeTab === 'friends' && (
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
      {activeTab === 'photos' && (
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
    </div>
  )
}
