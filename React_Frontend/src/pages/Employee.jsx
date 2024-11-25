import React, { useEffect, useState } from "react";
import AuthHandler from "../utils/Authhandler";
import APIHandler from "../utils/APIHandler";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Employee = () => {
  const navigate = useNavigate();
  const apiHandler = APIHandler();

  const [formData, setFormData] = useState({
    name: "",
    joining_date: "",
    phone: "",
    address: "",
  });

  const [employeeList, setEmployeeList] = useState([]);


  useEffect(() => {
    AuthHandler.checkTokenExpiry();
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    updateDataAgain();
  };

  const updateDataAgain = async () => {
    const employeeData = await apiHandler.fetchEmployee();
    console.log("Fetched employee data:", employeeData.data); // Debugging log
    setEmployeeList(employeeData.data.data);
  };

  const ShowEmpDetails = (eid) => {
    navigate(`/employeeDetails/${eid}`);
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
      const response = await apiHandler.saveEmployeeData(
        formData.name,
        formData.joining_date,
        formData.phone,
        formData.address
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
            name: "",
            joining_date: "",
            phone: "",
            address: "",
        });
      }

      // Fetch updated company data
      updateDataAgain();
    } catch (error) {
      console.error("Error saving company data:", error);
      toast.error("Error saving company data");
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row mb-2 mb-xl-3">
        <h3 className="mb-3">
          <strong>Manage Employee</strong>
        </h3>
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Add Employee</h3>
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
                      placeholder="Enter Employee Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="joining_date">
                      Joining Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="joining_date"
                      name="joining_date"
                      placeholder="Enter Joining Date"
                      value={formData.joining_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="phone">
                      Phone No.
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="Enter Phone No."
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="adress">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      placeholder="Enter Address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Employee
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-4">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">All Employee Details</h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>Name</th>
                      <th>Joining Date</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Added On</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeList.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.joining_date}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.address}</td>
                        <td>{new Date(employee.added_on).toLocaleString()}</td>
                        <td>
                          <button className="btn btn-primary" onClick={()=>ShowEmpDetails(employee.id)}>Edit</button>
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

export default Employee;
