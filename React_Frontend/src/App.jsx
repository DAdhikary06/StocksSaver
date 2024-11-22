// src/App.jsx
import React from 'react';
import './App.css';
import '@adminkit/core/dist/js/app.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import MainComponent from './components/MainComponent';
import Company from './pages/Company';
import PrivateRouteNew from './utils/PrivateRouteNew';
import Analytics from './pages/Analytics';
import Config from './utils/Config';
import LogoutComponent from './pages/LogoutComponet';
import MedicineAdd from './pages/MedicineAdd';
import CompanyDetails from './pages/CompanyDetails';
import CompanyAddBank from './pages/CompanyAddBank';
import CompanyEditBank from './pages/CompanyEditBank';
import CompanyAccount from './pages/CompanyAccount';
import Employee from './pages/Employee';
import EmployeeDetails from './pages/EmployeeDetails';
import CustomerRequest from './pages/CustomerRequest';
import MedicineManage from './pages/MedicineManage';
import BillGenerate from './pages/BillGenerate';


function App() {
  return (
    <Router>
       <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path={Config.logoutUrl} element={<LogoutComponent/>} />
        <Route path="/home" element={<PrivateRouteNew page={Analytics} additionalProp="value" />} />
        <Route path="/company" element={<PrivateRouteNew page={Company} additionalProp="value" />} />
        <Route path="/addMedicine" element={<PrivateRouteNew page={MedicineAdd} additionalProp="value" />} />
        <Route path="/manageMedicine" element={<PrivateRouteNew page={MedicineManage} additionalProp="value" />} />
        <Route path="/companydetails/:id" element={<PrivateRouteNew page={CompanyDetails} additionalProp="value" />} />
        <Route path="/addCompanyBank/:id" element={<PrivateRouteNew page={CompanyAddBank} additionalProp="value" />} />
        <Route path="/editCompanyBank/:company_id/:id" element={<PrivateRouteNew page={CompanyEditBank} additionalProp="value" />} />
        <Route path="/manageCompanyAccount" element={<PrivateRouteNew page={CompanyAccount} additionalProp="value" />} />
        <Route path="/manageEmployee" element={<PrivateRouteNew page={Employee} additionalProp="value" />} />
        <Route path="/employeeDetails/:id" element={<PrivateRouteNew page={EmployeeDetails} additionalProp="value" />} />
        <Route path="/generateBill" element={<PrivateRouteNew page={BillGenerate} additionalProp="value" />} />
        <Route path="/customerRequest" element={<PrivateRouteNew page={CustomerRequest} additionalProp="value" />} />
      </Routes>
    </Router>
  );
}

export default App;