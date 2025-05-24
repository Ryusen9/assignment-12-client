import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Context from "../Context/Context";
import Loader from "../Components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(Context);
  if (loading) {
    <Loader />;
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/login"}></Navigate>;
};

export default PrivateRoute;
