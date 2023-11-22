

// type Props = {}

import { Conversations } from "../Conversations/Conversations"
import { MessageBox } from "../MessageBox/MessageBox"
import { Messages } from "../Messages/Messages"

export const ChatWindow = () => {
  return (
    <div className="bg-white flex flex-row items-start justify-start h-[845px]">
      <div className="h-full shadow-xl">
        <Conversations />
      </div>
    <div className="flex flex-col w-[1440px]">
      <div className="h-[710px] border-l shadow-inner">
        <Messages />
      </div>
      <div className="border-l">
        <MessageBox />
      </div>
    </div>
    </div>
  );
};