import { BsChatTextFill } from 'react-icons/bs'
import { IoCall, IoMic, IoVideocam } from 'react-icons/io5'
import { PiUserCircleFill } from 'react-icons/pi'


export const SingleConversation = () => {
  return (
    <ul className="flex flex-col">
        <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full w-96">
            <PiUserCircleFill size={60} className='fill-gray-500 cursor-pointer'/>
            <p className='text-gray-500'>Ivan Tonchev</p>
        </li>
        <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full w-96">
            <PiUserCircleFill size={60} className='fill-gray-500'/>
            <p className='text-gray-500'>Vasil Ivanov</p>
            <IoCall className="fill-gray-500 active:fill-blue-500" size={25} />
            <IoVideocam className="fill-gray-500 active:fill-blue-500" size={25} />
            <IoMic className="text-gray-500 fill-gray-500 active:fill-blue-500" size={25} />
            <BsChatTextFill className="fill-gray-500 active:fill-blue-500" size={25} />
        </li>
        <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full w-96">
            <PiUserCircleFill size={60} className='fill-gray-500 cursor-pointer'/>
            <p className='text-gray-500'>Alex Petrov</p>
        </li>
        <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full w-96">
            <PiUserCircleFill size={60} className='fill-gray-500 cursor-pointer'/>
            <p className='text-gray-500'>Stanimir Stalev</p>
        </li>
        <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full w-96">
            <PiUserCircleFill size={60} className='fill-gray-500 cursor-pointer'/>
            <p className='text-gray-500'>Antoan Genchev</p>
        </li>
        <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full w-96">
            <PiUserCircleFill size={60} className='fill-gray-500 cursor-pointer'/>
            <p className='text-gray-500'>Evgeni Topalev</p>
        </li>
        <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full w-96">
            <PiUserCircleFill size={60} className='fill-gray-500 cursor-pointer'/>
            <p className='text-gray-500'>Maksim Georgiev</p>
        </li>
    
    </ul>
  )
}
