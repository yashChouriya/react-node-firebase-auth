import React from 'react';
import '../styles/chatBot.css';
import user from '../helper/user';

const Navbar = () => {
    return (

        <div>

            <div className="navbar">
                <span className="logo"></span>
                <div className="user">
                    <img src={user.photoURL} alt="userImg" className="userImg" />
                    <span>{user.name}</span>
                </div>
            </div>




        </div>
    )
}

export default Navbar;