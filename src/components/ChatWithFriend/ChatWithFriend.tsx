// import { PiUserCircleFill } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
// import { auth } from "../../config/firebase-config";
import { Messages } from "../Messages/Messages";
import { MessageBox } from "../MessageBox/MessageBox";
import { createChatWithId, getChatById } from "../../services/chat.services";


export const Chat = () => {
    const msgRefContainer = useRef<HTMLDivElement | null>(null); 
    const location = useLocation();
    const friendId = location.state?.friendId  || '';
    const [results, setResults] = useState<Array<object>>([]);
    const [chatId, setChatId] = useState<string>('');

    useEffect(() => {
      msgRefContainer.current?.scrollIntoView({behavior: 'smooth'});
    }, [results]);

    useEffect(() => {
        console.log("friendId", friendId);
        
    },[])

    useEffect(() => {
        const fetchChat = async () => {
          try {
            const newChatId = await createChatWithId(friendId);
            //console.log('Created chat with: ', newChatId);
            setChatId(newChatId);
      
            const unsubscribe = getChatById(newChatId, (chatData) => {
              //console.log('Fetched chat: ', chatData);
      
              if (chatData && chatData.messages) {
                const dataArray = Object.values(chatData.messages);
                console.log('dataArray: ', dataArray);
      
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

    if (results.length===0) {
      return <div className="flex flex-col w-full">
      <div className="h-[710px] border-l dark:border-gray-600 shadow-inner overflow-auto">
        No messages found
      </div>
      <div>
        <MessageBox chatId={chatId} />
      </div>
    </div>
    }



  return (
    <div className="flex flex-col w-full bg-white dark:bg-gray-800">
      <div className="h-[734px] border-l dark:border-gray-600 shadow-inner overflow-auto">
        <Messages msg={results}/>
      </div>
      <div>
        <MessageBox chatId={chatId} />
      </div>
    </div>
  )
}
