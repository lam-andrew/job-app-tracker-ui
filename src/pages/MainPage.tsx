import React, { useState } from 'react';
import JobForm from '../components/JobForm';
import TestDatabaseConnection from '../components/TestDatabaseConnection';
import JobListings from '../components/JobListings';
import ProfileTopBar from '../components/ProfileTopBar';

const MainPage: React.FC = () => {
  const [refetchIndicator, setRefetchIndicator] = useState(0);

  const triggerRefetch = () => {
    setRefetchIndicator(Date.now()); // Update with the current timestamp
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-12">
      {/* <TestDatabaseConnection /> */}
      <ProfileTopBar />
      <JobForm triggerRefetch={triggerRefetch} />
      <JobListings refetchIndicator={refetchIndicator} />
    </div>
  );
};

export default MainPage;
