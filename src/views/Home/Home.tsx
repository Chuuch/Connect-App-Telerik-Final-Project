// type Props = {}

import { Chat } from '../../components/Chat/Chat';
import { Navbar } from '../../components/Navbar/Navbar';
import { Sidebar } from '../../components/Sidebar/Sidebar';

export const Home = () => {
	return (
		<div className="fixed flex flex-row h-screen w-24">
			<Navbar />
			<div className="flex flex-row z-1 items-start justify-start">
				<Sidebar />
				<Chat />
			</div>
		</div>
	);
};
