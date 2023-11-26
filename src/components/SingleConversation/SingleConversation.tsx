import { BsChatTextFill } from 'react-icons/bs';
import { IoCall, IoMic, IoVideocam } from 'react-icons/io5';
import { PiUserCircleFill } from 'react-icons/pi';
import { motion } from 'framer-motion';

interface Conversation {
    id: string;
    teamId: string;
    messages: object;
    timeStamp: number;
    username: string;
}

export const SingleConversation: React.FC<{ conversation: Conversation}> = ({ conversation }) => {
	return (
		<div>
			<div className="w-96">
				<motion.ul
				initial={{ y: -100, opacity: 0 }}
				transition={{ duration: 1.2 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="flex flex-col pt-4">
					<li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer h-full w-full pl-2">
						<PiUserCircleFill
							size={50}
							className="fill-blue-500 dark:fill-purple-600 cursor-pointer"
						/>
						<p className="text-gray-500 dark:text-gray-300">{conversation.username}</p>
						<div className="flex flex-row pl-5 space-x-4">
							<IoCall
								className="fill-gray-500 hover:fill-blue-500 active:fill-blue-500 dark:hover:fill-purple-600"
								size={20}
							/>
							<IoVideocam
								className="fill-gray-500 hover:fill-blue-500 active:fill-blue-500 dark:hover:fill-purple-600"
								size={20}
							/>
							<IoMic
								className="text-gray-500 fill-gray-500 hover:fill-blue-500 active:fill-blue-500 dark:hover:fill-purple-600"
								size={20}
							/>
							<BsChatTextFill
								className="fill-gray-500 hover:fill-blue-500 active:fill-blue-500 dark:hover:fill-purple-600"
								size={20}
							/>
						</div>
					</li>
				</motion.ul>
			</div>
		</div>
	);
};
