// import { useEffect, useState } from 'react';
// import { ref, onValue } from 'firebase/database';
// import { db } from '../../config/firebase-config';
import { RiTeamFill } from 'react-icons/ri';

// interface Team {
//   id: string;
//   name: string;
//   owner: string;
//   members: object;
//   channels: object;
// }

export const Teams = () => {
  // const [teams, setTeams] = useState<Team[]>([]);

  // useEffect(() => {
  //   const teamsRef = ref(db, 'teams');
  //   const unsubscribe = onValue(teamsRef, (snapshot) => {
  //     const data = snapshot.val();
  //     if (data) {
  //       setTeams(Object.values(data));
  //     } else {
  //       setTeams([]);
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <div className='w-96'>
      <div className="flex flex-row justify-center items-center border-b p-2">
      <div className="flex items-center justify-center">
        <h2 className="text-blue-500 text-2xl font-bold p-2 ">Teams</h2>
      </div>
      
      </div>
      <div className="shadow-inner">
      <ul className="flex flex-col pt-4 space-y-2">
    <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full w-full p-2">
        <RiTeamFill size={40} className='fill-blue-500  cursor-pointer'/>
        <p className='text-gray-500'>Team Alpha</p>
    </li>
    <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full w-full p-2">
        <RiTeamFill size={40} className='fill-blue-500 cursor-pointer'/>
        <p className='text-gray-500'>Team Beta</p>
    </li>
    <li className="flex flex-row space-x-1 items-center text-md hover:bg-gray-100 cursor-pointer h-full w-full p-2">
        <RiTeamFill size={40} className='fill-blue-500 cursor-pointer'/>
        <p className='text-gray-500'>Team Gamma</p>
    </li>
  </ul>
  <div className="flex items-center justify-center pt-5">
  <button className='bg-blue-500 hover:bg-blue-500/90 text-white p-2 rounded-md text-sm'>
        Create Team
      </button>
  </div>
  </div>
      {/* <h2>Teams</h2> */}
      {/* {teams.map((team) => (
        <div className="team" key={team.id}>
          <h3>{team.name}</h3>
          <p>Owner: {team.owner}</p>
        </div>
      ))} */}
    </div>
  );
};
