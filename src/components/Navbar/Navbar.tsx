import { RiTeamFill } from 'react-icons/ri';
import { BsChatTextFill } from 'react-icons/bs';
import { IoCall, IoCalendar, IoNotifications } from 'react-icons/io5';

// type Props = {}

export const Navbar = () => {
    return (
      <div className="drawer h-screen relative w-full">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-24 h-full navbar bg-white flex flex-col justify-start">
            <div className="flex flex-col">
                <img src='connect2.png' alt='logo' className='w-16 h-16'/>
              <ul className="menu menu-vertical">
                {/* Navbar menu content here */}
                <li><a><IoNotifications className='active:fill-blue-500' size={30} /></a></li>
                <li><a><RiTeamFill className='active:fill-blue-500' size={30} /></a></li>
                <li><a><BsChatTextFill className='active:fill-blue-500' size={30} /></a></li>
                <li><a><IoCall className='active:fill-blue-500' size={30} /></a></li>
                <li><a><IoCalendar className='active:fill-blue-500' size={30} /></a></li>
              </ul>
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost flex flex-col">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div>
            <div className="flex flex-col items-start justify-start">
              {/* Add any additional content or menu items here */}
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <div className="drawer-side absolute top-0 left-24 h-full">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            <li><a>Personal profile</a></li>
            <li><a>Sidebar Item 2</a></li>
          </ul>
        </div>
      </div>
    );
  };