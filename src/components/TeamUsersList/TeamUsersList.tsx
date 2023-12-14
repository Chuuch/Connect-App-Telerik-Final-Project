import { onValue, ref } from '@firebase/database';
import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { db } from '../../config/firebase-config';
import TeamUser from './TeamUser';

interface TeamUsersListProps {
    teamId?: string
}

export interface UserData {
    uid: string
    avatar: string
    firstName: string
    lastName: string
    email: string
    username: string
}

const TeamUsersList: FC<TeamUsersListProps> = ({ teamId }) => {
    const [teamMembers, setTeamMembers] = useState<UserData[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const teamsRef = ref(db, `teams/${teamId}/members`);

            onValue(teamsRef, (snapshot) => {
                if (!snapshot.exists()) {
                    return [];
                }
                const returnArr = [] as object[];
                snapshot.forEach(grandchildSnapshot => {
                    const item = grandchildSnapshot.val()
                    if (item) {
                        returnArr.push(item)
                    }
                })
                setTeamMembers(returnArr)
            });
        }

        fetchData()

    }, [teamId])

    return (
        <div className="w-96">
            <div className="flex flex-row justify-center items-center border-b dark:border-gray-500 p-2">
                <div className="flex items-center justify-center">
                    <h2 className="text-blue-500 dark:text-purple-500 text-2xl font-bold p-2">Users</h2>
                </div>
            </div>
            <div className="shadow-inner">
                <motion.ul
                    initial={{ y: -100, opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col pt-4 space-y-  w-24">
                    <div className="divide-y divide-gray-300">
                        {teamMembers?.length
                            ? teamMembers.map(({ id }) => (
                                <li key={id} className="menu w-96 space-x-2 flex-row rounded-box ">
                                    <TeamUser userID={id} />
                                </li >))
                            : null}
                    </div>
                </motion.ul >
            </div >
        </div>
    )
}

export default TeamUsersList