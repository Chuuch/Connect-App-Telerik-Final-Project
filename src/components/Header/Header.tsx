import { get, ref } from 'firebase/database';
import { useContext, useEffect, useState } from 'react';
import { IoMdVideocam } from 'react-icons/io';
import { IoCall, IoPersonAdd, IoSearch } from 'react-icons/io5';
import { NavLink, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase-config';
import UserContext from '../../context/UserContext';
import { setUserFriend } from '../../services/users.services';
import Avatar from '../Avatar/Avatar';

export const Header = () => {
  const [results, setResults] = useState<Array<string>>([]);
  const [queryVal, setQueryVal] = useState<string>('');
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [userVal, setUserVal] = useState<string>('');
  const { currentUserDB } = useContext(UserContext);

  useEffect(() => {
    const searchFunc = async () => {
      try {
        if (queryVal.trim() !== '') {
          const msgQuery = await get(
            ref(db, 'messages'),

          );

          //const postsSnapshot = await get(msgQuery);
          console.log("Query Value: ", queryVal);
          //console.log("postsSnapshot.exists(): ", postsSnapshot.exists());
          //console.log("postsSnapshot.val(): ", postsSnapshot.val());
          if (msgQuery.exists()) {
            const msgData = msgQuery.val();
            const dataArray = Object.values(msgData);
            const matches: Array<string> = [];
            for (const msg of dataArray) {
              console.log("data: ", msg.content)
              if (msg.content && msg.content.toLowerCase().includes(queryVal.toLowerCase())) {
                console.log(msg);
                matches.push(msg);
              }
            }
            setResults(matches);
          } else {
            console.log("No results found");
            setResults([]);
          }
        }
      } catch (error) {
        console.log("An error occurred: " + error);
      }
    };

    searchFunc();
  }, [queryVal]);


  const handleSearch = (e) => {
    e.preventDefault();
    setQueryVal(e.target.value);
    console.log('Search:', e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    navigate(`/search/${queryVal}`, { state: { results } });
  };

  const handleSearchUser = (e) => {
    e.preventDefault();
    setUserVal(e.target.value);
  }

  const handleSubmitUser = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (userVal !== '')
      setUserFriend(userVal);
    console.log('Yeah:', e);
    setUserVal('')

  };
  return (
    <div className="relative flex flex-row items-center justify-between border-b dark:border-gray-600 bg-gray-100 dark:bg-gray-900 h-24">
      <img src="connect2.png" alt="logo" className="w-14 h-14 ml-5" />
      <div className="flex flex-row items-center space-x-1">
        <input
          type="text"
          placeholder="Search in chat"
          onChange={handleSearch}
          value={queryVal}
          className="rounded-full w-96 h-8 p-4 bg-white dark:bg-gray-800 text-gray-700 focus:border-blue-500 dark:text-gray-300 border dark:border-gray-700 dark:focus:border-purple-600 outline-none focus:outline-none bg-transparent"
        />
        <NavLink to="/search">
          <IoSearch
            size={25}
            onClick={handleSubmit}
            className="mr-2 fill-blue-500 dark:fill-purple-600 cursor-pointer"
          />
        </NavLink>
      </div>
      <div className="flex flex-row items-center space-x-4 mr-10">
        <IoCall
          size={25}
          onClick={handleSubmit}
          className="mr-2 fill-blue-500 dark:fill-purple-600 cursor-pointer"
        />
        <IoMdVideocam
          size={25}
          className="fill-blue-500 hover:fill-blue-500/90 dark:fill-purple-600/90 hover:dark:fill-purple-600 cursor-pointer"
        />
        <IoPersonAdd
          size={25}
          onClick={() => setShowForm(true)}
          className="fill-blue-500 hover:fill-blue-500/90 dark:fill-purple-600/90 hover:dark:fill-purple-600 cursor-pointer"
        />
        <Avatar userID={currentUserDB?.uid} />
      </div>
      {showForm && (
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2  translate-y-4">
          <div className="mt-4">
            <form className="flex flex-col space-y-4 justify-center items-center border bg-gray-100 dark:bg-gray-900 border-blue-500 dark:border-purple-500 rounded-md p-4">
              <label htmlFor="teamName" className="text-lg font-semibold dark:text-gray-400">
                Add friend:
              </label>
              <input
                type="text"
                id="userName"
                placeholder="Please select username"
                onChange={handleSearchUser}
                value={userVal}
                required
                className="px-4 py-2 border dark:border-gray-700 rounded-md focus:outline-none dark:text-gray-300 focus:border-blue-500 dark:focus:border-purple-500 dark:bg-slate-800"
              />
              <button
                type="button"
                onClick={handleSubmitUser}
                className="bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 dark:hover:bg-purple-500 text-white w-28 px-4 py-2 rounded-md text-sm"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 hover:dark:bg-purple-500 text-white w-28 px-4 py-2 rounded-md text-sm"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )
      }
    </div >
  );
};
