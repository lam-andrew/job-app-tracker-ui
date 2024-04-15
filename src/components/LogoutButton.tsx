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
        <button onClick={handleLogout} className="text-white bg-indigo-600 hover:bg-indigo-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Logout</button>
    );
};

export default LogoutButton;
