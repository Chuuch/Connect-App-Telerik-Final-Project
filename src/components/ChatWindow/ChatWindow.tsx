

// type Props = {}

import { Conversations } from "../Conversations/Conversations"
import { MessageBox } from "../MessageBox/MessageBox"
import { Messages } from "../Messages/Messages"

export const ChatWindow = () => {
  return (
    <div className="flex bg-white">
      <div className="flex flex-col items-start justify-start h-[600px]">
        <Conversations />
      </div>
    <div className="h-full flex flex-col items-start justify-start">
      <div className="h-full w-fit">
        <Messages />
      </div>
      <div className="h-32 justify-end w-full">
        <MessageBox />
      </div>
    Co</div>
    </div>
  );
};