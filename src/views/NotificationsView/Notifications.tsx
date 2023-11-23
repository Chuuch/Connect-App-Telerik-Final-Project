
// type Props = {}?

import { MessageBox } from "../../components/MessageBox/MessageBox"
import { Messages } from "../../components/Messages/Messages"
import { Notifications } from "../../components/Notifications/Notifications"

export const NotificationsView = () => {
  return (
    <div className="bg-white flex flex-row items-start justify-start h-[845px]">
      <div className="h-full shadow-xl">
        <Notifications />
      </div>
    <div className="flex flex-col w-[1440px]">
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