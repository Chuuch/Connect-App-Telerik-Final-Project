import { BsRobot } from 'react-icons/bs';
import { LuRadioTower } from 'react-icons/lu'
import { RadioCircles } from '../RadioCircles/RadioCircles';

interface AssistantProps {}

const Assistant: React.FC<AssistantProps> = () => {
  return (
    <div className="drawer flex flex-col items-center justify-center">
			<input id="assistant-drawer-3" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col">
				{/* Navbar */}
				<div className="w-12 h-full  dark:bg-gray-900  flex flex-col justify-start">
					<div className="flex flex-col">
						<label
							htmlFor="assistant-drawer-3"
							aria-label="open sidebar"
							className="btn btn-square btn-ghost flex flex-col"
						>
						<BsRobot size={30} className='text-blue-500 dark:text-purple-500'/>
				
						</label>
					</div>
					<div className="flex flex-col items-start justify-start w-[600px]">
						{/* Add any additional content or menu items here */}
					</div>
				</div>
			</div>
			{/* Sidebar */}
			<div className="drawer-side fixed top-20 left-[80px] h-[1000px] w-[400px] z-20">
				<label
					htmlFor="assistant-drawer-3"
					aria-label="close sidebar"
					className="drawer-overlay hidden"
				></label>

				<ul className="menu p-4 w-96 min-h-full bg-gray-100 dark:bg-gray-900 text-blue-500 dark:text-purple-600 dark:focus:text-purple-600">
					{/* Sidebar content here */}
          <div className="flex flex-row items-center space-x-4">
					<h1 className="text-3xl ml-3 mb-4 text-blue-500 dark:text-purple-600">Buddy Assistant
          </h1>
          <BsRobot size={35} className='flex mb-5'/>
          </div>
          <div className="flex row justify-start items-start mt-[690px] space-x-6">
            <div className="flex flex-row items-center justify-center space-x-5">
            <input
              placeholder='Ask Buddy something...' 
              type="text"
              className='rounded-lg flex items-start w-72 h-20 p-2 text-base text-gray-800 dark:bg-gray-800 outline-none dark:text-gray-300 border border-gray-200 dark:border-gray-600 focus:outline-blue-500 focus:border-none dark:focus:outline-purple-500' />
          </div>
          <div>
            <div className="ml-3 mt-7">
          <button className="rounded-full items-center justify-center">
            <RadioCircles />
          </button>
          </div>
          </div>
          </div>
				</ul>
			</div>
		</div>
  );
};
export default Assistant;
