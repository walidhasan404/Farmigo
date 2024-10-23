import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/'); // Go back to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-red-500 mb-4">403 - Unauthorized</h1>
        <p className="text-lg text-gray-700 mb-6">
          You don't have permission to access this page.
        </p>
        <button
          onClick={handleGoBack}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
