import { PiUserCircleFill } from 'react-icons/pi';
import { motion } from 'framer-motion';
import { ServiceNotification } from '../../services/notifications.services';
import { clearNotifications } from '../../services/notifications.services';
import Avatar from '../Avatar/Avatar';

interface NotificationsProps {
	notification: ServiceNotification[];
	userID: string;
	onNotificationsCleared: () => void;
}

export const Notifications: React.FC<NotificationsProps> = ({
	notification,
	userID,
	onNotificationsCleared,
}) => {
	const handleClearNotifications = async () => {
		try {
			await clearNotifications(userID);
			onNotificationsCleared();
		} catch (error) {
			console.error('Error clearing notifications:', error);
		}
	};

	return (
		<div>
			<motion.div
				initial={{ y: -100, opacity: 0 }}
				transition={{ duration: 1.2 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="lg:w-[350px] shadow-inner"
			>
				<ul className="flex flex-col pt-4 space-y-2">
					{notification.map((notif) => (
						<li
							key={notif.id}
							className="flex flex-row space-x-1 items-center text-md hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer h-full w-full p-2"
						>
							<Avatar userID={notif.userID}/>
							<p className="text-gray-500 dark:text-gray-300">
								{notif.author} sent you a message
							</p>
						</li>
					))}
				</ul>
			</motion.div>
			{notification.length > 0 && ( // Conditional rendering
				<motion.div
					initial={{ y: -100, opacity: 0 }}
					transition={{ duration: 1.2 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="flex items-center justify-center pt-5"
				>
					<button
						onClick={handleClearNotifications}
						className="bg-blue-500 hover:bg-blue-500/90 dark:bg-purple-600 text-white p-2 rounded-md text-sm"
					>
						Clear Notifications
					</button>
				</motion.div>
			)}
		</div>
	);
};
