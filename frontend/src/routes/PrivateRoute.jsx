






import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useGetMe from "../hooks/useGetMe";
import Loader from "./Loader";

const PrivateRoute = () => {
  const { user, loading } = useGetMe();

  if (loading) return <Loader />;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
