import { AuthError, User, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, set } from 'firebase/database';
import toast from 'react-hot-toast';
import { auth } from '../config/firebase-config';
import { Status } from '../utils/status';
import { db } from './../config/firebase-config';
import { updateUserIsLogged, updateUserStatus } from './users.services';


export const verifyUser = async (user: User) => {
    try {
        await sendEmailVerification(user);
        toast.success('Verification email sent!')
    } catch (error) {
        toast.error('Something went wrong. Please, try again.')
    }
}

export const registerUser = async (firstName: string, lastName: string, username: string, email: string, password: string, phone: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        // Signed up
        const user = userCredential.user;
        // Register user in database
        set(ref(db, `users/${user?.uid}`), {
            uid: user?.uid, firstName, lastName, username, email, phone, isLogged: false, status: Status.OFFLINE, avatar: '', isBlockedBy: '',
            createdOn: Date.now(),
        });
        await verifyUser(user)
        return { user: user?.uid }
    } catch (error) {
        if (error instanceof Error) {
            const errorMessage = error?.message;
            let errMsg = ''
            if (errorMessage.includes('email-already-in-use') || errorMessage.includes('EMAIL_EXISTS')) {
                errMsg = 'Email is already taken! Please, choose another one!'
            } else {
                errMsg = 'Something went wrong. Please, try again.'
            }
            return { error: errMsg }
        }
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        // Signed in
        const user = userCredential.user;
        return { user: user?.uid }
    } catch (error) {
        console.error('Login error:', error);
        const authError = error as AuthError;
        const errorMessage = authError.code;
        let errMsg = ''
        if (errorMessage === 'auth/invalid-login-credentials') {
            errMsg = 'Please check your credentials.'
        } else {
            errMsg = 'Something went wrong. Please, try again.'
        }
        return { error: errMsg }
    }
}

export const logoutUser = async () => {
    try {
        localStorage.removeItem('email')
        await updateUserIsLogged(auth.currentUser?.uid as string, false)
        await updateUserStatus(auth.currentUser?.uid as string, Status.OFFLINE)

        await signOut(auth);

        toast.success('Logout successful!')
        return true
    } catch (error) {
        toast.error('Something went wrong. Please, try again.')
        return false
    }
}