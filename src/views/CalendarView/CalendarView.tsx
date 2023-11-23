import { CalendarFeature } from "../../components/CalendarFeature/CalendarFeature"
import { MessageBox } from "../../components/MessageBox/MessageBox"
import { Messages } from "../../components/Messages/Messages"

export const CalendarView = () => {
  return (
    <div className="bg-white dark:bg-black flex flex-grow items-start justify-start">
      <div className="h-full shadow-xl">
        <CalendarFeature />
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
