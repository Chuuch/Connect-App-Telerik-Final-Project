import { onValue, ref } from 'firebase/database';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiUsers } from 'react-icons/hi2';
import { IoPersonAdd } from 'react-icons/io5';
import { MdDeleteForever, MdGroupAdd } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase-config';
import UserContext from '../../context/UserContext';
import { deleteTeam } from '../../services/teams.services';
import AddMembersForm from './AddMembersForm';
import CreateTeamForm, { UserList } from './CreateTeamForm';
import AddChannelForm from './AddChannelForm';
import { deleteChannel } from '../../services/channels.services';

interface Team {
    channels: object[]
    id: string
    members: object[]
    owner: string
    teamName: string
    timestamp: number
    userID: string
}

export interface Channel {
    channelName: string
    id: string
    members: object[]
    timestamp: number
    userID: string
}

const Teams1 = () => {
    const form = useForm()
    const formChannel = useForm()
    const { currentUserDB } = useContext(UserContext)
    const [teams, setTeams] = useState<Team[]>([])
    const [userFriends, setUserFriends] = useState<UserList[]>([])
    const [showForm, setShowForm] = useState<boolean>(false)
    const [showMembersForm, setShowMembersForm] = useState<boolean>(false)
    const [showChannelForm, setShowChannelForm] = useState<boolean>(false)
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const teamsRef = ref(db, 'teams');

        const unsubscribe = onValue(teamsRef, (snapshot) => {
            if (!snapshot.exists()) {
                return [];
            }
            const returnArr = [] as Team[];
            snapshot.forEach(grandchildSnapshot => {
                const item = grandchildSnapshot.val()?.members?.find((member: any) => member.id === currentUserDB?.uid)
                if (item) {
                    returnArr.push(grandchildSnapshot.val())
                }
            })
            setTeams(returnArr);
        });

        return () => {
            unsubscribe();
        };

    }, [currentUserDB, currentUserDB?.uid])

    useEffect(() => {
        const friendsRef = ref(db, `users/${currentUserDB?.uid}/friends`);
        const unsubscribe = onValue(friendsRef, (snapshot) => {
            if (!snapshot.exists()) {
                return [];
            }

            const friends = Object.entries(snapshot.val())
                .filter(([, value]) => {
                    return value?.isFriend
                })
                .map(([key, value]) => ({ id: key, name: value?.username }));

            setUserFriends(friends);
        });

        return () => {
            unsubscribe();
        };

    }, [currentUserDB?.uid])

    const handleDeleteTeam = async (teamName: string, teamId: string) => {
        try {
            if (!currentUserDB?.uid) return
            await deleteTeam(currentUserDB?.uid, teamId, teamName)
            navigate('/teams')
        } catch (error) {
            toast.error(`Error deleting team: ${teamName}!`);
        }
    }

    const handleDeleteChannel = async (teamId: string, channelId: string, channelName: string) => {
        try {
            if (!currentUserDB?.uid) return
            await deleteChannel(currentUserDB.uid, teamId, channelId, channelName)
            navigate('/teams')
        } catch (error) {
            toast.error(`Error deleting channel: ${channelName}!`);
        }
    }

    const handleAddChannel = (teamId: string) => {
        setShowForm(false)
        setShowMembersForm(false)
        setShowChannelForm(true)
        setSelectedTeam(teamId)
    }

    const handleAddMembers = (teamId: string) => {
        setShowForm(false)
        setShowChannelForm(false)
        setShowMembersForm(true)
        setSelectedTeam(teamId)
    }

    const handleAddTeam = () => {
        setShowMembersForm(false)
        setShowChannelForm(false)
        setShowForm(true)
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
                                onClick={() => handleAddTeam()}
                                className="flex flex-row   bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 hover:dark:bg-purple-500 text-white p-2 rounded-md text-sm"
                            >
                                <MdGroupAdd size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-300">
                        {teams?.length
                            ? teams.map((team: Team) => (
                                <li key={team?.id} className="menu w-96 space-x-2 flex-row rounded-box ">
                                    <details open>
                                        <summary className="flex flex-row ">
                                            <div className=" flex flex-row w-80 justify-between">
                                                <div className=" flex flex-row space-x-2 ">
                                                    <RiTeamFill size={20} className="fill-blue-500 dark:fill-purple-600 cursor-pointer" />
                                                    <p className="font-bold text-gray-500 dark:text-gray-300">{team.teamName} </p>
                                                </div>
                                                <div className="space-x-2">
                                                    <div className="tooltip" data-tip="Add Channel">
                                                        <button
                                                            onClick={() => handleAddChannel(team.id)}
                                                            className="bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 hover:dark:bg-purple-500 text-white p-2 rounded-md text-sm"
                                                        >
                                                            <HiUsers size={20} />
                                                        </button>
                                                    </div>
                                                    <div className="tooltip" data-tip="Add Team Member">
                                                        <button
                                                            onClick={() => handleAddMembers(team.id)}
                                                            className="bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 hover:dark:bg-purple-500 text-white p-2 rounded-md text-sm"
                                                        >
                                                            <IoPersonAdd size={20} />
                                                        </button>
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

                                            </div>
                                        </summary>
                                        {
                                            team?.channels && Object.values(team?.channels).length
                                                ? Object.values(team.channels as Channel[]).map(({ id, channelName }: Pick<Channel, 'id' | 'channelName'>) => (
                                                    <ul key={id + channelName}>
                                                        <li>
                                                            <NavLink to={`/teams/${team.id}/${id}`} style={{ display: 'flex' }} >
                                                                <div className="flex flex-row">
                                                                    <div className="flex flex-row space-x-2">
                                                                        <HiUsers size={20} className="fill-blue-500 dark:fill-purple-600 cursor-pointer" />
                                                                        <p className="text-gray-500 dark:text-gray-300">{channelName}</p>
                                                                    </div>
                                                                    <div className="flex flex-row">
                                                                        <div className="tooltip" data-tip="Remove Channel">
                                                                            <button
                                                                                onClick={() => handleDeleteChannel(team.id, id, channelName)}
                                                                                className="transparent hover:bg-blue-500 dark:bg-purple-600 hover:dark:bg-purple-500 text-white p-2 rounded-md text-sm"
                                                                            >
                                                                                <MdDeleteForever size={20} />
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </NavLink >
                                                        </li>
                                                    </ul>
                                                ))
                                                : null
                                        }
                                    </details>
                                </li >
                            ))
                            : null}
                    </div>
                </motion.ul >
                {showForm && <CreateTeamForm form={form} setShowForm={setShowForm} list={userFriends} />}
                {showMembersForm && <AddMembersForm setShowMembersForm={setShowMembersForm} list={userFriends} teamId={selectedTeam} />}
                {showChannelForm && <AddChannelForm form={formChannel} setShowChannelForm={setShowChannelForm} teamId={selectedTeam} />}
            </div >
        </div >
    )
}

export default Teams1