import { off, onValue, ref } from "firebase/database";
import { Dispatch, SetStateAction, useEffect } from "react";
import {  auth, db } from "../../config/firebase-config";
import { unblockUser } from "../../services/users.services";
import toast from "react-hot-toast";
interface BlockedUsersProps {
    blockedUsers: string[];
    setBlockedUsers: Dispatch<SetStateAction<string[]>>;
  }

  interface BlockedUsersProps {
    blockedUsers: string[];
    setBlockedUsers: Dispatch<SetStateAction<string[]>>;
  }
  
  export const BlockedUsersList: React.FC<BlockedUsersProps> = ({ blockedUsers, setBlockedUsers }) => {
    useEffect(() => {

      const blockedUsersRef = ref(db, `users/${auth.currentUser?.uid}/blockedUsers`);
  
      const unsubscribe = onValue(blockedUsersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setBlockedUsers(Object.values(data));
        } else {
          setBlockedUsers([]);
        }
      });
  

      return () => {
        off(blockedUsersRef, 'value', unsubscribe);
      };
    }, [setBlockedUsers]);
  
    const handleUnblockUser = async (username: string) => {
      try {
        await unblockUser(username);
        setBlockedUsers((prevBlockedUsers) => 
        prevBlockedUsers.filter((username) => username !== username)
        );

        toast.success(`${username} was successfully unblocked!`);
      } catch (err) {
        toast.error('Error unblocking user. Please try again.');
        console.log(err);
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center w-[744px] rounded-lg bg-gray-100 dark:bg-gray-900 shadow-md p-10 cursor-pointer mt-6">
        <h2 className="text-xl font-semibold mb-4">Blocked Users</h2>
        {blockedUsers.length > 0 ? (
          <ul className="list-disc text-gray-500 space-x-4">
            {blockedUsers.map((username) => (
              <li key={username} className="flex justify-between items-center space-x-4">
                <span>{username}</span>
                <button
                  type="button"
                  onClick={() => handleUnblockUser(username)}
                  className="text-red-600 hover:underline focus:outline-none"
                >
                  Unblock
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No users blocked yet.</p>
        )}
  
        {/* Add any additional UI or logic related to blocked users here */}
      </div>
    );
  };