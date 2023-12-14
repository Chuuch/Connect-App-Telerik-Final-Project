import { get, ref } from 'firebase/database';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { IoCall, IoPersonAdd, IoSearch, IoVideocam } from 'react-icons/io5';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { db } from '../../config/firebase-config';
import UserContext from '../../context/UserContext';
import { setUserFriend, updateUserStatus } from '../../services/users.services';
import { Status } from '../../utils/status';
import Avatar from '../Avatar/Avatar';

interface Message {
	content: string
}

export const Header = () => {
	const [results, setResults] = useState<Array<Message>>([]);
	const [queryVal, setQueryVal] = useState<string>('');
	const navigate = useNavigate();
	const [showForm, setShowForm] = useState<boolean>(false);
	const [showStatusMenu, setShowStatusMenu] = useState<boolean>(false);
	const [userVal, setUserVal] = useState<string>('');
	const { currentUserDB } = useContext(UserContext);
	const { chatId } = useParams<string>();
	const { channelId } = useParams<string>();

	useEffect(() => {
		const searchFunc = async () => {
			try {
				if (queryVal.trim() !== '') {
					let msgQueryRef;
                    if (chatId) {
                    msgQueryRef = ref(db, `chats/${chatId}/messages`);
                    } else if (channelId) {
                    msgQueryRef = ref(db, `channelMessages/${channelId}`);
                    }
					if (msgQueryRef) {
						const msgQuery = await get(msgQueryRef);
						//console.log('Data:', msgQuery.val());
					if (msgQuery.exists()) {
						const msgData = msgQuery.val();
						const dataArray: Message[] = Object.values(msgData);
						const matches: Message[] = [];
						for (const msg of dataArray) {
							//console.log('data: ', msg.content);
							if (
								msg.content &&
								msg.content.toLowerCase().includes(queryVal.toLowerCase())
							) {
								console.log(msg);
								matches.push(msg);
							}
						}
						setResults(matches);
					} else {
						console.log('No results found');
						setResults([]);
					}
				}
			}
		} catch (error) {
				console.log('An error occurred: ' + error);
			}
		};

		searchFunc();
	}, [queryVal, channelId, chatId]);

	const handleSearch = (e: { preventDefault: () => void; target: { value: SetStateAction<string>; }; }) => {
		e.preventDefault();
		setQueryVal(e.target.value);
		console.log('Search:', e.target.value);
	};

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if(chatId){
		navigate(`/search/${chatId}/${queryVal}`, { state: { results } });
		} else {
		navigate(`/search/${channelId}/${queryVal}`, { state: { results } });
		}
		setQueryVal('');
	};

	const handleSearchUser = (e: { preventDefault: () => void; target: { value: SetStateAction<string>; }; }) => {
		e.preventDefault();
		setUserVal(e.target.value);
	};

	const handleSubmitUser = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (userVal !== '') setUserFriend(userVal);
		setUserVal('');
	};

	const handleStatus = (e: { preventDefault: () => void }, status: `${Status}`) => {
		e.preventDefault();
		updateUserStatus(currentUserDB?.uid, status);
		setShowStatusMenu(false);
	}

	return (
		<div className="
		relative flex flex-row items-center justify-between border-b
	  dark:border-gray-600 bg-gray-100 dark:bg-gray-900 md:h-16 md:w-[768px]
	  	lg:w-[1920px]">
			<img
				src="connect2.png"
				alt="logo"
				className="w-8 h-8 ml-1 lg:ml-5 md:h-10 md:w-10 lg:h-14 lg:w-14"
			/>
			{(chatId || channelId) && <div className="flex flex-row items-center space-x-1">
				<input
					type="text"
					placeholder="Search in chat"
					onChange={handleSearch}
					value={queryVal}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							handleSubmit(e);
						}
					}}
					className="
					rounded-full text-sm pl-2 w-32 lg:w-96 md:w-64 lg:h-8 md:h-4 md:p-3 lg:p-4
				  bg-white dark:bg-gray-800 text-gray-700 focus:border-blue-500
				  dark:text-gray-300 border dark:border-gray-700 dark:focus:border-purple-600
				    outline-none focus:outline-none bg-transparent"
				/>
				<NavLink to="/search">
					<IoSearch
						onClick={handleSubmit}
						className="mr-2 md:h-5 md:w-5 lg:h-8 lg:w-6 fill-blue-600 hover:fill:blue-500 dark:fill-purple-600 dark:hover:fill-purple-500 cursor-pointer"
					/>
				</NavLink>
			</div>}
			<div className="flex flex-row items-center space-x-4 mr-10">
				<IoCall
					onClick={handleSubmit}
					className="md:h-5 md:w-5 lg:h-8 lg:w-6 fill-blue-600 hover:fill-blue-500 dark:fill-purple-600 dark:hover:fill-purple-500 cursor-pointer"
				/>
				<NavLink to="/videocall">
					<IoVideocam className="md:h-5 md:w-5 lg:h-8 lg:w-6 fill-blue-600 hover:fill-blue-500 dark:fill-purple-600 dark:hover:fill-purple-500 " />
				</NavLink>

				<IoPersonAdd
					onClick={() => setShowForm(true)}
					className="md:h-5 md:w-5 lg:h-8 lg:w-6 fill-blue-600 hover:fill-blue-500 dark:fill-purple-600 hover:dark:fill-purple-500 cursor-pointer"
				/>
				<button onClick={() => setShowStatusMenu(true)}>
					<Avatar userID={currentUserDB?.uid} />
				</button>
			</div>
			{showStatusMenu && currentUserDB?.uid && (<ul className="menu bg-base-200 w-56 rounded-box absolute top-[100%] right-[0%]">
				<li><button onClick={(e) => handleStatus(e, Status.BUSY)}>{Status.BUSY.toUpperCase()}</button>         			</li>
				<li><button onClick={(e) => handleStatus(e, Status.DO_NOT_DISTURB)}>{Status.DO_NOT_DISTURB.toUpperCase().replaceAll('-', ' ')}</button></li>
				<li><button onClick={(e) => handleStatus(e, Status.OFFLINE)}>{Status.OFFLINE.toUpperCase()}</button></li>
				<li><button onClick={(e) => handleStatus(e, Status.ONLINE)}>{Status.ONLINE.toUpperCase()}</button></li>
			</ul>)}
			{showForm && (
				<div className="absolute top-[50%] left-[50%] transform -translate-x-1/2  translate-y-4">
					<div className="mt-4">
						<form className="flex flex-col space-y-4 justify-center items-center border bg-gray-100 dark:bg-gray-900 border-blue-500 dark:border-purple-500 rounded-md p-4">
							<label
								htmlFor="teamName"
								className="text-lg font-semibold dark:text-gray-400"
							>
								Add friend:
							</label>
							<input
								type="text"
								id="userName"
								placeholder="Please select username"
								onChange={handleSearchUser}
								value={userVal}
								required
								className="px-4 py-2 border dark:border-gray-700 rounded-md focus:outline-none dark:text-gray-300 focus:border-blue-500 dark:focus:border-purple-500 dark:bg-slate-800"
							/>
							<button
								type="button"
								onClick={handleSubmitUser}
								className="bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 dark:hover:bg-purple-500 text-white w-28 px-4 py-2 rounded-md text-sm"
							>
								Submit
							</button>
							<button
								type="button"
								onClick={() => setShowForm(false)}
								className="bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 hover:dark:bg-purple-500 text-white w-28 px-4 py-2 rounded-md text-sm"
							>
								Close
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};
