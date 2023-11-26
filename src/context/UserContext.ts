import { Context, createContext } from 'react';
import { UserDB } from '../App';
import { DataSnapshot } from '@firebase/database';

interface UserContextType {
    currentUserDB?: UserDB;
    setCurrentUserDB?: (currentUserDB: UserDB & DataSnapshot) => void;
}

const UserContext: Context<UserContextType & object> = createContext({});

export default UserContext;