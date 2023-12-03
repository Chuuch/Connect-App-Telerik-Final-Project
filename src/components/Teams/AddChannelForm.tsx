import { FC, useContext } from 'react';
import { UseFormProps } from 'react-hook-form';
import { HiUsers } from 'react-icons/hi2';
import UserContext from '../../context/UserContext';
import { createChannel } from '../../services/channels.services';
import { teamChannelPattern } from '../../utils/regexPatterns';
import { Channel } from './Teams1';

interface AddChannelFormProps {
    teamId: string | null
    form: UseFormProps
    setShowChannelForm: (showChannelForm: boolean) => void;
}

const AddChannelForm: FC<AddChannelFormProps> = ({ setShowChannelForm, teamId, form }) => {

    const { register, handleSubmit, formState: { errors }, reset } = form;

    const handleCreateChannel = async (channelName, teamId) => {
        try {
            const channelId = await createChannel(channelName, teamId);
            console.log('Channel created with ID:', channelId);
        } catch (error) {
            console.error('Failed to create channel', error);
        }
    }

    const onSubmit = async ({ channelName }: { channelName: Pick<Channel, 'channelName'> }) => {
        await handleCreateChannel(channelName, teamId)
        reset()
        setShowChannelForm(false)
    }

    const handleCloseForm = () => {
        setShowChannelForm(false)
        reset()
    }

    return (
        <div className="flex justify-center items-center border bg-gray-100 dark:bg-gray-900 border-blue-500 dark:border-purple-500 rounded-md p-4">
            <form onSubmit={handleSubmit(onSubmit)} >
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

export default AddChannelForm