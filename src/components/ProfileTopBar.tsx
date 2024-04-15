import React from 'react';
import { useUser } from '../context/UserContext';
import LogoutButton from './LogoutButton';

const ProfileTopBar: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <div className="text-lg font-semibold">
        NextStep Tracking
      </div>
      
      {user ? (
        <div className="flex items-center gap-6">
          {user.picture && (
            <img src={user.picture} alt="User" className="w-10 h-10 rounded-full" />
          )}
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <LogoutButton />
        </div>
      ) : (
        <div>No user profile data available</div>
      )}
    </div>
  );
};

export default ProfileTopBar;
