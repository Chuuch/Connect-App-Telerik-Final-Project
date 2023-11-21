import { IoMdVideocam } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { IoCall } from 'react-icons/io5';
import { IoPersonAdd } from 'react-icons/io5';

export const Header = () => {
  return (
    <div className="flex flex-row items-center bg-white h-24">
      <img src="connect2.png" alt="logo" className="w-14 h-14 ml-5" />
      <div className="flex flex-row items-center w-full justify-center space-x-1 ml-60">
        <input
          type="text"
          placeholder="Search in chat"
          className="rounded-full w-96 h-8 p-3 text-blue-500 border outline-none focus:outline-none bg-transparent"
        />
        <IoSearch size={25} className="mr-2 fill-blue-500 cursor-pointer" />
      </div>
      <div className="flex flex-row items-center space-x-4 mr-10">
        <IoCall
          size={25}
          className="fill-blue-500 hover:fill-blue-500/90 cursor-pointer"
        />
        <IoMdVideocam
          size={25}
          className="fill-blue-500 hover:fill-blue-500/90 cursor-pointer"
        />
        <IoPersonAdd
          size={25}
          className="fill-blue-500 hover:fill-blue-500/90 cursor-pointer"
        />
      </div>
    </div>
  );
};
