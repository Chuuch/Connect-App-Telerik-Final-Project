import { get, push, ref, remove, set, update } from 'firebase/database';
import { UserList } from '../components/Teams/CreateTeamForm';
import { auth, db } from '../config/firebase-config';
import toast from 'react-hot-toast';

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

export const getAllTeamsByUId = async () => {
  return await get(ref(db, 'teams'))
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

export const deleteTeam = async (uid: string, teamId: string, teamName: string) => {
  const ownerTeamSnapshot = await get(ref(db, `teams/${teamId}/userID`))
  const ownerTeam = ownerTeamSnapshot.val()

  const channelsSnapshot = await get(ref(db, `teams/${teamId}/channels`))
  const channels = Object.keys(channelsSnapshot.val())

  if (ownerTeam !== uid) {
    toast.error(`Sorry, only owner can delete a team`)
    return
  }

  for (const channel of channels) {
    await update(ref(db), {
      [`channelMessages/${channel}`]: null,
    });
  }

  await update(ref(db), {
    [`teams/${teamId}`]: null,
  });

  toast.success(`Team ${teamName} deleted successfully!`);
}

export const addMemberToTeam = async (members: UserList[], teamId: string) => {
  const membersrSnapshot = await get(ref(db, `teams/${teamId}/members`));
  const existingMembers: UserList[] = membersrSnapshot.val() || [];

  const filteredMembers = members.filter(m => !existingMembers.map(m => m.name).includes(m?.name))

  if (!filteredMembers.length) {
    toast.error(`${members.map(m => m.name).join(',')} has already exist in this team`)
  } else {
    try {
      const newMembers = [...existingMembers, ...filteredMembers]
      await remove(ref(db, `teams/${teamId}/members`))
      await set(ref(db, `teams/${teamId}/members`), [...newMembers]);
      return filteredMembers;
    } catch (error) {
      console.error('Error updating data');
      return '';
    }
  }
}