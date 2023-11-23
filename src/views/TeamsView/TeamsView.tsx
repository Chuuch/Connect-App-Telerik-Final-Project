import { MessageBox } from "../../components/MessageBox/MessageBox"
import { Messages } from "../../components/Messages/Messages"
import { Teams } from "../../components/Teams/Teams"

export const TeamsView = () => {
  return (
    <div className="bg-white flex flex-grow items-start justify-start">
      <div className="h-full shadow-xl">
        <Teams />
      </div>
    <div className="flex-grow flex-col w-[1440px]">
      <div className="h-[710px] flex-grow border-l shadow-inner overflow-auto">
        <Messages />
      </div>
      <div className="border-l">
        <MessageBox />
      </div>
    </div>
    </div>
  )
}
