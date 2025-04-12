import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import LoginModal from "./LoginModal";

const isAuthenticated = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() > exp * 1000) {
      sessionStorage.removeItem("token");
      return false;
    }
  } catch (error) {
    sessionStorage.removeItem("token");
    return false;
  }

  return true;
};

const ProtectedRoute = () => {
  const [open, setOpen] = useState(true);

  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <LoginModal open={open} setOpen={setOpen} />
  );
};
export default ProtectedRoute;
