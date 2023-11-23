import { useState, useEffect, Key, useRef } from "react"
import { PiUserCircleFill } from "react-icons/pi"
import { auth, db } from "../../config/firebase-config";
import {ref, onValue} from "firebase/database";

interface Message {
  content:string,
  id:string,
  author:string,
  userID:string,
  timestamp: number,
  
}

export const Messages = () => {
  const [msg, setMsg]=useState<Message[]>([]);
  const msgRefContainer = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    msgRefContainer.current?.scrollIntoView({behavior: 'smooth'});
  }, [msg]);

  return (
    <div className="pt-5 h-full">
    {msg && msg.map((m: { id: Key | null | undefined; timestamp: number; author: string; content: string; userID: string })=>(
      <div>
        {m.userID===auth?.currentUser?.uid ?
        (<div className="chat chat-end ml-5" key={m.id}>
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <PiUserCircleFill size={35} className='fill-gray-500 cursor-pointer' />
      </div>
    </div>
    <div className="chat-header">
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
    <div className="chat-bubble bg-blue-500 text-white">{m.content}</div>
    <div className="chat-footer opacity-50">
      Delivered
    </div>
  </div>
  ) : (
    <div className="chat chat-start ml-5" key={m.id}>
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <PiUserCircleFill size={35} className='fill-gray-500 cursor-pointer' />
      </div>
    </div>
    <div className="chat-header">
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
    <div className="chat-bubble bg-blue-500 text-white">{m.content}</div>
    <div className="chat-footer opacity-50">
      Delivered
    </div>
  </div>
  )}
  </div>
  ))}
  <div  ref = {msgRefContainer}></div>
  </div>
  )
}
