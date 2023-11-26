import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { Header } from '../../components/Header/Header';

export const Home = () => {
	return (
		<div className='h-screen flex flex-col'>
			<div className='flex-grow'>
				<Header />
			</div>
			<div className='flex-grow flex h-full'>
				<Navbar />
				<Outlet />
			</div>
		</div>
	);
};