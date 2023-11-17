

// type Props = {}

import { ChatHeader } from "../ChatHeader/ChatHeader"
import { Message } from "../Message/Message"

export const Chat = () => {
  return (
    <div  className="bg-white h-screen w-[1440px] items-start justify-center space-y-[740px]">
      <div className="border-b bg-white/30">
        <ChatHeader />
      </div>
        <div className="flex flex-row h-32 border-t">
          <Message />
        </div>
    </div>
  )
}