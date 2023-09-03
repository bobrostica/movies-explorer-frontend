import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppState } from '../../contexts/AppStateContext';

const ProtectedRoute = ({ element: Component, ...props }) => {
  const [{ isLoggedIn }] = useAppState();

  return isLoggedIn ? <Component {...props} /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
