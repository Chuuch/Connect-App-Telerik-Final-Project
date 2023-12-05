import { Key, useEffect, useRef } from "react";
import { auth } from "../../config/firebase-config";
import Avatar from '../Avatar/Avatar';
//import {ref, onValue} from "firebase/database";

interface Message {
  id: Key | null | undefined;
  timestamp: number;
  author: string;
  content: string;
  userID: string;
  hasGif: boolean;
}
interface MessagesProps {
  msg: Message[];
}

export const Messages: React.FC<MessagesProps> = ({ msg }) => {
  // const [msg, setMsg]=useState<Message[]>([]);
  const msgRefContainer = useRef<HTMLDivElement | null>(null);

  // useEffect(()=>{
  //   const msgRef=ref(db, 'messages');
  //   const unsubscribe = onValue(msgRef, (snapshot) => {
  //     const data = snapshot.val();
  //     if (data) {
  //       setMsg(Object.values(data));
  //     } else {
  //       setMsg([]);
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // },[])

  useEffect(() => {
    msgRefContainer.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msg]);
  return (
    <div className="pt-5 h-[766px]">
      {msg && msg.map((m: { id: Key | null | undefined; timestamp: number; author: string; content: string; userID: string; hasGif: boolean }) => (
        <div>
          {m.userID === auth?.currentUser?.uid ?
            (<div className="chat chat-end mr-5 text-sm" key={m.id}>

              {/* <div className="chat-image avatar"> */}
              {/* <div className="w-10 rounded-full">
                  {currentUserDB?.avatar?.length ? (<img src={currentUserDB?.avatar} alt="avatar" className="w-10 h-10 rounded-full" />) :
                    <PiUserCircleFill size={35} className='fill-gray-500 cursor-pointer' />}
                </div> */}
              <Avatar userID={m.userID} />
              {/* </div> */}
              <div className="chat-header dark:text-gray-200">
                {m.author}{' '}
                <time className="text-xs opacity-50">{new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }).format(m.timestamp)}</time>
              </div>
              <div>
                {m.hasGif ? (<img src={m.content}></img>)
                  : (<div className="chat-bubble bg-blue-500 dark:bg-purple-600 text-white">{m.content}</div>)
                }</div>
              <div className="chat-footer opacity-50 text-xs pt-2 dark:text-gray-100">
                Delivered
              </div>
            </div>
            ) : (
              <div className="chat chat-start ml-5 text-sm" key={m.id}>
                <Avatar userID={m.userID} />
                {/* <div className="chat-image avatar">
                  <div className="w-10 rounded-full">

                    <PiUserCircleFill size={35} className='fill-gray-500 cursor-pointer' />
                  </div>
                </div> */}
                <div className="chat-header dark:text-gray-200">
                  {m.author}{' '}
                  <time className="text-xs opacity-50">{new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }).format(m.timestamp)}</time>
                </div>
                <div>
                  {m.hasGif ? (<img src={m.content}></img>)
                    : (<div className="chat-bubble bg-blue-500 dark:bg-purple-600 text-white">{m.content}</div>)
                  }</div>
                <div className="chat-footer opacity-50 text-xs pt-2 dark:text-gray-100">
                  Delivered
                </div>
              </div>
            )}
        </div>
      ))}
      <div ref={msgRefContainer}></div>
    </div>
  )
}
