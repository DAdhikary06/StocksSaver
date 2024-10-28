import React from "react";
import GoogleFontLoader from "react-google-font-loader";
import "adminbsb-materialdesign/plugins/bootstrap/css/bootstrap.css";
import "adminbsb-materialdesign/plugins/node-waves/waves.css";
import "adminbsb-materialdesign/plugins/animate-css/animate.css";
import "adminbsb-materialdesign/css/style.css";
import AuthHandler from "../utils/AuthHandler";
import { reactLocalStorage } from "reactjs-localstorage";
import { Redirect } from "react-router-dom";
import Config from "../utils/Config";
import toast from "react-hot-toast";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    btnDisabled: true,
    loginStatus: 0,
  };

  saveInputs = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.setState({ btnDisabled: !(this.state.username && this.state.password) });
  };

  formSubmit = (event) => {
    event.preventDefault();
    try {
      this.setState({ loginStatus: 1 });
      AuthHandler.login(this.state.username, this.state.password, this.handleAjaxResponse);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while logging in.");
    }
  };

  handleAjaxResponse = (data) => {
    if (data && data.error) {
      this.setState({ loginStatus: 4 });
      toast.error("Invalid login details.");
    } else if (data) {
      this.setState({ loginStatus: 3 });
      localStorage.setItem('username', data.username);
      toast.success("Login successful!");
      window.location = Config.homeUrl;
    }
  };

  getMessages = () => {
    const messages = {
      0: "",
      1: (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      ),
      3: (
        <div className="alert alert-success">
          <strong>Login Successfull!</strong>
        </div>
      ),
      4: (
        <div className="alert alert-danger">
          <strong>Invalid Login Details</strong>
        </div>
      ),
    };
    return messages[this.state.loginStatus];
  };

  render() {
    if (AuthHandler.loggedIn() === true) {
      return <Redirect to={Config.homeUrl} />;
    }
    document.body.className = "login-page";

    return (
      <React.Fragment>
        <GoogleFontLoader
          fonts={[
            {
              font: "Roboto",
              weights: [400, 700],
            },
          ]}
          subsets={["latin", "cyrillic-ext"]}
        />
        <GoogleFontLoader
          fonts={[
            {
              font: "Material+Icons",
            },
          ]}
        />
        <div className="login-box">
          <div className="logo">
          <a onClick={(e) => e.preventDefault()}>Medical Store Management System</a>
            {/* <a href="javascript:void(0);">Medical Store Management System</a> */}
          </div>
          <div className="card">
            <div className="body">
              <form id="sign_in" method="POST" onSubmit={this.formSubmit}>
                <div className="msg">Sign in</div>
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="material-icons">person</i>
                  </span>
                  <div className="form-line">
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Username"
                      required
                      autoFocus
                      onChange={this.saveInputs}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="material-icons">lock</i>
                  </span>
                  <div className="form-line">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      required
                      onChange={this.saveInputs}
                    />
                  </div>
                  </div>
                <div className="row">
                  <div className="col-xs-8 p-t-5">
                    <input
                      type="checkbox"
                      name="rememberme"
                      id="rememberme"
                      className="filled-in chk-col-pink"
                    />
                    <label htmlFor="rememberme">Remember Me</label>
                  </div>
                  <div className="col-xs-4">
                    <button
                      className="btn btn-block bg-pink waves-effect"
                      type="submit"
                      disabled={this.state.btnDisabled}
                    >
                      SIGN IN
                    </button>
                  </div>
                </div>
                <div className="row m-t-15 m-b--20">
                  <div className="col-xs-6">
                    <a href="sign-up.html">Register Now!</a>
                  </div>
                  <div className="col-xs-6 align-right">
                    <a href="forgot-password.html">Forgot Password?</a>
                  </div>
                  <div className="col-xs-12">{this.getMessages()}</div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;