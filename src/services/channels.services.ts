import { ref, update, push } from 'firebase/database';
import { auth, db } from '../config/firebase-config';

export const createChannel = async (channelName: string, teamID: string): Promise<string> => {
//   const ownerSnapshot = await get(ref(db, `/users/${auth?.currentUser?.uid}`));
//   const username: string = ownerSnapshot.val()?.username || '';

  const channel = {
    id: '',
    channelName,
    // owner: username,
    userID: auth?.currentUser?.uid,
    timestamp: Date.now(),
    members: [],  
  };

  const newChannelRef = push(ref(db, `teams/${teamID}/channels`), channel);
  const newChannelKey: string | null = newChannelRef.key;

  if (newChannelKey) {
    const updates = {
      [`teams/${teamID}/channels/${newChannelKey}/id`]: newChannelKey,
    //   [`users/${auth?.currentUser?.uid}/teams/${newChannelKey}`]: true,
    };

    try {
      await update(ref(db), updates);
      return newChannelKey;
    } catch (error) {
      console.error('Error updating data');
      return '';
    }
  } else {
    console.error('Error generating channel key');
    return '';
  }
};
