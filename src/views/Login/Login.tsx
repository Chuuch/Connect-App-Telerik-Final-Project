import { motion } from "framer-motion";
import { FC, useContext, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiKey, HiOutlineMail } from "react-icons/hi";
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import { auth } from '../../config/firebase-config';
import UserContext from '../../context/UserContext';
import { loginUser } from '../../services/auth.services';
import { getUserByID, updateUserIsLogged, updateUserStatus } from '../../services/users.services';
import { emailPattern, passwordPattern } from '../../utils/regexPatterns';
import { Status } from '../../utils/status';

type FormData = {
	email: string;
	password: string;
};
type Props = object;

export const Login: FC<Props> = () => {
	const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
	const [user] = useAuthState(auth)
	const { currentUserDB, setCurrentUserDB } = useContext(UserContext);

	// useEffect(() => {
	// 	if (user && user.emailVerified) {
	// 		navigate('/notifications')
	// 	}
	// 	console.log(currentUserDB)
	// }, [currentUserDB, navigate, user])

	const onSubmit: SubmitHandler<FormData> = async ({ email, password }: { email: string; password: string }) => {

		try {
			const data = await loginUser(email, password)
			const currentUser = auth.currentUser;

			if (data.user && currentUser?.emailVerified) {
				toast.success('Login successful!')

				await updateUserStatus(currentUser?.uid, Status.ONLINE)
				await updateUserIsLogged(currentUser?.uid, true)

				getUserByID(currentUser?.uid).then((userDB) => {
					console.log(userDB)
					userDB && setCurrentUserDB?.(userDB)
				})
				navigate('/notifications')
			} else if (data.user && !currentUser?.emailVerified) {
				toast.error('Please verify your email first!')
			} else {
				toast.error(data.error || 'Something went wrong! Please try again!')
			}
		} catch (error) {
			toast.error('Unexpected error! Please try again!')
		}
	}

	return (
		<div className="h-screen w-screen flex flex-col justify-center items-center">
			<motion.div
				initial={{ y: -300, opacity: 0 }}
				transition={{ duration: 1.5 }}
				whileInView={{ opacity: 1, y: 0 }}
				className="bg-gray-100 flex flex-col items-center justify-center space-y-2 w-[400px] h-[500px]  shadow-lg rounded-lg">
				<span className="logo text-4xl text-blue-500 italic mb-12 mt-10">
					Login
				</span>
				<form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col items-center text-lg">
					<div className="flex flex-row items-center">
						<HiOutlineMail className="mr-2 text-gray-500 mb-4" />

						<input
							type="email"
							placeholder="Email"
							className="p-1 mb-4 bg-white rounded-md text-blue-500 border focus:outline-blue-500"
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: emailPattern,
									message: 'Invalid email',
								}
							}
							)}
						/>
					</div>
					{errors.email && <span className="text-red-500">{errors.email.message}</span>}
					<div className="flex flex-row items-center">
						<HiKey className="mr-2 text-gray-500" />

						<input
							type="password"
							placeholder="Password"
							className="p-1 bg-white rounded-md text-blue-500 border focus:outline-blue-500"
							{...register('password', {
								required: 'Password is required',
								pattern: {
									value: passwordPattern,
									message: 'Invalid password',
								},
							})}
						/>
					</div>
					{errors.password && <span className="text-red-500">{errors.password.message}</span>}
					<p className="text-sm text-gray-500 hover:text-blue-500 cursor-pointer hover:underline pb-4 mr-24 mt-2">
						Forgotten password
					</p>
					<button className="bg-blue-500 hover:bg-blue-500/90 text-white rounded-md h-12 mb-4 w-36">
						Log in
					</button>
					<p className="text-blue-500 mb-4 text-base">
						You don't have an account?{' '}
						<Link to="/register" className="hover:underline cursor-pointer text-base">Register</Link>
					</p >
					<div className="flex flex-row items-center justify-center">
						<img src='connect2.png' alt='connect_logo' className="h-10 w-10" />
					</div>
				</form >
			</motion.div >
		</div >
	);
};
