import { Layout } from '@/components/Layout'
import { PostCard } from '@/components/PostCard'
import { PostFormCard } from '@/components/PostFormCard'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import LoginPage from './login'
import { Post } from './../types-interfaces/ChildrenType'

export default function Home() {
  const supabase = useSupabaseClient()
  const session = useSession()
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
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

  if (!session) {
    return <LoginPage />
  }

  return (
    <Layout>
      <PostFormCard />
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </Layout>
  )
}
