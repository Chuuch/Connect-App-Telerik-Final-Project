import { ref, update, push, get } from 'firebase/database';
import { auth, db } from '../config/firebase-config';

export const createChatId = async (): Promise<string> => {
  
    const chat = {
      id: '',
      participants: auth?.currentUser?.uid,
      timestamp: Date.now(),
    };
  
    const newChatRef = push(ref(db, 'chats'), chat);
    const newChatKey: string | null = newChatRef.key;
  
    if (newChatKey) {
      const updates = {
        [`chats/${newChatKey}/id`]: newChatKey,
        [`users/${auth?.currentUser?.uid}/chats/${newChatKey}`]: true,
      };
  
      try {
        await update(ref(db), updates);
        return newChatKey;
      } catch (error) {
        console.error('Error updating data:', error);
        return '';
      }
    } else {
      console.error('Error generating chat key');
      return '';
    }
  };


  export const createChatWithId = async (friendId: string): Promise<string> => {
//   const userData = await getUserByID(friendId);
  const chatData = await getAllChats();
  const objVal=Object.values(chatData)
  console.log("objVal: ", objVal);
  const existingChat = objVal.find((chat) => {
    const participantsArr = Object.values(chat.participants);
    console.log("participantsArr: ", participantsArr);
    
    return (
      participantsArr &&
      participantsArr.includes(auth?.currentUser?.uid) &&
      participantsArr.includes(friendId)
    );
  });
  console.log("existingChat: ", existingChat);
  
  if (existingChat) {
    console.log("Chat already in use");
  } else {
        const chat = {
                  id: '',
                  participants: [auth?.currentUser?.uid, friendId],
                  timestamp: Date.now(),
                };
              
                const newChatRef = push(ref(db, 'chats'), chat);
                const newChatKey: string | null = newChatRef.key;
              
                if (newChatKey) {
                  const updates = {
                    [`chats/${newChatKey}/id`]: newChatKey,
                    [`users/${auth?.currentUser?.uid}/chats/${newChatKey}/${friendId}`]: true,
                    [`users/${friendId}/chats/${newChatKey}/${auth?.currentUser?.uid}`]: true,
                  };
              
                  try {
                    await update(ref(db), updates);
                    return newChatKey;
                  } catch (error) {
                    console.error('Error updating data:', error);
                    return '';
                  }
                } else {
                  console.error('Error generating chat key');
                  return '';
                }
               }
    };


    interface ChatType {
    id: string;
    participants: Array<string>;
    timestamp: string;
}

  export const getAllChats = async () => {
    const snapshot = await get(ref(db, 'chats'));
    if (!snapshot.exists()) {
      return [];
    }
    return Object.values(snapshot.val()) as ChatType[];
};

  export const getChatById = async (id: string) => {
    const snapshot = await get(ref(db, `chats/${id}`));
    if (!snapshot.exists()) {
      return [];
    }
    return Object.values(snapshot.val()) as ChatType[];
  };