import { motion } from "framer-motion";

// type Props = {}

export const Login = () => {
	return (
		<div className="h-screen w-screen flex flex-col justify-center items-center">
			<motion.div
            initial={{ y: -300, opacity: 0 }}
            transition={{ duration: 1.5 }}
            whileInView={{ opacity: 1, y: 0}}
            className="bg-white flex flex-col items-center justify-center space-y-2 w-[400px] h-[500px] border border-blue-500 rounded-lg">
				<span className="logo text-4xl text-blue-500 italic mb-12 mt-10">
					Login
				</span>
				<form action="" className="flex flex-col text-lg">
					<input
						type="email"
						placeholder="Email"
                        required
						className="p-1 mb-4 bg-white text-blue-500 border border-t-0 border-l-0 border-r-0 border-b-blue-500"
					/>
					<input
						type="password"
						placeholder="Password"
                        required
						className="p-1 bg-white text-blue-500 border border-t-0 border-l-0 border-r-0 border-b-blue-500"
					/>
                    <p className="text-md cursor-pointer hover:underline pb-10 mt-4">
                        Forgotten password
                    </p>
					<button className="bg-blue-500 hover:bg-blue-500/90 text-white rounded-md h-12 mb-4">
						Log in
					</button>
					<p className="text-blue-500 mb-4">
						You don't have an account?{' '}
						<span className="hover:underline cursor-pointer">Register</span>
					</p>
                    <div className="flex flex-row items-center justify-center">
                        <img src='connect2.png' alt='connect_logo' className="h-10 w-10"/>
                    </div>
				</form>
			</motion.div>
		</div>
	);
};
