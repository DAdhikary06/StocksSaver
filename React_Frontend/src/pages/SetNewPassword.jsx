import React from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Config from "../utils/Config";
import axios from "axios";
import Spinner from "../utils/Spinner";


const SetNewPassword = () => {
  const navigate = useNavigate();
  const { uidb64, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const data = {
    uidb64: uidb64,
    token: token,
    new_password: newPassword,
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${Config.passwordResetConfirmUrl}${uidb64}/${token}/`, data);
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.detail);
        navigate("/");
      } else {
        toast.error("An error occurred while sending the email.");
      }
    } catch (error) {
      //   console.error(error);
      toast.error("An error occurred while sending the email.");
    } finally {
      setNewPassword("")
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
                    <span className="text-primary">Stocks</span>
                    <span className="text-success">Saver</span>
                  </h1>
                  <p className="lead">
                    Set your new password
                  </p>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="m-sm-3">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label className=" d-flex form-label" htmlFor="password">
                            New Password
                          </label>
                          <input
                            className="form-control form-control-lg"
                            type="password"
                            id="password"
                            name="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter your new password"
                            required
                          />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                          <button
                            className="btn btn-lg btn-primary"
                            type="submit"
                            disabled={loading}
                          >
                            Set New Password
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

export default SetNewPassword;
