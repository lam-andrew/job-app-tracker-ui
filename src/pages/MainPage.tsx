import React from 'react';
import JobForm from '../components/JobForm';
import TestDatabaseConnection from '../components/TestDatabaseConnection';
import JobListings from '../components/JobListings';
import Profile from '../components/Profile';
import LogoutButton from '../components/LogoutButton';

const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 py-12">
      <LogoutButton />
      <TestDatabaseConnection />
      <Profile />
      <JobForm />
      <JobListings />
    </div>
  );
};

export default MainPage;
