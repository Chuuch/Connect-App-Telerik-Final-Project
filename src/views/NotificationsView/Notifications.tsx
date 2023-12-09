import { onValue, ref } from 'firebase/database';
import { Notifications } from '../../components/Notifications/Notifications';
import { useState, useEffect } from 'react';
import { db } from '../../config/firebase-config';
import { Typewriter } from '../../components/Typewriter/Typewriter';
interface Message {
	content: string;
	id: string;
	author: string;
	userID: string;
	timestamp: number;
}

type NotificationType = 'message' | 'other';

interface AppNotification {
	type: NotificationType;
	id: string;
	author: string;
	userID: string;
	onNotificationsCleared: () => void;
}

export const NotificationsView = () => {
	const [notification, setNotification] = useState<AppNotification[]>([]);
	

	useEffect(() => {
		const notificationsRef = ref(db, 'notifications');
		const unsubscribe = onValue(notificationsRef, (snapshot) => {
			const data = snapshot.val();
			setNotification(data ? Object.values(data) : []);
		});

		return () => {
			unsubscribe();
		};
	}, [notification, setNotification]);

	return (
		<div className="bg-white dark:bg-gray-800 flex flex-row items-start justify-start lg:w-[1824px]">
			<div className="lg:h-full lg:w-[350px] md:w-[276px] md:h-[682px] shadow-xl bg-gray-100 dark:bg-gray-900">
				<Notifications
					notification={notification}
					userID={''}
					onNotificationsCleared={function (): void {
						throw new Error('Function not implemented.');
					}}
				/>
			</div>
			<div className="flex flex-col items-center justify-center lg:ml-[600px] lg:mt-[200px] space-y-4">
				<img src="connect2.png" alt="logo" className="lg:w-32 lg:h-32" />
				<h1 className="flex flex-row items-center justify-center text-6xl tracking-[5px] text-blue-500 dark:text-purple-500">
					Notifications
				</h1>
				<p className="uppercase text-slate-400 tracking-[20px] ml-4">
					Buddy Connect
				</p>
			</div>
		</div>
	);
};
