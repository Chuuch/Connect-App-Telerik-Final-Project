import { RiTeamFill } from 'react-icons/ri';
import { BsChatTextFill } from 'react-icons/bs';
import { IoCall, IoCalendar, IoNotifications } from 'react-icons/io5';
import { DarkMode } from '../DarkMode/DarkMode';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../services/auth.services';

// type Props = {}

export const Navbar = () => {
	return (
		<div className="drawer z-20 w-24">
			<input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col">
				{/* Navbar */}
				<div className="w-24 h-full navbar bg-white border-r flex flex-col justify-start shadow-md">
					<div className="flex flex-col">
						<ul className="menu menu-vertical">
							{/* Navbar menu content here */}
							<li>
								<NavLink to='/notifications'>
									<IoNotifications className="fill-blue-500" size={30} />
								</NavLink>
							</li>
							<li>
								<NavLink to='/teams'>
									<RiTeamFill className="fill-blue-500" size={30} />
								</NavLink>
							</li>
							<li>
								<NavLink to='/messages'>
									<BsChatTextFill className="fill-blue-500" size={30} />
								</NavLink>
							</li>
							<li>
								<NavLink to='/calls'>
									<IoCall className="fill-blue-500" size={30} />
								</NavLink>
							</li>
							<li>
								<NavLink to='/calendar'>
									<IoCalendar className="fill-blue-500" size={30} />
								</NavLink>
							</li>
							<li>
								<a>
									<DarkMode />
								</a>
							</li>
						</ul>
						<label
							htmlFor="my-drawer-3"
							aria-label="open sidebar"
							className="btn btn-square btn-ghost flex flex-col"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="inline-block w-6 h-6 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								></path>
							</svg>
						</label>
					</div>
					<div className="flex flex-col items-start justify-start">
						{/* Add any additional content or menu items here */}
					</div>
				</div>
			</div>
			{/* Sidebar */}
			<div className="drawer-side absolute top-0 left-24 h-full w-96 z-20">
				<label
					htmlFor="my-drawer-3"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>

				<ul className="menu p-4 w-96 min-h-full bg-gray-100 text-blue-500">
					{/* Sidebar content here */}
					<h1 className="text-3xl ml-3 mb-4">Personal Profile</h1>
					<li>
						<a className="text-lg">User settings</a>
					</li>
					<li>
						<a className="text-lg">Privacy settings</a>
					</li>
					<li>
						<a className="text-lg" onClick={()=>logoutUser()}>Log out</a>
					</li>
				</ul>
			</div>
		</div>
	);
};
