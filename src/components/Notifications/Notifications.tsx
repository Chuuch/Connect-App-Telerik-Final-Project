import { PiUserCircleFill } from "react-icons/pi"


export const Notifications = () => {
  return (
    <div>
      <div className="flex items-center justify-center border-b p-2">
        <h2 className="text-blue-500 text-2xl font-bold p-2 ">Notifications</h2>
      </div>
    
  <div className="w-96 shadow-inner">
    <ul className="flex flex-col pt-4 space-y-2">
    <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full w-full p-2">
        <PiUserCircleFill size={50} className='fill-blue-500 cursor-pointer'/>
        <p className='text-gray-500'>Ivan Tonchev sent you a message</p>
    </li>
    <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full -full p-2">
        <PiUserCircleFill size={50} className='fill-blue-500 cursor-pointer'/>
        <p className='text-gray-500'>You missed a call from Alex Petrov</p>
    </li>
    <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full -full p-2">
        <PiUserCircleFill size={50} className='fill-blue-500 cursor-pointer'/>
        <p className='text-gray-500'>Stanimir Stalev liked your message</p>
    </li>
  </ul>
</div>
<div className="flex items-center justify-center pt-5">
  <button className='bg-blue-500 hover:bg-blue-500/90 text-white p-2 rounded-md text-sm'>
        Clear Notifications
      </button>
  </div>
</div>
  )
}