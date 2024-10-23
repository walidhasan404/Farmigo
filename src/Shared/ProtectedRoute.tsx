// ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useGetData from '../common/Hooks/useGetData';
import { useAuth } from '../Authentication/AuthProvider/AuthContext';


interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: 'admin' | 'farmer' | 'customer'; // Optional if role restriction is required
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  // Assuming you are storing the token in localStorage or sessionStorage
  const { userAuth }  = useAuth()
  const token = userAuth?.token // Fetch token from local storage
  const { userId, userRole } = useGetData(token); // Use the hook to get user ID and role
  
  console.log(userRole);
  console.log(requiredRole);
  
  if (!userId) {
    // If no userId is found, the user is not authenticated
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole.includes(requiredRole)) {
    return children;
  }

  // Admin can access all routes
  if (userRole === 'admin') {
    return children;
  }

  // If the user doesn't have the required role, redirect to unauthorized page
  return <Navigate to="/unauthorized" />;

};

export default ProtectedRoute;
