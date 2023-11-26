import { useEffect, useState } from 'react';
import { UserDB } from '../../App';
import { getUserByID } from '../../services/users.services';
import Badge from '../Badge/Badge';

const Avatar = ({ userID }: { userID?: string }) => {

    const [userData, setUserData] = useState<UserDB>();

    useEffect(() => {
        if (!userID) return;
        const fetchUser = async () => {
            try {
                const res = await getUserByID(userID);
                setUserData(res);
                console.log("userID: ", res);
                console.log("data: ", res);
            } catch (error) {
                console.log("An error occurred: " + error);
            }
        }
        fetchUser()

    }, [userData?.status, userID])

    return (
        <div className="chat-image avatar">
            {userData?.avatar?.length ? (<div className="w-10 rounded-full">
                <img className="w-10 h-10 rounded-full" src={userData?.avatar} alt="avatar" />
                <Badge status={userData?.status} />
            </div>) : (
                <>
                    {/* <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <span class="font-medium text-gray-600 dark:text-gray-300">JL</span>
                    </div> */}
                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden  fill-blue-500 hover:fill-blue-500/90 dark:fill-purple-600/90 hover:dark:fill-purple-600 cursor-pointer">
                        <span className="font-medium text-gray-600 dark:text-gray-300" >{userData?.firstName?.charAt(0)?.toUpperCase() + userData?.lastName?.charAt(0)?.toUpperCase()}
                            <Badge status={userData?.status} />
                        </span>
                    </div>
                </>
            )}
        </div>
    )
}

export default Avatar