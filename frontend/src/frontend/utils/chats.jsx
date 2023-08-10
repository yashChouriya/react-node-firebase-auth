import React, { useContext, useEffect, useState } from 'react';
import '../styles/chatBot.css';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import currentUser from '../helper/user';
import { ChatContext } from './chatContext';


const Chats = () => {
    let [chats, setChats] = useState([]);
    const { dispatch } = useContext(ChatContext);
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                if(doc.exists()){
                    setChats(doc.data())
                }
                else{
                    setChats([])
                }

            })

            return () => {
                unsub();
            }
        };
        currentUser.uid && getChats();
    }, []);

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u })
    }

    return (
        <div>
            <div className="chats">
                {Object.entries(chats).sort((a, b) => b[1].date - a[1].date)?.map((chat) => (
                    <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1])}>
                        <img className='userChatImg' alt="" src={chat[1].photoURL} />
                        <div className="userChatInfo">
                            <span>{chat[1].name}</span>
                            <p>{chat[1].lastMessage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Chats;