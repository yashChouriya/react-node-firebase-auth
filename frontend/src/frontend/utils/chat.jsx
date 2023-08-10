import React, { useContext, useEffect, useState } from 'react';
import '../styles/chatBot.css';
import Messages from './messages';
import Input from './input';
import { ChatContext } from './chatContext';
import { useNavigate } from 'react-router-dom';
import currentUser from '../helper/user';
import Modal from '../modal';
import Videocall from './videocall';
import { useSocket } from './newSocketProvider';

const Chat = ({ me }) => {
    const { data } = useContext(ChatContext);
    const navigate = useNavigate();
    const [showVCmodal, setShowVCmodal] = useState(false);
    const [isAudioAvailable, setAudioAvailability] = useState(true);
    const [isVideoAvailable, setVideoAvailability] = useState(false);
    const [myStream, setMystream] = useState();
    // const [idToCall, setIdToCall] = useState("");
    const socketProvided = useSocket();

    let { socket,
        callAccepted,
        callEnded,
        settingcallEnd,
        callUser,
        connectedUsers
    } = socketProvided;

    console.log({ connectedUsers });


    function findKeysByValue(object, value) {
        return Object.keys(object).filter(key => object[key] === value);
    }

    const idToCall = findKeysByValue(connectedUsers, data.user.uid);

    console.log({ call: idToCall[0] })

    const leaveCall = () => {
        setShowVCmodal(false);
        settingcallEnd(true);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/');
    }

    const handleCall = async () => {

        callUser(idToCall);
        console.log('calling user ' + idToCall);
        setShowVCmodal(true);
        setAudioAvailability(true);
        setVideoAvailability(true);

    }

    const onClose = () => {
        setShowVCmodal(false);
        // setAudioAvailability(false);
        if (myStream) {
            myStream.getTracks().forEach(track => track.stop()); // Stop all tracks in the stream
            setMystream(null); // Clear the stream state
        }
        setVideoAvailability(false);
    }

    useEffect(() => {
        if (isAudioAvailable || isVideoAvailable) {
            navigator.mediaDevices.getUserMedia({ audio: isAudioAvailable, video: isVideoAvailable })
                .then((stream) => {
                    setMystream(stream);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        return () => {
            if (myStream) {
                myStream.getTracks().forEach(track => track.stop()); // Stop tracks when component unmounts
            }
        };
    }, [isAudioAvailable, isVideoAvailable]);

    return (
        <div>
            {showVCmodal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <Videocall me={me} myStream={myStream} leaveCall={leaveCall} />
                    </div>
                </div>
            )}
            <div className="chat">
                <div className="chatInfo">
                    <span>{data.user.name}</span>
                    <div className="chatIcons">
                        {data.user.name && (
                            <svg onClick={handleCall} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-camera-video-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z" />
                            </svg>
                        )}

                        <button className="logoutBtn" onClick={handleLogout}>Logout</button>
                    </div>
                </div>

                <Messages />
                <Input />
            </div>
        </div>
    )
}

export default Chat;