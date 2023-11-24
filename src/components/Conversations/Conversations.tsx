import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase-config";
import { SingleConversation } from "../SingleConversation/SingleConversation";

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
        const conversationsRef = ref(db, 'users');
        const unsubscribe = onValue(conversationsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setConversations(Object.values(data));
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
