import { equalTo, get, orderByChild, push, query, ref, update } from 'firebase/database';
import { UserList } from '../components/Teams/CreateTeamForm';
import { auth, db } from '../config/firebase-config';

export const createTeam = async (teamName: string, participants: UserList[] = []): Promise<string> => {
  const ownerSnapshot = await get(ref(db, `/users/${auth?.currentUser?.uid}`));
  const username: string = ownerSnapshot.val()?.username || '';

  const team = {
    id: '',
    teamName,
    owner: username,
    userID: auth?.currentUser?.uid,
    members: [...participants, { id: auth?.currentUser?.uid, name: username }],
    channels: [],
    timestamp: Date.now(),
  };

  const newTeamRef = push(ref(db, 'teams'), team);
  const newTeamKey: string | null = newTeamRef.key;

  if (newTeamKey) {
    const updates = {
      [`teams/${newTeamKey}/id`]: newTeamKey,
      [`users/${auth?.currentUser?.uid}/teams/${newTeamKey}`]: team,
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

export const getAllTeamsByUId = () => {
  return get(ref(db, 'teams'))
    .then(snapshot => {
      if (!snapshot.exists()) {
        return [];
      }
      const returnArr = [] as object[];
      snapshot.forEach(grandchildSnapshot => {
        const item = grandchildSnapshot.val().members.find((member: any) => member.id === auth?.currentUser?.uid)
        if (item) {
          returnArr.push(grandchildSnapshot.val())

        }
      })
      return returnArr;
    });
};

