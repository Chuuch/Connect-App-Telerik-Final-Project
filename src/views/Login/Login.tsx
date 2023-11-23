import { motion } from "framer-motion";
import { FC, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import { auth } from '../../config/firebase-config';
import { loginUser } from '../../services/auth.services';
import { emailPattern, passwordPattern } from '../../utils/regexPatterns';

type FormData = {
	email: string;
	password: string;
};
type Props = object;

export const Login: FC<Props> = () => {
	const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
	const [user] = useAuthState(auth)

	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [navigate, user])

	const onSubmit: SubmitHandler<FormData> = async ({ email, password }: { email: string; password: string }) => {

		try {
			const data = await loginUser(email, password)
			const currentUser = auth.currentUser;
			console.log(currentUser)
			if (data.user && currentUser?.emailVerified) {
				toast.success('Login successful!')
				// navigate('/')
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
				className="bg-white flex flex-col items-center justify-center space-y-2 w-[400px] h-[500px] border border-blue-500 rounded-lg">
				<span className="logo text-4xl text-blue-500 italic mb-12 mt-10">
					Login
				</span>
				<form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col text-lg">
					<input
						type="email"
						placeholder="Email"
						className="p-1 mb-4 bg-white text-blue-500 border border-t-0 border-l-0 border-r-0 border-b-blue-500"
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: emailPattern,
								message: 'Invalid email',
							}
						}
						)}
					/>
					{errors.email && <span className="text-red-500">{errors.email.message}</span>}
					<input
						type="password"
						placeholder="Password"
						className="p-1 bg-white text-blue-500 border border-t-0 border-l-0 border-r-0 border-b-blue-500"
						{...register('password', {
							required: 'Password is required',
							pattern: {
								value: passwordPattern,
								message: 'Invalid password',
							},
						})}
					/>
					{errors.password && <span className="text-red-500">{errors.password.message}</span>}
					<p className="text-md cursor-pointer hover:underline pb-10 mt-4">
						Forgotten password
					</p>
					<button className="bg-blue-500 hover:bg-blue-500/90 text-white rounded-md h-12 mb-4">
						Log in
					</button>
					<p className="text-blue-500 mb-4">
						You don't have an account?{' '}
						<Link to="/register" className="hover:underline cursor-pointer">Register</Link>
					</p >
					<div className="flex flex-row items-center justify-center">
						<img src='connect2.png' alt='connect_logo' className="h-10 w-10" />
					</div>
				</form >
			</motion.div >
		</div >
	);
};
