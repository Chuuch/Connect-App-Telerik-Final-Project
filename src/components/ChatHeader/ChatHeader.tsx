import { IoMdVideocam } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { IoCall } from 'react-icons/io5';
import { IoPersonAdd } from 'react-icons/io5';

export const ChatHeader = () => {
  return (
    <div className="flex items-center bg-white/90 h-24 w-full">
        <div className='flex flex-row justify-center w-full space-x-1'>
        <input 
            type="text"
            placeholder='Search in chat'
            className='rounded-full w-96 h-8 p-3 border outline-none focus:outline-none bg-transparent' />
            <IoSearch size={25} className='mr-2 fill-blue-500 cursor-pointer'/>
        </div>
        <div className='flex flex-row items-center justify-end mr-10 w-fit space-x-4'>
            <IoCall size={25} className='fill-blue-500 hover:fill-blue-500/90 cursor-pointer'/>
            <IoMdVideocam size={25} className='fill-blue-500 hover:fill-blue-500/90 cursor-pointer'/>
            <IoPersonAdd size={25} className='fill-blue-500 hover:fill-blue-500/90 cursor-pointer'/>
        </div>
        </div>

  )
}
