import { BaseSyntheticEvent, FC, useContext, useState } from 'react';
import { HiUserAdd } from 'react-icons/hi';
import UserContext from '../../context/UserContext';
import Multiselect from '../MultiSelect/MultiSelect';
import toast from 'react-hot-toast';
import { addMemberToTeam } from '../../services/teams.services';

export interface UserList {
    id: string;
    name: string;
}

interface AddMembersForm {
    teamId: string | null
    list: UserList[];
    setShowMembersForm: (showMembersForm: boolean) => void;
}

const AddMembersForm: FC<AddMembersForm> = ({ setShowMembersForm, list, teamId }) => {
    const { currentUserDB } = useContext(UserContext);
    const [selectedUsers, setSelectedUsers] = useState<UserList[]>([]);

    const onSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault()

        teamId && await handleAddTeamMembers(selectedUsers, teamId)

        setShowMembersForm(false)
        setSelectedUsers([])
    }

    const handleCloseForm = () => {
        setShowMembersForm(false)
        setSelectedUsers([])
    }

    const handleAddTeamMembers = async (members: UserList[], teamId: string) => {
        try {
            await addMemberToTeam(members, teamId)
        } catch (error) {
            toast.success(`Error adding team member/s!`);
        }
    }

    return (
        <div className="flex justify-center items-center border bg-gray-100 dark:bg-gray-900 border-blue-500 dark:border-purple-500 rounded-md p-4">
            <form onSubmit={onSubmit} >
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

export default AddMembersForm