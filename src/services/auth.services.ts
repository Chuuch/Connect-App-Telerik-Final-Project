import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { ref } from 'firebase/storage';
import { set } from 'react-hook-form';
import toast from 'react-hot-toast';
import { auth, db } from '../config/firebase-config';
import type { UserType } from '../types/UserType';

export const verifyUser = async (user) => {
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
        // Update user profile with displayName in firebase
        // const displayName = `${firstName} ${lastName}`;
        // await updateProfile(user, { displayName });
        // Register user in database
        set(ref(db, `users/${user?.uid}`), {
            uid: user?.uid, username, email, phone,
            createdOn: Date.now(),
        } as Partial<UserType>);
        await verifyUser(user)
        return { user: user?.uid }
    } catch (error) {
        const errorMessage = error?.message;
        let errMsg = ''
        if (errorMessage.includes('email-already-in-use')) {
            errMsg = 'Please, choose another email address. This one is already in use.'
        } else {
            errMsg = 'Something went wrong. Please, try again.'
        }
        return { error: errMsg }
    }
};