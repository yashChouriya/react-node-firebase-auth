import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from "simple-peer";
import currentUser from '../helper/user';


const SocketContext = createContext();

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
}

export const SocketProvider = ({ children }) => {
    const socket = useMemo(() => io('localhost:8000'), []);
    const [callAccepted, setCallAccepted] = useState(false);
    const [isAudioAvailable, setAudioAvailability] = useState(true);
    const [isVideoAvailable, setVideoAvailability] = useState(true);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState("");
    const [call, setCall] = useState({});
    const [me, setMe] = useState("");
    const [remoteStream, setRemoteStream] = useState(null);
    const [connectedUsers, setOtherUsers] = useState([]);

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();


    useEffect(() => {
        setStream(null);

        if (isVideoAvailable || isAudioAvailable) {
            navigator.mediaDevices
                .getUserMedia({ video: isVideoAvailable, audio: isAudioAvailable })
                .then(currentStream => {
                    setStream(currentStream);
                });
        }

        if (!isVideoAvailable) {
            stream?.getVideoTracks()[0].stop();
        }
    }, [isVideoAvailable, isAudioAvailable]);

    useEffect(() => {
        socket.on("me", ({ id, connectedUsers }) => {
            setMe(id);
            setName(currentUser.name);
            setOtherUsers(connectedUsers);
        });

        socket.emit('joinRoom', { room: 1, data: currentUser });

        socket.on('userConnected', ({ connectedUsers }) => {
            setOtherUsers(connectedUsers);
        });

        socket.on('userDisconnected', ({ connectedUsers }) => {
            setOtherUsers(connectedUsers);
        });

        socket.on("calluser", ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });

    }, []);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on("signal", data => {
            socket.emit("answercall", { signal: data, to: call.from });
        });

        peer.on("stream", currentStream => {
            setRemoteStream(currentStream);
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = id => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on("signal", data => {
            socket.emit("calluser", {
                userToCall: id,
                signalData: data,
                from: me,
                name
            });
        });

        peer.on("stream", currentStream => {
            setRemoteStream(currentStream);
        });

        socket.on("callaccepted", signal => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const settingcallEnd = (value) => {
        setCallEnded(value);
        connectionRef.current.destroy();

    }

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();

        // window.location.reload();
    };

    return (
        <SocketContext.Provider value={{
            isAudioAvailable,
            isVideoAvailable,
            setAudioAvailability,
            setVideoAvailability,
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall,
            connectedUsers,
            socket,
            setStream,
            connectionRef,
            remoteStream,
            settingcallEnd
        }}>
            {children}
        </SocketContext.Provider>
    )
}