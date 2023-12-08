import { FC, useEffect, useState } from 'react'
import { getUserByID } from '../../services/users.services'
import Avatar from '../Avatar/Avatar'
import { UserData } from './TeamUsersList'

interface TeamUserProps {
    userID: string
}

const TeamUser: FC<TeamUserProps> = ({ userID }) => {
    const [userData, setUserData] = useState<UserData>()

    useEffect(() => {
        if (userID) {
            const fetchData = async () => {
                const user = await getUserByID(userID)
                setUserData(user)
            }

            fetchData()
        }
    }, [userID])

    return (
        <summary className="flex flex-row ">
            <div className=" flex flex-row w-80 justify-between">
                <div className=" flex flex-row space-x-2 ">
                    <Avatar userID={userID} />
                    <div className=" flex flex-col space-x-2 ">
                        <p className="font-bold text-gray-500 dark:text-gray-300">{userData?.firstName + ' ' + userData?.lastName} </p>
                        <p className="font text-gray-400 dark:text-gray-300">{userData?.username} </p>
                    </div>
                </div>
                <div className="space-x-2">

                </div>
            </div>
        </summary>)
}

export default TeamUser