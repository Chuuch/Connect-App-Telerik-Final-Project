/* eslint-disable no-mixed-spaces-and-tabs */
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase-config";
import { SingleConversation } from "../SingleConversation/SingleConversation";
import { getUserByID } from "../../services/users.services";

interface Conversation {
	id: string;
    teamId: string;
    messages: object;
    timeStamp: number;
	conversation: string;
	username: string;
}

export const Conversations: React.FC = () => {
	const [conversations, setConversations] = useState<Conversation[]>([]);


    useEffect(() => {
        const conversationsRef = ref(db, `users/${auth?.currentUser?.uid}`);
        const unsubscribe = onValue(conversationsRef, async (snapshot) => {
            const data = snapshot.val();
			//console.log(data);
			
            if (data.friends) {
				//Object.keys????
				//const friendIds = Object.values(data.friends).map((friend) => friend.friendID);
				const friendsKeys = Object.keys(data.friends);
				//console.log('friend IDs: ', friendIds);
				console.log('friends keys: ', friendsKeys);
				
				//console.log('ids: ', friendIds);
				const friendsList = await Promise.all(
					friendsKeys.map(async (id) => {
					  const friend = await getUserByID(id);
					  return friend;
					})
				  );
		  
				  setConversations(friendsList.filter(Boolean)); 
				} else {
				  setConversations([]);
				}
			  });
		  
			  return () => {
				unsubscribe();
			  };
			}, []);
	
	
	return (
		<div className="div">
			<div className="flex items-center justify-center border-b dark:border-gray-600 p-2">
				<h2 className="text-blue-500 dark:text-purple-600 text-2xl font-bold p-2 ">
					Chats
				</h2>
			</div>
			{conversations && conversations.map((conversation) => (
				<div className="flex flex-col w-96" key={conversation.id}>
				<SingleConversation conversation={conversation}/>
			</div>
			))}
	
	</div>
	)
};
