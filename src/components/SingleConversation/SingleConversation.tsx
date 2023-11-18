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
