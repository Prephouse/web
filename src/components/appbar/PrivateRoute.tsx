import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import useAppSelector from 'hooks/useAppSelector';

import { HOME_PATH } from 'strings/paths';

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const user = useAppSelector(state => state.auth.user);

  return user ? children : <Navigate to={HOME_PATH} />;
};

export default PrivateRoute;
