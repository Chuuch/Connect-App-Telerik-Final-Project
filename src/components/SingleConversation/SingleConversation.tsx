import { BsChatTextFill } from 'react-icons/bs';
import { IoCall, IoMic, IoVideocam } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { createChatWithId, } from '../../services/chat.services';
//import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { User } from '../../services/users.services';
import Avatar from '../Avatar/Avatar';


export const SingleConversation: React.FC<{ friend: User }> = ({ friend }) => {
	const navigate = useNavigate();
	const handleClick = async () => {
	console.log("friend uid: ", friend.uid);
  
	const chatId = await createChatWithId(friend.uid);
	if (chatId) {
		//console.log("Created chat with: ", chatId);
		navigate(`/chat/${chatId}`, { state: { friendId: friend.uid } }); 
	} else {
		console.log("Chat is already being used!");
	}
	};

	return (
		<div>
			<div className="w-96">
				<motion.ul
				initial={{ y: -100, opacity: 0 }}
				transition={{ duration: 1.2 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="flex flex-col pt-4">
					<li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer h-full w-full lg:hover:w-[350px] lg:dark:hover:w-[350px] pl-2">
					<Avatar userID={friend.uid} />
						<p className="text-gray-500 dark:text-gray-300">{friend.username}</p>
						<div className="flex flex-row pl-5 space-x-4">
							<IoCall
								className="fill-gray-500 hover:fill-blue-500 active:fill-blue-500 dark:hover:fill-purple-600"
								size={20}
							/>
							<NavLink to='/messages/videocall'>
							<IoVideocam
								className="fill-gray-500 hover:fill-blue-500 active:fill-blue-500 dark:hover:fill-purple-600"
								size={20}
							/>
							</NavLink>
							<IoMic
								className="text-gray-500 fill-gray-500 hover:fill-blue-500 active:fill-blue-500 dark:hover:fill-purple-600"
								size={20}
							/>
							<BsChatTextFill
								className="fill-gray-500 hover:fill-blue-500 active:fill-blue-500 dark:hover:fill-purple-600"
								size={20}
								onClick={handleClick}
							/>
						</div>
					</li>
				</motion.ul>
			</div>
		</div>
	);
};
