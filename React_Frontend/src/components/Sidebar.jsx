import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarItems } from "../utils/Config"; // Adjust the import path as necessary

const Sidebar = React.memo(() => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const handleItemClick = (path) => {
    setActiveItem(path);
    // console.log(path);
  };

  return (
    <nav id="sidebar" className="sidebar js-sidebar">
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
                <div className="simplebar-content" style={{ padding: 0 }}>
                  <Link className="sidebar-brand" to="/">
                    <span className="sidebar-brand-text align-middle">
                      Stocks
                    </span>
                    <span className="sidebar-brand-text align-middle text-success">
                      Saver
                    </span>
                  </Link>

                  <div className="sidebar-user">
                    <div className="d-flex justify-content-center">
                      <div className="flex-shrink-0">
                        {/* Uncomment and add image source if needed */}
                        {/* <img src="img/avatars/avatar.jpg" className="avatar img-fluid rounded me-1" alt="Charles Hall" /> */}
                      </div>
                    </div>
                  </div>

                  <ul className="sidebar-nav">
                    <li className="sidebar-header">
                      Pages
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
});

export default Sidebar;
