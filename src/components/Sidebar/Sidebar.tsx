import { Chats } from "../Chats/Chats.tsx"
import { Search } from "../Search/Search"
import { SidebarHeader } from "../SidebarHeader/SidebarHeader.tsx"


export const Sidebar = () => {
  return (
      <div className="border-r w-96 bg-white/95 h-screen shadow-lg">
        <SidebarHeader />
        <Search />
        <Chats />
      </div>
  )
}
