import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiUsers } from 'react-icons/hi2';
import { RiTeamFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { getAllTeamsByUId } from '../../services/teams.services';
import { getAllUserFriendsList } from '../../services/users.services';
import CreateTeamForm, { UserList } from './CreateTeamForm';
import { MdDeleteForever, MdGroupAdd, MdGroupRemove } from 'react-icons/md';

const Teams1 = () => {
    const form = useForm()
    const [teams, setTeams] = useState([])
    const [userFriends, setUserFriends] = useState<UserList[]>([])
    const [showForm, setShowForm] = useState<boolean>(false);

    useEffect(() => {
        const fetchTeams = async () => {
            const teams = await getAllTeamsByUId()
            const userFriends = await getAllUserFriendsList()
            setTeams(teams)
            setUserFriends(userFriends)
        }
        fetchTeams()
    }, [teams])


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
                                                                onClick={() => alert('Not implemented!!!')}
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