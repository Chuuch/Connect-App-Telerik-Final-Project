import { IoMdVideocam } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { IoCall } from 'react-icons/io5';
import { IoPersonAdd } from 'react-icons/io5';
import {useState, useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { get, ref } from 'firebase/database';
import { db } from '../../config/firebase-config';

export const Header = () => {
  const [results, setResults] = useState<Array<string>>([]);
	const [queryVal, setQueryVal] = useState<string>('');
  const navigate = useNavigate();

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
						const matches=[];
						for(const msg of dataArray){
							console.log("data: ", msg.content)
							if(msg.content && msg.content.toLowerCase().includes(queryVal.toLowerCase()))
              {
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
  return (
    <div className="relative flex flex-row items-center border-b dark:border-gray-600 bg-gray-100 dark:bg-gray-900 h-24">
      <img src="connect2.png" alt="logo" className="w-14 h-14 ml-5" />
      <div className="flex flex-row items-center w-full justify-center space-x-1 ml-60">
        <input
          type="text"
          placeholder="Search in chat"
          onChange={handleSearch} value={queryVal}
          className="rounded-full w-96 h-8 p-4 bg-white dark:bg-gray-800 text-gray-700  focus:border-blue-500 dark:text-gray-300 border dark:border-gray-700 dark:focus:border-purple-600 outline-none focus:outline-none bg-transparent"
        />
        <NavLink to='/search'>
        <IoSearch size={25} onClick={handleSubmit} className="mr-2 fill-blue-500 dark:fill-purple-600 cursor-pointer" />
        </NavLink>
      </div>
      <div className="flex flex-row items-center space-x-4 mr-10">
        <IoCall
          size={25}
          className="fill-blue-500 hover:fill-blue-500/90 dark:fill-purple-600/90 hover:dark:fill-purple-600 cursor-pointer"
        />
        <IoMdVideocam
          size={25}
          className="fill-blue-500 hover:fill-blue-500/90 dark:fill-purple-600/90 hover:dark:fill-purple-600 cursor-pointer"
        />
        <IoPersonAdd
          size={25}
          className="fill-blue-500 hover:fill-blue-500/90 dark:fill-purple-600/90 hover:dark:fill-purple-600 cursor-pointer"
        />
      </div>
    </div>
  );
};
