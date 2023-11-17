import { IoMdAttach, IoMdPhotos } from "react-icons/io"

export const Message = () => {
  return (
    <div className="flex flex-row items-center space-x-2">
      <input
        type="text"
        placeholder="Type something..."
        required
        className="text-lg p-5 h-32 w-[1200px] bg-transparent" />
      <IoMdAttach size={30} className='cursor-pointer fill-blue-500'/>
      <IoMdPhotos size={30} className='cursor-pointer fill-blue-500'/>
      <button className="border p-2 w-24 h-10 rounded-md bg-blue-500 text-white">
        Send
      </button>
    </div>
  )
}
