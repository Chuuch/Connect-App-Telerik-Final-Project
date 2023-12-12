import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { UserDB } from '../../App';
import { auth, db } from '../../config/firebase-config';
import Badge from '../Badge/Badge';

const Avatar = ({ userID }: { userID?: string }) => {

    const [userData, setUserData] = useState<UserDB | null>(null);

    useEffect(() => {
        if (!userID) return;
        const userRef = ref(db, `users/${userID}`);
        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                setUserData(data);
            } else {
                setUserData(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [userData?.status, userID])

    return (
        <>
            {userData?.avatar?.length ? (
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img className="w-10 h-10 rounded-full" src={userData?.avatar} alt="avatar" />
                        <Badge status={userData?.status} />
                    </div>
                </div >
            ) : (
                <div className="chat-image ">
                    < div className="relative inline-flex items-center justify-center w-10 h-10  bg-gray-300 rounded-full dark:bg-gray-600 ">
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