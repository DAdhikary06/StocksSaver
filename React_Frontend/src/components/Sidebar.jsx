import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarItems } from "../utils/Config"; // Adjust the import path as necessary
import AuthHandler from "../utils/Authhandler";

const Sidebar = ({ sidebarOpen }) => {
  
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const user = AuthHandler.getUsername();

  const handleItemClick = (path) => {
    setActiveItem(path);
    // console.log(path);
  };
  const dashboardItem = sidebarItems.find(item => item.label === "Dashboard");

  return (
    <nav
      id="sidebar"
      className={`sidebar js-sidebar ${sidebarOpen ? "collapsed" : ""}`}
    >
      <div className="sidebar-content js-simplebar" data-simplebar="init">
        <div className="simplebar-wrapper" style={{ margin: 0 }}>
          <div className="simplebar-height-auto-observer-wrapper">
            <div className="simplebar-height-auto-observer"></div>
          </div>
          <div className="simplebar-mask">
            <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
              <div
                className="simplebar-content-wrapper"
                tabIndex="0"
                role="region"
                aria-label="scrollable content"
                style={{ height: "100%", overflow: "hidden" }}
              >
                <div className="simplebar-content pt-4" style={{ padding: 0 }}>
                  <Link className="sidebar-brand" to={dashboardItem.path} style={{fontSize:30}}>
                    <span className="sidebar-brand-text align-middle">
                      Stock
                    </span>
                    <span className="sidebar-brand-text align-middle text-success">
                      Saver
                    </span>
                    <h5 className="mb-0 pt-2 text-white" style={{fontSize:15}}>
                      Welcome, <strong className="text-info" >{user}</strong>
                    </h5>
                  </Link>

                  <ul className="sidebar-nav">
                    <li className="pt-2 sidebar-header">
                      <hr />
                    </li>
                    {sidebarItems.map((item) => (
                      <li
                        key={item.path}
                        className={`sidebar-item ${
                          activeItem === item.path ? "active" : ""
                        }`}
                      >
                        <Link
                          className="sidebar-link"
                          to={item.path}
                          onClick={() => handleItemClick(item.path)}
                        >
                          <span className="align-middle">{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
