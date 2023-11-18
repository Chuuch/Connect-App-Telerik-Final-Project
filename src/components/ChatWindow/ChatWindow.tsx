

// type Props = {}

import { ChatHeader } from "../ChatHeader/ChatHeader"
import { MessageBox } from "../MessageBox/MessageBox"
import { Messages } from "../Messages/Messages"

export const ChatWindow = () => {
  return (
    <div className="bg-white h-screen w-full flex flex-col">
      <div className="border-b bg-white/30 w-full">
        <ChatHeader />
      </div>
      <div className="h-screen w-fit">
        <Messages />
      </div>
      <div className="h-32 justify-end w-full">
        <MessageBox />
      </div>
    </div>
  );
};