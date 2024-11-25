import React, { useEffect, useState } from "react";
import AuthHandler from "../utils/Authhandler";
import APIHandler from "../utils/APIHandler";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const CompanyAddBank = () => {
  const { id } = useParams();
  const { saveCompanyBankData, fetchAllCompany } = APIHandler();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bank_account_no: "",
    ifsc_code: "",
  });

  useEffect(() => {
    // Check if user is logged in
    if (!AuthHandler.loggedIn()) {
      saveCompanyBankData();
    }
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await saveCompanyBankData(
        formData.bank_account_no,
        formData.ifsc_code,
        id
      );
      console.log('Company bank data saved:', response.data);
      toast.success(response.data.message);
      // Reset form fields
      setFormData({
        bank_account_no: '',
        ifsc_code: '',
      });
      // Navigate to another page or perform any other action
      navigate(`/companydetails/${id}`);
    } catch (error) {
      console.error('Error saving company bank data:', error);
      toast.error('Error saving company bank data');
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row mb-2 mb-xl-3">
        <h3 className="mb-3">
          <strong>Company</strong> Details
        </h3>
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Add Company Bank {id}</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="bank_account_no">
                      Account No.
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="bank_account_no"
                      name="bank_account_no"
                      placeholder="Enter Account No."
                      value={formData.bank_account_no}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="ifsc_code">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ifsc_code"
                      name="ifsc_code"
                      placeholder="Enter IFSC Code"
                      value={formData.ifsc_code}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Company Bank
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyAddBank;