import { motion } from "framer-motion";
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'

// type Props = {}

export const Register = () => {
	return (
		<div className="h-screen flex flex-col justify-center items-center">
			<motion.div
            initial={{ y: -300, opacity: 0 }}
            transition={{ duration: 1.5 }}
            whileInView={{ opacity: 1, y: 0}}
            className="bg-white flex flex-col items-center justify-center space-y-2 w-[500px] h-[600px] border border-blue-500 rounded-lg">
				<span className="logo text-4xl text-blue-500 italic mb-6">
					Register
				</span>
				<form action="" className="flex flex-col space-y-6 text-lg">
					<input
						type="text"
						placeholder="Username"
                        required
						className="p-1 bg-white text-blue-500 border border-t-0 border-l-0 border-r-0 border-b-blue-500 focus:border-none"
                        minLength={5}
                        maxLength={35}
                        title="Username must be between 5 and 35 symbols"
					/>
					<input
						type="email"
						placeholder="Email"
                        required
						className="p-1 bg-white text-blue-500 border border-t-0 border-l-0 border-r-0 border-b-blue-500"
					/>
					<input
						type="password"
						placeholder="Password"
                        required
						className="p-1 bg-white text-blue-500 border border-t-0 border-l-0 border-r-0 border-b-blue-500"
					/>
					<input
						type="phone"
						placeholder="Phone number"
                        required
						className="p-1 bg-white text-blue-500 border border-t-0 border-l-0 border-r-0 border-b-blue-500"
					/>
					<input style={{ display: 'none'}} type="file" required/>
                    <label htmlFor="file" className="flex flex-row items-center space-x-2 cursor-pointer">
                        <MdOutlineAddPhotoAlternate size={35} className='fill-blue-500'/>
                        <span className="text-blue-500">Add an avatar</span>
                    </label>
					<button className="bg-blue-500 hover:bg-blue-500/90 text-white rounded-md h-12">
						Sign up
					</button>
					<p className="text-blue-500">
						You already have an account?{' '}
						<span className="hover:underline cursor-pointer">Log in</span>
					</p>
                    <div className="flex flex-row items-center justify-center">
                        <img src='connect2.png' alt='connect_logo' className="h-10 w-10"/>
                    </div>
				</form>
			</motion.div>
		</div>
	);
};
