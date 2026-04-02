/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
const Home = React.lazy(() => import('../page/home'));
const NotFound = React.lazy(() => import('../page/404'));
const Login = React.lazy(() => import('../page/login'));
import RequireAuth from '../utils/RequireAuth';

const router = createBrowserRouter([
  {
    path: '/',
    element:  <RequireAuth allowed={true} redirectTo="/login"><Home /></RequireAuth>,
  },
  {
    path: '/login',
    element: <RequireAuth allowed={false} redirectTo="/"><Login /></RequireAuth>,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
export default router;
