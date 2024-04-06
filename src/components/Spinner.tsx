import React from 'react';

const Spinner: React.FC = () => (
  <div className="inline-flex items-center justify-center">
    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

export default Spinner;
