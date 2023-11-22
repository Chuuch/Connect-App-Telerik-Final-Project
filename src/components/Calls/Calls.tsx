import { IoCall } from "react-icons/io5"

export const Calls = () => {
  return (
    <div className="pt-4">
    <ul className="flex flex-col space-y-2">
    <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full w-96">
        <IoCall size={40} className='fill-blue-500  cursor-pointer'/>
        <p className='text-gray-500'>You missed a call from Stoyan Peshev</p>
    </li>
    <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full w-96">
        <IoCall size={40} className='fill-blue-500 cursor-pointer'/>
        <p className='text-gray-500'>Call with Miroslav Genchev ended in 32:34 min.</p>
    </li>
  </ul>
  </div>
  )
}
