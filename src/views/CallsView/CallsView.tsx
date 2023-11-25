
// type Props = {}

import { Calls } from "../../components/Calls/Calls"
import { MessageBox } from "../../components/MessageBox/MessageBox"
import { Messages } from "../../components/Messages/Messages"

export const CallsView = () => {
  return (
    <div className="bg-white dark:bg-black flex flex-grow items-start justify-start">
      <div className="h-full shadow-xl">
        <Calls />
      </div>
    <div className="flex-grow flex-col w-[1440px]">
      <div className="border-l dark:border-gray-600 shadow-inner overflow-auto">
        <Messages msg={[]} />
      </div>
      <div>
        <MessageBox />
      </div>
    </div>
    </div>
  )
}