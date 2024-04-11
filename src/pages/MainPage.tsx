// src/components/MainPage.tsx
import React from 'react';
import JobForm from '../components/JobForm';
import TestDatabaseConnection from '../components/TestDatabaseConnection';

const MainPage: React.FC = () => {
  return (
    <div className="MainPage h-screen bg-slate-100">
      <TestDatabaseConnection />
      <JobForm />
    </div>
  );
};

export default MainPage;
