import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { selectToken } from '../../redux/features/auth';

function ProtectedRoute() {
  const token = useSelector(selectToken);

  if (token === '') return <Outlet data-testid="protectedRoute_outlet" />;
  return <Navigate data-testid="protectedRoute_navigate" replace="true" to="/" />;
}

export default ProtectedRoute;
