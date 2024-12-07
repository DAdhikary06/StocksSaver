import React from "react";
import { Link } from "react-router-dom";
import Config from "../utils/Config";
// import MainComponent from "./MainComponent";

function Navbar({ setSidebarOpen,lowStockMedicines}) {
  return (
    <>
      <nav className="navbar navbar-expand navbar-light navbar-bg">
        <a
          className="sidebar-toggle js-sidebar-toggle"
          onClick={() => setSidebarOpen((prevState) => !prevState)}
        >
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
            
             {/* Notification Feature */ }
            <li className="nav-item dropdown">
              <a
                className="nav-icon dropdown-toggle show"
                href="#"
                id="alertsDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                <div className="position-relative">
                <i className="bi bi-bell"></i>
                  <span className="indicator">{lowStockMedicines.length}</span>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <div className="list-group">
                  {lowStockMedicines.length === 0 ? (
                    <div className="list-group-item">No notifications</div>
                  ) : (
                    lowStockMedicines.map((medicine, index) => (
                      <a href="#" className="list-group-item" key={index}>
                        <div className="row g-0 align-items-center">
                          <div className="col-10">
                            <div className="text-dark">{medicine.name}</div>
                            <div className="text-muted small mt-1">
                              Only {medicine.in_stock_total} left in stock.
                            </div>
                          </div>
                        </div>
                      </a>
                    ))
                  )}
                </div>
                {/* <div className="dropdown-menu-footer">
                  <a href="#" className="text-muted">
                    Show all notifications
                  </a>
                </div> */}
              </div>
            </li>
            <li className="nav-item">
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
