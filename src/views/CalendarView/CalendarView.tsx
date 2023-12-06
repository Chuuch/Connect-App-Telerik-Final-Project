import { CalendarFeature } from "../../components/CalendarFeature/CalendarFeature"
import { MessageBox } from "../../components/MessageBox/MessageBox"
import { Messages } from "../../components/Messages/Messages"

export const CalendarView = () => {
  return (
    <div className="bg-white dark:bg-black flex flex-grow items-start justify-start">
      <div className="h-[830px] shadow-xl bg-gray-100 dark:bg-gray-900">
        <CalendarFeature />
      </div>
    <div className="flex-grow flex-col w-[1410px]">
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
