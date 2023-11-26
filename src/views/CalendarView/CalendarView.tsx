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
      <div className="h-[859px] border-l dark:border-gray-600 shadow-inner overflow-auto">
        <Messages msg={[]} />
      </div>
      <div>
        <MessageBox />
      </div>
    </div>
    </div>
  )
}
