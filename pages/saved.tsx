import { Layout } from '@/components/Layout'
import { PostCard } from '@/components/PostCard'

export default function SavedPostP() {
  return (
    <Layout>
      <h1 className="text-5xl mb-4 text-gray-300">Your saved posts</h1>
      <PostCard />
      <PostCard />
    </Layout>
  )
}
