
// type Props = {}?

import { MessageBox } from "../../components/MessageBox/MessageBox"
import { Messages } from "../../components/Messages/Messages"
import { Notifications } from "../../components/Notifications/Notifications"

export const NotificationsView = () => {
  return (
    <div className="bg-white flex flex-grow items-start justify-start">
      <div className="h-full shadow-xl">
        <Notifications />
      </div>
    <div className="flex flex-col w-full">
      <div className="h-[710px] border-l shadow-inner overflow-auto">
        <Messages />
      </div>
      <div className="border-l">
        <MessageBox />
      </div>
    </div>
    </div>
  )
}