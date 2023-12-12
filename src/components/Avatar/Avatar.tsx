import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { db } from '../../config/firebase-config';
import { Status } from '../../utils/status';
import Badge from '../Badge/Badge';

const Avatar = ({ userID }: { userID?: string }) => {

    const [status, setStatus] = useState<`${Status}` | undefined>(undefined);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');

    useEffect(() => {
        if (!userID) return;
    
        const unsubscribeStatus = onValue(ref(db, `users/${userID}/status`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setStatus(data);
            }
        });

        const unsubscribeFirstName = onValue(ref(db, `users/${userID}/firstName`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setFirstName(data);
            }
        });

        const unsubscribeLastName = onValue(ref(db, `users/${userID}/lastName`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setLastName(data);
            }
        });
        const unsubscribeAvatar = onValue(ref(db, `users/${userID}/avatar`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setAvatar(data);
            }
        });

        return () => {
            unsubscribeStatus();
            unsubscribeFirstName();
            unsubscribeLastName();
            unsubscribeAvatar();
        };
    }, [userID])

    return (
        <>
            {avatar?.length ? (
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img className="w-10 h-10 rounded-full" src={avatar} alt="avatar" />
                        <Badge status={status} />
                    </div>
                </div >
            ) : (
                <div className="chat-image ">
                    < div className="relative inline-flex items-center justify-center w-10 h-10  bg-gray-300 rounded-full dark:bg-gray-600 ">
                        <span className="font-medium text-gray-500 dark:text-gray-300 ">{firstName?.charAt(0).toUpperCase() + lastName?.charAt(0).toUpperCase()}</span>
                        <Badge status={status} />
                    </div >
                </div>
            )
            }
        </>
    )
}

export default Avatar