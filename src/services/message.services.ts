// import { ref, get, update, push, child, onValue } from 'firebase/database';
// import { auth, database } from '../config/firebase-config';
// import moment from 'moment-timezone';
// import { toast } from 'react-hot-toast';
import { get, push, ref, update } from 'firebase/database';
import { auth, db } from '../config/firebase-config';


interface Notification {
  id: string;
  type: string;
  author: string;
  userID?: string,
}


export const createMsg = async (content: string, chatId: string): Promise<string> => {
  const userSnapshot = await get(
    ref(db, `/users/${auth?.currentUser?.uid}`)
  );
  const username: string = userSnapshot.val()?.username || '';


  const gifUrlRegex = /(https?:\/\/\S+\.(?:png|jpe?g|gif|svg))/i;
  const gifUrlMatch = content.match(gifUrlRegex);
  const hasGif = gifUrlMatch !== null;


  const msgContent = hasGif ? gifUrlMatch[0] : content;

  const participantsSnapshot = await get(
    ref(db, `chats/${chatId}/participants`)
  );

  const myFriendId = Object.values(participantsSnapshot.val()).find(p => auth?.currentUser?.uid !== p);
  // console.log('myFriendId', myFriendId)

  const myFriendSnapshot = await get(
    ref(db, `users/${myFriendId}`)
  );

  const myFriendBlockedUsers = myFriendSnapshot.val()?.blockedUsers || [];

  const iAmBlocked = Object.entries(myFriendBlockedUsers).find(([key, value]) => key === username && value === true);
  // console.log('iAmBlocked', iAmBlocked)
  const msg = {
    content: msgContent,
    id: '',
    author: username,
    userID: auth?.currentUser?.uid,
    timestamp: Date.now(),
    hasGif,
    seenFromFriend: iAmBlocked?.[0] ? false : true,
  };

  const newMsgRef = push(ref(db, `chats/${chatId}/messages`), msg);
  const newMsgKey: string | null = newMsgRef.key;

  if (newMsgKey) {
    const updates = {
      [`messages/${newMsgKey}/id`]: newMsgKey,
      [`chats/${chatId}/messages/${newMsgKey}/id`]: newMsgKey,
    };

    try {
      await update(ref(db), updates);

      const notification: Notification = {
        id: newMsgKey,
        type: 'message',
        author: username,
        userID: auth?.currentUser?.uid
      }

      const newNotiRef = push(ref(db, 'notifications'), notification);
      const newNotiKey: string | null = newNotiRef.key;

      if (newNotiKey) {
        const updates = {
          [`notifications/${newNotiKey}/id`]: newNotiKey,
          [`chats/${chatId}/notifications/${newNotiKey}`]: true,
        };

        try {
          await update(ref(db), updates);
        } catch (error) {
          console.error('Error updating data');
        }
      }

      return newMsgKey;
    } catch (error) {
      console.error('Error updating data:', error);
      return '';
    }
  } else {
    console.error('Error generating message key');
    return '';
  }
}

export const createChannelMsg = async (content: string, channelId: string): Promise<string> => {
  const userSnapshot = await get(
    ref(db, `/users/${auth?.currentUser?.uid}`)
  );
  const username: string = userSnapshot.val()?.username || '';


  const gifUrlRegex = /(https?:\/\/\S+\.(?:png|jpe?g|gif|svg))/i;
  const gifUrlMatch = content.match(gifUrlRegex);
  const hasGif = gifUrlMatch !== null;


  const msgContent = hasGif ? gifUrlMatch[0] : content;

  const msg = {
    content: msgContent,
    id: '',
    author: username,
    userID: auth?.currentUser?.uid,
    timestamp: Date.now(),
    hasGif,
  };

  const newMsgRef = push(ref(db, `channelMessages/${channelId}`), msg);
  const newMsgKey: string | null = newMsgRef.key;

  if (newMsgKey) {
    const updates = {
      [`channelMessages/${channelId}/${newMsgKey}/id`]: newMsgKey,
      [`chats/chatID1/channelMessages/${newMsgKey}`]: true,
    };

    try {
      await update(ref(db), updates);

      const notification: Notification = {
        id: newMsgKey,
        type: 'message',
        author: username,
      }

      const newNotiRef = push(ref(db, 'channelNotifications'), notification);
      const newNotiKey: string | null = newNotiRef.key;

      if (newNotiKey) {
        const updates = {
          [`channelNotifications/${newNotiKey}/id`]: newNotiKey,
          [`chats/chatID1/channelNotifications/${newNotiKey}`]: true,
        };

        try {
          await update(ref(db), updates);
        } catch (error) {
          console.error('Error updating data');
        }
      }

      return newMsgKey;
    } catch (error) {
      console.error('Error updating data:', error);
      return '';
    }
  } else {
    console.error('Error generating message key');
    return '';
  }
};

export const createChatMsg = async (content: string, chatId: string): Promise<string> => {
  const userSnapshot = await get(
    ref(db, `/users/${auth?.currentUser?.uid}`)
  );
  const username: string = userSnapshot.val()?.username || '';


  const gifUrlRegex = /(https?:\/\/\S+\.(?:png|jpe?g|gif|svg))/i;
  const gifUrlMatch = content.match(gifUrlRegex);
  const hasGif = gifUrlMatch !== null;


  const msgContent = hasGif ? gifUrlMatch[0] : content;

  const msg = {
    content: msgContent,
    id: '',
    author: username,
    userID: auth?.currentUser?.uid,
    timestamp: Date.now(),
    hasGif,
  };

  const newMsgRef = push(ref(db, `chats/${chatId}/messages`), msg);
  const newMsgKey: string | null = newMsgRef.key;

  if (newMsgKey) {
    const updates = {
      // [`messages/${chatId}/${newMsgKey}/id`]: newMsgKey,
      [`chats/${chatId}/messages/${newMsgKey}`]: msg,
      //[`chats/${chatId}/messages/${newMsgKey}/id`]: newMsgKey
    };

    try {
      await update(ref(db), updates);

      const notification: Notification = {
        id: newMsgKey,
        type: 'message',
        author: username,
      }

      const newNotiRef = push(ref(db, 'notifications'), notification);
      const newNotiKey: string | null = newNotiRef.key;

      if (newNotiKey) {
        const updates = {
          [`notifications/${newNotiKey}/id`]: newNotiKey,
          [`chats/${chatId}/notifications/${newNotiKey}`]: true,
        };

        try {
          await update(ref(db), updates);
        } catch (error) {
          console.error('Error updating data');
        }
      }

      return newMsgKey;
    } catch (error) {
      console.error('Error updating data:', error);
      return '';
    }
  } else {
    console.error('Error generating message key');
    return '';
  }
};

export const setMsgByChatId = async (chatId: string, msg: object): Promise<string> => {
  const chat = await get(ref(db, `chats/${chatId}`));
  if (chat) {
    const updates = {
      [`chats/${chatId}/`]: msg,
    };
    try {
      await update(ref(db), updates);
    } catch (error) {
      console.log(error.message);
    }
  } return chatId;
};

export const getMsgByChatId = async (chatId: string): Promise<string> => {
  const chat = await get(ref(db, `chats/${chatId}`));
  if (chat) {
    const messages = chat.messages;
    return messages;
  } else {
    return ''
  }
}
