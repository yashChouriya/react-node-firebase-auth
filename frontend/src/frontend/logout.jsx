import React from 'react';

const Logout = () => {
    
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        localStorage.clear();
        setTimeout(() => {
            window.location.href = '/'
        }, 1000);
    }
    return (
        <div>
          
            <button className="btn btn-primary btn-sm" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout;