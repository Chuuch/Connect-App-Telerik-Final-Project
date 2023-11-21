import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { Header } from '../../components/Header/Header';

export const Home = () => {
	return (
		<div>
			<div>
				<Header />
				<Navbar />
			</div>
			<div className="">
				<Outlet />
			</div>
		</div>
	);
};
