import { Layout } from '@/components/Layout'
import { PostCard } from '@/components/PostCard'
import { UserContextProvider } from '@/context/UserContext'
import { Post } from '@/types-interfaces/ChildrenType'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

export default function SavedPostP() {
  const [posts, setPosts] = useState<any>([])
  const session = useSession()
  const supabase = useSupabaseClient()
  useEffect(() => {
    if (!session?.user.id) {
      return
    }
    supabase
      .from('saved_posts')
      .select('post_id')
      .eq('user_id', session.user.id)
      .then((result: any) => {
        if (!result.data || !Array.isArray(result.data)) {
          // provjerite da li postoji niz prije pozivanja map() metode
          return
        }
        const postsIds = result.data.map((item: any) => item.post_id)
        supabase
          .from('posts')
          .select('*, profiles(*)')
          .in('id', postsIds)
          .then((result: any) => setPosts(result.data))
        console.log(result.data)
        console.log(postsIds)
      })
  }, [session?.user.id, supabase])
  return (
    <Layout>
      <UserContextProvider>
        <h1 className="text-5xl mb-4 text-gray-300">Your saved posts</h1>
        {posts.length > 0 &&
          posts.map((post: any) => (
            <div key={post.id}>
              <PostCard {...post} />
            </div>
          ))}
      </UserContextProvider>
    </Layout>
  )
}
