import React from "react";
import { useEffect } from "react";
import AuthHandler from "../utils/Authhandler";

const Company=()=> {

  useEffect(() => {
    AuthHandler.checkTokenExpiry();
  }
  , []);




  return (
    <>
      <div className="container-fluid p-0">
        <div className="row mb-2 mb-xl-3">
          <div className="col-auto d-none d-sm-block">
            <h3>
              <strong>Company</strong> Details
            </h3>
          </div>
        </div>
        
         
      </div>
    </>
  );
}

export default Company;