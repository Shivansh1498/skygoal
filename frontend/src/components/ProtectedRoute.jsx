import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = localStorage.getItem("token");

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
