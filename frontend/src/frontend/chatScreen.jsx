import React, { useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import './styles/chatBot.css';
import './styles/modal.css';
import './styles/videocall.css';

import Sidebar from './utils/sideBar';
import Chat from './utils/chat';
import { useNavigate } from 'react-router-dom';
import { useSocket } from './utils/newSocketProvider';
import Videocall from './utils/videocall';

const ChatScreen = () => {
    const user = localStorage.getItem('token') || localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token') || localStorage.getItem('token')) : null;
    const socketProvided = useSocket();
    const navigate = useNavigate();
    const [showCallModal, setShowCallModal] = useState(false);
    const [showVCmodal, setShowVCmodal] = useState(false);

    let { socket,
        me,
        name,
        answerCall,
        call,
        stream,
        callAccepted } = socketProvided;

    const onClose = () => {
        setShowCallModal(false);
    }

    useEffect(() => {
        if (callAccepted) {
            onClose();
            setShowVCmodal(true);
        }
    }, [call.isReceivingCall && callAccepted]);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }

    }, [user]);

    useEffect(() => {
        const showCallNotify = call.isReceivingCall && !callAccepted;
        setShowCallModal(showCallNotify);

    }, [call.isReceivingCall]);

    console.log({ me }, { name });

    return (
        <div>
            {showCallModal && (
                <div className="modal-overlay">
                    <div className="callModalBody">
                        <h2 style={{ textAlign: 'center' }}>
                            {call.name} is calling you...
                        </h2>
                        <div className='callModalButtons mt-4'>
                            <button className='rejectbtn' onClick={onClose}>
                                Reject
                            </button>
                            <button className='callbtn' onClick={answerCall}>
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showVCmodal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <Videocall myStream={stream} />
                    </div>
                </div>
            )}

            {user && (
                <div className="home">
                    <div className="chatContainer">
                        <div style={{ width: "60vw" }}>
                            <Sidebar /></div>
                        <div><Chat me={me} /></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ChatScreen;