import { PiUserCircleFill } from 'react-icons/pi'


export const SingleConversation = () => {
  return (
    <div className="flex flex-col">
        <div className="flex flex-row space-x-1 items-center text-md hover:bg-white/70 cursor-pointer h-full w-full">
            <PiUserCircleFill size={60} className='fill-gray-500 cursor-pointer'/>
            <p className='text-blue-500'>Ivan Tonchev</p>
        </div>
        <div className="flex flex-row space-x-1 items-center text-md">
            <PiUserCircleFill size={60} className='fill-gray-500'/>
            <p className='text-blue-500'>Vasil Ivanov</p>
        </div>
        <div className="flex flex-row space-x-1 items-center text-md">
            <PiUserCircleFill size={60} className='fill-gray-500 cursor-pointer'/>
            <p className='text-blue-500'>Alex Petrov</p>
        </div>
        <div className="flex flex-row space-x-1 items-center text-md">
            <PiUserCircleFill size={60} className='fill-gray-500 cursor-pointer'/>
            <p className='text-blue-500'>Stanimir Stalev</p>
        </div>
        <div className="flex flex-row space-x-1 items-center text-md">
            <PiUserCircleFill size={60} className='fill-gray-500 cursor-pointer'/>
            <p className='text-blue-500'>Antoan Genchev</p>
        </div>
        <div className="flex flex-row space-x-1 items-center text-md">
            <PiUserCircleFill size={60} className='fill-gray-500 cursor-pointer'/>
            <p className='text-blue-500'>Evgeni Topalev</p>
        </div>
        <div className="flex flex-row space-x-1 items-center text-md">
            <PiUserCircleFill size={60} className='fill-gray-500 cursor-pointer'/>
            <p className='text-blue-500'>Maksim Georgiev</p>
        </div>
    
    </div>
  )
}
