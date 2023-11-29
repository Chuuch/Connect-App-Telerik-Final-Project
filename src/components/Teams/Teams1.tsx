import { onValue, ref } from 'firebase/database';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiUsers } from 'react-icons/hi2';
import { MdDeleteForever, MdGroupAdd } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { db } from '../../config/firebase-config';
import UserContext from '../../context/UserContext';
import { deleteTeam } from '../../services/teams.services';
import { getAllUserFriendsList } from '../../services/users.services';
import CreateTeamForm, { UserList } from './CreateTeamForm';

const Teams1 = () => {
    const form = useForm()
    const { currentUserDB } = useContext(UserContext)
    const [teams, setTeams] = useState([])
    const [userFriends, setUserFriends] = useState<UserList[]>([])
    const [showForm, setShowForm] = useState<boolean>(false);

    useEffect(() => {
        const fetchTeams = async () => {
            // const teams = await getAllTeamsByUId()
            const userFriends = await getAllUserFriendsList()
            // setTeams(teams)
            setUserFriends(userFriends)
        }

        const teamsRef = ref(db, 'teams');
        const unsubscribe = onValue(teamsRef, (snapshot) => {
            if (!snapshot.exists()) {
                return [];
            }
            const returnArr = [] as object[];
            snapshot.forEach(grandchildSnapshot => {
                const item = grandchildSnapshot.val().members.find((member: any) => member.id === currentUserDB?.uid)
                if (item) {
                    returnArr.push(grandchildSnapshot.val())
                }
            })
            console.log(returnArr)
            setTeams(returnArr);
        });

        return () => {
            unsubscribe();
        };

        fetchTeams()
    }, [currentUserDB?.uid, teams])

    const handleDeleteTeam = async (teamName: string, teamId: string) => {
        try {
            await deleteTeam(currentUserDB?.uid, teamId)
            toast.success(`Team ${teamName} deleted successfully!`);
        } catch (error) {
            toast.success(`Error deleting team ${teamName}!`);
        }
    }

    return (
        <div className="w-96">
            <div className="flex flex-row justify-center items-center border-b dark:border-gray-500 p-2">
                <div className="flex items-center justify-center">
                    <h2 className="text-blue-500 dark:text-purple-500 text-2xl font-bold p-2">Teams</h2>
                </div>
            </div>
            <div className="shadow-inner">
                <motion.ul
                    initial={{ y: -100, opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col pt-4 space-y-  w-24">
                    <div className="flex flex-row  w-80 justify-center">
                        <div className="tooltip" data-tip="Add Team">
                            <button
                                onClick={() => setShowForm(true)}
                                className="flex flex-row   bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 hover:dark:bg-purple-500 text-white p-2 rounded-md text-sm"
                            >
                                <MdGroupAdd size={20} />
                                {/* Add Team */}
                            </button>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-300">
                        {teams?.length ? teams.map((team) => (
                            <>
                                {
                                    team?.channels && Object.values(team?.channels).length ? Object.values(team.channels).map(({ id, channelName }) => (
                                        <li key={id + channelName} className="menu w-96 space-x-2 flex-row rounded-box ">
                                            <details open>
                                                <summary className="flex flex-row ">
                                                    <div className=" flex flex-row space-x-2 w-80 justify-between">
                                                        <div className=" flex flex-row space-x-2 ">
                                                            <RiTeamFill size={20} className="fill-blue-500 dark:fill-purple-600 cursor-pointer" />
                                                            <p className="font-bold text-gray-500 dark:text-gray-300">{team.teamName} </p>
                                                        </div>
                                                        <div className="tooltip" data-tip="Remove Team">
                                                            <button
                                                                onClick={() => handleDeleteTeam(team.teamName, team.id)}
                                                                className="bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 hover:dark:bg-purple-500 text-white p-2 rounded-md text-sm"
                                                            >
                                                                <MdDeleteForever size={20} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </summary>
                                                <ul>
                                                    <li>
                                                        <NavLink to={`/teams/${team.id}/${id}`}>
                                                            <HiUsers size={20} className="fill-blue-500 dark:fill-purple-600 cursor-pointer" />
                                                            <p className="text-gray-500 dark:text-gray-300">{channelName}</p>
                                                        </NavLink >
                                                    </li>
                                                </ul>
                                            </details>
                                        </li >
                                    )) : null
                                }
                            </>
                        )) : null}
                    </div>
                </motion.ul >
                {showForm && <CreateTeamForm form={form} setShowForm={setShowForm} list={userFriends} />}
            </div >
        </div >
    )
}

export default Teams1