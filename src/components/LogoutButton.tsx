import React from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
    const { logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <button onClick={handleLogout} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">Logout</button>
    );
};

export default LogoutButton;
