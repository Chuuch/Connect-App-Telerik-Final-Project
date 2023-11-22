import { Conversations } from "../Conversations/Conversations.tsx"
import { Search } from "../Search/Search"


export const Sidebar = () => {
  return (
      <div className="border-r w-96 bg-white h-screen shadow-lg">
        <Search />
        <Conversations />
      </div>
  )
}
