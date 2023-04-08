import Card from '@/components/Card'
import { Layout } from '@/components/Layout'
import { ProfilePhoto } from '@/components/ProfilePhoto'
import Image from 'next/image'

export default function ProfilePage() {
  return (
    <Layout>
      <Card noPadding={true}>
        <div className="relative overflow-hidden rounded-md">
          <div className="relative min-h-[135px] overflow-hidden flex justify-center items-center">
            <Image
              alt="cover"
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80"
              fill={true}
            />
          </div>
          <div className="absolute top-20 left-4">
            <ProfilePhoto size={'big'} />
          </div>
          <div className="p-3 pb-24">
            <div className="ml-40">
              <h1 className="text-3xl font-bold">John Doe</h1>
              <div className="text-gray-500 loading-4">Stockholm, Sweden</div>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  )
}
