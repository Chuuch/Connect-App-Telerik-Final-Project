import { IoMdAttach, IoMdPhotos } from "react-icons/io"

export const MessageBox = () => {
  return (
    <div className="flex flex-row items-center space-x-2 w-full">
      <div className='flex flex-row items-center w-full mr-2 space-x-2'>
      <input
        type="text"
        placeholder="Type something..."
        required
        className="text-lg p-5 h-32 w-full bg-transparent flex-grow outline-none focus:outline-none" />
      <IoMdAttach size={30} className='cursor-pointer fill-blue-500'/>
      <IoMdPhotos size={30} className='cursor-pointer fill-blue-500'/>
      </div>
      <div className='flex flex-row pr-10'>
      <button className="border p-2 w-24 h-10 rounded-md bg-blue-500 hover:bg-blue-500/90 text-white">
        Send
      </button>
      </div>
    </div>
  )
}
