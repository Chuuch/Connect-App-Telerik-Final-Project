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
				<div className="w-12 h-full  dark:bg-gray-900  flex flex-col justify-start">
					<div className="flex flex-col">
						<label
							htmlFor="assistant-drawer-3"
							aria-label="open sidebar"
							className="btn btn-square btn-ghost flex flex-col"
						>
							<BsRobot
								size={30}
								className="text-blue-500 dark:text-purple-500"
							/>
						</label>
					</div>
					<div className="flex flex-col items-start justify-start w-[600px]">
						
					</div>
				</div>
			</div>
			{/* Sidebar */}
			<div className="drawer-side fixed top-20 left-[80px] h-[1000px] w-[400px] z-10">
				<label
					htmlFor="assistant-drawer-3"
					aria-label="close sidebar"
					className="drawer-overlay hidden"
				></label>

				<ul className="menu inline space-y-2 p-4 min-h-full bg-gray-100 dark:bg-gray-900 text-blue-500 dark:text-purple-600 dark:focus:text-purple-600">
					{/* Sidebar content here */}
					<div className="flex flex-row items-center space-x-4">
						<h1 className="text-3xl mb-4 text-blue-500 dark:text-purple-600">
							Buddy Assistant
						</h1>
						<BsRobot size={35} className="flex mb-5" />
					</div>
					<div className="inline-block items-start top-1">
						<div className='max-w-32 h-[550px] overflow-y-auto scrollbar-thin scrollbar-track-slate-600 dark:scrollbar-thumb-purple-600'>
						{hercResponse && <p className=' text-base break-all whitespace-pre-line overflow-y-auto scrollbar-thin scrollbar-track-slate-600 dark:scrollbar-thumb-purple-600'>{hercResponse}</p>}
						</div>
						
					</div>

					<div className="flex flex-row justify-start items-start space-x-6">
						<div className="flex flex-row items-center justify-center mt-[80px] space-x-5">
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
								className="rounded-lg flex items-start w-72 h-20 p-2 text-base text-gray-800 dark:bg-gray-800 outline-none dark:text-gray-300 border border-gray-200 dark:border-gray-600 focus:outline-blue-500 focus:border-none dark:focus:outline-purple-500"
							/>
						</div>
						<div>
							<div className="ml-3 mt-[105px] z-10">
								<button
									onClick={askHercai}
									className="rounded-full items-center justify-center z-10"
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
