/* eslint-disable no-mixed-spaces-and-tabs */
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase-config";
import { SingleConversation } from "../SingleConversation/SingleConversation";
import { User, getUserByID } from "../../services/users.services";



export const Conversations: React.FC = () => {
	const [friends, setFriends] = useState<User[]>([]);


    useEffect(() => {
        const conversationsRef = ref(db, `users/${auth?.currentUser?.uid}`);
        const unsubscribe = onValue(conversationsRef, async (snapshot) => {
            const data = snapshot.val();
			
            if (data.friends) {
				const friendsKeys = Object.keys(data.friends);
				//console.log('friends keys: ', friendsKeys);
				const friendsList = await Promise.all(
					friendsKeys.map(async (id) => {
					  const friend = await getUserByID(id);
					  return friend;
					})
				  );
		  
				  setFriends(friendsList.filter(Boolean)); 
				} else {
				  setFriends([]);
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
			{friends && friends.map((friend) => (
				<div className="flex flex-col w-96" key={friend.uid}>
				<SingleConversation friend={friend}/>
			</div>
			))}
	
	</div>
	)
};
