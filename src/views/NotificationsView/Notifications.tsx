// type Props = {}?

import { onValue, ref } from 'firebase/database';
import { MessageBox } from '../../components/MessageBox/MessageBox';
import { Messages } from '../../components/Messages/Messages';
import { Notifications } from '../../components/Notifications/Notifications';
import { useState, useEffect } from 'react';
import { db } from '../../config/firebase-config';
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
	const [msg, setMsg] = useState<Message[]>([]);
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

	useEffect(() => {
		const msgRef = ref(db, 'messages');
		const unsubscribe = onValue(msgRef, (snapshot) => {
			const data = snapshot.val();
			setMsg(data ? Object.values(data) : []);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<div className="bg-white dark:bg-black flex flex-grow items-start justify-start">
			<div className="h-full shadow-xl">
				<Notifications
					notification={notification}
					userID={''}
					onNotificationsCleared={function (): void {
						throw new Error('Function not implemented.');
					}}
				/>
			</div>
			<div className="flex flex-col w-full">
				<div className=" border-l dark:border-gray-600 shadow-inner overflow-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-blue-500 dark:scrollbar-thumb-purple-600 dark:scrollbar-track-gray-600">
					<Messages msg={msg} />
				</div>
				<div>
					<MessageBox />
				</div>
			</div>
		</div>
	);
};
