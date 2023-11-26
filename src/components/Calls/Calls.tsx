import { IoCall } from "react-icons/io5"
import { motion } from 'framer-motion';

export const Calls = () => {
  return (
    <div className="">
      <div className="flex items-center justify-center border-b dark:border-gray-600 p-2">
        <h2 className="text-blue-500 dark:text-purple-600 text-2xl font-bold p-2 ">Calls</h2>
      </div>
    
    <div className="pt-4 w-96 space-y-2 shadow-inner">
    <motion.ul
    initial={{ y: -100, opacity: 0 }}
    transition={{ duration: 1.2 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} 
    className="flex flex-col space-y-2">
    <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer h-full w-full p-2">
        <IoCall size={35} className='fill-blue-500 dark:fill-purple-600 cursor-pointer'/>
        <p className='text-gray-600 dark:text-gray-200'>You missed a call from Stoyan Peshev</p>
    </li>
    <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer h-full ww-full p-2">
        <IoCall size={35} className='fill-blue-500 dark:fill-purple-600 cursor-pointer'/>
        <p className='text-gray-600 dark:text-gray-200'>Call with Miroslav Genchev ended in 32:34 min.</p>
    </li>
  </motion.ul>
  </div>
  </div>
  )
}
