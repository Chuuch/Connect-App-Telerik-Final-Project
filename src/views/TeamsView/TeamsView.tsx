import { useParams } from 'react-router';
import { MessageBox } from "../../components/MessageBox/MessageBox";
import { Messages } from "../../components/Messages/Messages";
// import { Teams } from "../../components/Teams/Teams"
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
// import { Notifications } from '../../components/Notifications/Notifications';
import Teams1 from '../../components/Teams/Teams1';
import { db } from '../../config/firebase-config';
import TeamUsersList from '../../components/TeamUsersList/TeamUsersList';

export const TeamsView = () => {
  const { teamId, channelId } = useParams();
  const [msg, setMsg] = useState([]);
  // const [notification, setNotification] = useState([]);

  // useEffect(() => {
  //   const notificationsRef = ref(db, 'channelNotifications');
  //   const unsubscribe = onValue(notificationsRef, (snapshot) => {
  //     const data = snapshot.val();
  //     setNotification(data ? Object.values(data) : []);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [notification, setNotification]);
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
    <div className="h-full bg-white dark:bg-black flex flex-grow items-start justify-start">
      <div className="h-[800px] flex-col shadow-x bg-gray-100 dark:bg-gray-900">
        <div className=" shadow-x bg-gray-100 dark:bg-gray-900">
          <Teams1 />
        </div>
        <div className=" shadow-xl bg-gray-100 dark:bg-gray-900">
          {/* <Notifications
            notification={notification}
            userID={''}
            onNotificationsCleared={function (): void {
              throw new Error('Function not implemented.');
            }}
          /> */}
        </div>
      </div>
      <div className="flex-grow flex-col">
        <div className="flex-grow border-l dark:border-gray-600 shadow-inner overflow-auto">
          <Messages msg={msg} />
        </div>
        <div className=" dark:border-gray-600 flex-grow">
          {channelId && <MessageBox />}
        </div>
      </div>
      <div className="h-[800px] shadow-x bg-gray-100 dark:bg-gray-900">
        <TeamUsersList teamId={teamId} />
      </div>
    </div>
  )
}
