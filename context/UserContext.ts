import { Profiles } from '@/types-interfaces/ChildrenType'
import { createContext } from 'react'
interface UserContextProps {
  profile: Profiles | null
}
export const UserContext = createContext<UserContextProps>({
  profile: { avatar: '', name: '', id: '' },
})
