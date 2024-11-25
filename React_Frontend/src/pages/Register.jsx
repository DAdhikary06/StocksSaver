import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthHandler from "../utils/Authhandler";
// import { RotatingLines  } from "react-loader-spinner";
import Spinner from "../utils/Spinner";
// // import Inventory from "../assets/inventory"

const Register = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const saveInputs = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    // console.log(state) // false
    setLoading((s) => !s);
    // true
    try {
      const data = await AuthHandler.register(formData, handleAjaxResponse);
      console.log(data);
      handleAjaxResponse(data);
      // reset form data

    } catch (error) {
      console.error(error);
      toast.error("An error occurred while logging in.");
    } finally {
      setFormData({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
      });
      setLoading(false);
    }
  };
  const handleAjaxResponse = (data) => {
    if (data && data.error) {
      if (data.error.email) {
        toast.error(data.error.email[0]); 
      } else {
        toast.error("Invalid registration details.");
      }
    }
    else if (data) {
      toast.success("Registration successful!");
      navigate("/");
    }
  };

  return (
    <>
      <main className="d-flex w-100 h-100">
        <div className="container d-flex flex-column">
          <div className="row vh-100">
            <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
              <div className="d-table-cell align-middle">
                <div className="text-center mt-4">
                  <h1 style={{ fontSize: 40 }} className="mb-0">
                    <span className="text-primary">Stock</span>
                    <span className="text-success">Saver</span>
                  </h1>
                  <p className="lead">Sign up to our service</p>
                </div>

                <div className="card">
                  <div className="card-body pb-0">
                    <div className="m-sm-3">
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label className="form-label">First name</label>
                            <input
                              className="form-control form-control-lg"
                              type="text"
                              name="first_name"
                              id="first_name"
                              value={formData.first_name}
                              placeholder="Enter your first name"
                              onChange={saveInputs}
                            />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label className="form-label">Last name</label>
                            <input
                              className="form-control form-control-lg"
                              type="text"
                              name="last_name"
                              id="last_name"
                              value={formData.last_name}
                              placeholder="Enter your last name"
                              onChange={saveInputs}
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Username</label>
                          <input
                            className="form-control form-control-lg"
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            placeholder="Enter your Username"
                            onChange={saveInputs}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            className="form-control form-control-lg"
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            placeholder="Enter your email"
                            onChange={saveInputs}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <input
                            className="form-control form-control-lg"
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            placeholder="Enter password"
                            onChange={saveInputs}
                          />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                          <button
                            className="btn btn-lg btn-primary"
                            type="submit"
                            disabled={loading}
                          >
                            Sign Up
                          </button>
                          {loading && <Spinner />}
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
