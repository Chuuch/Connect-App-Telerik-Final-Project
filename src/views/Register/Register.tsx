import { motion } from "framer-motion";
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
// import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { HiKey, HiOutlineIdentification, HiOutlineMail, HiOutlineUser, HiPhone } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from '../../services/auth.services';
import { checkIfUserExist } from '../../services/users.services';
import { emailPattern, namePattern, passwordPattern, phonePattern, usernamePattern } from '../../utils/regexPatterns';
import { FaRegAddressCard } from 'react-icons/fa6'

type RegisterFormData = {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	phone: string;
	avatar?: string;
};

export const Register: FC = () => {
	const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<RegisterFormData>();

	const onSubmit = async ({ firstName, lastName, username, email, password, phone }: RegisterFormData) => {
		const isUserExist = await checkIfUserExist(username)

		if (isUserExist) {
			setError('username', {
				message: 'Username is already taken! Please, choose another one!',
			})
			return
		}

		const data = await registerUser(firstName, lastName, username, email, password, phone)

		if (data?.user) {
			// toast.success('Registration successful! Please, verify your account via sent email!')
			alert('Registration successful! Please, verify your account via sent email!')
			navigate('/login')
			reset()
		} else if (data?.error) {
			if (data?.error.includes('Email')) {
				setError('email', {
					message: data.error,
				})
				return
			}
			toast.error('Something went wrong! Please try again!')
		}
	};

	return (
		<div className="h-screen flex flex-col justify-center items-center">
			<motion.div
				initial={{ y: -300, opacity: 0 }}
				transition={{ duration: 1.5 }}
				whileInView={{ opacity: 1, y: 0 }}
				className="bg-gray-100 flex flex-col items-center justify-center space-y-2 w-[500px]  shadow-lg rounded-lg p-10">
				<span className="logo text-4xl text-blue-500 italic mb-6">
					Register
				</span>
				<form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col space-y-6 text-lg">
					<div className="flex items-center">
						{/* <div className="flex flex-row items-center justify-start"> */}
						<HiOutlineIdentification className="mr-2 text-gray-500" />
						<input
							type="text"
							placeholder="First Name"
							className="p-1 bg-white text-blue-500 border rounded-mdfocus:border-none"
							title="First name must be between 3 and 35 symbols"
							{...register('firstName', {
								required: 'First name is required',
								pattern: {
									value: namePattern,
									message: 'Invalid first name',
								},
							})}
						/>
					</div>
					{errors.firstName && <span className="text-red-500">{errors.firstName?.message}</span>}
					<div className="flex items-center">
						<HiOutlineIdentification className="mr-2 text-gray-500" />
						<input
							type="text"
							placeholder="Last Name"
							className="p-1 bg-white text-blue-500 border  rounded-mdfocus:border-none"
							title="Last name must be between 3 and 35 symbols"
							{...register('lastName', {
								required: 'Last name is required',
								pattern: {
									value: namePattern,
									message: 'Invalid last name',
								},
							})}
						/>
					</div>
					{errors.lastName && <span className="text-red-500">{errors.lastName?.message}</span>}
					<div className="flex items-center">
						<HiOutlineUser className="mr-2 text-gray-500" />
						<input
							type="text"
							placeholder="Username"
							className="p-1 bg-white text-blue-500 border rounded-md focus:outline-blue-500"
							title="Username must be between 5 and 35 symbols"
							{...register('username', {
								required: 'Username is required',
								pattern: {
									value: usernamePattern,
									message: 'Invalid username',
								},
							})}
						/>
					</div>
					{errors.username && <span className="text-red-500">{errors.username?.message}</span>}
					< div className="flex items-center" >
						<HiOutlineMail className="mr-2 text-gray-500" />
						<input
							type="email"
							placeholder="Email"
							className="p-1 bg-white text-blue-500 border rounded-md focus:outline-blue-500"
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: emailPattern,
									message: 'Invalid email',
								},
							})}
						/>
					</div >
					{errors.email && <span className="text-red-500">{errors.email?.message}</span>}
					< div className="flex items-center" >
						<HiKey className="mr-2 text-gray-500" />
						<input
							type="password"
							placeholder="Password"
							className="p-1 bg-white text-blue-500 border rounded-md focus:outline-blue-500"
							{...register('password', {
								required: 'Password is required',
								pattern: {
									value: passwordPattern,
									message: 'Invalid password',
								},
							})}
						/>
					</div >
					{errors.password && <span className="text-red-500 pt-1">{errors.password?.message}</span>}
					< div className="flex items-center" >
						<HiPhone className='mr-2 text-gray-500' />
						<input
							type="phone"
							placeholder="Phone number"
							className="p-1 bg-white text-blue-500 border rounded-md focus:outline-blue-500"
							{...register('phone', {
								required: 'Phone is required',
								pattern: {
									value: phonePattern,
									message: 'Invalid phone number',
								},
							})}
						/>
					</div >
					{errors.phone && <span className="text-red-500">{errors.phone?.message}</span>}
					{/* <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
						<span className="font-medium text-gray-600 dark:text-gray-100">JL</span>
					</div> */}
					{/* <input style={{ display: 'none' }} type="file" id='file' /> */}
					{/* <label htmlFor="file" className="flex flex-row items-center space-x-2 cursor-pointer"> */}
					{/* <MdOutlineAddPhotoAlternate size={35} className='fill-blue-500' /> */}
					{/* <div className="relative">
							<img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="" />
							<span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full">GS</span>
						</div> */}
					{/* <img src={Add} alt="" className="h-10 w-10 rounded-full" /> */}
					{/* <span className="text-blue-500">Add an avatar</span> */}
					{/* </label> */}
					<button type="submit" className="bg-blue-500 hover:bg-blue-500/90 text-white rounded-md h-12">
						Sign up
					</button>
					<p className="text-blue-500 text-base">
						You already have an account?{' '}
						<Link to="/login" className="hover:underline cursor-pointer text-base">Log in</Link>
					</p>
					<div className="flex flex-row items-center justify-center">
						<img src='connect2.png' alt='connect_logo' className="h-10 w-10" />
					</div>
				</form >
			</motion.div >
		</div >
	);
};
