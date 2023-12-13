import { useEffect, useState } from "react"
import { IoSunny } from 'react-icons/io5';
import { IoMoon } from "react-icons/io5";


export const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <div  className={`app ${darkMode ? 'dark' : ''}`}>
      <button onClick={toggleDarkMode}>
        {darkMode ? <IoSunny size={20} className='dark:fill-purple-600'/> : <IoMoon size={20} className='fill-blue-500'/>}
      </button>
    </div>
  );
};

