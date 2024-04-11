// src/components/MainPage.tsx
import React from 'react';
import JobForm from '../components/JobForm';
import TestDatabaseConnection from '../components/TestDatabaseConnection';
import JobListings from '../components/JobListings';

const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 py-12">
      {/* <TestDatabaseConnection /> */}
      <JobForm />
      <JobListings />
    </div>
  );
};

export default MainPage;
