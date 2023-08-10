import React from 'react';
import '../styles/chatBot.css';
import Navbar from './navbar';
import Search from './search';
import Chats from './chats';



const Sidebar = () => {
    return (
        <div>
            <div className="sidebar">
                <Navbar />
                <Search />
                <Chats />
            </div>
        </div>
    )
}

export default Sidebar;