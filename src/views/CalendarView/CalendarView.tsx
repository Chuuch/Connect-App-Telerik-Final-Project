import { CalendarFeature } from "../../components/CalendarFeature/CalendarFeature"
import { MessageBox } from "../../components/MessageBox/MessageBox"
import { Messages } from "../../components/Messages/Messages"

export const CalendarView = () => {
  return (
    <div className="bg-white flex flex-row items-start justify-start h-[845px]">
      <div className="h-full shadow-xl">
        <CalendarFeature />
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
