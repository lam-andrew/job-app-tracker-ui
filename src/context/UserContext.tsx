import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { UserProfile } from '../types/UserProfile';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

interface UserContextType {
    user: UserProfile | null;
    setUser: (user: UserProfile) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        console.log("User state updated to: ", user);
    }, [user]);


    const logout = useCallback(() => {
        googleLogout();
        setUser(null);
    
    }, [setUser]);

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook for easy context consumption
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
