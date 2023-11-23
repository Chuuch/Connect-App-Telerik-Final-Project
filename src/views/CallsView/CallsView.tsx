
// type Props = {}

import { Calls } from "../../components/Calls/Calls"
import { MessageBox } from "../../components/MessageBox/MessageBox"
import { Messages } from "../../components/Messages/Messages"

export const CallsView = () => {
  return (
    <div className="bg-white flex flex-grow items-start justify-start">
      <div className="h-full shadow-xl">
        <Calls />
      </div>
    <div className="flex-grow flex-col w-[1440px]">
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