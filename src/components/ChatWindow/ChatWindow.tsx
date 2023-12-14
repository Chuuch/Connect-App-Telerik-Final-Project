

// type Props = {}

import { Conversations } from "../Conversations/Conversations"
import { MessageBox } from "../MessageBox/MessageBox"
import { Messages } from "../Messages/Messages"

export const ChatWindow = () => {
  return (
    <div className="bg-white dark:bg-gray-800 flex flex-grow items-start justify-start ">
      <div className="md:w-[280px] md:h-[682px] lg:h-[1015px] lg:w-[350px] shadow-xl w-96 bg-gray-100 dark:bg-gray-900">
        <Conversations />
      </div>
    <div className="flex-grow flex-col w-[1440px] md:h-[682px] md:w-[413px]">
      <div className=" border-l dark:border-gray-600 shadow-inner overflow-auto">
        <Messages  msg={[]} />
      </div>
      <div className=" dark:border-gray-600 flex-grow">
        <MessageBox />
      </div>
    </div>
    </div>
  );
};