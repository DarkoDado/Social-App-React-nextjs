import { ProfilePhoto } from './ProfilePhoto'

export default function FriendInfo() {
  return (
    <div className="flex gap-2">
      <ProfilePhoto />
      <div>
        <h3 className="font-bold text-xl">Jane Doe</h3>
        <div className="text-sm leading-3">5 mutual friends</div>
      </div>
    </div>
  )
}
