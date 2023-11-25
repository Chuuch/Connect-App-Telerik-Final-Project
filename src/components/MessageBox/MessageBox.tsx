import { useState } from 'react';
import { IoMdAttach, IoMdPhotos } from 'react-icons/io';
import { createMsg } from '../../services/message.services';
import { Emoji } from '../Emoji/Emoji';
import { HiOutlineGif } from 'react-icons/hi2';
import GiphySearch from '../Giphy/Giphy';
import { API_KEY, API_SEARCH } from '../../constants/constants';

export const MessageBox = () => {
	const [msg, setMsg] = useState('');
	const [emoji, setEmoji] = useState('');
	const [showGif, setShowGif] = useState(false);
	const [selectedGif, setSelectedGif] = useState('');

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		try {
			const completeMessage = `${msg} ${emoji}`.trim();
			if (completeMessage !== '' || selectedGif) {
				const completeMessageWithGif = `${completeMessage} ${selectedGif}`;
				const messageId = await createMsg(completeMessageWithGif);
				console.log('Message sent with ID:', messageId);
			}
			setMsg('');
			setEmoji('');
			setSelectedGif('');
		} catch (error) {
			console.error('Message sent with error:', error);
		}
	};

	const handleGifClick = (gifUrl: string) => {
		setSelectedGif(gifUrl);
		setShowGif(false);
	};

	const closeGif = () => {
		setShowGif(false);
	};

	return (
		<div className="flex flex-grow h-32 border-t border-l bg-gray-100 text-gray-700 dark:bg-gray-900 dark:border-gray-600 items-center space-x-2 w-full">
			<div className="flex flex-grow items-center w-full ml-5 mr-2 space-x-2">
				<input
					type="text"
					placeholder="Type something..."
					value={msg}
					onChange={(e) => setMsg(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							handleSubmit(e);
						}
					}}
					required
					className="text-lg p-5 h-12 rounded-full w-full mr-5 bg-transparent border bg-white focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-purple-600 dark:text-gray-300 flex-grow outline-none focus:outline-none"
				/>
        <div className="">
				<Emoji onEmojiSelect={setEmoji} />
        </div>
				<HiOutlineGif
					onClick={() => setShowGif(true)}
					size={30}
					className="cursor-pointer stroke-blue-500 hover:stroke-blue-500/90 dark:stroke-purple-600/90 hover:dark:stroke-purple-600"
				/>
				<IoMdAttach
					size={30}
					className="cursor-pointer fill-blue-500 hover:fill-blue-500/90 dark:fill-purple-600/90 hover:dark:fill-purple-600"
				/>
				<IoMdPhotos
					size={30}
					className="cursor-pointer fill-blue-500 hover:fill-blue-500/90 dark:fill-purple-600/90 hover:dark:fill-purple-600"
				/>
			</div>
			<div className="flex flex-row pr-5">
				<button
					className="p-2 w-24 h-10 rounded-md bg-blue-500 hover:bg-blue-600 dark:bg-purple-600/90 dark:hover:bg-purple-600 text-white"
					onClick={handleSubmit}
				>
					Send
				</button>
			</div>
			{showGif && (
				<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-md">
						<GiphySearch
							API_SEARCH={API_SEARCH}
							API_KEY={API_KEY}
							onGifClick={handleGifClick}
						/>
						<button onClick={closeGif} className="dark:text-gray-300 p-2">
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
