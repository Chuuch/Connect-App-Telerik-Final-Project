import { get, onValue, ref, update } from "firebase/database";
import { db } from "../config/firebase-config";

export interface ServiceNotification {
  id: string;
  type: 'message' | 'other';
  author: string;
}

export const getNotifications = (userID: string): Promise<ServiceNotification[]> => {
  const notificationsRef = ref(db, `notifications/${userID}`);

  return new Promise((resolve) => {
    onValue(notificationsRef, (snapshot) => {
      const notifications: ServiceNotification[] = [];
      snapshot.forEach((childSnapshot) => {
        notifications.push({ ...childSnapshot.val(), id: childSnapshot.key });
      });
      resolve(notifications);
    });
  });
};

export const clearNotifications = async (userID: string): Promise<void> => {
  const notificationRef = ref(db, `notifications/${userID}`);

  try {
    const notificationSnapshot = await get(notificationRef);
    const notification = notificationSnapshot.val();

    if (notification) {
      return update(ref(db), {
        [`notifications/${userID}`]: null,
      })
    }
  } catch (error) {
    console.error('Error clearing notifications:', error);
  }
}