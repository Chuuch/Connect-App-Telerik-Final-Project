import { useState } from 'react';
import { motion } from 'framer-motion';

export const Privacy = () => {
  const [blockedUser, setBlockedUser] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);

  const handleBlockUser = () => {
    setIsBlocked(true);
    setBlockedUser('');
  };

  return (
    <motion.div
    initial={{ y: -100, opacity: 0 }}
			transition={{ duration: 1.2 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
     className="flex items-start pt-24 justify-center h-screen w-full bg-white dark:bg-black">
      <form className="flex flex-col items-center rounded-lg bg-gray-100 dark:bg-gray-900 shadow-md p-10 cursor-pointer overflow-hidden">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="blockedUser" className="text-gray-500">
              Enter Username to Block
            </label>
            <input
              type="text"
              id="blockedUser"
              value={blockedUser}
              onChange={(e) => setBlockedUser(e.target.value)}
              className="border p-2 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:focus:border-purple-600 dark:text-gray-200"
              placeholder="Username"
            />
          </div>
          <button
            type="button"
            onClick={handleBlockUser}
            className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-md"
          >
            {isBlocked ? 'User Blocked' : 'Block User'}
          </button>
        </div>
        <div className="mt-4 text-gray-500">
          <p>
            By blocking a user, you prevent them from interacting with you and seeing your content.
          </p>
        </div>
      </form>
    </motion.div>
  );
};
