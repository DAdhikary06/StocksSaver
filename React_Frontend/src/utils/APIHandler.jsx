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

  return {
    checkLogin,
    saveCompanyData,
  };
};

export default APIHandler;
