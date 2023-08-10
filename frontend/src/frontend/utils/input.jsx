import React, { useContext, useState } from 'react';
import '../styles/chatBot.css';
import user from '../helper/user';
import { ChatContext } from './chatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { db, storage } from '../../firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Input = () => {
    const { data } = useContext(ChatContext);
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const handleSend = async () => {
        if (img) {

            var fileInput = document.getElementById('file');
            var file = fileInput.files[0];
            let path = 'chats/' + file.name;
            let storageRef = ref(storage, path);
            const metadata = {
                contentType: 'image/jpeg',
            };
            await uploadBytes(storageRef, img, metadata).then((snapshot) => {
                console.log('Image uploaded successfully!');
                getDownloadURL(snapshot.ref).then(async (downloadURL) => {

                    await updateDoc(doc(db, 'chats', data.chatId), {
                        messages: arrayUnion({
                            id: uuid(),
                            text,
                            senderId: user.uid,
                            date: Timestamp.now(),
                            img:downloadURL
                        })
                    })



                });
            }).catch((error) => {
                console.error('Image upload failed:', error);
            });




        }
        else {
            await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: user.uid,
                    date: Timestamp.now()
                })
            })
        }

        await updateDoc(doc(db, "userChats", user.uid), {
            [data.chatId+"userInfo"]:{
                lastMessage:text,
                name:data.user.name,
                uid:data.user.uid,
                photoURL:data.user.photoURL,
                date:serverTimestamp()
            },
        })

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId+"userInfo"]:{
                lastMessage:text,
                name:user.name,
                uid:user.uid,
                photoURL:user.photoURL,
                date:serverTimestamp()
            },
        })

        setText("");
        setImg(null);
    }

    return (
        <div>
            <div className="input">
                <input type="text" placeholder="Type Something..." onChange={e => setText(e.target.value)} value={text}/>
                <div className="send">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-image-fill" viewBox="0 0 16 16"  id="file" onChange={e => setImg(e.target.files[0])}>
                        <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
                    </svg> */}
                    <input type="file" style={{ display: 'none' }} id="file" onChange={e => setImg(e.target.files[0])} />
                    <label htmlFor='file'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
                            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                        </svg>
                    </label>
                    <button onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Input;