import { ref, get, update, push } from 'firebase/database';
import { auth, db } from '../config/firebase-config';

export const createTeam = async (teamName: string): Promise<string> => {
  const ownerSnapshot = await get(ref(db, `/users/${auth?.currentUser?.uid}`));
  const username: string = ownerSnapshot.val()?.username || '';

  const team = {
    id: '',
    teamName,
    owner: username,
    userID: auth?.currentUser?.uid,
    timestamp: Date.now(),
    members: [], 
    channels: [], 
  };

  const newTeamRef = push(ref(db, 'teams'), team);
  const newTeamKey: string | null = newTeamRef.key;

  if (newTeamKey) {
    const updates = {
      [`teams/${newTeamKey}/id`]: newTeamKey,
      [`users/${username}/teams/${newTeamKey}`]: true,
    };

    try {
      await update(ref(db), updates);
      return newTeamKey;
    } catch (error) {
      console.error('Error updating data');
      return '';
    }
  } else {
    console.error('Error generating team key');
    return '';
  }
};
