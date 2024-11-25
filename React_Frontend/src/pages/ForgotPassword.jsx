import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Config from "../utils/Config";
import axios from "axios";
import Spinner from "../utils/Spinner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    setLoading(true);
    try {
      const response = await axios.post(Config.passwordResetUrl, {
        email: email,
      });
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.detail);
        navigate('/')
      } else {
        toast.error("An error occurred while sending the email.");
      }
    } catch (error) {
    //   console.error(error);
      toast.error("An error occurred while sending the email.");
    }finally{
        setEmail("");
        setLoading(false);
    }
  };

  return (
    <>
      <main className="d-flex w-100">
        <div className="container d-flex flex-column">
          <div className="row vh-100">
            <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
              <div className="d-table-cell align-middle">
                <div className="text-center mt-4">
                  <h1 style={{ fontSize: 40 }}>
                    <span className="text-primary">Stock</span>
                    <span className="text-success">Saver</span>
                  </h1>
                  <p className="lead">
                    Enter your email address to reset your password
                  </p>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="m-sm-3">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label className=" d-flex form-label" htmlFor="email">
                            Email Address
                          </label>
                          <input
                            className="form-control form-control-lg"
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                          <button
                            className="btn btn-lg btn-primary"
                            type="submit"
                            disabled={loading}
                          >
                            Send Email
                          </button>
                            {loading && <Spinner />}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
