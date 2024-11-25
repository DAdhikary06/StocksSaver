import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthHandler from "../utils/Authhandler";
import APIHandler from "../utils/APIHandler";
import { toast } from "react-hot-toast";

const CompanyAccount = () => {
  const { id } = useParams();
  const apiHandler = APIHandler();
  const [formData, setFormData] = useState({
    company_id: "",
    transaction_type: "",
    transaction_amt: "",
    transaction_date: "",
    payment_mode: "",
  });

  const [companyAccountData, setCompanyAccountData] = useState([]);
  const [companyList, setCompanyData] = useState([]);

  useEffect(() => {
    AuthHandler.checkTokenExpiry();
    fetchCompanyAccountData();
  }, [id]);

  const fetchCompanyAccountData = async () => {
    const companyData = await apiHandler.fetchCompanyOnly();
    setCompanyData(companyData.data);
    updateDataAgain();
  };

  const updateDataAgain = async () => {
    const companyAccountData = await apiHandler.fetchAllCompanyAccount();
    // console.log("Company Account Data", companyAccountData.data.data);
    setCompanyAccountData(companyAccountData.data.data);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiHandler.saveCompanyTransactionData(
        formData.company_id,
        formData.transaction_type,
        formData.transaction_amt,
        formData.transaction_date,
        formData.payment_mode
      );
      console.log("Company Account Transaction", response.data);

      // Check for error in the response
      if (response.data.error) {
        console.log("Error saving company data:", response.data.error); // Use response.data.error
        toast.error(response.data.message);
        return false;
      } else {
        toast.success(response.data.message);
        // Reset form fields
        setFormData({
          company_id: "",
          transaction_type: "",
          transaction_amt: "",
          transaction_date: "",
          payment_mode: "",
        });
      }

      // Fetch updated company data
      fetchCompanyAccountData();
    } catch (error) {
      console.error("Error saving company data:", error);
      toast.error("Error saving company data");
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row mb-2 mb-xl-3">
        <h3 className="mb-3">
          <strong>Manage Company Account</strong> Details
        </h3>
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Add Company Account Bill </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="company">
                      Company
                    </label>
                    <select
                      className="form-select"
                      name="company_id"
                      id="company_id"
                      value={formData.company_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Company</option>
                      {companyList.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="transaction_type">
                      Transaction Type
                    </label>
                    <select
                      className="form-select"
                      id="transaction_type"
                      name="transaction_type"
                      value={formData.transaction_type}
                      onChange={handleChange}
                    >
                      <option value="1">Debit</option>
                      <option value="2">Credit</option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="amount">
                      Amount
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="transaction_amt"
                      name="transaction_amt"
                      placeholder="Enter Amount"
                      value={formData.transaction_amt}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="transaction_date">
                      Transaction Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="transaction_date"
                      name="transaction_date"
                      placeholder="Enter Transaction Date"
                      value={formData.transaction_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="payment_mode">
                      Payment Mode
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="payment_mode"
                      name="payment_mode"
                      placeholder="Enter Payment Mode"
                      value={formData.payment_mode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Company Transaction
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-4">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">All Company Account Transactions</h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>Company Name</th>
                      <th>Company ID</th>
                      <th>Transaction Type</th>
                      <th>Amount</th>
                      <th>Transaction Date</th>
                      <th>Payment Mode</th>
                      <th>Added on</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companyAccountData.map((companyaccount, index) => (
                      <tr key={index}>
                        <td>{companyaccount.id}</td>
                        <td>{companyaccount.company.name}</td>
                        <td>{companyaccount.company.id}</td>
                        <td
                          className={
                            companyaccount.transaction_type == 1
                              ? "text-danger"
                              : "text-success"
                          }
                        >
                          {companyaccount.transaction_type == 1
                            ? "Debit"
                            : "Credit"}
                        </td>
                        <td
                          className={
                            companyaccount.transaction_type == 1
                              ? "text-danger"
                              : "text-success"
                          }
                        >
                          {companyaccount.transaction_type == 1
                            ? `-${companyaccount.transaction_amt}`
                            : `+${companyaccount.transaction_amt}`}
                        </td>
                        <td>{companyaccount.transaction_date}</td>
                        <td>{companyaccount.payment_mode}</td>
                        <td>
                          {new Date(companyaccount.added_on).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyAccount;
