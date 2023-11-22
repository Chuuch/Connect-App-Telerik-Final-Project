import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { Header } from '../../components/Header/Header';

export const Home = () => {
	return (
		<div className=''>
			<div>
				<Header />
			</div>
			<div className='flex h-full'>
				<Navbar />
				<Outlet />
			</div>
			<div>
				
			</div>
		</div>
	);
};
