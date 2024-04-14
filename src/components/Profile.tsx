import React, { useEffect } from 'react';
import { useUser } from '../context/UserContext';

const Profile: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return <div>No user profile data available</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-5">
      <h2 className="text-lg font-semibold">Profile Information</h2>
      <div className="mt-2">
        {/* Display user information. Make sure to check for null/undefined values. */}
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Display the user's picture if available */}
        {user.picture && (
          <img src={user.picture} alt="User" className="mt-2 w-20 h-20 rounded-full mx-auto"/>
        )}
        {/* Add additional user information here */}
      </div>
    </div>
  );
};

export default Profile;
