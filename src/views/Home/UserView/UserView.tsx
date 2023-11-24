

// interface User {}

import { UserProfile } from "../../UserProfile/UserProfile"

export const UserView = () => {
  return (
    <div className="flex items-center justify-center bg-white dark:bg-black w-full">
        <UserProfile />
    </div>
  )
}