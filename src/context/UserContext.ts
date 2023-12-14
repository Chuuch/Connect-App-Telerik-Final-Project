import { Context, createContext } from 'react';
import { User } from '../services/users.services';

interface UserContextType {
    currentUserDB?: User;
    setCurrentUserDB?: (currentUserDB: User) => void;
}

const UserContext: Context<UserContextType & object> = createContext({});

export default UserContext;