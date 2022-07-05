import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import SamplePage from '../sample/SamplePage';

import Error404 from './Error404';
import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './ProtectedRoute';

function Router() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<SamplePage />} path="/" />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<SignIn variant="standard" wrapperVariant="bgColor" />} path="/signin" />
        <Route element={<SignUp variant="standard" wrapperVariant="bgColor" />} path="/signup" />
      </Route>
      <Route element={<Error404 />} path="/*" />
    </Routes>
  );
}

export default Router;
