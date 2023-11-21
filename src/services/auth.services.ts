import { User, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { ref, set } from 'firebase/database';
import toast from 'react-hot-toast';
import { auth } from '../config/firebase-config';
import type { UserType } from '../types/UserType';
import { db } from './../config/firebase-config';

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
        } as unknown as Partial<UserType>);
        await verifyUser(user)
        return { user: user?.uid }
    } catch (error) {
        if (error instanceof Error) {
            const errorMessage = error?.message;
            let errMsg = ''
            if (errorMessage.includes('email-already-in-use')) {
                errMsg = 'Please, choose another email address. This one is already in use.'
            } else {
                errMsg = 'Something went wrong. Please, try again.'
            }
            return { error: errMsg }
        }
    }
};