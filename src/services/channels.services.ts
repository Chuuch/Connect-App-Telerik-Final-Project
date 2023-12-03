import { get, push, ref, update } from 'firebase/database';
import { UserList } from '../components/Teams/CreateTeamForm';
import { auth, db } from '../config/firebase-config';
import { getUserByID } from './users.services';
import toast from 'react-hot-toast';

export const createChannel = async (channelName: string, teamID: string, participants: UserList[] = []): Promise<string> => {
  if (!auth?.currentUser?.uid) return ''
  const user = await getUserByID(auth?.currentUser?.uid) || '';
  const channel = {
    id: '',
    channelName,
    userID: auth?.currentUser?.uid,
    timestamp: Date.now(),
    members: [...participants, { id: auth?.currentUser?.uid, name: user.username }],
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


export const deleteChannel = async (uid: string, teamId: string, channelId: string, channelName: string) => {

  const teamMembersSnapshot = await get(ref(db, `teams/${teamId}/members`))
  const teamMember = teamMembersSnapshot.val().find((m: UserList) => m?.id === uid)

  if (!teamMember) {
    toast.error('Sorry, only team member could delete a channel')
  }

  await update(ref(db), {
    [`channelMessages/${channelId}`]: null,
    [`teams/${teamId}/channels/${channelId}`]: null,
  });

  toast.success(`Channel ${channelName} deleted successfully!`);
}
