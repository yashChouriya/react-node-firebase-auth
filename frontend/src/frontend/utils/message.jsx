import React, { useContext, useEffect, useRef } from 'react';
import user from '../helper/user';
import { ChatContext } from './chatContext';

const Message = ({ message }) => {
    const ref = useRef();
    useEffect(()=>{
        ref.current?.scrollIntoView({behavior:"smooth", block: 'end'})
    },[message]);
    const { data } = useContext(ChatContext)
    return (
        <div>
            <div ref={ref} className={`message ${message.senderId === user.uid && "owner"}`}>

                <div className="messageInfo">
                    <img src={message.senderId === user.uid ? user.photoURL : data.user.photoURL} alt="img" />
                    <span>Just Now</span>

                </div>
                <div className="messageContent">
                    <p>{message?.text}</p>

                    {message.img && (
                        <img src={message.img} alt="img" />
                    )}
                </div>

            </div>
        </div>
    )
}

export default Message;