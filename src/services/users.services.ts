import { get, ref, set, update } from 'firebase/database';
import { db } from '../config/firebase-config';
import { UserType } from './auth.services';
import toast from 'react-hot-toast';

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
