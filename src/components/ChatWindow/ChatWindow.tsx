

// type Props = {}

import { Conversations } from "../Conversations/Conversations"
import { MessageBox } from "../MessageBox/MessageBox"
import { Messages } from "../Messages/Messages"

export const ChatWindow = () => {
  return (
    <div className="bg-white dark:bg-black flex flex-grow items-start justify-start ">
      <div className="h-full shadow-xl w-96">
        <Conversations />
      </div>
    <div className="flex-grow flex-col w-[1440px]">
      <div className="h-[859px] border-l dark:border-gray-600 shadow-inner overflow-auto">
        <Messages  msg={[]} />
      </div>
      <div className=" dark:border-gray-600 flex-grow h-32">
        <MessageBox />
      </div>
    </div>
    </div>
  );
};