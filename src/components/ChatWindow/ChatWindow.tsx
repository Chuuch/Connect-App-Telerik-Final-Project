

// type Props = {}

import { Conversations } from "../Conversations/Conversations"
import { MessageBox } from "../MessageBox/MessageBox"
import { Messages } from "../Messages/Messages"

export const ChatWindow = () => {
  return (
    <div className="bg-white flex flex-grow items-start justify-start ">
      <div className="h-full shadow-xl w-96">
        <Conversations />
      </div>
    <div className="flex-grow flex-col w-[1440px]">
      <div className="h-[710px] border-l shadow-inner overflow-auto">
        <Messages />
      </div>
      <div className="border-l flex-grow h-32">
        <MessageBox />
      </div>
    </div>
    </div>
  );
};