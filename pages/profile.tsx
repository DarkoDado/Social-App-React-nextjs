import Card from '@/components/Card'
import { Cover } from '@/components/Cover'
import { Layout } from '@/components/Layout'
import ProfileContent from '@/components/ProfileContent'
import { ProfilePhoto } from '@/components/ProfilePhoto'
import ProfileTabs from '@/components/ProfileTabs'
import { UserContextProvider } from '@/context/UserContext'
import { Profiles } from '@/types-interfaces/ChildrenType'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profiles | null>(null)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [name, setName] = useState<string | undefined>('')
  const [place, setPlace] = useState<string | undefined>('')
  const router = useRouter()
  const tab = router?.query?.tab?.[0] || 'posts'

  const userId = router.query.id
  const session = useSession()

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

  function saveProfile() {
    const userId = session?.user.id
    const updatedData = { name, place }
    supabase
      .from('profiles')
      .update(updatedData)
      .eq('id', userId)
      .then((result) => {
        if (!result.error) {
          setProfile((prev) => ({ ...prev, ...updatedData }))
        }
        setEditMode(false)
      })
  }

  const isMyUser = userId === session?.user?.id

  return (
    <Layout>
      <UserContextProvider value={{ profile }}>
        <Card noPadding={true}>
          <div className="relative overflow-hidden rounded-md">
            <Cover
              url={profile?.cover ?? null}
              editable={isMyUser}
              onChange={fetchUser}
            />
            <div className="absolute top-20 left-4 z-15">
              {profile && (
                <ProfilePhoto
                  size={'big'}
                  url={profile.avatar}
                  editable={isMyUser}
                  onChange={fetchUser}
                />
              )}
            </div>
            <div className="p-4 pt-1 md:pt-4">
              <div className="ml-28 md:ml-40 flex justify-between">
                <div>
                  {editMode && (
                    <div>
                      <input
                        type="text"
                        className="border py-2 px-3 rounded-md"
                        placeholder={'Your name'}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </div>
                  )}
                  {!editMode && (
                    <h1 className="text-3xl font-bold">{profile?.name}</h1>
                  )}
                  {!editMode && (
                    <div className="text-gray-500 loading-4">
                      {profile?.place || 'Internet'}
                    </div>
                  )}
                  {editMode && (
                    <div>
                      <input
                        type="text"
                        className="border py-2 px-3 rounded-md mt-2"
                        placeholder={'Your location'}
                        onChange={(e) => setPlace(e.target.value)}
                        value={place}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex gap-2">
                    {isMyUser && !editMode && (
                      <button
                        onClick={() => {
                          setEditMode(true)
                          setName(profile?.name)
                          setPlace(profile?.place)
                        }}
                        className="flex gap-1 bg-white rounded-md shadow-sm shadow-gray-500 py-1 px-2 hover:bg-socialBlue hover:text-white transition-all"
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
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                        Edit profile
                      </button>
                    )}

                    {isMyUser && editMode && (
                      <div>
                        <button
                          onClick={() => setEditMode(false)}
                          className="flex gap-1 bg-white rounded-md shadow-sm shadow-gray-500 py-1 px-2 hover:bg-socialBlue hover:text-white transition-all"
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
                              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Cancel
                        </button>
                      </div>
                    )}
                    {isMyUser && editMode && (
                      <div className="mb-2">
                        <button
                          onClick={saveProfile}
                          className="flex gap-1 bg-white rounded-md shadow-sm shadow-gray-500 py-1 px-2 hover:bg-socialBlue hover:text-white transition-all"
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
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Save profile
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <ProfileTabs active={tab} userId={profile?.id} />
            </div>
          </div>
        </Card>
        <ProfileContent activeTab={tab} userId={userId} />
      </UserContextProvider>
    </Layout>
  )
}
