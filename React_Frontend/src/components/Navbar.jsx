import React from "react";
import { Link } from "react-router-dom";
import Config from "../utils/Config";
// import MainComponent from "./MainComponent";

function Navbar({setSidebarOpen}) {
  
  return (
    <>
    <nav className="navbar navbar-expand navbar-light navbar-bg">
      <a className="sidebar-toggle js-sidebar-toggle" onClick={()=>setSidebarOpen(prevState=>!prevState)} >
        <i className="hamburger align-self-center"></i>
      </a>

      {/* <form className="d-none d-sm-inline-block">
        <div className="input-group input-group-navbar">
          <input
            type="text"
            className="form-control"
            placeholder="Search…"
            aria-label="Search"
          />
          <button className="btn" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-search align-middle"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </form> */}

      <div className="navbar-collapse collapse">
        <ul className="navbar-nav navbar-align">
         <li>
          <Link to={Config.logoutUrl}>
         <button className="btn btn-outline-danger"> Logout</button>
          </Link>
         </li>
        </ul>
      </div>
    </nav>
    </>
  );
}

export default Navbar;