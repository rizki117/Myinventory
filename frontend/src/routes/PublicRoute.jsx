








import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useGetMe from "../hooks/useGetMe";
import Loader from "./Loader";

const PublicRoute = () => {
  const { user, loading } = useGetMe();

  if (loading) return <Loader />;

  return user ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;
