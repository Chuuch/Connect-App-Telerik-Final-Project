import { MessageBox } from "../../components/MessageBox/MessageBox"
import { Messages } from "../../components/Messages/Messages"
import { Teams } from "../../components/Teams/Teams"

export const TeamsView = () => {
  return (
    <div className="bg-white dark:bg-black flex flex-grow items-start justify-start">
      <div className="h-full shadow-x bg-gray-100 dark:bg-gray-900">
        <Teams />
      </div>
    <div className="flex-grow flex-col w-[1440px]">
      <div className="h-[859px] flex-grow border-l dark:border-gray-600 shadow-inner overflow-auto">
        <Messages msg={[]} />
      </div>
      <div>
        <MessageBox />
      </div>
    </div>
    </div>
  )
}
