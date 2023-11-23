import { AuthError, User, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, set } from 'firebase/database';
import toast from 'react-hot-toast';
import { auth } from '../config/firebase-config';
import { db } from './../config/firebase-config';

export interface UserType {
    uid: string;
    username: string;
    email: string;
    phone: string;
    createdOn: number;
}

export const verifyUser = async (user: User) => {
    try {
        await sendEmailVerification(user);
        toast.success('Verification email sent!')
    } catch (error) {
        toast.error('Something went wrong. Please, try again.')
    }
}

export const registerUser = async (username: string, email: string, password: string, phone: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        // Signed up
        const user = userCredential.user;
        console.log(user)
        // Register user in database
        set(ref(db, `users/${user?.uid}`), {
            uid: user?.uid, username, email, phone,
            createdOn: Date.now(),
        } as UserType & { createdOn: number });
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
        await signOut(auth);
        toast.success('Logout successful!')
        return true
    } catch (error) {
        toast.error('Something went wrong. Please, try again.')
        return false
    }
}