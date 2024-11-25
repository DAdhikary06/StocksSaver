import React, { useEffect, useState } from "react";

import { toast } from "react-hot-toast";
import AuthHandler from "../utils/Authhandler";
import Config from "../utils/Config";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [loginStatus, setLoginStatus] = useState(0);

  useEffect(() => {
    // Redirect to home if already logged in
    if (AuthHandler.loggedIn()) {
      navigate(Config.homeUrl);
    }
  }, []);

  const saveInputs = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        toast.error("Please fill all the fields");
        return;
      } else {
        // setLoginStatus(1);
        AuthHandler.login(username, password, handleAjaxResponse);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while logging in.");
    }
  };

  const handleAjaxResponse = (data) => {
    if (data && data.error) {
      // setLoginStatus(4);
      toast.error("Invalid login details.");
    } else if (data) {
      console.log(data);
      // setLoginStatus(3);
      toast.success("Login successful!");
      navigate(Config.homeUrl);
    }
  };

  return (
    <main className="d-flex w-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 style={{fontSize:40}}>
                  <span className="text-primary">Stocks</span>
                  <span className="text-success">Saver</span>
                </h1>
                <p className="lead">Sign in to your account to continue</p>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="m-sm-3">
                    <form onSubmit={handleLogin}>
                      <div className="mb-3">
                        <label
                          className=" d-flex form-label"
                          htmlFor="username"
                        >
                          Username
                        </label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          id="username"
                          name="username"
                          placeholder="Enter your username"
                          value={username}
                          onChange={saveInputs}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="d-flex form-label" htmlFor="password">
                          Password
                        </label>
                        <input
                          className="form-control form-control-lg"
                          type="password"
                          id="password"
                          name="password"
                          value={password}
                          placeholder="Enter your password"
                          onChange={saveInputs}
                          required
                        />
                        <small className="mt-1">
												<Link to={"/forgot-password"}>Forgot password?</Link>
											</small>
                      </div>
                      <div>
                        <div className="form-check">
                          <input
                            id="customControlInline"
                            type="checkbox"
                            className="form-check-input"
                            value="remember-me"
                            name="remember-me"
                            defaultChecked
                            
                          />
                          <label
                            className="form-check-label text-small"
                            htmlFor="customControlInline"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="d-grid gap-2 mt-3">
                        <button
                          className="btn btn-lg btn-primary"
                          type="submit"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="text-center mb-3">
                Don't have an account? <Link to={"/sign-up"}>Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
