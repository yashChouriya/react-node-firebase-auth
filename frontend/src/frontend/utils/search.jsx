import React, { useState } from 'react';
import '../styles/chatBot.css';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import currentUser from '../helper/user';


const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("name", "==", username));
        try {
            const qsnapshot = await getDocs(q);
            qsnapshot.forEach((doc) => {
                setUser(doc.data())
            });
        } catch (err) {
            setErr(true);
        }
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async () => {
        const combineId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        const res = await getDoc(doc(db, "chats", combineId));
     console.log(res,user,combineId)
        try {
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combineId), { messages: [] });

                await updateDoc(doc(db, "userChats", currentUser.uid),
                    {
                        [combineId + "userInfo"]: {
                            uid: user.uid,
                            name: user.name,
                            photoURL: user.photoURL,
                            date:serverTimestamp(),
                            userInfo:combineId
                        }
                    })

                await updateDoc(doc(db, "userChats", user.uid),
                    {
                        [combineId + "userInfo"]: {
                            uid: currentUser.uid,
                            name: currentUser.name,
                            photoURL: currentUser.photoURL,
                            date:serverTimestamp(),
                            userInfo:combineId
                        }
                    })
            }
        } catch (err) { }
        setUser(null);
        setUsername("");
    }



    return (
        <div>
            <div className="search">

                <div className="searchForm">
                    <input className="searchInput" type="text" placeholder='Find a User' onKeyDown={handleKey} onChange={e => setUsername(e.target.value)} value={username}/>
                </div>
                {err && <span>User Not Found</span>}
                {user && (<div className="userChat" onClick={handleSelect}>
                    <img className='userChatImg' alt="userImg" src={user?.photoURL} />
                    <div className="userChatInfo">
                        <span>{user?.name}</span>
                    </div>
                </div>
                )}

            </div>
        </div>
    )
}

export default Search;