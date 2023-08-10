import React, { useContext, useEffect, useState } from 'react';
import Message from './message';
import '../styles/chatBot.css';
import { ChatContext } from './chatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';


const Messages = () => {
    const { data } = useContext(ChatContext);

    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unsub();
        }
    }, [data.chatId])
    return (
        <div>
            <div className="messages">
                {messages.map(m => (
                <Message message={m} key={m.id} />
                ))}


            </div>
        </div>
    )
}

export default Messages;