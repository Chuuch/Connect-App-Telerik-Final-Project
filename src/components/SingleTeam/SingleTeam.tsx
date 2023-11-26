import { RiTeamFill } from 'react-icons/ri';

interface Team {
    id: string;
    teamName: string;
    owner: string;
    members: object;
    channels: object;
    timeStamp: number;
  }

export const SingleTeam: React.FC<{ team: Team }> = ({ team }) => {
    return (
      <div className="flex flex-row space-x-1 items-center text-md hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer h-full w-full p-2">
        <RiTeamFill size={40} className="fill-blue-500 dark:fill-purple-600 cursor-pointer" />
        <p className="text-gray-500 dark:text-gray-300">{team.teamName}</p>
      </div>
    );
    }