import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';


export default function IsPrivate({ children, allowedRoles }) {
  const { isLoggedIn, isLoading, role } = useContext(AuthContext);

  if (isLoading) return <p>Loading...</p>;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    // Check if the user's role is included in the allowedRoles array
    // If it's not allowed, redirect to a different page (e.g., unauthorized page)
    if (allowedRoles && !allowedRoles.includes(role)) {
      return <Navigate to="/" />;
    } else {
      return children;
    }
  }
}