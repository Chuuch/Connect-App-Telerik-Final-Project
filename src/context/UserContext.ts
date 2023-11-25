import { Context, createContext } from 'react';
import { CurrentUserDB } from '../App';
import { DataSnapshot } from '@firebase/database';

interface UserContextType {
    currentUserDB?: CurrentUserDB;
    setCurrentUserDB?: (currentUserDB: CurrentUserDB & DataSnapshot) => void;
}

const UserContext: Context<UserContextType & object> = createContext({});

export default UserContext;