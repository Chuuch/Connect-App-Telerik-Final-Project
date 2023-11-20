import { motion } from "framer-motion";
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { emailPattern, passwordPattern, phonePattern, usernamePattern } from '../../utils/regexPatterns';

// type Props = {}

export const Register = () => {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = (data: any) => console.log(data);

	return (
		<div className="h-screen flex flex-col justify-center items-center">
			<motion.div
				initial={{ y: -300, opacity: 0 }}
				transition={{ duration: 1.5 }}
				whileInView={{ opacity: 1, y: 0 }}
				className="bg-white flex flex-col items-center justify-center space-y-2 w-[500px] h-[600px] border border-blue-500 rounded-lg">
				<span className="logo text-4xl text-blue-500 italic mb-6">
					Register
				</span>
				<form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col space-y-6 text-lg">
					<input
						type="text"
						placeholder="Username"
						className="p-1 bg-white text-blue-500 border border-t-0 border-l-0 border-r-0 border-b-blue-500 focus:border-none"
						title="Username must be between 5 and 35 symbols"
						{...register('username', {
							required: 'Username is required',
							pattern: {
								value: usernamePattern,
								message: 'Invalid username',
							},
						})}
					/>
					{errors.username && <span className="text-red-500">{errors.username?.message}</span>}
					<input
						type="email"
						placeholder="Email"
						className="p-1 bg-white text-blue-500 border border-t-0 border-l-0 border-r-0 border-b-blue-500"
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: emailPattern,
								message: 'Invalid email',
							},
						})}
					/>
					{errors.email && <span className="text-red-500">{errors.email?.message}</span>}
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
					{errors.password && <span className="text-red-500">{errors.password?.message}</span>}
					<input
						type="phone"
						placeholder="Phone number"
						className="p-1 bg-white text-blue-500 border border-t-0 border-l-0 border-r-0 border-b-blue-500"
						{...register('phone', {
							required: 'Phone is required',
							pattern: {
								value: phonePattern,
								message: 'Invalid phone number',
							},
						})}
					/>
					{errors.phone && <span className="text-red-500">{errors.phone?.message}</span>}
					<input style={{ display: 'none' }} type="file" />
					<label htmlFor="file" className="flex flex-row items-center space-x-2 cursor-pointer">
						<MdOutlineAddPhotoAlternate size={35} className='fill-blue-500' />
						<span className="text-blue-500">Add an avatar</span>
					</label>
					<button type="submit" className="bg-blue-500 hover:bg-blue-500/90 text-white rounded-md h-12">
						Sign up
					</button>
					<p className="text-blue-500">
						You already have an account?{' '}
						<span className="hover:underline cursor-pointer">Log in</span>
					</p>
					<div className="flex flex-row items-center justify-center">
						<img src='connect2.png' alt='connect_logo' className="h-10 w-10" />
					</div>
				</form>
			</motion.div>
		</div>
	);
};
