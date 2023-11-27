import { FC, useState, useContext } from 'react';
import { UseFormProps } from 'react-hook-form';
import { HiUserAdd } from 'react-icons/hi';
import { HiUsers } from 'react-icons/hi2';
import { RiTeamFill } from 'react-icons/ri';
import { createChannel } from '../../services/channels.services';
import { createTeam } from '../../services/teams.services';
import { teamChannelPattern } from '../../utils/regexPatterns';
import Multiselect from '../MultiSelect/MultiSelect';
import UserContext from '../../context/UserContext';

export interface UserList {
    id: string;
    name: string;
}

interface CreateTeamFormProps {
    form: UseFormProps
    list: UserList[];
    setShowForm: (showForm: boolean) => void;
}

const CreateTeamForm: FC<CreateTeamFormProps> = ({ setShowForm, list, form }) => {
    const { register, handleSubmit, formState: { errors }, reset } = form;
    const { currentUserDB } = useContext(UserContext);
    const [selectedUsers, setSelectedUsers] = useState<UserList[]>([]);

    const handleCreateTeam = async (teamName, members) => {
        try {
            const teamId = await createTeam(teamName, members);
            console.log('Team created with ID:', teamId);
            return teamId
        } catch (error) {
            console.error('Failed to create team', error);
        }
    };

    const handleCreateChannel = async (channelName, teamId, members) => {
        try {
            const channelId = await createChannel(channelName, teamId, members);
            console.log('Channel created with ID:', channelId);
        } catch (error) {
            console.error('Failed to create channel', error);
        }
    }

    const onSubmit = async ({ teamName, channelName }) => {
        console.log(teamName, channelName)
        console.log(selectedUsers)

        const teamId = await handleCreateTeam(teamName, selectedUsers)
        await handleCreateChannel(channelName, teamId, selectedUsers)
        reset()
        setShowForm(false)
    }

    const handleCloseForm = () => {
        setShowForm(false)
        reset()
    }

    return (
        <div className="flex justify-center items-center border bg-gray-100 dark:bg-gray-900 border-blue-500 dark:border-purple-500 rounded-md p-4">
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="flex  justify-center space-y-4 ">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="px-8 text-gray-500 pt-4" >
                            Team Name*
                        </label>
                        <div className="flex items-center">
                            <RiTeamFill size={20} className="mr-2 fill-blue-500 dark:fill-purple-600 cursor-pointer" />
                            <input
                                className="px-4 py-2 border dark:border-gray-700 rounded-md focus:outline-none dark:text-gray-300 focus:border-blue-500 dark:focus:border-purple-500 dark:bg-slate-800"
                                type="text"
                                id="teamName"
                                aria-label='Team Name'
                                placeholder="Team Name*"
                                {...register("teamName", {
                                    required: 'Team name is required',
                                    pattern: {
                                        value: teamChannelPattern,
                                        message: 'Invalid team name',
                                    }
                                })}
                            />
                        </div>
                        {errors.teamName && <span className="px-8 text-red-500">{errors.teamName?.message}</span>}
                    </div>

                </div>
                <div className="flex  justify-center space-y-4 ">
                    <div className="flex flex-col">
                        <label htmlFor="channelName" className="px-8 text-gray-500 pt-4" >
                            Channel Name*
                        </label>
                        <div className="flex items-center">
                            <HiUsers size={20} className="mr-2 fill-blue-500 dark:fill-purple-600 cursor-pointer" />
                            <input
                                type="text"
                                id="channelName"
                                placeholder="Channel Name*"
                                {...register("channelName", {
                                    required: 'Channel name is required',
                                    pattern: {
                                        value: teamChannelPattern,
                                        message: 'Invalid channel name',
                                    }
                                })}
                                className="px-4 py-1 border dark:border-gray-700 rounded-md focus:outline-none dark:text-gray-300 focus:border-blue-500 dark:focus:border-purple-500 dark:bg-slate-800"
                            />
                        </div>
                        {errors.channelName && <span className="px-8 pb-4 text-red-500">{errors.channelName?.message}</span>}
                    </div>
                </div>
                <div className="flex  justify-center space-y-4 ">
                    <div className="flex flex-col">
                        <label htmlFor="channelName" className="px-8 text-gray-500 pt-4" >
                            Members
                        </label>
                        <div className="flex items-center">
                            <HiUserAdd size={20} className="mr-2 fill-blue-500 dark:fill-purple-600 cursor-pointer" />
                            <Multiselect list={list} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center space-x-2 pt-6">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 dark:hover:bg-purple-500 text-white w-20 px-0 py-2 rounded-md text-sm"
                    >
                        Submit
                    </button>
                    <button
                        onClick={() => handleCloseForm()}
                        className="bg-blue-600 hover:bg-blue-500 dark:bg-purple-600 hover:dark:bg-purple-500 text-white w-20 px-4 py-2 rounded-md text-sm"
                    >
                        Close
                    </button>
                </div>
            </form>
        </div >
    )
}

export default CreateTeamForm