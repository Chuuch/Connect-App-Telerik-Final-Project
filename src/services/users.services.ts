import { get, ref, remove, set, update } from 'firebase/database';
import toast from 'react-hot-toast';
import { auth, db } from '../config/firebase-config';
import { Status } from '../utils/status';
import { UserList } from '../components/Teams/CreateTeamForm';

export interface User {
    avatar: string
    chats: object
    createdOn: number
    email: string
    firstName: string
    friends: object
    isLogged: boolean
    lastName: string
    phone: string
    status: `${Status}`
    teams: object
    uid: string
    username: string
    videoStreamId: string
}

export interface Friends {
    isFriend: boolean
    username: string
}

export const getUserByID = async (uid: string): Promise<User> => {
    return get(ref(db, `users/${uid}`))
        .then((snapshot) => {
            if (!snapshot.exists()) {
                return null
            }

            return snapshot.val();
        })
        .catch((error) => {
            toast.error(error.message);
        });
}

export const getAllUsers = async (): Promise<User[]> => {
    return get(ref(db, 'users'))
        .then(snapshot => {
            if (!snapshot.exists()) {
                return [];
            }
            return Object.values(snapshot.val());
        });
};

export const checkIfUserExist = async (username: string) => {
    const users: User[] = await getAllUsers();
    const existingUser = users.find((user: User) => user.username === username);
    if (existingUser) {
        return true
    }
    return false
}

export const updateUserStatus = async (uid: Pick<User, 'uid'>, status: Pick<User, 'status'>) => {
    return update(ref(db), {
        [`users/${uid}/status`]: status,
    });
};

export const updateUserIsLogged = async (uid: Pick<User, 'uid'>, isLogged: Pick<User, 'isLogged'>) => {
    return update(ref(db), {
        [`users/${uid}/isLogged`]: isLogged,
    });
};

export const updateUserAvatar = async (uid: Pick<User, 'uid'>, avatar: Pick<User, 'avatar'>) => {
    return update(ref(db), {
        [`users/${uid}/avatar`]: avatar,
    });
}

export const updateUserPhone = async (uid: Pick<User, 'uid'>, phone: Pick<User, 'phone'>) => {
    return update(ref(db), {
        [`users/${uid}/phone`]: phone,
    });
};

export const getUserByUsername = async (username: string) => {
    try {
        const allUsers = await get(ref(db, `users`));
        if (allUsers.exists()) {
            const userData = allUsers.val();
            const dataArray: User[] = Object.values(userData);
            for (const user of dataArray) {
                // console.log("User data: ", user.username)
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

export const getAllUserFriendsList = async (): Promise<UserList[]> => {
    return get(ref(db, `users/${auth?.currentUser?.uid}/friends`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                return [];
            }

            return Object.entries(snapshot.val() as { [key: string]: Friends })
                .filter(([, value]: [key: string, value: Friends]) => {
                    return value?.isFriend
                })
                .map(([key, value]) => ({ id: key, name: value?.username }));
        });
};

export const blockUser = async (username: string) => {
    const checkUser = await checkIfUserExist(username);
    if (!checkUser) {
        toast.error(`User ${username} not found!`)
    } else {
        set(ref(db, `users/${auth?.currentUser?.uid}/blockedUsers/${username}`), true);
    }
}


export const unblockUser = async (username: Pick<User, 'username'>) => {
    await remove(ref(db, `users/${auth?.currentUser?.uid}/blockedUsers/${username}`));
};