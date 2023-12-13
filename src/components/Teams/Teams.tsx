import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../config/firebase-config';
import { createTeam } from '../../services/teams.services';
import { SingleTeam } from '../SingleTeam/SingleTeam';
import { createChannel } from '../../services/channels.services';
import { motion } from 'framer-motion';

interface Team {
  id: string;
  teamName: string;
  owner: string;
  members: object;
  channels: object;
  timeStamp: number;
  teamId: string;
}

interface Channel {
  id: string;
  channelName: string;
  // owner: username,
  userID: string;
  timestamp: number;
  members: object;
}

export const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [teamName, setTeamName] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [channelName, setChannelName] = useState<string>('');
  const [showChannelForm, setShowChannelForm] = useState<boolean>(false);

  const handleCreateTeam = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const teamId = await createTeam(teamName);
      setTeamName('');
      console.log('Team created with ID:', teamId);
    } catch (error) {
      console.error('Failed to create team', error);
    }
  };

  const handleCreateChannel = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const channelId = await createChannel(channelName, selectedTeam);
      setChannelName('');
      console.log('Channel created with ID:', channelId);
    } catch (error) {
      console.error('Failed to create channel', error);
    }
  };

  useEffect(() => {
    const teamsRef = ref(db, 'teams');
    const unsubscribe = onValue(teamsRef, (snapshot) => {
      const data = snapshot.val();

      console.log('teams', data)

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

  useEffect(() => {
    if (selectedTeam) {
      const channelsRef = ref(db, `teams/${selectedTeam}/channels`);
      const unsubscribe = onValue(channelsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setChannels(Object.values(data));
        } else {
          setChannels([]);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [selectedTeam]);

  const handleTeamClick = (teamId) => {
    setSelectedTeam(teamId);
  };

  return (
    <div className="">
      <div className=" flex flex-row justify-center items-center lg:w-[400px]  p-2">
        <div className="flex items-center justify-center lg:w-[350px]">
          <h2 className="text-blue-500 dark:text-purple-500 text-2xl font-bold p-2">Teams</h2>
        </div>
      </div>
      <div className="shadow-inner">
        <motion.ul
          initial={{ y: -100, opacity: 0 }}
          transition={{ duration: 1.2 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col pt-4 space-y- lg:w-full">
          {teams &&
            teams.map((team) => (
              <div
                className={`team ${selectedTeam === team.id ? 'selected' : ''}`}
                key={team.id}
                onClick={() => handleTeamClick(team.id)}
              >
                <SingleTeam team={team} />
                {selectedTeam === team.id && (
                  <div className="channels-drawer">
                    {channels.map((channel) => (
                      <div>
                        <button className="bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 dark:hover:bg-purple-500 m-3 text-white p-2 rounded-md text-sm"
                          key={channel.id}>Channel: {channel.channelName}</button>
                      </div>
                    ))}
                    <p></p>
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          setShowForm(false);
                          setShowChannelForm(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 dark:hover:bg-purple-500 m-3 text-white p-2 rounded-md text-sm"
                      >
                        New Channel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          {showChannelForm && (
            <div className="mt-4">
              <form className="flex flex-col space-y-4 justify-center items-center border bg-gray-100 dark:bg-gray-900 border-blue-500 dark:border-purple-600 rounded-md p-4">
                <label htmlFor="channelName" className="text-lg font-semibold dark:text-gray-400">
                  Channel Name:
                </label>
                <input
                  type="text"
                  id="channelName"
                  placeholder="Please select a channel name"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateChannel(e);
                    }
                  }}
                  required
                  className="px-4 py-2 border dark:border-gray-700 dark:text-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:focus:border-purple-600"
                />
                <button
                  type="button"
                  onClick={handleCreateChannel}
                  className="bg-blue-500 hover:bg-blue-600 dark:bg-purple-600 hover:dark:bg-purple-500 text-white w-28 px-4 py-2 rounded-md text-sm"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowChannelForm(false)}
                  className="bg-blue-500 hover:bg-blue-600 dark:bg-purple-600 hover:dark:bg-purple-500 text-white w-28 px-4 py-2 rounded-md text-sm"
                >
                  Close
                </button>
              </form>
            </div>
          )}
        </motion.ul>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          transition={{ duration: 1.2 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center pt-5">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 hover:dark:bg-purple-500 text-white p-2 rounded-md text-sm"
          >
            Create Team
          </button>
        </motion.div>
        {showForm && (
          <div className="mt-4">
            <form className="flex flex-col space-y-4 justify-center items-center border bg-gray-100 dark:bg-gray-900 border-blue-500 dark:border-purple-500 rounded-md p-4">
              <label htmlFor="teamName" className="text-lg font-semibold dark:text-gray-400">
                Team Name:
              </label>
              <input
                type="text"
                id="teamName"
                placeholder="Please select a team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateTeam(e);
                  }
                }}
                required
                className="px-4 py-2 border dark:border-gray-700 rounded-md focus:outline-none dark:text-gray-300 focus:border-blue-500 dark:focus:border-purple-500 dark:bg-slate-800"
              />
              <button
                type="button"
                onClick={handleCreateTeam}
                className="bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 dark:hover:bg-purple-500 text-white w-28 px-4 py-2 rounded-md text-sm"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 hover:dark:bg-purple-500 text-white w-28 px-4 py-2 rounded-md text-sm"
              >
                Close
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
