import { useEffect, useState } from 'react';
import { UserDB } from '../../App';
import { getUserByID } from '../../services/users.services';
import Badge from '../Badge/Badge';

const Avatar = ({ userID }: { userID?: string }) => {

    const [userData, setUserData] = useState<UserDB | null>(null);

    useEffect(() => {
        if (!userID) return;
        const fetchUser = async () => {
            try {
                const userByID = await getUserByID(userID);
                setUserData(userByID);
                console.log("userID: ", userByID);
                console.log("data: ", userByID);
            } catch (error) {
                console.log("An error occurred: " + error);
            }
        }
        fetchUser()

    }, [userData?.status, userID])

    return (
        <>
            {userData?.avatar?.length ? (
                <div className="chat-image avatar">
                    <div className="w-6 lg:w-10 rounded-full">
                        <img className="w-2 h-2 lg:w-10 lg:h-10 rounded-full" src={userData?.avatar} alt="avatar" />
                        <Badge status={userData?.status} />
                    </div>
                </div >
            ) : (
                <div className="chat-image ">
                    < div className="relative inline-flex items-center justify-center w-6 h-6  bg-gray-300 rounded-full dark:bg-gray-600 ">
                        <span className="font-medium text-gray-500 dark:text-gray-300 ">{userData?.firstName?.charAt(0).toUpperCase() + userData?.lastName?.charAt(0).toUpperCase()}</span>
                        <Badge status={userData?.status} />
                    </div >
                </div>
            )
            }
        </>
    )
}

export default Avatar