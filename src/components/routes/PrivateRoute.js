import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { selectToken } from '../../redux/features/auth';

function PrivateRoute() {
  const token = useSelector(selectToken);

  if (token !== '') return <Outlet data-testid="privateRoute_outlet" />;
  return <Navigate data-testid="privateRoute_navigate" replace="true" to="/signin" />;
}

export default PrivateRoute;
