import { Conversations } from "../Conversations/Conversations.tsx"
import { Search } from "../Search/Search"
import { SidebarHeader } from "../SidebarHeader/SidebarHeader.tsx"


export const Sidebar = () => {
  return (
      <div className="border-r w-96 bg-white h-screen shadow-lg">
        <SidebarHeader />
        <Search />
        <Conversations />
      </div>
  )
}
