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
				<div className="w-24 h-full navbar bg-gray-100 dark:bg-black border-r dark:border-gray-600 flex flex-col justify-start shadow-md">
					<div className="flex flex-col">
						<ul className="menu menu-vertical justify-center items-center">
							{/* Navbar menu content here */}
							<li>
								<NavLink to='/notifications'>
									<IoNotifications className="fill-blue-500 dark:fill-purple-600" size={30} />
								</NavLink>
							</li>
							<li>
								<NavLink to='/teams'>
									<RiTeamFill className="fill-blue-500 dark:fill-purple-600" size={30} />
								</NavLink>
							</li>
							<li>
								<NavLink to='/messages'>
									<BsChatTextFill className="fill-blue-500 dark:fill-purple-600" size={30} />
								</NavLink>
							</li>
							<li>
								<NavLink to='/calls'>
									<IoCall className="fill-blue-500 dark:fill-purple-600" size={30} />
								</NavLink>
							</li>
							<li>
								<NavLink to='/calendar'>
									<IoCalendar className="fill-blue-500 dark:fill-purple-600" size={30} />
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
								className="inline-block w-6 h-6 stroke-slate-400 dark:stroke-slate-400"
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

				<ul className="menu p-4 w-96 min-h-full bg-gray-100 dark:bg-gray-900 text-blue-500 dark:text-purple-600 dark:focus:text-purple-600">
					{/* Sidebar content here */}
					<h1 className="text-3xl ml-3 mb-4 text-blue-500 dark:text-purple-600">Personal Profile</h1>
					<li className='dark:hover:bg-gray-800 rounded-md '>
						<NavLink to='/user' className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:focus:text-purple-600 dark:hover:text-purple-600">User settings</NavLink>
					</li>
					<li className='dark:hover:bg-gray-800 rounded-md'>
						<NavLink to='/privacy' className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-purple-600">Privacy settings</NavLink>
					</li>
					<li className='dark:hover:bg-gray-800 rounded-md'>
						<a className="text-lg text-gray-600 dark:text-gray-300  hover:text-blue-500 dark:hover:text-purple-600" onClick={()=>logoutUser()}>Log out</a>
					</li>
				</ul>
			</div>
		</div>
	);
};
