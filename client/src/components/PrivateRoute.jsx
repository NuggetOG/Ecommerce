import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { currentUserContext } from "../context/authContext";

export const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(currentUserContext);

  return currentUser ? children : <Navigate to="/login" replace />;
};
