import { IoMdAttach, IoMdPhotos } from "react-icons/io"
// import { Emoji } from "../Emoji/Emoji"

export const MessageBox = () => {
  return (
    <div className="flex flex-row h-32 border-t-2 items-center space-x-2 w-full">
      <div className='flex flex-row items-center w-full ml-5 mr-2 space-x-2'>
      <input
        type="text"
        placeholder="Type something..."
        required
        className="text-lg p-5 h-16 rounded-full w-full mr-5 bg-transparent border-2 flex-grow outline-none focus:outline-none"/>
        {/* <Emoji />  */}
        
      <IoMdAttach size={30} className='cursor-pointer fill-blue-500 hover:fill-blue-500/90'/>
      <IoMdPhotos size={30} className='cursor-pointer fill-blue-500 hover:fill-blue-500/90'/>
      </div>
      <div className='flex flex-row pr-5'>
      <button className="border p-2 w-24 h-10 rounded-md bg-blue-500 hover:bg-blue-500/90 text-white">
        Send
      </button>
      </div>
    </div>
  )
}
