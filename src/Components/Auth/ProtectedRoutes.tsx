import React from 'react';
import { Navigate } from 'react-router-dom';


interface ProtectedRoutesProps {
  user: boolean;
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ user, children }) => {
  return user ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoutes;
