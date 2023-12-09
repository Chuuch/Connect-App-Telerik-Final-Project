// import { PiUserCircleFill } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
// import { auth } from "../../config/firebase-config";
import { auth } from '../../config/firebase-config';
import { createChatWithId, getChatById } from "../../services/chat.services";
import { MessageBox } from "../MessageBox/MessageBox";
import { Messages } from "../Messages/Messages";

interface Message {
  content: string,
  id: string,
  author: string,
  userID: string,
  timestamp: number,
  hasGif: boolean,
  seenFromFriend: boolean,
}

export const Chat = () => {
  const msgRefContainer = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const friendId = location.state?.friendId || '';
  const [results, setResults] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<string>('');

  useEffect(() => {
    msgRefContainer.current?.scrollIntoView({ behavior: 'smooth' });
  }, [results]);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const newChatId = await createChatWithId(friendId);
        //console.log('Created chat with: ', newChatId);
        setChatId(newChatId);

        const unsubscribe = getChatById(newChatId, (chatData) => {
          //console.log('Fetched chat: ', chatData);

          if (chatData && chatData.messages) {
            const dataArray = Object.values(chatData.messages as Message[]).filter(m => (m?.seenFromFriend === undefined) || m?.userID === auth.currentUser?.uid ? true : m?.seenFromFriend);

            console.log('chatData.userID === auth.currentUser?.uid: ', chatData.userID === auth.currentUser?.uid);

            if (Array.isArray(dataArray)) {
              const matches = dataArray.filter((msg) => msg && msg.content);
              setResults(matches);
            } else {
              console.error('Invalid data structure');
            }
          } else {
            console.error('Invalid data structure');
          }
        });
        return () => unsubscribe();
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchChat();
  }, [friendId]);

  if (results.length === 0) {
    return <div className="flex flex-col w-full">
      <div className="h-[735px] flex  items-start justify-center pt-32 border-l dark:bg-gray-800 dark:border-gray-600  shadow-inner overflow-auto">
        <p className="dark:text-purple-500 text-center text-2xl font-bold">
          Send a message to start a conversation
        </p>
      </div>
      <div>
        <MessageBox chatId={chatId} />
      </div>
    </div>
  }

  return (
    <div className="flex flex-col w-full bg-white dark:bg-gray-800">
      <div className="h-[734px] lg:h-[750px] border-l dark:border-gray-600 shadow-inner overflow-auto">
        <Messages msg={results} />
      </div>
      <div>
        <MessageBox chatId={chatId} />
      </div>
    </div>
  )
}
