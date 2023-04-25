import { Profiles } from '@/types-interfaces/ChildrenType'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { createContext, useEffect, useState } from 'react'
interface UserContextProps {
  profile:
    | {
        avatar: string
        name: string
        id: string
      }
    | Profiles
    | null
}
export const UserContext = createContext<UserContextProps>({
  profile: { avatar: '', name: '', id: '' },
})

export function UserContextProvider({ children }: any) {
  const [profile, setProfile] = useState(null)
  const session = useSession()
  const supabase = useSupabaseClient()

  useEffect(() => {
    if (!session?.user?.id) {
      return
    }
    supabase
      .from('profiles')
      .select()
      .eq('id', session.user.id)
      .then((result: any) => {
        setProfile(result.data[0])
      })
  }, [session?.user.id, supabase])

  return (
    <UserContext.Provider value={{ profile }}>{children}</UserContext.Provider>
  )
}
