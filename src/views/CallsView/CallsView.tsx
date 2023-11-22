
// type Props = {}

import { Calls } from "../../components/Calls/Calls"
import { MessageBox } from "../../components/MessageBox/MessageBox"
import { Messages } from "../../components/Messages/Messages"

export const CallsView = () => {
  return (
    <div className="bg-white flex flex-row items-start justify-start h-[845px]">
      <div className="h-full shadow-xl">
        <Calls />
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
  )
}