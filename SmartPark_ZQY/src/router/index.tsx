/* eslint-disable react-refresh/only-export-components */
import React from "react";
import RequireAuth from "../utils/RequireAuth";
import { RouteObject } from "react-router-dom";
const Home = React.lazy(() => import("../page/home"));
const Login = React.lazy(() => import("../page/login"));
const NotFound = React.lazy(() => import("../page/404"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <RequireAuth allowed={true} redirectTo="/login">
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    element: (
      <RequireAuth allowed={false} redirectTo="/dashboard">
        <Login />
      </RequireAuth>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];