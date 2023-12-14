import { useParams } from 'react-router';
import { MessageBox } from "../../components/MessageBox/MessageBox";
import { Messages } from "../../components/Messages/Messages";
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import Teams1 from '../../components/Teams/Teams1';
import { db } from '../../config/firebase-config';
import TeamUsersList from '../../components/TeamUsersList/TeamUsersList';

export const TeamsView = () => {
  const { teamId, channelId } = useParams();
  const [msg, setMsg] = useState([]);

  +  useEffect(() => {
    const msgRef = ref(db, `channelMessages/${channelId}`);
    const unsubscribe = onValue(msgRef, (snapshot) => {
      const data = snapshot.val();
      setMsg(data ? Object.values(data) : []);
    });

    return () => {
      unsubscribe();
    };
  }, [channelId]);

  return (
    <div className="h-full bg-white dark:bg-gray-800 flex flex-grow items-start justify-start">
      <div className="flex-col shadow-x bg-gray-100 dark:bg-gray-900">
        <div className="md:w-[276px] md:h-[682px] lg:w-[400px] lg:h-[1016px] shadow-x bg-gray-100 dark:bg-gray-900">
          <Teams1 />
        </div>
        <div className=" shadow-xl bg-gray-100 dark:bg-gray-900">
        </div>
      </div>
      <div className="flex-grow flex-col">
        <div className="lg:w-[700px] lg:h-[920px] flex-grow dark:border-gray-600 dark:bg-gray-800 shadow-inner overflow-auto">
          <Messages msg={msg} />
        </div>
        <div className=" dark:border-gray-600 flex-grow">
          {channelId && <MessageBox />}
        </div>
      </div>
      <div className="h-[800px] lg:h-[1015px] shadow-x bg-gray-100 dark:bg-gray-900">
        <TeamUsersList teamId={teamId} />
      </div>
    </div>
  )
}
