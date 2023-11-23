import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../config/firebase-config';
import { createTeam } from '../../services/teams.services';
import { SingleTeam } from '../SingleTeam/SingleTeam';
import { IoClose } from 'react-icons/io5';

interface Team {
	id: string;
	teamName: string;
	owner: string;
	members: object;
	channels: object;
	timeStamp: number;
}

export const Teams: React.FC = () => {
	const [teams, setTeams] = useState<Team[]>([]);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [teamName, setTeamName] = useState<string>('');

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
		<div className="w-96">
			<div className="flex flex-row justify-center items-center border-b dark:border-gray-600 p-2">
				<div className="flex items-center justify-center">
					<h2 className="text-blue-500 dark:text-purple-600 text-2xl font-bold p-2 ">
						Teams
					</h2>
				</div>
			</div>
			<div className="shadow-inner">
				<ul className="flex flex-col pt-4 space-y-2">
					{teams &&
						teams.map((team) => (
							<div className="team" key={team.id}>
								<SingleTeam team={team} />
							</div>
						))}
				</ul>

				{showForm && (
					<div className="mt-4">
						<form className="relative flex flex-col space-y-4 justify-center items-center border border-blue-500 dark:border-purple-600 rounded-md p-4">
							<div className="absolute top-0 right-0 m-4 z-20">
								<button onClick={() => setShowForm(false)}>
									<IoClose
										size={30}
										className="fill-blue-500 dark:fill-purple-600"
									/>
								</button>
							</div>
							<label
								htmlFor="teamName"
								className="flex flex-row items-center justify-center text-lg font-semibold dark:text-gray-300"
							>
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
								className="px-4 py-2 border rounded-md border-none focus:border-blue-500 dark:bg-gray-800 dark:focus:border-purple-600 dark:text-gray-300"
							/>
							<button
								type="button"
								onClick={handleCreateTeam}
								className="bg-blue-500 hover:bg-blue-600 dark:bg-purple-600 text-white w-28 px-4 py-2 rounded-md text-sm"
							>
								Submit
							</button>
						</form>
					</div>
				)}
				<div className="flex items-center justify-center pt-5">
					<button
						onClick={() => setShowForm(true)}
						className="bg-blue-500 hover:bg-blue-500/90 dark:bg-purple-600 text-white p-2 rounded-md text-sm"
					>
						Create Team
					</button>
				</div>
			</div>
		</div>
	);
};
