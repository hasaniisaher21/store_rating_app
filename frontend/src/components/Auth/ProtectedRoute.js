import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const ProtectedRoute = ({ children, allowedRoles }) => {
  // 1. Get the real user from the context
  const { user } = useAuth(); 

  // 2. Check if the user is logged in
  if (!user || !user.loggedIn) {
    return <Navigate to="/login" />;
  }

  // 3. Check if the user's role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  // 4. If all checks pass, render the component
  return children;
};

export default ProtectedRoute;