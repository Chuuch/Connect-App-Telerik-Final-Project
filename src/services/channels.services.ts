import { push, ref, update } from 'firebase/database';
import { UserList } from '../components/Teams/CreateTeamForm';
import { auth, db } from '../config/firebase-config';
import { getUserByID } from './users.services';

export const createChannel = async (channelName: string, teamID: string, participants: UserList[] = []): Promise<string> => {
  const username = await getUserByID(auth?.currentUser?.uid)?.username || '';
  const channel = {
    id: '',
    channelName,
    // owner: username,
    userID: auth?.currentUser?.uid,
    timestamp: Date.now(),
    members: [...participants, { id: auth?.currentUser?.uid, name: username }],
  };

  const newChannelRef = push(ref(db, `teams/${teamID}/channels`), channel);
  const newChannelKey: string | null = newChannelRef.key;

  if (newChannelKey) {
    const updates = {
      [`teams/${teamID}/channels/${newChannelKey}/id`]: newChannelKey,
      [`users/${auth?.currentUser?.uid}/teams/${teamID}/channels/${newChannelKey}`]: channelName,
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
