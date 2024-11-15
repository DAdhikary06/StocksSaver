// import React, { useEffect, useState } from "react";
// import AuthHandler from "../utils/Authhandler";
// import APIHandler from "../utils/APIHandler";
// import { toast } from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";

// const CompanyEditBank = () => {
//   const { id } = useParams();
//   const apiHandler = APIHandler();
//   const navigate = useNavigate();


//   const [formData, setFormData] = useState({
//     bank_account_no: "",
//     ifsc_no: "",
//   });

//   useEffect(() => {
//     AuthHandler.checkTokenExpiry();
//     fetchCompanyData();
//   }, [id]);

//   const [companyBankData, setCompanyBankData] = useState([]);

//   const fetchCompanyData = async () => {
//     try {
//       const companyBankdata = await apiHandler.fetchCompanyDetails(id);
//       console.log(companyBankdata.data.data.company_bank);
//       setCompanyBankData(companyBankdata.data.data.company_bank); // Adjust this based on your actual data structure
//       setFormData({
//         bank_account_no: bank_account_no,
//         ifsc_no: ifsc_no,
//       });
//     } catch (error) {
//       console.error("Error fetching company data:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await apiHandler.saveCompanyBankData(
//         formData.bank_account_no,
//         formData.ifsc_no,
//         id
//       );
//       console.log('Company bank data saved:', response.data);
//       toast.success(response.data.message);
//       // Navigate to another page or perform any other action
//       navigate(`/companydetails/${id}`);
//     } catch (error) {
//       console.error('Error saving company bank data:', error);
//       const errorMessage = error.response?.data?.message || 'Error saving company bank data';
//       toast.error(errorMessage);
//     }
//   };

//   return (
//     <div className="container-fluid p-0">
//       <div className="row mb-2 mb-xl-3">
//         <h3 className="mb-3">
//           <strong>Company</strong> Details
//         </h3>
//         <div className="col-md-12">
//           <div className="card">
//             <div className="card-header">
//               <h3 className="card-title">Edit Company Bank {id}</h3>
//             </div>
//             <div className="card-body">
//               <form onSubmit={handleSubmit}>
//                 <div className="row">
//                   <div className="mb-3 col-md-6">
//                     <label className="form-label" htmlFor="bank_account_no">
//                       Account No.
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="bank_account_no"
//                       name="bank_account_no"
//                       placeholder="Enter Account No."
//                       defaultValue={formData.bank_account_no}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3 col-md-6">
//                     <label className="form-label" htmlFor="ifsc_no">
//                       IFSC Code
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="ifsc_no"
//                       name="ifsc_no"
//                       placeholder="Enter IFSC Code"
//                       defaultValue={formData.ifsc_no}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                   Save Changes
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyEditBank;


import React, { useEffect, useState } from "react";
import AuthHandler from "../utils/Authhandler";
import APIHandler from "../utils/APIHandler";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const CompanyEditBank = () => {
  const { company_id,id } = useParams();
  const apiHandler = APIHandler();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bank_account_no: "",
    ifsc_no: "",
  });

  useEffect(() => {
    AuthHandler.checkTokenExpiry();
    fetchCompanyBankData();
  }, [id]);

  const fetchCompanyBankData = async () => {
    try {
      const companydata = await apiHandler.fetchCompanyBankDetails(id);
      const bankData = companydata.data.data ; // Default to an empty object if data is not present
      console.log(bankData);
      setFormData({
        bank_account_no: bankData.bank_account_no , // Default to empty string if undefined
        ifsc_no: bankData.ifsc_no , // Default to empty string if undefined
      });
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
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
      const response = await apiHandler.editCompanyBankData(
        formData.bank_account_no,
        formData.ifsc_no,
        company_id,
        id
       
      );
      console.log('Company bank data saved:', response.data);
      toast.success(response.data.message);
      navigate(`/companydetails/${company_id}`);
    } catch (error) {
      console.error('Error saving company bank data:', error);
      const errorMessage = error.response?.data?.message || 'Error saving company bank data';
      toast.error(errorMessage);
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
              <h3 className="card-title">Edit Company Bank {id}</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="bank_account_no">
                      Account No.
                    </label>
                    <input
                      type="text"
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
                    <label className="form-label" htmlFor="ifsc_no">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ifsc_no"
                      name="ifsc_no"
                      placeholder="Enter IFSC Code"
                      value={formData.ifsc_no}
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
      </div>
    </div>
  );
};

export default CompanyEditBank;
``