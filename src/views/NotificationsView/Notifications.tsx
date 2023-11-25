
// type Props = {}?

import { onValue, ref } from "firebase/database"
import { MessageBox } from "../../components/MessageBox/MessageBox"
import { Messages } from "../../components/Messages/Messages"
import { Notifications } from "../../components/Notifications/Notifications"
import { useState, useEffect } from "react"
import { db } from "../../config/firebase-config"
interface Message {
  content:string,
  id:string,
  author:string,
  userID:string,
  timestamp: number,
  
}

export const NotificationsView = () => {
  const [msg, setMsg]=useState<Message[]>([]);

  useEffect(()=>{
    const msgRef=ref(db, 'messages');
    const unsubscribe = onValue(msgRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMsg(Object.values(data));
      } else {
        setMsg([]);
      }
    });

    return () => {
      unsubscribe();
    };
  },[])

  return (
    <div className="bg-white dark:bg-black flex flex-grow items-start justify-start">
      <div className="h-full shadow-xl">
        <Notifications />
      </div>
    <div className="flex flex-col w-full">
      <div className="h-[710px] border-l dark:border-gray-600 shadow-inner overflow-auto">
        <Messages msg={msg}/>
      </div>
      <div>
        <MessageBox />
      </div>
    </div>
    </div>
  )
}