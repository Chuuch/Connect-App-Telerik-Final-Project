import { MessageBox } from "../../components/MessageBox/MessageBox"
import { Messages } from "../../components/Messages/Messages"
import { Teams } from "../../components/Teams/Teams"

export const TeamsView = () => {
  return (
    <div className="bg-white flex flex-row items-start justify-start h-[845px]">
      <div className="h-full shadow-xl">
        <Teams />
      </div>
    <div className="flex flex-col w-[1440px]">
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
