import {
	HiOutlineMail,
	HiOutlinePhone,
	HiKey,
	HiPencilAlt,
	HiUserCircle,
	HiOutlineUser,
} from 'react-icons/hi';
import { motion } from 'framer-motion';

export const UserProfile = () => {
	return (
		<motion.div
			initial={{ y: -100, opacity: 0 }}
			transition={{ duration: 1.2 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className="flex justify-center items-center bg-gray-100 dark:bg-gray-800 rounded-lg"
		>
			<form className="flex flex-col justify-center items-center rounded-lg dark:rounded-lg bg-gray-200 dark:bg-gray-900 shadow-lg p-10 w-[500px] cursor-pointer overflow-hidden">
				<div className="flex justify-center mb-6">
					<HiUserCircle className="w-32 h-32 rounded-full fill-gray-400" />
				</div>

				<div className="flex justify-center">
					<button className="text-blue-500 hover:underline dark:text-purple-600">
						<HiPencilAlt className="inline-block mr-2" />
						Edit Avatar
					</button>
				</div>

				<div className="flex flex-col space-y-4 mt-6">
					<div className="flex flex-col">
						<label htmlFor="username" className="text-gray-500">
							Username
						</label>
						<div className="flex items-center">
							<HiOutlineUser className="mr-2 text-gray-500" />
							<input
								type="text"
								id="username"
								className="border p-2 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-purple-600 dark:bg-slate-800 dark:text-gray-200"
								placeholder="Your Username"
							/>
						</div>
					</div>

					<div className="flex flex-col">
						<label htmlFor="email" className="text-gray-500">
							Email
						</label>
						<div className="flex items-center">
							<HiOutlineMail className="mr-2 text-gray-500" />
							<input
								type="email"
								id="email"
								className="border p-2 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-purple-600 dark:bg-slate-800 dark:text-gray-200"
								placeholder="Your Email"
							/>
						</div>
					</div>

					<div className="flex flex-col">
						<label htmlFor="phone" className="text-gray-500">
							Phone
						</label>
						<div className="flex items-center">
							<HiOutlinePhone className="mr-2 text-gray-500" />
							<input
								type="tel"
								id="phone"
								className="border p-2 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-purple-600 dark:bg-slate-800 dark:text-gray-200"
								placeholder="Your Phone Number"
							/>
						</div>
					</div>

					<div className="flex flex-col">
						<label htmlFor="password" className="text-gray-500">
							Password
						</label>
						<div className="flex items-center">
							<HiKey className="mr-2 text-gray-500" />
							<input
								type="password"
								id="password"
								className="border p-2 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-purple-600 dark:bg-slate-800 dark:text-gray-200"
								placeholder="Your Password"
							/>
						</div>
					</div>
				</div>

				<div className="flex justify-center mt-6">
					<button className="bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 dark:hover:bg-purple-500 text-white w-72 py-2 rounded-md">
						Save Changes
					</button>
				</div>
			</form>
		</motion.div>
	);
};
