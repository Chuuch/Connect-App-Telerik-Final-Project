import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../config/firebase-config';

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
