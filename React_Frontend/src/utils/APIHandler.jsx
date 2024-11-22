import axios from "axios";
import AuthHandler from "./Authhandler";
import Config from "./Config";
import { useNavigate } from "react-router-dom";

const APIHandler = () => {
  const checkLogin = async () => {
    if (AuthHandler.checkTokenExpiry()) {
      try {
        const response = await axios.post(Config.refreshApiUrl, {
          refresh: AuthHandler.getRefreshToken(),
        });
        console.log(response.data);
        localStorage.setItem("token", response.data.access);
      } catch (error) {
        console.error(error);
        AuthHandler.logoutUser();
        useNavigate("/");
      }
    }
  };
  const saveCompanyData = async (
    name,
    license_no,
    address,
    contact_no,
    email,
    description
  ) => {
    await checkLogin();
    // Wait Until Token Get Updated

    const response = await axios.post(
      Config.companyApiUrl,
      {
        name: name,
        license_no: license_no,
        address: address,
        contact_no: contact_no,
        email: email,
        description: description,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  };

  const fetchAllCompany = async () => {
    await checkLogin();
    const response = await axios.get(Config.companyApiUrl, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });
    return response;
  };


  const fetchHomePage = async () => {
    await checkLogin();
    const response = await axios.get(Config.homeApiUrl, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });
    return response;
  };
  const fetchAllCustomerRequest = async () => {
    await checkLogin();
    const response = await axios.get(Config.customerRequestApiUrl, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });
    return response;
  };

  const fetchCompanyOnly = async () => {
    await checkLogin();
    const response = await axios.get(Config.companyOnly, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });
    return response;
  };

  const fetchAllCompanyAccount = async () => {
    await checkLogin();
    const response = await axios.get(Config.companyAccountApiUrl, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });
    return response;
  };
  const fetchCompanyDetails = async (companyId) => {
    await checkLogin();
    const response = await axios.get(`${Config.companyApiUrl}${companyId}/`, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });
    return response;
  };
  const fetchMedicineByName = async (name) => {
    if (name === "") {
      return { data: [] };
    } else {
      await checkLogin();

      const response = await axios.get(`${Config.medicineNameApiUrl}${name}`, {
        headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
      });
      return response;
    }
  };

  const fetchEmployee = async () => {
    await checkLogin();
    const response = await axios.get(Config.employeeApiUrl, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });
    return response;
  };

  const fetchAllMedicine = async () => {
    await checkLogin();
    const response = await axios.get(Config.medicineApiUrl, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });
    return response;
  };

  const editCompanyData = async (
    name,
    license_no,
    address,
    contact_no,
    email,
    description,
    id
  ) => {
    await checkLogin();
    // Wait Until Token Get Updated

    const response = await axios.put(
      `${Config.companyApiUrl}${id}/`,
      {
        name: name,
        license_no: license_no,
        address: address,
        contact_no: contact_no,
        email: email,
        description: description,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  };

  const fetchCompanyBankDetails = async (companyId) => {
    await checkLogin();
    const response = await axios.get(
      `${Config.companyBankApiUrl}${companyId}/`,
      {
        headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
      }
    );
    return response;
  };

  const saveCompanyBankData = async (bank_account_no, ifsc_no, company_id) => {
    await checkLogin();
    // Wait Until Token Get Updated

    const response = await axios.post(
      Config.companyBankApiUrl,
      {
        bank_account_no: bank_account_no,
        ifsc_no: ifsc_no,
        company_id: company_id,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  };
  const saveCompanyTransactionData = async (
    company_id,
    transaction_type,
    transaction_amt,
    transaction_date,
    payment_mode
  ) => {
    await checkLogin();
    // Wait Until Token Get Updated

    const response = await axios.post(
      Config.companyAccountApiUrl,
      {
        company_id: company_id,
        transaction_type: transaction_type,
        transaction_amt: transaction_amt,
        transaction_date: transaction_date,
        payment_mode: payment_mode,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  };

  const saveEmployeeData = async (name, joining_date, phone, address) => {
    await checkLogin();
    // Wait Until Token Get Updated

    const response = await axios.post(
      Config.employeeApiUrl,
      {
        name: name,
        joining_date: joining_date,
        phone: phone,
        address: address,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  };

  const editCompanyBankData = async (
    bank_account_no,
    ifsc_no,
    company_id,
    id
  ) => {
    await checkLogin();
    // Wait Until Token Get Updated

    const response = await axios.put(
      `${Config.companyBankApiUrl}${id}/`,
      {
        bank_account_no: bank_account_no,
        ifsc_no: ifsc_no,
        company_id: company_id,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  };

  const editEmployeeData = async (name, joining_date, phone, address, id) => {
    await checkLogin();
    // Wait Until Token Get Updated

    const response = await axios.put(
      `${Config.employeeApiUrl}${id}/`,
      {
        name: name,
        joining_date: joining_date,
        phone: phone,
        address: address,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  };

  const fetchEmployeeById = async (id) => {
    await checkLogin();
    const response = await axios.get(`${Config.employeeApiUrl}${id}/`, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });
    return response;
  };

  const fetchSalaryEmployee = async (id) => {
    await checkLogin();
    const response = await axios.get(
      `${Config.employeeSalaryByIdApiUrl}${id}`,
      {
        headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
      }
    );
    return response;
  };
  const fetchBankEmployee = async (id) => {
    await checkLogin();
    const response = await axios.get(`${Config.employeeBankApiUrlBYID}${id}`, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });
    return response;
  };

  const AddEmployeeSalaryData = async (
    salary_date,
    salary_amount,
    employee_id
  ) => {
    await checkLogin();
    // Wait Until Token Get Updated

    const response = await axios.post(
      Config.employeeSalaryApiUrl,
      {
        salary_date: salary_date,
        salary_amount: salary_amount,
        employee_id: employee_id,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  };

  const AddEmployeeBankData = async (bank_account_no, ifsc_no, employee_id) => {
    await checkLogin();
    // Wait Until Token Get Updated

    const response = await axios.post(
      Config.employeeBankApiUrl,
      {
        bank_account_no: bank_account_no,
        ifsc_no: ifsc_no,
        employee_id: employee_id,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  };

  const saveCustomerRequestData = async (name, phone, medicine_details) => {
    await checkLogin();
    // Wait Until Token Get Updated

    const response = await axios.post(
      Config.customerRequestApiUrl,
      {
        customer_name: name,
        phone: phone,
        medicine_details: medicine_details,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  };
  const updateCutomerRequest = async (
    customer_id,
    name,
    phone,
    medicine_details
  ) => {
    await checkLogin();
    // Wait Until Token Get Updated

    const response = await axios.put(
      `${Config.customerRequestApiUrl}${customer_id}/`,
      {
        customer_name: name,
        phone: phone,
        medicine_details: medicine_details,
        status: 1,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  };

  const saveMedicineData = async (
    name,
    medical_typ,
    buy_price,
    sell_price,
    c_gst,
    s_gst,
    batch_no,
    shelf_no,
    expire_date,
    mfg_date,
    company_id,
    description,
    in_stock_total,
    qty_in_strip,
    medicinedetails
  ) => {
    await checkLogin();
    // Wait Until Token Get Updated

    const response = await axios.post(
      Config.medicineApiUrl,
      {
        name: name,
        medical_typ: medical_typ,
        buy_price: buy_price,
        sell_price: sell_price,
        c_gst: c_gst,
        s_gst: s_gst,
        batch_no: batch_no,
        shelf_no: shelf_no,
        expire_date: expire_date,
        mfg_date: mfg_date,
        company_id: company_id,
        description: description,
        in_stock_total: in_stock_total,
        qty_in_strip: qty_in_strip,
        medicine_details: medicinedetails,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  };
  const editMedicineData = async (
    name,
    medical_typ,
    buy_price,
    sell_price,
    c_gst,
    s_gst,
    batch_no,
    shelf_no,
    expire_date,
    mfg_date,
    company_id,
    description,
    in_stock_total,
    qty_in_strip,
    medicinedetails,
    id
  ) => {
    await checkLogin();
    // Wait Until Token Get Updated

    const response = await axios.put(
      `${Config.medicineApiUrl}${id}/`,
      {
        name: name,
        medical_typ: medical_typ,
        buy_price: buy_price,
        sell_price: sell_price,
        c_gst: c_gst,
        s_gst: s_gst,
        batch_no: batch_no,
        shelf_no: shelf_no,
        expire_date: expire_date,
        mfg_date: mfg_date,
        company_id: company_id,
        description: description,
        in_stock_total: in_stock_total,
        qty_in_strip: qty_in_strip,
        medicine_details: medicinedetails,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  };

  const generateBill = async(
    name,
    address,
    phone,
    medicinedetails
  ) =>{
    await checkLogin()
    const response = await axios.post(
      Config.generateBillApiUrl,
      {
        name: name,
        address: address,
        contact: phone,
        medicine_details: medicinedetails,
      },
      {
        headers: { Authorization: `Bearer ${AuthHandler.getLoginToken()}` }
      }
    );

    return response;
  }

  return {
    checkLogin,
    fetchAllCompany,
    fetchAllCompanyAccount,
    fetchCompanyOnly,
    fetchCompanyDetails,
    fetchCompanyBankDetails,
    fetchEmployee,
    fetchEmployeeById,
    fetchSalaryEmployee,
    fetchBankEmployee,
    fetchAllCustomerRequest,
    fetchAllMedicine,
    fetchMedicineByName,
    fetchHomePage,

    saveCompanyData,
    saveCompanyTransactionData,
    saveCompanyBankData,
    saveEmployeeData,
    saveCustomerRequestData,
    saveMedicineData,
    AddEmployeeSalaryData,
    AddEmployeeBankData,
    updateCutomerRequest,

    editCompanyData,
    editCompanyBankData,
    editEmployeeData,
    editMedicineData,

    generateBill,
  };
};

export default APIHandler;
