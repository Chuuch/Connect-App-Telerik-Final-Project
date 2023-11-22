import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../config/firebase-config';
import { RiTeamFill } from 'react-icons/ri';

interface Team {
  id: string;
  name: string;
  owner: string;
  members: object;
  channels: object;
}

export const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const teamsRef = ref(db, 'teams');
    const unsubscribe = onValue(teamsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTeams(Object.values(data));
      } else {
        setTeams([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <div className="flex justify-center p-2">
      <button className='bg-blue-500 hover:bg-blue-500/90 text-white p-2 rounded-md'>
        Create Team
      </button>
      </div>
      <ul className="flex flex-col">
    <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full w-96">
        <RiTeamFill size={40} className='fill-blue-500  cursor-pointer'/>
        <p className='text-gray-500'>Team Alpha</p>
    </li>
    <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full w-96">
        <RiTeamFill size={40} className='fill-blue-500 cursor-pointer'/>
        <p className='text-gray-500'>Team Beta</p>
    </li>
    <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full w-96">
        <RiTeamFill size={40} className='fill-blue-500 cursor-pointer'/>
        <p className='text-gray-500'>Team Gamma</p>
    </li>
  </ul>
      <h2>Teams</h2>
      {teams.map((team) => (
        <div className="team" key={team.id}>
          <h3>{team.name}</h3>
          <p>Owner: {team.owner}</p>
        </div>
      ))}
    </div>
  );
};
