import { IoIosVideocam } from 'react-icons/io';
import { IoIosSearch } from 'react-icons/io';
import { IoIosCall } from 'react-icons/io';
import { IoPersonAdd } from 'react-icons/io5';

export const ChatHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between bg-white/90 h-24 w-full">
        <div className='flex flex-row items-center ml-96'>
            <IoIosSearch size={30} className='mr-2 fill-blue-500 cursor-pointer'/>
        <input 
            type="text"
            placeholder='Search'
            className='rounded-xl w-96 h-8 p-2 border-2 active:border-blue-500 text-blue-500 bg-transparent' />
        </div>
        <div className='flex items-center right-0 space-x-4 mr-10'>
            <IoIosCall size={28} className='fill-blue-500 cursor-pointer'/>
            <IoIosVideocam size={30} className='fill-blue-500 cursor-pointer'/>
            <IoPersonAdd size={25} className='fill-blue-500 cursor-pointer'/>
        </div>
        
    </div>
  )
}
