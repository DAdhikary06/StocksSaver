import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthHandler from "../utils/Authhandler";
import { toast } from "react-hot-toast";

const LogoutComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AuthHandler.logoutUser();
    toast.success("Logout successfully");
    navigate('/');
  }, [navigate]);

  return null;
};

export default LogoutComponent;