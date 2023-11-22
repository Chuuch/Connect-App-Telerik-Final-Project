import { PiUserCircleFill } from "react-icons/pi"


export const Notifications = () => {
  return (
  <div>
    <ul className="flex flex-col pt-4 space-y-2">
    <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full w-96">
        <PiUserCircleFill size={60} className='fill-gray-500 cursor-pointer'/>
        <p className='text-gray-500'>Ivan Tonchev sent you a message</p>
    </li>
    <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full w-96">
        <PiUserCircleFill size={60} className='fill-gray-500 cursor-pointer'/>
        <p className='text-gray-500'>You missed a call from Alex Petrov</p>
    </li>
    <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full w-96">
        <PiUserCircleFill size={60} className='fill-gray-500 cursor-pointer'/>
        <p className='text-gray-500'>Stanimir Stalev liked your message</p>
    </li>
  </ul>
</div>
  )
}