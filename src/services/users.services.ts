import { get, push, ref, update } from 'firebase/database';
import toast from 'react-hot-toast';
import { auth, db } from '../config/firebase-config';
import { UserType } from './auth.services';

export const getUserByID = (uid: string) => {
    return get(ref(db, `users/${uid}`)).then((snapshot) => {
        if (!snapshot.exists()) {
            return null
        }
        return snapshot.val();
    })
        .catch((error) => {
            toast.error(error.message);
        });
}

export const getAllUsers = () => {
    return get(ref(db, 'users'))
        .then(snapshot => {
            if (!snapshot.exists()) {
                return [];
            }
            return Object.values(snapshot.val()) as UserType[];
        });
};

export const checkIfUserExist = async (username: string) => {
    const users: UserType[] = await getAllUsers();
    const existingUser = users.find((user: UserType) => user.username === username);
    if (existingUser) {
        return true
    }
    return false
}

export const updateUserStatus = (uid: string, status: string) => {
    return update(ref(db), {
        [`users/${uid}/status`]: status,
    });
};

export const updateUserIsLogged = (uid: string, isLogged: boolean) => {
    return update(ref(db), {
        [`users/${uid}/isLogged`]: isLogged,
    });
};

export const updateUserAvatar = async (uid: string, avatar: string) => {
    return update(ref(db), {
        [`users/${uid}/avatar`]: avatar,
    });
}

export const updateUserPhone = (uid: string, phone: string) => {
    return update(ref(db), {
        [`users/${uid}/phone`]: phone,
    });
};

export const getUserByUsername = async (username: string) => {
    try {
        const allUsers = await get(ref(db, `users`));
        if (allUsers.exists()) {
            const userData = allUsers.val();
            const dataArray = Object.values(userData);
            for (const user of dataArray) {
                console.log("User data: ", user.username)
                if (user.username && user.username === username) {
                    console.log(`User with username ${username} is found!`);
                    return user.uid
                } else {
                    console.log(`No such user ${username} found!`);
                }
            }
        }
    } catch (err) {
        console.log("An error occurred: " + err);
    }
}

export const setUserFriend = async (username: string) => {
    try {
        const userId = await getUserByUsername(username);
        const currentFriendsRef = await get(ref(db, `users/${auth?.currentUser?.uid}/friends`));
        const currentUserInfo = await getUserByID(auth?.currentUser?.uid);
        const currentUsername = currentUserInfo.username;
        console.log("info: ", currentUsername);
        
        let currentFriends = currentFriendsRef.val();
        if (!Array.isArray(currentFriends)) {
            currentFriends = [];
        }

        // const chat = {
        //     id: '',
        //     participants: [auth?.currentUser?.uid, userId],
        //     timestamp: Date.now(),
        //     messages: [],
        //   };

        // const newChatRef = push(ref(db, 'chats'), chat);
        // const newChatKey: string | null = newChatRef.key;

        if (userId && !currentFriends.includes(userId) && userId !== auth?.currentUser?.uid) {
            currentFriends.push(userId);
            const updates = {
                [`users/${auth?.currentUser?.uid}/friends/${userId}/isFriend`]: true,
                [`users/${userId}/friends/${auth?.currentUser?.uid}/isFriend`]: true,
                [`users/${auth?.currentUser?.uid}/friends/${userId}/username`]: username,
                [`users/${userId}/friends/${auth?.currentUser?.uid}/username`]: currentUsername,
                // [`chats/${newChatKey}/id`]: newChatKey,
                // [`users/${auth?.currentUser?.uid}/chats/${newChatKey}`]: true,
                // [`users/${userId}/chats/${newChatKey}`]: true
            } 
            await update(ref(db), updates);
            toast.success(`Friend ${username} added successfully!`);
        } else {
            console.log(`Friend ${username} is already in the list!`);
        }
    } catch (err) {
        console.log("An error occurred", err);
    }
}

export const setUserFriendChat = async (username: string) => {
    try {
        const userId = await getUserByUsername(username);
        const currentFriendsRef = await get(ref(db, `users/${auth?.currentUser?.uid}/friends`));
        const currentUserInfo = await getUserByID(auth?.currentUser?.uid);
        const currentUsername = currentUserInfo.username;
        console.log("info: ", currentUsername);
        
        let currentFriends = currentFriendsRef.val();
        if (!Array.isArray(currentFriends)) {
            currentFriends = [];
        }

        const chat = {
            id: '',
            participants: [auth?.currentUser?.uid, userId],
            timestamp: Date.now(),
            messages: [],
          };

        // const newChatRef = push(ref(db, 'chats'), chat);
        // const newChatKey: string | null = newChatRef.key;
          const chatId = auth?.currentUser?.uid + userId;
        if (userId && !currentFriends.includes(userId) && userId !== auth?.currentUser?.uid) {
            currentFriends.push(userId);
            const updates = {
                [`users/${auth?.currentUser?.uid}/friends/${userId}/isFriend`]: true,
                [`users/${userId}/friends/${auth?.currentUser?.uid}/isFriend`]: true,
                [`users/${auth?.currentUser?.uid}/friends/${userId}/username`]: username,
                [`users/${userId}/friends/${auth?.currentUser?.uid}/username`]: currentUsername,
                [`chats/${chatId}/id`]: chatId,
                [`users/${auth?.currentUser?.uid}/chats/${chatId}`]: true,
                [`users/${userId}/chats/${chatId}`]: true
            } 
            await update(ref(db), updates);
            toast.success(`Friend ${username} added successfully!`);
        } else {
            console.log(`Friend ${username} is already in the list!`);
        }
    } catch (err) {
        console.log("An error occurred", err);
    }
}

export const getAllUserFriendsList = () => {
    return get(ref(db, `users/${auth?.currentUser?.uid}/friends`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                return [];
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            return Object.entries(snapshot.val()).filter(([key, value]) => {
                return value?.isFriend
            }).map(([key, value]) => ({ id: key, name: value?.username }));
        });
};