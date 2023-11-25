import { Database, get, ref, update } from 'firebase/database';
import { db } from '../config/firebase-config';
import { UserType } from './auth.services';

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

export const updateUserStatus = (db: Database, uid: string, status: string) => {
    return update(ref(db), {
        [`users/${uid}/status`]: status,
    });
};

export const updateUserIsLogged = (handle, isLogged) => {
    return update(ref(db), {
        [`users/${handle}/status`]: isLogged,
    });
};