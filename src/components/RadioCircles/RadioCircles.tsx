import { motion } from 'framer-motion'
import { LuRadioTower } from 'react-icons/lu'

interface RadioCirclesProps {

}

export const RadioCircles: React.FC<RadioCirclesProps> = () => {
  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ scale: [1, 2, 2, 3, 1], opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1.0],
        borderRadius: ['20%', '20%', '50%', '80%', '20%']}}
        transition={{ duration: 2.5 }}
        className='relative flex justify-center items-center'>

        <div className='absolute border border-blue-500 dark:border-purple-500 rounded-full h-10 w-10 opacity-0 hover:opacity-100 hover:animate-ping'/>
        <div className='rounded-full border dark:border-gray-500 dark:bg-gray-800 h-12 w-12 absolute hover:animate-pulse'>
            <div className='visible flex items-center justify-center opacity-100 mt-3'>
            <LuRadioTower size={25} />
            </div>
        </div>
        <div className='rounded-full border border-blue-500 dark:border-purple-500 h-16 w-16 absolute opacity-0 hover:opacity-100 hover:animate-ping'/>
        <div className='rounded-full border border-blue-300 dark:border-purple-500 h-20 w-20 absolute opacity-0 hover:opacity-100 hover:animate-ping'/>
        <div />
    </motion.div>
  )
}

