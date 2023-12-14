import { BsRobot } from 'react-icons/bs';
import { RadioCircles } from '../RadioCircles/RadioCircles';
import { useState } from 'react';
import { Hercai } from 'hercai';

type AssistantProps = React.FC<unknown>;

const Assistant: AssistantProps = () => {
	const [userInput, setUserInput] = useState('');
	const [hercResponse, setHercResponse] = useState<string | null>(null);
	const herc = new Hercai();

	const handleUserInput = (input: string) => {
		setUserInput(input);
	};

	const askHercai = async () => {
		try {
			const response = await herc.question({ model: 'v3-beta', content: userInput });
			setHercResponse(response.reply);
			return response.reply;
		} catch (error) {
			console.error('Error asking Hercai:', error);
			setHercResponse('Sorry, an error occurred.');
		}
	};

	return (
		<div className="drawer flex flex-col items-center justify-center z-10">
			<input
				id="assistant-drawer-3"
				type="checkbox"
				className="drawer-toggle"
			/>
			<div className="drawer-content flex flex-col">
				{/* Navbar */}
				<div className="w-12 h-full  dark:transparent  flex flex-col justify-start">
				<div className="w-12 h-full  dark:transparent  flex flex-col justify-start">
					<div className="flex flex-col">
						<label
							htmlFor="assistant-drawer-3"
							aria-label="open sidebar"
							className="btn btn-square btn-ghost flex flex-col"
						>
							<BsRobot
								size={20}
								size={20}
								className="text-blue-500 dark:text-purple-500"
							/>
						</label>
					</div>
					<div className="flex flex-col items-start justify-start w-[600px]">
						
					</div>
				</div>
			</div>
			{/* Sidebar */}
			<div className="drawer-side absolute top-0 md:left-[60px] lg:left-[65px] h-[1000px] md:h-[682px] w-[452px] md:w-[292px] lg:h-[1015px] lg:w-[360px] lg:top-[-184px] z-40">
				<label
					htmlFor="assistant-drawer-3"
					aria-label="close sidebar"
					className="drawer-overlay hidden"
				></label>

				<ul className="menu inline space-y-2 p-4 min-h-full w-[380px] lg:w-[360px] md:w-[295px] bg-gray-100 dark:bg-gray-900 text-blue-500 dark:text-purple-600 dark:focus:text-purple-600 ">
				<ul className="menu inline space-y-2 p-4 min-h-full w-[380px] lg:w-[360px] md:w-[295px] bg-gray-100 dark:bg-gray-900 text-blue-500 dark:text-purple-600 dark:focus:text-purple-600 ">
					{/* Sidebar content here */}
					<div className="flex flex-row items-center">
						<h1 className="lg:text-2xl md:text-xl mb-4 md:p-4 text-blue-500 dark:text-purple-600">
					<div className="flex flex-row items-center">
						<h1 className="lg:text-2xl md:text-xl mb-4 md:p-4 text-blue-500 dark:text-purple-600">
							Buddy Assistant
						</h1>
						<BsRobot className="flex mb-5 h-24 w-24 md:h-8 md:w-8" />
						<BsRobot className="flex mb-5 h-24 w-24 md:h-8 md:w-8" />
					</div>
					<div className="inline-block items-start top-1">
						<div className='h-[550px] md:h-[480px] lg:h-[750px] lg:w-[320px] overflow-y-auto scrollbar-thin scrollbar-track-gray-400 dark:scrollbar-track-slate-600 scrollbar-thumb-blue-500 dark:scrollbar-thumb-purple-600'>
						{hercResponse && <p className='md:p-2 text-base md:text-sm break-all whitespace-pre-line overflow-y-auto scrollbar-thin scrollbar-track-slate-600 dark:scrollbar-thumb-purple-600'>{hercResponse}</p>}
						</div>
						
					</div>

					<div className="flex flex-row justify-start items-start space-x-3 md:pt-2 md:pl-2">
						<div className="flex flex-row items-center justify-center space-x-2">
					<div className="flex flex-row justify-start items-start space-x-3 md:pt-2 md:pl-2">
						<div className="flex flex-row items-center justify-center space-x-2">
							<input
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										askHercai();
										setUserInput('');
									}
								}}
								onChange={(e) => handleUserInput(e.target.value)}
								value={userInput}
								placeholder="Ask Buddy something..."
								type="text"
								className="rounded-lg flex items-start w-72 md:w-[180px] lg:w-[250px] lg:h-20 h-20 md:h-16 p-2 text-base md:text-sm text-gray-800 dark:bg-gray-800 outline-none dark:text-gray-300 border border-gray-200 dark:border-gray-600 focus:outline-blue-500 focus:border-none dark:focus:outline-purple-500"
								className="rounded-lg flex items-start w-72 md:w-[180px] lg:w-[250px] lg:h-20 h-20 md:h-16 p-2 text-base md:text-sm text-gray-800 dark:bg-gray-800 outline-none dark:text-gray-300 border border-gray-200 dark:border-gray-600 focus:outline-blue-500 focus:border-none dark:focus:outline-purple-500"
							/>
						</div>
						<div>
							<div className="ml-3 mt-[105px] md:mt-[20px] lg:mt-[32px] z-10">
							<div className="ml-3 mt-[105px] md:mt-[20px] lg:mt-[32px] z-10">
								<button
									onClick={() => { askHercai(); setUserInput(''); }}
									
									className="rounded-full items-center justify-center z-40"
									onClick={() => { askHercai(); setUserInput(''); }}
									
									className="rounded-full items-center justify-center z-40"
								>
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
