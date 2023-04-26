import { Layout } from '@/components/Layout'
import { PostCard } from '@/components/PostCard'
import { PostFormCard } from '@/components/PostFormCard'
import { UserContext } from '@/context/UserContext'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useCallback, useEffect, useState } from 'react'
import { Post, Profiles } from './../types-interfaces/ChildrenType'
import LoginPage from './login'

export default function Home() {
  const supabase = useSupabaseClient()
  const session = useSession()
  const [posts, setPosts] = useState<Post[]>([])
  const [profile, setProfile] = useState<Profiles | null>(null)

  const fetchPosts = useCallback(() => {
    supabase
      .from('posts')
      .select('id, content, created_at, photos, profiles(id, avatar, name)')
      .is('parent', null)
      .order('created_at', { ascending: false })
      .then((result: any) => {
        console.log('posts', result)
        setPosts(result.data)
      })
  }, [supabase])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  useEffect(() => {
    if (!session?.user.id) {
      return
    }
    supabase
      .from('profiles')
      .select()
      .eq('id', session?.user.id)
      .then((result: any) => {
        console.log(result)
        if (result.data.length) {
          setProfile(result.data[0])
        }
      })
  }, [session?.user.id, supabase])

  if (!session) {
    return <LoginPage />
  }

  return (
    <Layout>
      <UserContext.Provider value={{ profile }}>
        <PostFormCard onPost={fetchPosts} />
        {posts?.length > 0 &&
          posts.map((post: Post) => <PostCard key={post.id} {...post} />)}
      </UserContext.Provider>
    </Layout>
  )
}
