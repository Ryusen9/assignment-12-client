import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Context from "../Context/Context";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(Context);
  if (loading) {
    // return <Loader />;
    <p>Loading</p>;
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/login"}></Navigate>;
};

export default PrivateRoute;
