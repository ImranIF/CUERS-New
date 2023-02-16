import { Outlet, Navigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";

const PrivateRoutes = (prop) => {
  const { isAuthenticated } = prop;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
