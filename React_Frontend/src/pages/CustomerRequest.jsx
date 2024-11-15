import React from 'react'
import { useEffect, useState } from "react";
import AuthHandler from "../utils/Authhandler";
import APIHandler from "../utils/APIHandler";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const CustomerRequest = () => {
    const apiHandler = APIHandler();
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        medicine_details: "",
  
    });
  
    const [customerRequestList, setCustomerRequestData] = useState([]);

    
    useEffect(() => {
      AuthHandler.checkTokenExpiry();
      fetchCustomerRequestData();
    }, []);

    const fetchCustomerRequestData = async () => {
      try {
        const customerRequestData = await apiHandler.fetchAllCustomerRequest();
        console.log("Fetched customer request data:", customerRequestData); // Debugging log
        setCustomerRequestData(customerRequestData.data.data)// Ensure this matches the structure of your data
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
  
    const viewCompanyDetails = (company_id) => {
      console.log("Viewing company details for company ID:", company_id);
      // Redirect to the company details page
      setCompanyData(companyData);
      navigate(`/companydetails/${company_id}`);
    };
  
  
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
        const response = await saveCustomerRequestData(
            formData.name,
            formData.phone,
            formData.medicine_details,

        );
        console.log("Cutomer Request saved:", response.data);
        toast.success(response.data.message);
        // Reset form fields
        setFormData({
            name: "",
            phone: "",
            medicine_details: "",
      
        });
        // Fetch updated customer request data
        fetchCustomerRequestData();
      } catch (error) {
        console.error("Error saving customer request data:", error);
        toast.error("Error saving customer request data");
      }
    };
  
    return (
      <div className="container-fluid p-0">
        <div className="row mb-2 mb-xl-3">
          <h3 className="mb-3">
            <strong>Manage Customer Medicine</strong> Request
          </h3>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Add Customer Details</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Enter Customer Name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="phone">
                       Phone No.
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Enter Phone No."
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3 col-md-12">
                      <label className="form-label" htmlFor="medicine_details">
                        Medicine Details
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="medicine_details"
                        name="medicine_details"
                        placeholder="Enter Medicine Details"
                        value={formData.medicine_details}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Company
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-4">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">All Customer Medicine Details</h3>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Phone No.</th>
                        <th>Medicine Details</th>
                        <th>Status</th>
                        <th>Added On</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerRequestList.map((customer) => (
                        <tr key={customer.id}>
                          <td>{customer.id}</td>
                          <td>{customer.name}</td>
                          <td>{customer.phone}</td>
                          <td>{customer.medicine_details}</td>
                          <td>{customer.status}</td>
                          <td>{new Date(customer.added_on).toLocaleString()}</td>
                          <td>
                            <button
                              className="btn btn-outline-info"
                              onClick={() => viewCompanyDetails(company.id)}
                            >
                              View
                            </button>
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
  

export default CustomerRequest
