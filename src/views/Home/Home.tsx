// type Props = {}

import { ChatWindow } from '../../components/ChatWindow/ChatWindow';
import { Navbar } from '../../components/Navbar/Navbar';
import { Sidebar } from '../../components/Sidebar/Sidebar';

export const Home = () => {
	return (
		<div className="flex flex-row h-screen w-full">
			<Navbar />
			<div className="flex flex-row z-1 w-full items-start justify-start">
				<Sidebar />
				<ChatWindow />
			</div>
		</div>
	);
};
