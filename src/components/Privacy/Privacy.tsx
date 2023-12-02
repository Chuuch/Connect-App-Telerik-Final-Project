import { useState } from 'react';
import { motion } from 'framer-motion';
import { BlockedUsersList } from '../ BlockedUsers/BlockedUsers';
import { blockUser, checkIfUserExist } from '../../services/users.services';
import toast from 'react-hot-toast';

interface PrivacyProps {
  // You can define any props for Privacy if needed
}



interface PrivacyProps {
  // You can define any props for Privacy if needed
}


export const Privacy: React.FC<PrivacyProps> = () => {
  const [blockedUser, setBlockedUser] = useState<string>('');
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  const handleBlockUser = async () => {
    const userExists = await checkIfUserExist(blockedUser)
    if (blockedUser.trim() !== '') {
      try {
        if (userExists) {
          await blockUser(blockedUser);
          setIsBlocked(true);
          setBlockedUser('');
          setBlockedUsers([...blockedUsers, blockedUser]);
          toast.success(`${blockedUser} was successfully blocked!`);
        }
      } catch (error) {
        toast.error('Error blocking user. Please try again.');
        console.log(error);
        
      }
    }
  };

  return (
    <div className="div">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-start justify-center bg-white dark:bg-black"
      >
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
                className="border dark:border-gray-700 p-2 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:focus:border-purple-600 dark:text-gray-200"
                placeholder="Username"
              />
            </div>
            <button
              type="button"
              onClick={handleBlockUser}
              className="bg-red-600 hover:bg-red-500 text-white w-full py-2 rounded-md"
            >
              {isBlocked ? 'Block User' : 'Block User'}
            </button>
          </div>
          <div className="mt-4 text-gray-500">
            <p>
              By blocking a user, you prevent them from interacting with you and seeing your content.
            </p>
          </div>
        </form>

        {/* Blocked Users Card */}
        <div className="flex flex-row items-center justify-center">
          <BlockedUsersList blockedUsers={blockedUsers} setBlockedUsers={setBlockedUsers} />
        </div>
       
      </motion.div>
    </div>
  );
};

