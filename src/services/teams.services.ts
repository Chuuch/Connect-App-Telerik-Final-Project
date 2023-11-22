import { ref, get, update, push } from 'firebase/database';
import { db } from '../config/firebase-config';

interface Team {
  id: string;
  name: string;
  owner: string;
  members: string[]; 
  channels: string[];
}

export const createTeam = async (name: string, owner: string): Promise<string> => {
  // Fetch owner's username
  const ownerSnapshot = await get(ref(db, `/users/${owner}`));
  const ownerUsername: string = ownerSnapshot.val()?.username || '';

  // Create a new team object
  const team: Team = {
    id: '',
    name,
    owner: ownerUsername,
    members: [owner], 
    channels: [], 
  };

  // Push the new team to the database
  const newTeamRef = push(ref(db, 'teams'), team);
  const newTeamKey: string | null = newTeamRef.key;

  if (newTeamKey) {
    const updates = {
      [`teams/${newTeamKey}/id`]: newTeamKey,
      [`users/${owner}/teams/${newTeamKey}`]: true, // Add team to owner's list of teams
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
