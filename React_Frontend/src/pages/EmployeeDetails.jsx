import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import APIHandler from "../utils/APIHandler";
import AuthHandler from "../utils/Authhandler";

const EmployeeDetails = () => {
  const apiHandler = APIHandler();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    joining_date: "",
    phone: "",
    address: "",
  });

  const [formDataSalary, setFormDataSalary] = useState({
    salary_date: "",
    salary_amount: "",
  });

  const [formDataBank, setFormDataBank] = useState({
    bank_account_no: "",
    ifsc_no: "",
  });

  const [employeeSalaryList, setEmployeeSalaryList] = useState([]);
  const [employeeBankList, setEmployeeBankList] = useState([]);

  useEffect(() => {
    AuthHandler.checkTokenExpiry();
    fetchEmployeeDataByID();
  }, [id]);

  const fetchEmployeeDataByID = async () => {
    updateDataAgain();
  };

  const updateDataAgain = async () => {
    const employeeData = await apiHandler.fetchEmployeeById(id);
    // console.log(employeeData);
    //   console.log("Fetched employee data:", employeeData.data); // Debugging log

    const employeeSalary = await apiHandler.fetchSalaryEmployee(id);   
    // console.log(employeeSalary);

    const employeeBank = await apiHandler.fetchBankEmployee(id);
    // console.log(employeeBank);

    setEmployeeSalaryList(employeeSalary.data);
    setEmployeeBankList(employeeBank.data);
    
    setFormData({
      name: employeeData.data.data.name,
      joining_date: employeeData.data.data.joining_date,
      phone: employeeData.data.data.phone,
      address: employeeData.data.data.address,
      //   salary_date: employeeSalary.data.data.salary_date,
      //   salary_amount: employeeSalary.data.data.salary_amount,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setFormDataSalary({
      ...formDataSalary,
      [name]: value,
    });
    
    setFormDataBank({
      ...formDataBank,
      [name]: value,
    });
  };
  // Edit Employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiHandler.editEmployeeData(
        formData.name,
        formData.joining_date,
        formData.phone,
        formData.address,
        id
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
        navigate(`/manageEmployee/`);
      }

      // Fetch updated company data
      updateDataAgain();
    } catch (error) {
      console.error("Error saving company data:", error);
      toast.error("Error saving company data");
    }
  };

  // Add Employee Salary
  const handleSubmitSalary = async (e) => {
    e.preventDefault();
    try {
      const response = await apiHandler.AddEmployeeSalaryData(
        formDataSalary.salary_date,
        formDataSalary.salary_amount,
        id
      );
      console.log(formDataSalary);
      console.log("Company Account Transaction", response.data);

      // Check for error in the response
      if (response.data.error) {
        console.log("Error saving Employee Salary data:", response.data.error); // Use response.data.error
        toast.error(response.data.message);
        return false;
      } else {
        toast.success(response.data.message);
        // Reset form fields
        setFormDataSalary({
          salary_date: "",
          salary_amount: "",
        });
      }

      // Fetch updated company data
      updateDataAgain();
    } catch (error) {
      console.error("Error saving employee salary data:", error);
      toast.error("Error saving employee salary data");
    }
  };

  // Add Employee Bank
  const handleSubmitBank = async (e) => {
    e.preventDefault();
    try {
      const response = await apiHandler.AddEmployeeBankData(
        formDataBank.bank_account_no,
        formDataBank.ifsc_no,
        id
      );
      console.log(formDataBank);
      console.log("Employee Bank data", response.data);

      // Check for error in the response
      if (response.data.error) {
        console.log("Error saving Employee Bank data:", response.data.error); // Use response.data.error
        toast.error(response.data.message);
        return false;
      } else {
        toast.success(response.data.message);
        // Reset form fields
        setFormDataBank({
          bank_account_no: "",
          ifsc_no: "",
        });
      }

      // Fetch updated company data
      updateDataAgain();
    } catch (error) {
      console.error("Error saving employee bank data:", error);
      toast.error("Error saving employee bank data");
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row mb-2 mb-xl-3">
        <h3 className="mb-3">
          <strong>Edit Employee #{id}</strong>
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
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Add Employee Salary</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmitSalary}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="">
                      Salary Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="salary_date"
                      name="salary_date"
                      placeholder="Enter Salary Date"
                      value={formDataSalary.salary_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="salary_amtount">
                      Salary Amount
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="salary_amount"
                      name="salary_amount"
                      placeholder="Enter Salary Amount"
                      value={formDataSalary.salary_amount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Employee Salary
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-4">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Employee Salary</h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>Salary Date</th>
                      <th>Salary Amount</th>
                      <th>Added On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeSalaryList.map((salary) => (
                      <tr key={salary.id}>
                        <td>{salary.id}</td>
                        <td>{salary.salary_date}</td>
                        <td className="text-success">{`+${salary.salary_amount}`}</td>
                        <td>{new Date(salary.added_on).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Add Employee Bank</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmitBank}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="">Account No.</label>
                    <input
                      type="text"
                      className="form-control"
                      id="bank_account_no"
                      name="bank_account_no"
                      placeholder="Enter Account No."
                      value={formDataBank.bank_account_no}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="ifsc_no">
                     IFSC Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ifsc_no"
                      name="ifsc_no"
                      placeholder="Enter IFSC code"
                      value={formDataBank.ifsc_no}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Employee Bank
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-4">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Employee Bank</h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Account No.</th>
                      <th>IFSC Code</th>
                      <th>Added On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeBankList.map((bank) => (
                      <tr key={bank.id}>
                        <td>{bank.id}</td>
                        <td>{bank.bank_account_no}</td>
                        <td >{bank.ifsc_no}</td>
                        <td>{new Date(bank.added_on).toLocaleString()}</td>
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

export default EmployeeDetails;
