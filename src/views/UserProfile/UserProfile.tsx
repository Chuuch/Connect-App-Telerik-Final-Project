import {
	EmailAuthProvider,
	reauthenticateWithCredential,
	updatePassword,
} from '@firebase/auth';
import { ref } from '@firebase/storage';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { motion } from 'framer-motion';
import { BaseSyntheticEvent, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaCloudUploadAlt } from 'react-icons/fa';
import {
	HiKey,
	HiOutlineMail,
	HiOutlinePhone,
	HiOutlineUser,
} from 'react-icons/hi';
import { auth, storage } from '../../config/firebase-config';
import UserContext from '../../context/UserContext';
import {
	updateUserAvatar,
	updateUserPhone,
} from '../../services/users.services';
import { passwordPattern, phonePattern } from '../../utils/regexPatterns';

interface UserProfileFormData {
	phone: string;
}

interface PasswordFormData {
	currentPassword: string;
	newPassword: string;
	confirmNewPassword: string;
}

export const UserProfile = () => {
	const { currentUserDB, setCurrentUserDB } = useContext(UserContext);
	const [user] = useAuthState(auth);
	const {
		register: register1,
		handleSubmit: handleSubmit1,
		formState: { errors: errors1 },
	} = useForm<UserProfileFormData>();
	const {
		register: register2,
		handleSubmit: handleSubmit2,
		formState: { errors: errors2 },
	} = useForm<PasswordFormData>();
	const [uploadImage, setUploadImage] = useState(null);
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const [avatar, setAvatar] = useState('');

	useEffect(() => {
		uploadImage && console.log(uploadImage);
		console.log(user);
	}, [uploadImage, user]);

	useEffect(() => {
		if (user) {
			const imageRef = ref(storage, `images/${user.uid}`);
			getDownloadURL(imageRef)
				.then((url) => setAvatar(url))
				.catch((error) => console.error('Error getting avatar URL:', error));
		}
	}, [user]);

	const handlePassword = async (newPassword: string) => {
		if (!user) return;
		try {
			await updatePassword(user, newPassword);
			toast.success('Password updated successfully!');
		} catch (error) {
			toast.error(
				'Error updating password. Please check the console for details.'
			);
		}
	};

	const onChangePassword = async ({
		currentPassword,
		newPassword,
		confirmNewPassword,
	}: PasswordFormData) => {
		if (!user) return;
		if (newPassword === confirmNewPassword && user?.email) {
			const credential = EmailAuthProvider.credential(
				user.email,
				currentPassword
			);
			try {
				await reauthenticateWithCredential(user, credential);
				await handlePassword(newPassword);
				alert('Password changed successfully!');
			} catch (error) {
				toast.error(
					'Error reauthenticating. Please check the console for details.'
				);
			}
		} else {
			toast.error('Passwords do not match.');
		}
	};

	const onChangeProfile = async ({ phone }: UserProfileFormData) => {
		console.log(phone);
		if (user?.uid) {
			try {
				await updateUserPhone(user?.uid, phone);
				alert('Phone changed successfully!');
			} catch (error) {
				toast.error('Error changing profile!');
			}
		}
	};

	const uploadFile = () => {
		if (uploadImage === null) return;

		if (uploadImage?.size > 1024 * 1024 * 5) {
			toast.error('File size should be less than 5MB');
			// setErrorMessage('File size should be less than 5MB');
			return;
		} else if (
			uploadImage?.type !== 'image/jpeg' &&
			uploadImage?.type !== 'image/png'
		) {
			toast.error('File format is incorrect');
			return;
		}

		const imageRef = ref(storage, `images/${user?.uid}`);

		uploadBytes(imageRef, uploadImage)
			.then(() => {
				toast.success('Image uploaded successfully');
				// setErrorMessage(null);
			})
			.catch(() => {
				toast.error('Failed to upload the image');
			});
	};

	const onChangeAvatar = async (e: BaseSyntheticEvent) => {
		// uploadFile()

		const selectedFile = e.target.files[0];
		if (selectedFile) {
			setUploadImage(selectedFile);
			setPreviewImage(URL?.createObjectURL(selectedFile));
			console.log(currentUserDB)
			setCurrentUserDB?.({
				...currentUserDB,
				avatar: URL?.createObjectURL(selectedFile),
			});
			// setErrorMessage(null);
		} else {
			setUploadImage(null);
			setPreviewImage(null);
			// setErrorMessage('Please select an image to upload');
			return;
		}
	};

	const handleSaveAvatar = async () => {
		uploadFile();
		if (user?.uid && avatar) {
			await updateUserAvatar(user?.uid, avatar);
		}
		alert('Avatar saved successfully!');
	};

	return (
		<motion.div
			initial={{ y: -100, opacity: 0 }}
			transition={{ duration: 1.2 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 h-full w-full rounded-lg"
		>
			<div className="flex flex-col justify-center items-start rounded-lg dark:rounded-lg bg-gray-100 dark:bg-gray-900 shadow-lg space-y-4 p-10 w-full h-full md:w-[600px] lg:h-[600px] lg:w-[600px] cursor-pointer overflow-hidden">
				<div className="flex flex-col items-start ml-10">
					<div className="flex flex-col justify-start items-start ">
						{previewImage || avatar ? (
							<img
								src={previewImage ?? avatar}
								alt="User Avatar"
								className="w-32 h-32 rounded-full text-blue-500 dark:text-purple-500"
							/>
						) : (
							<HiOutlineUser className="w-32 h-32 md:h-16 md:w-16 rounded-full text-blue-500 dark:text-purple-500" />
						)}
						<label htmlFor='avatar-upload'>
							<FaCloudUploadAlt className='md:w-10 md:h-10 fill-blue-500 dark:fill-purple-500 ml-3 cursor-pointer' />
						</label>
						<input
							type="file"
							accept="image/*"
							id="avatar-upload"
							className="flex  text-blue-500 dark:text-purple-500 mt-4 md:h-10 md:w-10"
							onChange={onChangeAvatar}
							style={{ display: 'none' }}
						/>
					</div>

					{/* <div className="flex justify-center">
					<button className="text-blue-500 hover:underline dark:text-purple-600"
						onClick={() => handleSaveAvatar()}>
						<HiPencilAlt className="inline-block mr-2" />
						Save Avatar
					</button>
				</div> */}
					<button
						onClick={() => handleSaveAvatar()}
						className="md:w-32 md:h-10 lg:w-[150px] bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 dark:hover:bg-purple-500 text-white w-52 py-2 mt-4 rounded-md"
					>
						Save Avatar
					</button>
				</div>
				<div className="flex flex-row space-x-10">
					<form onSubmit={handleSubmit1(onChangeProfile)}>
						<div className="flex flex-col space-y-4">
							<div className="flex flex-col">
								<label htmlFor="username" className="text-gray-500 pt-4">
									Username
								</label>
								<div className="flex items-center">
									<HiOutlineUser className="mr-2 text-gray-500" />
									<input
										type="text"
										id="username"
										className="border dark:border-gray-700 p-2 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-purple-600 dark:bg-slate-800 dark:text-gray-200"
										placeholder={currentUserDB?.username}
										disabled
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
										className="border dark:border-gray-700 p-2 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-purple-600 dark:bg-slate-800 dark:text-gray-200"
										placeholder={currentUserDB?.email}
										disabled
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
										className="border dark:border-gray-700 p-2 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-purple-600 dark:bg-slate-800 dark:text-gray-200"
										placeholder="Your Phone Number"
										{...register1('phone', {
											value: currentUserDB?.phone,
											required: 'Phone is required',
											pattern: {
												value: phonePattern,
												message: 'Invalid phone',
											},
										})}
									/>
								</div>
								{errors1.phone && (
									<span className="text-red-500">{errors1.phone?.message}</span>
								)}
							</div>
							<div className="flex justify-center my-2">
								<button className="md:w-32 md:h-10 lg:w-[180px] bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 dark:hover:bg-purple-500 text-white w-72 py-2 rounded-md">
									Save Profile
								</button>
							</div>
						</div>
					</form>

					<form onSubmit={handleSubmit2(onChangePassword)}>
						<div className="space-y-4">
							<div className="flex flex-col">
								<label htmlFor="currentPassword" className="text-gray-500 pt-4">
									Current Password
								</label>
								<div className="flex items-center">
									<HiKey className="mr-2 text-gray-500" />
									<input
										type="password"
										id="currentPassword"
										className="border dark:border-gray-700 p-2 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-purple-600 dark:bg-slate-800 dark:text-gray-200"
										placeholder="Current Password"
										{...register2('currentPassword', {
											required: 'Current Password is required',
											pattern: {
												value: passwordPattern,
												message: 'Invalid current password',
											},
										})}
									/>
								</div>
								{errors2.currentPassword && (
									<span className="text-red-500">
										{errors2.currentPassword?.message}
									</span>
								)}
							</div>
							<div className="flex flex-col">
								<label htmlFor="password" className="text-gray-500">
									New Password
								</label>
								<div className="flex items-center">
									<HiKey className="mr-2 text-gray-500" />
									<input
										type="password"
										id="newPassword"
										className="border dark:border-gray-700 p-2 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-purple-600 dark:bg-slate-800 dark:text-gray-200"
										placeholder="New Password"
										{...register2('newPassword', {
											required: 'New Password is required',
											pattern: {
												value: passwordPattern,
												message: 'Invalid new password',
											},
										})}
									/>
								</div>
								{errors2.newPassword && (
									<span className="text-red-500">
										{errors2.newPassword?.message}
									</span>
								)}
							</div>
							<div className="flex flex-col pb-2">
								<label htmlFor="password" className="text-gray-500">
									Confirm New Password
								</label>
								<div className="flex items-center">
									<HiKey className="mr-2 text-gray-500" />
									<input
										type="password"
										id="confirmNewPassword"
										className="border dark:border-gray-700 p-2 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-purple-600 dark:bg-slate-800 dark:text-gray-200"
										placeholder="Confirm New Password"
										{...register2('confirmNewPassword', {
											required: 'Confirm New Password is required',
											pattern: {
												value: passwordPattern,
												message: 'Invalid confirm new password',
											},
										})}
									/>
								</div>
								{errors2.confirmNewPassword && (
									<span className="text-red-500">
										{errors2.confirmNewPassword?.message}
									</span>
								)}
							</div>
						</div>
						<div className="flex justify-center my-2">
							<button className="md:w-32 md:h-10 lg:w-[180px] bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 dark:hover:bg-purple-500 text-white w-72 py-2 rounded-md">
								Save New Password
							</button>
						</div>
					</form>
				</div>
			</div>
		</motion.div>
	);
};
