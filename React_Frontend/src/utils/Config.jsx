const Config = {
  loginUrl: "http://127.0.0.1:8000/api/gettoken/",
  refreshApiUrl: "http://127.0.0.1:8000/api/refresh_token/",
  companyApiUrl : "http://127.0.0.1:8000/api/company/",
  homeUrl: "/home", // Add home URL here
  logoutUrl: "/logout", // Add logout URL here
};

export const sidebarItems = [
  { path: "/home", label: "Dashboards" },
  { path: "/company", label: "Company" },
  { path: "/add-medicine", label: "Add Medicine" },
  { path: "/manage-medicine", label: "Manage Medicine" },
  { path: "/company-amount", label: "Manage Company Amount" },
  { path: "/manage-employee", label: "Manage Employee" },
  { path: "/generate-bill", label: "Generate Bill" },
  { path: "/customer-request", label: "Customer Request" },
];

export default Config;