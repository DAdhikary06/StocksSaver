import React from 'react'
import { useState, useEffect} from 'react';
import { useNavigate,useParams  } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import APIHandler from '../utils/APIHandler';
import AuthHandler from '../utils/Authhandler';

const CompanyDetails = () => {
    const {id}  = useParams();
    
    const [companyBank, setCompanyBankData] = useState([]);
    const { editCompanyData ,fetchCompanyDetails } = APIHandler();
    const [companyData, setCompanyData] = useState([]);
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      name: '',
      license_no: '',
      address: '',
      contact_no: '',
      email: '',
      description: '',
    });
  
  
    const fetchCompanyData = async () => {
      try {
        const companydata = await fetchCompanyDetails(id);
        console.log(companydata.data.data);
        setCompanyBankData(companydata.data.data.company_bank);
        setFormData({
            name: companydata.data.data.name,
            license_no: companydata.data.data.license_no,
            address: companydata.data.data.address,
            contact_no: companydata.data.data.contact_no,
            email: companydata.data.data.email,
            description: companydata.data.data.description,
        });
       
    } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
  
    // const viewCompanyDetails = (company_id) => {
    //   console.log("Viewing company details for company ID:", company_id);
    //   // Redirect to the company details page
    //   setCompanyData(companyData);
    //   // navigate(`/companydetails/${company_id}`);
      
    // };
     const AddCompanyBank = () => {
      navigate(`/addCompanyBank/${id}`);
    };

    const EditCompanyBank = (company_bank_id) => {
      navigate(`/editCompanyBank/${id}/${company_bank_id}`);

    }
  
    useEffect(() => {
      AuthHandler.checkTokenExpiry();
      fetchCompanyData();
    }, [id]);
  
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
        const response = await editCompanyData (
          formData.name,
          formData.license_no,
          formData.address,
          formData.contact_no,
          formData.email,
          formData.description,
          id
        );
        console.log('Company data saved:', response.data);
        toast.success(response.data.message);
        // Reset form fields
        setFormData({
          name: '',
          license_no: '',
          address: '',
          contact_no: '',
          email: '',
          description: '',
        });
        // Fetch updated company data
        fetchCompanyData();
      } catch (error) {
        console.error('Error saving company data:', error);
        toast.error('Error saving company data');
      }
    };



  
    return (
      <div className="container-fluid p-0">
        <div className="row mb-2 mb-xl-3">
          <h3 className="mb-3">
            <strong>Manage</strong> Company
          </h3>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Edit Company</h3>
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
                        placeholder="Enter Company Name"
                        defaultValue={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="license_no">
                        License Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="license_no"
                        name="license_no"
                        placeholder="Enter License No."
                        defaultValue={formData.license_no}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="address">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="1234 Main St"
                        defaultValue={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="contact_no">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="contact_no"
                        name="contact_no"
                        placeholder="Enter Contact No."
                        defaultValue={formData.contact_no}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="email">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter Company Email"
                        defaultValue={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="description">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        placeholder="Enter Company Description"
                        rows="1"
                        defaultValue={formData.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-4">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Company Bank</h3>
                <div className='col-auto ms-auto text-end mt-n1'> 
                  <button className='btn btn-primary' onClick={()=>AddCompanyBank(id)}>Add Bank</button>
                </div>
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
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companyBank.map((company, index) => (
                      <tr key={index}>
                        <td>{company.id}</td>
                        <td>{company.bank_account_no}</td>
                        <td>{company.ifsc_no}</td>
                        <td>{new Date(company.added_on).toLocaleString()}</td>
                        <td className='d-flex gap-2 '>
                          <button className="btn btn-outline-info" onClick={()=>EditCompanyBank(company.id)} >Edit</button>
                          <button className="btn btn-outline-danger " >Delete</button>
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
  

export default CompanyDetails
