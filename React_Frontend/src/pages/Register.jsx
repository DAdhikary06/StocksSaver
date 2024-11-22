import React from "react";
import { Link } from "react-router-dom";
// import Inventory from "../assets/inventory"

const Register = () => {
  
  return (
    <>
      <main className="d-flex w-100 h-100">
        <div className="container d-flex flex-column">
          <div className="row vh-100">
            <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
              <div className="d-table-cell align-middle">
                <div className="text-center mt-4">
                  <h1
                    className="mb-3 text-primary"
                    style={{ fontFamily: "sans-serif-medium" }}
                  >
                    Sign in to{" "}
                    <strong className="text-black">
                      Stocks<span className="text-success">Saver</span>
                    </strong>
                  </h1>
                </div>

                <div className="card">
                  <div className="card-body pb-0">
                    <div className="m-sm-3">
                      <form>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label className="form-label">First name</label>
                            <input
                              className="form-control form-control-lg"
                              type="text"
                              name="name"
                              placeholder="Enter your first name"
                            />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label className="form-label">Last name</label>
                            <input
                              className="form-control form-control-lg"
                              type="text"
                              name="name"
                              placeholder="Enter your last name"
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Username</label>
                          <input
                            className="form-control form-control-lg"
                            type="text"
                            name="name"
                            placeholder="Enter your Username"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            className="form-control form-control-lg"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <input
                            className="form-control form-control-lg"
                            type="password"
                            name="password"
                            placeholder="Enter password"
                          />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                          <a className="btn btn-lg btn-primary" href="/">
                            Sign up
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-3">
                  Already have account? <Link to={"/"}>Log In</Link>
                </div>
              </div>
            </div>
          </div>
         

        </div>
      </main>
    </>
  );
};

export default Register;
