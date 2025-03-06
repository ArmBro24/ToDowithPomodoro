import React from 'react';

const Navbar = () => {
    return (
        <nav style={{
            background: '#2C3E50', color: 'white',
            padding: '10px 20px', textAlign: 'center',
            position: 'fixed', top: 0, width: '100%', zIndex: 1000
        }}>
            <h1>Pomodoro To-Do List</h1>
        </nav>
    );
};

export default Navbar;
