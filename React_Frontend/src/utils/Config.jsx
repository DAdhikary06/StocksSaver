const Config = {
  loginUrl: "http://127.0.0.1:8000/api/gettoken/",
  refreshApiUrl: "http://127.0.0.1:8000/api/refresh_token/",
  companyApiUrl : "http://127.0.0.1:8000/api/company/",
  homeApiUrl : "http://127.0.0.1:8000/api/home_api/",
  medicineApiUrl : "http://127.0.0.1:8000/api/medicine/",
  medicineNameApiUrl : "http://127.0.0.1:8000/api/medicinebyname/",
  generateBillApiUrl : "http://127.0.0.1:8000/api/generate_bill_api/",
  customerRequestApiUrl : "http://127.0.0.1:8000/api/customer_request/",
  companyBankApiUrl : "http://127.0.0.1:8000/api/companybank/",
  companyOnly : "http://127.0.0.1:8000/api/companyonly/",
  employeeApiUrl : "http://127.0.0.1:8000/api/employee/",
  companyAccountApiUrl : "http://127.0.0.1:8000/api/companyaccount/",
  employeeSalaryByIdApiUrl : "http://127.0.0.1:8000/api/employee_salaryby_id/",
  employeeSalaryApiUrl :"http://127.0.0.1:8000/api/employee_all_salary/",
  employeeBankApiUrl : "http://127.0.0.1:8000/api/employee_all_bank/",
  employeeBankApiUrlBYID :"http://127.0.0.1:8000/api/employee_bankby_id/",

  homeUrl: "/home", // Add home URL here
  logoutUrl: "/logout", // Add logout URL here
};

export const sidebarItems = [
  { path: "/home", label: "Dashboard" },
  { path: "/company", label: "Company" },
  { path: "/addMedicine", label: "Add Medicine" },
  { path: "/manageMedicine", label: "Manage Medicine" },
  { path: "/manageCompanyAccount", label: "Manage Company Account" },
  { path: "/manageEmployee", label: "Manage Employee" },
  { path: "/generateBill", label: "Generate Bill" },
  { path: "/customerRequest", label: "Customer Request" },
];

export default Config;