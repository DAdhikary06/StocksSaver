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

  const fetchEmployee = async () => {
    await checkLogin();
    const response = await axios.get(Config.employeeApiUrl, {
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

    saveCompanyData,
    saveCompanyTransactionData,
    saveCompanyBankData,
    saveEmployeeData,
    AddEmployeeSalaryData,
    AddEmployeeBankData,

    editCompanyData,
    editCompanyBankData,
    editEmployeeData,
  };
};

export default APIHandler;
