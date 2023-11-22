// import { ref, get, update, push, child, onValue } from 'firebase/database';
// import { auth, database } from '../config/firebase-config';
// import moment from 'moment-timezone';
// import { toast } from 'react-hot-toast';
import { ref, get, update, push } from 'firebase/database';
import { auth, db } from '../config/firebase-config';

export const createMsg = async (content: string): Promise<string> => {
  const userSnapshot = await get(
    ref(db, `/users/${auth?.currentUser?.uid}`)
  );
  const username: string = userSnapshot.val()?.username || ''; 

  const msg = {
    content,
    id: '',
    author: username,
    userID: auth?.currentUser?.uid,
    timestamp: Date.now(),
  };

  const newMsgRef = push(ref(db, 'messages'), msg);
  const newMsgKey: string | null = newMsgRef.key;

  if (newMsgKey) {
    const updates = {
      [`messages/${newMsgKey}/id`]: newMsgKey,
      [`chats/chatID1/messages/${newMsgKey}`]: true,
    };

    try {
      await update(ref(db), updates);
      return newMsgKey;
    } catch (error) {
      console.error('Error updating data');
      return ''; 
    }
  } else {
    console.error('Error generating message key');
    return ''; 
  }
};
