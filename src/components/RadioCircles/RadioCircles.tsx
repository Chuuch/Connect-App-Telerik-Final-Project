import { LuRadioTower } from 'react-icons/lu'

interface RadioCirclesProps {

}

export const RadioCircles: React.FC<RadioCirclesProps> = () => {
  return (
    <div
        className='relative flex justify-center items-center z-40'>

        <div className='absolute border border-blue-500 dark:border-purple-500 rounded-full hover:animate-ping animate-pulse h-12 w-12 '/>
            <div className='flex items-center justify-center opacity-100'>
            <LuRadioTower className='md:h-5 md:w-5' />
            </div>
        </div>
  )
}

