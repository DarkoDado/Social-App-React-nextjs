import { Layout } from '@/components/Layout'
import { PostCard } from '@/components/PostCard'
import { PostFormCard } from '@/components/PostFormCard'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useCallback, useEffect, useState } from 'react'
import LoginPage from './login'
import { Post, Profiles } from './../types-interfaces/ChildrenType'
import { UserContext } from '@/context/UserContext'

export default function Home() {
  const supabase = useSupabaseClient()
  const session = useSession()
  const [posts, setPosts] = useState<Post[]>([])
  const [profile, setProfile] = useState<Profiles | null>(null)

  const fetchPosts = useCallback(() => {
    supabase
      .from('posts')
      .select('id, content, created_at, profiles(id, avatar, name)')
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
  }, [session?.user.id, supabase, fetchPosts])

  if (!session) {
    return <LoginPage />
  }

  return (
    <Layout>
      <UserContext.Provider value={{ profile }}>
        <PostFormCard onPost={fetchPosts} />
        {posts?.length > 0 &&
          posts.map((post) => <PostCard key={post.id} {...post} />)}
      </UserContext.Provider>
    </Layout>
  )
}
