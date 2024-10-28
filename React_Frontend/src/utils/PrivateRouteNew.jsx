import React from "react";
import { Navigate } from "react-router-dom";
import AuthHandler from "./Authhandler";
import MainComponent from "../components/MainComponent";

const PrivateRouteNew = ({ page, activepage, children }) => {
  const isAuthenticated = AuthHandler.loggedIn();

  return isAuthenticated ? (
    <MainComponent page={page} activepage={activepage}>
      {children}
    </MainComponent>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRouteNew;